<template>
  <!-- Screen where the user indicates his email address so that we send him a link
  to reset his password
   -->
   
    <div id="rs-my-account" class="rs-my-account pt-100 md-pb-80 md-pt-80">
        <div class="container">
            <div class="row pb-100 md-pb-72">
                <div class="col-lg-3"></div>
                    <div class="col-lg-6">
                        <div class="login-side">
                            <div class="container forgotten_container">
                            <div class="sec-title">
                                <h2 class="title">{{$t('forgottenPassword')}}?</h2>
                            </div>
                            <form
                                id="login-form"
                                class="login-form"
                                v-on:submit.prevent="askForPasswordReset"
                            >
                                <label class="input-label">
                                    <span v-if="apiCallResultMessage" class="req">{{apiCallResultMessage}}</span>
                                </label>    

                                <label class="input-label">
                                    {{$t('enterEmail')}}
                                    <span>*</span>
                                </label>
                                <input
                                    class="input-control"
                                    type="email"
                                    id="email"
                                    name="email"
                                    v-model.trim="$v.email.$model"
                                />
                                <template v-if="$v.email.$error">
                                    <label class="input-label">
                                        <span v-if="!$v.email.required" class="req">{{$t('fieldRequired')}}</span>
                                        <span v-if="!$v.email.email" class="req">{{$t('emailNotValid')}}</span>
                                    </label>
                                </template>

                                <div class="login-control">
                                    <ul>
                                    <li>
                                        <button type="submit" class="readon">{{$t('localLogin')}}!</button>
                                    </li>
                                    </ul>
                                </div>
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
import axios from "@/axios";

import { validationMixin } from 'vuelidate'
import { required, email } from 'vuelidate/lib/validators'

export default {
    name: "ForgottenPasswordForm",

    data: () => {
        return {
            email: "",
            apiCallResultMessage: "",
        };
    },

    mixins: [validationMixin],

    validations: {
        email: {
            email,
            required,
        },
    },  

    methods: {

        askForPasswordReset() {

            if(this.$v.$invalid) {
            // The form has not been filled correctly
                this.$v.form.$touch()
                return 
            }
            
            this.$store.dispatch("askForPasswordReset", { email: this.email})
                .then(response => {
                    if(reponse.data) {
                        this.apiCallResultMessage = this.$t('passwordEmailSent')
                    } else {
                        this.apiCallResultMessage = this.$t('noAccountFound')
                    }
                })

                .catch(error => {
                    console.log(error)
                    this.apiCallResultMessage = this.$store.state.apiInternalError
                })
        }
    },
};
</script>

<style scoped>
/* Smartphone (portrait and landscape) ----------- */
@media only screen and (min-width : 320px) and (max-width : 700px) {
    .forgotten_container{
        padding:40px;
        margin-top: 90px;
    }
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-width : 768px) and (max-width : 1024px) {
   .forgotten_container{
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
