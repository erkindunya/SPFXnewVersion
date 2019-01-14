import Vue from 'vue';
import {VueSelect} from 'vue-select';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { sp } from '@pnp/sp';

export default Vue.extend({
    name: 'project-details',
    data: () => ({
        formData: {
            projectNumber: "",
            taskNumber: "",
            financialDirector: ""
        }
    }),
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
        VueSelect
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
            }
        }
    }
});