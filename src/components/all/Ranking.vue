<template>

<!-- Ranking component that displays all the players from the app. 
It does not display the ranking among specific club/teams
-->

    <div class="rs-result inner pt-100 md-pt-80">
        <div class="container">
            <div class="rs-products">
                <div class="shop-guide mb-30">
                    <div class="row rs-vertical-middle">

                        <div class="col-lg-6 col-md-6 col-sm-6 xs-mb-15">
                            <div class="title-style pb-50 md-pb-30">
                                <h2 class="margin-0 uppercase">{{$tc('the', 2)}} {{$tc('ranking', 2)}}</h2>
                                <span class="line-bg y-b pt-10 left-line"></span>
                            </div>
                        </div>

                        <div class="col-lg-12 col-md-12 col-sm-12 xs-text-left">
                            <div class="sorting container">
                                <form>

                                    <select 
                                        v-if="teamFeaturesVisible && userTeams.length" 
                                        v-model="displayTeamFilter"
                                        @change="filterRanking"
                                        class="mr-4" style="float:left !important;"
                                    >
                                        <option :value="false" selected>{{$t('appName')}}</option>
                                        <option :value="true"> {{$tc('team', 2) | capitalizeText}} </option>
                                    </select> 

                                    <template v-if="displayTeamFilter">  
                                        <select 
                                            v-model="filters.seasonId" 
                                            @change="filterRanking"
                                            class="mr-4" style="float:left !important;"
                                        >
                                            <option value="all">-- {{$t('allSeasons')}} --</option>
                                            <option
                                                v-for="season in seasons"
                                                :key="season.id"
                                                :value="season.id"
                                            >
                                                {{season.name}}
                                            </option>
                                        </select>  
                                        <select 
                                            v-model="teamId" 
                                            @change="filterRanking"
                                            class="mr-4" style="float:left !important;"
                                        >
                                            <option value="all">-- {{$t('allTeams')}} --</option>
                                            <option
                                                v-for="team in teams"
                                                :key="team.id"
                                                :value="team.id"
                                            >
                                                {{team.name}}
                                            </option>
                                        </select>                                            
                                    </template>     

                                    <template v-else>
                                        <select
                                            v-model="filters.gender"
                                            @change="filterRanking"
                                            class="mr-4" style="float:left !important;"
                                        >
                                            <option v-for="gender in genders" :value="gender.value" :key="gender.text">
                                                {{gender.text}}
                                            </option>
                                        </select>
                                        <select
                                            v-model="filters.countryId"
                                            @change="filterRanking"
                                            class="mr-4" style="float:left !important;"
                                        >
                                            <option value="all">-- {{$t('allCountries')}} --</option>
                                            <option
                                                v-for="country in countries"
                                                :key="country.id"
                                                :value="country.id"
                                            >
                                                {{ country.name }}
                                            </option>
                                        </select>
                                        <select 
                                            v-model="filters.sectionName"
                                            @change="filterRanking"
                                            class="mr-4" style="float:left !important;"
                                        >
                                            <option v-for="section in sections" :value="section.value" :key="section.text">
                                                {{section.text}}
                                            </option>
                                        </select>
                                    </template>

                                    <select
                                        v-model="filters.challengesCategoryId"
                                        @change="filterRanking('challenges', getChallenges)"
                                        class="mr-4" style="float:left !important;"
                                    >
                                        <option value="all">-- {{$t('allExcerciceTypes')}} --</option>
                                        <option
                                            v-for="cat in challengesCategories"
                                            :key="cat.id"
                                            :value="cat.id"
                                        >
                                            {{currentLocale=== $i18n.fallbackLocale ?  cat.english_name : cat.french_name}}
                                        </option>
                                    </select>
                                    <select
                                        v-model="filters.challengeId"
                                        @change="filterRanking('challengesCategories', getChallengesCategories)"
                                        class="mr-4" style="float:left !important;"
                                    >
                                        <option value="all">-- {{$t('allChallenges')}} --</option>
                                        <option
                                            v-for="challenge in challenges"
                                            :key="challenge.id"
                                            :value="challenge.id"
                                        >
                                            {{ challenge.name }}
                                        </option>
                                    </select>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="vertical_scroll_bar row mobile-table">
                <template v-if="users.length"> 
                    <div class="col-md-4" v-for="(user, index) in users" :key="index">
                        <div style="margin-bottom:20px !important;" class="list-group">
                            <router-link 
                                :to="{name: 'Home', params: { username: user.username }}" 
                                style="background:rgb(63 179 137); border:2px solid rgb(63 179 137);" 
                                class="list-group-item list-group-item-action active"
                            >
                                <img style="margin-right:5px; border: 3px solid #3fb389;border-radius: 100%;background: #3fb58a;width:40px;height: 40px;" :src="user.player.avatar ? `/upload/images/users/${user.player.avatar}`: '/images/users/avatar.svg'" />
                                <strong>{{ user.username }}</strong> 
                            </router-link>
                            <li class="list-group-item list-group-item-action">
                                <b style="color:#3FB389;">{{$t('rank') | capitalizeText}}: </b>
                                {{ index + 1 }}
                            </li>
                            <li class="list-group-item list-group-item-action">
                                <b style="color:#3FB389;">{{$tc('point', 2) | capitalizeText}}: </b>
                                {{ user.totalPoints }} {{$t('pts')}}
                            </li>
                            <li class="list-group-item list-group-item-action">
                                <b style="color:#3FB389;">{{$t('status') | capitalizeText}}: </b>
                                {{user.player.userStatus ? (currentLocale=== $i18n.fallbackLocale ? user.player.userStatus.english_name : user.player.userStatus.french_name) : $t('unknown')}}</li>
                            <li class="list-group-item list-group-item-action">
                                <b style="color:#3FB389;">{{$t('country') | capitalizeText}}: </b> 
                                {{ getCountryName(user) }}
                            </li>
                        </div>
                    </div>
                
                <infinite-loading spinner="circles" :identifier="infiniteId" @infinite="infiniteHandler">
                    <div slot="no-more">{{$t('noMoreResults')}}</div>
                    <div slot="no-results">{{pageNumber === 0 ? $t('noResult') : ''}}</div>
                </infinite-loading> 
                </template>
            </div>
            
            <div class="rs-pointtable inner-style pt-30 md-pt-80 md-pb-80">
                <div class="container">
                    <div class="vertical_scroll_bar point-table-wrap pb-100 md-pb-80">
                        <table>
                            <tbody style="text-align:center !important;">
                                <tr>
                                    <th>
                                        <img
                                            style
                                            class="mr-2"
                                            src="/images/icons/BFicon.png"
                                            alt
                                            width="40"
                                            height="40"
                                        />
                                    </th>
                                    <th>{{$t('rank') | capitalizeText}}</th>
                                    <th>{{$tc('point', 2) | capitalizeText}}</th>
                                    <th>{{$t('status') | capitalizeText}}</th>
                                    <th>{{$t('country') | capitalizeText}}</th>
                                </tr>
                                
                                <template v-if="users.length">
                                    <tr v-for="(user, index) in users" :key="index">
                                        <td>
                                            <router-link :to="{name: 'Home', params: { username: user.username }}">
                                                <img
                                                    style="border: 3px solid #3fb389;border-radius: 100%;background: #3fb58a;width:70px;height: 70px;"
                                                    :src="user.player.avatar ? `/upload/images/users/${user.player.avatar}`: '/images/users/avatar.svg'"
                                                />
                                                <br />
                                                <p>
                                                    <strong>
                                                        {{ user.username }}
                                                    </strong>
                                                </p>
                                            </router-link>
                                        </td>
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ user.totalPoints }} {{$t('pts')}}</td>
                                        <td>{{user.player.userStatus
                                                ? 
                                                (currentLocale=== $i18n.fallbackLocale ?  user.player.userStatus.english_name : user.player.userStatus.french_name) 
                                                : 
                                                $t('unknown')
                                            }}</td>
                                        <td>
                                            <ul class="classement_li">
                                            <li class="mr-2">{{ getCountryName(user) }}</li>
                        <!--                       <li>
                                                <img
                                                v-if="player.country"
                                                style="width:40px; height:30px; border-radius:3px;"
                                                :src="player.drapeau"
                                                />
                                            </li> -->
                                            </ul>
                                        </td>
                                    </tr>
                                    <infinite-loading spinner="circles" :identifier="infiniteId" @infinite="infiniteHandler">
                                        <div slot="no-more">{{$t('noMoreResults')}}</div>
                                        <div slot="no-results">{{pageNumber === 0 ? $t('noResult') : ''}}</div>
                                    </infinite-loading>                    
                                </template>
                                <template v-else> 
                                    {{$t('noOnesRanked')}}
                                </template>
                            </tbody>
                        </table>
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

    name: "Ranking",

    mixins: [scrollLoadingMixin, trainingsFeatures],

    data() {
        return {
            displayTeamFilter: false,
            teamId: 'all',
            pageNumber: 0,
            usersToDisplaySize: 10,
            users: [],
            genders: [],
            sections: [],
            challenges: [],
            challengesCategories: [],
            infiniteId: +new Date(),
        };
    },

    computed: {
        ...mapState({
            user: (state) => state.user.data,
            challengesFromState: (state) => state.trainings.challenges,
            challengesCategoriesFromState: (state) => state.trainings.categories,
            countries: (state) => state.general.countries,
            filters: state => state.ranking.filters,
            userTeams: (state) => state.teams.userOnes,
            teamFeaturesVisible: (state) => state.user.teamFeaturesVisible,
        }),

        currentLocale() {
            return this.$i18n.locale
        },

        seasons() {
            return this.$store.getters.Seasons(this.userTeams)
        },

        // Gets the teams to display depending on the season selected by the user
        teams() {
            if(parseInt(this.filters.seasonId)) {
            // A specific season has been selected, so we take only the teams associated to this season
                return this.userTeams.filter(team =>team.season_id === this.filters.seasonId)
            } else {
            // We take all the user's teams as no filter on the season has been made
                return this.userTeams
            }
        }, 
        
        teamsIds() {
            // If the user is not part of a team, then the filter on team has no value other than the initial one
            let teamsIds = 'all'

            if(this.teamFeaturesVisible && this.displayTeamFilter) {
            /* The user is part of the team, and he has selected to display only the ranking associated to the teams he's part of
            so we need to know which team he want. 
            if a team has been selected from the filter (i.e. there is a value different than the initial one), we use this team id. If not, we get all the user's teams
            */
                teamsIds = parseInt(this.teamId) ? this.teamId : this.teams.map(team => team.id)
            }

            return teamsIds
        },
    },

    async created() {

        /* If section name defined, the user comes from a previous screen where he already asked ranking for a specific section
            If not, then by default we take the challenge section
        */
        if(!this.filters.sectionName) {
            this.updateRankingFilters({
                sectionName: this.$store.state.videosSection.challenge
            })
        } 

        // Gets the first X users of the app
        this.users = await this.getRanking()

        // If a list of countries is already stored in the state no need to call the api again, our countries will not change that often
        if(this.countries.length === 0) {
            this.getCountries()
        }  

        /* The lines below check if the user has already made a specific selection on the ranking (i.e. from a previous screen)
            if he has not and if the store already have in cache the list that are needed, 
            we don't need to call again the api
        */

        /* Creates the variable with the initial ranking filters from the store, 
        i.e. as if the user came to this screen with no prior selection on the filter
        */
        this.initialFilters = this.$store.state.ranking.initialFilters
        this.challengesCategories = await this.getInitialFilterValues('challengeId', this.challengesCategoriesFromState, this.getChallengesCategories)
        this.challenges = await this.getInitialFilterValues('challengeCategoryId', this.challengesFromState, this.getChallenges)        
    },

    mounted() {

        this.genders = [
            {text: this.$options.filters.capitalizeText(this.$t('mix')), value: "all"},
            {text: this.$options.filters.capitalizeText(this.$tc('boy', 2)), value: "M"},
            {text: this.$options.filters.capitalizeText(this.$tc('girl', 2)), value: "F"}            
        ]

        this.sections = [
            {text: this.$options.filters.capitalizeText(this.$store.state.videosSection.challenge), value: "challenge"},
            {text: this.$options.filters.capitalizeText(this.$store.state.videosSection.duel), value: "duel"},
        ]
    },

    destroyed() {
        // Necessary to reset the initial filters so that if the user comes back to this screen, he does not have any filter already selected
        this.resetRankingFilters()
    },

    methods: {

        ...mapActions({
            getRankingDispatch: "getRanking", 
            getChallengesDispatch: 'getChallenges',
            getChallengesCategoriesDispatch: 'getChallengesCategories',
            getCountriesDispatch: 'getCountries',
        }), 

        ...mapMutations({
            updateRankingFilters: 'RANKING_FILTERS_UPDATE',
            resetRankingFilters: 'RANKING_FILTERS_RESET',
            updateCountries: 'COUNTRIES_LIST_UPDATE',
            updateChallenges: 'CHALLENGES_LIST_UPDATE',
            updateChallengesCategories: 'CHALLENGES_CATEGORIES_UPDATE',
        }),

        // Gets either the user's ranking on training games among all users or just among the ones in his country
        async getRanking() {

            let data = {
                ...this.filters,
                teamsIds: this.teamsIds,
                size: this.usersToDisplaySize,
                page: this.pageNumber,
            }
            
            // Dispatches the action to get the X users to display
            var response = await this.getRankingDispatch(data).catch(() => {
                this.$swal(this.$store.state.apiInternalError)
                throw new Error
            })

            return response.data.usersRanking              
        },

        // Handles the infinite loading component to update the list of users once the user scrolls down
        infiniteHandler($state) {
            // The user scrolled down, the api must return the X (size) next users 
            this.pageNumber++
            this.loadData(this.users, this.usersToDisplaySize, this.pageNumber, this.getRanking, $state)
        },

        // Gets the ranking depending on the filter done by the user
        async filterRanking(filterToUpdate, actionForUpdate) {

            // The api will need to get the first users matching the new filter
            this.pageNumber = 0
            this.users = []
            // Makes the infinite loading component reset so that it restarts its state with the new list of users
            this.infiniteId += 1

            // Loads the data to display in the screen, updating directly the list of videos
            this.loadData(this.users, this.usersToDisplaySize, this.pageNumber, this.getRanking, undefined)
    
            if(arguments.length > 1) {
            // Arguments are specified if another filter depends on the one who just got changed
                this[filterToUpdate] = await actionForUpdate()
            }
        },

        // Gets all the challenges depending on the selected category
        async getChallenges(updateState=undefined) {

            const data = {
                name: 'all',
                teamsIds: this.teamsIds,
                seasonId: this.filters.seasonId,
                ageCategoryId: "all",
                categoryId: this.filters.challengesCategoryId,
                size: "all",
                page: "all",
                order: "name"
            };

            // Updates the challenges list to display and updates the state if required 
            const challenges = await this.getDataUpdateState(data, this.getChallengesDispatch, 'challenges', updateState, this.updateChallenges)
            return challenges
        },

        // Gets the available categories depending on the selected challenge
        async getChallengesCategories(updateState=undefined) {
            // Updates the challenges categories list to display and updates the state if required
            const categories = await this.getDataUpdateState({challengeId: this.filters.challengeId}, this.getChallengesCategoriesDispatch, undefined, updateState, this.updateChallengesCategories)                     
            return categories
        },

        // Gets the list of countries
        async getCountries() {
            const response = await this.getCountriesDispatch()
            this.updateCountries(response.data)
        },

        // Gets the name of the country if the user has an associated address/city/country
        getCountryName(user) {
            try {
                return user.address.city.country.name
            } catch(err) {
            // The user of the ranking has not yet any country associated to him
                return this.$t('unknown')
            }        
        },

        // Enables to avoid calling back the api if the list to display in the filter is already stored in the state
        async getInitialFilterValues(filterToCheck, initialList, action) {
            if(this.filters[filterToCheck] === this.initialFilters[filterToCheck] && initialList.length) {
            // This is the initial filter value and the list of values associated to this initial filter is already stored, so we use it
                return [...initialList]
            } else {
            // Either the user went to this screen with a filter already specified or the list of values for the initial filter is not yet stored, we need to fetch it
                const data = await action(true)
                return data
            }
        }
    },
};
</script>
<style scoped>
.sec-bg {
	background: #ffffff !important;
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