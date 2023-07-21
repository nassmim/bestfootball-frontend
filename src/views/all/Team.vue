<template>
  <div class="home">
    <!-- COMPONENTS BLOCK -->
    <Preloader />
    <Header />
    <Breadcrumbs />
    <TeamComponent />
    <Footer />

    <!-- COMPONENTS BLOCK--END -->
  </div>
</template>

<script>
// @ is an alias to /src

// IMPORTING COMPONENTS
import Preloader from "@/components/all/Preloader.vue";
import Header from "@/views/all/Header.vue";
import Breadcrumbs from "@/views/all/Breadcrumbs.vue";
import TeamComponent from "@/components/all/Team.vue";
import Footer from "@/components/all/Footer.vue";
// IMPORTING COMPONENTS--END

export default {
  name: "Team",
  components: {
    Preloader,
    Header,
    Breadcrumbs,
    TeamComponent,
    Footer,
  },
};
</script>

<style>
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
    border-right: 1px solid #d8d9da;
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

/* .stat_circle {
            padding: 68px 4px 79px 0px;
            border-radius: 100%;
            text-align: center;
            background-image: url('images/background/statistics_bg.png');
            background-repeat: no-repeat;
            background-position-x: 10px;
            background-position-y: 12px;
            background-size: 169px;
            width: 185px;
            height: 206px;
        } */

.stat_number {
  color: #3fb389;
  font-size: 38px;
  font-weight: 700;
  margin: 0px 0px 0px 10px;
}

.stat_text {
  color: #3fb389;
  font-size: 13px;
  font-weight: 700;
  margin: 0px 0px 0px 11px;
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

/* .home_stat_circle {
                padding: 38px 21px 78px 21px;
                border-radius: 100%;
                margin: 60px 17px;
                text-align: center;
                border: 7px solid #ffe18c;
                background-repeat: no-repeat;
                background-position-x: 25px;
                background-position-y: 35px;
                background-size: 132px;
                width: 132px;
                height: 129px;
            } */

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
  font-size: 18px !important;
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
</style>