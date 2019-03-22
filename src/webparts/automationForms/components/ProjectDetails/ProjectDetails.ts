import Vue from 'vue';
import {VueSelect} from 'vue-select';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { sp } from '@pnp/sp';
import ListSelect from '../../common/ListSelect.vue';

export default Vue.extend({
    name: 'project-details',
    data: () => ({
        formData: {
            projectNumber: "",
            taskNumber: "",
            financialDirector: "",
            costCenter: "",
            wbs: ""
        },
        FDOptions: []
    }),
    computed: {
        //replaces formdata.financialDirector to allow for computed vals
        financialDirector: {
            get: function () {
                var formTotal = this.$store.state.cost;
                var reportingUnit = this.$store.state.main.reportingUnit.NSSReportingUnit;
                if(this.formData.financialDirector == "")
                    sp.web.lists.getByTitle('FinancialDirectors').items.filter("Price gt " + formTotal + " and NSSReportingUnit eq '" + reportingUnit.replace("&", "%26") + "'" ).orderBy("Price").get().then((items: any[]) => {
                        this.formData.financialDirector = items[0].Title; 
                    });
                     
                return this.formData.financialDirector;
            },
            set: function (newValue) {
                this.formData.financialDirector = newValue;
            } 
        } 
    },
    created() {
        var items = [];
        sp.web.lists.getByTitle('FinancialDirectors').items.top(2000).get().then((results: any[]) => {
            
            results.forEach(result => {
                if((result.Title) && !(items.indexOf(result.Title) !== -1))
                    items.push(result.Title);
            });
            this.FDOptions = items;
            console.log(this.FDOptions);
        });
    },
    methods: { 
        back() {
            this.$store.commit('navigate', 4);
        },
        submit() {
            this.$store.commit('projectDetailsForm', this.formData);
            this.$store.commit('navigate', 6);
        }
    },
    components: {
        VueSelect,
        ListSelect
    },
    mixins: [
        validationMixin
    ],
    validations: {
        formData: {
            projectNumber: {
                required
            },
            taskNumber: {
                required
            },
            financialDirector: {
                required
            },
            costCenter: {
                required
            }
        }
    }
});