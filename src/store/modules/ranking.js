import axios from "@/axios";

const state = {
    userInChallenges: [],
    userInDuels: [],
    usersInChallenges: [],
    usersInDuels: [],
    country: "",
    challenges: "",
    duels: "",
    initialFilters: {
        teamsIds: "all",
        seasonId: "all",
        ageCategoryId: "all",
        gender: 'all',
        countryId: 'all',
        sectionName: undefined,
        challengesCategoryId: 'all',
        challengeId: 'all',
    }
};

state.filters = { ...state.initialFilters }

const getters = {};

const mutations = {

    RANKING_FILTERS_UPDATE: (state, data) => state.filters = {
        ...state.filters,
        ...data
    },

    RANKING_FILTERS_RESET: (state) => state.filters = { ...state.initialFilters }    
};

const actions = {

    /* Gets either the full ranking or the user's ranking (or both)
        Takes the user's id, the team caracteristics if the user wants to see the ranking among players in a team,
        the user's caracteristics like his age and gender, the challenge criteria on which to see the ranking 
        and a size/page parameters to determine the length of the list to get from the database
    */
    getRanking({ rootState }, data) {
        return new Promise((resolve, reject) => {
            axios
                .get(`/ranking/filter/${data.userId}/${data.teamsIds}/${data.seasonId}/${data.ageCategoryId}/${data.gender}/${data.countryId}/${data.sectionName}/${data.challengesCategoryId}/${data.challengeId}/${data.size}/${data.page}`,
                {
                    headers: rootState.postHeaders,
                }
                )
                .then((response) => {
                    resolve(response)
                })
                .catch((error) => {
                    console.error(error);
                    reject(error)
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
