<template>

<!-- Component that shows all the available gifts -->

    <div class="rs-products pt-80 md-pt-80">
        <div class="container">

            <div class="shop-guide mb-30 pt-20"> 
                <div class="row rs-vertical-middle">

                    <div class="col-lg-6 col-md-6 col-sm-6 xs-mb-15">
                        <div class="title-style pb-50 md-pb-30">
                            <h2 class="margin-0 uppercase">{{$tc('myMasculine', 2) | capitalizeText }} {{$tc('gift', 2) | capitalizeText }}</h2>
                            <span class="line-bg y-b pt-10 left-line"></span>
                        </div>
                    </div>

                    <div v-if="user.coach || user.club" class="col-lg-6 col-md-6 col-sm-6 text-right xs-text-left">
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

            <div class="vertical_scroll_bar row mobile-table">
                <template v-if="gifts.length"> 
                    <div class="col-md-4" v-for="(transaction, index) in gifts" :key="index">
                        <div style="margin-bottom:20px !important;" class="list-group">
                            <router-link 
                                :to="{name: 'GiftDetails', params: {name: transaction.gift[keyName]}}" 
                                style="background:rgb(63 179 137); border:2px solid rgb(63 179 137);" 
                                class="list-group-item list-group-item-action active"
                                @click.native="$store.commit('GIFT_UPDATE_DATA', transaction.gift)"
                            >
                                <img 
                                    style="margin-right:5px; border: 3px solid #3fb389;border-radius: 100%;background: #3fb58a;width:40px;height: 40px;" 
                                    :src="`/images/gifts/${transaction.gift.visual_path}`"
                                />
                                <strong>{{ transaction.gift[keyName] }}</strong> 
                            </router-link>
                            <li class="list-group-item list-group-item-action">
                                <b style="color:#3FB389;">{{$tc('virtualMoney', 2) | capitalizeText}}: </b>
                                {{ transaction.gift_price }}
                            </li>
                            <li class="list-group-item list-group-item-action">
                                <b style="color:#3FB389;">{{$tc('date', 2) | capitalizeText}}: </b>
                                {{transaction.created_at.slice(0,10)}}
                            </li>
                            <li class="list-group-item list-group-item-action">
                                <b style="color:#3FB389;">{{$t('status') | capitalizeText}}: </b>
                                <span v-if="transaction.cancelled">{{$t('cancelled')}}</span>
                                <span v-else>
                                    <span v-if="!transaction.sent">{{$t('pending')}}</span>
                                    <span v-else>
                                    <span v-if="!transaction.delivered">{{$t('sent')}}</span>
                                    <span v-else>{{$t('delivered')}}</span>
                                    </span> 
                                </span>                                
                            <li class="list-group-item list-group-item-action">
                                <b style="color:#3FB389;">{{$t('address') | capitalizeText}}: </b> 
                                {{transaction.street}}, {{transaction.city}}, {{transaction.country}}
                            </li>
                        </div>
                    </div>
                
                    <infinite-loading spinner="circles" :identifier="infiniteId" @infinite="infiniteHandler">
                        <div slot="no-more">{{$t('noMoreResults')}}</div>
                        <div slot="no-results">{{pageNumber === 0 ? $t('noResult') : ''}}</div>
                    </infinite-loading> 
                </template>
            </div>

                <div class="rs-pointtable inner-style md-pb-80">
            
                <div class="vertical_scroll_bar point-table-wrap pb-100 md-pb-80">
                    <table>
                        <tbody>
                            <tr>
                                <th>{{$tc('gift') | capitalizeText }}</th>
                                <th>{{$tc('virtualMoney', 2) | capitalizeText }}</th>
                                <th>{{$tc('date') | capitalizeText }}</th>
                                <th>{{$t('status') | capitalizeText }}</th>
                                <th>{{$t('address') | capitalizeText }}</th>
                            </tr>
                            <template v-if="gifts.length">
                            <tr  v-for="transaction in gifts" :key="transaction.id">
                                <td>
                                  <router-link 
                                 :to="{name: 'GiftDetails', params: {name: transaction.gift[keyName]}}" 
                                 @click.native="$store.commit('GIFT_UPDATE_DATA', transaction.gift)">
                                                <img
                                                    style="border: 3px solid #3fb389;border-radius: 100%;background: #3fb58a;width:50px;height: 50px;"
                                                    :src="`/images/gifts/${transaction.gift.visual_path}`"
                                                />
                                                <br />
                                                <p>
                                                    <strong>
                                                        {{ transaction.gift[keyName] }}
                                                    </strong>
                                                </p>                                 
                                  </router-link>
                                </td>
                                <td>{{ transaction.gift_price }}</td>
                                <td>{{transaction.created_at.slice(0,10)}}</td>
                                <td>
                                    <span v-if="transaction.cancelled">{{$t('cancelled')}}</span>
                                    <span v-else>
                                        <span v-if="!transaction.sent">{{$t('pending')}}</span>
                                        <span v-else>
                                        <span v-if="!transaction.delivered">{{$t('sent')}}</span>
                                        <span v-else>{{$t('delivered')}}</span>
                                        </span> 
                                    </span>                                   
                                </td>
                                <td>{{transaction.street}}, {{transaction.city}}, {{transaction.country}}</td>
                            </tr>
                            
                            <infinite-loading spinner="circles" :identifier="infiniteId" @infinite="infiniteHandler">
                                <div slot="no-more">{{$t('noMoreResults')}}</div>
                                <div slot="no-results">{{pageNumber == 0 ? $t('noResult') : ''}}</div>
                            </infinite-loading> 
                            </template>  
                        </tbody>
                    </table>
                </div>
                              
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
            giftType: "fun",
            infiniteId: +new Date(),
        };
    },

    computed: {

        user() {
            return this.$store.state.user.data
        },

        // Gets the language chosen by the user
        currentLocale() {
            return this.$i18n.locale
        },

        keyName() {
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
                userId: this.user.id,
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

.mobile-table {
	display: none;
}

/* Smartphone (portrait and landscape) ----------- */
@media only screen and (min-width : 320px) and (max-width : 700px) {
.mobile-table {
	display: block !important;
}
.rs-pointtable {
	display: none !important;
}
}
</style>