import Vue from 'vue';
import { Carousel, Slide } from 'vue-carousel';
import { validationMixin } from 'vuelidate';
import { required, maxLength, minValue } from 'vuelidate/lib/validators';
import { sp } from '@pnp/sp';
import {VueSelect} from 'vue-select';

export default Vue.extend({
    name: 'hardware',
    data: () => ({
        sections: {
            mobile: false,
            software: false,
            computer: false,
            peripherals: false
        },
        options: {
            mobile: [],
            software: [],
            computer: [],
            monitors: [],
            peripherals: [],
            oracle: []
        }
    }),
    computed: {
        formData() {
            return Object.keys(this.options)
                .filter(x => this.allSections[x])
                .reduce((map, key) => {
                    map[key] = this.options[key].filter((item) => item.selected);
                    return map;
                }, {});
        },
        allSections () {
            const sections = this.sections;
            return {
                ...sections,
                monitors:sections.computer
            };
        }
    },
    methods: {
        back () {
            this.$store.commit('navigate', 1);
        },
        submit () {
            this.$store.commit('hardwareForm', this.formData);
            this.$store.commit('navigate', 3);
        }
    },
    created() {
        sp.web.lists.getByTitle('MobilePackages').items.get().then((items: any[]) => {
            this.options.mobile = items.map(item => ({
                name: item.Title,
                description: item.PackageDescription,
                price: item.Price,
                image: item.Image.Url,
                selected: false
            }));
        });
        sp.web.lists.getByTitle('ComputerPackages').items.get().then((items: any[]) => {
            this.options.computer = items.map(item => ({
                name: item.Title,
                description: item.PackageDescription,
                price: item.Price,
                image: item.Image.Url,
                selected: false
            }));
        });
        sp.web.lists.getByTitle('PeripheralPackages').items.get().then((items: any[]) => {
            this.options.peripherals = items.map(item => ({
                name: item.Title,
                description: item.PackageDescription,
                price: item.Price,
                image: item.Image.Url,
                selected: false
            }));
        });
        sp.web.lists.getByTitle('SoftwarePackages').items.get().then((items: any[]) => {
            this.options.software = items.map(item => ({
                name: item.Title,
                price: item.Price,
                selected: false
            }));
        });
        sp.web.lists.getByTitle('MonitorPackages').items.get().then((items: any[]) => {
            this.options.monitors = items.map(item => ({
                name: item.Title,
                price: item.Price,
                selected: false
            }));
        });
    },
    components: {
        Carousel,
        Slide,
        VueSelect
    },
    mixins: [
        validationMixin
    ],
    validations: {
    }
});