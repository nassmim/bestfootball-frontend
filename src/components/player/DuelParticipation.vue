<template>

  <!-- Component where the user can upload his video to participate to a duel 
  against another user 
  -->

    <div ref="ParentDiv" class="rs-single-club pt-80">

        <div class="container">

            <div class="col-lg-6 col-md-6 col-sm-6 xs-mb-15">
                <div class="title-style pb-10 md-pb-30">
                <h2 class="margin-0 uppercase">{{$tc('duel')}}</h2>
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
                                :src="duel.userAsking.player.avatar ? `/upload/images/users/${duel.userAsking.player.avatar}` : '/images/team/5.jpg'"
                                alt="Card image cap"
                                />
                                <div
                                style="padding: 25px 20px; background:#3fb389; z-index: 5; margin-top: -80px; border-radius: 0px 0px 20px 20px;"
                                class="card-body"
                                >
                                <div style="margin-bottom: 10px;">
                                    <router-link :to="{name: 'Home', params: {username: duel.userAsking.username}}" >
                                      <span style="font-weight: 600; font-size: 20px; color: #ffffff;">{{duel.userAsking.username}}</span>
                                    </router-link>
                                    <br/>
                                    <span v-if="duel.user_asking_score" style="font-weight: 600; font-size: 20px; color: #ffffff;">{{$t('currentDuelScore')}}: {{duel.user_asking_score}}</span>
                                </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="col-lg-12 col-md-12 mt-10">
                                <div class="video_wrap">
                                    <!-- <video controls controlsList="nodownload" :src="`/upload/videos/challenges/${duel.challenge.bf_path}`"/> -->
                                    <video style="border-radius: 20px;" width="500" height="260" controls controlsList="nodownload">
                                     <source :src="`/upload/videos/challenges/${duel.challenge.bf_path}`" type="video/mp4" />
                                    </video>
                                    <div class="justify-content-center" v-if="duel.status_id===2">
                                        <a
                                            v-show="featuresEnabled"
                                            style="color: #3fb389; border: 1px solid #e0e0e0; background: #fff; padding: 8px 30px;"
                                            class="btn btn-default mt-4"
                                            data-toggle="modal"
                                            data-target="#upload_modal"
                                            @click="checkIfAllowed"
                                        >
                                            {{$tc('myFeminine') | capitalizeText}} {{$tc('video')}}
                                            <i
                                                style="border: 2px solid #3fb389; color: #3fb389; padding: 6px 7px; border-radius: 36px;"
                                                class="fa fa-upload ml-3"
                                                aria-hidden="true"
                                            ></i>
                                        </a>
                                    </div>
                                    <div v-else>
                                        <br/>
                                        <br/>
                                        <strong>{{$t('duelNotYetAccepted')}}</strong>
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
                                :src="duel.userAsked.player.avatar ? `/upload/images/users/${duel.userAsked.player.avatar}` : '/images/team/5.jpg'"
                                alt="Card image cap"
                                />
                                <div
                                style="padding: 25px 20px; background: #FCE28C; z-index: 5; margin-top: -80px; border-radius: 0px 0px 15px 15px;"
                                class="card-body"
                                >
                                <div style="margin-bottom: 10px;">
                                    <router-link :to="{name: 'Home', params: {username: duel.userAsked.username}}" >
                                            <span style="font-weight: 600; font-size: 20px; color: #3fb389;">
                                                {{duel.userAsked.username}}
                                            </span>
                                    </router-link>
                                    <span v-if="duel.user_asked_score" style="font-weight: 600; font-size: 20px; color: #3fb389;">{{$t('currentDuelScore')}}: {{duel.user_asked_score}}</span>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <UploadComponent
            ref="UploadComponent"
            :title="$options.filters.capitalizeText($t('upload')) + ' ' + $tc('yourFeminine') + ' ' +  $tc('video')"
            :scoreNeeded="true" 
            :dropzoneInitialOptions="dropzoneInitialOptions"
            @file-being-sent="addRequestParams"
            @file-saved="score => participate(score)" 
        />
    </div>
  <!-- Single Club Section End -->
</template>

<script>

import UploadComponent from "../all/Upload"
import routeRedirectionMixin from "../../mixins/routeRedirectionMixin"

export default {

    name: "DuelParticipation",

    props: ['duel'],

    mixins: [routeRedirectionMixin],

    components: {
        UploadComponent
    },

    data() {
        return {
            featuresEnabled: false,
            dropzoneInitialOptions: {
                url: `/duels/upload/`,
                method: 'put',
                maxFiles: 1,
                maxFilesize: 500,
                timeout: 3600000,
                dictFileTooBig: this.$t('dropzoneDictFileTooBig'),        
                thumbnailWidth: 200,
                addRemoveLinks: true,
                dictDefaultMessage: `<i style="color:#3FB389;" class="fa fa-upload mr-2"/> ${this.$options.filters.capitalizeText(this.$t('upload'))}`,
                destroyDropzone: true,
                acceptedFiles: 'video/*, .mp4, .mov, .avi, .wmv, .flv, .avchd, .webm, .mkv',
                capture: 'environment', 
                dictCancelUpload: this.$t('cancelUpload'),
                dictRemoveFile: this.$t('cancelUpload')
            }, 
        }
    },

    computed: {

        user() {
            return this.$store.state.user.data
        },

        isConnected() {
            return this.$store.state.user.isConnected
        },
    },

    watch: {
        duel(duel) {
            if(!this.isConnected || (this.user.id === this.duel.user_asking_id || this.user.id === this.duel.user_asked_id)) {
            /* The user is part of this duel either the one who asked or the one who accepted it, so the feature to upload the video can be enabled 
            if the user is not yet connected we still enable the feature to incentive the user to click on it and redirect him to the login screen
            */
                this.featuresEnabled = true
            }
        }
    },

    methods: {

        participate(score) {
            
            /* This attributes the score entered to the right user
                and gets back the other's user score thanks to the duel data
                it also gets the right key to use to update the user in the state once we receive the response from the backend
            */
            const data = this.attributePoints(score),
                keyToUse = data.keyToUse

            data.duel = {
                duelId: this.duel.id,
                userId: this.user.id,                
                ...data.duel
            } 

            this.$store.dispatch('participateDuel', data.duel)
                .then(response => {
                    this.$emit('duel-updated', response.data.duel)
                    this.$store.commit('USER_UPDATE_DATA', response.data[keyToUse])
                })
        },

        // Attributes the right points to the users 
        attributePoints(score) {

            /* Initially assumes the user is the one who received the request
                so the score he entered will go to the asked user score 
            */
            let [userAskedScore, userAskingScore, keyToUse] = [score, this.duel.user_asking_score, 'userAsked']

            if(this.user.id === this.duel.user_asking_id) {
            // The user is the one who sent the request, so the score he entered will go the asking user score
                userAskingScore = score
                userAskedScore = this.duel.user_asked_score    
                keyToUse = 'userAsking'            
            } 

            return {
                duel: {
                    userAskingScore: userAskingScore,
                    userAskedScore: userAskedScore
                },
                keyToUse: keyToUse
            }
        }, 

        checkIfAllowed() {
            this.redirectToLogin(this.isConnected, this.$i18n.locale)
        },
        
        // Once the dropzone starts uploading the file to the server, we add the user's id and duel id to the req body request
        addRequestParams(file, xhr, formData) {
            formData.append('duelId', this.duel.id)
            formData.append('userId', this.user.id)
        },
    }
};
</script>

<style scoped>
input[type="number"]::-webkit-inner-spin-button {
  opacity: 1;
  color: gray;
}
.play_icon {
  margin-top: -324px !important;
  border-radius: 100% !important;
  background: #3fb389 !important;
  width: 13%;
}
.footer_nav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.footer_nav li {
  font-size: 18px;
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
}

@media screen and (max-width: 500px) {
.play_icon {
  margin-top: -170px !important;
  border-radius: 100% !important;
  background: #3fb389 !important;
  width: 13%;
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
body {margin:2rem;}

.modal-dialog {
      max-width: 800px;
      margin: 30px auto;
  }

video {
  width: 100%;
  /* height: auto; */
}

.modal-body {
  position:relative;
  padding:0px;
}
.close {
  position:absolute;
  right:-30px;
  top:0;
  z-index:999;
  font-size:2rem;
  font-weight: normal;
  color:#fff;
  opacity:1;
}
.close{
    position: absolute;
    right: -40px;
    top: 0;
    z-index: 999;
    font-size: 2rem;
    font-weight: normal;
    color: #fff;
    padding: 0px 5px;
    border-radius: 25px;
    background: #3FB389;
    opacity: 1;
}
</style>