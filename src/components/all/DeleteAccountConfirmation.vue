<template>

<!-- Component to confirm a gift -->

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
                                        value="yes"
                                        v-model="confirmValue"
                                    />
                                    <label htmlFor="yes">{{$t('yes') | capitalizeText}}</label>
                                </div>
                                <div>
                                    <input 
                                        type="radio" 
                                        id="no" 
                                        value="no"
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
</template>

<script>

import {mapActions, mapMutations} from 'vuex'

export default {
    
    name: 'DeleteAccountConfirmation',
    data() {
        return {
            confirmValue: "no",
        }
    },
    methods: {
        ...mapActions({
            deleteAccountDispatch: 'deleteAccount'
        }),

        ...mapMutations({
            clearData: 'CLEAR_DATA'
        }),
        // Deletes the user's account and clears the state
        deleteAccount() {
            // Runs the api delete request
            this.deleteAccountDispatch(this.user.id)
            
                .then(() => {
                    this.clearData()
                    this.$swal(this.$i18n.t('accountIsRemoved'))
                    this.$router.push({name: 'Home'})
                })

                .catch(err => this.$swal(this.$store.state.apiInternalError))

        },       
    },
}
</script>

