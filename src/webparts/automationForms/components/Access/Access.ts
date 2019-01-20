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
            return Object.keys(this.options).map(itm => this.options[itm]).reduce(function (a, b: any[]) {
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
            this.$store.commit('navigate', 3);
        },
        submit() {
            this.$store.commit('accessForm', this.formData);
            this.$store.commit('navigate', 5);
        }
    },
    created() {
        var reportingUnit = this.$store.state.main.reportingUnit.NSSReportingUnit;

        sp.web.lists.getByTitle('NetworkDrives').items.filter("NSSReportingUnit eq '" + reportingUnit.replace("&", "%26") + "'").get().then((items: any[]) => {
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
        sp.web.lists.getByTitle('DistributionLists').items.filter("NSSReportingUnit eq '" + reportingUnit.replace("&", "%26") + "'").get().then((items: any[]) => {
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