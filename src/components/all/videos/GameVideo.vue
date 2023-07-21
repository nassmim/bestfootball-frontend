<template>
  <!-- Component that displays a specific video uploaded by a user 
and all the other videos are accessible from the sidebar 
-->

  <!-- Single Club Section Start -->
  <div class="rs-single-club sec-bg md-pb-80 pt-20">
    <div class="container">
      <div class="rs-tab pb-100 md-pb-80">
        <div class="single-team-data">
          <div class="row video_row">
            <div class="col-md-8 single_videos">
              <h3 style="margin: 20px">
                {{ $tc("video") | capitalizeText }} {{ $t("n°") }}
                {{ video.id }}
              </h3>
              <div id="large_video">
                <video width="700" height="400" controls>
                  <source
                    :src="
                      `/upload/videos/challenges/participations/${video.bf_path}`
                    "
                    type="video/mp4"
                  />
                </video>
              </div>

              <div class="container mt-3">
                <div style="display: flex" class="video_stats row">
                  <div style="width: 50%; float: left" class="video_name">
                    <h5 style="color: #3fb389; float: left">
                        <router-link :to="{name: 'Home', params: {username: video.user.username}}">
                            <i
                                style="border: 1px solid f6f6f6; border-radius: 50px"
                                class="fa fa-user"
                            ></i>
                            {{ video.user.username }}
                        </router-link>
                    </h5>
                  </div>
                  <div style="width: 50%" class="video_points">
                    <!-- <span>
                      <small
                        style="
                            font-weight: 600;
                            float: right;
                            margin-right: 13px;
                          "
                      >
                        <i class="fa fa-heart"></i> {{video.likes}}
                      </small>
                    </span> -->
                    <span>
                      <small
                        style="
                            font-weight: 600;
                            float: right;
                            margin-right: 13px;
                          "
                      >
                        <i class="fa fa-soccer-ball-o"></i> {{ video.score }}
                      </small>
                    </span>
                    <span>
                      <small
                        style="
                            font-weight: 600;
                            float: right;
                            margin-right: 13px;
                          "
                      >
                        <i class="fa fa-eye"></i> {{ video.view }}
                      </small>
                    </span>
                  </div>
                </div>
              </div>

              <div class="row">
                <!-- <div style class="follow_btn_div">
                  <center>
                    <a href="#" class="readon follow_btn">Follow</a>
                  </center>
                </div> -->
                <div v-if="user.player && video.user.username && video.user.username !== user.username" style class="challenge_btn_div">
                  <center>
                        <router-link 
                            :to="{name: 'DuelRequest', params: {username: video.user.username}}"
                            class="readon challenge_btn"
                        >   
                            {{$t('challengeHim')}}
                        </router-link>
                  </center>
                </div>

                <div class="col-md-12 mt-5">
                  <center>
                    <ul
                      style="font-size: 25px; margin-top: 14px; display:inline !important;"
                      class="social_icon"
                    >
                      <li>
                        <a href="#">
                          <i class="fa fa-instagram mr-10"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-snapchat mr-10"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-youtube mr-10"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fa fa-facebook mr-10"></i>
                        </a>
                      </li>
                    </ul>
                  </center>
                </div>
              </div>
              <!-- <br />
              <br />
              <hr />
              <div class="row">
                <div class="container">
                  <form action>
                    <div class="form-group">
                      <h4>Commentaires</h4>
                      <textarea
                        name="comment"
                        id="comment"
                        class="form-control"
                        rows="5"
                      >
Ecrit ta commentaire...</textarea
                      >
                    </div>
                    <a
                      href="#"
                      style="
                          padding: 8px 30px 8px 30px !important;
                          color: #fff !important;
                          margin-top: -10px;
                        "
                      class="readon"
                      >Submit</a
                    >
                  </form>
                </div>
              </div> -->
            </div>

            <div class="col-md-3 more_videos">
              <h5 class="more_videos_header">{{$t('lastVideos')}}</h5>
              <div class="row">
                <div class="video-list col text-center">
                  <div
                    v-for="videoItem in getVideosToDisplay(videos)"
                    :key="videoItem.id"
                    class="col-md-12 mt-10"
                  >
                    <div style="margin-top: 24px" class="video_wrap">
                      <a
                        class="popup_videos"
                        @click="updateVideo(videoItem.id)"
                        href="#"
                      >
                        <img
                          :src="
                            `/upload/images/challenges/participations/${videoItem.thumbnail_path}`
                          "
                          alt
                        />
                        <i class="fa fa-play video_play_icon"></i>
                      </a>
                      <div class="container">
                        <div class="row">
                          <h5 style="color: #3fb389; float: left" class="mt-3">
                            <router-link :to="{name: 'Home', params: {username: videoItem.user.username}}">
                                <i
                                style="
                                    border: 1px solid f6f6f6;
                                    border-radius: 50px;
                                    "
                                class="fa fa-user"
                                ></i>
                                {{videoItem.user.username}}
                            </router-link>
                          </h5>
                        </div>
                        <div
                          style="display: flex; margin-top: -25px"
                          class="video_stats row"
                        >
                          <div style="width: 50%" class="video_name">
                            <router-link
                              :to="{
                                name: 'GamePresentation',
                                params: { name: videoItem.challenge.name },
                              }"
                            >
                              <small style="font-weight: 600; float: left">{{
                                videoItem.challenge.name
                              }}</small>
                            </router-link>
                          </div>
                          <div style="width: 50%" class="video_points">
                            <small style="font-weight: 600; float: right">
                              <i class="fa fa-soccer-ball-o"></i>
                              {{ videoItem.score }}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <infinite-loading
                    spinner="circles"
                    :identifier="infiniteId"
                    @infinite="infiniteHandler"
                  >
                    <div slot="no-more">{{ $t("noMoreResults") }}</div>
                    <div slot="no-results">
                      {{ pageNumber === 0 ? $t("noResult") : "" }}
                    </div>
                  </infinite-loading>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Single Club Section End -->

</template>

<script>
import { mapActions, mapState } from "vuex";
import scrollLoadingMixin from "../../../mixins/scrollLoadingMixin";

export default {
  name: "GameVideo",

  mixins: [scrollLoadingMixin],

  data() {
    return {
      video: { user: {} },
      videoId: 0,
      videos: [],
      infiniteId: +new Date(),
      size: 5,
      pageNumber: 0,
    };
  },

  computed: {
    ...mapState({
      user: (state) => state.user.data,
      isConnected: (state) => state.user.isConnected,
    }),
  },

  async created() {
      this.videoId = this.$route.params.id
    const response = await this.getChallengesVideos(this.videoId);
    this.video = response[0];
    this.videos = response[1];
  },

  methods: {
    ...mapActions({
      getChallengesVideosDispatch: "getChallengesVideos",
    }),

    /* Updates the video to display in the screen, getting it thanks to its id
        This function is needed because the request is made at the creation hook but 
        clicking on the video thumbnails on the sidebar does not create again the component 
        */
    async updateVideo(videoId) {
        this.videoId = videoId
      const response = await this.getChallengesVideos(videoId);
      this.video = response[0];
      this.$router.push({
        name: "GameVideo",
        params: {
          id: videoId,
        },
      });
    },

    // Gets either the video to watch if the video id is specified or the X videos depending on the size/offset params
    async getChallengesVideos(videoId = undefined) {
      const data = {
        userId: "all",
        teamsIds: "all",
        seasonId: "all",
        ageCategoryId: "all",
        categoryId: "all",
        challengeId: "all",
        videoId: videoId,
        watched: 1,
        getFullLength: undefined,
        size: this.size,
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
        return [response.data.video, response.data.videos.list];
      } else {
        return response.data.videos.list;
      }
    },

    // Removes the watched video from the latest videos to display. Otherwise it will generate an navigation error if the user clicks on the video he's already watching
    getVideosToDisplay() {
        return this.videos.filter(video => video.id != this.videoId)
    },

    // Handles the infinite loading component to update the list of videos once the user scrolls down
    infiniteHandler($state) {
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
  },
};
</script>

<style scoped>
.single_videos {
  margin-left: 20px;
  margin-right: 40px;
}
.more_videos {
  padding-right: 0px !important;
  padding-left: 0px !important;
  margin-top: 30px;
  /* margin-left: 80px; */
}
.more_videos_header {
  background: #3fb389;
  padding: 10px 10px 10px 10px;
  color: white;
  text-align: center;
}
video {
  width: 102%;
  height: auto;
}

.video-list {
  padding: 0px 15px 10px 15px;
  margin-top: -26px;
  overflow: auto !important;
  height: 750px !important;
}

.video_play_icon {
  position: absolute !important;
  content: "";
  left: 50% !important;
  top: 35% !important;
  transform: translate(-50%, -50%);
  font-size: 24px;
  border-radius: 50px;
  background: #3fb389;
  padding: 10px 10px 10px 16px;
  color: #ffffff;
  z-index: 1 !important;
}
.sec-bg {
  background: #f7f7f7 !important;
}

ul.no_bullet {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li.ball {
  background: url("/images/icons/ball_bullet.png") no-repeat 0px 7px;
  height: 54px;
  padding-left: 35px;
  padding-top: 0px;
  line-height: 22px;
}
.social_icon li {
  font-size: 25px !important;
  display: inline !important;
}
.rs-single-club .club-videos .video_wrap .popup_videos i {
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
.follow_btn {
  padding: 10px 50px 10px 50px !important;
  color: #fff !important;
  margin-top: -10px;
  margin-left: 140px;
  margin-right: 10px;
}
.like_btn {
  padding: 10px 50px 10px 50px !important;
  color: #fff !important;
  margin-top: -10px;
  margin-right: 10px;
}
.challenge_btn {
  padding: 10px 50px 10px 50px !important;
  color: #fff !important;
  margin-top: -10px;
  margin-right: 10px;
}

@media screen and (max-width: 500px) {
  .readon {
    margin: 8px !important;
  }

  .follow_btn {
    padding: 5px 20px !important;
    font-size: 11px !important;
    color: rgb(255, 255, 255) !important;
    margin-left: 40px !important;
  }
  .like_btn {
    padding: 5px 20px !important;
    font-size: 11px !important;
    color: rgb(255, 255, 255) !important;
  }
  .challenge_btn {
    padding: 5px 20px !important;
    font-size: 11px !important;
    color: rgb(255, 255, 255) !important;
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
/* Smartphone & kindle (portrait and landscape) ----------- */
@media only screen and (min-width: 320px) and (max-width: 700px) {
  .video_row {
    margin-right: -70px;
    margin-left: -50px;
  }
  .single_videos {
    margin-left: 30px !important;
    margin-right: 60px !important;
  }
  .more_videos {
    padding-right: 70px !important;
    padding-left: 50px !important;
    margin-top: 30px;
  }
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .video_row {
    margin-right: -575px;
    margin-left: -97px;
  }
}
</style>
