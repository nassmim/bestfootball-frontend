<template>

<!-- Component where a coach can add players in his team
-->

    <div>

        <div class="col-md-12 mt-20 mb-60 mt-80">
            <div class="point-table-wrap md-80 justify-content-center">
                <center><div class="col-md-6 text-center">
                        <div style="margin-bottom:20px !important;" class="list-group">
                            <router-link style="background:rgb(63 179 137); border:2px solid rgb(63 179 137);" :to="{name: 'Team', params: {name: team.unique_name}}"
                            @click.native="$store.commit('TEAM_UPDATE_DATA', team)" class="list-group-item list-group-item-action active"> <img style="margin-right:5px; border: 3px solid #3fb389;border-radius: 100%;background: #3fb58a;width:50px;height: 50px;" :src="team.avatar ? `/static/upload/images/teams/${team.avatar}` : '/images/teams/default.png'" /><strong>{{ team.name }}</strong> </router-link>
                            <li class="list-group-item list-group-item-action"><b style="color:#3FB389;">{{$tc('category') | capitalizeText}}: </b>{{team.player_category && team.player_category.name ? team.player_category.name : $t('notYetIndicated') }}</li>
                            <li class="list-group-item list-group-item-action"><b style="color:#3FB389;">{{$tc('season') | capitalizeText}}: </b>{{team.season && team.season.name ? team.season.name : $t('notYetIndicated') }}</li>
                            <li class="list-group-item list-group-item-action" v-if="user.coach.belongs_to_club"><b style="color:#3FB389;">{{$t('numberPlayersAllowed')}}: </b>{{ team.number_players_allowed }}</li>
                            <li class="list-group-item list-group-item-action"><b style="color:#3FB389;">{{$t('numberPlayersAdded')}}: </b> {{ team.number_players_added }}</li>
                        </div>
                    </div></center>

            </div>
        </div>    

        <div class="rs-result inner md-80">
            <div class="container">
                <div class="rs-products">
                    <div class="shop-guide">
                        <div class="row rs-vertical-middle">
                            <div class="col-lg-6 col-md-6 col-sm-6 xs-mb-15">
                                <div class="title-style pb-10 md-pb-30">
                                    <h2 class="margin-0 uppercase">{{$tc('player', 2)}}</h2>
                                    <span class="line-bg y-b pt-10 left-line"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="row mobile-table">
                    <div class="col-md-12 mb-10">
                        <div class="row">
                            <div class="col-md-9">
                                <div class="input-group mb-3">
                                    <input
                                        style="height: 45px; outline: 0 !important"
                                        type="text"
                                        class="form-control" 
                                        :placeholder="$t('addPlayersPlaceholder')"
                                        aria-label="search"
                                        aria-describedby="basic-addon2"
                                        @input="playerSearch=$event.target.value.trim().toLowerCase()"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>                    
                    <div class="col-md-4" v-for="(playerUser, index) in usersToDisplay" :key="index">
                        <div style="margin-bottom:20px !important;" class="list-group">
                            <a style="background:rgb(63 179 137); border:2px solid rgb(63 179 137);" href="#" class="list-group-item list-group-item-action active">
                                <img style="margin-right:5px; border: 3px solid #3fb389;border-radius: 100%;background: #3fb58a;width:40px;height: 40px;" :src="playerUser.player.avatar ? `/upload/images/users/${playerUser.player.avatar}` : '/images/users/avatar.svg'" />
                                <strong>{{playerUser.username}}</strong> 
                            </a>
                            <li class="list-group-item list-group-item-action">
                                <b style="color:#3FB389;">{{$t('firstName') | capitalizeText}}: </b>
                                {{playerUser.player.first_name}}
                            </li>
                            <li class="list-group-item list-group-item-action">
                                <b style="color:#3FB389;">{{$t('lastName') | capitalizeText}}: </b>
                                {{playerUser.player.last_name}}
                            </li>
                            <li class="list-group-item list-group-item-action">
                                <b style="color:#3FB389;">{{$tc('position') | capitalizeText}}: </b> 
                                <select
                                    class="form-control"
                                    id="exampleFormControlSelect1"
                                    @change="playerPositions[index]=$event.target.value"
                                >
                                    <option v-for="position in playerCharacteristics.positions" 
                                        :key="position.id" 
                                        :selected="position.id === playerUser.positionId"
                                        :value="position.id"
                                    >
                                        {{position.name}}
                                    </option>
                                </select>
                            </li>
                            <li class="list-group-item list-group-item-action"><b style="color:#3FB389;">{{$tc('addPlayer')}}: </b> <button
                                    class="btn btn-success"
                                        style="
                                        background: #c1c1c1;
                                        border: 1px solid #c1c1c1;
                                        padding: 5px 30px;
                                    "
                                    :disabled="isTeamPlayer(playerUser.id) || addingDisabled"
                                    @click="addTeamPlayer(playerUser.id, playerPositions[index])"
                                >
                                    <i
                                        class="fa fa-upload"
                                        aria-hidden="true"
                                        style="
                                            color: #c1c1c1;
                                            background: white;
                                            border-radius: 50px;
                                            font-size: 10px;
                                            padding: 5px 6px 5px 6px;
                                        "
                                    ></i>
                                </button>
                            </li>
                            <li class="list-group-item list-group-item-action"><b style="color:#3FB389;">{{$t('removePlayer')}}: </b> 
                                <button
                                    class="btn btn-success"
                                    style="
                                        background: #c1c1c1;
                                        border: 1px solid #c1c1c1;
                                        padding: 5px 30px;
                                    "
                                    :disabled="!isTeamPlayer(playerUser.id)"
                                    @click="removeTeamPlayer(playerUser.id)"
                                >
                                    <i
                                        class="fa fa-times"
                                        aria-hidden="true"
                                        style="
                                            color: #fff;
                                            background: #fe1e1e;
                                            border-radius: 50px;
                                            font-size: 10px;
                                            padding: 5px 7px 5px 7px;
                                        "
                                    ></i>
                                </button>
                            </li>
                        </div>
                    </div>
            </div>
                <!-- Point Table Start -->

                <div class="rs-pointtable inner-style pt-5 md-pt-5 md-pb-80">
                    <transition
                        enter-active-class="animated fadeIn zoomIn"
                        leave-active-class="animated fadeOut zoomOut"
                    >
                        <div id="add_player_div">
                            <div class="container">
                                <div class="row">

                                    <div class="col-md-12 mb-10">
                                        <div class="row">
                                            <div class="col-md-9">
                                                <div class="input-group mb-3">
                                                    <input
                                                        style="height: 45px; outline: 0 !important"
                                                        type="text"
                                                        class="form-control" 
                                                        :placeholder="$t('addPlayersPlaceholder')"
                                                        aria-label="search"
                                                        aria-describedby="basic-addon2"
                                                        @input="playerSearch=$event.target.value.trim().toLowerCase()"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-md-12">
                                        <div class="point-table-wrap pb-100 md-pb-80">
                                            <table>
                                                <tbody style="text-align: center !important">

                                                    <tr>
                                                        <th>{{$tc('profile') | capitalizeText}}</th>
                                                        <th>{{$t('username') | capitalizeText}}</th>
                                                        <th>{{$t('firstName') | capitalizeText}}</th>
                                                        <th>{{$t('lastName') | capitalizeText}}</th>
                                                        <th>{{$tc('position') | capitalizeText}}</th> 
                                                        <th>{{$tc('addPlayer')}}</th>
                                                        <th>{{$t('removePlayer')}}</th>
                                                    </tr>

                                                    <tr v-for="(playerUser, index) in usersToDisplay"
                                                        :key="index"
                                                        style="padding: 20px 10px"
                                                    >
                                                        <td>
                                                            <router-link :to="{name: 'Home', params: {username: playerUser.username}}" >
                                                                <img
                                                                    style="border: 3px solid #3fb389;border-radius: 100%;background: #3fb58a;"
                                                                    :src="playerUser.player.avatar ? 
                                                                        `/upload/images/users/${playerUser.player.avatar}`
                                                                        :
                                                                        '/images/users/avatar.svg'
                                                                    "
                                                                    width="60" 
                                                                    height="60"
                                                                />                                                                 
                                                            </router-link>
                                                        </td>                                                    
                                                        <td style="font-size: 13px"> <strong>{{playerUser.username}}</strong> </td>
                                                        <td style="font-size: 13px">{{playerUser.player.first_name}}</td>
                                                        <td style="font-size: 13px">{{playerUser.player.last_name}}</td>
                                                        <td style="font-size: 13px">
                                                            <center>
                                                                <select
                                                                    style="
                                                                        height: 33px;
                                                                        width: 115px;
                                                                        margin: 15px 0px;
                                                                    "
                                                                    class="form-control"
                                                                    id="exampleFormControlSelect1"
                                                                    @change="playerPositions[index]=$event.target.value"
                                                                >
                                                                    <option v-for="position in playerCharacteristics.positions" 
                                                                        :key="position.id" 
                                                                        :selected="position.id === playerUser.positionId"
                                                                        :value="position.id"
                                                                    >
                                                                        {{position.name}}
                                                                    </option>
                                                                </select>
                                                            </center>
                                                        </td>
                                                        <td>
                                                            <button
                                                                class="btn btn-success"
                                                                    style="
                                                                    background: #c1c1c1;
                                                                    border: 1px solid #c1c1c1;
                                                                    padding: 5px 30px;
                                                                "
                                                                :disabled="isTeamPlayer(playerUser.id) || addingDisabled"
                                                                @click="addTeamPlayer(playerUser.id, playerPositions[index])"
                                                            >
                                                                <i
                                                                    class="fa fa-upload"
                                                                    aria-hidden="true"
                                                                    style="
                                                                        color: #c1c1c1;
                                                                        background: white;
                                                                        border-radius: 50px;
                                                                        font-size: 10px;
                                                                        padding: 5px 6px 5px 6px;
                                                                    "
                                                                ></i>
                                                            </button>
                                                        </td>
                                                        <td>
                                                            <button
                                                                class="btn btn-success"
                                                                style="
                                                                    background: #c1c1c1;
                                                                    border: 1px solid #c1c1c1;
                                                                    padding: 5px 30px;
                                                                "
                                                                :disabled="!isTeamPlayer(playerUser.id)"
                                                                @click="removeTeamPlayer(playerUser.id)"
                                                            >
                                                                <i
                                                                    class="fa fa-times"
                                                                    aria-hidden="true"
                                                                    style="
                                                                        color: #fff;
                                                                        background: #fe1e1e;
                                                                        border-radius: 50px;
                                                                        font-size: 10px;
                                                                        padding: 5px 7px 5px 7px;
                                                                    "
                                                                ></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from 'vuex';

import routeRedirectionMixin from '../../mixins/routeRedirectionMixin';

export default {

    name: "AddTeamPlayers",

    mixins: [routeRedirectionMixin],

    data() {
        return {
            playerSearch: '',
        };
    },

    computed: {
        ...mapState({
            user: state => state.user.data,
            isConnected: state => state.user.isConnected,
            team: (state) => state.teams.singleOne,
            teams: (state) => state.teams.list,
            users: state => state.general.users,
            playerCharacteristics: (state) => state.general.playerCharacteristics,
        }),

        teamUsers() {
            return this.team.team_users ? this.team.team_users.map(function(teamUser) {
                teamUser.user.positionId =  teamUser.player_position_id
                return teamUser.user
            }) : []
        },

        teamUsersIds() {
            return this.teamUsers.map(user => user.id)
        },

        // Gets among the users the ones who are players 
        players() {
            return this.users.filter(user => user.player && user.player.id)
        },

        /* Gets the players matching the user research
        However, since the coach can change a player position while adding him to the team, we need to get the correct player position to display when the screen is loaded
        It will be either the one decided by the coach or the one the player has entered in his profile
        */
        results() {

            return this.players.reduce((list, user) => {

                if(this.getSearchResults(user, this.playerSearch)) {
                // The player matches the user's research

                    // Checks if this player already belongs to the team
                    let playerUser = this.teamUsers.filter(teamUser => teamUser.id === user.id)

                    if(playerUser.length) {
                    // The player belongs to the team, we keep the information we already have retrieved from the team so that we have his correct field position
                        playerUser = playerUser[0]
                    } else {
                    /* Since the user is not part of this team, we will use the field position he entered in his profile
                    */
                        playerUser = user
                        playerUser.positionId = playerUser.player.position_id
                    }

                    return list.concat(playerUser)

                } else {
                    return list
                }
            }, [])
        },

        // Users displayed will be either the teams ones or the ones who matched the user research 
        usersToDisplay() {
            return this.playerSearch ? this.results : this.teamUsers
        },

        playerPositions() {
            return this.usersToDisplay.map(user => user.positionId)
        },

        // If the coach has been added by a club, then he cannot add players if he has added more than the club allowed 
        addingDisabled() {
            return this.user.coach.belongs_to_club && this.team.number_players_added >= this.team.number_players_allowed
        },
    },

    async created() {

        // Redirects the user to the login page if he's not yet logged in
        const checkConnexion = this.redirectToLogin(this.isConnected, this.$i18n.locale)

        if(checkConnexion) {
            return true
        }

        // Gets the name of the team we are looking at
        this.teamName = this.$route.params.name + this.$route.hash

        // This checks if the team data has to be retrieved from the db and saved again in the store
        await this.checkAndUpdateTeam()
        
        // Redirects the user to his home screen if he's not this team coach
        const checkCoach = this.redirect()

        if(checkCoach) {
        // This is true, i.e. the function indicates the user must be redirected, no need to run the rest of the functions within this hook
            return
        }

        if(!this.users.length || !this.users.length) {
        // The users of the app is not yet stored, we get them and update the state so that we don't have to run again the request
            this.getUsers()
        }

        if(!this.playerCharacteristics.positions.length) {
            // The characteristics that define players (like the position, the age category etc.) are not yet stored, we need to get it and update the state so that we do not need to do it again later
            this.getPlayerCharacteristics()        
        }
    },

    methods: {

        ...mapActions({
            getTeams: 'getTeams',
            getUsersDispatch: 'getUsers',
            addTeamPlayerDispatch: 'addTeamPlayer',
            removeTeamPlayerDispatch: 'removeTeamPlayer',
            getPlayerCharacteristicsDispatch: 'getPlayerCharacteristics',
        }),


        ...mapMutations({
            updateTeam: 'TEAM_UPDATE_DATA',
            updateUsers: 'USERS_LIST_UPDATE',
            updatePlayerCharacteristics: 'PLAYERS_CHARACTERISTICS_UPDATE',
        }),

        // Adds a player in the team
        async addTeamPlayer(userId, positionId) {

            const data = {
                user_id: userId,
                team_id: this.team.id,
                position_id: positionId
            }

            // Dispatches the action to add a player
            const response = await this.addTeamPlayerDispatch(data)
                .catch(() => {
                    this.$swal(this.$store.state.apiInternalError)
                    throw new Error()
                })
            
            // Gets the updated team and saves it in the state
            const team = await this.getTeam()
            this.updateTeam(team)
        },

        // Removes a player from the team
        async removeTeamPlayer(userId) {

            const data = {
                userId: userId,
                teamId: this.team.id
            }

            // Dispatches the action to remove a player
            const response = await this.removeTeamPlayerDispatch(data)
                .catch(() => {
                    this.$swal(this.$store.state.apiInternalError)
                    throw new Error()
                })
            
            // Gets the updated team and saves it in the state
            const team = await this.getTeam()
            this.updateTeam(team)
        },

        // Finds among all users the ones who match the user's research
        getSearchResults(user, playerSearch) {
            
            const username = user.username.toLowerCase(),
                firstName = user.player.first_name ? user.player.first_name.toLowerCase() : "",
                lastName = user.player.last_name ? user.player.last_name.toLowerCase() : "",
                valid_email = user.email || user.facebook_email || user.google_email,
                email = valid_email.toLowerCase()

            /* Using index of function instead of includes enables to have the list of users whose names/emails start with the user's input.
            i.e. the results will not be only the exact matches
            */
            if(username.indexOf(playerSearch) > -1 || firstName.indexOf(playerSearch) > -1 || lastName.indexOf(playerSearch) > -1 || email.indexOf(playerSearch) > -1) {
                return true
            }        
        },

        // Checks if the player is in the team
        isTeamPlayer(userId) {
            return this.teamUsersIds.includes(userId)
        },

        // Checks if the team is already stored and if not it does the appropriate action to get it
        async checkAndUpdateTeam() {

            if(!this.team || this.team.unique_name !== this.teamName) {
            // The team is not yet stored or its name does not match with the one on the route, so we need to get it
                const team = await this.getTeam()
                this.updateTeam(team)
            }
        },

        // Gets the team associated to this screen thanks to the route name
        async getTeam() {

            const data = {
                teamIdentifier: encodeURIComponent(this.teamName),
                userId: 'all',
                roles: 'all',                
            }

            // Dipatches the request to get the team 
            const response = await this.getTeams(data).catch(() => {
                this.$swal(this.$store.state.apiInternalError)
                throw new Error()
            })

            return response.data.team
        },

        async getUsers() {
            const response = await this.getUsersDispatch().catch(() => {throw new Error()})
            this.updateUsers(response.data)
        },

        // Gets the players' characteristics values like position, age etc.
        async getPlayerCharacteristics() {
            const response = await this.getPlayerCharacteristicsDispatch().catch(() => {
                this.$swal(this.$store.state.apiInternalError)
                throw new Error()
            })
            // Updates the state
            this.updatePlayerCharacteristics(response.data)
        },

        // Redirects the user if he's this team coach
        redirect() {

            if(this.team.coach_id !== this.user.coach.id) {
                // The user is not part this team coach, we redirect him to his home page
                    this.$router.push({
                        name: 'Home',
                        params: {
                            username: this.user.username
                        }
                    })

                return true 
            }

            return false
        },  
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
  padding: 12px 15px;
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
.mobile-table {
	display: none;
}

/* Smartphone (portrait and landscape) ----------- */
@media only screen and (min-width : 320px) and (max-width : 700px) {
.mobile-table {
	display: block !important;
}
.rs-pointtable {
	display: none !important;
}
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-width : 768px) and (max-width : 1024px) {
/* .mobile-table {
	display: block !important;
}
.rs-pointtable {
	display: none !important;
} */
}
</style>
