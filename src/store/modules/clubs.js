import axios from "@/axios";

const startingRoute = '/clubs'

const state = {
    playersPrices: [{}, {}]
}

const getters = { };

const mutations = { 
    'UPDATE_PLAYERS_PRICES': (state, data) => state.playersPrices = data
};


const actions = {

    /* Gets the players prices, i.e. the monthly/annual amount to pay for one played added
    */
    getPlayerPrices({ rootState }) {

        return new Promise((resolve, reject) => {
            axios.get(`${startingRoute}/player-prices`, {
                headers: rootState.headers
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }, 

    /* Updates the club subscription plan type, so far it's about being monthly or annual payments frequency
    Takes as arguments the club id and its subscription plan id
    */
    async updatePaymentsFrequency({ rootState }, { clubId, planId}) {

        const response = await axios.put(`${startingRoute}/subscriptions/update-payments-frequency`, {
            club_id: clubId,
            plan_id: planId,            
        }, {
            headers: rootState.postHeaders
        }).catch(() => { throw new Error() })

        return response
    },
}

export default {
    state,
    getters, 
    mutations,
    actions
}
