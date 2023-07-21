<template>
<!-- Player home component ; it gathers the main user's information such as 
  his ranking, his videos, his number of points etc. 
-->
    <div class="rs-single-team sec-bg pt-100 md-pt-80 md-pb-80">
        <div class="container">
            <div class="row pb-80 md-pb-80">
                <div class="col-lg-4 md-mb-50">

                    <div class="player-image"> 
                        <img
                            :src="player.avatar ? `/upload/images/users/${player.avatar}` : '/images/users/avatar.png'"
                            style="height: 270px !important; width: 500px !important;"
                        />

                        <div class="name-box">
                            <h3 class="player-name">{{ userVisited.username }}</h3>
                            <span v-if="player.userStatus" class="player-position" >
                                {{$t('status')}}: {{ player.userStatus[userStatusKeyName] }}
                            </span >
                            <br />
                            <!--<span class="club">Arsenal</span>-->

                            <!--<div class="squad-no"> 11</div>-->

                            <!--<div class="container">-->
                            <div class="row">
                                <div v-if="player.userStatus && player.userNextStatus" class="col-md-12">
                                    <h6 class="progress-title">
                                        {{ player.userStatus[userStatusShortNameKey] }}
                                    </h6>
                                    <div class="progress" style="height: 9px !important;">
                                        <div
                                            class="progress-bar"
                                            :style="{
                                                width: pointPercentage + '%',
                                                background: '#3FB389',
                                                height: '9px !important',
                                            }"
                                            style
                                        >
                                            <span
                                                style="margin-top:1px !important;"
                                                class="progress-icon fa fa-soccer-ball-o"
                                            ></span>
                                            <div class="progress-value">
                                                <span>{{ pointPercentage }}</span >%
                                            </div>
                                        </div>
                                    </div>
                                    <h6
                                        style="color:#3FB389 !important;"
                                        class="progress-title text-right"
                                    >
                                        {{
                                            player.userNextStatus[userStatusShortNameKey] +
                                            " (" +
                                            player.userNextStatus.point
                                        }}
                                        {{$tc('point', 2)}})
                                    </h6>
                                </div>

                                <div v-if="user.roles === $store.state.rolesNames.player && user.id !== userVisitedId" class="col-md-12">
                                    <center>
                                        <router-link
                                            :to="{name: 'DuelRequest', params: {username: userVisited.username}}"
                                            style="padding:8px 20px 8px 20px !important; color:#fff !important; margin-top:15px; margin-bottom:20px;"
                                            class="readon"
                                        >   
                                            {{$t('challengeMe')}}
                                        </router-link >
                                    </center>
                                </div>

                                <div class="col-md-12">
                                    <center>
                                        <ul class="social-icon">
                                        <li v-if="player.instagram_name">
                                            <a
                                            target="_blank"
                                            :href="
                                                'https://instagram.com/' +
                                                player.instagram_name
                                            "
                                            >
                                            <i class="fa fa-instagram"></i>
                                            </a>
                                        </li>
                                        <li v-if="player.snapchat_name">
                                            <a
                                            target="_blank"
                                            :href="
                                                'https://snapchat.com/' +
                                                player.snapchat_name
                                            "
                                            >
                                            <i class="fa fa-snapchat"></i>
                                            </a>
                                        </li>
                                        <!-- <li>
                                            <a href="#"><i class="fa far-tiktok"></i></a>
                                        </li>-->
                                        <li v-if="player.youtube_name">
                                            <a
                                            target="_blank"
                                            :href="
                                                'https://youtube.com/' +
                                                player.youtube_name
                                            "
                                            >
                                            <i class="fa fa-youtube"></i>
                                            </a>
                                        </li>
                                        <li v-if="player.facebook_name">
                                            <a
                                            target="_blank"
                                            :href="
                                                'https://facebook.com/' +
                                                player.facebook_name
                                            "
                                            >
                                            <i class="fa fa-facebook"></i>
                                            </a>
                                        </li>
                                        </ul>
                                    </center>
                                </div>
                                <!--</div>-->
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-8 pl-35 md-pl-15">
                    <div class="player-detail mb-50">

                        <div class="stats_boxes">
                            <div class="stats_box">
                                <ul id="stat_ul">
                                    <li id="stat_li" class="stats_num btn btn-warning">
                                        {{ videosNumber }}
                                    </li>
                                    &nbsp;
                                    <li id="stat_li" class="stats_text">
                                        <b>{{$tc('video', videosNumber)}}</b>
                                    </li>
                                </ul>
                            </div>
                            <div class="stats_box">
                                <ul id="stat_ul">
                                    <li id="stat_li" class="stats_num btn btn-warning">
                                        {{ player.total_point }}
                                    </li>
                                    &nbsp;
                                    <li id="stat_li" class="stats_text">
                                        <b>{{$tc('point', player.total_point)}}</b>
                                    </li>
                                </ul>
                            </div>
                            <div class="stats_box">
                                <ul id="stat_ul">
                                    <li id="stat_li" class="stats_num btn btn-warning" @click="goToRanking">
                                        {{userRankingInChallenges}}
                                    </li>
                                    &nbsp;
                                    <li id="stat_li" class="stats_text">
                                        <b>{{$t('generalRanking')}}</b>
                                    </li>
                                </ul>
                            </div>


                            <div class="stats_box">
                                <ul id="stat_ul">
                                    <li id="stat_li" class="stats_num btn btn-warning" @click="goToDuels()">
                                        {{ duelsNumber }}
                                    </li>
                                    &nbsp;
                                    <li id="stat_li" class="stats_text">
                                        <b>{{$tc('duel', duelsNumber)}}</b>
                                    </li>
                                </ul>
                            </div>
                            <div class="stats_box">
                                <ul id="stat_ul">
                                    <li id="stat_li" class="stats_num btn btn-warning">{{player.total_footcoin}}</li>
                                    &nbsp;
                                    <li id="stat_li" class="stats_text">
                                        <b>{{$tc('virtualMoney', player.total_footcoin)}}</b>
                                    </li>
                                </ul>
                            </div>
                            <div class="stats_box">
                               <ul id="stat_ul">
                                    <li id="stat_li" class="stats_num btn btn-warning" @click="(e) => goToRanking(e, country.id)">
                                        {{userCountryRankingInChallenges}}
                                    </li>
                                    &nbsp;
                                    <li id="stat_li" class="stats_text">
                                        <b>{{$t('country')}} - {{country.name ? country.name : $t('unknown')}}</b>
                                    </li>
                                </ul> 
                            </div>
                        </div>

                        <br />

                        <div class="rs-tab pb-10 md-pb-80">
                            <div class="single-team-data">
                                <div class="tab-content">
                                    <div class="tab-pane fade show active" id="team-overview">
                                        <!-- Point Table Start -->
                                        <div class="rs-pointtable inner-style pt-10 md-pt-80 md-pb-80" >
                                            <div class="container">
                                                <div class="rs-products">
                                                    <div class="shop-guide mb-30">
                                                        <div class="row rs-vertical-middle">
                                                            <div class="col-lg-4 col-md-6 col-sm-6 xs-mb-15">
                                                                <div class="title-style pb-50 md-pb-30">
                                                                    <h2 class="margin-0 uppercase">
                                                                        {{$tc('myFeminine', 2)}} {{$tc('video', 2)}}
                                                                    </h2>
                                                                    <span
                                                                        class="line-bg y-b pt-10 left-line"
                                                                    ></span>
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-8 col-md-8 col-sm-6 text-right xs-text-left" >
                                                                <div class="sorting" id="sorting">
                                                                    <form>
                                                                        <div class="row">
                                                                            <select
                                                                                class="col-md-5 mt-2 mr-3"
                                                                                v-model="categoryId"
                                                                                @change="filterVideos('challenges', getChallenges)"
                                                                            >
                                                                                <option value="all"
                                                                                >-- {{$t('allCategories')}} --</option
                                                                                >
                                                                                <option
                                                                                    v-for="category in categories"
                                                                                    :key="category.id"
                                                                                    :value="category.id"
                                                                                >
                                                                                    {{currentLocale=== $i18n.fallbackLocale ? category.english_name : category.french_name }}
                                                                                </option>
                                                                            </select>
                                                                            <select
                                                                                class="col-md-5 mt-2 mr-3"
                                                                                v-model="challengeId"
                                                                                @change="filterVideos('categories', getChallengesCategories)"
                                                                            >
                                                                                <option value="all"
                                                                                >-- {{$t('allChallenges')}} --</option
                                                                                >
                                                                                <option
                                                                                    v-for="challenge in challenges"
                                                                                    :key="challenge.id"
                                                                                    :value="challenge.id"
                                                                                >
                                                                                    {{ challenge.name }}
                                                                                </option >
                                                                            </select>
                                                                        </div>
                                                                    </form>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="point-table-wrap pb-80 md-pb-80">
                                                    <div class="club-videos">
                                                        <div class="row vertical_scroll_bar" v-if="videosNumber">
                                                        <div
                                                            class="col-lg-6 col-md-12 md-mb-30 mb-30"
                                                            v-for="(video, $index) in videos" :key="$index"
                                                        >
                                                            <div class="video-wrap">
                                                           <router-link class="popup-videos" :to="{name: 'GameVideo',params: {id: video.id}}">
                                                                <img :src="video.thumbnail_path ? `/upload/images/challenges/participations/${video.thumbnail_path}` : '/images/default_games_videos.jpg'" alt="Video" />
                                                                <i class="fa fa-play"></i>
                                                           </router-link>
                                                            </div>
                                                        </div>
                                                         <infinite-loading spinner="circles" :identifier="infiniteId" @infinite="infiniteHandler" :distance="1">
                                                                <div slot="no-more">{{$t('noMoreResults')}}</div>
                                                                <div slot="no-results">{{pageNumber === 0 ? $t('noResult') : ''}}</div>
                                                         </infinite-loading>  
                                                        </div>
                                                    </div>
                                                 </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from "vuex";
import scrollLoadingMixin from "../../mixins/scrollLoadingMixin"
import trainingsFeatures from "../../mixins/trainingsFeatures"

export default {

    name: "Home",
    
    mixins: [scrollLoadingMixin, trainingsFeatures],

    data() {
        return {
            videos: [],
            challenges: [],
            categories: [],
            challengeId: 'all',
            categoryId: 'all',
            videosToDisplaySize: 4,
            pageNumber: 0,
            videosNumber: 0,
            userRankingInChallenges: "?",
            country: {id: 'all'},
            userCountryRankingInChallenges: "?",
            duels: [],
            duelsNumber: "?",
            infiniteId: +new Date(),
            teamsIds: "all",
            seasonId: "all",
            ageCategoryId: "all",
            size: "all",
            page: "all",
        };
    },

    computed: {
        ...mapState({
            user: state => state.user.data,
            userVisited: state => state.general.userVisited,
            teams: (state) => state.teams.userOnes,
            duelsFromState: state => state.duels.list,
            challengesFromState: (state) => state.trainings.challenges,
            challengesCategoriesFromState: (state) => state.trainings.categories,            
        }),

        userVisitedId() {
            return this.userVisited.id
        },

        player() {
            return this.userVisited.player ? this.userVisited.player : {}
        },

        // Gets the language chosen by the user
        currentLocale() {
            return this.$i18n.locale
        },

        // Calculates the remaining points to reach the next status and expresses it in percentages
        pointPercentage() {
            return Math.min(100, (parseInt(this.player.total_point) * 100) /
                parseInt(this.player.userNextStatus.point))
        },

        // Selects the user's status right property to use depending on the langage chosen by the user  
        statusNames() {
            return this.getUserStatusLanguage()
        },

        userStatusKeyName() {
            return this.statusNames[0]
        },
        userStatusShortNameKey() {
            return this.statusNames[1]
        },
    },

    watch: {
        /* The user can search another user while he's already on his home screen
            In that case, the created() hooks is not called again, therefore the state would not be updated
            we force the update through this watcher
        */
        async $route (to, from) {

            if(to.name === 'Home') {
                
                // If the user used the research feature, then the uservisited state has already been updated, no need to get it again
                if(to.params.username != this.userVisited.username) {
                    await this.getUserVisited(encodeURIComponent(to.params.username))
                }
                
                this.updateState()
            }
        }
    },

    async created() {
        
        // we need to know if it is the user's home page or another user home page he is looking at
        const usernameRoute = this.$route.params.username + this.$route.hash

        if(this.user.username === usernameRoute) {
        // This is the user home screen
            this.updateUserVisited(this.user)
            this.getTeams()

        } else if(this.userVisited.username !== usernameRoute) {
        // This is another user home page, but either we do not have his associated data yet or the username from the route does not correspond to the one stored in the state
            // We get the data of the profile that the user is looking at
            
            const response = await this.getUserDispatch({identifier: encodeURIComponent(usernameRoute), role: this.$store.state.rolesNames.player})
                .catch(err => {
                    this.$swal(this.$store.state.apiInternalError)
                    throw new Error
                })

            this.updateUserVisited(response.data)
        } 

        // Updates the state with the right user of this profile page
        this.updateState()
        
        // Gets all the challenges and available categories of challenges 
        this.challenges = this.challengesFromState
        if(!this.challenges.length) {
            this.challenges = await this.getChallenges(true)
        }

        this.categories = this.challengesCategoriesFromState
        if(!this.categories.length) {
            this.categories = await this.getChallengesCategories(true)
        }
    },

    methods: {

        ...mapActions({
            getChallengesVideosDispatch: "getChallengesVideos", 
            getDuelsDispatch: "getDuels",
            getRankingDispatch: "getRanking", 
            getUserDispatch: 'getUser',
            getChallengesDispatch: 'getChallenges',
            getChallengesCategoriesDispatch: 'getChallengesCategories',
            getTeamsDispatch: 'getTeams'
        }), 

        ...mapMutations({
            updateUserVisited: 'USER_VISITED_UPDATE',
            updateUserDuels: 'USER_DUELS_LIST_UPDATE',
            updateChallenges: 'CHALLENGES_LIST_UPDATE',
            updateChallengesCategories: 'CHALLENGES_CATEGORIES_UPDATE',
            updateRankingFilters: 'RANKING_FILTERS_UPDATE',
            updateUserTeams: 'USER_TEAMS_UPDATE',
            updateTeamFeatures: 'TEAM_FEATURES_VISIBLE_UPDATE'
        }),

        // Gets the user of the home page our main user is going to
        async getUserVisited(usernameRoute) {
            const response = await this.getUserDispatch({identifier: usernameRoute, role: this.$store.state.rolesNames.player})
                .catch(() => {
                    this.$swal(this.$store.state.apiInternalError)
                    throw new Error
                })

            this.updateUserVisited(response.data)            
        },

        // Updates the state with the user's (the one whose the profile page we are on belongs) data 
        updateState() {

            // Re-initializes the state variables to the default value (i.e. first data loading and no filters)
            this.pageNumber = 0
            this.challengeId, this.categoryId = 'all', 'all'
            
            // Gets the initial videos to display and the number of all videos uploaded by the user
            this.getInitialVideos()

            // Gets the number of duels the user of this profile page has done
            this.getDuels()

            // Gets the global ranking of the user of this profile page
            this.getRanking('userRankingInChallenges')

            // Gets the ranking for the country where the user of this screen lives
            try {

                this.country = this.userVisited.address.city.country
                this.getRanking('userCountryRankingInChallenges')

            } catch(err) {
            // The user of this page has not yet any country associated to him
                this.userCountryRankingInChallenges = "?"
            }
        },

        // Gets the user's first X videos and the number of all the ones he uploaded
        async getInitialVideos() {
            const videosData = await this.getChallengesVideos(true)
            this.videos = videosData.list
            this.videosNumber = videosData.number 
        },

        /* Gets the list of the user's videos depending on the challenge and its selected category
         the size and page arguments enable to get the right number of videos for scrolling/pagination (or other method of displaying)
         the argument of this function specifies if we want to get the number of videos if there was no size defined
         */
        async getChallengesVideos(getFullLength=undefined) {

            const data = {
                userId: this.userVisitedId,
                teamsIds: this.teamsIds,
                seasonId: this.seasonId,
                ageCategoryId: this.ageCategoryId,
                categoryId: this.categoryId,
                challengeId: this.challengeId,
                videoId: "all",
                watched: "all",
                getFullLength: getFullLength,
                size: this.videosToDisplaySize,
                page: this.pageNumber,
            };

            // Dispatches the action to get the videos 
            const response = await this.getChallengesVideosDispatch(data).catch(() => {
                    this.$swal(this.$store.state.apiInternalError)
                    throw new Error
                })
            
            return response.data.videos
        },

        // Handles the infinite loading component to update the list of videos once the user scrolls down
        infiniteHandler($state) {
            // The user scrolled down, the api must return the X (size) next user's videos 
            this.pageNumber++
            // Loads the data to display in the screen, updating directly the list of videos
            this.loadData(this.videos, this.videosToDisplaySize, this.pageNumber, this.getChallengesVideos, $state, 'list')
        },

        // Gets the videos matching the new filter
        async filterVideos(filterToUpdate, actionForUpdate) {

            // The api will need to get the first videos matching the new filter
            this.pageNumber = 0
            this.videos = []
            // Makes the infinite loading component reset so that it restarts its state with the new list of videos
            this.infiniteId += 1

            // Loads the data to display in the screen, updating directly the list of videos
            this.loadData(this.videos, this.videosToDisplaySize, this.pageNumber, this.getChallengesVideos, undefined, 'list')

            if(arguments.length > 1) {
            // Arguments are specified if another filter depends on the one who just got changed
                this[filterToUpdate] = await actionForUpdate()
            }            
        },

        // Gets the number of duels the user participated in 
        getDuels() {

            if(this.user.username === this.userVisited.username && this.duelsFromState && this.duelsFromState.length) {
            /* At the creation of the component, we need to know the user's duels number
                but if the screen is the one of the main user and and his duels already are stored, there is no need to call the api again to get them
            */
                this.duelsNumber = this.duelsFromState.filter(duel => duel.status_id === 2 && duel.closed).length
                this.duels = [...this.duelsFromState]

            } else {
                this.getInitialDuels()
            }            
        },

        // Since the user's duels were not yet stored, it gets them now
        getInitialDuels() {

            const data = {
                userId: this.userVisitedId,
                statusId: 2,
                closed: 1,
                size: "all",
                page: "all"
            }

            // Dispatches the action to get the duels and updates the duels state
            this.getDuelsDispatch(data)
                .then(response => {
                    this.duelsNumber = response.data.length
                    this.duels = response.data

                    if(this.user.username === this.userVisited.username) {
                        // The user's duels were not yet stored, we do it so that we get them faster the next times
                        this.updateUserDuels(response.data)
                    }
                })
                .catch(err => this.$swal(this.$store.state.apiInternalError))
        },

        // Gets all the challenges depending on the selected category
        async getChallenges(updateState=undefined) {

            let data = {
                name: 'all',
                teamsIds: this.teamsIds,
                seasonId: this.seasonId,
                ageCategoryId: this.ageCategoryId,
                categoryId: this.categoryId,
                size: this.size,
                page: this.page,
                order: "name"
            };
            
            // Updates the challenges list to display and updates the state if required 
            const challenges = await this.getDataUpdateState(data, this.getChallengesDispatch, 'challenges', updateState, this.updateChallenges)
            return challenges       
        },

        // Gets the available categories depending on the selected challenge
        async getChallengesCategories(updateState=undefined) {
            // Updates the challenges categories list to display and updates the state if required
            const categories = await this.getDataUpdateState({challengeId: this.challengeId}, this.getChallengesCategoriesDispatch, undefined, updateState, this.updateChallengesCategories)                     
            return categories     
        },

        // Gets either the user's ranking on training games among all users or just among the ones in his country
        getRanking(challengesRankingName) {

            let data = {
                userId: this.userVisitedId,
                teamsIds: this.teamsIds,
                seasonId: this.seasonId,
                ageCategoryId: this.ageCategoryId,
                gender: "all",
                countryId: this.country.id,
                sectionName: this.$store.state.videosSection.challenge,
                challengesCategoryId: "all",
                challengeId: "all",
                size: this.size,
                page: this.page,
            }
            
            // Dispatches the action and updates the ranking state
            this.getRankingDispatch(data)
                .then(response => this[challengesRankingName] = response.data.individualRanking.userRank)
                .catch(err => this.$swal(this.$store.state.apiInternalError))
        },

        // Gets the user current and next to reach status names depending on the language chosen by the user
        getUserStatusLanguage() {
            return this.currentLocale === this.$i18n.fallbackLocale ? ['english_name', 'english_short_name'] : ['french_name', 'french_short_name']
        },

        goToDuels() {
            this.$router.push({name: 'Duels', params: {username: this.userVisited.username}})            
        },

        goToRanking(e, countryId='all') {
            this.updateRankingFilters({
                sectionName: this.$store.state.videosSection.challenge,
                countryId: countryId
            })
            this.$router.push({ name: 'Ranking' })
        },

        getTeams() {

            const data = {
                teamIdentifier: 'all',
                userId: this.user.player.id,
                roles: this.user.roles,                
            }

            // Dipatches the request to get the user's teams
            this.getTeamsDispatch(data)
                .then(response => {
                    const teams = response.data.teams
                    this.updateUserTeams(teams)

                    if(teams.length) {
                        this.updateTeamFeatures(true)
                    }
                })
                .catch(() => this.$swal(this.$store.state.apiInternalError))            
        }
    },
};
</script>

<style scoped>

.stats_boxes{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
}
.stats_box{
  display: flex;
  float: left;
  flex-wrap: wrap;
  background: #ebebeb;
  width: 30%;
  border-radius: 8px;
  margin: 5px;
  padding: 10px;
}

.rs-tab .single-team-data .tab-content .tab-pane .club-videos .video-wrap .popup-videos img {
    width: 100%;
    height: 180px;
}
.btn-warning {
  border-color: #3fb389;
}
.rs-single-team .player-image .name-box {
  background: #ffffff;
  padding: 31px 31px 35px 37px;
  position: relative;
  border-top: 2px solid #3fb389;
  margin-top: -20px !important;
}
.rs-single-team .player-detail {
  background: #ffffff;
  border-top: 2px solid #3fb389;
  padding: 32px;
}
.home_stat_circle {
  padding: 82px 33px 78px 86px;
  border-radius: 100%;
  margin: 0px -17px;
  text-align: center;
  background-image: url(/images/background/statistics_bg.png);
  background-repeat: no-repeat;
  background-position-x: 60px;
  background-position-y: 35px;
  background-size: 132px;
  width: 200px;
  height: 200px;
}
.home_stat_number {
  color: #3fb389;
  font-size: 25px;
  font-weight: 700;
}
.home_stat_text {
  color: #3fb389;
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
.stats_num {
    padding: 17px 0px;
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
@media screen and (max-width: 500px) {
 .rs-single-team .player-detail{
     padding: 30px 0px;
 } 
 #stat_ul li {
    display: inline-block !important;
    font-size: 12px;
}  
.stats_num {
    font-weight: 600 !important;
    font-size: 14px;
    width: 45px;
    height: 45px;
    border-radius: 65px;
    color: #000;
    padding: 13px 0px;
    text-align: center;
    background: none;
}
 #sorting{
   margin-top:0px !important;
 }
 .rs-tab .single-team-data .tab-content .tab-pane .club-videos .video-wrap .popup-videos img[data-v-7037cb0d] {
    width: 100%;
    height: 120px;
}
.stats_box{
  display: flex;
  float: left;
  flex-wrap: wrap;
  background: #ebebeb;
  width: 45%;
  margin: 5px;
  padding: 10px;
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

/* iPads (portrait and landscape) ----------- */
@media only screen and (min-width : 768px) and (max-width : 1024px) {
.rs-single-team .player-image .name-box{
    width:73%;
}
#sorting {
    margin-top: 0px;
    margin-left: 30px;
}
}
</style>
