<template>
  <!-- Component that displays all the information about a team, the players in it, the number of trainings, etc. -->

  <div>
    <!-- Single Club Section Start -->
    <div class="rs-single-team sec-bg pt-20 md-pt-20 md-pb-50">
      <div
        :style="
          `background-image: url(${backgroundImage}); margin-top: -20px; border-bottom: 6px solid #ffe18c;`
        "
        class="row" 
      >
        <div class="col-md-4">
          <div class="team_header_div container text-center">
            <h1 style="color: #fff !important;">{{ team.name }}</h1>
          </div>
        </div>

        <div class="col-md-8">
          <div style="display: flex; flex-wrap: wrap;" class="container">
            <div class="home_stat_circle">
              <span class="home_stat_number">
                {{ team.number_players_added ? team.number_players_added : 0 }}
              </span>

              <hr
                style="margin-top: 0px; margin-bottom: -8px; border: 0; border-top: 1px solid rgba(255, 255, 255, 0);"
              />
              <span class="home_stat_text">{{
                $tc("player", team.number_players_added) | capitalizeText
              }}</span>
            </div>

            <div class="home_stat_circle">
              <span class="home_stat_number">
                {{ challenges.length }}
              </span>
              <hr
                style="margin-top: 0px; margin-bottom: -8px; border: 0; border-top: 1px solid rgb(255, 255, 255, 0);"
              />
              <span class="home_stat_text">{{
                $tc("game", challenges.length) | capitalizeText
              }}</span>
            </div>

            <div class="home_stat_circle">
              <span class="home_stat_number">
                {{ exercises.length }}
              </span>
              <hr
                style="margin-top: 0px; margin-bottom: -8px; border: 0; border-top: 1px solid rgb(255, 255, 255, 0);"
              />
              <span class="home_stat_text">{{
                $tc("training", exercises.length) | capitalizeText
              }}</span>
            </div>

            <div class="home_stat_circle">
              <span class="home_stat_number">
                {{ videos.length }}
              </span>
              <hr
                style="margin-top: 0px; margin-bottom: -8px; border: 0; border-top: 1px solid rgb(255, 255, 255, 0);"
              />
              <span class="home_stat_text">{{
                $tc("video", videos.length) | capitalizeText
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="rs-tab pb-10 md-pb-50">
          <div class="single-team-data">
            <div class="tab-content">
              <div class="tab-pane fade show active" id="team-overview">
                <!-- Point Table Start -->
                <div class="rs-pointtable inner-style pt-1 md-pt-20 md-pb-50">
                  <div class="container">
                    <div class="rs-products">
                      <div class="shop-guide">
                        <div class="row rs-vertical-middle">
                          <div class="col-lg-6 col-md-6 col-sm-6 xs-mb-15">
                            <div class="title-style pb-50 md-pb-30"></div>
                          </div>

                          <div class="col-lg-6 col-md-6 col-sm-6 xs-text-left">
                            <div class="sorting container">
                              <router-link
                                v-if="user.roles === coachRole"
                                :to="{
                                  name: 'AddTeamPlayers',
                                  params: { name: team.unique_name },
                                }"
                                style="margin:5px; padding: 10px 20px 10px 20px !important; color: #fff !important;"
                                class="readon"
                              >
                                <img
                                  class="mr-2"
                                  src="/images/icons/add_players.png"
                                  alt
                                  width="30"
                                  height="30"
                                />
                                {{ $t("addOtherPlayers") }}
                              </router-link>
                              <router-link
                                v-if="user.roles === coachRole"
                                style="margin:5px; padding: 10px 20px 10px 20px !important; color: #fff !important;"
                                class="readon"
                                :to="{ name: 'CreateExercise' }"
                              >
                                <img
                                  class="mr-2"
                                  src="/images/icons/add_exercises.png"
                                  width="30"
                                  height="30"
                                />
                                {{ $t("createExercice") }}
                              </router-link>
                            </div>
                          </div>
                        </div>
                        <!-- <div class="row rs-vertical-middle">
                                                    <div
                                                        style="float: right !important;"
                                                        class="col-lg-12 col-md-12 col-sm-12 xs-mb-12 text-right"
                                                    >
                                                        <div class="title-style pt-80 md-pb-30">
                                                    
                                                            <router-link   
                                                                v-if="user.roles === coachRole"
                                                                :to="{name: 'AddTeamPlayers', params: {name: team.unique_name}}"
                                                                style="padding: 10px 20px 10px 20px !important; color: #fff !important; margin-top: 0px; margin-bottom: -15px; margin-right: 15px !important;"
                                                                class="readon" 
                                                            >
                                                                <img
                                                                    class="mr-2"
                                                                    src="/images/icons/add_players.png"
                                                                    alt
                                                                    width="30"
                                                                    height="30"
                                                                />
                                                                {{$t('addOtherPlayers')}}
                                                            </router-link>
                                                            <router-link
                                                                v-if="user.roles === coachRole"
                                                                style="padding: 10px 20px 10px 20px !important; color: #fff !important; margin-top: 0px;"
                                                                class="readon"
                                                                :to="{name: 'CreateExercise'}"
                                                            >
                                                                <img
                                                                    class="mr-2"
                                                                    src="/images/icons/add_exercises.png"
                                                                    width="30"
                                                                    height="30"
                                                                />
                                                                {{$t('createExercice')}}
                                                            </router-link>
                                                        </div>
                                                    </div>
                                                </div> -->
                      </div>
                    </div>

                    <!-- Team Players Section Start -->
                    <div
                      v-if="team.team_users"
                      class="point-table-wrap pb-50 md-pb-50"
                    >
                      <div class="rs-team style1 nav-style md-pt-10 md-pb-40">
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
                              v-for="teamUser in teamUsers[position]"
                              :key="teamUser.id"
                            >
                              <template v-slot:content>
                                <center>
                                  <div
                                    class="card"
                                    style="width: 16rem; border-radius: 10px;"
                                  >
                                    <img
                                      class="card-img-top"
                                      :src="
                                        teamUser.user.player.avatar
                                          ? `/upload/images/users/${teamUser.user.player.avatar}`
                                          : '/images/users/avatar.png'
                                      "
                                      alt="Player card image cap"
                                      style="height:200px; border-radius: 10px 10px 0px 0px;"
                                    />
                                    <div class="card-body">
                                      <p class="card-text">
                                        <router-link
                                          :to="{
                                            name: 'Home',
                                            params: {
                                              username: teamUser.user.username,
                                            },
                                          }"
                                          class="player_slider_name"
                                        >
                                          {{ getUserName(teamUser.user) }}
                                          <br />
                                        </router-link>
                                        <span class="stat_text">{{
                                          teamUser.player_position.name
                                        }}</span>
                                      </p>
                                      <button
                                        style="background: #3FB389; color:#fff; margin-top: -30px !important;"
                                        class="btn btn-default"
                                        @click="
                                          userPicked = teamUser.user;
                                          showStats(teamUser.user.id);
                                        "
                                      >
                                        {{ $t("hisStats") }}
                                      </button>
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
                    <!-- Team Player Section End -->
                  </div>
                </div>
                <!-- Point Table End -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      id="player_stats_modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div style="background: #f7f7f7;" class="modal-content">
          <div style="border-bottom: none !important;" class="modal-header">
            <img
              style="border: 2px solid #3fb389; border-radius: 50px"
              class="mr-2"
              :src="
                userPicked.player && userPicked.player.avatar
                  ? `/upload/images/users/${userPicked.player.avatar}`
                  : '/images/users/avatar.png'
              "
              alt
              width="30"
              height="30"
            />
            <h6 style="color: #3FB389;" class="modal-title">
              {{ userPicked.username }}
            </h6>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <section id="tabs">
              <div class="container">
                <div class="row">
                  <div class="col-md-12">
                    <nav>
                      <div
                        class="nav nav-tabs nav-fill mb-30"
                        id="nav-tab"
                        role="tablist"
                      >
                        <a
                          class="nav-item nav-link active"
                          id="nav-exercise-tab"
                          data-toggle="tab"
                          :href="'#nav-exercise'"
                          role="tab"
                          :aria-controls="'nav-exercise'"
                          aria-selected="true"
                          onclick="$('#nav-challenge').modal('hide')"
                        >
                          {{ $tc("training", 2) | capitalizeText }}
                        </a>
                        <a
                          class="nav-item nav-link"
                          id="nav-challenge-tab"
                          data-toggle="tab"
                          :href="'#nav-challenge'"
                          role="tab"
                          :aria-controls="'nav-challenge'"
                          aria-selected="false"
                          @click="getChallengeStats(userPicked.id, challengeId);`$('#nav-exercise').modal('hide')`"
                        >
                          {{ $tc("game", 2) | capitalizeText }}
                        </a>
                      </div>
                    </nav>

                    <div
                      class="tab-content py-3 px-3 px-sm-0"
                      id="nav-tabContent"
                    >
                      <div
                        class="tab-pane fade show active col-md-12"
                        :id="'nav-exercise'"
                        role="tabpanel"
                        aria-labelledby="nav-exercise-tab"
                      >
                        <select
                          class="form-control mb-4"
                          v-model="exerciseId"
                          @change="getExerciseStats(userPicked.id, exerciseId)"
                        >
                          <option
                            v-for="exercise in exercises"
                            :key="exercise.id"
                            :selected="
                              exercise.id === exerciseId ? 'selected' : ''
                            "
                            :value="exercise.id"
                          >
                            {{ getName(exercise.name) }}
                          </option>
                        </select>

                        <div class="container circles_container">
                          <div class="row">
                            <div
                              style="border-bottom: 0px solid #d8d9da !important;"
                              class="col-md-6 stat_div_left_top"
                            >
                              <div>
                                <template style="margin-right:10px;">
                                  <radial-progress-bar
                                    :diameter="170"
                                    :completed-steps="rateSuccess"
                                    :inner-stroke-color="innerStrokeColor"
                                    :start-color="rateSuccess > 50 ? startColorPositive : startColorNegative"
                                    :stop-color="rateSuccess > 50 ? stopColorPositive : stopColorNegative"
                                    :total-steps="100"
                                    :stroke-width="strokeWidth"
                                    :inner-stroke-width="innerStrokeWidth"
                                  >
                                    <span class="stat_number"
                                      >{{ rateSuccess }} %</span
                                    >

                                    <span class="stat_text">{{
                                      $tc("success")
                                    }}</span>
                                  </radial-progress-bar>
                                </template>
                              </div>
                            </div>
                            <div
                              style="border-bottom: 0px solid #d8d9da !important;"
                              class="col-md-6 stat_div_right_top"
                            > 
                              <div>
                                <template>
                                  <radial-progress-bar
                                    :diameter="170"
                                    :completed-steps="Math.min(100, progressionRate)"
                                    :inner-stroke-color="innerStrokeColor"
                                    :start-color="progressionRate >= 0 ? startColorPositive : startColorNegative"
                                    :stop-color="progressionRate >= 0 ? stopColorPositive : stopColorNegative"
                                    :total-steps="100"
                                    :stroke-width="strokeWidth"
                                    :inner-stroke-width="innerStrokeWidth"
                                  >
                                    <span class="stat_number"
                                      >{{ progressionRate }} %</span
                                    >

                                    <span class="stat_text">{{
                                      $t("progression")
                                    }}</span>
                                  </radial-progress-bar>
                                </template>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        class="tab-pane fade col-md-12"
                        id="nav-challenge"
                        role="tabpanel"
                        aria-labelledby="nav-challenge-tab"
                      >
                        <select
                          class="form-control mb-4"
                          v-model="challengeId"
                          @change="
                            getChallengeStats(userPicked.id, challengeId)
                          "
                        >
                          <option
                            v-for="challenge in challenges"
                            :key="challenge.id"
                            :selected="
                              challenge.id === challenges[0].id
                                ? 'selected'
                                : ''
                            "
                            :value="challenge.id"
                          >
                            {{ challenge.name }}
                          </option>
                        </select>

                        <div class="container circles_container">
                          <div class="row">
                            <div class="game_stats">
                              <template>
                                <radial-progress-bar
                                  :diameter="190"
                                  :completed-steps="expectedScore ? Math.min(expectedScore, gameScore) : gameScore"
                                  :inner-stroke-color="innerStrokeColor"
                                    :start-color="startColorPositive"
                                    :stop-color="stopColorPositive"
                                  :total-steps="expectedScore ? expectedScore : gameScore"
                                  :stroke-width="strokeWidth"
                                  :inner-stroke-width="innerStrokeWidth"
                                >
                                  <span class="stat_number"
                                    >{{ gameScore }} <i class="fa fa-futbol-o"
                                  /></span>

                                  <span v-show="expectedScore"  class="stat_text"
                                    >{{ $tc("expectedLevel") }} -
                                    {{ expectedScore }}
                                    <i class="fa fa-futbol-o"
                                  /></span>
                                </radial-progress-bar>
                              </template>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div
            style="justify-content: center; display:none;"
            class="modal-footer"
          >
            <button
              style="float:left !important; border-radius: 50px; padding: 5px 40px;"
              type="button"
              class="btn btn-danger"
              data-dismiss="modal"
            >
              {{ $t("close") | capitalizeText }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Single Club Section End -->
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";
import RadialProgressBar from "vue-radial-progress";

import routeRedirectionMixin from "../../mixins/routeRedirectionMixin";

export default {
  name: "Team",

  components: {
    VueperSlides,
    VueperSlide,
    RadialProgressBar,
  },

  mixins: [routeRedirectionMixin],

  data() {
    return {
      teamName: "",
      teamUsers: {},
      userPicked: {},
      seasonId: "all",
      ageCategoryId: "all",
      challengeCategoryId: "all",
      page: "all",
      size: "all",
      name: "all",
      order: "name",
      exerciseId: 0,
      challengeId: 0,
      playerExerciseStats: {},
      gameScore: 0,
      expectedScore: 0,
      coachRole: this.$store.state.rolesNames.coach,
      clubRole: this.$store.state.rolesNames.club,
      backgroundImage: "/images/background/stats_background.jpg",
      innerStrokeColor: "#e2e3e4",
      startColorPositive: "#f6b93b",
      stopColorPositive: "#3FB389",
      startColorNegative: "#c23616",
      stopColorNegative: "#e84118",
      strokeWidth: 12,
      innerStrokeWidth: 12,
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.user.data,
      isConnected: (state) => state.user.isConnected,
      team: (state) => state.teams.singleOne,
      exercises: (state) => state.trainings.teamExercises,
      teamsExercises: (state) => state.trainings.teamsExercises,
      challenges: (state) => state.trainings.teamChallenges,
      teamsChallenges: (state) => state.trainings.teamsChallenges,
      videos: (state) => state.trainings.teamChallengesVideos,
      teamsVideos: (state) => state.trainings.teamsChallengesVideos,
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

    // Gets the player's current success rate on the exercice (i.e. ratio of number of achieved tricks over number of attempts)
    rateSuccess() {
      return this.playerExerciseStats.userCurrentScore
        ? this.playerExerciseStats.userCurrentScore.rate_success
        : 0;
    },

    // Gets the player's progression rate from the first to the latest participation
    progressionRate() {
      // Makes the appropriate calculation to derive the progression rate
      const rate = this.deriveProgressionRate();
      return rate;
    },
  },

  async created() {
    // Redirects the user to the login page if he's not yet logged in
    const checkConnexion = this.redirectToLogin(
      this.isConnected,
      this.$i18n.locale
    );

    if (checkConnexion) {
      return true;
    }

    // Gets the name of the team we are looking at
    this.teamName = this.$route.params.name + this.$route.hash;

    // This checks if the team data has to be retrieved from the db and saved again in the store
    await this.checkAndUpdateTeam();

    // Redirects the user if he's not part of this team
    const checkRedirect = this.redirect();

    if (checkRedirect) {
      // This is true, i.e. the user is not part of this team, we redirect him to his home page
      this.$router.push({
        name: "Home",
        params: {
          username: this.user.username,
        },
      });

      // no need to run the rest of the functions within this hook
      return;
    }

    await Promise.all([
      // These lines get the lists (like the users registered in the app) if they are not yet stored in the state
      this.checkAndGetData(
        this.challenges,
        this.teamsChallenges,
        this.getChallenges,
        this.updateTeamChallenges
      ),
      this.checkAndGetData(
        this.videos,
        this.teamsVideos,
        this.getChallengesVideos,
        this.updateTeamChallengesVideos
      ),
      this.checkAndGetData(
        this.exercises,
        this.teamsExercises,
        this.getExercises,
        this.updateTeamExercises
      ),

      // Gets the players' characteristics possible values like the position, the age category etc.
      this.getPlayerCharacteristics(),
    ]);

    // Gets the team players and stores them in a dictionary in function of their field position
    this.getTeamUsers();

    // This is done so that when the user clicks on a player's stats pop-up, there will be the results for the first exercice/challenge displayed
    this.exerciseId = this.exercises.length ? this.exercises[0].id : 0;
    this.challengeId = this.challenges.length ? this.challenges[0].id : 0;
  },

  methods: {
    ...mapActions({
      getTeams: "getTeams",
      getChallengesDispatch: "getChallenges",
      getChallengesVideosDispatch: "getChallengesVideos",
      getExercisesDispatch: "getExercises",
      getExerciseStatsDispatch: "getExerciseStats",
      getChallengeStatsDispatch: "getChallengeStats",
      getPlayerCharacteristicsDispatch: "getPlayerCharacteristics",
    }),

    ...mapMutations({
      updateTeam: "TEAM_UPDATE_DATA",
      updateTeamChallenges: "TEAM_CHALLENGES_LIST_UPDATE",
      updateTeamChallengesVideos: "TEAM_CHALLENGES_VIDEOS_LIST_UPDATE",
      updateTeamExercises: "TEAM_EXERCISES_LIST_UPDATE",
      updatePlayerCharacteristics: "PLAYERS_CHARACTERISTICS_UPDATE",
    }),

    // Checks if the team is already stored and if not it does the appropriate action to get it
    async checkAndUpdateTeam() {
      if (!this.team || this.team.unique_name !== this.teamName) {
        // The team is not yet stored, so we need to get it
        const team = await this.getTeam();
        this.updateTeam(team);
      }
    },

    // Gets the team associated to this screen thanks to the route name
    async getTeam() {
      const data = {
        teamIdentifier: encodeURIComponent(this.teamName),
        userId: "all",
        roles: "all",
      };

      // Dipatches the request to get the team
      const response = await this.getTeams(data).catch(() => {
        this.$swal(this.$store.state.apiInternalError);
        throw new Error();
      });

      return response.data.team;
    },

    // Gets the players who are registered in the team and splits them by field position
    getTeamUsers() {
      this.positionsTypes.forEach((positionType) => {
        this.teamUsers[positionType] = this.team.team_users.filter(
          (user) => user.player_position[this.positionTypeName] === positionType
        );
      });
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

    // Checks if the state data already exists, if not it does the appropriate action to get it
    async checkAndGetData(
      stateData,
      stateTeamsData,
      actionToGetData,
      actionToUpdateData
    ) {
      if (!stateData || !stateData.length) {
        // There is no data stored in the state, we need to get it

        let newData = [];

        if (stateTeamsData.length) {
          // The list of items associated to the teams is already stored in the state, we can filter the ones associated to the team of this screen
          newData = stateTeamsData.filter(
            (data) => data.team_id === this.team.id
          );
        } else {

          // The list of items associated to the teams where the user is in is not yet stored neither, we get it from the db, calling the right function
          newData = await actionToGetData().catch(() => {
            throw new Error();
          });
        }

        // Runs the correct update the state
        actionToUpdateData(newData);
      }
    },

    // Gets all the games videos associated to this team
    async getChallengesVideos() {
      const data = {
        userId: "all",
        teamsIds: this.team.id,
        seasonId: this.seasonId,
        ageCategoryId: this.ageCategoryId,
        categoryId: this.challengeCategoryId,
        challengeId: "all",
        videoId: "all",
        watched: 0,
        getFullLength: undefined,
        size: this.size,
        page: this.page,
      };

      // Dispatches the action to get the videos
      const response = await this.getChallengesVideosDispatch(data);
      return response.data.videos.list;
    },

    // Gets all the games associated to the team
    async getChallenges() {
      let data = {
        name: this.name,
        teamsIds: this.team.id,
        seasonId: this.seasonId,
        ageCategoryId: this.ageCategoryId,
        categoryId: this.challengeCategoryId,
        size: this.size,
        page: this.page,
        order: this.order,
      };

      // Dispatches the action to get the challenges
      const response = await this.getChallengesDispatch(data);
      return response.data.challenges;
    },

    // Gets all the exercises associated to this team
    async getExercises() {
      let data = {
        name: this.name,
        teamsIds: this.team.id,
        seasonId: this.seasonId,
        ageCategoryId: this.ageCategoryId,
        moduleId: "all",
        categoryId: this.challengeCategoryId,
        size: this.size,
        page: this.page,
        order: this.order,
      };

      // Dispatches the action to get the exercises
      const response = await this.getExercisesDispatch(data);
      return response.data.exercises;
    },

    // Gets the player's statistics on a specific exercice
    async getExerciseStats(userId, exerciseId) {
      let data = {
        userId: userId,
        exerciseId: exerciseId,
      };

      // Dispatches the action to get the player's results in the exercice
      const response = await this.getExerciseStatsDispatch(data).catch(() => {
        throw new Error();
      });
      this.playerExerciseStats = response.data;
    },

    // Gets the player's statistics on a specific game
    async getChallengeStats(userId, challengeId) {
      let data = {
        challengeId: challengeId,
        userId: userId,
      };

      // Dispatches the action to get the player's results in the game
      const response = await this.getChallengeStatsDispatch(data);
      this.gameScore = response.data.userScore;
      this.expectedScore = response.data.scoreFederation 
    },

    // Gets the players' characteristics values like position, age etc.
    async getPlayerCharacteristics() {
      if (!this.playerCharacteristics.positions.length) {
        // The characteristics that define players are not yet stored, we need to get it and update the state so that we do not need to do it again later
        const response = await this.getPlayerCharacteristicsDispatch().catch(
          () => {
            this.$swal(this.$store.state.apiInternalError);
            throw new Error();
          }
        );
        // Updates the state
        this.updatePlayerCharacteristics(response.data);
      }
    },

    // Gets the player's results on the current selected exercice or challenge and displays the modal that gathers all the exercises/challenges
    showStats(userId) {

        if($('#nav-challenge')[0].className.includes('active')) {
        /* The challenge tab is active, it means the coach already opened it before and looked at a player stats
            The modal will open on the same tab and challenge, we therefore get the new player's stats on this challenge
        */
            this.getChallengeStats(userId, this.challengeId)
                .then(() => $("#player_stats_modal").modal("show"))

        } else {
        /* The modal will open in the exercise tab because either the exercise tab is already active for a previous player's stats observation
        or because it's the first time the coach tries to see one of his player's stats. 
        We therefore get the player's stats on the selected exercice 
         */
            this.getExerciseStats(userId, this.exerciseId)
                .then(() => $("#player_stats_modal").modal("show"))
                .catch(() => this.$swal(this.$store.state.apiInternalError));            
        }
    },

    // Derives the progression rate depending on the previous participation of the player
    deriveProgressionRate() {
      const previousRateSuccess = this.playerExerciseStats.userOldScore
        ? this.playerExerciseStats.userOldScore.rate_success
        : 0;

      let progressionRate = 0;

      if (this.rateSuccess) {
        // The user already has participated at least once in the exercice and has therefore a statistic

        if (previousRateSuccess) {
          // The user has already participated at least twice, we can derive a progressionRate from his first participation to the latest one
          progressionRate = this.rateSuccess / previousRateSuccess - 1;
          progressionRate = Math.round(progressionRate * 100);
        } else {
          progressionRate = 100;
        }
      }

      return progressionRate;
    },

    getName(name) {
      return name.replace("T", " - ");
    },

    // Redirects the user to his home page if he doesn't belong to this team
    redirect() {
      // Next lines checks if the user is involved in this team
      const role = this.user.roles;
      let redirectNeeded = false;

      switch (role) {
        // Depending on the user's role we do different check

        case this.coachRole:
          // This is a coach, so we can get his coach object
          if (this.team.coach_id !== this.user.coach.id) {
            redirectNeeded = true;
          }
          break;

        case this.clubRole:
          // This is a club, so we can get his club object
          if (this.team.club_id !== this.user.club.id) {
            redirectNeeded = true;
          }
          break;

        default:
          // This is a player, so we can check on the players who are registered within this team
          const teamPlayersIds = this.team.team_users.map(
            (teamUser) => teamUser.user_id
          );
          if (!teamPlayersIds.includes(this.user.id)) {
            redirectNeeded = true;
          }
      }

      return redirectNeeded;
    },
  },
};
</script>

<style scoped>

    .stat_div_left_top div {
        float: right;
    }

    .stat_div_right_top div {
        float: left;
    }

.game_stats {
  border-bottom: 0px solid #d8d9da !important;
  margin-left: 70px !important;
  margin-right: 70px !important;
}
.progress {
  position: absolute;
  height: 160px;
  width: 160px;
  cursor: pointer;
  top: 50%;
  left: 50%;
  margin: -80px 0 0 -80px;
}

.progress-circle {
  transform: rotate(-90deg);
  margin-top: -40px;
}

.progress-circle-back {
  fill: none;
  stroke: #d2d2d2;
  stroke-width: 10px;
}

.progress-circle-prog {
  fill: none;
  stroke: #3fb389;
  stroke-width: 10px;
  stroke-dasharray: 0 999;
  stroke-dashoffset: 0px;
  transition: stroke-dasharray 0.7s linear 0s;
}

.progress-text {
  width: 100%;
  position: absolute;
  top: 60px;
  text-align: center;
  font-size: 2em;
}
.team_header_div {
  margin: 100px 0px;
}
.stat_circle {
  padding: 68px 4px 79px 0px;
  border-radius: 100%;
  /* margin: 10px 10px; */
  text-align: center;
  background-image: url(/images/background/statistics_bg.png);
  background-repeat: no-repeat;
  background-position-x: 10px;
  background-position-y: 12px;
  background-size: 169px;
  width: 185px;
  height: 206px;
}
.player_slider_name {
  color: #3fb389 !important;
  text-align: center !important;
  font-size: 18px !important;
  font-weight: 700;
}
.card {
  margin-top: 10px;
  position: relative;
  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.12);
  -moz-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.12);
  box-shadow: none;
}
section .section-title {
  text-align: center;
  color: #007b5e;
  margin-bottom: 50px;
  text-transform: uppercase;
}
#tabs {
  background: #f9f9f9;
}
#tabs h6.section-title {
  color: #eee;
}
#tabs .nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  color: #f3f3f3;
  background-color: transparent;
  border-color: transparent transparent #f3f3f3;
  border-bottom: 4px solid !important;
  font-size: 20px;
  font-weight: bold;
}
#tabs .nav-tabs .nav-link {
  border: 1px solid transparent;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  color: #3fb389;
  font-size: 20px;
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
    background: #ffffff;
    padding: 30px 50px 30px 50px;
    border: 1px solid gainsboro;
    width: 100%;
    border-radius: 15px;
  }
  .stat_div_left_top {
    border-right: 1px solid #d8d9da !important;
  }

  .stat_div_left_bottom {
    border-right: 1px solid #d8d9da;
  }
}
.modal-backdrop {
  opacity: 0.5 !important;
  background: #000 !important;
}
.stat_circles {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.stat_number {
  color: #3fb389;
  font-size: 25px;
  font-weight: 700;
  margin: 0px 0px 5px 10px;
}
.stat_text {
  color: #3fb389;
  font-size: 13px;
  font-weight: 700;
  margin: 0px 0px 0px 5px;
}
#expand-btn {
  margin: 0px !important;
}

.home_stat_circle {
  padding: 45px 21px 78px 21px;
  border-radius: 100%;
  margin: 50px 23px;
  text-align: center;
  border: 7px solid #ffe18c;
  background-repeat: no-repeat;
  background-position-x: 25px;
  background-position-y: 35px;
  background-size: 132px;
  width: 146px;
  height: 145px;
}

.home_stat_number {
  color: #fff;
  font-size: 35px;
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
.rs-team.style1 .player-item .person-details:after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff !important;
  color: #3fb389;
  opacity: 1;
  top: 0;
  left: 0;
  z-index: 0;
  border: 1px solid #d6d6d6 !important;
  border-radius: 0px 0px 8px 8px;
}
.player_slider_img {
  border-radius: 8px 8px 15px 15px !important;
  height: 320px !important;
}
.player_slider_name {
  color: #3fb389 !important;
  text-align: center !important;
  font-size: 22px !important;
}
.player_slider_position {
  color: #111 !important;
  text-align: center !important;
}
/* Style The Dropdown Button */
.top_drop_button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
}
/* The container 
         <div>
         - needed to position the dropdown content */
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
.club_name {
  font-size: 30px;
  font-weight: 600;
  color: #3a3a3a;
  margin-left: 15px;
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
.nav-style .owl-carousel .owl-nav [class*="owl-"] {
  top: 40% !important;
}

/* Smartphone (portrait and landscape) ----------- */
@media only screen and (min-width: 320px) and (max-width: 700px) {
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
    width: 120px;
    height: 120px;
  }
  .home_stat_number {
    color: #fff;
    font-size: 25px;
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

  .stat_div_left_top div {
      float: none;
  }
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-width: 768px) and (max-width: 1024px) {
}
</style>
