<template lang="html">

<!-- View where the user gets redirected once he has successfully finished a payment
-->

    <div class="wide-video-section themeix-ptb">
        <div class="container">
            <div class="col-xs-12 col-md-6 col-md-offset-3 themeix-section-hs text-center">
                <div class="panel panel-default">

                    <div class="panel-head">
                        <h3>{{resultTitle}}</h3>
                    </div>

                    <div class="panel-body">
                        <div class="alert alert-success">
                            {{resultMessage}}
                        </div>                       
                        <div>             
                            <h4>
                                <router-link v-if="user.id" :to="{name: 'Home', params:{username: user.id}}">{{$tc('myFeminine', 2) | capitalizeText}} {{$tc('team', 2)}}</router-link>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  
export default {

    name: 'CheckoutResult',
    
    data() {
        return {
            resultTitle: this.$i18n.t('checkoutSuccessTitle'),
            resultMessage: this.$i18n.t('checkoutSuccessText')
        }
    },

    computed:  {
        user() {
            return this.$store.state.user.data
        },
    },

    created() {
        const result =  this.$route.params.result
        if(result == '0') {
            this.resultTitle =  this.$i18n.t('checkoutCancelledTitle')
            this.resultMessage =  this.$i18n.t('checkoutCancelledText')
        } 
    }
}
</script>

<style scoped lang="css">
h3 {
  font-size: 20px;
}
</style>
