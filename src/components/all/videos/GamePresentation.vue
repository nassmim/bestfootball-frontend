<template>
    <!-- Component that displays the game presentation, with the explanations, 
  the levels to reach and the scores associated 
  -->
    <!-- Single Club Section Start -->
    <div class="rs-single-club sec-bg md-pb-80 pt-20">
        <div class="container">
            <div class="rs-tab pb-100 md-pb-80">
                <div class="single-team-data">
                    <div class="row video_row">
                        <div style="margin-left: 40px; margin-right: 40px;" class="col-md-8">
                            <h3 style="margin: 20px;">
                                {{challenge.team_id ? challenge.name.slice(0,-9) : challenge.name}}
                                </h3>
                            <div id="large_video">
                                <video width="700" height="400" controls>
                                    <source :src="(challenge.from_upload ? '/upload' : '') +  `/videos/challenges/presentations/${challenge.bf_path}`" type="video/mp4" />
                                </video>
                            </div> 
                            <br />
                            <br />
                            <div class="row">
                                <div v-if="playerFeaturesVisible" class="col-md-4 text-center try_btn">
                                    <a href="#" style="padding: 10px 50px 10px 50px !important; color: #fff !important; margin-top: -10px;" class="readon" data-toggle="modal" data-target="#upload_modal" @click="checkIfAllowed">
                                        {{$t('try')}}
                                    </a>
                                </div>
                                <div v-if="challenge.challenge_tutorial" class="col-md-4 text-center try_btn">
                                    <router-link 
                                        :to="{name: 'Tutorial', params: {name: challenge.name}}"
                                        @click.native="updateChallenge(challenge)"
                                        style="padding: 10px 50px 10px 50px !important; color: #fff !important; margin-top: -10px;"
                                        class="readon"
                                    >
                                        {{$tc('tutorial') | capitalizeText}}
                                    </router-link>
                                </div>
                                <div class="col-md-4 try_btn">
                                    <center>
                                        <ul style="font-size: 25px; margin-top: 14px; display: inline !important;" class="social_icon">
                                            <li>
                                                <a href="#"> <i class="fa fa-instagram mr-10"></i> </a>
                                            </li>
                                            <li>
                                                <a href="#"> <i class="fa fa-snapchat mr-10"></i> </a>
                                            </li>
                                            <li>
                                                <a href="#"> <i class="fa fa-youtube mr-10"></i> </a>
                                            </li>
                                            <li>
                                                <a href="#"> <i class="fa fa-facebook mr-10"></i> </a>
                                            </li>
                                        </ul>
                                    </center>
                                </div>
                            </div>
                            <br />
                            <br />
                            <hr />
                            <div class="row">
                                <div class="container">
                                    <ul class="no_bullet">
                                        <li style="background: url('/images/icons/ball_bullet.png') no-repeat 0px 7px;" class="ball">
                                            {{currentLocale === $i18n.fallbackLocale ? challenge.english_description : challenge.french_description }}
                                        </li>
                                        <li v-if="challenge.challenge_coach_reward" style="background: url('/images/icons/ball_bullet.png') no-repeat 0px 7px;" class="ball">
                                           {{$tc('reward', 2) | capitalizeText}}: {{challenge.challenge_coach_reward}}
                                        </li>                                        
                                        <li style="background: url('/images/icons/ball_bullet.png') no-repeat 0px 7px;" class="ball">{{$t('challengeMotivation')}}</li>
                                        <br/>
                                        <li v-if="challenge.tutorial_video_link" style="background: url('/images/icons/ball_bullet.png') no-repeat 0px 7px;" class="ball">
                                            {{$t('challengeTutorialImportance')}} 
                                            <router-link to="#" @click.native="goToNewPage(challenge.tutorial_video_link)">
                                                {{$tc('tutorial')}} 
                                            </router-link>                                        
                                        </li>
                                        <br/>
                                        <li style="background: url('/images/icons/ball_bullet.png') no-repeat 0px 7px;" class="ball">({{$t('warningChallengeCheat')}}!)</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-3 les_paliers_div">
                            <h5 class="game_presantation_left_header" style="background: #3fb389; padding: 10px 10px 10px 10px; color: white; text-align: center;">
                                {{$tc('level', 2) | capitalizeText}}
                            </h5>
                            <div class="row">
                                <div class="stats_boxes">
                                 <div v-for="step in challenge.challenge_steps" :key="step.id" class="stats_box">
                                     
                                     <center>
                                        <div style="border: 3px solid #3fb389; width: 100px; height: 100px; border-radius: 100%;" :class="{'step_reached': challengeStats.userMaxStep >= step.step}">
                                            <p style="margin-top: 35px; font-weight: 600; font-size: 16px; color: #111111;">{{step.point}} {{$t('pts')}}</p>
                                        </div>
                                        <small style="font-weight: 600;">
                                        <strong>{{step.score}} {{currentLocale === $i18n.fallbackLocale ? challenge.english_trick_to_do : challenge.french_trick_to_do}}</strong>
                                        </small>
                                    </center>
                                </div> 
                                </div>   
                              
                            </div>

                            <template v-if="user.player && challenge.challenge_score_federations">
                                <h5 class="game_presantation_left_header" style="background: #3fb389; padding: 10px 10px 10px 10px; color: white; text-align: center;">
                                    {{$t('expectedLevel')}}
                                </h5>
                                <div class="row">
                                    <template v-if="user.player.category_id">
                                        <div class="container" style="margin: 0px 50px 0px; padding: 10px 10px 10px 10px;">
                                            <p>
                                                {{$tc('category')}} {{user.player.player_category.name}} - {{$t('FFFPrerequisites')}} : {{challengeStats.scoreFederation}} {{currentLocale === $i18n.fallbackLocale ?
                                                challenge.english_trick_to_do : challenge.french_trick_to_do}} 
                                                <br/>
                                                {{challengeStats.userScore >= challengeStats.scoreFederation ? $t('FFFPrerequisitesSuccess') : $t('FFFPrerequisitesGoal')}}
                                            </p>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <p>
                                            {{$t('FFFPrerequisitesProfileNeeded')}}
                                        </p>
                                    </template>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <UploadComponent
            ref="UploadComponent"
            :title="$options.filters.capitalizeText($t('upload')) + ' ' + $tc('yourFeminine') + ' ' +  $tc('video')"
            :scoreNeeded="true"
            :dropzoneInitialOptions="dropzoneInitialOptions"
            @file-removed="removeFile"
            @file-uploaded="(file, response) => videoId = response.id"
            @file-saved="participate"
        />
    </div>
</template>
<script>
    import routeRedirectionMixin from "../../../mixins/routeRedirectionMixin";
    import { mapState, mapActions, mapMutations } from "vuex";
    import UploadComponent from "../Upload";
    export default {
        name: "GamePresentation",
        mixins: [routeRedirectionMixin],
        components: {
            UploadComponent,
        },
        data: function () {
            return {
                videoId: 0,
                participationDone: false,
                playerFeaturesVisible: true,
                dropzoneInitialOptions: {
                    url: `/trainings/videos/upload/`,
                    method: "post",
                    maxFiles: 1,
                    maxFilesize: 500,
                    timeout: 3600000,
                    dictFileTooBig: this.$t("dropzoneDictFileTooBig"),
                    thumbnailWidth: 200,
                    addRemoveLinks: true,
                    dictDefaultMessage: `<i style="color:#3FB389;" class="fa fa-upload mr-2"/> ${this.$options.filters.capitalizeText(this.$t("upload"))}`,
                    destroyDropzone: true,
                    acceptedFiles: "video/*, .mp4, .mov, .avi, .wmv, .flv, .avchd, .webm, .mkv",
                    capture: "environment",
                    dictCancelUpload: this.$t("cancelUpload"),
                    dictRemoveFile: this.$t("cancelUpload"),
                },
            };
        },
        computed: {
            ...mapState({
                user: (state) => state.user.data,
                isConnected: (state) => state.user.isConnected,
                challenge: (state) => (state.trainings.singleChallenge ? state.trainings.singleChallenge : {}),
                challengeStats: (state) => state.trainings.challengeStats,
            }),
            // Gets the language chosen by the user
            currentLocale() {
                return this.$i18n.locale;
            },
        },

        async created() {
            let challenge = { ...this.challenge };
            // The name of the challenge currently stored in the state does not match the one from the route, so we need to get its data
            challenge = await this.getChallenge();
            // The challenge main data has been retrieved, we can get some additional info about it if the user is a player
            if (this.user.player) {
                // The user is a player, let's see if we have his stats on this challenge
                if (this.challengeStats.challengeId !== challenge.id) {
                    // The stats that are currently stored in the state are not the ones for this challenge
                    this.getChallengeStats();
                }
            } else {
                // The user is not a player so no need to get his stats on the challenge and we disable some features
                this.playerFeaturesVisible = false;
            }
        },

        methods: {
            ...mapActions({
                getChallengeDispatch: "getChallenges",
                participateDispatch: "participate",
                getChallengeStatsDispatch: "getChallengeStats",
                deleteVideo: "deleteGameVideo",
                getUser: "getUser",
            }),
            ...mapMutations({
                updateChallenge: "CHALLENGE_UPDATE",
                updateUser: "USER_UPDATE_DATA",
                updateChallengeStats: "CHALLENGE_STATS_UPDATE",
            }),
            // Submits the video and update the user's points
            participate(score) {
                // Flag that indicates the user tries to save his file. This is to prevent the remove event from dropzone to fire
                this.participationDone = true;
                /* The data used for the request to participate to a challenge. 
					The video id has been obtained once the success event has been emitted, dropzone sending back the response received from the api
					*/
                const data = {
                    userId: this.user.id,
                    videoId: this.videoId,
                    videoName: this.$tc("video") + " " + this.videoId,
                    challengesIds: [this.challenge.id],
                    categoryId: this.challenge.challenge_category_id,
                    score: score,
                };
                // Dispatches the action to run the request that sends the user's score and updates his data in the state
                this.participateDispatch(data)
                    .then((response) => {
                        this.$swal("Game", this.$t("challengeParticipationSuccess"), "success");
                        this.getUser({
                            identifier: this.user.id,
                            role: this.$store.state.rolesNames.player,
                        }).then((user) => this.updateUser(user.data));
                        this.$router.push({
                            name: "GameVideo",
                            params: {
                                id: this.videoId,
                            },
                        });
                    })
                    .catch((err) => {
                        this.participationDone = false;
                        this.$swal(this.$store.state.apiInternalError);
                    });
            },

            // Gets the challenge data
            async getChallenge() {
                const data = {
                    name: encodeURIComponent(this.$route.params.name + this.$route.hash),
                    teamsIds: "all",
                    seasonId: "all",
                    ageCategoryId: "all",
                    categoryId: "all",
                    size: "all",
                    page: "all",
                    order: "name",
                };
                // Dispatches the action to get the challenge data and updates the state with the response received
                const response = await this.getChallengeDispatch(data).catch(() => this.$swal(this.$store.state.apiInternalError));
                // The response is a list as there could be many challenges for a same challenge name if it has been created by a coach for several teams
                const challenge = response.data.challenge[0];
                this.updateChallenge(challenge);
                return challenge;
            },

            /* Gets some additional information about this challenge, 
			like the user's score on it and the required score by the national federation
			and updates the state with the data received from the api
			*/
            async getChallengeStats() {
                const data = {
                    challengeId: this.challenge.id,
                    userId: this.user.id,
                };
                // Dispatches the action to run the api request to get the challenge additional info
                const response = await this.getChallengeStatsDispatch(data).catch(() => {
                    throw new Error();
                });
                const stats = response.data;
                this.updateChallengeStats(stats);
            },

            goToNewPage(url) {
                window.open(url)
            },

            // Checks if the user is connected, if not he cannot upload any video and must be redirected to the login page
            checkIfAllowed() {
                this.redirectToLogin(this.isConnected, this.currentLocale);
            },
            
            // Removes the file that has just been uploaded
            removeFile(file, response) {
                if (!this.participationDone) {
                    // This check is necessary because the remove is triggered weirdly by dropzone even if we do not click to the remove button
                    this.deleteVideo({ 
                        videoId: this.videoId,
                    });
                }
            },
        },
    };
</script>
<style scoped>
video {
    height: 400px !important;
}

.step_reached {
    background-color: darkseagreen;
}

.stats_boxes{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  padding: 10px 10px 10px 10px;
}
.stats_box{
  display: flex;
  float: left;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  width: 40%;
  border-radius: 8px;
  margin: 5px;
  padding: 10px;
}

    .les_paliers_div {
        padding-right: 0px !important;
        padding-left: 0px !important;
        margin-top: 30px;
    }

    .sec-bg {
        background: #f7f7f7 !important;
    }

    video {
        width: 102%;
        height: auto;
    }

    ul.no_bullet {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    li.ball {
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
        .full-width-header .rs-header .menu-area.menu-sticky.sticky .main-menu .expand-btn span a,
        .full-width-header .rs-header .menu-area.menu-sticky.sticky .main-menu .rs-menu .nav-menu li .top_dropdown_item {
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
        li.ball {
            height: 54px;
            padding-left: 35px;
            padding-top: 0px;
            margin-top: 0px;
            margin-bottom: 25px;
            line-height: 22px;
        }
        .les_paliers_div {
            padding-right: 0px !important;
            padding-left: 0px !important;
            margin-top: 30px;
            margin-left: 20px;
            margin-right: 20px;
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
            margin-right: -50px;
            margin-left: -53px;
        }
        .try_btn {
            margin: 10px;
        }
        .game_presantation_left_header{
          margin: 15px 30px;
         }
    }

    /* iPads (portrait and landscape) ----------- */

    @media only screen and (min-width: 768px) and (max-width: 1024px) {
        .video_row {
            margin-right: -575px;
            margin-left: -97px;
        }
        .try_btn {
            margin: 10px !important;
        }
    }
</style>
