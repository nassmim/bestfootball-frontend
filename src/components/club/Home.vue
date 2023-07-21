<template>
  <!-- Club home component ; it displays the teams the club has registered
and this is where the club can add new teams and pays for them
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

        <div class="rs-pointtable inner-style pt-5 md-pt-5 md-pb-80 mb-100">
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
                                            width: 150px;
                                            height: 150px;
                                            z-index: 0;
                                            margin: 25px 60px 43px 60px;
                                            border-radius: 15px 15px 15px 15px;
                                        "
                    class="card-img-top"
                    :src="
                      club.avatar
                        ? `/upload/images/users/${club.avatar}`
                        : '/images/users/mourinho.jpg'
                    "
                    alt="Club card image cap"
                  />
                  <div
                    style="
                                            padding: 5px 20px;
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
                        {{ club.name }}
                      </span>
                      <br />
                      <span
                        v-if="club.customer_id"
                        style="font-weight: 300; font-size: 15px; color: #fff"
                      >
                        {{ $t("subscription") | capitalizeText }} -
                        {{
                          $options.filters.capitalizeText(
                            club.plan_id === annualPlan
                              ? $t("annual")
                              : $t("monthly")
                          )
                        }}
                      </span>
                    </div>
                  </div>
                </div>

                <button
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

                <template v-if="teams.length">
                  <a
                    style="background: #3fb389; border: 2px solid #3fb389"
                    class="btn btn-success col-md-12 mt-15 mb-10"
                    href="#"
                    data-toggle="modal"
                    :data-target="'#subscription_modal'"
                    @click="getPlayerPrices"
                  >
                    <img
                      class="mr-2"
                      src="/images/icons/bestfootball How it works.png"
                      alt=""
                      width="25"
                      height="25"
                    />
                    {{
                      club.customer_id
                        ? $t("paymentFrequency")
                        : $options.filters.capitalizeText($tc("payment"))
                    }}
                  </a>
                  <br />
                  <a
                    v-if="club.customer_id"
                    style="background: #3fb389; border: 2px solid #3fb389"
                    class="btn btn-success col-md-12 mt-15 mb-10"
                    href="#"
                    @click="changePaymentMethod"
                  >
                    <i class="fa fa-credit-card-alt" aria-hidden="true"></i>
                    {{ $t("paymentMethod") }}
                  </a>
                </template>
              </div>
              <div id="for_mobile" class="col-md-9 mt-20">
                <div
                  class="vertical_scroll_bar point-table-wrap pb-100 md-pb-80"
                >
                  <table>
                    <tbody style="text-align: center !important">
                      <tr>
                        <th>{{ $tc("name") | capitalizeText }}</th>
                        <th>{{ $t("modifyTeam") | capitalizeText }}</th>
                        <th>{{ $t("delete") | capitalizeText }}</th>
                      </tr>
 
                      <template v-if="teams.length" class="vertical_scroll_bar">
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
                              <strong>{{ team.name }}</strong>
                            </router-link>
                          </td>
                          <td>
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
                          <td>
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
                    </tbody>
                  </table>
                </div>
              </div>

              <div id="for_web" class="col-md-9 mt-20">
                <div
                  class="vertical_scroll_bar point-table-wrap pb-100 md-pb-80"
                >
                  <table>
                    <tbody style="text-align: center !important">
                      <tr>
                        <th>{{ $tc("name") | capitalizeText }}</th>
                        <th>{{ $tc("category") | capitalizeText }}</th>
                        <th>{{ $tc("season") | capitalizeText }}</th>
                        <th>{{ $tc("coach") | capitalizeText }}</th>
                        <th>{{ $t("numberPlayersAllowed") }}</th>
                        <th>{{ $t("numberPlayersAdded") }}</th>
                        <th>{{ $t("teamPage") | capitalizeText}}</th>
                        <th>{{ $t("modifyTeam") | capitalizeText}}</th>
                        <th>{{ $t("delete") | capitalizeText }}</th>
                      </tr>

                      <template v-if="teams.length" class="vertical_scroll_bar">
                        <tr v-for="team in teams" :key="team.id">
                          <td style="font-size: 13px">
                            <router-link
                              :to="{
                                name: 'Team',
                                params: { name: team.unique_name },
                              }"
                              @click.native="updateSingleTeam(team)"
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
                                    ? `/static/upload/images/teams/${team.avatar}`
                                    : '/images/teams/default.png'
                                "
                              />
                              <br />
                              <strong>{{ team.name }}</strong>
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
                          <td style="font-size: 13px">
                            {{
                              team.coach.first_name
                                ? team.coach.first_name
                                : team.coach.user.email
                            }}
                          </td>
                          <td style="font-size: 13px">
                            {{ team.number_players_allowed }}
                          </td>
                          <td style="font-size: 13px">
                            {{ team.number_players_added }}
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
                              @click.native="updateSingleTeam(team)"
                            >
                              <i
                                class="fa fa-eye"
                                aria-hidden="true"
                                style="color: #fff"
                              />
                            </router-link>
                          </td>
                          <td>
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
                          <td>
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
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    <AddTeam ref="addTeam" :team="chosenTeam" @team-added="getTeams" />

    <DeleteTeam :team="chosenTeam" @team-removed="getTeams" />

    <Subscription
      :teams="teams"
      :numberPlayers="numberPlayers"
      @checkout-redirection="goToCheckout"
    />

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
                <li class="list-group-item">
                  <b>{{ $t("numberPlayersAllowed") }}: </b>
                  {{ chosenTeam.number_players_allowed }}
                </li>
                <li class="list-group-item">
                  <b>{{ $t("numberPlayersAdded") }}: </b>
                  {{ chosenTeam.number_players_added }}
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
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import {loadStripe} from '@stripe/stripe-js';

import routeRedirectionMixin from "../../mixins/routeRedirectionMixin";
import AddTeam from "../all/AddTeam";
import DeleteTeam from "../all/DeleteTeam";
import Subscription from "./Subscription";

export default {
  name: "Home",

  components: {
    AddTeam,
    DeleteTeam,
    Subscription,
  },

  mixins: [routeRedirectionMixin],

  data() {
    return {
      chosenTeam: {},
      annualPlan: process.env.VUE_APP_STRIPE_ANNUAL_PLAN,
    };
  },

    computed: {
        ...mapState({
            user: (state) => state.user.data,
            isConnected: (state) => state.user.isConnected,
            playersPrices: (state) => state.clubs.playersPrices,
        }),

        currentLocale() {
            return this.$i18n.locale
        },

        club() {
            return this.user.club;
        },

        // Gets the teams that are actually registered by the club itself, as some teams might have been linked to this club but added by independent coaches
        teams() {
            return this.$store.getters.TeamsRegisteredByClub;
        },

        /* Gets the total number of players the club has allowed his coaches to add
            So this is the number of players for which the club needs to pay
            */
        numberPlayers() {
            return this.teams.reduce(
                (acc, team) => acc + team.number_players_allowed,
                0
            );
        },
    },

  created() {
    this.getTeams();
  },

  methods: { 
    ...mapActions({
      getTeamsDispatch: "getTeams",
      getSeasonsDispatch: "getSeasons",
      getPlayerCharacteristics: "getPlayerCharacteristicsDispatch",
      getPlayerPricesDispatch: "getPlayerPrices",
    }),

    ...mapMutations({
      updateSeasons: "SEASONS_LIST_UPDATE",
      updatePlayerCharacteristics: "PLAYERS_CHARACTERISTICS_UPDATE",
      updateUserTeams: "USER_TEAMS_UPDATE",
      updateSingleTeam: "TEAM_UPDATE_DATA",
      updatePlayersPrices: "UPDATE_PLAYERS_PRICES",
    }),

    /* Runs the necessary actions when the user wants to add/modify a team
        this is run here instead of within the child component directly because 
        it seemed it was the only way to make the api calls only when the user clicks on these add/modify buttons
        and not every time the home page is created 
        */
    openAddTeamComponent() {
      // This gets all the teams in our app
      this.$refs.addTeam.getTeams();
      // This gets the values for fields like the players age categories
      this.$refs.addTeam.getFieldsValues();
    },

    // Enables the club to change its payment method
    async changePaymentMethod() {
      // Gets the players prices and updates these prices infos in the state
      await this.getPlayerPrices();

      // Once we have the prices infos, we can redirect the user to the checkout process
      this.goToCheckout();
    },

    async goToCheckout(subscriptionPeriodChoice = undefined) {
      const stripe = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY, {
          locale: this.currentLocale
      });

      // Initially assumes the club already has subscribed to a plan and just wants to update the payment method
      let chosenPlan = this.club.plan_id;

      if (subscriptionPeriodChoice) {
        // A specific plan has been chosen by the club, so the club is actually in the process of paying to register his teams
        chosenPlan =
          subscriptionPeriodChoice === "1"
            ? process.env.VUE_APP_STRIPE_ANNUAL_PLAN
            : process.env.VUE_APP_STRIPE_MONTHLY_PLAN;
      }

      const numberPlayersToPayFor = Math.min(
        this.numberPlayers,
        this.playersPrices[1].number_players
      );

      stripe
        .redirectToCheckout({
          items: [{ plan: chosenPlan, quantity: numberPlayersToPayFor }],
          clientReferenceId: `${this.club.id}`,
          billingAddressCollection: "required",
          customerEmail: `${this.user.email}`,

          // Note that it is not guaranteed your customers will be redirected to this
          // URL *100%* of the time, it's possible that they could e.g. close the
          // tab between form submission and the redirect.
          successUrl: `${process.env.VUE_APP_FRONT_URL}/club/checkout/1`,
          cancelUrl: `${process.env.VUE_APP_FRONT_URL}/club/checkout/0`,
        })
        .then(function(result) {
          if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer.
            this.$swal(result.error.message);
          }
        });
    },

    // Gets the players prices, i.e. the price for one player along with the max price we charge and the associated number of players
    async getPlayerPrices() {
      const response = await this.getPlayerPricesDispatch().catch(() =>
        this.$swal(this.$store.state.apiInternalError)
      );

      this.updatePlayersPrices(response.data);
    },

    // Gets the user's teams
    getTeams() {
      const data = {
        teamIdentifier: "all",
        userId: this.club.id,
        roles: this.user.roles,
      };

      // Dipatches the request to get the user's teams
      this.getTeamsDispatch(data)
        .then((response) => {
          this.updateUserTeams(response.data.teams);
        })
        .catch(() => this.$swal(this.$store.state.apiInternalError));
    },

    goToTeamPage(chosenTeam) {
        $('#team_details_modal').modal('hide')
        this.$store.commit('TEAM_UPDATE_DATA', chosenTeam)
        this.$router.push({
            name: 'Team',
            params: { name: chosenTeam.unique_name },
        })    
    },
  },
};
</script>

<style scoped>
.vertical_scroll_bar {
  height: 500px;
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
    margin-top: -10px;
  }
  #for_web {
    display: none;
  }
  #for_mobile {
    display: block;
  }
  .vertical_scroll_bar {
    padding: 0px 0px 10px 0px !important;
    margin-top: -26px;
    overflow: auto;
    height: 800px;
  }
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-width: 768px) and (max-width: 1024px) {
  .vertical_scroll_bar {
    margin-top: -10px;
  }
}
</style>
