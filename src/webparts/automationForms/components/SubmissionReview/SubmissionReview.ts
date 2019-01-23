import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import { requiredIf, required, sameAs } from 'vuelidate/lib/validators';
import { sp } from '@pnp/sp';

export default Vue.extend({
    name: 'submission-review',
    data: () => ({
        acceptTerms: false
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
            var hardwareObj = this.hardware.products;
            return (<any[]>Object.keys(hardwareObj).map(e => hardwareObj[e]).reduce((a: any[],b: any[]) => a.concat(b), [])).map(x => x.price).reduce((a,b) => a + b, 0);
        },
        access() {
            return this.$store.state.access;
        },
        hasHardware() {
            return Object.keys(this.hardware.products).length > 0;
        },
        printAddress (){
            return this.$store.state.hardware.deliveryAddress.replace("\n", ", ");
        }
    },
    methods: {
        back () {
            this.$store.commit('navigate', 5);
        },
        submit () {
            this.$store.dispatch('submitForm');
        }
    },
    mixins: [
        validationMixin
    ],
    validations: {
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