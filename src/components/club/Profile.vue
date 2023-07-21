<template>

<!-- Component where the user can edit his profile information -->

    <div class="rs-single-team sec-bg pt-100 md-pt-80 md-pb-80">
        <div class="container">
            <div class="row pb-80 md-pb-80">
                <div class="col-lg-4 md-mb-50">
                    <div class="player-image">
                        <img 
                            :src="profile.avatar ? `/upload/images/users/${profile.avatar}` : '/images/users/avatar.png'"
                            style="height: 400px !important; width: 500px !important;"
                        />
                        <div class="name-box">

                            <div class="form-group">
                                <UploadComponent
                                    ref="UploadComponent"
                                    :title="$options.filters.capitalizeText($t('upload')) + ' ' + $tc('myFeminine') + ' ' +  $tc('picture')"
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
                                                            <span v-if="!$v.form.phone_number.required" class="req">{{$t('fieldRequired')}}</span>
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
            countries: (state) => state.general.countries,
        }),

        profile() {
            return this.user ? this.user.club : {}
        },
    },

    validations: {

        form: {

            phone_number: {
                required,
                validPhoneNumber: function() {
                    return this.isValidPhoneNumber
                }
            }
        }
    },

    created() {
        // These lines get the lists, for now only the countries
        this.checkAndGetData(this.countries, this.getCountries, this.updateCountries)
    },

    mounted() {

        // Initiates the form that will be displayed with the user's info we already have about him
        this.form = {
            user_id: this.user.id,
            phone_number: this.user.phone_number ? this.user.phone_number : '0698XXXXXX',
            address: this.user.address.address_1,
            city: this.user.address.city.name,
            country: this.user.address.city.country.name,
            roles: this.user.roles,
            ...this.profile
        }

        // If kept, it will generate a conflict within the sql query while updating the user's data 
        delete this.form.id

        // Removes all the nested objects as they won't be used to update the user's information 
        this.cleanForm()
    },

    methods: {

        ...mapActions({
            updateProfileDispatch: 'updateProfile',
            getCountries: 'getCountries'
        }),

        ...mapMutations({
            updateUser: 'USER_UPDATE_DATA',
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
                club: {
                    ...this.profile,
                    avatar: response
                }
            }
            this.updateUser(data)
        },   
    },
};
</script>

<style scoped>
.rs-single-team .player-image .name-box {
  background: #ffffff;
  padding: 31px 31px 35px 37px;
  position: relative;
  border-top: 2px solid #555;
  margin-top: -20px !important;
}
</style>
