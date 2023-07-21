<template>

<!-- Component to add or to change a team -->

    <div
        class="modal fade"
        id="removal_modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div style="background: #f7f7f7" class="modal-content">

                <div style="border-bottom: none !important" class="modal-header">
                    <img
                        style="border: 2px solid #3fb389; border-radius: 50px"
                        class="mr-2"
                        src="/images/icons/bestfootball-How-it-works-green.png"
                        alt=""
                        width="30"
                        height="30"
                    />
                    <h6 style="color: #3fb389" class="modal-title"> 
                        {{user.player  ? $t('leaveTeam') : $t('removeTeam') }}
                     </h6>
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
                        <p>
                            {{user.coach || user.club ? $t('removeTeamWarning') : $t('leaveTeamWarning')}} 
                            <span class="del-team-name"></span> ?
                        </p>
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
                        {{$t('no').toUpperCase()}}
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
                        type="button"
                        class="btn btn-success"
                        @click="user.player ? leaveTeam() : deleteTeam()"
                    >
                        {{$t('yes').toUpperCase()}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    
    name: 'DeleteTeam',

    props: ['team'],

    computed: {

        user() {
            return this.$store.state.user.data
        }
    },

    methods: {
        
        // Removes the team from the db
		deleteTeam() {
            
            // If the user is a club, we get the club id as there will be additional steps in the backend like decreasing the number of players to pay for
            const clubId = this.user.club ? this.user.club.id : '' 

            const data = {
                teamId: this.team.id,
                clubId: clubId 
            }

            // Dispatches the action to delete the team and emits the event to the parent component once we get back response from the api
            this.$store.dispatch('deleteTeam', data)
                .then(() => {
                    this.$emit('team-removed')
                    $("#removal_modal").modal("hide")
                })
                .catch(() => this.$swal(this.$store.state.apiInternalError))
		},

        // The user wants to leave the team
        leaveTeam() {
            
            const data = {
                userId: this.user.id,
                teamId: this.team.id
            }

            this.$store.dispatch('removeTeamPlayer', data)
                .then(() => {
                    this.$emit('team-removed')
                    $("#removal_modal").modal("hide")
                })
        }   
    }
}
</script>