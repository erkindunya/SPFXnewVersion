<template>
    <div>
    <h2>Approval Information</h2>
    <div class="form-group">
        <label>Company*</label>
        <select class="form-control" v-model="formData.companyName">
            <option>Company 1</option>
            <option>Company 2</option>
        </select>
    </div>
    <div class="form-group">
        <label>Business Unit*</label>
        <select class="form-control" v-model="formData.businessUnit">
            <option>Business Unit 1</option>
            <option>Business Unit 2</option>
        </select>
    </div>
    <div class="form-group">
        <label>Division*</label>
        <select class="form-control" v-model="formData.divisionName">
            <option>Division 1</option>
            <option>Division 2</option>
        </select>
    </div>    
    <div class="form-group">
        <label>Project Number*</label>
        <input type="text" class="form-control" v-model="formData.projectNumber">
    </div>
    <div class="form-group">
        <label>Task Number*</label>
        <input type="text" class="form-control" v-model="formData.taskNumber">
    </div>
    <div class="form-group">
        <label>Financial Director*</label>
        <select class="form-control" v-model="formData.financialDirector">
            <option>FD 1</option>
            <option>FD 2</option>
        </select>
    </div>    
    <div class="row">
        <div class="col">
            <button type="button" class="btn btn-secondary" v-on:click="back">Back</button>
        </div>
        <div class="text-right">
            <button type="button" class="btn btn-primary" v-on:click="submit" :disabled="$v.formData.$invalid">Next</button>
        </div>
    </div>
</div>
</template>
<style scoped src="./ProjectDetails.css"></style>
<script src="./ProjectDetails.js"></script>