<template>

<!-- Component to add or to change a team -->

    <div
        class="modal fade"
        id="add_team_modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div style="background: #f7f7f7" class="modal-content">

                <form>

                    <div style="border-bottom: none !important" class="modal-header">
                        <img
                            style="border: 2px solid #3fb389; border-radius: 50px"
                            class="mr-2"
                            src="/images/icons/add_players.png"
                            alt=""
                            width="30"
                            height="30"
                        />
                        <h6 style="color: #3fb389" class="modal-title">{{$t('addTeam')}}</h6>
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
                            <div class="form-row">

                                <div v-if="user.coach" class="col-md-6">
                                    <div class="form-group">
                                        <label for="">{{$t('clubName')}}</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="form.clubName"
                                            @input="$v.form.clubName.$reset"
                                            @blur="setFieldValue($event.target.value, 'clubName');model=false"
                                            @focus="model = true"
                                        />
                                        <div v-if="model && form.clubName.length > 0 " >
                                        <ul class="list-group list-group-flush">
                                            <li
                                                class="list-group-item username_sug"
                                                v-for="(club, index) in filteredClubs"
                                                :key="index"
                                                @click.prevent="form.clubName = club;model = false"
                                            >
                                            {{ club }}
                                            </li>
                                        </ul>
                                        </div>                                        
                                    </div>
                                    <template v-if="$v.form.clubName.$error">
                                        <label class="input-label">
                                            <span v-if="!$v.form.clubName.requiredCustom" class="req">{{$t('fieldRequired')}}</span>
                                            <span v-if="!$v.form.clubName.nameNotTaken" class="req">{{$t('clubAlreadyRegistered')}}</span>
                                        </label>
                                    </template>                                        
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label for="">{{$t('teamName')}}</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="form.teamName"
                                            @input="$v.form.teamName.$reset"
                                            @blur="setFieldValue($event.target.value, 'teamName')"
                                        />
                                    </div>
                                    <template v-if="$v.form.teamName.$error">
                                        <label class="input-label">
                                            <span v-if="!$v.form.teamName.required" class="req">{{$t('fieldRequired')}}</span>
                                            <span v-if="!$v.form.teamName.nameNotTaken" class="req"> {{$t('teamAlreadyRegistered')}} </span>
                                        </label>
                                    </template>                                      
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>{{$tc('category') | capitalizeText}}</label>
                                        <select
                                            id="inputState"
                                            class="form-control"
                                            v-model="form.categoryId"
                                        >
                                            <option value="all">{{$t('toChoose') | capitalizeText}}...</option>
                                            <option
                                                v-for="category in categories"
                                                :key="category.id"
                                                :value="category.id"
                                            >
                                                {{ category.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>{{$tc('season') | capitalizeText}}</label>
                                        <select class="form-control" v-model="form.seasonId">
                                            <option value="all">{{$t('toChoose') | capitalizeText}}...</option>
                                            <option
                                                v-for="season in potentialSeasons"
                                                :key="season.id"
                                                :value="season.id"
                                            >
                                                {{ season.name }}
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div class="col-md-6">
                                    <div class="form-group">
                                        <label>{{$t('league') | capitalizeText}}</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="form.leagueName"
                                        />
                                    </div>
                                </div>

                                <div v-if="user.club" class="col-md-6">
                                    <div class="form-group">
                                        <label for="">{{$t('numberPlayers')}}</label>
                                        <input
                                            type="number"
                                            class="form-control"
                                            placeholder="0"
                                            v-model="form.numberPlayers"
                                            @input="$v.form.numberPlayers.$reset"
                                            @blur="setFieldValue($event.target.value, 'numberPlayers')"
                                        />
                                    </div>
                                    <template v-if="$v.form.numberPlayers.$error">
                                        <label class="input-label">
                                            <span v-if="!$v.form.numberPlayers.requiredCustom" class="req">{{$t('fieldRequired')}}</span>
                                        </label>
                                    </template>                                     
                                </div>
                            </div>
                        </div>
                        <br />

                        <div v-if="user.club"
                            style="
                                background: #fff;
                                padding: 30px 30px;
                                margin-top: -10px;
                                border-radius: 10px;
                            "
                            class="container"
                        >
                            <div class="form-row">
                                
                                <template v-if="coachNotChosen">
                                    {{$t('warningMessageEmptyCoach')}}
                                </template>

                                <div class="col-md-12">
                                    <label>{{$t('coachChoice')}}</label>
                                </div>

                                <div class="col-md-6">
                                    <button
                                        style="background: #3fb389; border: #3fb389; color: #fff; margin:5px;"
                                        class="btn btn-default"
                                        type="button"
                                        @click="showEmail=!showEmail;showCoaches=false;form.coachId=''"
                                    >
                                        {{$t('pickNewCoach')}}
                                    </button>
                                </div>
                                <div v-if="userTeams.length" class="col-md-6">
                                    <button
                                        style="background: #3fb389; border: #3fb389; color: #fff; margin:5px;"
                                        class="btn btn-default"
                                        type="button"
                                        @click="showCoaches=!showCoaches;showEmail=false;form.coachEmail=''"
                                    >
                                        {{$t('keepOneExistingCoach')}}
                                    </button>
                                </div>

                                <div v-if="showEmail" class="col-md-12 mt-10">
                                    <div class="form-group">
                                        <label for="">{{$t('emailAddress') | capitalizeText}}</label>
                                        <input
                                            type="email"
                                            class="form-control"
                                            placeholder="Coach Email"
                                            v-model="form.coachEmail"
                                            @input="$v.form.coachEmail.$reset;coachNotChosen=false"
                                            @blur="setFieldValue($event.target.value, 'coachEmail')"
                                        />
                                    </div>
                                    <template v-if="$v.form.coachEmail.$error">
                                        <label class="input-label">
                                            <span v-if="!$v.form.coachEmail.requiredCustom" class="req">{{$t('fieldRequired')}}</span>
                                            <span v-if="!$v.form.coachEmail.email" class="req">{{$t('emailNotValid')}}</span>
                                        </label>
                                    </template>                                       
                                </div>

                                <div v-if="showCoaches" class="col-md-12 mt-10">
                                    <div class="form-group">
                                        <select class="form-control"
                                            v-model="form.coachId"
                                            @change="coachNotChosen=false"
                                        >
                                            <option value="">{{$t('toChoose') | capitalizeText}}</option>
                                            <option
                                                v-for="coach in clubCoaches"
                                                :key="coach.id"
                                                :value="coach.id"
                                            >
                                                {{ coach.first_name || coach.last_name ?  `${coach.first_name} ${coach.last_name}` : coach.user.email}}
                                            </option>                                            
                                        </select>
                                    </div>
                                    <template v-if="$v.form.coachId.$error">
                                        <label class="input-label">
                                            <span v-if="!$v.form.coachEmail.requiredCustom" class="req">{{$t('fieldRequired')}}</span>
                                            <span v-if="!$v.form.coachId.integer" class="req">{{$t('fieldRequired')}}</span>
                                        </label>
                                    </template>                                      
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        style="justify-content: center; border-top: none !important"
                        class="modal-footer"
                    >
                        <button
                            style="
                                float: left !important;
                                border-radius: 50px;
                                padding: 5px 40px;
                            "
                            type="button"
                            class="btn btn-danger"
                            data-dismiss="modal"
                        >
                            {{$t('close') | capitalizeText}}
                        </button>
                        <button
                            style="
                                float: left !important;
                                border-radius: 50px;
                                padding: 5px 40px;
                                background: #3fb389;
                                border: #3fb389;
                                color: #fff;
                            "
                            type="submit"
                            @click.prevent="addTeam"
                            class="btn btn-success"
                        >
                            {{$t('save') | capitalizeText}}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from "vuex";
import { validationMixin } from 'vuelidate'
import { required, email, integer } from 'vuelidate/lib/validators'

export default {
    
    name: 'AddTeam',

    props: ['team'],

    mixins: [validationMixin],

    data() {
        return {
            showEmail:false,
            showCoaches: false,
            teamId: "all",
            coachNotChosen: false,
            model: false,
            form: {
                clubName: "",
                teamName: "",
                leagueName: "",
                seasonId : "all",
                categoryId: "all",
                numberPlayers: "",
                coachEmail: "",
                coachId: "",
            },
        }
    },

    computed: {

         ...mapState({
            user: (state) => state.user.data,
            teams: (state) => state.teams.list,
            userTeams: (state) => state.teams.userOnes,
            categories: state => state.general.playerCharacteristics.categories,
            seasons: state => state.general.seasons,
        }),

        clubsNames() { 
            if(this.user.coach) {
                return this.$store.getters.usersNames(this.$store.state.rolesNames.club, undefined, true)
            }
        },

        // Gets the clubs that subscribed to our app
        registeredClubsNames() {
            if(this.user.coach) {
                return this.$store.getters.usersNames(this.$store.state.rolesNames.club, true, false)
            }
        },

        filteredClubs() {
            if(this.clubsNames) {
                return this.clubsNames.filter(name=> name.toLowerCase().indexOf(this.form.clubName.toLowerCase()) > -1)
            }      
        },

        /* If it's a adding, only the current and next seasons are displayed as it would be non sense to add a team for past seasons
        If it's a modifying, we show also the season of the team that was selected 
        (for instance if for any reason a coachs wants to change the name of a team even though the season is already finished)
        */
        potentialSeasons() {
            const teamSeason = this.team.id ? this.team.season : {} 
            return teamSeason.id ? [teamSeason].concat(this.seasons.slice(-2).filter(season => season.id != teamSeason.id)) : this.seasons.slice(-2)
        },

        // Gets the coaches associated to the club
        clubCoaches() {

            // Enables to stock the coaches already retrieved to avoid duplicates
            let uniques = []

            return this.userTeams.reduce((list, team) => {
                if(!uniques.includes(team.coach.user.email)) {
                // The coach email has not been added in the list yet
                    uniques.push(team.coach.user.email)
                    return list.concat(team.coach)
                } else {
                    return list
                }
            }, [])
        }
    },

    watch: {

        // Define initial form values depending on the team data 
        team(team) {

        // Either coach adds a new team and therefore all values will be null or the user is trying to change a team, so we display the team information
            this.teamId = this.team.id
            this.form.clubName = this.team.club ? this.team.club.name : ''
            this.form.teamName = this.team.name
            this.form.leagueName = this.team.league
            this.form.seasonId = this.team.season_id
            this.form.categoryId = this.team.player_category_id
            this.form.numberPlayers = this.team.number_players_allowed
        }
    },
    
    validations: {

        form: {

            clubName: {
                requiredCustom: function(clubName) {
                    return this.user.coach && !clubName ? false : true
                },
                nameNotTaken: function(clubName) {
                    if (this.user.club) {
                        return true
                    }                     
                    return !this.registeredClubsNames.includes(clubName.toLowerCase().replace(/\s+/g,''))
                }
            },

            teamName: { 
                required,
                nameNotTaken: function(teamName) {

                    if (this.team.id && this.team.name === teamName) {
                        return true
                    } 

                    // Sets the name as they are registered in our database
                    const uniqueName = `${this.user.club ? this.user.club.name : this.form.clubName}_${this.form.categoryId}_${this.form.seasonId}_${teamName}`.toLowerCase().replace(/\s+/g,'')
                    // Checks if we already have a team matching the name of the team the user tries to enter
                    const checkName = this.teams.filter(team=> team.unique_name.toLowerCase().replace(/\s+/g,'') === uniqueName)

                    return checkName.length ? false : true
                }
            },

            numberPlayers: {
                requiredCustom: function(numberPlayers) {
                    return this.user.club && !numberPlayers ? false : true
                }
            },

            coachEmail: {
                requiredCustom: function(coachEmail) {
                    return this.showEmail && !coachEmail ? false : true
                },
                email
            },

            coachId: {
                requiredCustom: function(coachId) {
                    return this.showCoaches && !coachId ? false : true
                },                
                integer,
            }, 
        }
    },

    methods: {
        
        ...mapActions({
            addTeamDispatch: 'addTeam',
            getTeamsDispatch: 'getTeams',
            getClubs: 'getClubs',
            getSeasons: 'getSeasons',
            getPlayerCharacteristics: 'getPlayerCharacteristics',
        }),

        ...mapMutations({
            updateSeasons: 'SEASONS_LIST_UPDATE',
            updatePlayerCharacteristics: 'PLAYERS_CHARACTERISTICS_UPDATE',
            updateTeams: 'TEAMS_UPDATE_LIST',
            updateClubs: 'CLUBS_LIST_UPDATE',
        }),

        // Adds or modifies a team 
        addTeam() {

            if(this.user.club && !this.form.coachEmail && !this.form.coachId) {
                this.coachNotChosen = true
                return
            }

            if(this.$v.$invalid) {
            // The form has not been filled correctly
                this.$v.form.$touch()
                return 
            }

            // We don't have the id if the user is not a club, but we will get it from the api
            let clubId = ''

            if(this.user.club) {
            // The user is a club, we can get its club id and name
                clubId = this.user.club.id
                this.form.clubName = this.user.club.name

            } else {
            // The user is a coach, we can get his id, and the club id will be retrieved from the database thanks to the club name the coach has selected
                this.form.coachId = this.user.coach.id
            }
            
            const data = {
                team_id: this.teamId,
                coach_id: this.form.coachId,
                club_name: this.form.clubName,
                name: this.form.teamName,
                league: this.form.leagueName,
                player_category_id: this.form.categoryId,
                season_id: this.form.seasonId,
                number_players_allowed: this.form.numberPlayers,
                coach_email: this.form.coachEmail,            
                club_id: clubId,
                isUpdating: this.team && this.team.id ? true : false,
            }

            this.addTeamDispatch(data)
                .then(response => {
                    if(response.data.emailAlreadyTaken) {
                        this.$swal(this.$i18n.t('warningMessageEmailAlreadyTaken'))
                    } else {
                        $('#add_team_modal').modal('hide')
                        this.$swal(this.$i18n.t('actionSuccessMessage'))
                        this.$emit('team-added')

                        if(this.user.coach && !this.user.coach.belongs_to_club) {
                            const checkClubExistence = this.filteredClubs.filter(name=> name.toLowerCase() === this.form.clubName.toLowerCase())
                            if(!checkClubExistence.length) {
                                this.$emit('get-clubs')
                            }
                        }
                    }
                })
                .catch(() => this.$swal(this.$store.state.api.apiInternalError))
        },  

        // Used to trigger the validation process 
        setFieldValue(value, field) {
            this.$v['form'][field].$touch()            
        }, 

        // Gets all the activated teams in our app, run from the parent component
        getTeams() {

            const data = {
                roles: this.user.roles,                
            }

            // Dipatches the request to get the teams
            this.getTeamsDispatch(data)
                .then(response => {
                    this.updateTeams(response.data.teams)
                })
                .catch((err) => this.$swal(this.$store.state.apiInternalError))            
        },
    
        // Gets differents required lists, it's run from the parent component
        getFieldsValues() {
            
            // Gets the players age categories
            this.checkAndGetData(this.categories, this.getPlayerCharacteristics, this.updatePlayerCharacteristics)
            // Gets the seasons
            this.checkAndGetData(this.seasons, this.getSeasons, this.updateSeasons)

        },

        // Checks if the state data already exists, if not it fetches it 
        async checkAndGetData(stateData, actionToGetData, actionToUpdateData) {

            if(stateData || !stateData.length) {
                
            // There is no data stored in the state, we call the api
                const response = await actionToGetData().catch(() => {
                    this.$swal(this.$store.state.apiInternalError)
                    throw new Error()
                })

                actionToUpdateData(response.data)
            }
        },
    }
}
</script>

<style scoped>

    .list-group {
        max-height: 200px;
        overflow-y: overlay;
    }

    .username_sug {
    cursor: pointer;
    color: #3fb389;
    -webkit-transition: background-color 0.4s ease;
    -moz-transition: background-color 0.4s ease;
    -o-transition: background-color 0.4s ease;
    transition: background-color 0.4s ease;
    }
    .username_sug:hover {
    color: #fff;
    background-color: #3fb389;
    font-weight: 500;
    }
</style>