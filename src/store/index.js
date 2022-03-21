import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const state = {
    city: "beijing",
};

const mutations = {

    CITY: (state, data) => {
        state.city = data;
    }
};

const actions = {

    CITY({ commit }, data) {
        commit('CITY', data);
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions
});