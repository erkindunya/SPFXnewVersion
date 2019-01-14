import VueRouter from 'vue-router';
import Vue from 'vue';
import MainForm from './components/MainForm/MainForm.vue';
import Hardware from './components/Hardware/Hardware.vue';
import Oracle from './components/Oracle/Oracle.vue';
import ProjectDetails from './components/ProjectDetails/ProjectDetails.vue';
import Access from './components/Access/Access.vue';
import SubmissionReview from './components/SubmissionReview/SubmissionReview.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/1', component: MainForm, name: '1' },
    { path: '/2', component: Hardware, name: '2' },
    { path: '/3', component: Oracle, name: '3' },
    { path: '/4', component: Access, name: '4' },
    { path: '/5', component: ProjectDetails, name: '5' },
    { path: '/6', component: SubmissionReview, name: '6' },
    { path: '*', redirect: '1' }
];

const router = new VueRouter({
    routes,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});

export default router;