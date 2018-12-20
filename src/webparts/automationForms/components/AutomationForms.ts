import Vue from 'vue';
import MainForm from './MainForm/MainForm.vue';
import Hardware from './Hardware/Hardware.vue';
import ProjectDetails from './ProjectDetails/ProjectDetails.vue';
import Access from './Access/Access.vue';
import SubmissionReview from './SubmissionReview/SubmissionReview.vue';

export default Vue.extend({
    name: 'app',
    computed: {
        page(): number {
            return this.$store.state.page;
        },
        percentCompleted(): number {
            return this.page / 5 * 100;
        }
    },
    components: {
        MainForm,
        Hardware,
        Access,
        ProjectDetails,
        SubmissionReview
    }
});