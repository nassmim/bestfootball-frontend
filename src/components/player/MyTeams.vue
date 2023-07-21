<template>
  
<!-- Component that gathers and displays all the teams where the player is in -->

    <div class="rs-result inner pt-100 md-pt-80">
        <div class="container">

            <div class="rs-products">
                <div class="shop-guide">
                    <div class="row rs-vertical-middle">
                        <div class="col-lg-6 col-md-6 col-sm-6 xs-mb-15">
                            <div class="title-style pb-50 md-pb-30">
                                <h2 class="margin-0 uppercase">{{$tc('myFeminine', 2) | capitalizeText}} {{$tc('team', 2)}}</h2>
                                <span class="line-bg y-b pt-10 left-line"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Point Table Start -->
      <div class="rs-pointtable inner-style pt-5 md-pt-5 md-pb-80">
        <div class="container">
          <div class="row">

            <div class="col-md-3 text-center">
              <div
                class="card"
                style="
                  margin: auto;
                  width: 18rem;
                  border-radius: 15px 15px 15px 15px;
                  box-shadow: none;
                  border: 1px solid rgb(239, 239, 239);
                "
              >
                <img
                  style="
                    width: 300px;
                    height: 250px;
                    z-index: 0;
                    border-radius: 15px 15px 15px 15px;
                  "
                  class="card-img-top"
                  :src="user.player && user.player.avatar ? `/upload/images/users/${user.player.avatar}` : '/images/users/avatar.png'"
                  alt="Player image card"
                />
                <div
                  style="
                    padding: 25px 20px;
                    background: #3fb389;
                    z-index: 5;
                    margin-top: -20px;
                    border-radius: 0px 0px 15px 15px;
                  "
                  class="card-body"
                >
                  <div style="margin-bottom: 10px">
                    <span
                      style="font-weight: 600; font-size: 20px; color: #fff"
                      > {{ user.username }}</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-12 mt-20">

                <div class="vertical_scroll_bar row mobile-table">
                    <template v-if="teams.length"> 
                        <div class="col-md-4" v-for="(team, index) in teams" :key="index">
                            <div style="margin-bottom:20px !important;" class="list-group">
                                <router-link 
                                    :to="{name: 'Team', params: {name: team.unique_name}}" 
                                    style="background:rgb(63 179 137); border:2px solid rgb(63 179 137);" 
                                    class="list-group-item list-group-item-action active"
                                    @click.native="$store.commit('TEAM_UPDATE_DATA', team)"
                                >
                                    <img 
                                        style="margin-right:5px; border: 3px solid #3fb389;border-radius: 100%;background: #3fb58a;width:40px;height: 40px;" 
                                        :src="team.avatar ? `/upload/images/teams/${team.avatar}` : '/images/teams/default.png'"
                                    />
                                    <strong>{{ team.name }}</strong> 
                                </router-link>
                                <li class="list-group-item list-group-item-action">
                                    <b style="color:#3FB389;">{{$tc('category', 2) | capitalizeText}}: </b>
                                    {{team.player_category.name ? team.player_category.name : $t('notYetIndicated') }}
                                </li>
                                <li class="list-group-item list-group-item-action">
                                    <b style="color:#3FB389;">{{$tc('season', 2) | capitalizeText}}: </b>
                                    {{team.season.name ? team.season.name : $t('notYetIndicated') }}
                                </li>
                                <li class="list-group-item list-group-item-action">
                                    <b style="color:#3FB389;">{{$t('numberPlayers') | capitalizeText}}: </b>
                                    {{ team.number_players_added }}                              
                                <li class="list-group-item list-group-item-action">
                                    <router-link
                                        :to="{name: 'Team', params: {name: team.unique_name}}"
                                        class="btn btn-success"
                                        style="
                                            background: #3fb389;
                                            border: 1px solid #3fb389;
                                            padding: 5px 30px;
                                            text-align: center;
                                            display: block;                                            
                                        "
                                        @click.native="$store.commit('TEAM_UPDATE_DATA', team)"
                                    >
                                        <i
                                            class="fa fa-eye"
                                            aria-hidden="true"
                                            style="color: #fff"
                                        />
                                    </router-link>
                                </li>
                                <li class="list-group-item list-group-item-action">
                                        <router-link
                                            to="#"
                                            class="btn btn-success"
                                            style="
                                                background: #3fb389;
                                                border: 1px solid #3fb389;
                                                padding: 5px 30px;
                                                text-align: center;
                                                display: block;                                                    
                                            "
                                            @click.native="chosenTeam = team"
                                            data-toggle="modal" data-target="#removal_modal"
                                        >
                                            <i
                                                class="fa fa-sign-out"
                                                aria-hidden="true"
                                                style="color: #fff"
                                            />
                                        </router-link>
                                </li>
                            </div>
                        </div>
                    </template>
                </div>

                <div class="desktop_table vertical_scroll_bar point-table-wrap pb-100 md-pb-80">
                    <table>
                    <tbody style="text-align: center !important">
                        <tr>
                            <th>{{$tc('name') | capitalizeText}}</th>
                            <th>{{$tc('category')}}</th>
                            <th>{{$tc('season')}}</th>
                            <th>{{$t('numberPlayers')}}</th>
                            <th>{{$t('teamPage')}}</th>
                            <th>{{$t('leave')}}</th>
                        </tr>
                        <template v-if="teams.length">
                                                <tr v-for="team in teams" :key="team.id">
                                                    <td style="font-size: 13px">
                                                        <router-link 
                                                            :to="{name: 'Team', params: {name: team.unique_name}}" 
                                                            @click.native="$store.commit('TEAM_UPDATE_DATA', team)"
                                                        >
                                                            <img
                                                                style="
                                                                border: 3px solid #f2f7ff;
                                                                border-radius: 100%;
                                                                background: #f2f7ff;
                                                                width: 50px;
                                                                height: 50px;
                                                                margin-top: 30px;
                                                                "
                                                                :src="team.avatar ? `/upload/images/teams/${team.avatar}` : '/images/teams/default.png'"
                                                            />
                                                            <br />
                                                            <p> <strong>{{ team.name }}</strong> </p>
                                                        </router-link>
                                                    </td>
                                                    <td style="font-size: 13px">
                                                        {{team.player_category.name ? team.player_category.name : $t('notYetIndicated') }}
                                                    </td>
                                                    <td style="font-size: 13px">
                                                        {{team.season.name ? team.season.name : $t('notYetIndicated') }}
                                                    </td>
                                                    <td style="font-size: 13px">
                                                        {{ team.number_players_added }}
                                                    </td>
                                                    <td style="font-size: 13px">
                                                        <router-link
                                                            :to="{name: 'Team', params: {name: team.unique_name}}"
                                                            class="btn btn-success"
                                                            style="
                                                                background: #3fb389;
                                                                border: 1px solid #3fb389;
                                                                padding: 5px 30px;
                                                            "
                                                            @click.native="$store.commit('TEAM_UPDATE_DATA', team)"
                                                        >
                                                            <i
                                                                class="fa fa-eye"
                                                                aria-hidden="true"
                                                                style="color: #fff"
                                                            />
                                                        </router-link>
                                                    </td>
                                                    <td>
                                                        <router-link
                                                            to="#"
                                                            class="btn btn-success"
                                                            style="
                                                                background: #3fb389;
                                                                border: 1px solid #3fb389;
                                                                padding: 5px 30px;
                                                            "
                                                            @click.native="chosenTeam = team"
                                                            data-toggle="modal" data-target="#removal_modal"
                                                        >
                                                            <i
                                                                class="fa fa-sign-out"
                                                                aria-hidden="true"
                                                                style="color: #fff"
                                                            />
                                                        </router-link>
                                                    </td>
                                                </tr>
                                            </template>
                                            <template v-else>
                                                {{$t('notInAnyTeam')}}
                                            </template>
                    </tbody>
                    </table>
                </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Point Table End -->
        </div>

         <DeleteTeam :team="chosenTeam" @team-removed="getTeams" />

                    <!-- END Modal Component -->
    </div>
  <!-- Result Info Section End -->
</template>

<script>

import { mapState } from "vuex";

import DeleteTeam from "../all/DeleteTeam";
import routeRedirectionMixin from '../../mixins/routeRedirectionMixin';

export default {

    name: "MyTeams",

    components: { DeleteTeam },

    mixins: [routeRedirectionMixin],
    
    data() {
        return {
            chosenTeam: {},
        }
    },

    computed: {
        ...mapState({
            teams: (state) => state.teams.userOnes,
            user: (state) => state.user.data,
            isConnected: (state) => state.user.isConnected,
        }),
    },

    created() {

        if(!this.teams.length) {
        // No teams is stored yet, we fetch the teams where the user is in

            this.getTeams()
        }
    },

    mounted() {
        // Redirects the user to the login page if he's not yet logged in
        this.redirectToLogin(this.isConnected, this.$i18n.locale)
    },

    methods: {
        
        // Gets the user's teams
        getTeams() {

            const data = {
                teamIdentifier: 'all',
                userId: this.user.player.id,
                roles: this.user.roles,                
            }

            // Dipatches the request to get the user's teams
            this.$store.dispatch('getTeams', data)
                .then(response => {
                    this.$store.commit('USER_TEAMS_UPDATE', response.data.teams)
                })
                .catch(() => this.$swal(this.$store.state.apiInternalError))
        },        
    }
};
</script>

<style scoped>
.vertical_scroll_bar {
    margin-top: 0px
}
.mobile-table {
	display: none;
}

/* Smartphone (portrait and landscape) ----------- */
@media only screen and (min-width : 320px) and (max-width : 700px) {
.mobile-table {
	display: block !important;
}
.desktop_table {
	display: none !important;
}
}

.rs-pointtable table tr th {
  padding: 12px 15px;
  color: #ffe18c;
  font-size: 13px;
}
.rs-pointtable.inner-style table tr td {
  padding: 0px 15px;
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
