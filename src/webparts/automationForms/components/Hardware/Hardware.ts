import Vue from 'vue';
import { Carousel, Slide } from 'vue-carousel';
import { validationMixin } from 'vuelidate';
import { required, maxLength, requiredIf, minValue } from 'vuelidate/lib/validators';
import { sp, Items } from '@pnp/sp';
import { VueSelect } from 'vue-select';
import ListSelect from '../../common/ListSelect.vue';
import VueMatchHeights from 'vue-match-heights';

export default Vue.extend({
    name: 'hardware',
    data: () => ({
        sections: {
            mobile: false,
            software: false,
            computer: false,
            peripherals: false,
            connectors: false,
            skype: false
        },
        options: {
            mobile: [],
            software: [],
            computer: [],
            monitors: [],
            peripherals: [],
            connectors: [],
            oracle: [],
            skype: []
        },
        details: {
            mobileLineManager : "",
            changeAddress: false,
            deliveryAddress: ""
        }
    }),
    computed: {
        formData() {

            return {
                products: this.getProducts(),
                mobileLineManager : this.details.mobileLineManager,
                deliveryAddress : this.getDeliveryAddress()
            };

        },
        allSections() {
            const sections = this.sections;
            return {
                ...sections,
                monitors: sections.computer
            };
        }
    },
    methods: {
        back() {
            this.$store.commit('navigate', 1);
        },
        submit() {
            console.log(this.formData);
            this.$store.commit('hardwareForm', this.formData);
            this.$store.commit('navigate', 3);
        },
        selectSingleOption(optionGroup, optionItem, itemSelected) {
            optionGroup.forEach(element => {
                element.selected = false;
            });
            optionItem.selected = !itemSelected;
        }, 
        getProducts(){
            return Object.keys(this.options)
                .filter(x => this.allSections[x])
                .reduce((map, key) => {
                    //if software, get from dropdown instead of selected items
                    if (key == "software") {
                        var softwareArr = [];
                        this.options[key].forEach((item) => { softwareArr.push({ name: item.Title, price: 0 }); });
                        map[key] = softwareArr;
                    }
                    else
                        map[key] = this.options[key].filter((item) => item.selected);
                    return map;
                }, {});
        }, 
        getDeliveryAddress(){

            if(this.details.changeAddress)
                return this.details.deliveryAddress;
            else{
                return this.$store.state.main.site.SiteAddress + "\n" + 
                this.$store.state.main.site.SiteTownCity + "\n" + 
                this.$store.state.main.site.SitePostcode;
            }
        }
    },
    created() {
        Vue.use(VueMatchHeights);
        sp.web.lists.getByTitle('MobilePackages').items.get().then((items: any[]) => {
            this.options.mobile = items.map(item => ({
                name: item.Title,
                description: item.PackageDescription,
                price: item.Price,
                image: item.Image.Url,
                selected: false
            }));
        });
        sp.web.lists.getByTitle('SkypePackages').items.get().then((items: any[]) => {
            this.options.skype = items.map(item => ({
                name: item.Title,
                description: item.PackageDescription,
                price: item.Price,
                image: item.Image.Url,
                selected: false
            }));
        });
        sp.web.lists.getByTitle('MonitorConnectors').items.get().then((items: any[]) => {
            this.options.connectors = items.map(item => ({
                name: item.Title,
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
        VueSelect,
        ListSelect,
        VueMatchHeights
    },
    mixins: [
        validationMixin
    ],
    validations: {
        details: {
            mobileLineManager: {
                required: requiredIf(function () {
                    return this.sections.mobile;
                })
            },
            deliveryAddress: {
                required: requiredIf(function () {
                    return this.details.changeAddress;
                })
            }
        }
    }
});