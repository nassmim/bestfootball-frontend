<template>
  <!-- Component that displays all the videos uploaded by the players 
for both games that were created by BestFootball or coaches
-->

  <div class="rs-single-club md-pb-80 pt-20">
    <div class="container">
      <div class="rs-tab pb-100 md-pb-80">
        <div class="single-team-data">
          <div class="tab-content">
            <div class="tab-pane fade show active" id="entrainements">
              <div class="club-videos pb-40 md-pb-70">
                <div class="rs-products">
                  <div class="shop-guide mb-30 mt-60">
                    <div class="row rs-vertical-middle">
                      <div class="col-lg-2 col-md-2 col-sm-2 xs-mb-15 mb-50">
                        <div class="title-style md-pb-30">
                          <h2 class="margin-0 uppercase">
                            {{ $tc("video", 2) | capitalizeText }}
                          </h2>
                          <span class="line-bg y-b pt-10 left-line"></span>
                        </div>
                      </div>

                      <div
                        class="col-lg-10 col-md-10 col-sm-10 text-right xs-text-left"
                      >
                        <div
                          style="margin-top:-40px !important;"
                          class="sorting text-right"
                        >
                          <form>
                            <div class="row">
                              <div class="col-md-9">
                                <select
                                  v-if="teamFeaturesVisible && userTeams.length"
                                  v-model="displayTeamChallenges"
                                  @change="filterVideos"
                                >
                                  <option :value="false" selected>{{
                                    $t("appName")
                                  }}</option>
                                  <option :value="true">
                                    {{ $tc("team", 2) | capitalizeText }}
                                  </option>
                                </select>
                                <select
                                  v-if="displayTeamChallenges"
                                  v-model="seasonId"
                                  @change="filterVideos"
                                >
                                  <option value="all"
                                    >-- {{ $t("allSeasons") }} --</option
                                  >
                                  <option
                                    v-for="season in seasons"
                                    :key="season.id"
                                    :value="season.id"
                                  >
                                    {{ season.name }}
                                  </option>
                                </select>
                                <select
                                  v-if="displayTeamChallenges"
                                  v-model="teamId"
                                  @change="filterVideos"
                                >
                                  <option value="all"
                                    >-- {{ $t("allTeams") }} --</option
                                  >
                                  <option
                                    v-for="team in teams"
                                    :key="team.id"
                                    :value="team.id"
                                  >
                                    {{ team.name }}
                                  </option>
                                </select>
                                <select
                                  v-model="challengeCategoryId"
                                  @change="
                                    filterVideos('challenges', getChallenges)
                                  "
                                >
                                  <option value="all"
                                    >-- {{ $t("allCategories") }} --</option
                                  >
                                  <option
                                    v-for="category in challengesCategories"
                                    :key="category.id"
                                    :value="category.id"
                                  >
                                    {{
                                      currentLocale === $i18n.fallbackLocale
                                        ? category.english_name
                                        : category.french_name
                                    }}
                                  </option>
                                </select>

                                <select
                                  v-model="challengeId"
                                  @change="
                                    filterVideos(
                                      'challengesCategories',
                                      getChallengesCategories
                                    )
                                  "
                                >
                                  <option value="all"
                                    >-- {{ $t("allChallenges") }} --</option
                                  >
                                  <option
                                    v-for="challenge in challenges"
                                    :key="challenge.id"
                                    :value="challenge.id"
                                  >
                                    {{ challenge.name }}
                                  </option>
                                </select>
                              </div>

                              <div class="col-md-3">
                                <div class="form-group">
                                  <div class="input-group">
                                    <input
                                      style="padding:10px !important;"
                                      type="text"
                                      class="form-control"
                                      aria-describedby="inputGroupPrepend"
                                      :placeholder="
                                        $options.filters.capitalizeText(
                                          this.$tc('video')
                                        ) +
                                          ' ' +
                                          $t('n°') +
                                          '...'
                                      "
                                      @keydown.enter.prevent="searchVideo"
                                      v-model.trim="videoSearchInput"
                                    />
                                    <div
                                      style="cursor: pointer;"
                                      class="input-group-prepend"
                                    >
                                      <span
                                        style="background: #fff !important; padding: 13px !important; border-left: 1px solid #fff !important;"
                                        class="input-group-text"
                                        id="inputGroupPrepend"
                                        @click="searchVideo"
                                      >
                                        <i class="fa fa-search"></i>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  v-if="videos.length"
                  id="video_section"
                  class="row vertical_scroll_bar"
                >
                  <!--Display videos Start-->
                  <div
                    v-for="video in videos"
                    :id="video.id"
                    class="col-lg-4 col-md-12 mt-10"
                    :key="video.id"
                  >
                    <div class="video_wrap">
                      <a class="popup_videos" @click="goToVideo(video.id)">
                        <img
                          :src="
                            `/upload/images/challenges/participations/${video.thumbnail_path}`
                          "
                        />
                        <i class="fa fa-play"></i>
                      </a>
                      <span class="col-sm-3" style="color:#3FB389;">
                        <i class="fa fa-eye"></i>
                        {{ video.view }}
                      </span>
                      <span class="col-sm-3" style="color:#3FB389;">
                        <i class="fa fa-soccer-ball-o"></i>
                        {{ video.score }}
                      </span>
                    </div>
                  </div>
                  <infinite-loading
                    spinner="circles"
                    :identifier="infiniteId"
                    @infinite="infiniteHandler"
                    :distance="1"
                  >
                    <div slot="no-more">{{ $t("noMoreResults") }}</div>
                    <div slot="no-results">
                      {{
                        pageNumber === 0 && !videos.length ? $t("noResult") : ""
                      }}
                    </div>
                  </infinite-loading>
                </div>

                <div v-else>
                  <div class="container">
                    <div
                      style="background: #f6f6f6; padding: 30px 30px 1px 30px;"
                      class="mb-80"
                      id="no_data_div"
                    >
                      <center>
                        <h6 style="color: gray;">{{ $t("noVideo") }}</h6>
                      </center>
                    </div>
                  </div>
                </div>
                <!--Display videos End-->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import scrollLoadingMixin from "../../../mixins/scrollLoadingMixin";
import trainingsFeatures from "../../../mixins/trainingsFeatures";

export default {
  name: "GamesVideos",

  mixins: [scrollLoadingMixin, trainingsFeatures],

  data() {
    return {
      videos: [],
      challenges: [],
      challengesCategories: [],
      videoSearchInput: "",
      teamId: "all",
      seasonId: "all",
      ageCategoryId: "all",
      challengeCategoryId: "all",
      challengeId: "all",
      pageNumber: 0,
      size: "all",
      videosToDisplaySize: 3,
      infiniteId: +new Date(),
      displayTeamChallenges: false,
    };
  },

  computed: {
    ...mapState({
      challengesFromState: (state) => state.trainings.challenges,
      challengesCategoriesFromState: (state) => state.trainings.categories,
      userTeams: (state) => state.teams.userOnes,
      teamFeaturesVisible: (state) => state.user.teamFeaturesVisible,
    }),

    // Gets the language chosen by the user
    currentLocale() {
      return this.$i18n.locale;
    },

    seasons() {
      return this.$store.getters.Seasons(this.userTeams);
    },

    // Gets the teams to display depending on the season selected by the user
    teams() {
      if (parseInt(this.seasonId)) {
        // A specific season has been selected, so we take only the teams associated to this season
        return this.userTeams.filter(
          (team) => team.season_id === this.seasonId
        );
      } else {
        // We take all the user's teams as no filter on the season has been made
        return this.userTeams;
      }
    },

    teamsIds() {
      // If the user is not part of a team, then the filter on team has no value other than the initial one
      let chosenTeamsIds = "all";

      if (this.teamFeaturesVisible && this.displayTeamChallenges) {
        /* The user is part of the team, and he has selected to display only the team users' videos 
            so we need to know which team he want. 
            if a team has been selected from the filter (i.e. there is a value different than the initial one), we use this team id. If not, we get all the user's teams
            */
        chosenTeamsIds = parseInt(this.teamId)
          ? this.teamId
          : this.teams.map((team) => team.id);
      }

      return chosenTeamsIds;
    },
  },

  async created() {
    this.videos = await this.getChallengesVideos(this.$route.params.id);
    this.$store.commit('CHALLENGESVIDEOS_LIST_UPDATE', this.challenges)    

    this.challengesCategories = { ...this.challengesCategoriesFromState };
    if (!this.challengesCategoriesFromState.length) {
      this.challengesCategories = await this.getChallengesCategories(true);
    }

    this.challenges = { ...this.challengesFromState };
    if (!this.challengesFromState.length) {
      this.challenges = await this.getChallenges(true);
    }
  },

  methods: {
    ...mapActions({
      getChallengesVideosDispatch: "getChallengesVideos",
      getChallengesDispatch: "getChallenges",
      getChallengesCategoriesDispatch: "getChallengesCategories",
    }),

    ...mapMutations({
      updateUserTeams: "USER_TEAMS_UPDATE",
      updateChallenges: "CHALLENGES_LIST_UPDATE",
      updateChallengesCategories: "CHALLENGES_CATEGORIES_UPDATE",
    }),

    // Gets either the video to watch if the video id is specified or the X videos depending on the size/offset params
    async getChallengesVideos(videoId = undefined) {
      const data = {
        userId: "all",
        teamsIds: this.teamsIds,
        seasonId: this.seasonId,
        ageCategoryId: this.ageCategoryId,
        categoryId: this.challengeCategoryId,
        challengeId: this.challengeId,
        videoId: videoId,
        watched: 0,
        getFullLength: undefined,
        size: this.videosToDisplaySize,
        page: this.pageNumber,
      };

      // Dispatches the action to get the videos
      const response = await this.getChallengesVideosDispatch(data).catch(
        () => {
          this.$swal(this.$store.state.apiInternalError);
          throw new Error();
        }
      );

      if (videoId) {
        return response.data.video;
      } else {
        return response.data.videos.list;
      }
    },

    // Gets the videos matching the new filter
    async filterVideos(filterToUpdate, actionForUpdate) {
      this.videoSearchInput = "";

      // The api will need to get the first videos matching the new filter
      this.pageNumber = 0;
      this.videos = [];
      // Makes the infinite loading component reset so that it restarts its state with the new list of videos
      this.infiniteId += 1;

      // Loads the data to display in the screen, updating directly the list of videos
      this.loadData(
        this.videos,
        this.videosToDisplaySize,
        this.pageNumber,
        this.getChallengesVideos,
        undefined
      );

      if (arguments.length > 1) {
        // Arguments are specified if another filter depends on the one who just got changed
        this[filterToUpdate] = await actionForUpdate();
      }
    },

    async searchVideo() {
      // Needs to reset the videos list
      this.pageNumber = 0;
      this.videos = [];

      // Makes the infinite loading component reset so that it restarts its state with the new list of videos
      this.infiniteId += 1;

      const videoId = this.videoSearchInput.match(/\d+/g).map(Number)[0];
      this.videos = [await this.getChallengesVideos(videoId)];
    },

    // Gets all the challenges depending on the selected category
    async getChallenges(updateState = undefined) {
      let data = {
        name: "all",
        teamsIds: this.teamsIds,
        seasonId: this.seasonId,
        ageCategoryId: this.ageCategoryId,
        categoryId: this.challengeCategoryId,
        size: this.size,
        page: this.page,
        order: "name",
      };

      // Updates the challenges list to display and updates the state if required
      const challenges = await this.getDataUpdateState(
        data,
        this.getChallengesDispatch,
        "challenges",
        updateState,
        this.updateChallenges
      );
      return challenges;
    },

    // Gets the available categories depending on the selected challenge
    async getChallengesCategories(updateState = undefined) {
      // Updates the challenges categories list to display and updates the state if required
      const categories = await this.getDataUpdateState(
        { challengeId: this.challengeId },
        this.getChallengesCategoriesDispatch,
        undefined,
        updateState,
        this.updateChallengesCategories
      );
      return categories;
    },

    // Handles the infinite loading component to update the list of videos once the user scrolls down
    infiniteHandler($state) {
      if (this.videoSearchInput) {
        $state.complete();
        return;
      }

      // The user scrolled down, the api must return the X (size) next user's videos
      this.pageNumber++;
      // Loads the data to display in the screen, updating directly the list of videos
      this.loadData(
        this.videos,
        this.size,
        this.pageNumber,
        this.getChallengesVideos,
        $state
      );
    },

    goToVideo(videoId) {
      this.$router.push({
        name: "GameVideo",
        params: {
          id: videoId,
        },
      });
    },
  },
};
</script>

<style scoped>
.rs-single-club .club-videos .video_wrap .popup_videos img {
  width: 100%;
  height: 200px !important;
}
.sec-bg {
  background: #f7f7f7 !important;
}
.video_play_icon {
  position: absolute;
  content: "";
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  color: #ffffff;
  z-index: 1;
}

.rs-tab .single-team-data .tab-content .tab-pane {
  background: #ffffff;
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
  max-width: 232px;
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
  font-size: 13px;
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
    background: #ffffff;
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

@media screen and (max-width: 500px) {
  .rs-products .shop-guide .sorting select {
    padding: 10px;
    border: 1px solid #ced4da;
    border-radius: 5px;
    outline: none;
    color: #555555;
    float: left;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 15px;
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
