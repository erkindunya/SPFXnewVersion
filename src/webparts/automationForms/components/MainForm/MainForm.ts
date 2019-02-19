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
import { MSGraph } from '../../MSGraph';

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
            username: "Waiting for input...",
            o365License: "",
            customAddress: false
        },
        isAvailable: false,
        firstChoiceUsername: null,
        containsBannedWords: false,
        containsMiddleInital: true,
        bannedWords:[]

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
                if(this.checkBannedWords(username)) {
                    this.formData.username = "Not available for use.";
                    this.isAvailable = false;
                    console.log(username);
                } else {
                    this.formData.username = "Checking account availability. Please wait...";
                    const isAvailable = await this.checkAccountAvailable(username);
                    if(isAvailable) {
                            this.formData.username = username;
                            this.isAvailable = true;
                    } else {
                        if (middleInitial) {
                            this.firstChoiceUsername = username;
                            this.containsMiddleInital = middleInitial ? true : false;
                            return;
                        } else {
                            for(let i = 1; i < 10; i++) {
                                const isAlternativeAvailable = await this.checkAccountAvailable(username + i);
                                if(isAlternativeAvailable) {
                                    this.formData.username = username + i;     
                                    this.firstChoiceUsername =  username;
                                    this.containsMiddleInital = middleInitial ?  true : false;
                                    return;
                                }
                            }
                        }
                        
                        this.formData.username = "No suitable username found, please amend input...";
                        this.isAvailable = false;
                    }
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
            const username = `${this.capitlizeFirstLetter(firstName)}.${this.capitlizeFirstLetter(initial)}${this.capitlizeFirstLetter(surname)}`;
            return username;
        },
        capitlizeFirstLetter(word:string) {
            return word.toLowerCase().replace(/[^a-z.]/g, "").replace(/^\w/,c => c.toUpperCase());
        },
        async checkAccountAvailable(username:string) {
            try {
                // resolve domain '365dev.co.uk'. This can be later hard coded to improve page load time.
                const domain = await sp.web.currentUser.get().then(function(res){ 
                    return res.UserPrincipalName.split("@").pop();
                });
                const filter = `mail eq '${username.toLowerCase() + '@' + domain}'`;
                let user = await MSGraph.Get('/users','v1.0',['mail'],filter,1);
                if (Object.getOwnPropertyNames(user.value).length === 1) {
                    const {data} = await axios.get(`https://kierautomationfunctions.azurewebsites.net/api/IsMcNicholasUser/${username.toLowerCase()}?code=a2lZtRvhxidIZ67jxUVGwGTzRRpAWY2Nuc3RLgx8BFzvEWJFwaKeUA==`);
                    return !data;
                } else {
                    return false;
                }         
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
            this.filterMiddleInitialCharacters(event);
            // 8: backspace, 46: delete
            if ( this.formData.middleInitial.length >= 1 && !(event.keyCode === 8 || event.keyCode === 46 || event.keyCode === 9) ) {
               event.preventDefault();
            }
        },
        filterNonStandardCharacters(event) {
            if (!/[A-Za-z'-]/.test( event.key )) {
               event.preventDefault();
            }
        },
        filterMiddleInitialCharacters(event) {
            if (!/[A-Za-z]/.test( event.key )) {
               event.preventDefault();
            }
        },
        checkBannedWords(username) {
            this.containsBannedWords = false;
            for(var i = 0; i < this.bannedWords.length; i++) {
                if(username.toLowerCase().indexOf(this.bannedWords[i].toLowerCase()) !== -1) {
                    this.containsBannedWords = true;
                } 
            }
            if(this.containsBannedWords) {
                // console.log(this.containsBannedWords);
                return true;
            } else {
                // console.log(this.containsBannedWords);
                return false;
            }
        },
    },
    
    created() { 
        sp.web.lists.getByTitle('BannedWords').items.get().then((items: any[]) => {
            items.forEach(element => {
                this.bannedWords.push(element.Title);
            });
        });
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
                    return this.formData.customAddress;
                })
            },
            townCity: {
                required: requiredIf(function () {
                    return this.formData.customAddress;
                })
            },
            postCode: {
                required: requiredIf(function () {
                    return this.formData.customAddress;
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
                    return !this.formData.customAddress;
                })
            },
            startDate: {
                required
            },
            endDate: {
                isInFuture,
                required: requiredIf(function () {
                    return this.formData.employeeType === 'Contractor';
                })
            },
            o365License: {
                required
            }
        }
    }
});