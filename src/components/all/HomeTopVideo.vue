<template>
  <!-- Banner Section Start -->
  <div id="rs-banner" class="rs-banner home2banner">
    <!-- <video
      id="video_background"
      poster="images/background/about-home-bg.jpg"
      autoplay
      muted
      loop
    >
      <source src="videos/background/BF-bg-video.mp4" type="video/mp4" />
    </video> -->
    <div class="container">
      <div class="banner-content">
        <div class="text-part"> 
          <div class="row" style="margin-top:0px;">
            <h2
              style="color:white;"
              class="col-md-12 title wow fadeInLeft slider-big-header"
              data-wow-delay="1s"
            >{{$t('bestfootballIncentiveMessage')}}</h2>
           <h4
              style="color:white;margin-top:-15px;"
              class="col-md-12 sub-title wow fadeInRight slider-small-header"
              data-wow-delay="1.5s"
            >{{$t('bestfootballHomeSlogan')}}</h4>
            <div id="headerBTN1" class="mr-3 slider-btn wow fadeInRight" data-wow-delay="1s">
              <router-link class="readon" id="header_btn1" :to="{name: 'SignUp'}">
                <img class="mr-2" src="images/icons/register.png" alt width="25" height="25" />
                {{$t('signUp')}}
              </router-link>
            </div>
            <div id="headerBTN2" class="slider-btn wow fadeInRight" data-wow-delay="1s">
              <a class="readon" id="header_btn2" @click="goToHowItWorks(rolesNames.player)">
                <img
                  class="mr-2"
                  src="images/icons/bestfootball-How-it-works-green.png"
                  alt
                  width="25"
                  height="25"
                />
                {{$t('moreInfoPlayer')}}
              </a>
            </div>
            <div id="headerBTN3" class="ml-3 slider-btn wow fadeInRight" data-wow-delay="1s">
              <a class="readon" id="header_btn3" @click="goToHowItWorks(rolesNames.club)">
                <img
                  class="mr-2"
                  src="images/icons/bestfootball-How-it-works-green.png"
                  alt
                  width="25"
                  height="25"
                />
                {{$t('moreInfoCoachClub')}}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Banner Section End -->
</template>

<script>
export default {
    name: "HomeTopVideo",

    data() {
        return {
            rolesNames: {}
        }
    },

    mounted() {
        this.rolesNames = this.$store.state.rolesNames
    },

    methods: {

        goToHowItWorks(role) {
            this.$store.commit('USER_UPDATE_ROLE', role)
            this.$router.push({ name: 'HowItWorks' })
        }
    }
};
</script>

<style scoped>
/* Smartphone (portrait and landscape) ----------- */
@media only screen and (min-width : 320px) and (max-width : 700px) {
.slider_content_headers{
  margin-top: 60px !important;
}
.slider-big-header{
 font-size: 20px;
 margin-top: 82px;
 line-height: 1;
}
.readon, .readon.big-btn {
    padding: 0px 0px 0px 0px;
    font-size: 15px;
}   

.slider-small-header{
 font-size: 14px;
}

#header_btn1 {
    background: #3FB389 !important;
    color: #fff;
    padding: 8px 8px 8px 8px !important;
    border-radius: 20px 20px 20px 20px;
    margin: 5px 60px;
    width: 250px;
    font-size: 12px;
}
#header_btn2 {
    background: #ffffff !important;
    color: #3FB389;
    padding: 8px 8px 8px 8px !important;
    border-radius: 20px 20px 20px 20px;
    margin: 5px 60px;
    width: 250px;
    font-size: 12px;
}
#header_btn3 {
    background: #ffffff !important;
    color: #3FB389;
    padding: 8px 8px 8px 8px !important;
    border-radius: 20px 20px 20px 20px;
    margin: 5px 45px;
    width: 250px;
    font-size: 12px;
}

}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-width : 768px) and (max-width : 1024px) {
  .rs-banner.home2banner {
    background: url(/images/banner/slider1.jpeg);
    background-color: #3fb3899e;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    /* position: relative; */
    height: 55vh;
}
.player_usability{
  margin-top: -50px !important;
}
.slider_content_headers{
  margin-top: 60px !important;
}
.slider-big-header{
    font-size: 40px;
    margin-top: 75px;
    margin-left: 40px;
    line-height: 1;
}
.readon, .readon.big-btn {
    padding: 0px 0px 0px 0px;
    font-size: 15px;
}   

.slider-small-header{
    font-size: 18px;
    margin-left: 40px;
}

#header_btn1 {
    background: #3FB389 !important;
    color: #fff;
    padding: 8px 8px 8px 8px !important;
    border-radius: 20px 20px 20px 20px;
    margin: 5px 60px;
    width: 250px;
    font-size: 12px;
}
#header_btn2 {
    background: #ffffff !important;
    color: #3FB389;
    padding: 8px 8px 8px 8px !important;
    border-radius: 20px 20px 20px 20px;
    margin: 5px 0px;
    width: 250px;
    font-size: 12px;
}
#header_btn3 {
    background: #ffffff !important;
    color: #3FB389;
    padding: 8px 8px 8px 8px !important;
    border-radius: 20px 20px 20px 20px;
    margin: 5px 45px;
    width: 250px;
    font-size: 12px;
}
}
@media only screen and (min-width : 1024px){
.rs-banner.home2banner {
    /* background: url(/images/banner/slider1.jpeg); */
    background-color: #3fb3899e;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    /* position: relative; */
    height: 95vh;
}
}
</style>