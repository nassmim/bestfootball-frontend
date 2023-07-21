<template>

<!-- Component where the user can edit his profile information -->

    <div class="rs-single-team sec-bg pt-100 md-pt-80 md-pb-80">
        <div class="container">
            <div class="row pb-80 md-pb-80">
                <div class="col-lg-4 md-mb-50">
                    <div class="player-image">
                        <img 
                            :src="player.avatar ? `/upload/images/users/${player.avatar}` : '/images/users/avatar.png'"
                            style="height: 400px !important; width: 500px !important;"
                        />
                        <div class="name-box">
                            <h3 class="player-name">{{ user.username }}</h3>
                            <template v-if="player.club">
                                <span class="player-position">{{$tc('player')}}</span>
                                <span class="club">{{ player.club.name }}</span>
                            </template>

                            <div class="form-group">
                                <UploadComponent
                                    ref="UploadComponent"
                                    :title="$options.filters.capitalizeText($t('upload')) + ' ' + $tc('yourFeminine') + ' ' +  $tc('picture')"
                                    :hideSaveButton="true"
                                    :scoreNeeded="false" 
                                    :dropzoneInitialOptions="dropzoneInitialOptions"
                                    @file-being-sent="addRequestParams"
                                    @file-uploaded="changeAvatar"
                                />
                                <label
                                    style="font-size: 14px; font-weight:600; color:#3FB389; background:#FFE18C !important;"
                                    id="label_for_upload"
                                    class="btn btn-default btn-lg mt-10"
                                    data-toggle="modal"
                                    data-target="#upload_modal"                                    
                                > 
                                <i style="color:#3FB389;" class="fa fa-camera mr-2"></i>
                                    {{$t('changeAvatar')}}
                                </label>
                                <p style="color:#197B30; text-align:center;" id="selected_img"></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-8 pl-35 md-pl-15">
                    <div class="player-detail mb-50">
                        <h3 class="title">{{$tc('myMasculine') | capitalizeText}} {{$tc('profile')}} </h3>

                        <div id="rs-my-account" class="rs-my-account">

                            <div class="row pb-30 md-pb-72">
                                <div class="col-lg-3"></div>
                                <div class="col-lg-12 md-mb-70">
                                    <div class="regi-side">
                                        <form class="register-form" id="register-form" @submit.prevent="updateProfile">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <label class="input-label">
                                                        {{$t('username') | capitalizeText}}
                                                        <span class="req">*</span>
                                                    </label>
                                                    
                                                    <input 
                                                        class="custom-placeholder"
                                                        type="text"
                                                        name="username"
                                                        v-model.trim="form.username"
                                                        @input="$v.form.username.$reset"
                                                        @blur="setFieldValue($event.target.value, 'username')"
                                                    />
                                                    <template v-if="$v.form.username.$error">
                                                        <label class="input-label">
                                                            <span v-if="!$v.form.username.required" class="req">{{$t('fieldRequired')}}</span>
                                                            <span v-if="!$v.form.username.nameNotTaken" class="req">{{$t('nameAlreadyTaken')}}</span>
                                                        </label>
                                                    </template>                                                    
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="input-label">
                                                        {{$t('birthdate') | capitalizeText}}
                                                        <span class="req">*</span>
                                                    </label>
                                                    <input
                                                        class="custom-placeholder"
                                                        type="date"
                                                        name="date"
                                                        v-model="form.birthdate"
                                                        @input="$v.form.birthdate.$reset"
                                                        @blur="setFieldValue($event.target.value, 'birthdate')"
                                                    />
                                                    <template v-if="$v.form.birthdate.$error">
                                                        <label class="input-label">
                                                            <span v-if="!$v.form.birthdate.required" class="req">{{$t('fieldRequired')}}</span>
                                                        </label>
                                                    </template>                                                    
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="input-label">
                                                        {{$t('gender') | capitalizeText}}
                                                    </label>
                                                    <select class="custom-placeholder" v-model="form.gender">
                                                        <option :selected="form.gender == 'M' ? 'selected' : ''" value="M">{{$tc("male")}}</option>
                                                        <option :selected="form.gender == 'F' ? 'selected' : ''" value="F">{{$tc("female")}}</option>
                                                    </select>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="input-label">
                                                        Instagram
                                                    </label>
                                                    <input
                                                        class="custom-placeholder"
                                                        type="text"
                                                        name="instagram"
                                                        v-model="form.instagram_name"
                                                    />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="input-label">
                                                        Snapchat
                                                    </label>
                                                    <input
                                                        class="custom-placeholder"
                                                        type="text"
                                                        name="Snapchat"
                                                        v-model="form.snapchat_name"
                                                    />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="input-label">
                                                        Facebook
                                                    </label>
                                                    <input
                                                        class="custom-placeholder"
                                                        type="text"
                                                        name="facebook"
                                                        v-model="form.facebook_name"
                                                    />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="input-label">
                                                        Youtube
                                                    </label>
                                                    <input
                                                        class="custom-placeholder"
                                                        type="text"
                                                        name="youtube"
                                                        v-model="form.youtube_name"
                                                    />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="input-label">
                                                        Tik Tok
                                                    </label>
                                                    <input
                                                        class="custom-placeholder"
                                                        type="text"
                                                        name="tiktok"
                                                        v-model="form.tiktok_name"
                                                    />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="input-label">
                                                        {{$tc('club') | capitalizeText}}
                                                    </label>
                                                    <input
                                                        class="custom-placeholder"
                                                        type="text"
                                                        name="clubname"
                                                        v-model="form.club"
                                                        @focus="model = true"
                                                    />
                                                    <div v-if="model && form.club" >
                                                    <ul class="list-group list-group-flush">
                                                        <li
                                                            class="list-group-item username_sug"
                                                            v-for="(club, index) in filteredClubs"
                                                            :key="index"
                                                            @click.prevent="form.club = club;model = false"
                                                        >
                                                        {{ club }}
                                                        </li>
                                                    </ul>
                                                    </div>                                                     
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="input-label">
                                                        {{$tc('category') | capitalizeText}}
                                                    </label>
                                                    <select
                                                        class="custom-placeholder"
                                                        name="categorie"
                                                        v-model="form.category_id"
                                                    >
                                                        <option  v-for="category in playerCharacteristics.categories"
                                                            :key="category.id" 
                                                            :value="category.id" 
                                                            :selected="form.category_id == category.id ? 'selected' : ''"
                                                        >
                                                            {{category.name}} 
                                                        </option>
                                                    </select>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="input-label">
                                                        {{$tc('position') | capitalizeText}}
                                                    </label>
                                                    <select
                                                        class="custom-placeholder"
                                                        name="position"
                                                        v-model="form.position_id"
                                                    >
                                                        <option  v-for="position in playerCharacteristics.positions"
                                                            :key="position.id" 
                                                            :value="position.id" 
                                                            :selected="form.position_id == position.id ? 'selected' : ''"
                                                        >
                                                            {{position.name}} 
                                                        </option>                                                    
                                                    </select>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="input-label">
                                                        {{$t('preferredFoot') | capitalizeText}}
                                                    </label>
                                                    <select
                                                        class="custom-placeholder"
                                                        name="pied_preferere"
                                                        v-model="form.preferred_foot_id"
                                                    >
                                                        <option  v-for="foot in playerCharacteristics.foots"
                                                            :key="foot.id" 
                                                            :value="foot.id" 
                                                            :selected="form.preferred_foot_id == foot.id ? 'selected' : ''"
                                                        >
                                                            {{foot.name}} 
                                                        </option> 
                                                    </select>
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="input-label">
                                                        {{$t('phoneNumber') | capitalizeText}}
                                                    </label>
                                                    <vue-tel-input
                                                        @onValidate="validatePhoneNumber"
                                                        :defaultCountry="'fr'"
                                                        v-model.trim="form.phone_number"
                                                        @input="$v.form.phone_number.$reset"
                                                        @blur="setFieldValue(undefined, 'phone_number')"
                                                    />
                                                    <template v-if="$v.form.phone_number.$error">
                                                        <label class="input-label">
                                                            <span v-if="$v.form.phone_number.$model && !$v.form.phone_number.validPhoneNumber" class="req">{{$t('phoneNumberWarning')}}</span>
                                                        </label>
                                                    </template>                                                     
                                                </div>                                                
                                                <div class="col-md-6">
                                                    <label class="input-label">
                                                        {{$t('address') | capitalizeText}}
                                                    </label>
                                                    <input
                                                        class="custom-placeholder"
                                                        type="text"
                                                        name="address"
                                                        v-model="form.address"
                                                    />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="input-label">
                                                        {{$t('city') | capitalizeText}}
                                                    </label>
                                                    <input
                                                        class="custom-placeholder"
                                                        type="text"
                                                        name="ville"
                                                        v-model.trim="form.city"
                                                    />
                                                </div>
                                                <div class="col-md-6">
                                                    <label class="input-label">
                                                        {{$t('country') | capitalizeText}}
                                                    </label>
                                                    <select class="custom-placeholder" name="pays" v-model="form.country">
                                                        <option v-for="country in countries" 
                                                            :key="country.id" 
                                                            :value="country.name" 
                                                            :selected="form.country == country.name ? 'selected' : 'France'"
                                                        >
                                                            {{country.name}}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="submit-btn">
                                                <button class="readon" type="submit">{{$t('Iconfirm')}}</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="col-lg-3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Vue from 'vue'
import { mapState, mapActions, mapMutations } from "vuex";
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import VueTelInput from 'vue-tel-input'

Vue.use(VueTelInput)
 
import UploadComponent from "../all/Upload"

export default {

    name: "Profile",
    
    components: { UploadComponent },

    mixins: [validationMixin],

    data() {
        return {
            form: {},
            model: false,
            isValidPhoneNumber: true,
            dropzoneIsVisible: false,
            dropzoneInitialOptions: {
                url: `/user/upload/avatar`,
                method: 'put',
                maxFiles: 1,
                maxFilesize: 20,
                timeout: 3600000,
                dictFileTooBig: this.$t('dropzoneDictFileTooBig'),        
                thumbnailWidth: 100,
                dictDefaultMessage: `<i style="color:#3FB389;" class="fa fa-upload mr-2"/> ${this.$options.filters.capitalizeText(this.$t('upload'))}`,
                destroyDropzone: true,
                acceptedFiles: 'image/*, .jpeg, .jpg, .png, .tiff, .tif, .bmp, .gif, .eps, .raw, .cr2, .nef, .orf, .sr2',
                capture: 'environment',  
                dictCancelUpload: this.$t('cancelUpload'),
                dictRemoveFile: this.$t('cancelUpload')
            },         
        };
    },
    
    computed: {
        ...mapState({
            user: (state) => state.user.data,
            isConnected: state => state.user.isConnected,
            users: (state) => state.general.users,
            clubs: (state) => state.general.clubs,
            playerCharacteristics: (state) => state.general.playerCharacteristics,
            countries: (state) => state.general.countries,
        }),

        player() {
            return this.user ? this.user.player : {}
        },

        usersNames() {
            // Gets the users' usernames in lowercase among the users who are either players or coaches
            const [role, isRegistered, keepName] = [undefined, undefined, false]
            return this.$store.getters.usersNames(role, isRegistered, keepName)            
        }, 

        clubsNames() { 
            return this.$store.getters.usersNames(this.$store.state.rolesNames.club, undefined, true)
        },

        filteredClubs() {
            if(this.clubsNames) {
                return this.clubsNames.filter(name=> name.toLowerCase().indexOf(this.form.club.toLowerCase()) > - 1)
            }      
        },
    },

    validations: {

        form: {

            username: {
                required,
                nameNotTaken: function(username) {
                    // Ok if the chosen username is the user's one or if no existing users already have the chosen username 
                    return this.user.username === username || !this.usersNames.includes(username.toLowerCase().replace(/\s+/g,'')) 
                }
            },  

            birthdate: { required },

            phone_number: {
                validPhoneNumber: function() {
                    return this.isValidPhoneNumber
                }
            }
        }
    },

    created() {

        // These lines get the lists (like the users registered in the app) if they are not yet stored in the state
        this.checkAndGetData(this.users, this.getUsers, this.updateUsers)
        this.checkAndGetData(this.clubs, this.getClubs, this.updateClubs)
        this.checkAndGetData(this.countries, this.getCountries, this.updateCountries)
        // Gets the players' characteristics possible values like the position, the age category etc.
        this.getPlayerCharacteristics()
    },

    mounted() {

        // Initiates the form that will be displayed with the user's info we already have about him
        this.form = {
            user_id: this.user.id,
            username: this.user.username,
            phone_number: this.user.phone_number ? this.user.phone_number : '0698XXXXXX',
            address: this.user.address.address_1,
            city: this.user.address.city.name,
            country: this.user.address.city.country.name,
            roles: this.user.roles,
            ...this.player
        }

        // If kept, it will generate a conflict within the sql query while updating the user's data 
        delete this.form.id

        // Removes all the nested objects as they won't be used to update the user's information 
        this.cleanForm()
    },

    methods: {

        ...mapActions({
            updateProfileDispatch: 'updateProfile',
            getUsers: 'getUsers',
            getPlayerCharacteristicsDispatch: 'getPlayerCharacteristics',
            getClubs: 'getClubs',
            getCountries: 'getCountries'
        }),

        ...mapMutations({
            updateUser: 'USER_UPDATE_DATA',
            updateUsers: 'USERS_LIST_UPDATE',
            updateClubs: 'CLUBS_LIST_UPDATE',
            updatePlayerCharacteristics: 'PLAYERS_CHARACTERISTICS_UPDATE',
            updateCountries: 'COUNTRIES_LIST_UPDATE',
        }),

        // Updates the user's information in the db and in the state 
        async updateProfile() {

            if(this.$v.$invalid) {
            // The form has not been filled correctly
                this.$v.form.$touch()
                return 
            }

            // Dispatches the action to run the api request to update the user's information
            const response = await this.updateProfileDispatch(this.form)
                .catch(() => {
                    this.$swal(this.$store.state.apiInternalError)
                    throw new Error()
                })

            // Updates the state with the new user's information
            this.updateUser(response.data)
            this.$swal(this.$i18n.t('actionSuccessMessage'))
        },

        // Checks if the state data already exists, if not it fetches it 
        async checkAndGetData(stateData, actionToGetData, actionToUpdateData) {

            if(!stateData.length) {
            // There is no data stored in the state, we call the api
                const response = await actionToGetData().catch(() => {throw new Error()})
                actionToUpdateData(response.data)
            }
        },

        // Gets the players' characteristics values like position, age etc.
        async getPlayerCharacteristics() {
            if(!this.playerCharacteristics.positions.length) {
            // The characteristics that define players are not yet stored, we need to get it and update the state so that we do not need to do it again later    
                const response = await this.getPlayerCharacteristicsDispatch(this.user.roles).catch(() => {throw new Error()})
                this.updatePlayerCharacteristics(response.data)
            }
        },

        // Removes the nested objects from the initial object related to the user's information
        cleanForm() {
            const formKeys = Object.keys(this.form)
            for(let key of formKeys) {
                if(this.form[key] && this.form[key].constructor === Object) {
                    delete this.form[key]
                }
            }
        },

        // Used to trigger the validation process 
        setFieldValue(value, field) {
            this.$v['form'][field].$touch()            
        }, 

        // Indicates if the phone number format is correct or not
        validatePhoneNumber({ isValid }) {
            this.isValidPhoneNumber = isValid
        },
        
        // Once the dropzone starts uploading the file to the server, we add the user's id to the req body request
        addRequestParams(file, xhr, formData) {
            formData.append('userId', this.user.id)
        }, 
        
        changeAvatar(file, response) {
            const data = {
                player: {
                    ...this.player,
                    avatar: response
                }
            }
            this.updateUser(data)
        },   
    },
};
</script>

<style scoped>

.list-group {
    max-height: 200px;
    overflow-y: overlay;
}

    .readon {
        background-image: linear-gradient(to right, #56d0a6 0%, #3fb389 51%, #82d5b9 100%);
        color: #fff !important;
        border: none;
        padding: 15px 35px 13px;
        display: inline-block;
        position: relative;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        border-radius: 4px;
        text-transform: uppercase;
        background-size: 200% auto;
        outline: none;
        box-shadow: unset;
        cursor: pointer;
        transition: all 0.3s ease 0s;
    }
    .rs-single-team .player-image .name-box {
    background: #ffffff;
    padding: 31px 31px 35px 37px;
    position: relative;
    border-top: 2px solid #555;
    margin-top: -20px !important;
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
