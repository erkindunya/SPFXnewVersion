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
        cost: 1001,
        userInformation: {}
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
            const hardware: any = state.hardware;
            const oracle: any = state.oracle;
            const access: any = state.access;
            const projectDetails: any = state.projectDetails;
            sp.web.lists.getByTitle("NewStarterSubmissions").items.add({
                NSSFirstName: main.firstName,
                NSSSurname: main.surname,
                NSSMiddleInitial: main.middleInitial,
                NSSDomainSuffix: main.domainSuffix,
                Username: main.username,
                Duplicate: main.duplicate,
                Reporting_x0020_Unit: main.reportingUnit.Title,
                NSSJobTitle: main.jobTitle.Title,
                O365_x0020_License: main.o365License.LicenceType,
                O365_x0020_LicenseText: main.o365License.Title,
                NSSEmployeeType: main.employeeType,
                NSSStartDate: main.startDate,
                NSSEndDate: main.endDate,
                ManagerName: main.manager.DisplayText,
                NSSManager: main.manager.Description,
                NSSSite: main.site.Title,
                Site_x0020_Approved: !main.customAddress,
                NSSFloorAndRoom: main.floorAndRoom,
                Mobile: hardware.products.mobile ? hardware.products.mobile.map((item) => { return `${item.name} £${item.price}`; }).join():"",
                Manager_x0020_Employee_x0020_Num: hardware.mobileLineManager,
                SCC_x0020_Engineer: hardware.sccengineer,
                Bim_x0020_Build: hardware.bimbuild,
                Computer_x0020_Package: hardware.products.computer ? hardware.products.computer.map((item) => { return `${item.name} (${item.description}) £${item.price}`; }).join():"",
                Monitors: hardware.products.monitors ? hardware.products.monitors.map((item) => { return `${item.name} £${item.price}`; }).join():"",
                Connectors: hardware.products.connectors ? hardware.products.connectors.map((item) => { return `${item.name} £${item.price}`; }).join():"",
                Software: JSON.stringify(hardware.products.software),
                Peripherals: hardware.products.peripherals ? hardware.products.peripherals.map((item) => { return `${item.name} £${item.price}`; }).join():"",
                Skype: hardware.products.skype ? hardware.products.skype.map((item) => { return `${item.name} £${item.price}`; }).join():"",
                Alternate_x0020_Delivery: hardware.deliveryAddress,
                // Joint_x0020_Ventures: oracle.,
                Employee_x0020_ID: oracle.employeeId,
                Oracle_x0020_for_x0020_Business: oracle.oracleForBusiness,
                // AD_x0020_Hoc_x0020_Access: oracle.,
                ESS_x002f_MSS: oracle.kierPropertyOnlyESS,
                Property_x0020__x002d__x0020_Com: oracle.kierPropertyOnlyESSPropertyCom,
                Property_x0020__x002d__x0020_Fin: oracle.kierPropertyOnlyESSPropertyFin,
                Extra_x0020_Functional_x0020_Acc: oracle.kierPropertyOnlyExtra,
                // OTL: oracle.,
                Basic_x0020_access: oracle.oEmployeeKESSBasic,
                Basic_x0020_w_x002f__x0020_holid: oracle.oEmployeeKESSBasicWAbsence,
                Timecard_x0020_entry: oracle.oEmployeeKSST,
                Timecard_x0020_approve: oracle.oEmployeeKMSS,
                Timecard_x0020_approve_x0020_w_x: oracle.oEmployeeKLMS,
                // Timekeeping: oracle.,
                Timekeeper: oracle.oTimeTimekeeper,
                Timekeeper_x0020_group_x0020_mai: oracle.oTimeTimekeeperGroup,
                Super_x0020_timekeeper: oracle.oTimeSuperTimekeeper,
                Financial_x0020_Controller_x0020: oracle.oKierOTL,
                // Hyperion_x0020_and_x0020_PBCS: oracle.,
                Hyperion_x0020_Financial_x0020_M: oracle.hyperionFinancialManagement,
                Hyperion_x0020_PBCS: oracle.hyperionPBCS,
                // BI: oracle.,
                Joint_x0020_Venture_x0020__x0028: oracle.jointVentureAccess,
                RAF_x0020_Lakenheath_x0020__x002: oracle.rafLakenheathAccess,
                Oracle_x0020_BI_x0020_Reporitng: oracle.biOracleBIReporting,
                VCR_x0020_Lump_x0020_Sum: oracle.vcrLumpSumproject,
                VCR_x0020_Conversion: oracle.vcrConversionProject,
                VCR_x0020_Repairs: oracle.vcrRepairs,
                SPM: oracle.vcrSPM,
                Cost_x0020_Center: oracle.costCenter,
                Network_x0020_Drives: JSON.stringify(access.drive),
                Shared_x0020_Mailboxes: JSON.stringify(access.mailbox),
                Distribution_x0020_Lists: JSON.stringify(access.distribution),
                Project_x0020_Number: projectDetails.projectNumber,
                Task_x0020_Number: projectDetails.taskNumber,
                Approval_x0020_Cost_x0020_Center: projectDetails.costCenter,
                Financial_x0020_Director: projectDetails.financialDirector
            }).then(i => {
                commit('formSubmitted');
            }).catch(e => {
                commit('formSubmitFailed');
            });
        }
    }
});