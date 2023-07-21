<template>

<!-- Component where the coach can create a exercise for one of his teams -->

    <div class="rs-pointtable inner-style pt-10 md-pt-80 md-pb-80">
        <div class="container">

            <div class="rs-products">
                <div class="shop-guide mb-30">
                    <div class="row rs-vertical-middle">
                        <div class="col-lg-6 col-md-6 col-sm-6 xs-mb-15">
                            <div class="title-style pb-50 pt-30 md-pb-30">
                                <h2 class="margin-0 uppercase">{{$tc('exercise')}}</h2>
                                <span class="line-bg y-b pt-10 left-line"></span>
                            </div>
                        </div>

                        <div class="col-lg-6 col-md-6 col-sm-6 text-right xs-text-left"></div>
                    </div>
                </div>
            </div>

            <form id="create_exercis_form" @submit.prevent="createExercise">
                <div class="point-table-wrap pb-80 md-pb-80">
                    <div
                        style="background-color: #ececec; padding: 30px 50px 20px 50px; border-radius: 15px;margin-bottom: 50px;"
                        class="row_container"
                    >
                        <div class="row">
                            <h5>{{$t('exerciceDescription')}}</h5>
                        </div>

                        <div
                            style="background-color: #fff; padding: 30px 30px 30px 20px;border-radius: 10px;"
                            class="row"
                        >
                            <div class="col-md-2 text-center">
                                <img src="/images/icons/Icons ___ (100px)-02.png" width="100" />
                            </div>
                            
                            <div class="col-md-10">
                                <div class="row mt-25">
                                    <div class="col">
                                        <textarea
                                            class="form-control exercise_form_inputs"
                                            rows="1"
                                            id="comment"
                                            :placeholder="$t('exerciceDescriptionPlaceholder')"
                                            v-model="form.exerciseDescription"
                                            @input="$v.form.exerciseDescription.$reset"
                                            @blur="setFieldValue($event.target.value, 'exerciseDescription')"                                             
                                        />
                                        <template v-if="$v.form.exerciseDescription.$error">
                                            <label class="input-label">
                                                <span v-if="!$v.form.exerciseDescription.required" class="req">{{$t('fieldRequired')}}</span>
                                            </label>
                                        </template>                                         
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        style="background-color: #ececec; padding: 30px 50px 20px 50px; border-radius: 15px;margin-bottom: 50px;"
                        class="row_container"
                    >
                        <div class="row">
                            <h5>{{$t('exerciceModule')}}</h5>
                        </div>

                        <div
                            style="background-color: #fff; padding: 30px 30px 30px 20px;border-radius: 10px;"
                            class="row"
                        >
                            <div class="col-md-2 text-center">
                                <img src="/images/icons/Icons ___ (100px)-09.png" alt width="100" />
                            </div>

                            <div class="col-md-10">
                                <div class="row mt-25">
                                    <div class="col">
                                        <select
                                            class="form-control exercise_form_inputs"
                                            id="module"
                                            v-model="moduleInfos"
                                            @change="checkModule"
                                        >
                                            <option
                                                v-for="mod in modules"
                                                :key="mod.id"
                                                :value="{id: mod.id, name: mod[rightLanguageName]}"
                                            >
                                                {{mod[rightLanguageName]}}
                                            </option>
                                            <option value="all">{{$t('addModule')}}</option>
                                        </select>
                                    </div>

                                    <div v-if="newModule === true" class="col">
                                        <input
                                            type="text"
                                            class="form-control exercise_form_inputs"
                                            :placeholder="$t('newModuleName')"
                                            v-model.trim="form.moduleName"
                                            @input="$v.form.moduleName.$reset"
                                            @blur="setFieldValue($event.target.value, 'moduleName')"                                            
                                        />
                                        <template v-if="$v.form.moduleName.$error">
                                            <label class="input-label">
                                                <span v-if="!$v.form.moduleName.moduleNameRequired" class="req">{{$t('exerciceCreationNoModule')}}</span>
                                            </label>
                                        </template>                                      
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        style="background-color: #ececec; padding: 30px 50px 20px 50px; border-radius: 15px;margin-bottom: 50px;"
                        class="row_container"
                    >
                        <div class="row">
                            <h5>{{$t('exerciceEndDate')}}</h5>
                        </div>

                        <div
                            style="background-color: #fff; padding: 30px 30px 30px 20px;border-radius: 10px;"
                            class="row"
                        >
                            <div class="col-md-2 text-center">
                                <img src="/images/icons/Icons ___ (100px)-03.png" width="100" />
                            </div>

                            <div class="col-md-10">
                                <div class="row mt-25">
                                    <div class="col">
                                        <input
                                            type="date"
                                            class="form-control exercise_form_inputs"
                                            :placeholder="$t('exerciseEndDate')"
                                            v-model="form.exerciseEndDate"
                                            @input="$v.form.exerciseEndDate.$reset"
                                            @blur="setFieldValue($event.target.value, 'exerciseEndDate')"                                              
                                        />
                                        <template v-if="$v.form.exerciseEndDate.$error">
                                            <label class="input-label">
                                                <span v-if="!$v.form.exerciseEndDate.required" class="req">{{$t('fieldRequired')}}</span>
                                            </label>
                                        </template>                                           
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        style="background-color: #ececec; padding: 30px 50px 20px 50px; border-radius: 15px;margin-bottom: 50px;"
                        class="row_container"
                    >
                        <div class="row">
                            <h5>{{$t('forWhichTeams')}}</h5>
                        </div>

                        <div
                            style="background-color: #fff; padding: 30px 30px 30px 20px;border-radius: 10px;"
                            class="row"
                        >

                            <div class="col-md-2 text-center">
                                <img src="/images/icons/Icons ___ (100px)-09.png" width="100" />
                            </div>

                            <div class="col-md-10">
                                <div class="row mt-25">
                                    <div v-if="activatedTeams.length" class="col form-group">
                                        <select class="form-control exercise_form_inputs" v-model="form.seasonId">
                                            <option value="all">-- {{$t('allSeasons')}} --</option>
                                            <option
                                                v-for="season in seasons"
                                                :key="season.id"
                                                :value="season.id"
                                            >
                                                {{season.name}}
                                            </option>
                                        </select>                                        
                                        <select class="form-control exercise_form_inputs" v-model="form.teamId">
                                            <option
                                                v-for="team in teams"
                                                :key="team.id"
                                                :value="team.id"
                                            >
                                                {{team.name}}
                                            </option>
                                        </select>
                                    </div>
                                    <div v-else>
                                        {{$t('noActivatedTeam')}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <center>
                            <button
                                v-if="activatedTeams.length"
                                type="submit"
                                style="padding: 16px 85px 16px 85px !important;color:#fff !important;margin-top:15px;font-size: 20px;margin-bottom:20px;"
                                class="readon"
                            >
                                {{$t('Iconfirm')}}
                            </button>
                        </center>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import { mapState } from "vuex";
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

import routeRedirectionMixin from '../../mixins/routeRedirectionMixin';

export default {

    name: "CreateExercise",
    
    mixins: [routeRedirectionMixin, validationMixin],
    
    data() {
        return {
            form: {
                exerciseDescription: "",
                moduleName: "",
                exerciseEndDate: "",
                seasonId: "all",
            },
            moduleInfos: {},
            exerciseName: "",
            newModule: false,
        };
    },

    computed: {
        ...mapState({
            user: (state) => state.user.data,
            isConnected: (state) => state.user.isConnected,
            userTeams: (state) => state.teams.userOnes,
            modules: (state) => state.trainings.exercisesModules,
        }),

        // Gets the language chosen by the user
        currentLocale() {
            return this.$i18n.locale
        },

        rightLanguageName() {
            return this.currentLocale === this.$i18n.fallbackLocale ? 'english_name' : 'french_name'
        },

        // Gets the teams that are really activated 
        activatedTeams() {
            return this.userTeams.filter(team=> team.activated)
        },

        seasons() {
            return this.$store.getters.Seasons(this.activatedTeams)
        },

        // Gets the teams to display depending on the season selected by the user
        teams() {
            if(parseInt(this.form.seasonId)) {
            // A specific season has been selected, so we take only the teams associated to this season
                return this.activatedTeams.filter(team =>team.season_id === this.form.seasonId)
            } else {
            // We take all the user's teams as no filter on the season has been made
                return this.activatedTeams
            }
        },

        // This sets the module name/id that will be associated to the created exercice
        finalModuleInfos() {
            return this.newModule ? {name: this.form.moduleName, id: 'all' }  : {name: this.moduleInfos.name, id: this.moduleInfos.id }
        }
    },

    validations: {

        form: {

            exerciseDescription: { required },  

            moduleName: {
                moduleNameRequired: function(moduleName) {
                    // Ok if the user has selected an existing module (so he doesn't need to name any module) or if he named the new module he wants to add
                    return !this.newModule || moduleName
                }
            },        

            exerciseEndDate: { required },
        }
    },
 
    mounted() {
        
        // Redirects the user to the login page if he's not yet logged in
        const checkConnexion = this.redirectToLogin(this.isConnected, this.$i18n.locale)

        if(checkConnexion) {
        // The user is not connected, we stop the mounted hook now
            return
        }
        
        // Redirects the user to his home page if he's not a coach
        const checkRole = this.checkRole(this.user.roles, this.$store.state.rolesNames.coach, this.$i18n.locale)

        if(checkRole) {
        // The user is not a coach, we stop the mounted hook now
            return
        } 

        // With this, the select tags will display initial values, which helps the user know what is the purpose of these fields
        const firstModule = this.modules[0]
        this.moduleInfos = {id: firstModule.id, name: firstModule[this.rightLanguageName]}
        this.form.teamId = this.activatedTeams[0].id
    },

    methods: {

        // Creates a new exercise 
        async createExercise() {

            if(this.$v.$invalid) {
            // The form has not been filled correctly
                this.$v.form.$touch()
                return 
            }
      
            // The exercise name is composed of its module name and end date (this is to differenciate same exercises but created for different trainings sessions)
            const exerciseName = this.finalModuleInfos.name + ' ' + this.form.exerciseEndDate
            
            const data = {
                user_id: this.user.id,
                name: exerciseName,
                coach_exercice_module_id: this.finalModuleInfos.id,
                module_name: this.finalModuleInfos.name,
                french_description: this.form.exerciseDescription, 
                english_description: this.form.exerciseDescription, 
                date: this.form.exerciseEndDate,
                teams_ids: [this.form.teamId],
            }

            // Dispatches the request to create an exercise
            this.$store.dispatch('createExercise', data)
                .then((response) => {
                    this.$swal(this.$t('actionSuccessMessage'))

                    const exercise = response.data

                    this.$store.commit('EXERCISE_DATA_UPDATE', exercise)
                    
                    this.$router.push({
                        name: 'Exercise',
                        params: {
                            name: exercise.name
                        }
                    })
                })

                .catch((err) => {
                    this.$swal(this.$store.state.apiInternalError)})
        },

        // Gets all the exercises modules and updates the associated state
        getExercisesModules() {
            this.$store.dispatch('getExercisesModules', {userId: this.user.id})
                .then(response => this.$store.commit('EXERCISES_MODULES_UPDATE', response.data))
        },

        // Checks if the user tries to add a new module or not, i.e. if we need to display a block for him to write a new module name
        checkModule() {
            // If the id from the select options is an integer, it means the user has opted for an existing module, otherwise it's a new one
            this.newModule = this.moduleInfos.hasOwnProperty('id') ? false : true
        },

        // Used to trigger the validation process 
        setFieldValue(value, field) {
            this.$v['form'][field].$touch()            
        }, 
    },
};
</script>

<style scoped>
.exercise_form_inputs {
  border-right: none !important;
  border-top: none !important;
  border-left: none !important;
  border-radius: 0px !important;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none !important;
}
input:focus {
  outline: none !important;
}

@media only screen and (min-width: 992px) {
  .full-width-header
    .rs-header
    .menu-area.menu-sticky.sticky
    .main-menu
    .expand-btn
    span
    a,
  .full-width-header
    .rs-header
    .menu-area.menu-sticky.sticky
    .main-menu
    .rs-menu
    .nav-menu
    li
    .top_dropdown_item {
    height: 44px !important;
    line-height: 18px !important;
    transition: all 0.3s ease 0s;
  }
}

.full-width-header .rs-header .menu-area .logo-area img {
  max-width: 265px;
  margin: 0;
  max-height: 100%;
  transition: all 0.3s ease 0s !important;
}
/* Style The Dropdown Button */
.top_drop_button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
}

/* The container <div> - needed to position the dropdown content */
.top_drop_down {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */

.top_dropdown_content {
  display: none;
  position: fixed;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  margin-top: -20px !important;
  z-index: 1;
}

/* Links inside the dropdown */
.top_dropdown_content .top_dropdown_item {
  color: #3fb389 !important;
  padding: 12px 16px;
  text-decoration: none;
  border-bottom: 1px solid #f1f1f1;
  display: block;
  text-align: left;
}
/* @media only screen and (min-width: 992px){ 
           .full-width-header .rs-header .menu-area.menu-sticky.sticky .main-menu .expand-btn span a, .full-width-header .rs-header .menu-area.menu-sticky.sticky .main-menu .rs-menu .nav-menu li .top_dropdown_item {
               height: unset !important;
               line-height: unset !important;
               transition: all 0.3s ease 0s;
           }
        } */

/* Change color of dropdown links on hover */
.top_dropdown_content .top_dropdown_item:hover {
  background-color: #3fb389;
  color: #3fb389 !important;
}

/* Show the dropdown menu on hover */
.top_drop_down:hover .top_dropdown_content {
  display: block;
}

/* Style The Dropdown Button */
.drop_button {
  background-color: #3fb389;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  margin-top: 5px;
  border: none;
}

/* The container <div> - needed to position the dropdown content */
.drop_down {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown_content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown_content a {
  color: #3fb389;
  padding: 12px 16px;
  text-decoration: none;
  border-bottom: 1px solid #f1f1f1;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown_content a:hover {
  background-color: #f1f1f1;
}

/* Show the dropdown menu on hover */
.drop_down:hover .dropdown_content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.drop_down:hover .drop_button {
  background-color: #3ba57e;
}
.club_name {
  font-size: 30px;
  font-weight: 600;
  color: #3a3a3a;
  margin-left: 15px;
}
.stat_circles {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.stat_number {
  /* color: #3fb389;
              font-size: 55px;
              font-weight: 700; */
  color: #3fb389;
  font-size: 45px;
  font-weight: 700;
  margin: 0px 0px 0px 65px;
}

.stat_text {
  color: #3fb389;
  font-size: 12px;
  font-weight: 700;
  margin: 0px 0px 0px 72px;
}

#expand-btn {
  margin: 0px !important;
}

.coach_li {
  padding-left: 50px !important;
  padding-right: 50px !important;
  height: 93px;
  margin: 0;
}

#top_white_header {
  background: #fff !important;
  padding: 10px 15px 10px 40px !important;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15) !important;
}

@media only screen and (min-width: 992px) {
  .full-width-header .rs-header .menu-area.menu-sticky.sticky {
    background: #3fb389 !important;
    /*transition: all 0.3s ease 0s !important;*/
    position: fixed !important;
    z-index: 999 !important;
    margin: 0 auto !important;
    padding: -44px 10px !important;
    top: -6px !important;
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    -webkit-box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2) !important;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2) !important;
    -webkit-animation-name: sticky-animation !important;
    animation-name: sticky-animation !important;
    height: 100px !important;
  }

  .circles_container {
    background: #f1f1f1;
    padding: 40px 70px 40px 60px;
    border: 1px solid gainsboro;
    width: 55%;
    border-radius: 15px;
  }
  .stat_div_right_top {
    border-bottom: 1px solid #d8d9da;
  }
  .stat_div_left_top {
    border-right: 1px solid #d8d9da;
    border-bottom: 1px solid #d8d9da;
  }

  .stat_div_left_bottom {
    border-right: 1px solid #d8d9da;
  }
}

#nav-menu > li > a {
  font-size: 16px !important;
  text-transform: uppercase !important;
  font-weight: 500 !important;
  height: 100px !important;
  line-height: 25px !important;
  padding-top: 13px !important;
}

#rs-breadcrumbs #breadcrumbs-wrap {
  position: relative !important;
  overflow: hidden !important;
  height: 190px !important;
  background: #3fb389 !important;
}

.footer_nav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.footer_nav li {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  padding: 0px 20px;
}

@media screen and (min-width: 400px) {
  .footer_icons {
    color: #fff;
    text-align: center !important;
    padding-top: 4px;
    padding-left: 8px;
    padding-right: 8px;
    font-size: 18px;
  }
  .stat_circle {
    float: none;
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
