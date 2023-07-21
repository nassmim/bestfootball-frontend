<template>

<!-- Component to confirm a gift -->

    <div
        class="modal fade"
        id="confirm_gift_modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
    >
        <div class="modal-dialog" role="document">
            <div style="background: #f7f7f7" class="modal-content">

                <form @submit.prevent="buyGift">

                    <div style="border-bottom: none !important" class="modal-header">
                        <img
                            class="mr-2"
                            src="/images/icons/Icons ___ (100px)-07.png"
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
                            <div class="form-row">

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="">{{$t('giftAddressNames')}}</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="form.names"
                                            @input="$v.form.names.$reset"
                                            @blur="setFieldValue($event.target.value, 'names')"
                                        />
                                    </div>
                                    <template v-if="$v.form.names.$error">
                                        <label class="input-label">
                                            <span v-if="!$v.form.names.required" class="req">{{$t('fieldRequired')}}</span>
                                        </label>
                                    </template>                                                                        
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="">{{$t('numberAndStreet')}}</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="form.street"
                                            @input="$v.form.street.$reset"
                                            @blur="setFieldValue($event.target.value, 'street')"
                                        />
                                    </div>
                                    <template v-if="$v.form.street.$error">
                                        <label class="input-label">
                                            <span v-if="!$v.form.street.required" class="req">{{$t('fieldRequired')}}</span>
                                        </label>
                                    </template>                                                                       
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="">{{$t('giftAddressAdditionalInfos')}}</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="form.additionalAddressInfos"
                                        />
                                    </div>
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="">{{$t('zipcode')}}</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="form.zipcode"
                                            @input="$v.form.zipcode.$reset"
                                            @blur="setFieldValue($event.target.value, 'zipcode')"                                            
                                        />
                                    </div>
                                    <template v-if="$v.form.zipcode.$error">
                                        <label class="input-label">
                                            <span v-if="!$v.form.zipcode.required" class="req">{{$t('fieldRequired')}}</span>
                                        </label>
                                    </template>                                                                       
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="">{{$t('city') | capitalizeText}}</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="form.city"
                                            @input="$v.form.city.$reset"
                                            @blur="setFieldValue($event.target.value, 'city')"                                            
                                        />
                                    </div>
                                    <template v-if="$v.form.city.$error">
                                        <label class="input-label">
                                            <span v-if="!$v.form.city.required" class="req">{{$t('fieldRequired')}}</span>
                                        </label>
                                    </template>                                                                       
                                </div>

                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="">{{$t('country') | capitalizeText}}</label>
                                        <input
                                            type="text"
                                            class="form-control"
                                            v-model="form.country"
                                            @input="$v.form.country.$reset"
                                            @blur="setFieldValue($event.target.value, 'country')"                                            
                                        />
                                    </div>
                                    <template v-if="$v.form.country.$error">
                                        <label class="input-label">
                                            <span v-if="!$v.form.country.required" class="req">{{$t('fieldRequired')}}</span>
                                        </label>
                                    </template>                                                                       
                                </div>
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
                            {{$t('Iconfirm') | capitalizeText}}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>

import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'

export default {
    
    name: 'BuyGiftModal',

    mixins: [validationMixin],

    props: ['user', 'gift'],

    data() {
        return {
            form: {
                names: "",
                street: "",
                additionalAddressInfos: "",
                zipcode: "",
                city: "",
                country: "",
            },
        }
    }, 

    validations: {

        form: {
            names: { required },  
            street: { required },  
            zipcode: { required },  
            city: { required },  
            country: { required },  
        }
    },

    methods: {

        // Validates the user's request to buy a gift
        buyGift() {

            if(this.$v.$invalid) {
            // The form has not been filled correctly
                this.$v.form.$touch()
                return 
            }

            const data = {
                userId: this.user.id,
                giftId: this.gift.id,
                names: this.form.names,
                street: this.form.street,
                additionalAddressInfos: this.form.additionalAddressInfos,
                zipcode: this.form.zipcode,
                city: this.form.city,
                country: this.form.country,
                giftPrice: this.gift.footcoin,
                roles: this.user.roles
            }

            this.$store.dispatch("buyGift", data)

                .then(response => {

                    $('#confirm_gift_modal').modal('hide')
                    
                    if(response.data.user) {
                        
                        this.$swal(this.$t('gift'), this.$t('giftBoughtSuccess'), 'success') 

                        const userInfos = {
                            identifier: this.user.id,
                            role: this.user.roles
                        }

                        this.$store.dispatch('getUser', userInfos)
                            .then((user) => this.$store.commit('USER_UPDATE_DATA', response.data.user.data))                        
                    } else {
                        this.$swal('Oops...', this.$t('giftNotEnoughFootcoinsError'), 'error')            
                    }
                })

                .catch(() => this.$swal(this.$store.state.apiInternalError))
        }, 
        
        // Used to trigger the validation process 
        setFieldValue(value, field) {
            this.$v['form'][field].$touch()            
        }, 
    },
}
</script>