<template>
<!-- This is a pop up displaying the lower version of the terms of use 
-->

    <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5
                    style="color: #43b98f;"
                    class="modal-title"
                    id="exampleModalLabel"
                    >
                    {{$t('termsAndConditions')}}
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
                    <h6>{{ role === clubRole ? $t('ageSignUpPolite') : $t('ageSignUp')}}?</h6>

                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="_yes"
                            :value="true"
                            v-model="user_is_adult"
                        />
                        <label class="form-check-label" for="_yes">
                            {{$t('yes') | capitalizeText}}
                        </label>
                    </div>

                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="_no"
                            :value="false"
                            v-model="user_is_adult"
                            checked
                        />
                        <label class="form-check-label" for="_no">
                            {{$t('no') | capitalizeText}}
                        </label>
                    </div>

                    <p>
                        {{user_is_adult ? $t('generalTermsAndConditionsText') : $t('generalTermsAndConditionsTextParents')}}
                        <router-link
                        :to="{name: 'TermsOfUse'}"
                        >
                            {{$t('generalTermsAndConditions')}}.
                        </router-link>                            
                    </p>
                </div>
                <div class="modal-footer">
                    <button
                    type="button"
                    class="btn btn-success readon"
                    data-dismiss="modal"
                    >
                    {{$t('IAccept')}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'TermsAndConditions',

    props: ['role'],

    data() {
        return {
            user_is_adult: true,
            clubRole: 'ROLE_CLUB'
        }
    }
}
</script>