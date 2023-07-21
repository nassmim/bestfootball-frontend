import axios from "@/axios";

const startingRoute = '/gifts'

const state = {
    list: "",
    error: 0,
    transactions: [],
    singleOne: [],
};

const mutations = {
    GIFTS_LIST_UPDATE: (state, data) => (state.gifts = data),
    GIFT_UPDATE_DATA: (state, data) => (state.singleOne = data),
};

const actions = {

  /* Gets all the gifts
  Takes a boolean indicating if it should get fun gifts or gifts dedicated to club (mostly equipments),
  the user's id if we want only the gifts he has ordered, and the list size/offset to include in the query
  Returns the list of X gifts starting from the offset
  */
    getGifts({ rootState }, data) {
        return new Promise((resolve, reject) => { 
            axios
                .get(`${startingRoute}/list/${data.forClubs}/${data.userId}/${data.size}/${data.page}`,
                    { headers: rootState.headers })
                    .then((response) => {
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)
                    });
            });
    },

  // Gets single gift depending on its name
    getGift({ rootState }, {name}) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${startingRoute}/presentation/${name}`,
                    { headers: rootState.headers })
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    reject(error)
                });
        });
    },  

  // Buy a gift
    buyGift({ rootState }, data) {
        return new Promise((resolve, reject) => {
        axios
            .post( `${startingRoute}/buy-one`, {
                user_id: data.userId,
                gift_id: data.giftId,
                names: data.names,
                street: data.street,
                additional_address_infos: data.additionalAddressInfos,
                zipcode: data.zipcode,
                city: data.city,
                country: data.country,
                gift_price: data.giftPrice,
                roles: data.roles,
            },
            { headers: rootState.postHeaders }
            )
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};



export default {
    state,
    actions,
    mutations,
};
