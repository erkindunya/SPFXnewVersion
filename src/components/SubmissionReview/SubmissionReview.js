import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import { requiredIf, required, sameAs } from 'vuelidate/lib/validators';

export default Vue.extend({
    name: 'submission-review',
    data: () => ({
        acceptTerms: false,
        changeAddress: false,
        address: ""
    }),
    computed: {
        main() {
            return this.$store.state.main;
        },
        hardware() {
            return this.$store.state.hardware;
        },
        totalCost() {
            return this.hardware.map(x => x.price).reduce((a,b) => a + b);
        },
        access() {
            return this.$store.state.access;
        }
    },
    methods: {
        back () {
            this.$store.commit('navigate', 3);
        },
        submit () {
            alert('Form submitted.')
        }
    },
    mixins: [
        validationMixin
    ],
    validations: {
        address: {
            requiredIf: requiredIf('changeAddress')
        },
        acceptTerms: {
            required,
            sameAs: sameAs( () => true )
        }
    }
});