<template>
<!-- This page is where the user comes back after signing-up from social networks 
-->

    <div
        v-if="!role || role == 'undefined'"
        class="modal fade show"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="false"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5
                    style="color: #43b98f;"
                    class="modal-title"
                    id="exampleModalLabel"
                    >
                    {{$t('roleChoiceTitle')}}
                    </h5>
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

                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="player"
                            :value="true"
                            v-model="is_player"
                        />
                        <label class="form-check-label" for="player">
                            {{$tc('player') | capitalizeText}}
                        </label>
                    </div>

                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="coach"
                            :value="false"
                            v-model="is_player"
                            
                        />
                        <label class="form-check-label" for="_no">
                            {{$tc('coach') | capitalizeText}}
                        </label>
                    </div>

                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-success readon"
                        data-dismiss="modal"
                        @click="finishUserSocialNetworkRegistration"
                    >
                    {{$t('toContinue') | capitalizeText}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template> 



<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {

    data() {
        return {
            role: null,
            is_player: true
        }
    },

	computed: {
	    ...mapState ({
            user: state => state.user.data,
        }),
	},

	watch: {
        
        // Once the user's data has been fetched, we know who he is and we can proceed to his account activation
		user(user) {

            if(user) {

                if(!user.activated) {
                // The user's account is not yet activated, we run the action to activate it
                    this.activateUser({username: user.username, sponsorship: user.mentorship})

                        .then(response => {

                            if(response.data.user) {

                            // The user object has well been received in the response, we can now persist some of his global caracteristics and consider him as connected
                                const user = response.data.user
                                this.updateUserToken(user.token)
                                this.updateUserRole(user.roles)
                                this.updateUserConnected(true)
                            } 
                        })
                        
                        .catch(error => {
                            console.log(error)
                        })

                } else {
                    /* The user already has an activated account
                    this means he was logging in from social networks not signing-up
                    we just need to update his connexion status
                    */

                    if(user.roles !== this.$store.state.rolesNames.player) {
                    // The user is either a coach or a club, so we will have access to the features related to teams management
                        this.updateTeamFeatures(true)
                    }          

                    this.updateUserConnected(true)
                }

                window.close()
            }

		}
	},

	async created() {
        const userId = this.$route.params.id
        this.role = this.$route.params.role
        
        if(!Object.values(this.$store.state.rolesNames).includes(this.role)) {
        /* the user's role is not defined, which means he tried to sign up from the login page 
        We created the user in the db but we now need to know what type of user he want to be */
            return

        } else {
        // A role is well associated to the user, i.e. he either signed-up from the correct sign up screen or he logged in as he's already registered

            // We need to get the user data as he came from an external source, and we do not know yet who he is
            this.getUserData(userId, this.role)
        } 
    },
    
    methods: {

        ...mapActions(['getUser', 'activateUser']),

        ...mapMutations(
            {
                updateUserToken: 'USER_UPDATE_TOKEN',                
                updateUserData: 'USER_UPDATE_DATA', 
                updateUserConnected: 'USER_UPDATE_CONNECTED',
                updateUserRole: 'USER_UPDATE_ROLE',
                updateTeamFeatures: 'TEAM_FEATURES_VISIBLE_UPDATE'
            }
        ),
        
        // This gets the user's data and saves it in the store
        getUserData(userId, role) {
            
            this.getUser({identifier: userId, role: role})
                .then(response => this.updateUserData(response.data))
                .catch(error => this.$swal(this.$store.state.apiInternalError))
        },

        // Updates the user's profile now that we know which type of user he will be 
        finishUserSocialNetworkRegistration() {
            const userId = this.$route.params.id
            const roles = this.$store.state.rolesNames

            // Gets the user choice from the pop-up
            this.role = this.is_player ? roles.player : roles.coach

            this.$store.dispatch('finishUserSocialNetworkRegistration', {userId: userId, role: this.role })
                .then(response => {
                    console.log(response.data)
                    this.getUserData(userId, this.role)
                })
                .catch(error => {
                    console.log(error)
                    this.$swal(this.$store.state.apiInternalError)
                }) 
        },
    }
}

</script>



<style scoped>

</style>