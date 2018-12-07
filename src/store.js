import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        main: {},
        hardware: [],
        access: [],
        page: 1
    },
    mutations: {
        mainForm(state, values) {
            state.main = values;
        },
        hardwareForm(state, values) {
            state.hardware = values;
        },
        accessForm(state, values) {
            state.access = values;
        },
        navigate(state, page) {
            state.page = page;
        }
    }
});