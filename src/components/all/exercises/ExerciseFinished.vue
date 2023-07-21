<template>
  <!-- Component that displays the results from the team players on a specific exercise 
that is finished 
-->

  <div class="rs-pointtable inner-style md-pt-20 md-pb-20">
    <div
      :style="
        `background-image: url(${backgroundImage}); margin-top: -20px; border-bottom: 6px solid #ffe18c;`
      "
      class="row"
    >
      <div class="col-md-4">
        <div class="team_header_div container text-center">
          <h1 style="color: #fff !important;">{{$t('statistics') | capitalizeText}}</h1>
        </div>
      </div>
 
      <div class="col-md-8">
        <div style="display: flex; flex-wrap: wrap;" class="container">

          <div class="home_stat_circle">
            <span class="home_stat_number">
              {{teamSuccessRate}} %
            </span>
            <hr
              style="margin-top: 0px; margin-bottom: -8px; border: 0; border-top: 1px solid rgb(255, 255, 255, 0);"
            />
            <span class="home_stat_text">{{$t('exerciceGlobalSuccess')}}</span>
          </div>

          <div class="home_stat_circle">
            <span class="home_stat_number">
              {{teamProgression >= 0 ? '+' : ''}} {{teamProgression}} %
            </span>
            <hr
              style="margin-top: 0px; margin-bottom: -8px; border: 0; border-top: 1px solid rgb(255, 255, 255, 0);"
            />
            <span class="home_stat_text">{{$t('progression') | capitalizeText}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="rs-products">
        <div class="shop-guide">
          <div class="row rs-vertical-middle">
            <div class="col-lg-6 col-md-6 col-sm-6 xs-mb-15">
              <div class="title-style pb-50 pt-30 md-pb-30">
                <h2 class="margin-0 uppercase">{{ $tc("exercise") }}</h2>
                <span class="line-bg y-b pt-10 left-line"></span>
                <span class="mt-5">
                  <strong>{{ $t("finished") | capitalizeText }}</strong>
                </span>
              </div>
            </div>
            <div
              class="col-lg-6 col-md-6 col-sm-6 text-right xs-text-left"
            ></div>
          </div>
        </div>
      </div>

      <div
        v-if="exerciseStats && exerciseStats.currentScores"
        class="point-table-wrap pb-80 md-pb-80"
      >
        <div class="row mb-50">
          <div
            v-for="(position, index) in positionsTypes"
            :key="index"
            class="container mt-40"
          >
            <h3>{{ position }}</h3>
            <vueper-slides
              class="no-shadow"
              :visible-slides="4"
              slide-multiple
              :gap="1"
              :bullets="false"
              :touchable="false"
              :slide-ratio="1 / 2"
              :dragging-distance="200"
              fixed-height="350px"
              :breakpoints="{
                800: { visibleSlides: 1, slideMultiple: 1 },
              }"
            >
              <vueper-slide
                v-for="teamUser in getTeamUsers(position)"
                :key="teamUser.id"
              >
                <template v-slot:content>
                  <center>
                    <div class="card text-center exercise_card">
                      <div class="card-header exercise_card_header">
                        {{ teamUser.nameToDisplay }}
                        <div class="exercise_stats mt-15">
                          <div class="exercise_stat">
                            <span
                              style="color:#ffe18c; font-weight:600 !important; font-size:13px !important;"
                            >
                              {{ teamUser.stats.attempts }}
                            </span>
                            <hr
                              style="margin-top: 0px; margin-bottom: -8px; border: 0; border-top: 1px solid rgb(255, 255, 255, 0);"
                            />
                            <span
                              style="color:#ffe18c; font-weight:600 !important; font-size:12px !important;"
                            >
                              {{ $tc("attempt", teamUser.stats.attempts) }}
                            </span>
                          </div>
                          <div class="exercise_stat">
                            <span
                              style="color:#ffe18c; font-weight:600 !important; font-size:13px !important;"
                            >
                              {{ teamUser.stats.successRate }}%
                            </span>
                            <hr
                              style="margin-top: 0px; margin-bottom: -8px; border: 0; border-top: 1px solid rgb(255, 255, 255, 0);"
                            />
                            <span
                              style="color:#ffe18c; font-weight:600 !important; font-size:12px !important;"
                            >
                              {{ $tc("success") }}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div class="card-body exercise_card_body">
                        <div class="row">
                          <div
                            style="display: flex; align-items: center; justify-content: center"
                            class="col-md-12"
                          >
                            <div style="padding: 15px 50px 15px;">
                              <radial-progress-bar
                                :diameter="110"
                                :completed-steps="Math.min(100, teamUser.stats.progressionRate)"
                                :inner-stroke-color="innerStrokeColor"
                                    :start-color="teamUser.stats.progressionRate >= 0 ? startColorPositive : startColorNegative"
                                    :stop-color="teamUser.stats.progressionRate >= 0 ? stopColorPositive : stopColorNegative"
                                :total-steps="100"
                                :stroke-width="strokeWidth"
                                :inner-stroke-width="innerStrokeWidth"
                              >
                                <span class="player_stat_number">{{
                                  teamUser.stats.progressionRate
                                }} %</span>
                                <hr 
                                  style="margin-top: 0px; margin-bottom: -8px; border: 0; border-top: 1px solid rgba(255, 255, 255, 0);"
                                />
                                <span class="player_stat_text">{{
                                  $t("progression")
                                }}</span>
                              </radial-progress-bar>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </center>
                </template>
              </vueper-slide>
            </vueper-slides>
            <hr />
          </div>
        </div>
      </div>
      <div v-else>
        {{ $t("exerciseNoParticipation") }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"; 
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import RadialProgressBar from "vue-radial-progress";

export default {
  name: "ExerciseFinished",

  components: {
    VueperSlides,
    VueperSlide,
    RadialProgressBar,
  },

  data() {
    return {
      exerciseStats: {},
      teamSuccessRate: 0,
      teamProgression: 0,
      innerStrokeColor: "#e2e3e4",
      startColorPositive: "#f6b93b",
      stopColorPositive: "#3FB389",
      startColorNegative: "#c23616",
      stopColorNegative: "#e84118",
      strokeWidth: 8,
      innerStrokeWidth: 8,
      backgroundImage: "/images/background/stats_background.jpg",
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.user.data,
      exercise: (state) => state.trainings.singleExercise,
      playerCharacteristics: (state) => state.general.playerCharacteristics,
    }),

    // Gets the property name in the right language to get the positions types
    positionTypeName() {
      return this.$i18n.locale === this.$i18n.fallbackLocale
        ? "type_english_name"
        : "type_french_name";
    },

    // Gets the available positions types in a field
    positionsTypes() {
      let positions = [];
      if (this.playerCharacteristics.positions.length) {
        // The available positions are stored in the state, we can get their types

        positions = this.playerCharacteristics.positions.reduce(
          (list, position) =>
            // The check is made so that we do not have duplicates since a position type can be associated to several positions
            list.includes(position[this.positionTypeName])
              ? list
              : list.concat(position[this.positionTypeName]),
          []
        );
      }

      return positions;
    },
  },

  async created() {

        if(!this.playerCharacteristics.positions || !this.playerCharacteristics.positions.lenght) {
            this.getPlayerCharacteristics()
        }


        this.exerciseStats = await this.getExerciseStats();

        // Gets the team overall statistics on the exercise
        if (this.exerciseStats.currentScores) {
        // At least one player participated in the exercise
        const [teamStats, teamSuccessRate] = this.getTeamScores(
            this.exerciseStats.currentScores
            ),
            [teamOldStats, teamOldSuccessRate] = this.getTeamScores(
            this.exerciseStats.oldScores
            );

        this.teamSuccessRate = teamSuccessRate ? teamSuccessRate : 0;
        
        // Derives the team overall progression rate based on the success rate
        this.teamProgression = this.getProgessionRate(
            teamSuccessRate,
            teamOldSuccessRate
        );
        }
    },

  methods: {
    // Gets the team and players' statistics on a specific exercice
    async getExerciseStats() {
      let data = {
        exerciseId: this.exercise.id,
      };

      // Dispatches the action to get the player's results in the exercice
      const response = await this.$store
        .dispatch("getExerciseStats", data)
        .catch(() => {
          this.$swal(this.$store.state.apiInternalError);
          throw new Error();
        });

      return response.data;
    },

    // Gets the overall team scores
    getTeamScores(list) {
      // Sums the number of attempts and successes
      const stats = list.reduce(
        (acc, score) => {
          return {
            attempts: acc.attempts + score.player_attempt,
            successes: acc.successes + score.player_success,
          };
        },
        { attempts: 0, successes: 0 }
      );

      // Derives the success rate
      const rateSuccess = Math.round((stats.successes * 100) / stats.attempts);
      return [stats, rateSuccess];
    },

    // Gets the team overall progression rate on the exercise
    getProgessionRate(newRate, oldRate) {
        let progressionRate = 0;

        if (newRate & oldRate) {
            progressionRate = newRate / oldRate - 1;
        } else if(oldRate && !newRate) {
            progressionRate = -1
        } else if(newRate && !oldRate) {
            progressionRate = 1
        } else {
            progressionRate = 0;
      }

        return Math.round(progressionRate * 100);
    },

    // Gets the team players and additional informations about them like their stats on the exercise
    getTeamUsers(positionType) {
      // Gets the players from the team who match the required field position
      const teamUsers = this.exercise.team.team_users.filter(
        (teamUser) =>
          teamUser.player_position[this.positionTypeName] === positionType
      );
      // Returns the list of players displayed on the view
      return teamUsers.reduce(
        (list, teamUser) =>
          list.concat({
            infos: teamUser,
            nameToDisplay: this.getUserName(teamUser.user),
            stats: this.getPlayerStats(teamUser.user.id),
          }),
        []
      );
    },

    // Derives a player's stats
    getPlayerStats(userId) {
      // Gets the player's participation on the exercise
      const playerParticipation = this.exerciseStats.currentScores.filter(
        (currentScore) => currentScore.user_id === userId
      )[0];

      let playerStats = {};

      if (playerParticipation) {
        // The player has participated in this exercise, we can save his results
        playerStats = {
          attempts: playerParticipation.player_attempt,
          successes: playerParticipation.player_success,
          successRate: playerParticipation.rate_success,
          progressionRate: 0,
        };

        // Gets the first player's participation on this type of exercise
        const playerOldParticipation = this.exerciseStats.oldScores.filter(
          (currentScore) => currentScore.user_id === userId
        )[0];

        if (playerOldParticipation && playerOldParticipation.rate_success) {
          // The player had participated in this type of exercise before, we can derive the progression he made
          playerStats.progressionRate = Math.round(
            (playerStats.successRate / playerOldParticipation.rate_success -
              1) *
              100
          );
        }
      } else {
        // The player has not participated in this exercise, we set 0 to all kpis
        playerStats = {
          attempts: 0,
          successes: 0,
          successRate: 0,
          progressionRate: 0,
        };
      }

      return playerStats;
    },

    // Gets the player's name to display
    getUserName(user) {
      const player = user.player;
      let nameToDisplay = "";

      if (player.first_name) {
        // The player has indicated his first name in his profile, we will use it
        nameToDisplay = this.$options.filters.capitalizeText(player.first_name);
        if (player.last_name) {
          // In case players have the same first name, the usage of the last name can be useful
          nameToDisplay +=
            "." + this.$options.filters.capitalizeText(player.last_name[0]);
        }
      } else {
        // The player has not yet filled his profile information, we use his username
        nameToDisplay = user.username;
      }

      return nameToDisplay;
    },

    // Gets the players' characteristics values like position, age etc.
    async getPlayerCharacteristics() {
        // The characteristics that define players are not yet stored, we need to get it and update the state so that we do not need to do it again later
        const response = await this.$store.dispatch('getPlayerCharacteristics')
        .catch(() => {
            this.$swal(this.$store.state.apiInternalError);
            throw new Error();
          });

        // Updates the state
        this.$store.commit('PLAYERS_CHARACTERISTICS_UPDATE', response.data)
    },
  },
};
</script>

<style scoped>
.team_header_div {
  margin: 100px 0px;
}
.exercise_stats {
  display: flex;
  align-items: center;
  justify-content: center;
}
.exercise_stat {
  width: 100px;
}
.vueperslides__arrow {
  top: 50%;
  background-color: #ececec00;
  border: none;
  opacity: 0.7;
  color: #0e976a !important;
}
.home_stat_circle {
  padding: 45px 21px 78px 21px;
  border-radius: 100%;
  margin: 50px 60px;
  text-align: center;
  border: 7px solid #ffe18c;
  /* background-image: url(../assets/images/background/statistics_bg.png); */
  background-repeat: no-repeat;
  background-position-x: 25px;
  background-position-y: 35px;
  background-size: 132px;
  width: 146px;
  height: 145px;
}

.player_stat_circle {
  padding: 59px 42px 78px 42px;
  border-radius: 100%;
  margin-top: -10px;
  text-align: center;
  background-image: url(/images/background/statistics_bg.png);
  background-repeat: no-repeat;
  background-position-x: 48px;
  background-position-y: 34px;
  background-size: 100px;
  width: 200px;
  height: 155px;
}
.player_stat_number {
  color: #3fb389;
  font-size: 14px;
  font-weight: 700;
}
.player_stat_text {
  color: #3fb389;
  font-size: 10px;
  font-weight: 700;
}

.home_stat_number {
  color: #fff;
  font-size: 25px;
  font-weight: 700;
}
.home_stat_text {
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

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
}
.exercise_card_header {
  padding: 45px 45px 10px 45px;
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
  padding: 10px 0px 10px 0px;
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

/* Smartphone (portrait and landscape) ----------- */
@media only screen and (min-width: 320px) and (max-width: 700px) {
    .exercise_card_body .row .col-md-12 {
        background-color:darkslategrey
    }
  .vueperslides__arrow {
    top: 50%;
    background-color: #ececec00;
    border: none;
    opacity: 0.7;
    color: #0e976a !important;
  }
  .vueperslides__arrow svg {
      color: black !important;
  }
  .home_stat_circle {
    padding: 30px 21px 70px 21px;
    border-radius: 100%;
    margin: 10px 25px;
    text-align: center;
    border: 7px solid #ffe18c;
    background-repeat: no-repeat;
    background-position-x: 25px;
    background-position-y: 30px;
    background-size: 132px;
    width: 115px;
    height: 110px;
  }
  .home_stat_number {
    color: #fff;
    font-size: 15px;
    font-weight: 700;
  }
  .team_header_div {
    margin: 10px 0px;
  }
  .game_stats {
    border-bottom: 0px solid #d8d9da !important;
    margin-left: 20px !important;
    margin-right: 20px !important;
  }
}

/* iPads (portrait and landscape) ----------- */
@media only screen and (min-width: 768px) and (max-width: 1024px) {
}
</style>
