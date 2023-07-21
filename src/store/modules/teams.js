import axios from "@/axios";

const startingRoute = '/teams'

const state = {
    singleOne: {},
    list: [],
    userOnes: [],
};

const getters = {
    
    TeamsRegisteredByClub: state => {
        return state.userOnes.filter(team => team.registered_by_club)
    },

    Seasons: state => listOfTeams => {

        // Enables to stock the seasons already retrieved to avoid duplicates
        let uniques = []

        return listOfTeams.reduce((list, team) => {
            if (!uniques.includes(team.season.id)) {
                // The season id has not been added in the list yet
                uniques.push(team.season.id)
                return list.concat(team.season)
            } else {
                return list
            }
        }, [])
    }    
};

const mutations = {
    TEAM_UPDATE_DATA: (state, data) => (state.singleOne = data),
    TEAMS_UPDATE_LIST: (state, data) => (state.list = data),
    USER_TEAMS_UPDATE: (state, data) => (state.userOnes = data),
};

const actions = {

    addTeam({ rootState }, data) {
        return new Promise((resolve, reject) => {
            axios.post(`${startingRoute}/add`, data, {
                headers: rootState.postHeaders,
            })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    /* Gets all the teams where the user is involved
    Takes as argument the team's id if a specific team has to be retrieved, 
    the id related to the user in the model associated to his role (e.g. player's id or coach's id or club's id)
    Sends back the team associated to the given id and the teams associated to the user
    */
    getTeams({ rootState }, data) {

        return new Promise((resolve, reject) => {
            axios.get(`${startingRoute}/list/${data.teamIdentifier}/${data.userId}/${data.roles}`, {
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

    // Adds a player in a specific team
    async addTeamPlayer({rootState}, data) {

        const response = await axios.put(`${startingRoute}/add-player`, data, { 
            headers: rootState.postHeaders 
        }).catch(() => {throw new Error()})

        return response
    },

    /* Deletes a team
    Takes the team and club ids and sends back a boolean with true for success
    */
    deleteTeam({ rootState }, { teamId, clubId }) {

        return new Promise((resolve, reject) => {
            axios.delete(`${startingRoute}/remove/${teamId}/${clubId}`, {
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

    /* Removes a player from his team
    Takes the user's and team ids and sends back a boolean with true for success
    */
    removeTeamPlayer({ rootState }, {userId, teamId}) {

        return new Promise((resolve, reject) => {
            axios.delete(`${startingRoute}/remove-player/${userId}/${teamId}`, {
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
};

export default {
  state,
  getters,
  actions,
  mutations,
};
