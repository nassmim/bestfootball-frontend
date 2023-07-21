
import axios from "@/axios";

const state = {
    list: [],
    singleDuel: {}
}

const mutations = {
    USER_DUELS_LIST_UPDATE(state, data) {
        state.list = data;
    },    
    USER_DUEL_UPDATE(state, data) {
        state.singleDuel = data;
    },    
}

const actions = {
    
    // Post request to send a duel invitation to another user
    /* Challenges another user
    takes the user's id (he's the one who asks for the duel) and the one he challenges
    Returns the duel id
    */
    async requestDuel({ rootState }, { userAskingId, userAskedId, challengeId }) {

        try {

            const response = await axios.post(`/duels/request`, {
                user_asking_id: userAskingId, 
                user_asked_id: userAskedId,
                challenge_id: challengeId
            }, {
                headers: rootState.postHeaders
            })

            return response

        } catch (err) {
            throw new Error(err)
        }
    },

    /* Gets all the user's duels requests
        Takes the user's id, the duels status (i.e. rejected accepted or pending)
        the data length parameters to get from the request, and if we want only the closed ones or not
        Gets back the list of duels requests 
    */
    getDuels({ rootState }, data) {

        return new Promise((resolve, reject) => {

            axios
                .get(`/duels/all/${data.userId}/${data.statusId}/${data.size}/${data.page}/${data.closed}`, {
                    headers: rootState.headers
                })
                .then(response => {
                    resolve(response)
                })
                .catch(error => {
                    reject(error)
                })
        })
    },

    /* Post request to answer to a duel inviation
        Takes the duel id and the new status of the duel depending on the answer yes or no
    */
    answerDuel({ rootState }, { duelId }) {

        try {
            axios.put(`/duels/answer`,
                { id: duelId },
                { headers: rootState.postHeaders })
        } catch (err) {
            throw new Error(err)
        }
    },

    // Gets a specific duel from the id given in the request
    async getDuel({ rootState }, { duelId }) {
        try {
            const response = await axios.get(`/duels/opposition/${duelId}`, { headers: rootState.headers })
            return response
        } catch (err) {
            throw new Error(err)
        }
    },

    /* Participates to a duel
    takes the duel id, the scores of the user who asked for a duel and the one who accepted it
    Returns the duel and the two users
    */
    async participateDuel({ rootState }, { duelId, userAskingScore, userAskedScore }) {

        try {

            const response = await axios.put(`/duels/participate`, {
                id: duelId, 
                user_asking_score: userAskingScore, 
                user_asked_score: userAskedScore 
            }, { 
                headers: rootState.postHeaders 
            })

            return response

        } catch (err) {
            throw new Error(err)
        }
    },

    /* Deletes a video the user has sent for a specific duel
    Takes the duel id and the column name that will need to be updated 
    depending if the user is the one who asked or accepted the duel
    Returns nothing
    */
    async deleteDuelVideo({ rootState }, { duelId, videoToRemove }) {
        axios.delete(`/duels/remove-video/${duelId}/${videoToRemove}`, { 
            headers: rootState.headers 
        })
    },    
} 

export default {
    state,
    actions, 
    mutations
}
