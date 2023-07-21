<template>
  <!-- Component where the coach can create a game for one of his teams -->

    <div class="rs-pointtable inner-style pt-10 md-pt-80 md-pb-80">
        <div class="container">
        <div class="rs-products"> 
            <div class="shop-guide mb-30">
            <div class="row rs-vertical-middle">
                <div
                style="display: block"
                class="col-lg-6 col-md-6 col-sm-6 xs-mb-15"
                >
                <div class="title-style pb-50 pt-30 md-pb-30">
                    <h2 class="margin-0 uppercase">{{ $tc("challenge") }}</h2>
                    <span class="line-bg y-b pt-10 left-line"></span>
                </div>
                </div>

                <div
                class="col-lg-6 col-md-6 col-sm-6 text-right xs-text-left"
                ></div>
            </div>
            </div>
        </div>

        <div class="point-table-wrap pb-80 md-pb-80">
            <!-- Player statistics -->
            <div class="container">
            <div class="row form_row">
                <div class="col-md-6">

                <div
                    style="
                    background-color: #f6f6f6;
                    border-radius: 10px;
                    margin: 10px 10px 10px 10px;
                    padding:20px;
                "
                    class="col-md-12"
                >
                    <div style="margin:20px 0px 10px 0px;">
                        <h5>
                            <img
                                src="/images/icons/Icons ___ (100px)-08.png"
                                alt
                                width="35"
                            />
                            {{ $tc("game") | capitalizeText }}
                        </h5>
                    </div>

                    <div
                        style="
                        background-color: #fff;
                        padding: 30px 30px 30px 20px;
                        border-radius: 10px;
                        margin: 0px 10px 10px 10px;
                        "
                        class="left_inner_div text-center"
                    >
                        <div class="col">
                            <input
                                type="text"
                                class="form-control exercise_form_inputs"
                                :placeholder="$t('challengeName')"
                                v-model.trim="challengeName"
                                @input="$v.challengeName.$reset"
                                @blur="setFieldValue($event.target.value, 'challengeName')"                                            
                            />
                            <template v-if="$v.challengeName.$error">
                                <label class="input-label">
                                    <span v-if="!$v.challengeName.customRequired" class="req">{{$t('fieldRequired')}}</span>
                                </label>
                            </template>                    
                        </div>

                        <div class="col">
                            <select
                                    class="form-control exercise_form_inputs"
                                    id="gameChoice"
                                    v-model="gameChoice"
                            >
                                <option value="0">{{$t('from') | capitalizeText}} {{$t('appName')}}</option>
                                <option value="1">{{$t('custom') | capitalizeText}}</option>
                            </select>
                            <select
                                class="form-control exercise_form_inputs"
                                id="module"
                                @change="filterGames"
                                v-model="categoryId"
                            >
                                <option
                                    v-for="category in categories"
                                    :key="category.id"
                                    :value="category.id"
                                >
                                    {{
                                    currentLocale === $i18n.fallbackLocale
                                        ? category.english_name
                                        : category.french_name
                                    }}
                                </option>
                            </select>
                            <select 
                                v-if="!parseInt(gameChoice)" 
                                id="challengeToUse" 
                                class="form-control exercise_form_inputs"
                                v-model="challengeIdToUse"
                            >
                                <option 
                                    v-for="challenge in onlyBestFootballChallenges" 
                                    :value="challenge.id"
                                    :key="challenge.id"
                                > 
                                    {{challenge.name}}
                                </option>
                            </select>                          
                        </div>

                        <div v-if="parseInt(gameChoice)" class="col">
                            <div class="col-md-12">
                                <input
                                type="text"
                                class="form-control exercise_form_inputs"
                                :placeholder="$t('challengeDescriptionPlaceholder')"
                                    v-model.trim="challengeDescription"
                                    @input="$v.challengeDescription.$reset"
                                    @blur="setFieldValue($event.target.value, 'challengeDescription')"
                                />
                                <template v-if="$v.challengeDescription.$error">
                                    <label class="input-label">
                                        <span v-if="!$v.challengeDescription.customRequired" class="req">{{$t('fieldRequired')}}</span>
                                    </label>
                                </template> 
                            </div>
                            <div class="col-md-12">
                                <a 
                                    href="#" 
                                    style="padding: 10px 50px 10px 50px !important; color: #fff !important; margin-top: -10px;" 
                                    class="readon" 
                                    data-toggle="modal" 
                                    data-target="#upload_modal"
                                    @click="updateDropzone(true);$refs.UploadComponent.$refs.myVueDropzone.removeAllFiles(true)"
                                >
                                    {{$t('upload') | capitalizeText}}
                                </a>
                            </div>                                               
                        </div>
                    </div>
                </div>

                <div
                    style="
                    background-color: #f6f6f6;
                    border-radius: 10px;
                    margin: 10px 10px 10px 10px;
                    padding:20px;
                "
                    class="col-md-12"
                >
                    <div style="margin:20px 0px 10px 0px;">
                    <h5>
                        <img
                        src="/images/icons/Icons ___ (100px)-06.png"
                        alt
                        width="35"
                        />
                        <!-- {{ $tc("generalInformation") | capitalizeText }} -->
                        {{$tc('level', 2) | capitalizeText}}
                    </h5>
                    </div>

                    <div
                    style="
                    background-color: #fff;
                    padding: 30px 30px 30px 20px;
                    border-radius: 10px;
                    margin: 0px 10px 10px 10px;
                    "
                    class="left_inner_div text-center"
                    >
                    <div class="row">
                        <label v-if="gameLevelsError" class="input-label req">
                            {{$t('challengeGlobalErrorScore')}}
                        </label>
                        <div
                        v-for="(level, index) in levels"
                        :key="index"
                        class="col-md-12"
                        >
                        <div class="row">

                            <div class="col-md-4">
                                <label class="input-label">
                                    {{$tc('level')}} {{index+1}}
                                </label>                            
                            </div>

                            <div class="col-md-4">
                                <label class="input-label">
                                    {{(index+1) * pointPerLevel}} {{$tc('point', 2)}}
                                </label>                            
                            </div>

                            <div class="col-md-4">
                            <input
                                type="number"
                                class="form-control exercise_form_inputs"
                                min="0"
                                :placeholder="$t('scoreToReach')"
                                v-model="gameLevels[index]"
                                @change="gameLevelsError=0"
                            />                            
                            </div>

                        </div>
                        </div>
                        <br />
                    </div>
                    </div>
                </div>
                </div>

                <div class="col-md-5">

                <div
                    style="
                    background-color: #f6f6f6;
                    border-radius: 10px;
                    margin: 10px 10px 10px 10px;
                    padding:20px;
                "
                    class="col-md-12"
                >
                    <div style="margin:20px 0px 10px 0px;">
                    <h5>
                        <img
                        src="/images/icons/Icons ___ (100px)-07.png"
                        alt
                        width="35"
                        />
                        <!-- {{ $tc("generalInformation") | capitalizeText }} -->
                        {{$t('forWhichTeams')}}
                    </h5>
                    </div>

                    <div
                    style="
                    background-color: #fff;
                    padding: 30px 30px 30px 20px;
                    border-radius: 10px;
                    margin: 0px 10px 10px 10px;
                    "
                    class="left_inner_div text-center"
                    >
                    <div class="row">
                        <div class="col-md-12">
                            <div v-if="activatedTeams.length" class="col form-group">
                                <select class="form-control exercise_form_inputs" v-model="seasonId">
                                    <option value="all">-- {{$t('allSeasons')}} --</option>
                                    <option
                                        v-for="season in seasons"
                                        :key="season.id"
                                        :value="season.id"
                                    >
                                        {{season.name}}
                                    </option>
                                </select>                                        
                                <select class="form-control exercise_form_inputs" v-model="teamId">
                                    <option
                                        v-for="team in teams"
                                        :key="team.id"
                                        :value="team.id"
                                    >
                                        {{team.name}}
                                    </option>
                                </select>
                            </div>
                            <div v-else>
                                {{$t('noActivatedTeam')}}
                            </div> 
                        </div>
                    </div>
                    </div>
                </div>

                <div
                    v-if="parseInt(gameChoice)"
                    style="
                    background-color: #f6f6f6;
                    border-radius: 10px;
                    margin: 10px 10px 10px 10px;
                    padding:20px;
                "
                    class="col-md-12"
                >
                    <div style="margin:20px 0px 10px 0px;">
                    <h5>
                        <img
                        src="/images/icons/Icons ___ (100px)-05.png"
                        alt
                        width="35"
                        />
                        <!-- {{ $tc("generalInformation") | capitalizeText }} -->
                        {{$tc('tutorial', 2), | capitalizeText}}
                    </h5>
                    </div>

                    <div
                    style="
                    background-color: #fff;
                    padding: 30px 30px 30px 20px;
                    border-radius: 10px;
                    margin: 0px 10px 10px 10px;
                    "
                    class="left_inner_div"
                    >
                    <div class="row">
                        <div class="col-md-12">
                            <div class="col-md-12">
                                <label class="input-label">{{$t('whichTutorial')}}</label>
                                <select
                                    class="form-control exercise_form_inputs"
                                    id="tutorialChoice"
                                    v-model="tutorialChoice"
                                    @change="updateTutorialFields"
                                >
                                    <option value="none">{{$t('none') | capitalizeText}}</option>
                                    <option value="link">{{$t('link') | capitalizeText}}</option>
                                    <option value="custom">{{$t('custom') | capitalizeText}}</option>
                                </select>

                                <input 
                                    v-if="tutorialChoice === 'link'"
                                    type="text" 
                                    :placeholder="$t('tutorialVideoLink')" 
                                    class="form-control" 
                                    id="tutorialVideoLink" 
                                    v-model.trim="tutorialVideoLink"
                                    @input="$v.tutorialVideoLink.$reset"
                                    @blur="setFieldValue($event.target.value, 'tutorialVideoLink')"
                                />
                                <template v-if="$v.tutorialVideoLink.$error">
                                    <label class="input-label">
                                        <span v-if="!$v.tutorialVideoLink.customRequired" class="req">{{$t('fieldRequired')}}</span>
                                    </label>
                                </template>                                      
                                <template v-else-if="tutorialChoice==='custom'">
                                    <div class="col-md-12">
                                        <a 
                                            href="#" 
                                            style="padding: 10px 50px 10px 50px !important; color: #fff !important; margin-top: -10px;" 
                                            class="readon" 
                                            data-toggle="modal" 
                                            data-target="#upload_modal"
                                            @click="updateDropzone(false);$refs.UploadComponent.$refs.myVueDropzone.removeAllFiles(true)"
                                        >
                                            {{$t('upload') | capitalizeText}}
                                        </a> 
                                    </div>
                                    <div class="col-md-12">
                                        <label htmlFor="tutorialDescription" class="text-left">{{$t('tutorialDescription')}}</label>
                                        <textarea 
                                            :placeholder="$t('tutorialDescriptionPlaceholder')" 
                                            class="form-control" 
                                            id="tutorialDescription" 
                                            v-model.trim="tutorialDescription"
                                            @input="$v.tutorialDescription.$reset"
                                            @blur="setFieldValue($event.target.value, 'tutorialDescription')"
                                        >
                                        </textarea>  
                                        <template v-if="$v.tutorialDescription.$error">
                                            <label class="input-label">
                                                <span v-if="!$v.tutorialDescription.customRequired" class="req">{{$t('fieldRequired')}}</span>
                                            </label>
                                        </template> 
                                    </div>                                          
                                </template>                                                                                                     
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                <div
                    style="
                    background-color: #f6f6f6;
                    border-radius: 10px;
                    margin: 10px 10px 10px 10px;
                    padding:20px;
                "
                    class="col-md-12"
                >
                    <div style="margin:20px 0px 10px 0px;">
                    <h5>
                        <img
                        src="/images/icons/Icons ___ (100px)-07.png"
                        alt
                        width="35"
                        />
                        <!-- {{ $tc("generalInformation") | capitalizeText }} -->
                        {{$tc('gift')}}
                    </h5>
                    </div>

                    <div
                    style="
                    background-color: #fff;
                    padding: 30px 30px 30px 20px;
                    border-radius: 10px;
                    margin: 0px 10px 10px 10px;
                    "
                    class="left_inner_div text-center"
                    >
                    <div class="row">
                        <div class="col-md-12">
                        <select
                            class="form-control exercise_form_inputs"
                            id="giftChoice"
                            v-model="giftChoice"
                            @change="updateGiftChoice"
                        >
                            <label class="input-label">{{$t('challengeRewardsQuestion')}}</label>
                            <option value="0">{{$t('no')}}</option>
                            <option value="1">{{$t('personalCoachReward')}}</option>
                            <option v-if="user.coach.belongs_to_club && parseInt(gameChoice)" value="2">{{$tc('virtualMoney', 2) | capitalizeText}}</option>
                        </select>
                        </div>
                        <div v-if="parseInt(giftChoice)" class="col-md-12">
                                <template v-if="giftChoice === '1'">
                                    <label htmlFor="challengeCoachReward" class="text-left">
                                        {{$t('rewardDescription')}}
                                    </label>
                                    <textarea :placeholder="$t('rewardDescriptionPlaceholder')" 
                                        class="form-control" id="challengeCoachReward" 
                                        v-model="challengeCoachReward">
                                    </textarea>
                                </template>
                                <template v-else-if="parseInt(gameChoice)">
                                    <p>{{$t('challengeVirtualMoneyRewardDetails')}}</p>
                                </template>
                        </div>
                    </div>
                    </div>
                </div>

                <div class="col-md-12 mt-10">
                    <button
                        type="submit"
                        style="padding: 16px 85px 16px 85px !important;color:#fff !important;margin-top:15px;font-size: 20px;margin-bottom:20px;"
                        class="readon col-md-12"
                        @click="createGame"
                    >
                    {{$t('Iconfirm')}}
                    </button>
                </div>
                </div>
            </div>
            </div>
        </div>
        <!-- Player statistics -->
        </div>

        <UploadComponent
            ref="UploadComponent"
            :title="$options.filters.capitalizeText($t('upload')) + ' ' + $tc('yourFeminine') + ' ' +  $tc('video')"
            :scoreNeeded="false"
            :dropzoneInitialOptions="dropzoneInitialOptions"
            @file-removed="removeFile"
            @file-uploaded="setVideoInfos"
            @file-saved="saveFile"            
        />    
    </div> 
  <!-- Point Table End -->
</template>

<script>
import { mapState } from "vuex";
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

import UploadComponent from "../all/Upload";

export default {

    name: "CreateGame",

    components: { UploadComponent },

    mixins: [validationMixin],

    data() {
        return {
            onlyBestFootballChallenges: [],
            challengeName: "",
            categoryId: 0,
            challengeDescription: "",
            levels: [1, 2, 3, 4, 5, 6],
            gameLevels: [],
            pointPerLevel: 50,
            giftChoice: "0",
            gameChoice: "0",
            tutorialChoice: "0",
            challengeCoachReward: "",
            challengeId: 0,
            challengeIdToUse: 0,
            videoSent: false,
            gameFileName: "",
            tutorialFileName: "",
            seasonId: "all",
            tutorialVideoLink: "",
            gameUpload: true,
            partnerName: "",
            tutorialPartnerLink: "",
            tutorialDescription: "",
            teamId: 0,
            gameLevelsError: 0,
            dropzoneInitialOptions: {
                method: "post",
                url: `/trainings/challenges/upload/`,
                maxFiles: 1,
                maxFilesize: 500,
                timeout: 3600000,
                dictFileTooBig: this.$t("dropzoneDictFileTooBig"),
                thumbnailWidth: 200,
                addRemoveLinks: true,
                dictDefaultMessage: `<i style="color:#3FB389;" class="fa fa-upload mr-2"/> ${this.$options.filters.capitalizeText(this.$t("upload"))}`,
                destroyDropzone: true,
                acceptedFiles: "video/*, .mp4, .mov, .avi, .wmv, .flv, .avchd, .webm, .mkv",
                capture: "environment",
                dictCancelUpload: this.$t("cancelUpload"),
                dictRemoveFile: this.$t("cancelUpload"),
            },      
        };
    },
    
  computed: {
    ...mapState({
      user: (state) => state.user.data,
      userTeams: (state) => state.teams.userOnes,
      challenges: (state) => state.trainings.challenges,
      categories: (state) => state.trainings.categories,
    }), 

        // Gets the teams that are really activated 
        activatedTeams() {
            return this.userTeams.filter(team=> team.activated)
        },

        seasons() {
            return this.$store.getters.Seasons(this.activatedTeams)
        },

        // Gets the teams to display depending on the season selected by the user
        teams() {
            if(parseInt(this.seasonId)) {
            // A specific season has been selected, so we take only the teams associated to this season
                return this.activatedTeams.filter(team =>team.season_id === this.seasonId)
            } else {
            // We take all the user's teams as no filter on the season has been made
                return this.activatedTeams
            }
        },

        // Gets the language chosen by the user
        currentLocale() {
            return this.$i18n.locale;
        },
    },

    validations: {

        challengeName: {required},

        challengeDescription: {
            customRequired: function(challengeDescription) {
                return !parseInt(this.gameChoice) || challengeDescription
            }
        },

        tutorialVideoLink: {
            customRequired: function(tutorialVideoLink) {
                return this.tutorialChoice !== 'link' || tutorialVideoLink
            }
        },
        
        tutorialDescription: {
            customRequired: function(tutorialDescription) {
                return this.tutorialChoice !== 'custom' || tutorialDescription
            }           
        },

        challengeCoachReward: {
            customRequired: function(challengeCoachReward) {
                return this.giftChoice !== 'custom' || challengeCoachReward
            }
        },
    },

    watch: {

        challengeIdToUse(challengeIdToUse) {
            if(challengeIdToUse) {
                this.fileName = this.challenges.reduce((fileName, challenge)=> challenge.id===challengeIdToUse ? challenge.bf_path : fileName, "")
            }
        }        
    },

    mounted() {

        // With this, the select tags will display initial values, which helps the user know what is the purpose of these fields
        const firstCategory = this.categories[0]
        this.categoryInfos = {id: firstCategory.id, name: firstCategory[this.rightLanguageName]}
        this.teamId = this.activatedTeams[0].id

        const d = new Date()
        this.todayDate = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toJSON().split(".")[0]

        this.categoryId = this.categories[0].id
        this.onlyBestFootballChallenges = this.challenges.filter(challenge=> !challenge.team_id && challenge.challenge_category_id === this.categoryId)
        this.challengeIdToUse = this.onlyBestFootballChallenges.length ? this.onlyBestFootballChallenges[0].id : 0
    },

    methods: {

        // Creates a new challenge
        async createGame() {

            // Flag that indicates the user tries to save his file. This is to prevent the remove event from dropzone to fire
            this.videoSent = true;

            if(this.$v.$invalid) {
            // The form has not been filled correctly
                this.$v.$touch()
                return 
            }

            for(let i=0; i<this.levels.length;i++) {
                if(!this.gameLevels[i]) {
                    this.gameLevelsError = 1
                    return
                }
            }

            if(parseInt(this.gameChoice)) {
                this.challengeIdToUse = 0
            } else {
                this.challengeId = 0
                this.virtualMoneyGiven = false
            }

            this.challengeName = this.challengeName + ' ' + this.todayDate 

            const data = {
                id: this.challengeId,
                user_id: this.user.id,
                name: this.challengeName.trim(),
                french_description: this.challengeDescription,
                english_description: this.challengeDescription,
                challenge_category_id: this.categoryId, 
                tutorial_partner: this.partnerName,
                tutorial_partner_link: this.tutorialPartnerLink,
                tutorial_video_link: this.tutorialVideoLink, 
                teams_ids: [this.teamId],
                levels: this.gameLevels,
                virtualMoneyGiven: this.virtualMoneyGiven,
                challenge_coach_reward: this.challengeCoachReward,
                bf_path: this.gameFileName,
                challenge_id_to_use: this.challengeIdToUse
            }

            // Dispatches the request to create a challenge
            this.$store.dispatch('createGame', data)

                .then(() => {
                    
                    if(this.tutorialId) {
                        this.createTutorial()
                    }

                    this.$swal(this.$t('actionSuccessMessage'))
                    
                    this.$router.push({
                        name: 'GamePresentation',
                        params: {
                            name: this.challengeName
                        }
                    })
                })

                .catch(() => {
                    this.$swal(this.$store.state.apiInternalError)}
                )
        },

        // Creates a new challenge
        async createTutorial() {

            const data = {
                id: this.tutorialId,
                name: this.challengeName,
                challenge_category_id: this.categoryId,
                user_id: this.user.id,
                french_description: this.tutorialDescription, 
                french_description: this.tutorialDescription, 
                tutorial_partner: this.partnerName,
                tutorial_partner_link: this.tutorialPartnerLink,
                teams_ids: [this.teamId],
                bf_path: this.tutorialFileName,
                challenge_id: this.challengeId
            }

            // Dispatches the request to create a tutorial
            this.$store.dispatch('createTutorial', data)
                .catch((err) => {
                    this.$swal(this.$store.state.apiInternalError)
                })
        },

        filterGames() {
            if(!parseInt(this.gameChoice)) {
                this.onlyBestFootballChallenges = this.challenges.filter(challenge=> !challenge.team_id && challenge.challenge_category_id === this.categoryId)
                this.challengeIdToUse = this.onlyBestFootballChallenges[0].id
                this.giftChoice = "0"
            }
        },
        

        updateTutorialFields() {
            if(this.tutorialChoice === 'none') {
                this.tutorialVideoLink = ''
                this.tutorialId = ''
                this.tutorialFileName = ''
            } else if(this.tutorialChoice === 'link') {
                this.tutorialId = ''
                this.tutorialFileName = ''                
            } else {
                this.updateDropzone(false)
                this.tutorialVideoLink = ''
            }
        },

        updateDropzone(value) {

            this.gameUpload = value

            if(value === true) {
                $('#dropzone')[0].dropzone.options.url = process.env.VUE_APP_API_URL + `/trainings/challenges/upload/`
            } else {
                $('#dropzone')[0].dropzone.options.url = process.env.VUE_APP_API_URL + `/trainings/tutorials/upload/`
            }
        },

        updateGiftChoice(e) {
            
            if(e.target.value !== '1') {
                this.challengeCoachReward = ""
            } 

            this.virtualMoneyGiven = e.target.value === '2' ? true : false
        },

        setVideoInfos(file, response) {

            if(this.gameUpload) {
                this.challengeId = response.id
                this.gameFileName = response.bf_path
            } else {
                this.tutorialId = response.id
                this.tutorialFileName = response.bf_path
            }
        },  

        saveFile() {
            this.$swal(this.$t('videoUploaded'))
        },

        removeFile: function (file, response) {
            if(!this.videoSent) { 
            // This check is necessary because the remove is triggered weirdly by dropzone even if we do not click to the remove button
 
                if(this.gameUpload) {
                    this.$store.dispatch("deleteGame", {
                        videoId: this.challengeId,
                    }) 
                } else {
                    this.$store.dispatch("deleteTutorial", {
                        videoId: this.tutorialId,
                    }) 
                }                
            }
        }, 
        
        // Used to trigger the validation process 
        setFieldValue(value, field) {
            this.$v[field].$touch()            
        },         
    }
};
</script>

<style scoped>
.visuals_header_mobile {
  margin-top: 20px !important;
  margin-bottom: -40px !important;
}

.les_paliers_div {
  margin-top: 56px;
  margin-bottom: 40px;
  border-radius: 10px;
  width: 98%;
  float: none !important;
  text-align: center;
  position: relative;
  -webkit-box-shadow: none !important;
  -moz-box-shadow: none !important;
  box-shadow: none !important;
}

.les_paliers_circle {
  border: 6px solid #3fb389;
  width: 125px;
  height: 125px;
  padding: 45px 0px;
  border-radius: 100%;
}

.exercise_form_inputs {
  border-right: none !important;
  border-top: none !important;
  border-left: none !important;
  border-radius: 0px !important;
  margin-bottom: 25px !important;
  outline: none !important;
}

input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none !important;
}
/* input:focus {
                outline:none;
            } */
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
  font-size: 12px;
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
    background: #f1f1f1;
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
.form_row {
  margin-left: 30px;
}
.visuals_header_mobile {
  display: none !important;
}
.visuals_icons_mobile {
  display: none !important;
}
@media screen and (max-width: 500px) {
  .form_row {
    margin-left: -30px;
  }
  .visuals_div_mobile {
    display: none !important;
  }
  .visuals_header_mobile {
    display: block !important;
  }
  .visuals_icons_mobile {
    display: block !important;
  }
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
