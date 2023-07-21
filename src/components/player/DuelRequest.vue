<template>

  <!-- Component where the user can challenge another user in a specific challenge -->
  
    <div class="rs-single-club pt-80"> 
        <div class="container">
            <div class="col-lg-6 col-md-6 col-sm-6 xs-mb-15">
                <div class="title-style pb-10 md-pb-30">
                    <h2 class="margin-0 uppercase">{{$tc('duel') | capitalizeText}}</h2>
                    <span class="line-bg y-b pt-10 left-line"></span>
                </div>
            </div>

            <div
                class="container"
                style="margin-top: 30px; margin-bottom: 80px; height: 300; background: #F6F6F6; padding: 35px 35px 45px 35px; border-radius: 15px;"
            >
                <div class="col-md-12">
                    <div class="row text-center">

                        <div class="col-md-3">
                            <div
                                class="card"
                                style="width: 18rem; border-radius: 15px 15px 25px 25px; box-shadow:none; border: 1px solid rgb(239, 239, 239);"
                            >
                                <img
                                style="width:300px; height:250px; z-index: 0; border-radius: 15px 15px 15px 15px;"
                                class="card-img-top"
                                :src="player.avatar ? `/upload/images/users/${player.avatar}` : '/images/team/3.jpg'"
                                alt="Card user image cap"
                                />
                                <div
                                style="padding: 25px 20px; background:#3fb389; z-index: 5; margin-top: -80px; border-radius: 0px 0px 20px 20px;"
                                class="card-body"
                                >
                                <div style="margin-bottom: 10px;">
                                    <router-link :to="{name: 'Home', params: {username: user.username}}" >
                                        <span style="font-weight: 600; font-size: 20px; color: #ffffff;">
                                            {{user.username}}
                                        </span>
                                    </router-link>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div
                                class="card middle-card"
                            >
                                <div class="card-body">
                                    <div class="form-group">
                                        <form action>
                                            <label class="input-label">
                                                <span v-if="noChallengeSelected" class="req">{{$t('fieldRequired')}}</span>
                                            </label>                                            
                                            <select
                                                style="height: 45px;"
                                                class="form-control"
                                                id="exampleFormControlSelect1"
                                                v-model="challengeId"
                                            >
                                                <option value="all">{{$t('chooseChallenge')}}</option>
                                                <option v-for="challenge in challengesOptions"
                                                    :key="challenge.id"
                                                    :value="challenge.id"
                                                >
                                                    {{challenge.name}}
                                                    <img :src="challenge.img" width="30%" class="img-rounded" />
                                                </option>
                                            </select>
                                            <a
                                                style="margin-top:20px; padding:10px 40px; border-radius: 35px;"
                                                class="btn btn-success"
                                                href="#"
                                                @click.prevent="requestDuel"
                                            >
                                                {{$t('Idefy')}}
                                            </a >
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3">
                            <div
                                class="card"
                                style="width: 18rem; border-radius: 15px 15px 15px 15px; box-shadow:none; border: 1px solid rgb(239, 239, 239);"
                            >
                                <img
                                style="width:300px; height:250px; z-index: 0; border-radius: 15px 15px 15px 15px;"
                                class="card-img-top"
                                :src="playerVisited.avatar ? `/upload/images/users/${playerVisited.avatar}` : '/images/team/5.jpg'"
                                alt="Card image cap"
                                />
                                <div
                                style="    padding: 25px 20px; background: #FCE28C; z-index: 5; margin-top: -80px; border-radius: 0px 0px 15px 15px;"
                                class="card-body"
                                >
                                <div style="margin-bottom: 10px;">
                                     <router-link :to="{name: 'Home', params: {username: userVisited.username}}" >
                                        <span
                                        style="font-weight: 600; font-size: 20px; color: #3fb389;"
                                        >
                                        {{userVisited.username}}
                                        </span>
                                    </router-link>
                                </div>
                                </div>
                            </div>
                            </div>

                        <!-- <div class="col-md-3">
                            <div
                                class="card"
                                style="width: 18rem; border-radius: 15px 15px 15px 15px; box-shadow:none; border: 1px solid rgb(239, 239, 239);"
                            >
                                <img
                                style="width:300px; height:250px; z-index: 0; border-radius: 15px 15px 15px 15px;"
                                class="card-img-top"
                                :src="playerVisited.avatar ? `/upload/images/users/${playerVisited.avatar}` : '/images/team/5.jpg'"
                                alt="Card image cap"
                                />
                                <div
                                style="    padding: 25px 20px; background: #FCE28C; z-index: 5; margin-top: -80px; border-radius: 0px 0px 15px 15px;"
                                class="card-body"
                                >
                                <div style="margin-bottom: 10px;">
                                    <router-link :to="{name: 'Home', params: {username: userVisited.username}}" >
                                        <span
                                        style="font-weight: 600; font-size: 20px; color: #3fb389;"
                                        >
                                        {{userVisited.username}}
                                        </span>
                                    </router-link>
                                </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
  <!-- Single Club Section End -->
</template>

<script>
import { mapActions, mapState } from 'vuex';

import routeRedirectionMixin from "../../mixins/routeRedirectionMixin"

export default {

  name: "DuelRequest",

    mixins: [routeRedirectionMixin],

    computed: {

        ...mapState({
            user: state => state.user.data,
            isConnected: state => state.user.isConnected, 
            userVisited: state => state.general.userVisited,
            challenges: (state) => state.trainings.challenges,
        }),

        player() {
            return this.user.id ? this.user.player : {}
        },

        playerVisited() {
            return this.userVisited.id ? this.userVisited.player : {}
        }
    },

    data() {
        return {
            challengesOptions: [],
            challengeId: "all",
            noChallengeSelected: false
        }
    },

    created() {

        // Redirects the user to the right page if needed 
        const checkRedirect = this.redirect()

        if(checkRedirect) {
        // This is true, i.e. the function indicates the user must be redirected, no need to run the rest of the functions within this hook
            return
        }

        // Gets the information of the user we try to challenge and updates the state with his it
        this.getUserVisited()

        // Gets the challenges available for a duel
        this.getChallengesForDuel()
    },

    methods: {

        ...mapActions({
            getUserDispatch: 'getUser',
            requestDuelDispatch: 'requestDuel',
            getChallengesDispatch: 'getChallenges',
        }),

        requestDuel() {

            if(this.challengeId) {
            // The user has chosen a challenge, we can proceed

                const data = {
                    userAskingId: this.user.id,
                    userAskedId: this.userVisited.id,
                    challengeId: this.challengeId
                }
                
                // Creates the duel and redirects the user to the participation screen
                this.requestDuelDispatch(data)
                    .then(response => this.$router.push({
                        name: 'Duel',
                        params: {
                            id: response.data
                        }
                    }))
                    .catch(() => {
                        this.$swal(this.$store.state.apiInternalError)
                    })

            } else {
                this.noChallengeSelected = true
            }

        },

        // Gets the challenges and creates the list to display
        async getChallengesForDuel() {

            // Gets all the challenges if they're not yet stored in the state
            if(!this.challenges.length) {
                await this.getChallenges()
            }

            // Creates the final list to display
            this.challengesOptions = this.createChallengesOptions()
        },

        // Gets all the challenges and stores it in the state
        getChallenges() {

            const data = {
                name: 'all',
                teamsIds: 'all',
                seasonId: 'all',
                ageCategoryId: 'all',
                categoryId: 'all',
                size: 'all',
                page: 'all',
                order: "name"
            };

            this.getChallengesDispatch(data)
                .then(response => this.$store.commit('CHALLENGES_LIST_UPDATE', response.data.challenges))
                .catch(() => this.$swal(this.$store.state.apiInternalError))            
        },

        // Filters the challenges and adds to them some information to display
        createChallengesOptions() {

            return this.challenges.reduce((list, challenge) => challenge.duel_activated ? 
                list.concat({
                    id: challenge.id,
                    name: challenge.name,
                    img: (challenge.thumbnail_path ? "/upload/images/challenges/" : "/images/challenges/") +  challenge.thumbnail_path            
                }) : list, [])            
        },

        // Gets information about the user we are trying to challenge
        getUserVisited() {
            // Gets the information of the other user that the user wants to challenge
            const usernameRoute = this.$route.params.username + this.$route.hash,
                roleName = this.$store.state.rolesNames.player

            if(this.user.username === usernameRoute) {
            // The user is trying to challenge himself, we redirect him to his home screen
                this.$router.push({name: 'Home', params: {username: this.user.username}})

            } else if(!this.userVisited.player || this.userVisited.username === usernameRoute) {
            /* The other user who will be challenged is not already stored in the state, 
                or have no a player model (i.e. he's not considered as a player) or his username is not the one from the route
                we need to get the right information about him
            */
                this.getUserDispatch({identifier: encodeURIComponent(usernameRoute), role: roleName})
                    .then(response => this.$store.commit('USER_VISITED_UPDATE', response.data))
                    .catch(() => this.$swal(this.$store.state.apiInternalError))
            }            
        },

        // Redirects the user depending on his connexion status and role 
        redirect() {
            // Redirects the user to the login page if he's not yet logged in
            const checkConnexion = this.redirectToLogin(this.isConnected, this.$i18n.locale)

            if(checkConnexion) {
                return true
            }

            // Redirects the user to his home page if he's not a player
            const checkRole = this.checkRole(this.user.roles, this.$store.state.rolesNames.player, this.$i18n.locale)

            if(checkRole) {
                return true
            } 

            return false
        },
    }
};
</script>

<style scoped>
.middle-card{
padding: 50px 60px 30px 60px;
 margin: 40px 30px;
 border-radius: 15px 15px 15px 15px; 
 box-shadow: none; 
 border: 1px solid rgb(239, 239, 239);
}
.btn-success {
  color: #fff;
  background-color: #3fb389;
  border-color: #3fb389;
}
/* Smartphone & kindle (portrait and landscape) ----------- */
@media only screen and (min-width : 320px) and (max-width : 700px) {
.middle-card{
 padding: 0px;
 margin: 20px 0px 10px 0px;
}
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-width : 768px) and (max-width : 1024px) {
.middle-card{
 padding: 0px;
 margin: 20px 0px 10px 0px;
}
}
</style>
