<template>
  <!-- Coach home component ; it displays the teams the coach manages
and this is where the coach can add a new team if he's a coach who has not been added directly by a club
-->

  <div class="rs-result inner pt-100 md-pt-80">
    <div class="container">
      <div class="rs-products">
        <div class="shop-guide">
          <div class="row rs-vertical-middle">
            <div class="col-lg-6 col-md-6 col-sm-6 xs-mb-15">
              <div class="title-style pb-50 md-pb-30">
                <h2 class="margin-0 uppercase">
                  {{ $tc("myMasculine") }} {{ $t("homeAsPersonalEspace") }}
                </h2>
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
                  :src="
                    coach.avatar
                      ? `/upload/images/users/${coach.avatar}`
                      : '/images/users/mourinho.jpg'
                  "
                  alt="Coach card image cap"
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
                    >
                      {{ user.username }}
                    </span>
                  </div>
                </div>
              </div>
              <button
                v-if="!coach.belongs_to_club"
                style="background: #3fb389; border: 2px solid #3fb389"
                type="button"
                class="btn btn-success col-md-12 mt-35"
                href="#"
                data-toggle="modal"
                data-target="#add_team_modal"
                @click="
                  chosenTeam = {};
                  openAddTeamComponent();
                "
              >
                <img
                  class="mr-2"
                  src="/images/icons/add_players.png"
                  alt=""
                  width="25"
                  height="25"
                />
                {{ $t("addATeam") }}
              </button>
            </div>

            <div id="for_mobile" class="col-md-12 mt-20">
              <div class="vertical_scroll_bar point-table-wrap pb-100 md-pb-80">
                <table>
                  <tbody style="text-align: center !important">
                    <tr>
                      <th>{{ $tc("name") | capitalizeText }}</th>
                      <th v-if="!coach.belongs_to_club">
                        {{ $t("modifyTeam") | capitalizeText}}
                      </th>
                      <th v-if="!coach.belongs_to_club">
                        {{ $t("delete") | capitalizeText }}
                      </th>
                      <th v-if="coach.belongs_to_club">
                        {{ $t("numberPlayersAllowed") }}
                      </th>
                      <th v-if="coach.belongs_to_club">{{ $t("numberPlayersAdded") }}</th>                      
                    </tr>

                    <template v-if="teams.length">
                      <tr v-for="team in teams" :key="team.id">
                        <td style="font-size: 13px">
                          <router-link
                            to="#"
                            data-toggle="modal"
                            data-target="#team_details_modal"
                            @click.native="chosenTeam=team"
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
                              :src="
                                team.avatar
                                  ? `/upload/images/teams/${team.avatar}`
                                  : '/images/teams/default.png'
                              "
                            />
                            <br />
                            <p>
                              <strong>{{ team.name }}</strong>
                            </p>
                          </router-link>
                        </td>

                        <td v-if="!coach.belongs_to_club">
                          <a
                            class="btn btn-success"
                            style="
                                                            background: #c1c1c1;
                                                            border: 1px solid #c1c1c1;
                                                            padding: 5px 30px;
                                                        "
                            href="#"
                            data-toggle="modal"
                            data-target="#add_team_modal"
                            @click="
                              chosenTeam = team;
                              openAddTeamComponent();
                            "
                          >
                            <i
                              class="fa fa-pencil"
                              aria-hidden="true"
                              style="
                                                                color: #c1c1c1;
                                                                background: white;
                                                                border-radius: 50px;
                                                                font-size: 10px;
                                                                padding: 5px 7px;
                                                            "
                            />
                          </a>
                        </td>
                        <td v-if="!coach.belongs_to_club">
                          <a
                            href="#"
                            class="btn btn-success"
                            style="
                                                            background: red;
                                                            border: 1px solid red;
                                                            padding: 5px 30px;
                                                        "
                            data-toggle="modal"
                            data-target="#removal_modal"
                            @click="chosenTeam = team;"
                          >
                            <i
                              class="fa fa-times"
                              aria-hidden="true"
                              style="
                                                                color: red;
                                                                background: white;
                                                                border-radius: 50px;
                                                                font-size: 10px;
                                                                padding: 4px 6px 5px 6px;
                                                            "
                            ></i>
                          </a>
                        </td>
                        <td
                        v-if="coach.belongs_to_club"
                        style="font-size: 13px"
                        >
                        {{ team.number_players_allowed }}
                        </td>
                        <td v-if="coach.belongs_to_club" style="font-size: 13px">
                        {{ team.number_players_added }}
                        </td>                         
                        </tr>
                    </template>
                    <template v-else>
                      {{ $t("noTeamMainCoach") }}
                    </template>
                  </tbody>
                </table>
              </div>
            </div>

            <div id="for_web" class="col-md-12 mt-20">
              <div class="vertical_scroll_bar point-table-wrap pb-100 md-pb-80">
                <table>
                  <tbody style="text-align: center !important">
                    <tr>
                      <th>{{ $tc("name") | capitalizeText }}</th>
                      <th>{{ $tc("category") | capitalizeText }}</th>
                      <th>{{ $tc("season") | capitalizeText }}</th>
                      <th v-if="coach.belongs_to_club">
                        {{ $t("numberPlayersAllowed") }}
                      </th>
                      <th>{{ $t("numberPlayersAdded") }}</th>
                      <th>{{ $tc("addPlayer", 2) }}</th>
                      <th>{{ $t("teamPage") }}</th>
                      <th v-if="!coach.belongs_to_club">
                        {{ $t("modifyTeam") | capitalizeText}}
                      </th>
                      <th v-if="!coach.belongs_to_club">
                        {{ $t("delete") | capitalizeText }}
                      </th>
                    </tr>

                    <template v-if="teams.length">
                      <tr v-for="team in teams" :key="team.id">
                        <td style="font-size: 13px">
                          <router-link
                            :to="{
                              name: 'Team',
                              params: { name: team.unique_name },
                            }"
                            @click.native="
                              $store.commit('TEAM_UPDATE_DATA', team)
                            "
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
                              :src="
                                team.avatar
                                  ? `/upload/images/teams/${team.avatar}`
                                  : '/images/teams/default.png'
                              "
                            />
                            <br />
                            <p>
                              <strong>{{ team.name }}</strong>
                            </p>
                          </router-link>
                        </td>
                        <td style="font-size: 13px">
                          {{
                            team.player_category.name
                              ? team.player_category.name
                              : $t("notYetIndicated")
                          }}
                        </td>
                        <td style="font-size: 13px">
                          {{
                            team.season.name
                              ? team.season.name
                              : $t("notYetIndicated")
                          }}
                        </td>
                        <td
                          v-if="coach.belongs_to_club"
                          style="font-size: 13px"
                        >
                          {{ team.number_players_allowed }}
                        </td>
                        <td style="font-size: 13px">
                          {{ team.number_players_added }}
                        </td>
                        <td style="font-size: 13px">
                          <router-link
                            :to="{
                              name: 'AddTeamPlayers',
                              params: { name: team.unique_name },
                            }"
                            class="btn btn-success"
                            style="
                                                            background: #c1c1c1;
                                                            border: 1px solid #c1c1c1;
                                                            padding: 5px 30px;
                                                        "
                            @click="$store.commit('TEAM_UPDATE_DATA', team)"
                          >
                            <i
                              class="fa fa-plus"
                              aria-hidden="true"
                              style="
                                                                color: #c1c1c1;
                                                                background: white;
                                                                border-radius: 50px;
                                                                font-size: 10px;
                                                                padding: 5px 7px;
                                                            "
                            />
                          </router-link>
                        </td>
                        <td>
                          <router-link
                            :to="{
                              name: 'Team',
                              params: { name: team.unique_name },
                            }"
                            class="btn btn-success"
                            style="
                                                            background: #3fb389;
                                                            border: 1px solid #3fb389;
                                                            padding: 5px 30px;
                                                        "
                            @click.native="
                              $store.commit('TEAM_UPDATE_DATA', team)
                            "
                          >
                            <i
                              class="fa fa-eye"
                              aria-hidden="true"
                              style="color: #fff"
                            />
                          </router-link>
                        </td>
                        <td v-if="!coach.belongs_to_club">
                          <a
                            class="btn btn-success"
                            style="
                                                            background: #c1c1c1;
                                                            border: 1px solid #c1c1c1;
                                                            padding: 5px 30px;
                                                        "
                            href="#"
                            data-toggle="modal"
                            data-target="#add_team_modal"
                            @click="
                              chosenTeam = team;
                              openAddTeamComponent();
                            "
                          >
                            <i
                              class="fa fa-pencil"
                              aria-hidden="true"
                              style="
                                                                color: #c1c1c1;
                                                                background: white;
                                                                border-radius: 50px;
                                                                font-size: 10px;
                                                                padding: 5px 7px;
                                                            "
                            />
                          </a>
                        </td>
                        <td v-if="!coach.belongs_to_club">
                          <a
                            href="#"
                            class="btn btn-success"
                            style="
                                                            background: red;
                                                            border: 1px solid red;
                                                            padding: 5px 30px;
                                                        "
                            data-toggle="modal"
                            data-target="#removal_modal"
                            @click="chosenTeam = team;"
                          >
                            <i
                              class="fa fa-times"
                              aria-hidden="true"
                              style="
                                                                color: red;
                                                                background: white;
                                                                border-radius: 50px;
                                                                font-size: 10px;
                                                                padding: 4px 6px 5px 6px;
                                                            "
                            ></i>
                          </a>
                        </td>
                      </tr>
                    </template>
                    <template v-else>
                      {{ $t("noTeamMainCoach") }}
                    </template>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AddTeam ref="addTeam" :team="chosenTeam" @team-added="getTeams" @get-clubs="getClubs" />
    <DeleteTeam :team="chosenTeam" @team-removed="getTeams" />

    <div
        v-if="chosenTeam.id"
      class="modal fade"
      id="team_details_modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div style="background: #f7f7f7" class="modal-content">
          <div style="border-bottom: none !important" class="modal-header">
            <img
              style="border: 2px solid #3fb389; border-radius: 50px"
              class="mr-2"
              src="/images/icons/add_players.png"
              alt=""
              width="30"
              height="30"
            />
            <h6 style="color: #3fb389" class="modal-title">
              {{$t('moreDetails')}}
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
            <div
              style="
                                background: #fff;
                                padding: 30px 30px;
                                margin-top: -10px;
                                border-radius: 10px;
                            "
              class="container"
            >
              <ul class="list-group list-group-flush">
                <li class="list-group-item">
                  <b>{{ $tc("category") | capitalizeText }}: </b>
                  {{
                    chosenTeam.player_category.name
                      ? chosenTeam.player_category.name
                      : $t("notYetIndicated")
                  }}
                </li>
                <li class="list-group-item">
                  <b>{{ $tc("season") | capitalizeText }}: </b>
                  {{
                    chosenTeam.season.name ? chosenTeam.season.name : $t("notYetIndicated")
                  }}
                </li>
                <li class="list-group-item" v-if="coach.belongs_to_club">
                  <b>{{ $t("numberPlayersAllowed") }}: </b>
                  {{ chosenTeam.number_players_allowed }}
                </li>
                <li class="list-group-item">
                  <b>{{ $t("numberPlayersAdded") }}: </b>
                  {{ chosenTeam.number_players_added }}
                </li>
                <li class="list-group-item">
                  <b>{{ $tc("addPlayer", 2) }}: </b>
                  <router-link
                    to="#"
                    class="btn btn-success"
                    style="
                                                            background: #c1c1c1;
                                                            border: 1px solid #c1c1c1;
                                                            padding: 5px 30px;
                                                        "
                    @click.native="goToAddPlayersPage(chosenTeam)"
                  >
                    <i
                      class="fa fa-plus"
                      aria-hidden="true"
                      style="
                                                                color: #c1c1c1;
                                                                background: white;
                                                                border-radius: 50px;
                                                                font-size: 10px;
                                                                padding: 5px 7px;
                                                            "
                    />
                  </router-link>
                </li>
                <li class="list-group-item">
                  <b>{{ $t("teamPage") }}: </b>
                  <router-link
                    to="#"
                    class="btn btn-success"
                    style="
                                                            background: #3fb389;
                                                            border: 1px solid #3fb389;
                                                            padding: 5px 30px;
                                                        "
                    @click.native="goToTeamPage(chosenTeam)"
                  >
                    <i
                      class="fa fa-eye"
                      aria-hidden="true"
                      style="color: #fff"
                    />
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Result Info Section End -->
</template>

<script>
import { mapState } from "vuex";

import AddTeam from "../all/AddTeam";
import DeleteTeam from "../all/DeleteTeam";

import routeRedirectionMixin from "../../mixins/routeRedirectionMixin";

export default {
  name: "Home",

  mixins: [routeRedirectionMixin],

  components: { 
    AddTeam,
    DeleteTeam,
  },

  data() {
    return {
      chosenTeam: {},
    };
  },

  computed: {
    ...mapState({
        clubs: (state) => state.general.clubs,
      user: (state) => state.user.data,
      isConnected: (state) => state.user.isConnected,
      teams: (state) => state.teams.userOnes,
    }),

    coach() {
      return this.user.coach;
    },
  },

  created() {
    this.getTeams()
  },

  methods: {
    /* Runs the necessary actions when the user wants to add/modify a team
        this is run here instead of within the child component directly because 
        it seemed it was the only way to make the api calls only when the user clicks on these add/modify buttons
        and not every time the home page is created 
        */
    openAddTeamComponent() {

        if(!this.clubs || !this.clubs.length) {
        // Gets all the clubs from the db as it will be needed in the add team component to show the list of clubs
           this.getClubs() 
        }

        // This gets all the teams in our app
        this.$refs.addTeam.getTeams();
        // This gets the values for fields like the players age categories
        this.$refs.addTeam.getFieldsValues();
    },

    // Gets the user's teams
    getTeams() {
        const data = {
            teamIdentifier: "all",
            userId: this.coach.id,
            roles: this.user.roles,
        };

        // Dipatches the request to get the user's teams
        this.$store .dispatch("getTeams", data)
            .then((response) => {
                this.$store.commit("USER_TEAMS_UPDATE", response.data.teams);
            })
            .catch(() => this.$swal(this.$store.state.apiInternalError));
    },

    // Gets all the clubs from the db
    getClubs() {
        this.$store.dispatch('getClubs')
            .then(response => this.$store.commit("CLUBS_LIST_UPDATE", response.data))
            .catch(() => {throw new Error}) 
    },
    
    goToTeamPage(chosenTeam) {
        $('#team_details_modal').modal('hide')
        this.$store.commit('TEAM_UPDATE_DATA', chosenTeam)
        this.$router.push({
            name: 'Team',
            params: { name: chosenTeam.unique_name },
        })    
    },

    goToAddPlayersPage(chosenTeam) {
        $('#team_details_modal').modal('hide')
        this.$store.commit('TEAM_UPDATE_DATA', chosenTeam)
        this.$router.push({
            name: 'AddTeamPlayers',
            params: { name: chosenTeam.unique_name },
        })    
    }    
  },
};
</script>

<style scoped>
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

  .vertical_scroll_bar {
    margin-top: 0px;
  }
}
#for_web {
  display: block;
}
#for_mobile {
  display: none;
}
/* Smartphone (portrait and landscape) ----------- */
@media only screen and (min-width: 320px) and (max-width: 700px) {
  .vertical_scroll_bar {
    margin-top: 0px;
  }
  #for_web {
    display: none;
  }
  #for_mobile {
    display: block;
  }
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .vertical_scroll_bar {
    margin-top: 0px;
  }
}
</style>
