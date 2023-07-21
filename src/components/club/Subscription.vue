<template>

<!-- Component to add or to change a team -->

    <div
        class="modal fade"
        id="subscription_modal"
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
                    <h6 style="color: #3fb389" class="modal-title"> {{$t('paymentFrequency')}} </h6>
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
                        <span>{{$t('totalNumberPlayers')}}</span>
                        <span
                            class="ml-3"
                            style="
                                padding: 5px 8px;
                                border: 1px solid #b9b9b9;
                                border-radius: 4px;
                            "
                            >
                            {{numberPlayers}}
                        </span >

                        <h6 class="mt-3">{{$t('plan')}}</h6>
                        <div class="row mt-2">
                            <div class="col-md-6 text_center">
                                <input
                                    style="background: #3fb389; border: #3fb389; color: #fff"
                                    type="radio"
                                    checked
                                    value="1"
                                    v-model="subscriptionPeriodChoice"
                                />
                                <label for="annual_subscription">{{$t('annual') | capitalizeText}}</label>
                            </div>
                            <div class="col-md-6 text_center">
                                <input
                                    style="background: #3fb389; border: #3fb389; color: #fff"
                                    type="radio"
                                    checked
                                    value="2"
                                    v-model="subscriptionPeriodChoice"
                                />
                                <label for="annual_subscription">{{$t('monthly') | capitalizeText}}</label>
                            </div>
                        </div>

                        <h6 class="mt-3">{{$tc('price') | capitalizeText}}</h6>
                        <span>
                            {{$t('subscriptionAnnualPrice')}}: {{calculatedPrice.annual}} {{$t('moneySymbol')}} / {{$tc('year')}}
                        </span>
                        <br />
                        <span>({{$t('subscriptionMonthlyPrice')}}: {{calculatedPrice.monthly}} {{$t('moneySymbol')}}  / {{$tc('month')}})</span>
                         <br />
                         
                         <template v-if="!club.customer_id">
                             <p>
                                <span v-if="numberPlayers < maxPlayerPrices.number_players"> 
                                    {{$t('maxNumberPlayersPriceInfosFirstPart')}} {{maxPlayerPrices.number_players}} {{$tc('player', 2)}}, {{$t('maxNumberPlayersPriceInfosSecondPart')}}.
                                </span> 
                             </p>
                            <p>
                                <span class="free_test_period">{{$t('freeTestText')}}</span>
                            </p>
                        </template>
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
                        {{$t('close')}}
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
                        @click="club.customer_id ? updatePaymentsFrequency() : $emit('checkout-redirection', subscriptionPeriodChoice)"
                    >
                        {{$t('save')}}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    
    name: 'Subscription',

    props: ['teams', 'numberPlayers'],

    data() {
        return {
            subscriptionPeriodChoice: '1',
        }
    },

    computed: {

        club() {
            return this.$store.state.user.data.club
        },

        playersPrices() {
            return this.$store.state.clubs.playersPrices
        },

        // Gets the price for adding one player
        singlePlayerPrices() {
            return this.playersPrices[0]
        },
        // Gets the max price that we will charge and the associated number of players, i.e. above this number we won't charge more
        maxPlayerPrices() {
            return this.playersPrices[1]
        },

        // Derives the prices both for monthly and annual plans
        calculatedPrice() {

            let prices = {}
            
            if(this.singlePlayerPrices) {

                // Derives the price that the club should pay for a monthly plan
                const monthlyPlanPrice = Math.min(this.singlePlayerPrices.monthly_price_euro * this.numberPlayers, this.maxPlayerPrices.monthly_price_euro)
                // Derives the price reduction to apply if the club opts for a annual plan
                const annualReduction = 1 - this.singlePlayerPrices.annual_reduction
                
                // Derives the final price to pay depending on the frequency payment plan chosen by the club
                const annualPrice = monthlyPlanPrice * 12  * (this.subscriptionPeriodChoice === '1' ?  annualReduction : 1)

                prices = {
                    annual: Math.round(annualPrice * 100) / 100,
                    monthly: Math.round(annualPrice / 12 * 100) / 100
                } 
            }

            return prices
        },   
    },

    methods: {
        
        updatePaymentsFrequency() {
            
            const chosenPlan = this.subscriptionPeriodChoice === '1' ? process.env.VUE_APP_STRIPE_ANNUAL_PLAN : process.env.VUE_APP_STRIPE_MONTHLY_PLAN

            const data = {
                clubId: this.club.id,
                planId: chosenPlan,
            }

            this.$store.dispatch('updatePaymentsFrequency', data)
                .then(() => this.$swal(this.$i18n.t('subscriptionUpdated')))
                .catch(() => this.$swal(this.$store.state.apiInternalError))
        },
    }
}
</script>