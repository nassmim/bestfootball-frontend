<template>

<!-- Component that displays all the games, both the ones BestFootball created
  and the ones created by coaches 
-->

    <div class="rs-products sec-bg pt-80 md-pt-80">
        <div class="container"> 
            <div class="shop-guide mb-30 pt-20">
                <div class="row rs-vertical-middle">
                    <div class="col-lg-4 col-md-4 col-sm-4 xs-mb-15">
                        <div class="title-style md-pb-30">
                            <h2 class="margin-0 uppercase">{{$tc('game', 2) | capitalizeText}}</h2>
                            <span class="line-bg y-b pt-10 left-line"></span>
                        </div>
                    </div> 
                    <div class="col-lg-8 col-md-8 col-sm-8 text-right xs-text-left" >
                            

                        <div class="sorting">
                            <form>
                                <select 
                                    v-if="teamFeaturesVisible && userTeams.length" 
                                    v-model="displayTeamChallenges"
                                    @change="filterChallenges"
                                >
                                    <option :value="false" selected>{{$t('appName')}}</option>
                                    <option :value="true"> {{$tc('team', 2) | capitalizeText}} </option>
                                </select>  

                                <template v-if="displayTeamChallenges">  
                                    <select 
                                        v-model="seasonId" 
                                        @change="filterChallenges"
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
                                        @change="filterChallenges"
                                    >
                                        <option value="all">-- {{$t('allTeams')}} --</option>
                                        <option
                                            v-for="team in teams"
                                            :key="team.id"
                                            :value="team.id"
                                        >
                                            {{team.name}}
                                        </option>
                                    </select> 
                                </template>  

                                <select 
                                    v-model="categoryId" 
                                    @change="filterChallenges">
                                    <option value="all">-- {{$t('allCategories')}} --</option>
                                    <option
                                        v-for="category in categories"
                                        :key="category.id"
                                        :value="category.id"
                                    >
                                        {{currentLocale=== $i18n.fallbackLocale ? category.english_name : category.french_name }}
                                    </option>
                                </select> 
                                <router-link
                            :to="{name: 'GamesVideos'}"
                            style="padding:10px 20px 10px 20px !important; color:#fff !important; margin: 5px 15px 20px 0px;"
                            class="readon"
                        >   
                            {{$t('playersvideo')}}
                        </router-link>
                        <router-link v-if="user.coach"
                            :to="{name: 'CreateGame'}"
                            style="padding:10px 20px 10px 20px !important; color:#fff !important; margin: 5px 15px 20px 0px;"
                            class="readon"
                        >
                            {{$t('createYourChallenge')}}
                        </router-link>  
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="challenges.length" id="video_section" class="row mt-70 vertical_scroll_bar">
                <!--Display videos Start-->
                <div
                    v-for="challenge in challenges"
                    :key="challenge.id"
                    :id="challenge.id"
                    class="col-lg-4 col-md-6 mb-60"
                >
                    <div class="videos">
                        <div class="video-img">
                            <a class="popup_videos" @click="goToChallenge(challenge)">
                                <img
                                    :src="(challenge.user_id ? '/upload' : '') + `/images/challenges/presentations/${challenge.thumbnail_path}` "
                                />
                            </a>
                        </div>
                        <center>
                            <a class="popup_videos" @click="goToChallenge(challenge)">
                                <img class="play_icon" src="/images/icons/play.png" alt width="50" />
                            </a>
                        </center>
                        <div class="row">
                            <div class="col-md-12">
                                <center>
                                <h5 class="vid_title"> 
                                    <router-link
                                        :to="{name: 'GamePresentation', params: {name: challenge.name}}"
                                        @click.native="$store.commit('CHALLENGE_UPDATE', challenge)"
                                    >
                                    {{ challenge.team_id ? challenge.name.slice(0,-9) : challenge.name }}
                                    </router-link>
                                </h5>
                                </center>
                            </div>
                        </div>
                        <center>
                            <p class="vid_paragraph">
                                {{currentLocale=== $i18n.fallbackLocale ? challenge.english_description : challenge.french_description }}
                            </p>
                        </center>
                        <div style="display:flex;" class="btns_div">
                            <router-link
                                :to="{name: 'Tutorial', params: {name: challenge.name}}"
                                @click.native="$store.commit('CHALLENGE_UPDATE', challenge)"
                                class="btn1_div"
                                :id="challenge.id"
                            >
                                <div>
                                    <img src="/images/icons/learn.png" width="34" height="34" />
                                    <br />
                                    <p
                                        style="color: #5d5d5d; font-size: 15px; font-weight: 600; margin-bottom: -5px;"
                                    >
                                        {{$t('ILearn')}}
                                    </p>
                                </div>
                            </router-link>
                            <router-link
                                :to="{name: 'GamePresentation', params: {name: challenge.name}}"
                                @click.native="$store.commit('CHALLENGE_UPDATE', challenge)"
                                class="btn2_div" 
                                :id="challenge.id" 
                            >
                                <div>
                                    <img src="/images/icons/try.png" width="34" height="34" />
                                    <br />
                                    <p
                                        style="color: #5d5d5d; font-size: 15px; font-weight: 600; margin-bottom: -5px;"
                                    >
                                        {{$t('ITry')}}
                                    </p>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
                <infinite-loading spinner="circles" :identifier="infiniteId" @infinite="infiniteHandler">
                    <div slot="no-more">{{$t('noMoreResults')}}</div>
                    <div slot="no-results">{{pageNumber === 0 ? $t('noResult') : ''}}</div>
                </infinite-loading>                 
            </div>
            <div v-else>
                {{$t('noChallenge')}}
            </div>            
        </div>
    </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from "vuex";
import scrollLoadingMixin from "../../../mixins/scrollLoadingMixin"

export default {

    name: "Games",
    
    mixins: [scrollLoadingMixin],
    
    data() {
        return {
            challenges: [],
            seasonId: 'all',
            categoryId: "all",
            size: 6,
            pageNumber: 0,
            infiniteId: +new Date(),
            displayTeamChallenges: false,    
            teamId: 'all',     
        };
    },

    computed: { 
        ...mapState({
            user: state => state.user.data,
            userTeams: (state) => state.teams.userOnes,
            categories: (state) => state.trainings.categories,
            teamFeaturesVisible: (state) => state.user.teamFeaturesVisible,
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

    async created() {

        // Gets the first X challenges of the app
        this.challenges = await this.getChallenges() 
        this.$store.commit('CHALLENGES_LIST_UPDATE', this.challenges)    
        
        // Gets all the available challenges categories 
        if(!this.categories.length) {
            this.getChallengesCategories()
        }     
    },

    methods: {

        ...mapActions({
            getChallengesDispatch: 'getChallenges',
            getChallengesCategoriesDispatch: 'getChallengesCategories',
        }),


        ...mapMutations({
            updateUserTeams: 'USER_TEAMS_UPDATE',
            updateChallenge: 'CHALLENGE_UPDATE',
            updateChallengeCategories: 'CHALLENGES_CATEGORIES_UPDATE',
        }),

        // Gets the challenges depending on the category and the size/offset params
        async getChallenges() {
            
            // If the user is not part of a team, then the filter on team has no value other than the initial one
            let teamsIds = 'all'

            if(this.teamFeaturesVisible && this.displayTeamChallenges) {
            /* The user is part of the team, and he has selected to display only the challenges associated to the teams he's part of
            so we need to know which team he want. 
            if a team has been selected from the filter (i.e. there is a value different than the initial one), we use this team id. If not, we get all the user's teams
            */ 
                teamsIds = parseInt(this.teamId) ? this.teamId : this.teams.map(team => team.id)
            }
            
            const data = {
                name: 'all',
                teamsIds: teamsIds,
                seasonId: this.seasonId,
                ageCategoryId: "all",
                categoryId: this.categoryId,
                size: this.size,
                page: this.pageNumber,
                order: "name"
            };

            // Dispatches the action to get the challenges
            var response = await this.getChallengesDispatch(data).catch(() => {
                this.$swal(this.$store.state.apiInternalError)
                throw new Error
            })

            return response.data.challenges 
        },

        // Handles the infinite loading component to update the list of challenges once the user scrolls down
        infiniteHandler($state) {
            this.pageNumber++
            this.loadData(this.challenges, this.size, this.pageNumber, this.getChallenges, $state)
        },

        // Filters the challenges matching the category filter
        filterChallenges() {
            // The api will need to get the first challenges matching the new filter
            this.pageNumber = 0
            this.challenges = []

            // Makes the infinite loading component reset so that it restarts its state with the new list of challenges
            this.infiniteId += 1

            // Loads the data to display in the screen, updating directly the list of videos
            this.loadData(this.challenges, this.size, this.pageNumber, this.getChallenges)            
        },


        // Go to the challenge presentation screen and stores the challenge in the state
        goToChallenge(challenge) {
            this.updateChallenge(challenge)
            this.$router.push({
                name: 'GamePresentation',
                params: {
                    name: challenge.name
                }
            })
        },

        // Gets all the games categories and updates the associated state
        async getChallengesCategories() {
            this.getChallengesCategoriesDispatch({challengeId: 'all'})
                .then(response => this.updateChallengeCategories(response.data))
                .catch(err => this.$swal(this.$store.state.apiInternalError))
        },
    },
};
</script>

<style scoped>
.vertical_scroll_bar{
     margin-top:70px;
}
.vid_title {
  float: unset !important;
  margin-left: unset !important;
}
.rs-products .products .product-img {
  padding-bottom: 0px;
}

.btn-secondary {
  color: #fff;
  font-weight: 600 !important;
  background-color: #c5c5c5 !important;
  border-color: #c5c5c5 !important;
}

.btns_div {
    justify-content: space-around;
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
