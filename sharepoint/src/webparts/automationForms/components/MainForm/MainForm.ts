import Vue from 'vue';
import Datepicker from 'vuejs-datepicker';
import { validationMixin } from 'vuelidate';
import { required, maxLength, minValue } from 'vuelidate/lib/validators';
import PeoplePicker from '../../common/PeoplePicker.vue';
import { sp } from '@pnp/sp';
import { debounce } from 'lodash';

export default Vue.extend({
    name: 'main-form',
    data: () => ({
        formData: {
            firstName: "",
            surname: "",
            middleInitial: "",
            domainSuffix: "@kier.co.uk",
            employeeType: "Permanent",
            startDate: new Date(),
            endDate: new Date(),
            jobTitle: "",
            manager: "",
            site: "Site 1",
            floorAndRoom: "",
            needsHardwareOrSoftware: "No"
        },
        isAvailable: true
    }),
    computed: {
        username() {
            const { firstName, middleInitial, surname} = this.formData;
            if (firstName.length === 0 || surname.length === 0) {
                return null;
            }
            let initial = middleInitial;
            if (initial.length > 0) {
                initial += '.';
            }
            const username = `${firstName}.${initial}${surname}`;
            this.checkAccountAvailable();
            return username;
        },
        accountName() {
            const { domainSuffix } = this.formData;
            if (!this.username) {
                return "First Name and Surname are required.";
            }
            return `${this.username}${domainSuffix}`.toLowerCase();
        },
        managerEmail() {
            const { manager } = this.formData;
            if(!manager || !manager.EntityData) return "Not selected";
            return manager.EntityData.Email || "No email found";
        }
    },
    methods: {
        checkAccountAvailable: debounce(function() {
            if (!this.username) return null;
            sp.web.ensureUser(`i:0#.f|membership|${this.username}`).then(result => {
                this.isAvailable = false;
            }).catch(reason => {
                this.isAvailable = true;
            });
        }),
        submit() {
            this.$store.commit('mainForm', this.formData);
            if (this.formData.needsHardwareOrSoftware === "Yes")
                this.$store.commit('navigate', 2);
            else
                this.$store.commit('navigate', 3);
        }
    },
    components: {
        Datepicker,
        PeoplePicker
    },
    mixins: [
        validationMixin
    ],
    validations: {
        formData: {
            firstName: {
                required
            },
            surname: {
                required
            },
            middleInitial: {
                maxLength: maxLength(1)
            },
            floorAndRoom: {
                required
            },
            manager: {
                required
            },
            jobTitle: {
                required
            },
            startDate: {
                // minValue: minValue(new Date())
            },
            endDate: {
                // minValue: minValue(new Date())
            }
        }
    }
});