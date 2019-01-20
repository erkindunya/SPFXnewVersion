import Vuex from 'vuex';
import Vue from 'vue';
import { sp } from '@pnp/sp';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        main: {},
        hardware: {},
        oracle: {},
        projectDetails: {},
        summary: {},
        access: [],
        page: 1,
        maxPage: 1,
        submitting: false,
        submitted: false,
        cost: 1001
    },
    mutations: {
        mainForm(state, values) {
            state.main = values;
        },
        hardwareForm(state, values) {
            state.hardware = values;
        },
        oracleForm(state, values) {
            state.oracle = values;
        },
        projectDetailsForm(state, values) {
            state.projectDetails = values;
        },        
        accessForm(state, values) {
            state.access = values;
        },        
        summaryForm(state, values) {
            state.summary = values;
        },
        navigate(state, page) {
            state.page = page;
            if(page > state.maxPage) state.maxPage = page;
            router.push(`/${page}`);
        },
        formSubmitting(state) {
            window.scrollTo (0,0);
            state.submitting = true;
        },
        formSubmitFailed(state) {
            state.submitting = false;
            state.submitted = false;
        },
        formSubmitted(state) {
            state.submitted = true;
            state.submitting = false;
        }
    },
    actions: {
        submitForm({ commit, state }) {
            commit('formSubmitting');
            const main: any = state.main;
            sp.web.lists.getByTitle("NewStarterSubmissions").items.add({
                NSSFirstName: main.firstName,
                NSSSurname: main.surname
                // NSSMiddleInitial: main.middleInitial,
                // NSSBusinessUnit: main.businessUnit.Title,
                // NSSAddressLine1: main.addressLine1,
                // NSSPostCode: main.postCode,
                // NSSDomainSuffix: main.domainSuffix.Title,
                // NSSEmployeeType: main.employeeType,
                // NSSStartDate: main.startDate,
                // NSSEndDate: main.endDate,
                // NSSJobTitle: main.jobTitle.Title,
                // NSSManager: main.manager.Id,
                // NSSSite: main.site.Title,
                // NSSFloorAndRoom: main.floorAndRoom
            }).then(i => {
                commit('formSubmitted');
            }).catch(e => {
                commit('formSubmitFailed');
            });
        }
    }
});