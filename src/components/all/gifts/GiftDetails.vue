<template>
<!-- Gift details Section -->
<div class="rs-single-club sec-bg md-pb-80 pt-20">
   <div class="container">
      <div class="rs-tab pb-100 md-pb-80">
         <div class="single-team-data">
            <div class="product_container">
               <div class="row flex-column-reverse flex-lg-row">
                  <div class="background_side col-md-6" style="position: sticky !important; top: 0px !important;">
                     <img :src="`/images/gifts/${gift.visual_path}`" alt="" style="border-radius: 12px;">
                     <div v-if="user.id" class="col-md-12 mt-30"><span href="#" data-toggle="modal" data-target="#confirm_gift_modal"  class="request_gift_btn">{{$t('IwantThat')}}</span></div>
                     <br>
                     <div class="col-md-12 for_mobile">
                        <div class="alert alert-success" style="margin-bottom: 60px;"><a href="#" data-dismiss="alert" aria-label="close" class="close">×</a><span><i class="fa fa-info-circle"></i></span><span style="text-align: left !important;">{{ gift[keyName.obtention] }} </span></div>
                     </div>
                  </div>
                  <div class="content_side col-md-6">
                     <div class="col-md-12 gift_header">
                        <img v-if="gift.logo" :src="`/images/gifts/brands/${gift.logo}`" alt="" class="functionality_icon" style="border: 3px solid rgb(212, 212, 212); border-radius: 100%; width: 80px; height: 80px; margin: 30px;">
                        <img v-else
                                style="border: 3px solid rgb(212, 212, 212); border-radius: 100%; width: 80px; height: 80px; margin: 30px;"
                                class="functionality_icon"
                                :src="`/images/gifts/brands/coach-gift-yellow.png`"
                                alt
                            />
                            <span>{{ gift[keyName.description] }}</span>
                            <br/>
                        <span href="#" class="detail_btn">{{gift.footcoin}} {{$tc('virtualMoney', 2)}}</span>
                     </div>
                     <br>
                     <div class="col-md-12 for_desktop">
                        <div class="alert alert-success" style="margin-bottom: 60px;"><a href="#" data-dismiss="alert" aria-label="close" class="close">×</a><span><i class="fa fa-info-circle"></i></span><span style="text-align: left !important;">{{ gift[keyName.obtention] }} </span></div>
                     </div>
                  </div>
               </div>
            </div>
          
         </div>
      </div>
   </div>
   <BuyGiftModal :user="user" :gift="gift"/>
</div>
  <!-- Gift details Section End -->
</template>

<script>

import { mapActions, mapState } from "vuex";
import BuyGiftModal from '../BuyGiftModal'
export default {

  name: "GiftDetails",
  components :{
    BuyGiftModal,
  },

    data() {
        return {
            userId: "all",
        };
    },

    computed: {
        ...mapState({
            user: state => state.user.data,
            isConnected: state => state.user.isConnected,
            gift: state => state.gifts.singleOne
        }),

        // Gets the language chosen by the user
        currentLocale() {
            return this.$i18n.locale
        },

        keyName() {
            return this.currentLocale === this.$i18n.fallbackLocale ? {description: 'english_description', obtention: 'english_obtention'} : {description: 'french_description', obtention: 'french_obtention'}
        }        
    },

    created() {

        const giftNameRoute = this.$route.params.name + this.$route.hash

        if(this.gift.name !== giftNameRoute) {
            this.getGift(encodeURIComponent(giftNameRoute));
        }
    },

    methods: {

        ...mapActions({
            getGiftDispatch: 'getGift' 
        }), 

        getGift(giftName) { 
            this.getGiftDispatch({name: giftName})
                .then(response => this.$store.commit('GIFT_UPDATE_DATA', response.data)) 
                .catch(() => this.$swal(this.$store.state.apiInternalError))
        },
    },
};
</script>

<style scoped>
.product_container{
margin: 40px 60px !important;
}
.gift_header{
   background: #fff !important;
   border-radius: 12px !important;
   padding-bottom: 40px !important;
   border: 1px solid #e9e9e9;
}
.request_gift_btn{
    padding: 15px 50px;
    border-radius: 190px;
    background: #3FB389;
    color: #fff;
    cursor: pointer;
}
.for_mobile{
  display: none;
}
.request_gift_btn{
  margin-left:135px;
}


/* Smartphone & kindle (portrait and landscape) ----------- */
@media only screen and (min-width : 320px) and (max-width : 700px) {
.product_container{
  margin: 30px 0px !important;
} 
.gift_header{
  margin-top:20px;
}
.for_desktop{
  display: none;
}
.for_mobile{
  display: block;
}
.request_gift_btn{
  margin-left:90px;
}
}
/* iPads (portrait and landscape) ----------- */
@media only screen and (min-width : 768px) and (max-width : 1024px) {
.product_container{
  margin: 30px 0px !important;
} 
.gift_header{
  margin-top: 20px;
  width: 1400px;
}
.for_desktop{
  display: none;
}
.for_mobile{
  display: block;
}
.request_gift_btn{
  margin-left:90px;
}
}
</style>