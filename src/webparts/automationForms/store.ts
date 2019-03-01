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
        cost: "0",
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
            console.log(state);
            var requestJSON = JSON.stringify(state);
            sp.web.lists.getByTitle("FailedSubmissions").items.add({
                Title: "Failed submission",
                FormJSON: requestJSON
            }).then(i => {
                state.submitting = false;
                state.submitted = false;
                alert("Your submission failed, the data you entered has been saved and a ticket has been raised for this error. You will receive an email with a ticket number soon.");
                window.location.href='http://myservicedesk/portal.php';
            }).catch(e => {
                console.log(e);
            });
        },
        formSubmitted(state) {
            state.submitted = true;
            state.submitting = false;
        },
        setCost(state, cost) {
            state.cost = cost;
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
            console.log(access.mailboxes);
            sp.web.lists.getByTitle("NewStarterSubmissions").items.add({
                // main page
                NSSFirstName: main.firstName,
                NSSSurname: main.surname,
                NSSMiddleInitial: main.middleInitial,
                NSSDomainSuffix: main.domainSuffix,
                Username: main.username,
                Duplicate: main.duplicate,
                Reporting_x0020_Unit: main.reportingUnit.Title,
                NSSJobTitle: main.jobTitle.Title,
                O365_x0020_License: main.o365License.LicenceType,
                O365_x0020_Licence_x0020_Text: main.o365License.Title,
                NSSEmployeeType: main.employeeType,
                NSSStartDate: main.startDate,
                NSSEndDate: main.endDate,
                ManagerName: main.manager.DisplayText,
                NSSManager: main.manager.Description,
                NSSSite: main.SiteName,
                SiteAddress: main.addressLine1,
                SitePostcode: main.postCode,
                SiteTownCity: main.townCity,
                Site_x0020_Approved: !main.customAddress,
                NSSFloorAndRoom: main.floorAndRoom,

                // hardware page
                Mobile: hardware.products.mobile ? hardware.products.mobile.map((item) => { return `${item.name} £${item.price}`; }).join():"",
                Manager_x0020_Employee_x0020_Num: hardware.mobileLineManager,
                O2Company: hardware.O2Division ? hardware.O2Division.Title : '',
                O2Division: hardware.O2Division ? hardware.O2Division.snpa : '',
                O2Account: hardware.O2Division ? hardware.O2Division.b1lt : '',
                SCC_x0020_Engineer: hardware.sccengineer,
                Bim_x0020_Build: hardware.bimbuild,
                ComputerRecycled: hardware.isRecycled,
                Computer_x0020_Package: hardware.products.computer ? hardware.products.computer.map((item) => { return `${item.name} (${item.description}) £${item.price}`; }).join("\n"):"",
                Monitors: hardware.products.monitors ? hardware.products.monitors.map((item) => { return `${item.name} £${item.price}`; }).join("\n"):"",
                Connectors: hardware.products.connectors ? hardware.products.connectors.map((item) => { return `${item.name}`; }).join("\n"):"",
                SoftwareSCC: hardware.products.software ? hardware.products.software.filter(item => item.sccInstall === true).map((item) => { return `${item.name} £${item.price}`;}).join('\n'):"",
                SoftwareCL: hardware.products.software ? hardware.products.software.filter(item => item.requiresApproval === true).map((item) => { return `${item.name} £${item.price}`;}).join('\n'):"",
                Software: hardware.products.software ? hardware.products.software.filter(item => item.sccInstall === false && item.requiresApproval === false).map((item) => { return `${item.name} £${item.price}`;}).join('\n'):"",
                Peripherals: hardware.products.peripherals ? hardware.products.peripherals.map((item) => { return `${item.name} £${item.price}`; }).join("\n"):"",
                Skype: hardware.products.skype ? hardware.products.skype.map((item) => { return `${item.name} £${item.price}`; }).join("\n"):"",
                Alternate_x0020_Delivery: hardware.deliveryAddress,
                Delivery_x0020_Contact_x0020_Nam: hardware.deliveryContactName,
                Delivery_x0020_Contact_x0020_Num: hardware.deliveryContactNumber,
                
                // Oracle Page
                Joint_x0020_Ventures: oracle.jointVentures,
                Employee_x0020_ID: oracle.employeeId,
                Oracle_x0020_for_x0020_Business: oracle.oracleForBusiness,
                AD_x0020_Hoc_x0020_Access : oracle.adHocAccess,
                KierPropertyOnly : oracle.kierPropertyOnly,
                OTL_x0020_Self_x0020_Service : oracle.otlSelfService,
                OTL_x0020_Timekeeping : oracle.otlTimeKeeping,
                Hyperion : oracle.hyperion,
                BiReporting : oracle.biReporting,
                VCR_x0020_Lump_x0020_Sum: oracle.vcrLumpSumproject,
                VCR_x0020_Conversion: oracle.vcrConversionProject,
                VCR_x0020_Repairs: oracle.vcrRepairs,
                SPM: oracle.vcrSPM,
                Cost_x0020_Center: oracle.costCenter,

                // Access Page
                Network_x0020_Drives: access.drives ? access.drives.map((item) => { 
                    return `${item}`; 
                }).join("\n"):"",
                NetworkDrivesOther: access.customDrives,
                Shared_x0020_Mailboxes: access.mailboxes ? access.mailboxes.map((item) => { 
                    return `${item}`; 
                }).join("\n"):"",
                SharedMailboxesOther: access.customMailboxes,
                Distribution_x0020_Lists: access.distributions ? access.distributions.map((item) => { 
                    return `${item}`; 
                }).join("\n"):"",
                DistributionListsOther: access.customDistributions,
                
                //Approval Page
                Project_x0020_Number: projectDetails.projectNumber,
                Task_x0020_Number: projectDetails.taskNumber,
                Approval_x0020_Cost_x0020_Center: projectDetails.costCenter,
                Financial_x0020_Director: projectDetails.financialDirector,
                WBS: projectDetails.wbs,

                // Review Page
                Cost: state.cost
            }).then(i => {
                commit('formSubmitted');
            }).catch(e => {
                commit('formSubmitFailed'); 
            });
        }
    }
});