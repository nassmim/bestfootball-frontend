<template>
<!-- The user gets to that page when he tries to activate his account, either by coming
from the verification link in the email sent to him or directly from social networks
So far (but will change later) his account will be automatically activated if he's a player 
-->

    <div>

        <div class="container mt-30 mb-30">
            <center>
                <div class="col-md-6">
                    <div class="card">
                        <div class="card-header text-center">
                        <span style="font-weight:600;">{{$t('accountVerification')}}</span>
                        </div>

                        <div class="card-body text-center">
                            <div v-if="accountActivated">
                                <div class="alert alert-success" role="alert">
                                {{$t('congratsAccountActivated')}}
                                </div>
                                <router-link
                                style="color: #fff; background-color: #3fb389; border-color: #3fb389;"
                                class="btn btn-success"
                                :to="{name: 'Login'}"
                                >
                                {{$t('loginYourself')}}
                                </router-link >
                            </div>
                            <div v-else>
                                <div class="alert alert-danger" role="alert">
                                    {{$t('errorAccountActivated')}} {{$t('apiErrorContactUsMessage')}} 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </div>
    </div>
</template>

<script>

import { mapState, mapMutations } from "vuex";

export default {
    name: 'Activate',

    data() {
        return {
            accountActivated: true
        }
    },

    computed: {
        ...mapState({
            user: state => state.user.data,
        }),
    },

  // Activates the user's account
    created() {

        /* We set it to true
        either because the user a player and we automatically activate their accounts without verification
        or he's not a player but we assume the activation process (cf below) will go well
        */
        this.accountActivated = true

        const username = encodeURIComponent(this.$route.params.username + this.$route.hash);

        const user_info = {
            username: username,
            mentorship: this.$route.params.mentorship,
        };
        
        if(!this.user || !this.user.activated) {
        // The account is not yet considered as activated in the front side
            this.$store.dispatch("activateUser", user_info)

                .then(response => {
                    if(response.data.user) {
                    // The user has well been received in the response, we can persist his role so that we display the adequate pages to him
                        this.updateUserRole(response.data.user.roles)
                    } 
                })
                .catch(error => {
                // The activation process did not go well, we set the variable to false so that we display a warning message
                    this.accountActivated = false
                })
        } 
    },

    methods: {

        ...mapMutations(
            {
                updateUserRole: 'USER_UPDATE_ROLE'
            }
        )        
    }
};
</script>
