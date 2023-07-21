import axios from "@/axios";

const state = {
};

const getters = {
};

const mutations = {
};

const actions = {

    contactUs({ rootState }, data) {
        return new Promise((resolve, reject) => {
            axios.post(`/contacts/form-page`, data, {
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
};

export default {
    state,
    getters,
    actions,
    mutations,
};
