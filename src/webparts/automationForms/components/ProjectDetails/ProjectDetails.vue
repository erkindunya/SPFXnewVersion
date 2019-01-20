<template>
    <div>
    <h2>Approval Information</h2>

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
        <vue-select :options="FDOptions" v-model="financialDirector"></vue-select>
            
    </div>        
    <div class="row">
        <div class="col">
            <button type="button" class="btn btn-secondary" @click.prevent="back">Back</button>
        </div>
        <div class="text-right">
            <button type="button" class="btn btn-primary" @click.prevent="submit" :disabled="$v.formData.$invalid">Next</button>
        </div>
    </div>
</div>
</template>
<style scoped src="./ProjectDetails.css"></style>
<script src="./ProjectDetails.js"></script>