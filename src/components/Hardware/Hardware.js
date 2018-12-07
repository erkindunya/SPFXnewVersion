import Vue from 'vue';
import { Carousel, Slide } from 'vue-carousel';

export default Vue.extend({
    name: 'hardware',
    data: () => ({
        sections: {
            mobile: false,
            software: false,
            computer: false,
            peripherals: false,
        },
        options: {
            mobile: [
                { image: 'https://via.placeholder.com/500', name: 'Some product', description: 'Some description', price: 520, selected: false },
                { image: 'https://via.placeholder.com/500', name: 'Some product', description: 'Some description', price: 520, selected: false },
                { image: 'https://via.placeholder.com/500', name: 'Some product', description: 'Some description', price: 520, selected: false },
                { image: 'https://via.placeholder.com/500', name: 'Some product', description: 'Some description', price: 520, selected: false },
                { image: 'https://via.placeholder.com/500', name: 'Some product', description: 'Some description', price: 520, selected: false },
                { image: 'https://via.placeholder.com/500', name: 'Some product', description: 'Some description', price: 520, selected: false },
            ],
            software: [
                { name: 'Some product', price: 10, selected: false },
                { name: 'Some product', price: 10, selected: false },
                { name: 'Some product', price: 10, selected: false },
                { name: 'Some product', price: 10, selected: false },
                { name: 'Some product', price: 10, selected: false },
            ],
            computer: [
                { image: 'https://via.placeholder.com/500', name: 'Some product', description: 'Some description', price: 520, selected: false },
                { image: 'https://via.placeholder.com/500', name: 'Some product', description: 'Some description', price: 520, selected: false },
                { image: 'https://via.placeholder.com/500', name: 'Some product', description: 'Some description', price: 520, selected: false },
                { image: 'https://via.placeholder.com/500', name: 'Some product', description: 'Some description', price: 520, selected: false },
                { image: 'https://via.placeholder.com/500', name: 'Some product', description: 'Some description', price: 520, selected: false },
                { image: 'https://via.placeholder.com/500', name: 'Some product', description: 'Some description', price: 520, selected: false },
            ],
            monitors: [
                { name: 'Large Monitor', price: 10, selected: false },
                { name: 'Dual Monitors', price: 10, selected: false },
            ],
            peripherals: [
                { image: 'https://via.placeholder.com/500', name: 'Mouse', description: 'Some description', price: 520, selected: false },
                { image: 'https://via.placeholder.com/500', name: 'Keyboard', description: 'Some description', price: 520, selected: false },
                { image: 'https://via.placeholder.com/500', name: 'Dock', description: 'Some description', price: 520, selected: false },
                { image: 'https://via.placeholder.com/500', name: 'Bag', description: 'Some description', price: 520, selected: false },
                { image: 'https://via.placeholder.com/500', name: 'Lock', description: 'Some description', price: 520, selected: false },
                { image: 'https://via.placeholder.com/500', name: 'Headset', description: 'Some description', price: 520, selected: false },
            ]
        }
    }),
    computed: {
        formData() {
            return Object.keys(this.options)
                .filter(x => this.sections[x])
                .reduce((map, key) => {
                    map[key] = this.options[key].filter((item) => item.selected)
                    return map;
                }, {});
        },
        sections: {
            monitors() {
                return this.sections.computer;
            }
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
    components: {
        Carousel,
        Slide
    }
});