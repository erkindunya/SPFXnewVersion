<template>
  <div id="app-automation-forms" class="container">
    <header class="row">
          <div class="col">
              <img src="../logo.jpg" alt="Kier">
          </div>
      </header>
      <div class="row main-body">
          <div class="col">
              <h1>New Starter Request Form</h1>
              <div class="progress">
                  <div class="progress-bar bg-info" :style="{width: percentCompleted + '%'}">{{percentCompleted}}%</div>
              </div>
              <main-form v-show="page === 1"></main-form>
              <hardware v-show="page === 2"></hardware>
              <access v-show="page === 3"></access>
              <project-details v-show="page === 4"></project-details>
              <submission-review v-show="page === 5"></submission-review>
          </div>
      </div>
  </div>
</template>

<style src="./AutomationForms.css"></style>
<script src="./AutomationForms.js"></script>