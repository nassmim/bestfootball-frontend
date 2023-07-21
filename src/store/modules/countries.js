import axios from "@/axios";
import router from "@/router";

const postHeaders = {
  "Content-Type": "application/json",
  Authorization: "",
};
const headers = {
  Authorization: "",
};
const postDataHeaders = {
  "Content-Type": "multipart/form-data",
  Authorization: "",
};

const state = {
  list: "",
};

const getters = {};

const actions = {
  // Gets all countries
  getCountries({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/search/countries/list", {
          headers: headers,
        })
        .then((response) => {
          commit("COUNTRIES_LIST_UPDATE", response.data);
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  },
};

const mutations = {
  COUNTRIES_LIST_UPDATE(state, data) {
    state.list = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
