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
            return Object.values(this.hardware).reduce((a,b) => a.concat(b), []).map(x => x.price).reduce((a,b) => a + b);
        },
        access() {
            return this.$store.state.access;
        },
        hasHardware() {
            return Object.keys(this.hardware).length > 0;
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
    },
    filters: {
        keyToTitle: function (value) {
          if (!value) return ''
          return value.toLowerCase().split(' ').map(function(word) {
            return (word.charAt(0).toUpperCase() + word.slice(1));
          }).join(' ');
        }
      }
});