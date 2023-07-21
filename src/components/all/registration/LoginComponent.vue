<template>
  <!-- This component is where the user logs in -->
    <div id="rs-my-account" class="rs-my-account pt-100 md-pb-80 md-pt-80">
        <div class="container">
            <div class="row pb-100 md-pb-72">
                <div class="col-lg-3"></div>
                    <div class="col-lg-6">
                        <div class="login-side">
                            <div class="container login_container">
                                <div class="sec-title">
                                    <h2 class="title">{{$t('toLogin')}}</h2>
                                </div>

                                <form id="login-form" class="login-form">
                                    <label class="input-label">
                                        <span v-if="loginErrorMessage" class="req">{{loginErrorMessage}}</span>
                                    </label>    

                                    <div class="form-group">
                                        <label class="input-label">
                                            {{$t('emailAddress')  | capitalizeText}} / {{$t('username') | capitalizeText}}
                                            <span>*</span>
                                        </label>
                                        <input
                                            class="input-control"
                                            type="text"
                                            id="identifier"
                                            name="identifier"
                                            v-model.trim="$v.form.identifier.$model"
                                            :placeholder="$t('emailOrUsernamePlaceholder')"
                                        />
                                        <template v-if="$v.form.identifier.$error">
                                            <label class="input-label">
                                                <span v-if="!$v.form.identifier.required" class="req">{{$t('fieldRequired')}}</span>
                                            </label>
                                        </template> 
                                    </div>

                                    <div class="form-group">
                                        <label class="input-label">
                                            {{$t('password') | capitalizeText}}
                                            <span>*</span>
                                        </label>
                                        <input
                                            class="input-control"
                                            type="password"
                                            id="password"
                                            name="password"
                                            v-model="$v.form.password.$model"
                                        />
                                        <template v-if="$v.form.password.$error">
                                            <label class="input-label">
                                                <span v-if="!$v.form.password.required" class="req">{{$t('fieldRequired')}}</span>
                                            </label>
                                        </template> 
                                    </div>

                                    <div class="login-control">
                                        <ul>
                                        <li>
                                            <button type="submit" @click.prevent="emailLogin" class="readon">{{$t('localLogin')}}!</button>
                                        </li>
                                        <!-- <li>
                                            <label class="checkbox">
                                            <input type="checkbox" name="Remember" />
                                            Remember me
                                            </label>
                                        </li> -->
                                        </ul>
                                    </div>
                                    <router-link class="psw-recover" :to="{name: 'ForgottenPassword'}">{{$t('forgottenPassword')}}?</router-link>

                                    <center>
                                        <p style="margin:0px 0px 3px !important;"><b>{{$t('socialSigninTitle')}}:</b></p>
                                        <div
                                class="btn-group text-center"
                                role="group"
                                aria-label="Basic example"
                              >
                                <button
                                  type="button"
                                  class="btn btn-primary"
                                  @click="socialLogin('facebook')"
                                >
                                  <i
                                    style="color:white;"
                                    class="fa fa-facebook"
                                  ></i>
                                  {{$t('facebookConnexion')}}
                                </button>
                                <button
                                  type="button"
                                  class="btn btn-danger"
                                  @click="socialLogin('google')"
                                >
                                  <i
                                    style="color:white;"
                                    class="fa fa-google"
                                  ></i>
                                  {{$t('googleConnexion')}}
                                </button>
                              </div>
                                    </center>                             
                                </form>
                            </div>
                        </div>
                    </div>
                <div class="col-lg-3"></div>
            </div>
        </div>
    </div>
  <!-- Account Login End -->
</template>

<script>

import { mapState, mapMutations } from "vuex";

import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {

    name: "LoginComponent",

    data: () => {
        return {
            form: {
                identifier: "",
                password: "",
            },
            loginErrorMessage: "",
        };
    },

    computed: {
        ...mapState({
            user: state => state.user.data,
            isConnected: state => state.user.isConnected,
        }),
    },

    mixins: [validationMixin],

    validations: {

        form: {
            identifier: {
                required,
            },

            password: {
                required
            },         
        },
    },

    mounted() {
        
        /* If the users connects himself from social networks, a new window will be opened
        Once the connexion succeeds, the user is brought back to this screen, we need to reload it
        so that it 
        */
        window.addEventListener('storage', (event)=> {
            if (event.key === this.$store.state.vuexLocalStorage) {
                document.location.reload(false) 
            }
        });  
    },

    destroyed() {
        window.removeEventListener('storage', e => {})
    },

    methods: {

        ...mapMutations(
            {
                updateUserData: 'USER_UPDATE_DATA', 
                updateUserToken: 'USER_UPDATE_TOKEN',                
                updateUserConnected: 'USER_UPDATE_CONNECTED',
                updateUserRole: 'USER_UPDATE_ROLE',
                updateTeamFeatures: 'TEAM_FEATURES_VISIBLE_UPDATE'
            }
        ),

        // Authenticating the user
        emailLogin() {

            if(this.$v.$invalid) {
            // The form has not been filled correctly
                this.$v.form.$touch()
                return 
            }

            const credentials = {
                identifier: this.form.identifier,
                password: this.form.password,
            }

            this.$store.dispatch("emailLogin", credentials)

                .then(response => {

                    if (response.data.user) {
                    // The api has well sent back the user object that we wanted, he will be redirected to his profile page
                        const user = response.data.user
                        const roleName = this.$options.filters.capitalizeText(this.$options.filters.getRoleName(user.roles))    

                        // Saves the user's information in the state
                        this.updateStore(user)

                        if(this.user.roles !== this.$store.state.rolesNames.player) {
                        // The user is either a coach or a club, so we will have access to the features related to teams management
                            this.updateTeamFeatures(true)
                        }

                        // Redirects the user to the correct page
                        this.redirectUser(user, roleName)

                    } else {
                    // The api went well but an error message has been sent back; it is most likely due due to the credentials
                        this.loginErrorMessage = this.selectErrorsMessage(response.data)
                    }
                })

                .catch(error => {
                // The api call did not work properly
                    console.log(error)
                    this.$swal(this.$store.state.apiInternalError)
                })
        },

        // Registering a user using social platforms info
        socialLogin(provider) {
            window.open(`${process.env.VUE_APP_API_URL}/${this.$store.state.userURL}/socialauthentication/${provider}/start/undefined`)
        }, 

        // Updates the main user's caracteristics in the store
        updateStore(user) {
            this.updateUserData(user)
            this.updateUserToken(user.token)
            this.updateUserConnected(true)
            this.updateUserRole(user.roles)
        },

        redirectUser(user, roleName) {

            if(user.coach && user.coach.initial_password === user.password) {
            /* If this is a coach added by a club, he will have a random password
            for his first connexion. We check here if he has changed it yet,
            if not we ask him again to do it
            */
                this.$router.push({name: 'Account'})
            } else {
                this.$router.push({ name: 'Home', params: {
                    username: user.username
                } })
            }
        },

        // Defines the error message to display depending on login api response   
        selectErrorsMessage(data) {

            switch(data) {

                case 1:
                    return this.$t('wrongPasswordLogin')
                    break

                case 2:
                    return this.$t('confirmEmailLogin')
                    break

                case 3:
                    return this.$t('noAccountLogin')
                    break    
            }
        },
    },
};
</script>

<style scoped>
/* Smartphone (portrait and landscape) ----------- */
@media only screen and (min-width : 320px) and (max-width : 700px) {
    .login_container{
        padding:40px;
        margin-top: 90px;
    }
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-width : 768px) and (max-width : 1024px) {
   .login_container{
        padding:40px;
        margin-top: 90px;
    } 
}
.readon {
    background-image: linear-gradient(to right, #56d0a6 0%, #3fb389 51%, #82d5b9 100%);
    color: #fff;
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
</style>
