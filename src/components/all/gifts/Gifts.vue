<template>

<!-- Component that shows all the available gifts -->

    <div class="rs-products pt-80 md-pt-80">
        <div class="container">

            <div class="shop-guide mb-30 pt-20">
                <div class="row rs-vertical-middle">

                    <div class="col-lg-6 col-md-6 col-sm-6 xs-mb-15">
                        <div class="title-style pb-50 md-pb-30">
                            <h2 class="margin-0 uppercase">{{$tc('gift', 2) | capitalizeText }} </h2>
                            <span class="line-bg y-b pt-10 left-line"></span>
                        </div>
                    </div>

                    <div class="col-lg-6 col-md-6 col-sm-6 text-right xs-text-left">
                        <div class="sorting">
                            <form>
                                <select class="col-md-3" v-model="giftType" @change="filterGifts">
                                    <option value="fun">{{$t('fun') | capitalizeText}}</option>
                                    <option value="equipment">{{$tc('equipment') | capitalizeText}}</option>
                                </select>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div class="vertical_scroll_bar row pb-100 pt-40 md-pb-80">
                <div class="col-lg-4 col-md-6 mb-60" v-for="gift in gifts" :key="gift.id">
                    <div class="products">
                        <div class="product-img">
                            <router-link 
                                :to="{name: 'GiftDetails', params: {name: gift[keyName]}}" 
                                @click.native="$store.commit('GIFT_UPDATE_DATA', gift)"
                            >
                                <img :src="`/images/gifts/${gift.visual_path}`"/>
                            </router-link>
                        </div>
                        <center>
                            <img v-if="gift.logo"
                                style="border: 5px solid #d4d4d4; border-radius: 100%; width: 100px; height: 100px; margin-top:-95px;"
                                class="functionality_icon"
                                :src="`/images/gifts/brands/${gift.logo}`"
                                alt
                            />
                            <img v-else
                                style="border: 5px solid #d4d4d4; border-radius: 100%; width: 100px; height: 100px; margin-top:-95px;"
                                class="functionality_icon"
                                :src="`/images/gifts/brands/default.png`"
                                alt
                            />

                        </center>

                        <h4 class="product-title">
                            <router-link 
                                :to="{name: 'GiftDetails', params: {name: gift[keyName]}}" 
                                @click.native="$store.commit('GIFT_UPDATE_DATA', gift)">
                                {{ gift[keyName] }}
                            </router-link>
                        </h4>
                        <span class="product-price">
                        <span class="symbol"></span>
                            {{ gift.footcoin }} {{$tc('virtualMoney', 2)}}
                        </span>
                        <div class="cart-button">
                            <a href="#">
                                <i class="flaticon-basket"></i>
                            </a>
                        </div>
                    </div>
                </div>
                <infinite-loading spinner="circles" :identifier="infiniteId" @infinite="infiniteHandler">
                    <div slot="no-more">{{$t('noMoreResults')}}</div>
                    <div slot="no-results">{{pageNumber == 0 ? $t('noResult') : ''}}</div>
                </infinite-loading>                 
            </div>
        </div>
    </div>
  <!-- Top Gifts End -->
</template>

<script>

import scrollLoadingMixin from '../../../mixins/scrollLoadingMixin';

export default {

    name: "Gifts",

    mixins: [scrollLoadingMixin],

    data() {
        return {
            gifts: [],
            pageNumber: 0,
            size: 8,
            forClubs: false,
            userId: "all",
            giftType: "fun",
            infiniteId: +new Date(),
        };
    },

    computed: {

        // Gets the language chosen by the user
        currentLocale() {
            return this.$i18n.locale
        },

        keyName(keyName) {
            return this.currentLocale === this.$i18n.fallbackLocale ? 'english_name' : 'french_name'
        }
    },

    async created() {
        this.giftTypeDefault = this.giftType 
        this.gifts = await this.getGifts()
    },

    methods: {

        async getGifts() {

            const data = {
                forClubs: this.forClubs,
                userId: this.userId,
                size: this.size,
                page: this.pageNumber,
            }

            const response = await this.$store.dispatch('getGifts', data)
                .catch(() => {
                    this.$swal(this.$store.state.apiInternalError)
                    throw new Error()
                })
            return response.data
        },

        // Handles the infinite loading component to update the list once the user scrolls down
        async infiniteHandler($state) {
            // The user scrolled down, the api must return the X (size) next elements 
            this.pageNumber++
            // Loads the data to display in the screen, updating directly the list
            this.loadData(this.gifts, this.size, this.pageNumber, this.getGifts, $state)
        },  
        
        // Gets the gifts depending on the filter done by the user
        async filterGifts() {
       
            this.giftType === this.giftTypeDefault ? this.forClubs = false : this.forClubs = true

            // The api will need to get the first gifts matching the new filter
            this.pageNumber = 0
            this.gifts = []
            // Makes the infinite loading component reset so that it restarts its state with the new list of users
            this.infiniteId += 1

            // Loads the data to display in the screen, updating directly the list of videos
            this.loadData(this.gifts, this.size, this.pageNumber, this.getGifts)
        },        
    },
};
</script>
<style scoped>
.vertical_scroll_bar{
     margin-top:60px;
     padding-top:40px;
}
</style>