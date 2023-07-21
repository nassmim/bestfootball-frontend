<template>

<!-- Component where the coach updates his players scores on an exercise he created 
This page will be displayed when the exercise is not yet finished 
-->

    <div class="rs-single-team sec-bg pt-50 md-pt-80 md-pb-80">
        <div class="container">
            <div class="rs-tab pb-10 md-pb-80">
                <div class="single-team-data">
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="team-overview">
                        <!-- Point Table Start -->
                            <div class="rs-pointtable inner-style md-pt-80 md-pb-80">
                                <div class="container">

                                    <div class="rs-products">
                                        <div class="shop-guide">
                                            <div class="row rs-vertical-middle">
                                                <div class="col-lg-6 col-md-6 col-sm-6 xs-mb-15">
                                                    <div class="title-style pb-0 pt-0 md-pb-30">
                                                        <h2 class="margin-0 uppercase">{{$tc('exercise')}}</h2>
                                                        <span class="line-bg y-b pt-10 left-line"></span>
                                                        <span class="mt-5">
                                                            <strong>{{$t('pending') | capitalizeText}}</strong>
                                                        </span>
                                                    </div>
                                                </div>
                                                <div class="col-lg-6 col-md-6 col-sm-6 text-right xs-text-left"></div>
                                            </div>
                                        </div>
                                    </div>


                                    <div class="rs-pointtable inner-style pt-5 md-pt-5 md-pb-80">
                                        <transition
                                            enter-active-class="animated fadeIn zoomIn"
                                            leave-active-class="animated fadeOut zoomOut"
                                        >
                                            <div id="add_player_div">
                                                <div class="container">
                                                    <div class="row">

                                                        <div class="col-md-12 mb-10">
                                                            <div class="row">
                                                                <div class="col-md-9">
                                                                    <div class="input-group mb-3">
                                                                        <input
                                                                            style="height: 45px; outline: 0 !important"
                                                                            type="text"
                                                                            class="form-control" 
                                                                            :placeholder="$t('addPlayersPlaceholder')"
                                                                            aria-label="search"
                                                                            aria-describedby="basic-addon2"
                                                                            @input="playerSearch=$event.target.value.trim().toLowerCase()"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div v-if="userToDisplay" class="card text-center exercise_card">

                                                            <div class="card-header exercise_card_header">{{userToDisplay.player.first_name}} {{userToDisplay.player.last_name}}</div>

                                                            <div class="card-body exercise_card_body">

                                                                <div class="row mt-30">
                                                                    <div class="col-md-12">
                                                                        <p style="color:#3FB389; font-weight:600 !important;" class>
                                                                        <span class="mr-2">{{$tc('attempt', playerExerciseStats.attempts) | capitalizeText}}: {{playerExerciseStats.attempts}},</span>
                                                                        <span class="mr-2">{{$tc('success') | capitalizeText}}: {{playerExerciseStats.successRate}}%</span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                                
                                                                <div style="display:flex;" class="exercise_card_2btn">

                                                                    <span
                                                                        style="border-right: 1px solid rgb(221, 221, 221);border-top: 1px solid rgb(221, 221, 221);"
                                                                        class="col-ms-6 col-md-6 exercise_card_btn"
                                                                        @click="updatePlayerScore(userToDisplay.id, 1)"
                                                                    >
                                                                        <i
                                                                            style="color: #fff; font-size: 15px; background: #3FB389; padding: 10px 12px; border-radius: 100%;"
                                                                            class="fa fa-plus"
                                                                        ></i>
                                                                    </span>

                                                                    <span
                                                                        style="border-top: 1px solid rgb(221, 221, 221);"
                                                                        class="col-ms-6 col-md-6 exercise_card_btn"
                                                                        @click="updatePlayerScore(userToDisplay.id, 0)"
                                                                    >
                                                                        <i
                                                                            style="color: #fff; font-size: 15px; background: #3FB389; padding: 10px 12px; border-radius: 100%;"
                                                                            class="fa fa-minus"
                                                                        ></i>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </transition>
                                    </div>
                                </div>
                            </div>
                        <!-- Point Table End -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from "vuex";

import routeRedirectionMixin from '../../mixins/routeRedirectionMixin';

export default {

    name: "ExercisePending",

    mixins: [routeRedirectionMixin],

    data() {
        return {
            playerSearch: "",
            playerExerciseStats: {
                attempts: 0,
                successRate: 0,
            },
        }
    },

    computed: {
        ...mapState({
            user: (state) => state.user.data,
            isConnected: (state) => state.user.isConnected,
            exercise: (state) => state.trainings.singleExercise,
        }),

        teamId() {
            return this.exercise.team_id
        },

        teamUsers() {
            return this.exercise.team.team_users.map(teamUser => teamUser.user)
        },

        // Gets the players matching the user research
        results() {
            return this.teamUsers.reduce((list, user) => {
                return this.getSearchResults(user, this.playerSearch) ? list.concat(user) : list
            }, []) 
        },  
        
        // Player to display on the screen, the first of the users matching the user's research
        userToDisplay() {
            return this.results[0]
        },
    },

    watch: {
        // once we get the player to display on screen, we get his results on this exercise
        userToDisplay(userToDisplay) {
            if(userToDisplay) {
            // The user's research has found a player, we can run the request to get his results
                this.getExerciseStats(userToDisplay.id)                
            }
        }
    },

    created() {

        // Redirects the user to the login page if he's not yet logged in
        const checkConnexion = this.redirectToLogin(this.isConnected, this.$i18n.locale)

        if(checkConnexion) {
        // The user is not connected, we stop the creation hook now
            return
        }
        
        // Redirects the user to his home page if he's not a coach
        const checkRole = this.checkRole(this.user.roles, this.$store.state.rolesNames.coach, this.$i18n.locale)

        if(checkRole) {
        // The user is not a coach, we stop the creation hook now
            return
        }
    },

    methods: {

        ...mapActions({
            updateExercisePlayerScore: 'updateExercisePlayerScore',
            getExerciseStatsDispatch: 'getExerciseStats',
            getExercises: 'getExercises',
        }),

        ...mapMutations({
            updateExercise: 'EXERCISE_DATA_UPDATE',
        }),

        // Updates the player score 
        async updatePlayerScore(userId, success) {

            // The exercise id, the player id for who the coach enter the result, and the result either a fail or a success
            const data = {
                coach_exercice_id: this.exercise.id,
                user_id: userId,
                success: success
            }

            // Dispatches the action to update the player's score
            const response = await this.updateExercisePlayerScore(data).catch(() => { throw new Error()})
            
            // The player's new score will be displayed thanks to this reactive data
            this.playerExerciseStats = {
                attempts: response.data.player_attempt,
                successes: response.data.player_success,
                successRate: response.data.rate_success,
            }             
        },

        // Gets the player's statistics on a specific exercise
        async getExerciseStats(userId) {

            let scores = {
                attempts: 0,
                successes: 0,
                successRate: 0
            }

            // The player's id for who the coach enters the participation result, and the concerned exercise id
            let data = {
                userId: userId,
                exerciseId: this.exercise.id,
            };
            
            // Dispatches the action to get the player's results in the exercise
            const response = await this.getExerciseStatsDispatch(data).catch(() => { throw new Error()})
            
            if(response.data.userCurrentScore) {
            // The response contains a score, i.e. the user already participated in this exercise
                scores = {
                    attempts: response.data.userCurrentScore.player_attempt,
                    successes: response.data.userCurrentScore.player_success,
                    successRate: response.data.userCurrentScore.rate_success,
                }
            } 

            this.playerExerciseStats = scores
        },

        // Finds among the team players the ones who match the user's research
        getSearchResults(user, playerSearch) {
            
            const username = user.username.toLowerCase(),
                firstName = user.player.first_name ? user.player.first_name.toLowerCase() : "",
                lastName = user.player.last_name ? user.player.last_name.toLowerCase() : ""

            /* Using index of function instead of includes enables to have the list of users whose names/emails start with the user's input.
            i.e. the results will not be only the exact matches
            */
            if(username.indexOf(playerSearch) > -1 || firstName.indexOf(playerSearch) > -1 || lastName.indexOf(playerSearch) > -1) {
                return true
            }        
        },
    }
};
</script>

<style scoped>
.sec-bg {
  background: #f7f7f7 !important;
}
.rs-tab .single-team-data .tab-content .tab-pane {
  background: #f7f7f7 !important;
  padding: 10px;
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
  margin-top: -4px;
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
.exercise_card {
  -webkit-box-shadow: none !important;
  box-shadow: none !important;
  border-radius: 8px 8px 8px 8px !important;
  background: #ffffff !important;
    width: 100%;
}
.exercise_card_header {
  padding: 45px;
  background: #3fb389;
  color: #fff;
  font-size: 20px;
  border-radius: 6px 6px 0px 0px !important;
  font-weight: 600;
}
.exercise_card_body {
  padding: 0px !important;
}
.exercise_card_btn {
  padding: 20px;
  cursor: pointer;
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

.stat_circle {
  padding: 121px 90px 100px 93px;
  border-radius: 100%;
  background: #3fb389;
  margin: 30px 50px;
  text-align: center;
  border: 10px solid #ffe18c;
}
.stat_number {
  color: #fff;
  font-size: 70px;
  font-weight: 700;
}

.stat_text {
  color: #fff;
  font-size: 15px;
  font-weight: 700;
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