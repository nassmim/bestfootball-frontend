import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from 'vuex-persist'
import localforage from 'localforage'

// CUSTOM MODULES AND CONFIGS
import modules from "./modules"; //This will import all modules at once.
import i18n from "../plugins/i18n/index"
// CUSTOM MODULES AND CONFIGS--END

 
Vue.use(Vuex);

const vuexLocalStorage = new VuexPersistence({
    key: 'vuexLocalStorage',
    storage: window.localStorage,

    reducer: state => ({
        user: state.user,
        countries: state.general.countries,
    }),

    filter: mutation =>
        [
            'USER_UPDATE_DATA',
            'USER_UPDATE_TOKEN', 
            'USER_UPDATE_CONNECTED', 
            'USER_UPDATE_ROLE', 
            'TEAM_FEATURES_VISIBLE_UPDATE',
            'COUNTRIES_LIST_UPDATE',
            'CLEAR_DATA',
        ].includes(mutation.type)
})

const vuexLocalForage = new VuexPersistence({
    key: 'localForage',
    storage: localforage,
    asyncStorage: true, // Enables to persist the data even if the app is reloaded

    reducer: state => ({
        trainings: state.trainings,
        duels: state.duels ? state.duels.list : [], // Otherwise an error might occur in duels state not yet defined
        general: state.general,
        teams: state.teams,
    }),
}) 

const state = {
    userURL: "/user",
    headers: {
        'Authorization': ""
    },
    postHeaders: {
        'Content-Type': 'application/json',
        'Authorization': ""
    },
    postDataHeaders: {
        'Content-Type': 'multipart/form-data',
        'Authorization': ""
    },
    apiInternalError: i18n.t('apiErrorTitle') + '!' + ' ' + i18n.t('apiInternalErrorMessage') + '.' + ' ' + i18n.t('apiErrorContactUsMessage') + i18n.t('smileySad'),
    apiInputsError: i18n.t('apiErrorTitle') + '!' + ' ' + i18n.t('apiInputsErrorMessage') + '.' + ' ' + i18n.t('apiErrorContactUsMessage') + i18n.t('smileySad'),
    vuexLocalStorage: vuexLocalStorage.key,
    vuexLocalForage: vuexLocalForage.key,
    rolesNames: {
        player: 'ROLE_PLAYER',
        coach: 'ROLE_COACH',
        club: 'ROLE_CLUB',
    },
    videosSection: {
        challenge: 'challenge',
        duel: 'duel'
    }
};


export default new Vuex.Store({
    state,
    modules,
    plugins: [vuexLocalStorage.plugin, vuexLocalForage.plugin]
});
