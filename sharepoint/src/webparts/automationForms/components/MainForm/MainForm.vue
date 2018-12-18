<template>
<div>
    <h2>General Information</h2>
    <div class="form-group">
        <label>First Name*</label>
        <input type="text" class="form-control" v-model="formData.firstName" :class="{ 'is-invalid': $v.formData.firstName.$invalid }">
    </div>
    <div class="form-group">
        <label>Surname*</label>
        <input type="text" class="form-control" v-model="formData.surname" :class="{ 'is-invalid': $v.formData.surname.$invalid }">
    </div>
    <div class="form-group">
        <label>Middle Initial*</label>
        <input type="text" class="form-control" v-model="formData.middleInitial" :class="{ 'is-invalid': $v.formData.middleInitial.$invalid }">
    </div>
    <div class="form-group">
        <label>Domain Suffix</label>
        <vue-select v-model="formData.domainSuffix" :options="domainSuffixes" :class="{ 'is-invalid': $v.formData.domainSuffix.$invalid }"></vue-select>
    </div>
    <div class="form-group">
        <label>Computed Account Name</label>
        <p>{{accountName}} - {{ isAvailable ? "Available" : "Unavailable" }}</p>
    </div>
    <div class="form-group">
        <label>Employee Type*</label>
        <vue-select :options="['Permanent', 'Contractor', 'Blue Collar']" v-model="formData.employeeType" :class="{ 'is-invalid': $v.formData.employeeType.$invalid }"></vue-select>
    </div>
    <div class="form-group">
        <label>Start Date*</label>
        <datepicker v-model="formData.startDate" :input-class="{ 'is-invalid': $v.formData.startDate.$invalid, 'form-control': true }"></datepicker>
    </div>
    <div class="form-group" v-if="formData.employeeType === 'Contractor'">
        <label>End Date*</label>
        <datepicker v-model="formData.endDate" :input-class="{ 'is-invalid': $v.formData.endDate.$invalid, 'form-control': true }"></datepicker>
    </div>
    <div class="form-group">
        <label>Job Title*</label>
        <vue-select v-model="formData.jobTitle" :options="jobTitles" :class="{ 'is-invalid': $v.formData.jobTitle.$invalid }"></vue-select>
    </div>
    <div class="form-group">
        <label>Manager*</label>
        <people-picker v-model="formData.manager" :class="{ 'is-invalid': $v.formData.manager.$invalid }"></people-picker>
    </div>
    <div class="form-group">
        <label>Manager Email</label>
        <p>{{managerEmail}}</p>
    </div>
    <div class="form-group">
        <label>Site</label>
        <vue-select v-model="formData.site" :options="sites" :class="{ 'is-invalid': $v.formData.site.$invalid }"></vue-select>
    </div>
    <div class="form-group">
        <label>Floor and Room*</label>
        <input type="text" class="form-control" v-model="formData.floorAndRoom" :class="{ 'is-invalid': $v.formData.floorAndRoom.$invalid }">
    </div>
    <div class="form-group">
        <label>Do you need hardware or software?</label>
        <div class="form-check form-check-inline">
            <input type="radio" class="form-check-input" v-model="formData.needsHardwareOrSoftware" value="No">
            <label class="form-check-label">No</label>
        </div>
        <div class="form-check form-check-inline">
            <input type="radio" class="form-check-input" v-model="formData.needsHardwareOrSoftware" value="Yes">
            <label class="form-check-label">Yes</label>
        </div>
    </div>
    <div class="text-right">
        <button type="button" class="btn btn-primary" v-on:click="submit" :disabled="$v.formData.$invalid">Next</button>
    </div>
</div>
</template>
<style scoped src="./MainForm.css"></style>
<script src="./MainForm.js"></script>