import Vue from 'vue';
import Datepicker from 'vuejs-datepicker';
import { validationMixin } from 'vuelidate';
import { required, maxLength, minValue } from 'vuelidate/lib/validators';
import PeoplePicker from '../../common/PeoplePicker.vue';
import { sp } from '@pnp/sp';
import { debounce } from 'lodash';
import {VueSelect} from 'vue-select';

export default Vue.extend({
    name: 'main-form',
    data: () => ({
        formData: {
            firstName: "",
            surname: "",
            middleInitial: "",
            companyName: "",
            businessUnit: "",
            usersSiteAddress: "",
            addressLine1: "",
            county: "",
            postCode: "",
            domainSuffix: "",
            employeeType: "Permanent",
            startDate: new Date(),
            endDate: new Date(),
            jobTitle: "",
            manager: "",
            site: "",
            floorAndRoom: "",
            needsHardwareOrSoftware: "No"
        },
        companies: [],
        businessUnits: [],
        isAvailable: true,
        domainSuffixes: [],
        sites: [],
        jobTitles: [],
        customAddress: false
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
    created() {
        sp.web.lists.getByTitle('DomainSuffixes').items.get().then((items: any[]) => {
            this.domainSuffixes = items.map(item => item.Title);
        });
        sp.web.lists.getByTitle('JobTitles').items.get().then((items: any[]) => {
            this.jobTitles = items.map(item => item.Title);
        });
        sp.web.lists.getByTitle('Sites').items.get().then((items: any[]) => {
            this.sites = items;
        });
        sp.web.lists.getByTitle('Companies').items.get().then((items: any[]) => {
            this.companies = items.map(item => item.Title);
        });
        sp.web.lists.getByTitle('BusinessUnits').items.get().then((items: any[]) => {
            this.businessUnits = items.map(item => item.Title);
        });
    },
    components: {
        Datepicker,
        PeoplePicker,
        VueSelect
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
            companyName: {
                required
            },
            businessUnit: {
                required
            },
            usersSiteAddress: {
                required
            },
            addressLine1: {
                required
            },
            addressLine2: {
                // required
            },
            addressLine3: {
                // required
            },
            county: {
                required
            },
            postCode: {
                required
            },
            domainSuffix: {
                required
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
            employeeType: {
                required
            },
            site: {
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