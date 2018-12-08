import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import { required, maxLength, minValue } from 'vuelidate/lib/validators';

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
            drives: [
                { name: 'Some product', selected: false },
                { name: 'Some product', selected: false },
                { name: 'Some product', selected: false },
                { name: 'Some product', selected: false },
                { name: 'Some product', selected: false },
            ],
            mailboxes: [
                { name: 'Some product', selected: false },
                { name: 'Some product', selected: false },
                { name: 'Some product', selected: false },
                { name: 'Some product', selected: false },
                { name: 'Some product', selected: false },
            ],
            distributions: [
                { name: 'Some product', selected: false },
                { name: 'Some product', selected: false },
                { name: 'Some product', selected: false },
                { name: 'Some product', selected: false },
                { name: 'Some product', selected: false },
            ]
        }
    }),
    computed: {
        formData() {
            return Object.values(this.options).reduce(function(a, b) {
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
        back () {
            this.$store.commit('navigate', 2);
        },
        submit () {
            this.$store.commit('accessForm', this.formData);
            this.$store.commit('navigate', 4);
        }
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