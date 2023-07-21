<template>

  <!-- Component where the user can edit his account information -->
  
    <div id="rs-my-account" class="rs-my-account pt-100 md-pb-80 md-pt-80">
        <div class="container">
            <div class="row pb-100 md-pb-72">
                <div class="col-lg-3"></div>
                <div class="col-lg-6">
                    <div class="login-side full-white">
                        <div class="sec-title">
                            <h2 class="title">{{$tc('myMasculine') | capitalizeText}} {{$tc('account')}}</h2>
                        </div>
                        <form
                            class="login-form"
                            id="login-form"
                            @submit.prevent="updateAccount"
                        >
                            <label class="input-label">{{$t('lastName')}}
                            </label>
                            <input
                                class="input-control"
                                type="text"
                                name="last_name"
                                v-model="mainForm.last_name"
                            />
                            <label class="input-label"
                                >
                                {{$t('firstName')}} 
                            </label
                            >
                            <input
                                class="input-control"
                                type="text"
                                name="first_name"
                                v-model="mainForm.first_name"
                            />
                            <label class="input-label"
                                >
                                {{$t('emailAddress') | capitalizeText}}
                            </label
                            >
                            <input
                                class="input-control"
                                type="email"
                                name="email"
                                v-model.trim="mainForm.email"
                                @input="$v.mainForm.email.$reset"
                                @blur="$v.mainForm.email.$touch()"                                
                            />
                            <template v-if="$v.mainForm.email.$error">
                                <label class="input-label">
                                    <span v-if="!$v.mainForm.email.required" class="req">{{$t('fieldRequired')}}</span>
                                    <span v-if="!$v.mainForm.email.email" class="req">{{$t('emailNotValid')}}</span>
                                </label>
                            </template>                            
                            <div class="submit-btn">
                                <button class="readon" type="submit">
                                    {{$t('Iconfirm')}}
                                </button>
                            </div>
                        </form>
                    </div>

                    <div class="regi-side">
                        <div class="sec-title">
                            <h2 class="title">{{$t('newPassword') | capitalizeText}}</h2>
                        </div>
                        <form
                            class="register-form"
                            id="register-form"
                            @submit.prevent="updatePassword"
                        >
                            <label class="input-label"
                                >{{$t('password') | capitalizeText}}
                            </label
                            >
                            <input
                                class="custom-placeholder"
                                type="password"
                                name="password"
                                v-model="passwordForm.password"
                            />
                            <label class="input-label"
                                >{{$t('passwordConfirm')}}
                            </label
                            >
                            <input
                                class="custom-placeholder"
                                type="password"
                                name="passwordRepeat"
                                v-model="$v.passwordForm.passwordRepeat.$model"
                                @blur="$v.passwordForm.passwordRepeat.$touch()"                                
                            />
                            <template v-if="$v.passwordForm.passwordRepeat.$error">
                                <label class="input-label">
                                    <span v-if="!$v.passwordForm.passwordRepeat.sameAsPassword" class="req">{{$t('notIdenticalPasswords')}}</span>
                                </label>
                            </template>                             
                            <div class="submit-btn">
                                <button class="readon" type="submit">{{$t('Iconfirm')}}</button>
                            </div>
                        </form>
                    </div>

                    <div class="regi-side">
                        <button class="btn btn-danger" data-toggle="modal" data-target="#delete_account_modal">{{$t('removeAccount')}}</button>
                    </div>


                    <div
        class="modal fade"
        id="delete_account_modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div style="background: #f7f7f7" class="modal-content">

                <form @submit.prevent="deleteAccount">

                    <div style="border-bottom: none !important" class="modal-header">
                        <img
                            class="mr-2"
                            src="/images/icons/bestfootball-How-it-works-green.png"
                            alt=""
                            width="30"
                            height="30"
                        />
                        <h6 style="color: #3fb389" class="modal-title">{{$t('confirmGift')}}</h6>
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
                         <h5>{{$t('removalConfirmation')}}</h5>
                                <div>
                                    <input 
                                        type="radio" 
                                        id="yes" 
                                        value="1"
                                        v-model="confirmValue"
                                    />
                                    <label htmlFor="yes">{{$t('yes') | capitalizeText}}</label>
                                </div>
                                <div>
                                    <input 
                                        type="radio" 
                                        id="no" 
                                        value="0"
                                        v-model="confirmValue"
                                    />
                                    <label htmlFor="no" >{{$t('no') | capitalizeText}}</label>
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
                            class="btn btn-success"
                        >
                            {{$t('confirmGiftSubmit') | capitalizeText}}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
                    <!-- END Modal Component -->

                </div>
                <div class="col-lg-3"></div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapActions, mapMutations } from "vuex";
import { validationMixin } from 'vuelidate'
import { required, email, sameAs } from 'vuelidate/lib/validators'
import routeRedirectionMixin from '../../mixins/routeRedirectionMixin';

export default {

    name: "Account",

    mixins: [routeRedirectionMixin, validationMixin],

    data() {
        return {
            mainForm: {},
            passwordForm: {
                password: '',
                passwordRepeat: ''
            },
            confirmValue: "0",
        };
    },

    computed: {

        user() {
            return this.$store.state.user.data
        },

        profile() {
            return this.user[this.$options.filters.getModel(this.user.roles)]
        },

        isConnected() {
            return this.$store.state.user.isConnected
        }
    },

    validations: {

        mainForm: {

            email: { 
                required,
                email 
            }
        },

        passwordForm: {
            passwordRepeat: {
                sameAsPassword: sameAs('password') 
            }
        }
    },

    mounted() {

        // Redirects the user to the login page if he's not yet logged in
        this.redirectToLogin(this.isConnected, this.$i18n.locale)

        // Initiates the form that will be displayed with the user's info we already have about him
        this.mainForm = {
            user_id: this.user.id,
            last_name: this.profile.last_name,
            first_name: this.profile.first_name,
            email: this.user.email,
        }
    },
        
    methods: {

        ...mapActions({
            updateAccountDispatch: 'updateAccount',
            updatePasswordDispatch: 'updatePassword',
            deleteAccountDispatch: 'deleteAccount'
        }),

        ...mapMutations({
            updateUser: 'USER_UPDATE_DATA',
            clearData: 'CLEAR_DATA'
        }),

        // Updates the user's account information in the db and stores it in the state
        updateAccount() {
            
            if(this.$v.mainForm.$invalid) {
            // The form has not been filled correctly
                this.$v.mainForm.$touch()
                return 
            }

            this.mainForm.roles = this.user.roles

            // Dispatches the action to run the api request 
            this.updateAccountDispatch(this.mainForm)
                .then(response => {

                    const newData = {
                        email: this.mainForm.email,
                        player: {
                            ...this.profile,
                            first_name: this.mainForm.first_name,
                            last_name: this.mainForm.last_name
                        }
                    }

                    // Updates the user's state
                    this.updateUser(newData)
                    this.$swal(this.$i18n.t('actionSuccessMessage'))
                })

                .catch(err => this.$swal(this.$store.state.apiInternalError))
        },

        // Updates the user's password and stores it in the stae
        updatePassword() {

            // The password cannot be empty, for simplicity we did not include this verification in the validationmixin
            if(!this.passwordForm.password) {
                return 
            }
            
            if(this.$v.passwordForm.$invalid) {
            // The form has not been filled correctly
                this.$v.passwordForm.$touch()
                return 
            }

            this.passwordForm.userId = this.user.id

            // Dispatches the action to run the api request 
            this.updatePasswordDispatch(this.passwordForm)
                .then(response => {

                    const newData = {
                        password: this.passwordForm.password,
                    }

                    // Updates the user's state
                    this.updateUser(newData)
                    this.$swal(this.$i18n.t('actionSuccessMessage'))
                })

                .catch(err => this.$swal(this.$store.state.apiInternalError))
        },

        // Deletes the user's account and clears the state
        deleteAccount() {

            if(parseInt(this.confirmValue)) {

                // Runs the api delete request
                this.deleteAccountDispatch(this.user.id)
                
                    .then(() => {
                        this.clearData()
                        this.$swal(this.$i18n.t('accountIsRemoved'))
                        $('#delete_account_modal').modal('hide')
                        this.$router.push({name: 'Home'})
                    })

                    .catch(err => this.$swal(this.$store.state.apiInternalError))

            } else {
                this.$swal(this.$i18n.t('goodDecision'))
                $('#delete_account_modal').modal('hide')
            }
        }
    },
};
</script>
<style scoped>
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
.rs-my-account .login-side, .rs-my-account .recover-psw-side {
    padding: 30px 15px;
}
.full-white {
  background: #fff !important;
}
</style>
