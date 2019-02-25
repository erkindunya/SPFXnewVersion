import Vue from 'vue';
import { Carousel, Slide } from 'vue-carousel';
import { validationMixin } from 'vuelidate';
import { required, maxLength, requiredIf, minValue } from 'vuelidate/lib/validators';
import { sp, Items } from '@pnp/sp';
import { VueSelect } from 'vue-select';
import ListSelect from '../../common/ListSelect.vue';
import VueMatchHeights from 'vue-match-heights';
import ProjectDetails from '../ProjectDetails/ProjectDetails';

export default Vue.extend({
    name: 'hardware',
    data: () => ({
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
            deliveryAddress: "",
            sccengineer: false,
            selectedMonitor: {
                "name": "",
                "price" : 0
            },
            bimbuild: false,
            deliveryContact: "",
            deliveryContactNumber: "",
            county: "",
            postCode: "",
            isRecycled : false
        },
        showSections: {
            mobile: false,
            software: false,
            computer: false,
            peripherals: false,
            monitors: false,
            skype: false,
            picked: ""
        },
        modalElements: {
            windowCount: 0
        }
    }),
    computed: {
        formData() {
            return {
                products: this.getProducts(),
                mobileLineManager : this.details.mobileLineManager,
                deliveryAddress : this.getDeliveryAddress(),
                sccengineer : this.details.sccengineer,
                bimbuild: this.details.bimbuild,
                isRecycled: this.details.isRecycled
            };
        },
        allSections() {
            const sections = this.sections;
            return {
                ...sections,
                monitors: sections.computer,
                connectors: this.sections.picked == "use-existing"
            };
        },
        sections() {
            return { 
                mobile: this.options.mobile.filter((item) => item.selected).length > 0,
                software: this.options.software.length > 0,
                computer: this.options.computer.filter((item) => item.selected).length > 0,
                peripherals: this.options.peripherals.filter((item) => item.selected).length > 0,
                monitors: this.options.monitors.filter((item) => item.selected).length > 0,
                skype: this.options.skype.filter((item) => item.selected).length > 0
            };
        },
    },
    methods: {
        back() {
            this.$store.commit('navigate', 1);
        },
        submit() {
            this.$store.commit('hardwareForm', this.formData);
            this.$store.commit('navigate', 3);
        },
        selectSingleOption(optionGroup, optionItem, itemSelected, isRecycled) {
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
                        this.options[key].forEach((item) => { softwareArr.push({ name: item.Title, price: item.SoftwarePrice, sccInstall: item.SCC_x0020_Install }); });
                        map[key] = softwareArr;
                    }
                    else if (key == "connectors") {
                        var connectorsArr = [];
                        this.options[key].filter((item) => item.selected).forEach((item) => { connectorsArr.push({ name: item.name, price: 0 }); });
                        map[key] = connectorsArr;
                    }
                    else if (key == "monitors") {
                        var monitorsArr = [];
                        if(this.showSections.picked == "yes" && this.details.selectedMonitor.name != ""){
                            monitorsArr.push({ name: this.details.selectedMonitor.name, price: this.details.selectedMonitor.price }); 
                        }
                        map[key] = monitorsArr;
                    }
                    else if (key == "computer") {
                        var computerArr = [];
                        this.options[key].filter((item) => item.selected).forEach((item) => { 
                            computerArr.push({ 
                                name: item.name, price: this.details.isRecycled ? 300 : item.price, description: item.description
                            }); 
                        });
                        map[key] = computerArr;
                    }
                    else
                        map[key] = this.options[key].filter((item) => item.selected);
                    return map;
                }, {});
        }, 
        getDeliveryAddress(){
            if(this.details.changeAddress)
                return this.details.deliveryContact + "\n" + 
                this.details.deliveryContactNumber + "\n" + 
                this.details.deliveryAddress + "\n" + 
                this.details.county + "\n" +
                this.details.postCode;
            else{
                return this.details.deliveryContact + "\n" + 
                this.details.deliveryContactNumber + "\n" + 
                this.$store.state.main.site.SiteAddress + "\n" + 
                this.$store.state.main.site.SiteTownCity + "\n" + 
                this.$store.state.main.site.SitePostcode;
            }
        },
        setSelectedBar(item){
            Object.keys(this.showSections).forEach(section => {
                if(item != section)
                    this.showSections[section] = false;
            });
            this.showSections[item] = !this.showSections[item];
        },
        callModalWindow() {
            this.modalElements.windowCount += 1;
            if (this.modalElements.windowCount === 1) {
                window.location.href = '#softwareListModal';
            }
        },
        uncheckAll: function() {
            this.details.selectedMonitor = false;
        }
    },
    created() {
        Vue.use(VueMatchHeights);
        sp.web.lists.getByTitle('MobilePackages').items.get().then((items: any[]) => {
            this.options.mobile = items.map(item => ({
                name: item.Title,
                description: item.PackageDescription,
                price: item.Price,
                monthly: item.PricePerMonth,
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
            },
            deliveryContact: {
                required
            },
            deliveryContactNumber: {
                required
            },
            county: {}, 
            postCode: {}
        }
    }
});