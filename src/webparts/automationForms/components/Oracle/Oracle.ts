import Vue from 'vue';
import { Carousel, Slide } from 'vue-carousel';
import { validationMixin } from 'vuelidate';
import { required, maxLength, minValue } from 'vuelidate/lib/validators';
import { sp } from '@pnp/sp';
import {VueSelect} from 'vue-select';
import ListSelect from '../../common/ListSelect.vue';

export default Vue.extend({
    name: 'oracle',
    data: () => ({
        sections: {
            oracle: false
        },
        formOptions : {
            jointVentures : [
                {
                    id : "JointVentureAccessNeeded",
                    name: "Joint Venture (JV) access needed",
                    selected : false
                },
                {
                    id : "RAFAccessNeeded",
                    name: "RAF Lakenheath (JV) access needed",
                    selected : false
                }
            ],
            employeeId : "",
            oracleForBusiness : "",
            adHocAccess : {
                id: "ADHocKWS",
                name: "KWS Facilities management only - Requisition Load for CPA payment (Kier Requisition load User)",
                selected: false
            },
            kierPropertyOnly : [
                {
                    id : "PropertyESSGrossPay",
                    name: "ESS/ MSS Gross Pay Report re Property – Goods receipting",
                    selected : false
                },
                {
                    id : "PropertyCommercialDirector",
                    name: "Property – Commercial Director",
                    selected : false
                },
                {
                    id : "PropertyFinanceStaff",
                    name: "Property Finance staff",
                    selected : false
                },
                {
                    id : "PropertyExtraFunction",
                    name: "Extra functional access for Property Finance staff",
                    selected : false
                }
            ],
            otlSelfService : [
                {
                    id : "SelfServiceBasic",
                    name: "(Kier Employee Self Service) – Basic access – provides payslips/personal details only.",
                    selected : false
                },
                {
                    id : "SelfServiceBasicWithAbsence",
                    name: "(Kier Employee Self Service (with Absence)) – As Basic access, but with holiday booking",
                    selected : false
                },
                {
                    id : "SelfSErviceTimecard",
                    name: "(Kier Self Service Time) -Timecard entry",
                    selected : false
                },
                {
                    id : "SelfServiceTeamDetails",
                    name: "(Kier Manager Self Service) – View team details and approve timecards (if required)",
                    selected : false
                },
                {
                    id : "SelfServiceHoliday",
                    name: "(Kier Line Manager Self Service) – As above but with holiday approvals",
                    selected : false
                }
            ],
            otlTimeKeeping: [
                {
                    id : "otlTimeKeeper",
                    name: "Timekeeper",
                    selected : false
                },
                {
                    id : "otlTimeKeeperGroup",
                    name: "Timekeeper Group Maintenance – Add or remove employees to/from timekeeper groups",
                    selected : false
                },
                {
                    id : "otlSuperTimeKeeper",
                    name: "Super Timekeeper – Can enter time for more than one timekeeper group",
                    selected : false
                },
                {
                    id : "otlFinancialController",
                    name: "Kier OTL Financial Controller access – Access to payroll summary reports",
                    selected : false
                }
            ],
            otlTimeKeepingReportingUnit: "",
            hyperion : [
                {
                    id : "HyperionFinancialManage",
                    name: "Hyperion Financial Management - financial consolidation & reporting for Finance staff",
                    selected : false
                },
                {
                    id : "HyperionPbcs",
                    name: "Hyperion PBCS – Forecasting and project reporting",
                    selected : false
                }
            ],
            biReporting: {
                id : "biReporting",
                name: "Oracle BI reporting",
                selected : false
            },
            vcrLumpSumproject: "",
            vcrConversionProject: "",
            vcrRepairs: "",
            vcrSPM:"",
            costCenter: ""
        }
    }),
    
    computed: {
        formData(){
            return {
                jointVentures : this.getSelectedList(this.formOptions.jointVentures),
                employeeId : this.formOptions.employeeId,
                oracleForBusiness : this.formOptions.oracleForBusiness,
                adHocAccess : this.formOptions.adHocAccess.selected ? this.formOptions.adHocAccess.name : '',
                kierPropertyOnly : this.getSelectedList(this.formOptions.kierPropertyOnly),
                otlSelfService : this.getSelectedList(this.formOptions.otlSelfService),
                otlTimeKeeping: this.getSelectedList(this.formOptions.otlTimeKeeping),
                otlTimeKeepingReportingUnit: this.formOptions.otlTimeKeepingReportingUnit.Title,
                hyperion : this.getSelectedList(this.formOptions.hyperion),
                biReporting : this.formOptions.biReporting.selected ? this.formOptions.biReporting.name : '',
                vcrLumpSumproject: this.formOptions.vcrLumpSumproject ? this.formOptions.vcrLumpSumproject : '',
                vcrConversionProject: this.formOptions.vcrConversionProject ? this.formOptions.vcrConversionProject : '',
                vcrRepairs: this.formOptions.vcrRepairs,
                vcrSPM:this.formOptions.vcrSPM,
                costCenter: this.formOptions.costCenter           
            };
        }
    },
    methods: {
        back () {
            this.$store.commit('navigate', 2);
        },
        submit () {
            console.log(this.formData);
            this.$store.commit('oracleForm', this.formData);
            this.$store.commit('navigate', 4);
        },
        getResponsibilities(responsibilty){
            return this.formOptions.oracleResponsibilities.filter(item => item.name === responsibilty)[0].responsibilities.replace(new RegExp("(?:\r\n|\r|\n)","g"),'<br/>');
        },
        getSelectedList(collection){
            var returnString = "";
            collection.forEach(element => {
                if(element.selected)
                    returnString += (element.name + '\n');
            });

            return returnString;
        }
    },
    created() { 
        sp.web.lists.getByTitle('OracleResponsibilities').items.get().then((items: any[]) => {
            this.formOptions.oracleResponsibilities = items.map(item => ({
                name: item.Title,
                responsibilities: item.Responsibilities
            }));
        });
    },
    components: {
        Carousel,
        Slide,
        VueSelect,
        ListSelect
    },
    mixins: [
        validationMixin
    ],
    validations: {
        formOptions: {
            vcrLumpSumproject: {           
            },
            vcrConversionProject: {},
            vcrRepairs: {},
            vcrSPM: {},
        }
    }
});