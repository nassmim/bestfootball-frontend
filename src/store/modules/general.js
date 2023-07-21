import axios from "@/axios";

const startingRoute = '/general'

const roles = {
    player: 'ROLE_PLAYER',
    coach: 'ROLE_COACH',
    club: 'ROLE_CLUB',
}


/* We could have reduced the number of codes repetitions by adding the condition directly in the reduce functions 
but it would redo the if condition in each loop, which is less good for performance 
*/

const getUsersNames = (state, role, keepName) => {

    if (role) {
        // We want users who match a specific role
        return getUsersNamesFromRole(state, role, keepName)
    } else {
        // No role is defined, so we get all the users
        return getAllUsersNames(state, keepName)
    }    
}

const getAllUsersNames = (state, keepName) => {
    // Either Names are send as they are without modifications or must be retreated (e.g. if the purpose is to check names existence to avoid duplicates)
    return keepName
        ? state.users.map(user => user.username)
        : state.users.map(user => user.username.toLowerCase().replace(/\s+/g, ''))
}

const getUsersNamesFromRole = (state, role, keepName) => {
    // Either Names are send as they are without modifications or must be retreated (e.g. if the purpose is to check names existence to avoid duplicates)
    
    return keepName
        ? state.users.reduce((list, user) => user.roles.includes(role) ? list.concat(user.username) : list, [])
        : state.users.reduce((list, user) => user.roles.includes(role) ? list.concat(user.username.toLowerCase().replace(/\s+/g, '')) : list, [])
}

const getClubsNames = (state, isRegistered, keepName) => {

    if (isRegistered) {
        // We want only the names of the clubs that are registered to our app
        return getRegisteredClubsNames(state, keepName)
    } else {
        // We want all the clubs no matter if they are registered in our app or not
        return getAllClubsNames(state, keepName)
    }
}

const getAllClubsNames = (state, keepName) => {
    // Either Names are send as they are without modifications or must be retreated (e.g. if the purpose is to check names existence to avoid duplicates)
    return keepName
        ? state.clubs.map(club => club.name) 
        : state.clubs.map(club => club.name.toLowerCase().replace(/\s+/g, '')) 
}

const getRegisteredClubsNames = (state, keepName) => {
    // Either Names are send as they are without modifications or must be retreated (e.g. if the purpose is to check names existence to avoid duplicates)
    return keepName
        ? state.clubs.reduce((list, club) => club.is_registered ? list.concat(club.name) : list, [])
        : state.clubs.reduce((list, club) => club.is_registered ? list.concat(club.name.toLowerCase().replace(/\s+/g, '')) : list, [])
}


const state = {
    users: [],
    clubs: [],
    userVisited: {},
    countries: [],
    playerCharacteristics: {
        positions: {},
        categories: {},
        foots: {},
    },
    seasons: [],
    deferredPrompt: null,
    promptAnswer: false,
};

const getters = {

    /* Gets the users' username
        Takes as argument the role if we want only the usernames for users who have a specific role,
        a boolean (only if we want the clubs names) if we look for club that are registered in our app or all of them
        and a boolean to indicate if we need the names to be in lowercase and with no spaces or in their origin form
    */
    usersNames: state => (role = undefined, isRegistered = undefined, keepName = undefined) => {

        let names = []

        if (role === roles.club) {
            // We want the clubs names
            names = getClubsNames(state, isRegistered, keepName)
        } else {
            // We want users who are either player or coach 
            names = getUsersNames(state, role, keepName)
        } 

        return names
    },
 
    clubsNames: state => isRegistered => {
        return state.clubs.map(club => club.name)
    },
};


const mutations = {
    USERS_LIST_UPDATE: (state, data) => state.users = data,
    CLUBS_LIST_UPDATE: (state, data) => state.clubs = data,
    USER_VISITED_UPDATE: (state, data) => (state.userVisited = data),
    COUNTRIES_LIST_UPDATE: (state, data) => state.countries = data,
    SEASONS_LIST_UPDATE: (state, data) => state.seasons = data,
    PLAYERS_CHARACTERISTICS_UPDATE: (state, data) => state.playerCharacteristics = data,
    UPDATE_DEFERRED_PROMPT: (state, data) => state.deferredPrompt = data,
    UPDATE_PROMPT_ANSWER: (state, data) => state.promptAnswer = data,
};

const actions = {

    // Gets all users 
    getUsers({ rootState }) {

        return new Promise((resolve, reject) => {
            axios
                .get(`${startingRoute}/get-all-users`, {
                    headers: rootState.headers,
                })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }, 

    // Gets all clubs available in the bdd
    async getClubs({ rootState }) {

        try {
            const response = await axios.get(`${startingRoute}/get-all-clubs`, {
                headers: rootState.headers
            })
            return response
        } catch (err) {
            throw new Error(err)
        }
    },    

    // Get all countries available in the bdd
    async getCountries({rootState}) {

        try { 
            const response = await axios.get(`${startingRoute}/get-all-countries`, {
                headers: rootState.headers
            })
            return response 
        } catch(err) {
            throw new Error(err)
        }
    },

    /* Gets the characteristics values that serve to define a player like his position on the field, his age category, etc.
    These differ depending on the type of user. This request takes as arguments the 
    user's role and sends back the values of each criteria
    */
    async getPlayerCharacteristics({ rootState }) {
        const response = await axios.get(`${startingRoute}/players-characteristics`, {
            headers: rootState.headers
        }).catch(() => { throw new Error() })
        return response
    },    

    /* Gets the available seasons
    */
    async getSeasons({ rootState }) {
        const response = await axios.get(`${startingRoute}/get-all-seasons`, {
            headers: rootState.headers
        }).catch(() => { throw new Error() })
        return response
    },     
}

export default {
    state,
    getters,
    actions,
    mutations,
};
