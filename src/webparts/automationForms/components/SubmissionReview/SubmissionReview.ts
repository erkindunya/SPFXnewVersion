import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import { requiredIf, required, sameAs } from 'vuelidate/lib/validators';
import { sp } from '@pnp/sp';

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
        fd() {
            return this.$store.state.projectDetails.financialDirector;
        },        
        totalCost() {
            if(!this.hasHardware) {
                return 0;
            }
            
            var hardwareObj = this.hardware;
            return (<any[]>Object.keys(hardwareObj).map(e => hardwareObj[e]).reduce((a: any[],b: any[]) => a.concat(b), [])).map(x => x.price).reduce((a,b) => a + b, 0);
        },
        access() {
            return this.$store.state.access;
        },
        hasHardware() {
            return Object.keys(this.hardware).length > 0;
        },
    },
    methods: {
        back () {
            this.$store.commit('navigate', 5);
        },
        submit () {
            this.$store.commit('summaryForm', {
                address: this.address,
                changeAddress: this.changeAddress
            });
            this.$store.dispatch('submitForm');
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
        keyToTitle (value) {
          if (!value) return '';
          return value.toLowerCase().split(' ').map(function(word) {
            return (word.charAt(0).toUpperCase() + word.slice(1));
          }).join(' ');
        }
      }
});