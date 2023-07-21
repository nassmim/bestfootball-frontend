<template>

  <!-- Component that displays the game tutorial, showing how to perform the skills 
  -->

  <div class="rs-single-club sec-bg md-pb-80 pt-20">
    <div class="container">
      <div class="rs-tab pb-70">
        <div class="single-team-data">
          <div class="row video_row">
          
              <div
                style="margin-left: 40px; margin-right: 40px"
                class="col-md-7"
              >
                <h3 style="margin:20px;">{{challenge.name.split('-')[0].slice(0,-5)}}</h3>
                <div id="large_video">
                    <video width="700" height="400" controls>
                        <source
                            :src="(tutorial && tutorial.user_id ? '/upload' : '') +  `/videos/challenges/tutorials/${tutorial.bf_path}`"
                            type="video/mp4"
                        />
                    </video>
                </div>
                <br />

                <div style="float: right !important" class="col-md-6">
                  <center>
                    <router-link
                    :to="{name: 'GamePresentation', params: {name: challenge.name}}"
                    class="readon mobile-readon"
                    >{{$t('goToGame')}}</router-link
                  >
                    <ul
                      style="
                        font-size: 25px;
                        margin-top: 14px;
                        display: inline !important;
                      "
                      class="social_icon"
                    >
                      <li>
                        <a href="#"><i class="fa fa-instagram"></i></a>
                      </li>
                      <li>
                        <a href="#"><i class="fa fa-snapchat"></i></a>
                      </li>
                      <li>
                        <a href="#"><i class="fa fa-youtube"></i></a>
                      </li>
                      <li>
                        <a href="#"><i class="fa fa-facebook"></i></a>
                      </li>
                    </ul>
                  </center>
                </div>
                <br /><br />
              </div>

              <div
                class="col-md-3 try-section"
              >
                <div style="" class="col-md-12">
                  <router-link
                    :to="{name: 'GamePresentation', params: {name: challenge.name}}"
                    style="
                      padding: 20px 70px 20px 70px !important;
                      color: #fff !important;
                      margin-top: 210px;
                    "
                    class="readon"
                    >{{$t('goToGame')}}</router-link>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {

    name: "Tutorial",

    computed: {
        
        challenge() {
            return this.$store.state.trainings.singleChallenge 
        },

        tutorial() {
            return this.challenge.challenge_tutorial
        }
    },

    created() {
        // The name of the challenge currently stored in the state does not match the one from the route, so we need to get its data
        if(this.challenge.name !== this.$route.params.name) {
            this.getChallenge()
        }
    },

    methods: {

        // Gets the challenge data
        getChallenge() {

            const data = {
                name: encodeURIComponent(this.$route.params.name + this.$route.hash),
                teamsIds: "all",
                seasonId: "all",
                ageCategoryId: "all",
                categoryId: "all",
                size: "all",
                page: "all",
                order: "name"
            };

            // Dispatches the action to get the challenge data and updates the state with the response received
            this.$store.dispatch('getChallenges', data)
                // The response is a list as there could be many challenges for a same challenge name if it has been created by a coach for several teams
                .then(response => this.$store.commit('CHALLENGE_UPDATE', response.data.challenge[0]))
                .catch(() => this.$swal(this.$store.state.apiInternalError))
        }
    }
}
</script>

<style scoped>
video {
  width: 102%;
  height: auto;
}
.mobile-readon{
  display: none;
  padding: 7px 28px 7px 28px !important;
  color: #fff !important;
}
.try-section{
 padding-right: 0px !important;
 padding-left: 0px !important;
 margin-top: 30px;
 margin-left: 80px;
}
/* Smartphone & kindle (portrait and landscape) ----------- */
@media only screen and (min-width : 320px) and (max-width : 700px) {
  .mobile-readon{
  display: block;
  padding: 7px 28px 7px 28px !important;
  color: #fff !important;
  margin-bottom: 30px;
}
.video_row{
  margin-right: -55px;
  margin-left: -60px;
}
.try-section{
  display:none;
}
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-width : 768px) and (max-width : 1024px) {
 .mobile-readon{
  display: block;
  padding: 7px 28px 7px 28px !important;
  color: #fff !important;
  right:195px;
}
.social_icon{
  right:195px;
  float: none;
}
.video_row{
  margin-right: -575px;
  margin-left: -97px;
} 
.try-section{
  display:none;
}
}
.social_icon li {
  display: inline !important;
  float: right;
  margin: 5px;
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
