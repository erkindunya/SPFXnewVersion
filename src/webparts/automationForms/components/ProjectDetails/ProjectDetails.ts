import Vue from 'vue';
import {VueSelect} from 'vue-select';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { sp } from '@pnp/sp';

export default Vue.extend({
    name: 'project-details',
    data: () => ({
        formData: {
            // companyName: "",
            // businessUnit: "",
            // divisionName: "",
            projectNumber: "1234",
            taskNumber: "1234",
            financialDirector: "FD 1"
        }
        // companies: [],
        // businessUnits: [],
        // divisions: []
    }),
    methods: {
        back() {
            this.$store.commit('navigate', 3);
        },
        submit() {
            this.$store.commit('projectDetailsForm', this.formData);
            this.$store.commit('navigate', 5);
        }
    },
    created () {
        // sp.web.lists.getByTitle('Companies').items.get().then((items: any[]) => {
        //     this.companies = items.map(item => item.Title);
        // });
        // sp.web.lists.getByTitle('Divisions').items.get().then((items: any[]) => {
        //     this.divisions = items.map(item => item.Title);
        // });
        // sp.web.lists.getByTitle('BusinessUnits').items.get().then((items: any[]) => {
        //     this.businessUnits = items.map(item => item.Title);
        // });
    },
    components: {
        VueSelect
    },
    mixins: [
        validationMixin
    ],
    validations: {
        formData: {
            // companyName: {
            //     required
            // },
            // businessUnit: {
            //     required
            // },
            divisionName: {
                required
            },
            projectNumber: {
                required
            },
            taskNumber: {
                required
            },
            financialDirector: {
                required
            }
        }
    }
});