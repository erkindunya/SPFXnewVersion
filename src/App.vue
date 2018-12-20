<template>
<div id="app" class="container">
    <header class="row">
        <div class="col">
            <img src="./images/logo.jpg" alt="Kier">
        </div>
    </header>
    <div class="row main-body">
        <div class="col">
            <h1>New Starter Request Form</h1>
            <div class="progress">
                <div class="progress-bar bg-info" :style="{width: percentCompleted + '%'}">Step {{percentCompleted}}</div>
            </div>
            <main-form v-show="page === 1"></main-form>
            <hardware v-show="page === 2"></hardware>
            <access v-show="page === 3"></access>
            <projectDetails v-show="page === 4"></projectDetails>
            <submission-review v-show="page === 5"></submission-review>
        </div>
    </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import MainForm from './components/MainForm/MainForm.vue';
import Hardware from './components/Hardware/Hardware.vue';
import ProjectDetails from './components/ProjectDetails/ProjectDetails.vue';
import Access from './components/Access/Access.vue';
import SubmissionReview from './components/SubmissionReview/SubmissionReview.vue';

export default Vue.extend({
    name: 'app',
    computed: {
        page() {
            return this.$store.state.page;
        },
        percentCompleted() {
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
</script>

<style lang="scss">
    body {
        background-color: lightgray;
    }
    .container {
        background-color: white;
        border-radius: 5px;
        margin-top: 2em;
        margin-bottom: 2em;
        padding: 2em;
        max-width: 800px;
    }
    header {
        padding-bottom: 2em;

        img {
            display: block;
            margin: 0 auto;
            max-width: 200px;
        }
    }
    h1 {
        text-align: center;
        margin-bottom: 1em;
    }
    h2 {
        margin-bottom: 1em;
    }
    .progress {
        margin-bottom: 2em;
        height: 30px;
        .progress-bar {
            font-size: 1em;
            font-weight: bold;
            text-transform: uppercase;
        }
    }
</style>