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
        formData: {
            oracleForBusiness: "",
            adHocAccessESS: false,
            adHocAccessKWS: false,
            kierPropertyOnlyESS: false,
            kierPropertyOnlyESSPropertyCom: false,
            kierPropertyOnlyESSPropertyFin: false,
            kierPropertyOnlyExtra: false,
            hyperionFinancialManagement: false,
            hyperionPBCS: false,
            biOracleBIReporting: false,
            vcrLumpSumproject: "",
            vcrConversionProject: "",
            vcrRepairs: "",
            vcrSPM:"",
            oEmployeeKESSBasic: false,
            oEmployeeKESSBasicWAbsence: false,
            oEmployeeKSST: false,
            oEmployeeKMSS: false,
            oEmployeeKLMS: false,
            oTimeTimekeeper: false,
            oTimeTimekeeperGroup: false,
            oTimeSuperTimekeeper: false,
            oKierOTL: false,
            employeeId: "",
            costCenter: "",
            oracleResponsibilities: [],
            jointVentureAccess: false,
            rafLakenheathAccess: false
        }
    }),
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
            return this.formData.oracleResponsibilities.filter(item => item.name === responsibilty)[0].responsibilities.replace(new RegExp("(?:\r\n|\r|\n)","g"),'<br/>');
            }
    },
    created() { 
        sp.web.lists.getByTitle('OracleResponsibilities').items.get().then((items: any[]) => {
            this.formData.oracleResponsibilities = items.map(item => ({
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
        formData: {
            vcrLumpSumproject: {           
            },
            vcrConversionProject: {},
            vcrRepairs: {},
            vcrSPM: {},
        }
    }
});