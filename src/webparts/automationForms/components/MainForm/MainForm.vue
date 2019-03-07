<template>
<div>
    <h2>General Information</h2>
    <div class="form-group">
        <label for="generalFirstName">First Name*</label>
        <input type="text" maxlength="255" class="form-control" id="generalFirstName" @keydown="filterNonStandardCharacters($event)" v-model="formData.firstName" :class="{ 'is-invalid': $v.formData.firstName.$invalid }" @paste.prevent>
    </div>
    <div class="form-group">
        <label>Surname*</label>
        <input type="text" maxlength="255" class="form-control" @keydown="filterNonStandardCharacters($event)" v-model="formData.surname" :class="{ 'is-invalid': $v.formData.surname.$invalid }" @paste.prevent>
    </div>
    <div class="form-group">
        <label>Middle Initial</label>
        <input type="text" maxlength="1" class="form-control" @keydown="limitMiddleInitialLength($event)" v-model="formData.middleInitial" :class="{ 'is-invalid': $v.formData.middleInitial.$invalid }" @paste.prevent>
    </div>
    <div class="form-group">
        <label>Email Suffix</label>
        <list-select v-model="formData.domainSuffix" listName="DomainSuffixes" :class="{ 'is-invalid': $v.formData.domainSuffix.$invalid }"></list-select>
    </div>
    <div class="form-group">
        <label>Username Validation</label>
        <p v-if="!firstChoiceUsername" class="alert" :class="containsBannedWords ? 'alert-warning':'alert-success'">{{formData.username}}</p>
        <p v-if="firstChoiceUsername && containsMiddleInital" class="alert alert-warning">"{{firstChoiceUsername}}" is not available. Please try a different middle initial.</p>
        <p v-if="firstChoiceUsername && !containsMiddleInital" class="alert alert-warning">"{{firstChoiceUsername}}" is not available. Please try adding a middle initial.</p>
    </div>
    <div class="form-group">
        <label>Reporting Unit*</label>
        <list-select v-model="formData.reportingUnit" listName="ReportingUnits" :label="NSSReportingUnit" :class="{ 'is-invalid': $v.formData.reportingUnit.$invalid }">
            <template slot="option" slot-scope="option">
                <strong>{{ option.NSSReportingUnit }}</strong><br />
                Business Unit: {{ option.NSSBusinessUnit }}
            </template>
        </list-select>
    </div>
    <div class="form-group">
        <label>Job Title*</label>
        <list-select v-model="formData.jobTitle" listName="JobTitles" :class="{ 'is-invalid': $v.formData.jobTitle.$invalid }" :lazyLoad="true"></list-select>
    </div>
    <div class="form-group">
        <label class="form-check-label-sub">Which statement best describes this New Starter?*</label>
        <list-select listName="LicenceTypes" v-model="formData.o365License" :class="{ 'is-invalid': $v.formData.o365License.$invalid }"></list-select>
    </div>
    <div class="form-group">
        <label>Employee Type*</label>
        <vue-select :options="['Permanent', 'Contractor']" v-model="formData.employeeType" :class="{ 'is-invalid': $v.formData.employeeType.$invalid }"></vue-select>
    </div>
    <div class="form-group">
        <label>Start Date*</label> 
        <datepicker v-model="formData.startDate" :input-class="{ 'is-invalid': $v.formData.startDate.$invalid, 'form-control': true, 'showAsEnabled':true }"></datepicker>
    </div>
    <div class="form-group" v-if="formData.employeeType === 'Contractor'">
        <label>End Date*</label>
        <datepicker v-model="formData.endDate" :input-class="{ 'is-invalid': $v.formData.endDate.$invalid, 'form-control': true, 'showAsEnabled':true }"></datepicker>
    </div>
    <div class="form-group">
        <label>Manager*</label>
        <people-picker v-model="formData.manager" :class="{ 'is-invalid': $v.formData.manager.$invalid }"></people-picker>
    </div>
    <div class="form-group">
        <label>Manager Email</label>
        <p>{{managerEmail}}</p>
    </div>
    <div class="form-group" v-if="!formData.customAddress">
        <label>Site</label>
        <small>(Can't find your site? <a href="#" @click.prevent="formData.customAddress = true">Click here to enter a custom address</a>)</small>
        <list-select v-model="formData.site" listName="Sites" :class="{ 'is-invalid': $v.formData.site.$invalid }" :lazyLoad="false">
            <template slot="option" slot-scope="option">
                <strong>{{ option.Title }}</strong><br />
                {{ option.SiteAddress }}<br />
                {{ option.SitePostcode }}
            </template>
        </list-select>
        <div v-if="formData.site">
            {{formData.site.SiteAddress}}<br />
            {{formData.site.SiteTownCity}}<br />
            {{formData.site.SitePostcode}}
        </div>
    </div>
    <div v-if="formData.customAddress">
        <hr>
        <h5>New Site Address</h5>
        <p>Requires approval (<a href="#" @click.prevent="formData.customAddress = false">Click here to select from existing options</a>)</p>
        
        <div class="form-group">
            <label>Site Name</label>
            <input type="text" class="form-control" v-model="formData.siteName" :class="{ 'is-invalid': $v.formData.siteName.$invalid }" @paste.prevent>
        </div>
        <div class="form-group">
            <label>Site Name</label>
            <input type="text" class="form-control" v-model="formData.siteName" :class="{ 'is-invalid': $v.formData.siteName.$invalid }" @paste.prevent>
        </div>
        <div class="form-group">
            <label>Site Address</label>
            <input type="text" class="form-control" v-model="formData.addressLine1" :class="{ 'is-invalid': $v.formData.addressLine1.$invalid }" @paste.prevent>
        </div>
        <div class="form-group">
            <label>Town City</label>
            <input type="text" class="form-control" v-model="formData.townCity" :class="{ 'is-invalid': $v.formData.townCity.$invalid }" @paste.prevent>
        </div>
        <div class="form-group">
            <label>Postcode</label>
            <input type="text" class="form-control" v-model="formData.postCode" :class="{ 'is-invalid': $v.formData.postCode.$invalid }" @paste.prevent>
        </div>
        <hr>
    </div>
    <div class="form-group">
        <label>Floor and Room*</label>
        <input type="text" maxlength="255" class="form-control" v-model="formData.floorAndRoom" :class="{ 'is-invalid': $v.formData.floorAndRoom.$invalid }" @paste.prevent>
    </div>
    <div class="text-right">
        <button type="button" class="btn btn-primary" @click.prevent="submit" :disabled="$v.formData.$invalid">Next</button>
        <!-- <button type="button" class="btn btn-primary" @click.prevent="submit" >Next</button> -->
    </div>
</div>
</template>
<style scoped src="./MainForm.css"></style>
<script src="./MainForm.js"></script>