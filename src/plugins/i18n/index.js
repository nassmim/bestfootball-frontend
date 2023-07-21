import VueI18n from 'vue-i18n'
import Vue from "vue";

import en from './en.json'
import fr from './fr.json'

const messages = { 
    en: en,
    fr: fr,
}

Vue.use(VueI18n);

const i18n = new VueI18n({
    fallbackLocale: "en",
    locale: "en",
    messages
})

export default i18n