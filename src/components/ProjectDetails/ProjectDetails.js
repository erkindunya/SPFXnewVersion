import Vue from 'vue';
import Datepicker from 'vuejs-datepicker';
import { validationMixin } from 'vuelidate';
import { required, maxLength, minValue } from 'vuelidate/lib/validators';

export default Vue.extend({
    name: 'projectDetails',
    data: () => ({
        formData: {
            companyName: "Company 1",
            businessUnit: "Business Unit 1", 
            divisionName: "Division 1",
            projectNumber: "1234",
            taskNumber: "1234",
            financialDirector: "FD 1"
        }
    }),
    methods: {
        back () {
            this.$store.commit('navigate', 3);
        },
        submit () {
            this.$store.commit('projectDetailsForm', this.formData);
            this.$store.commit('navigate', 5);
        }
    },
    mixins: [
        validationMixin
    ],
    validations: {
        formData: {
            companyName: {
                required
            },
            businessUnit: {
                required
            },
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