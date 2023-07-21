<template>
    <!-- Component that displays all the user's duels -->

    <div class="rs-result inner pt-100 md-pt-80">
        <div class="container">
            <div class="rs-products">
                <div class="shop-guide mb-30">
                    <div class="row rs-vertical-middle">
                        <div class="col-lg-6 col-md-6 col-sm-6 xs-mb-15">
                            <div class="title-style pb-50 md-pb-30">
                                <h2 class="margin-0 uppercase">{{$tc('myMasculine', 2)}} {{$tc('duel', 2)}}</h2>
                                <span class="line-bg y-b pt-10 left-line"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="vertical_scroll_bar row mobile-table">
              <template v-if="duels.length">
                <div class="col-md-4" v-for="duel in duels" :key="duel.id">
                    <div style="margin-bottom: 20px !important;" class="list-group">
                                        <td v-if="duel.userAsked.id === userIdToUse">
                                            <router-link :to="{name: 'Home', params: {username: duel.userAsking.username}}" style="background: rgb(63 179 137); border: 2px solid rgb(63 179 137);" class="list-group-item list-group-item-action active">
                                                <img
                                                    style="border: 3px solid #3fb389; border-radius: 100%; background: #3fb58a; width: 50px; height: 50px;"
                                                    :src="duel.userAsking.player.avatar ? `/upload/images/users/${duel.userAsking.player.avatar}` : '/images/team/3.jpg'"
                                                />
                                                <strong>{{duel.userAsking.username}}</strong>
                                            </router-link>
                                        </td>
                                        <td v-else>
                                            <router-link :to="{name: 'Home', params: {username: duel.userAsked.username}}" style="background: rgb(63 179 137); border: 2px solid rgb(63 179 137);" class="list-group-item list-group-item-action active">
                                                <img
                                                    style="border: 3px solid #3fb389; border-radius: 100%; background: #3fb58a; width: 50px; height: 50px;"
                                                    :src="duel.userAsked.player.avatar ? `/upload/images/users/${duel.userAsked.player.avatar}` : '/images/team/3.jpg'"
                                                />
                                                    <strong>{{duel.userAsked.username}}</strong>
                                            </router-link>
                                        </td>                        
                        <li class="list-group-item list-group-item-action"><b style="color: #3fb389;">{{$tc('challenge') | capitalizeText}}: </b><router-link :to="{name: 'GamePresentation', params: {name: duel.challenge.name}}">{{duel.challenge.name}}</router-link></li>
                        <li class="list-group-item list-group-item-action"><b style="color: #3fb389;">{{$t('date') | capitalizeText}}: </b>{{duel.created_at.slice(0,10)}}</li>
                        <li class="list-group-item list-group-item-action">
                            <b style="color: #3fb389;">{{$t('answerNoun') | capitalizeText}}: </b>
                            <template v-if="featuresEnabled && duel.userAsked.id === user.id && duel.status_id === 1">
                            <span class="btn btn-success btn-sm mr-2" style="background: #c1c1c1; border: 1px solid #c1c1c1;" @click="answer(duel.id, 2); duel.status_id=2; duel.status.name=$t('accepted')">
                                <i class="fa fa-check" aria-hidden="true" style="color: #ffffff; margin-right: 12px; background: #3fb389; border-radius: 50px; font-size: 13px; padding: 3px;"></i>
                                {{$t('Iaccept')}}
                            </span>
                            <span class="btn btn-success btn-sm ml-2" style="background: #c1c1c1; border: 1px solid #c1c1c1;" @click="answer(duel.id, 3); duel.status_id=3; duel.status.name=$t('refused')">
                                <i class="fa fa-times" aria-hidden="true" style="color: #fff; margin-right: 12px; background: red; border-radius: 50px; font-size: 13px; padding: 3px 5px;"></i>
                                {{$t('Irefuse')}}
                            </span>
                            </template>
                            <template v-else>
                            <strong>{{duel.status.name}}</strong>
                            </template>
                        </li>
                        <li class="list-group-item list-group-item-action">
                            <router-link :to="{name: 'Duel', params: {id: duel.id}}" class="btn btn-success btn-sm" style="background: #c1c1c1; border: 1px solid #c1c1c1;" @click.native="$store.commit('USER_DUEL_UPDATE', duel)">
                               <i class="fa fa-play" aria-hidden="true" style="color: #fff; margin-right: 12px; background: rgb(255, 200, 32); border-radius: 50px; font-size: 10px; padding: 5px 5px 5px 8px;"></i> 
                               {{$t('watchDuel')}}
                            </router-link>
                        </li>
                    </div>
                </div>
              </template>
              <template v-else>
                {{$t('noDuelsYet')}}
              </template>
            </div>

            <!-- Point Table Start -->
            <div class="rs-pointtable inner-style pt-5 md-pt-5 md-pb-80">
                <div class="container">
                    <div class="point-table-wrap pb-100 md-pb-80">
                        <table>
                            <tbody style="text-align: center !important;">
                                <tr>
                                    <th>{{$t('against') | capitalizeText}}</th>
                                    <th>{{$tc('challenge') | capitalizeText}}</th>
                                    <th>{{$tc('date') | capitalizeText}}</th>
                                    <th>{{$t('answerNoun') | capitalizeText}}</th>
                                    <th>{{$t('action') | capitalizeText}}</th>
                                </tr>
                                <template v-if="duels.length">
                                    <tr v-for="duel in duels" :key="duel.id">
                                        <td v-if="duel.userAsked.id === userIdToUse">
                                            <router-link :to="{name: 'Home', params: {username: duel.userAsking.username}}">
                                                <img
                                                    style="border: 3px solid #3fb389; border-radius: 100%; background: #3fb58a; width: 50px; height: 50px; margin-top: 30px;"
                                                    :src="duel.userAsking.player.avatar ? `/upload/images/users/${duel.userAsking.player.avatar}` : '/images/team/3.jpg'"
                                                />
                                                <br />
                                                <p><strong>{{duel.userAsking.username}}</strong></p>
                                            </router-link>
                                        </td>
                                        <td v-else>
                                            <router-link :to="{name: 'Home', params: {username: duel.userAsked.username}}">
                                                <img
                                                    style="border: 3px solid #3fb389; border-radius: 100%; background: #3fb58a; width: 50px; height: 50px; margin-top: 30px;"
                                                    :src="duel.userAsked.player.avatar ? `/upload/images/users/${duel.userAsked.player.avatar}` : '/images/team/3.jpg'"
                                                />
                                                <br />
                                                <p>
                                                    <strong>{{duel.userAsked.username}}</strong>
                                                </p>
                                            </router-link>
                                        </td>
                                        <td>
                                            <router-link :to="{name: 'GamePresentation', params: {name: duel.challenge.name}}">
                                                {{duel.challenge.name}}
                                            </router-link>
                                        </td>

                                        <td>{{duel.created_at.slice(0,10)}}</td>
                                        <td>
                                            <center v-if="featuresEnabled && duel.userAsked.id === user.id && duel.status_id === 1">
                                                <a href="#" class="btn btn-success mr-2" style="background: #c1c1c1; border: 1px solid #c1c1c1;" @click="answer(duel.id, 2); duel.status_id=2; duel.status.name=$t('accepted')">
                                                    <i class="fa fa-check" aria-hidden="true" style="color: #ffffff; margin-right: 12px; background: #3fb389; border-radius: 50px; font-size: 13px; padding: 3px;"></i>
                                                    {{$t('Iaccept')}}
                                                </a>
                                                <a href="#" class="btn btn-success ml-2" style="background: #c1c1c1; border: 1px solid #c1c1c1;" @click="answer(duel.id, 3); duel.status_id=3; duel.status.name=$t('refused')">
                                                    <i class="fa fa-times" aria-hidden="true" style="color: #fff; margin-right: 12px; background: red; border-radius: 50px; font-size: 13px; padding: 3px 5px;"></i>
                                                    {{$t('Irefuse')}}
                                                </a>
                                            </center>

                                            <strong v-else>{{duel.status.name}}</strong>
                                        </td>

                                        <td>
                                            <router-link :to="{name: 'Duel', params: {id: duel.id}}" class="btn btn-success" style="background: #c1c1c1; border: 1px solid #c1c1c1;" @click.native="$store.commit('USER_DUEL_UPDATE', duel)">
                                                <i class="fa fa-play" aria-hidden="true" style="color: #fff; margin-right: 12px; background: rgb(255, 200, 32); border-radius: 50px; font-size: 10px; padding: 5px 5px 5px 8px;"></i>
                                                {{$t('watchDuel')}}
                                            </router-link>
                                        </td>
                                    </tr>
                                    <infinite-loading spinner="circles" :identifier="infiniteId" @infinite="infiniteHandler">
                                        <div slot="no-more">{{$t('noMoreResults')}}</div>
                                        <div slot="no-results">{{pageNumber === 0 ? $t('noResult') : ''}}</div>
                                    </infinite-loading>
                                </template>
                                <template v-else>
                                    {{$t('noDuelsYet')}}
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- Point Table End -->
        </div>
    </div>
    <!-- Result Info Section End -->
</template>

<script>
    import { mapState, mapActions, mapMutations } from "vuex";
    import scrollLoadingMixin from "../../mixins/scrollLoadingMixin";

    export default {
        name: "Duels",

        mixins: [scrollLoadingMixin],

        data() {
            return {
                duels: [],
                featuresEnabled: false,
                size: 5,
                pageNumber: 0,
                infiniteId: +new Date(),
            };
        },

        computed: {
            ...mapState({
                user: (state) => state.user.data,
                userVisited: (state) => state.general.userVisited,
                isConnected: (state) => state.user.isConnected,
            }),
        },

        async created() {
            // Gets the right user's id to use to get the duels and determines if features should be disabled or not
            await this.setInitialState();
            this.duels = await this.getDuels();
        },

        methods: {
            ...mapActions({
                getUserDispatch: "getUser",
                getDuelsDispatch: "getDuels",
                answerDuelDispatch: "answerDuel",
            }),

            /* As the user can be the connected one or another whose this duels screen belongs
            we need to get the right id since the api request is based on it
            It also disables features if the user is not connected or if it's not his own duels screen
         */
            async setInitialState() {
                // Gets the username of the user we are on the page
                const usernameRoute = this.$route.params.username + this.$route.hash;

                if (this.user.username === usernameRoute && this.isConnected) {
                    // This is the main user being on his own duels screen
                    this.userIdToUse = this.user.id;

                    // As the user is connected and he is on his own screen, all features can be enabled
                    this.featuresEnabled = true;
                } else {
                    if (this.user.username !== usernameRoute) {
                        // This is actually not even the main user screen

                        if (this.userVisited.username === usernameRoute) {
                            // The user is on another user screen and this latter is already stored in the state
                            this.userIdToUse = this.userVisited.id;
                        } else {
                            /* The username within the route doesn't match the one who is still stored
                        we need to get the data of this new user then
                    */
                            const response = await this.getUserDispatch({ identifier: encodeURIComponent(usernameRoute), role: this.$store.state.rolesNames.player }).catch(() => {
                                this.$swal(this.$store.state.apiInternalError);
                                throw new Error();
                            });

                            this.userIdToUse = response.data.id;
                        }
                    }
                }
            },

            async getDuels() {
                const data = {
                    userId: this.userIdToUse,
                    statusId: "all",
                    size: this.size,
                    page: this.pageNumber,
                };

                const duels = await this.getDuelsDispatch(data).catch(() => {
                    this.$swal(this.$store.state.apiInternalError);
                    throw new Error();
                });

                return duels.data;
            },

            // Handles the infinite loading component to update the list once the user scrolls down
            async infiniteHandler($state) {
                // The user scrolled down, the api must return the X (size) next elements
                this.pageNumber++;
                // Loads the data to display in the screen, updating directly the list
                this.loadData(this.duels, this.size, this.pageNumber, this.getDuels, $state);
            },

            // Sends the user's answer either yes or no to validate the duel request he received from another user
            answer(duelId, answerValue) {
                this.answerDuelDispatch({ duelId: duelId, statusId: answerValue }).catch(() => this.$swal(this.$store.state.apiInternalError));
            },
        },
    };
</script>

<style scoped>
    .modal-backdrop {
        opacity: 0.5 !important;
        background: #000 !important;
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
    .mobile-table {
        display: none;
    }

    @media screen and (max-width: 500px) {
        .mobile-table {
            display: block !important;
        }
        .rs-pointtable {
            display: none !important;
        }
    }
</style>