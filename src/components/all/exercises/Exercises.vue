<template>

<!-- Component that displays all the exercices associated to the user's teams
-->

    <div class="rs-products sec-bg pt-80 md-pt-80">
        <div class="container">
            <div class="shop-guide mb-30 pt-20">
                <div class="row rs-vertical-middle">

                    <div class="col-lg-3 col-md-3 col-sm-3 xs-mb-15">
                        <div class="title-style md-pb-30">
                            <h2 class="margin-0 uppercase">{{$tc('exercise', 2)}}</h2>
                            <span class="line-bg y-b pt-10 left-line"></span>
                        </div>
                    </div>

                    <div class="col-lg-9 col-md-9 col-sm-9 text-right xs-text-left" >
                        <div class="sorting">
                            

                            <form>
                                <select 
                                    v-model="seasonId" 
                                    @change="filterExercises"
                                >
                                    <option value="all">-- {{$t('allSeasons')}} --</option>
                                    <option
                                        v-for="season in seasons"
                                        :key="season.id"
                                        :value="season.id"
                                    >
                                        {{season.name}}
                                    </option>
                                </select>                                                            
                                <select 
                                    v-model="teamId" 
                                    @change="filterExercises"
                                >
                                    <option value="all" disabled>-- {{$t('allTeams')}} --</option>
                                    <option
                                        v-for="team in teams"
                                        :key="team.id"
                                        :value="team.id"
                                    >
                                        {{team.name}}
                                    </option>
                                </select>                                
                                <select v-model="moduleId" @change="filterExercises">
                                    <option value="all">-- {{$t('allModules')}} --</option>
                                    <option
                                        v-for="mod in modules"
                                        :key="mod.id"
                                        :value="mod.id"
                                    >
                                        {{currentLocale=== $i18n.fallbackLocale ? mod.english_name : mod.french_name }}
                                    </option>
                                </select>
                                <router-link v-if="user.coach"
                                :to="{name: 'CreateExercise'}"
                                style="
                                    padding: 10px 20px 10px 20px !important;
                                    color: #fff !important;
                                    margin-top: -10px;
                                    margin-bottom: 5px;
                                "
                                class="readon"
                            >
                                {{$t('createExercice')}}
                            </router-link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="exercises.length > 0" id="exerces_section" class="row pt-40">

                <div
                    v-for="exercise in exercises"
                    :key="exercise.id"
                    class="col-lg-4 col-md-6 mb-60"
                >
                    <div class="videos">
                        <div class="video-img">
                            <router-link to="#" @click.native="goToExercise(exercise)" >
                                <img 
                                    :src="`/images/exercises/${exercise.coach_exercice_module.image}`"
                                />
                            </router-link>
                        </div>

                        <div class="row mt-30">
                            <div class="col-md-6">
                                <h5 class="exercise_title">
                                    <router-link to="#" accesskey="" @click.native="goToExercise(exercise)">
                                        {{currentLocale=== $i18n.fallbackLocale ? exercise.coach_exercice_module.english_name : exercise.coach_exercice_module.french_name }}
                                    </router-link>
                                </h5>
                            </div>
                            <div class="col-md-6">
                                <h6 style="color: #3fb389" class="exercise_date">
                                    <i class="fa fa-calendar mr-2"></i>
                                    {{ exercise.date }}
                                </h6>
                            </div>
                        </div>
                        <center>
                            <p class="exercise_paragraph">
                                {{currentLocale=== $i18n.fallbackLocale ? exercise.english_description : exercise.french_descrenglish_description }}
                            </p>
                        </center>
                    </div>
                </div>
                <infinite-loading spinner="circles" :identifier="infiniteId" @infinite="infiniteHandler">
                    <div slot="no-more">{{$t('noMoreResults')}}</div>
                    <div slot="no-results">{{pageNumber === 0 ? $t('noResult') : ''}}</div>
                </infinite-loading>                 
            </div>
            <div v-else>
                {{$t('noExercise')}}
            </div>             
        </div>
    </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from "vuex";

import scrollLoadingMixin from "../../../mixins/scrollLoadingMixin"
import routeRedirectionMixin from "../../../mixins/routeRedirectionMixin"

export default {

    name: "Exercises",
    
    mixins: [scrollLoadingMixin, routeRedirectionMixin],

    data() {
        return {
            exercises: [],
            seasonId: 'all',
            categoryId: "all",
            size: 6,
            pageNumber: 0,
            infiniteId: +new Date(),
            teamId: 'all',              
            moduleId: "all",
        };
    },

    computed: {
        ...mapState({
            user: state => state.user.data,
            isConnected: state => state.user.isConnected,
            userTeams: (state) => state.teams.userOnes,
            modules: (state) => state.trainings.exercisesModules,
        }),

        // Gets the language chosen by the user
        currentLocale() {
            return this.$i18n.locale
        },

        seasons() {
            return this.$store.getters.Seasons(this.userTeams)
        },

        // Gets the teams to display depending on the season selected by the user
        teams() {
            if(parseInt(this.seasonId)) {
            // A specific season has been selected, so we take only the teams associated to this season
                return this.userTeams.filter(team =>team.season_id === this.seasonId)
            } else {
            // We take all the user's teams as no filter on the season has been made
                return this.userTeams
            }
        },        
    },

    watch: {
        async teams(teams) {
            if(teams.length) {
                this.getExercisesInit()
            }
        }
    },

    async created() {

        // Redirects the user to the login page if he's not yet logged in
        this.redirectToLogin(this.isConnected, this.$i18n.locale)
        
        if(!this.userTeams.length) {
            await this.getTeams()
        } else {
            this.getExercisesInit()
        }
        
        // Gets all the available exercises modules 
        if(!this.modules.length) {
            this.getExercisesModules()
        }
    },

    methods: {

        ...mapActions({
            getExercisesDispatch: 'getExercises',
            getExercisesModulesDispatch: 'getExercisesModules',
            getTeamsDispatch: 'getTeams',
        }),

        ...mapMutations({
            updateExercise: 'EXERCISE_DATA_UPDATE',
            updateExercisesModules: 'EXERCISES_MODULES_UPDATE',
            updateUserTeams: 'USER_TEAMS_UPDATE',
        }),

        // Gets the user's teams
        getTeams() {

            const userId = this.user.player ? this.user.player.id : this.user.coach ? this.user.coach.id : this.user.club.id

            const data = {
                teamIdentifier: "all",
                userId: userId,
                roles: this.user.roles,
            };

            // Dipatches the request to get the user's teams
            this.getTeamsDispatch(data)
                .then((response) => {
                this.updateUserTeams(response.data.teams);
                })
                .catch(() => this.$swal(this.$store.state.apiInternalError));
        },

        async getExercisesInit() {
            this.teamId = this.teams[0].id
            this.seasonId = this.teams[0].season_id
            this.exercises = await this.getExercises()
            this.$store.commit('EXERCISES_LIST_UPDATE', this.exercises)
        },

        // Gets the exercises depending on the category and the size/offset params
        async getExercises() {
            
            const data = {
                name: 'all',
                teamsIds: this.teamId,
                seasonId: this.seasonId,
                ageCategoryId: "all",
                moduleId: this.moduleId,
                size: this.size,
                page: this.pageNumber,
                order: "name"
            };
 
            // Dispatches the action to get the exercises
            var response = await this.getExercisesDispatch(data).catch(() => {
                this.$swal(this.$store.state.apiInternalError)
                throw new Error
            })

            return response.data.exercises 
        },

        // Handles the infinite loading component to update the list of exercises once the user scrolls down
        infiniteHandler($state) {
            this.pageNumber++
            this.loadData(this.exercises, this.size, this.pageNumber, this.getExercises, $state)
        },

        // Filters the exercises matching the category filter
        filterExercises() {
            // The api will need to get the first exercises matching the new filter
            this.pageNumber = 0
            this.exercises = []

            // Makes the infinite loading component reset so that it restarts its state with the new list of exercises
            this.infiniteId += 1

            // Loads the data to display in the screen, updating directly the list of videos
            this.loadData(this.exercises, this.size, this.pageNumber, this.getExercises)            
        },

        // Gets all the exercises modules and updates the associated state
        async getExercisesModules() {
            this.getExercisesModulesDispatch({userId: this.user.id})
                .then(response => this.updateExercisesModules(response.data))
                .catch(err => this.$swal(this.$store.state.apiInternalError))
        },

        goToExercise(exercise) {

            this.updateExercise(exercise)
            this.$router.push({
                name: 'Exercise', 
                params: {
                    name: exercise.name
                }
            })            
        }
    },
};
</script>

<style scoped>
.rs-products .products .product-img {
  padding-bottom: 0px;
}

.rs-products .videos {
    padding-bottom: 0px;
}

.btn-secondary {
  color: #fff;
  font-weight: 600 !important;
  background-color: #c5c5c5 !important;
  border-color: #c5c5c5 !important;
}

.btn-secondary:hover {
  color: #fff;
  font-weight: 600 !important;
  background-color: #c5c5c5 !important;
  border-color: #c5c5c5 !important;
}

.rs-products .products .plan-title {
  padding-top: 5px;
  padding-bottom: 5px;
  margin-bottom: 0;
  font-size: 28px;
  /* color: red !important; */
  font-family: sans-serif;
  text-transform: uppercase;
  font-weight: 900 !important;
}

.footer_nav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}
.footer_nav li {
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  padding: 0px 20px;
}

@media screen and (min-width: 400px) {
  .footer_icons {
    color: #fff;
    text-align: center !important;
    padding-top: 4px;
    padding-left: 4px;
    font-size: 15px;
  }
}

@media screen and (min-width: 800px) {
  .footer_icons {
    color: #fff;
    text-align: center !important;
    padding-top: 3px;
    padding-left: 4px;
    font-size: 21px;
  }
  .footer_li {
    border: 2px solid #fff;
    border-radius: 100%;
    width: 45px;
    height: 45px;
    margin: 0.5em;
    padding: 0.5em;
  }
}
</style>
