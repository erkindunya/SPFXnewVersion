import Vue from 'vue';
import { validationMixin } from 'vuelidate';
import { required, maxLength, minValue } from 'vuelidate/lib/validators';
import { sp } from '@pnp/sp';
import ListSelect from '../../common/ListSelect.vue';
import GraphSelect from '../../common/GraphSelect.vue';
import { MSGraph } from '../../MSGraph';

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
        },
        allOptions: {
            drives: [],
            mailboxes: []
        },
    }),
    computed: {
        formData() {
            return {
                drives: this.getNetworkDrivesList(),
                mailboxes: this.getMailboxList(),
                distributions: this.getDistributionList(),
                customDrives: this.custom.drive,
                customMailboxes: this.custom.mailbox,
                customDistributions: this.custom.distribution,
            };
        },
        customItems() {
            // object.values was erroring
            return [this.custom.drive, this.custom.mailbox, this.custom.distribution].filter(item => item !== "");
        },
        selectedReportingUnit (){
            return this.$store.state.main.reportingUnit.NSSReportingUnit;
        }
    },
    methods: {
        back() {
            this.$store.commit('navigate', 3);
        },
        submit() {
            console.log(this.formData);
            this.$store.commit('accessForm', this.formData);
            this.$store.commit('navigate', 5);
        },
        async updateOptions(){

            sp.web.lists.getByTitle('NetworkDrives').items.filter("NSSReportingUnit eq '" + this.selectedReportingUnit.replace("&", "%26") + "'").get().then((items: any[]) => {
                this.options.drives = items.map(item => ({
                    name: item.Title,
                    selected: false
                }));
            }); 

            await MSGraph.Get('/groups',"v1.0",["mail"],"mailEnabled eq true",999).then((items) => {
                this.options.mailboxes = items.value.map(item => ({
                    name: item.mail,
                    selected: false
                }));
            });
            
            sp.web.lists.getByTitle('DistributionLists').items.filter("NSSReportingUnit eq '" + this.selectedReportingUnit.replace("&", "%26") + "'").get().then((items: any[]) => {
                this.options.distributions = items.map(item => ({
                    name: item.Title,
                    selected: false
                }));
            });
        },
        getNetworkDrivesList () {
            var driveList = [];
            this.options.drives.forEach((item) => { if(item.selected) driveList.push(item.name ); });
            this.allOptions.drives.forEach((item) => { driveList.push(item.Title ); });
            return driveList;
        },
        getMailboxList () {
            var mailboxList = [];
            this.options.mailboxes.forEach((item) => { if(item.selected) mailboxList.push(item.name ); });
            return mailboxList;
        },
        getDistributionList () {
            var distributionsList = [];
            this.options.distributions.forEach((item) => { if(item.selected) distributionsList.push(item.name ); });
            return distributionsList;
        },
    },
    watch: {
        selectedReportingUnit: function(){
            this.sections.drives = false;
            this.sections.mailboxes = false;
            this.sections.distributions = false;
            this.updateOptions();
        }
    },
    created() {
        this.updateOptions();
    },
    components: {
        ListSelect,
        GraphSelect
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