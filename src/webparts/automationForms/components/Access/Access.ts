import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import { required, maxLength, minValue } from 'vuelidate/lib/validators';
import { sp } from '@pnp/sp';

export default Vue.extend({
    name: 'access',
    data: () => ({
        custom: {
            drive: "",
            mailbox: "",
            distribution: ""
        },
        sections: {
            drives: false,
            mailboxes: false,
            distributions: false
        },
        options: {
            drives: [],
            mailboxes: [],
            distributions: []
        }
    }),
    computed: {
        formData() {
            return Object.values(this.options).reduce(function (a, b: any[]) {
                const items = b.filter((item) => item.selected);
                const names = items.map(item => item.name);
                return a.concat(names);
            }, this.customItems);
        },
        customItems() {
            // object.values was erroring
            return [this.custom.drive, this.custom.mailbox, this.custom.distribution].filter(item => item !== "");
        }
    },
    methods: {
        back() {
            console.log(this.formData);
            if (this.$store.state.main.needsHardwareOrSoftware === "Yes") {
                this.$store.commit('navigate', 2);
            }
            else {
                this.$store.commit('navigate', 1);
            }  
        },
        submit() {
            this.$store.commit('accessForm', this.formData);
            this.$store.commit('navigate', 4);
        }
    },
    created() {
        sp.web.lists.getByTitle('NetworkDrives').items.get().then((items: any[]) => {
            this.options.drives = items.map(item => ({
                name: item.Title,
                selected: false
            }));
        });
        sp.web.lists.getByTitle('SharedMailboxes').items.get().then((items: any[]) => {
            this.options.mailboxes = items.map(item => ({
                name: item.Title,
                selected: false
            }));
        });
        sp.web.lists.getByTitle('DistributionLists').items.get().then((items: any[]) => {
            this.options.distributions = items.map(item => ({
                name: item.Title,
                selected: false
            }));
        });
    },
    mixins: [
        validationMixin
    ],
    validations: {
        custom: {
            drive: {

            },
            mailbox: {

            },
            distribution: {

            }
        }
    }
});