import Vue from 'vue';
import Datepicker from 'vuejs-datepicker';
import { validationMixin } from 'vuelidate';
import { required, maxLength, requiredIf, minValue } from 'vuelidate/lib/validators';
import PeoplePicker from '../../common/PeoplePicker.vue';
import ListSelect from '../../common/ListSelect.vue';
import { sp } from '@pnp/sp';
import { debounce } from 'lodash';
import {VueSelect} from 'vue-select';
import axios from 'axios';

const now = new Date();
const isInFuture = (value) => value >= now;

export default Vue.extend({
    name: 'main-form',
    data: () => ({
        formData: {
            firstName: "",
            surname: "",
            middleInitial: "",
            reportingUnit: "",
            addressLine1: "",
            postCode: "",
            townCity: "",
            domainSuffix: "@kier.co.uk",
            employeeType: "Permanent",
            startDate: new Date(),
            endDate: new Date(),
            jobTitle: "",
            manager: "",
            site: "",
            floorAndRoom: "",
            username: "Waiting for input..."
        },
        isAvailable: false,
        firstChoiceUsername: null,
        customAddress: false
    }),
    computed: {
        accountName() {
            const { Title: domainSuffix } = this.formData.domainSuffix;
            if (!this.isAvailable || domainSuffix === undefined) {
                return this.formData.username;
            }
            return `${this.formData.username}${domainSuffix}`.toLowerCase();
        },
        managerEmail() {
            const { manager } = this.formData;
            if(!manager || !manager.EntityData) return "Not selected";
            return manager.EntityData.Email || "No email found";
        },
        nameObject() {
            const { firstName, middleInitial, surname} = this.formData;
            return {
                firstName,
                middleInitial,
                surname
            };
        }
    },
    watch: {
        nameObject: debounce(async function() {
            const { firstName, middleInitial, surname} = this.formData;
            const username = this.generateUsername(firstName, middleInitial, surname);
            this.isAvailable = false;
            this.firstChoiceUsername = null;
            if(username == null) {
                this.formData.username = "Waiting for input...";
            } else {
                this.formData.username = "Checking account availability. Please wait...";
                const isAvailable = await this.checkAccountAvailable(username);
                if(isAvailable) {
                    this.formData.username = username;
                    this.isAvailable = true;
                } else {
                    for(let i = 1; i < 10; i++) {
                        const isAlternativeAvailable = await this.checkAccountAvailable(username + i);
                        if(isAlternativeAvailable) {
                            this.formData.username = username + i;
                            this.isAvailable = true;
                            this.firstChoiceUsername = username;
                            return;
                        }
                    }
                    this.formData.username = "No suitable username found, please amend input...";
                    this.isAvailable = false;
                }
            }
        }, 1000)
    },
    methods: {
        generateUsername(firstName, middleInitial, surname) {
            if (firstName.length === 0 || surname.length === 0) {
                return null;
            }
            let initial = middleInitial;
            if (initial.length > 0) {
                initial += '.';
            }
            const username = `${firstName}.${initial}${surname}`.toLowerCase();
            return username;
        },
        async checkAccountAvailable(username) {
            try {
                await sp.web.ensureUser(`i:0#.f|membership|${username}`);
                return false;
            } catch (error) {
                const {data} = await axios.get(`https://kierautomationfunctions.azurewebsites.net/api/IsMcNicholasUser/${username.toLowerCase()}?code=a2lZtRvhxidIZ67jxUVGwGTzRRpAWY2Nuc3RLgx8BFzvEWJFwaKeUA==`);
                return !data;
            }
        },
        submit() {
            this.$store.commit('mainForm', this.formData);
            this.$store.commit('navigate', 2);
        },
        limitMiddleInitialLength(event) {
            this.filterNonStandardCharacters(event);
            // 8: backspace, 46: delete
            if ( this.formData.middleInitial.length >= 1 && !(event.keyCode === 8 || event.keyCode === 46) ) {
               event.preventDefault();
            }
        },
        filterNonStandardCharacters(event) {
            if (!/[A-Za-z'-]/.test( event.key )) {
               event.preventDefault();
            }
        }
    },
    components: {
        Datepicker,
        PeoplePicker,
        VueSelect,
        ListSelect
    },
    mixins: [
        validationMixin
    ],
    validations: {
        isAvailable: {
            isTrue: (value) => value
        },
        formData: {
            firstName: {
                required
            },
            surname: {
                required
            },
            middleInitial: {
                maxLength: maxLength(1),
                required: requiredIf(function () {
                    return this.isAvailable === false && `${this.firstName}${this.surname}`.trim() === '';
                })
            },
            reportingUnit: {
                required
            },
            addressLine1: {
                required: requiredIf(function () {
                    return this.customAddress;
                })
            },
            townCity: {
                required: requiredIf(function () {
                    return this.customAddress;
                })
            },
            postCode: {
                required: requiredIf(function () {
                    return this.customAddress;
                })
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
                required: requiredIf(function () {
                    return !this.customAddress;
                })
            },
            startDate: {
                isInFuture
            },
            endDate: {
                isInFuture,
                required: requiredIf(function () {
                    return this.formData.employeeType === 'Contractor';
                })
            }
        }
    }
});