<template>
    <div>
        <h2>Summary</h2> 
        <h3>Hardware/Software</h3>
        <div v-if="hasHardware">
            <div v-for="(items, key) in hardware.products" :key="key">
                <h5>{{key | keyToTitle}}</h5>
                <ul v-if="items.length > 0">
                    <li v-for="(item, itemKey) in items" :key="itemKey">{{item.name}} <span v-if="item.price > 0">- {{item.price}} GBP</span></li>
                </ul>
                
                <p v-if="items.length === 0">No items selected.</p>
            </div>
            Delivery charge - 8.00 GBP
            <div v-if="this.hardware.sccengineer">
                SCC Engineer visit - 85.00 GBP
            </div>
            <p><strong>Total</strong> - {{totalCost}} GBP</p>
        </div>
        <p v-if="!hasHardware">No hardware selected.</p>



        <h3>Access</h3>
        <ul v-if="access.length > 0">
            <li v-for="(item, key) in access" :key="key">{{item}}</li>
        </ul>
        <p v-if="access.length === 0">No access selected.</p>
        <h3>Approval Details</h3>
        <p>Financial Director - {{fd}}</p>

        
        <div v-if="hardware.mobileLineManager">
            <h3>Line Manager Employee ID</h3>
            <p>{{hardware.mobileLineManager}}</p>
        </div>

        <h3>Delivery Address</h3>
        <p>{{ printAddress }}</p>        
        
        <div class="form-group">
            <div class="form-check form-check-inline">
                <input type="checkbox" id="accept-terms" class="form-check-input" v-model="acceptTerms" :class="{ 'is-invalid': $v.acceptTerms.$invalid }">
                <label class="form-check-label" for="accept-terms">I confirm the above summary is correct.</label>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <button type="button" class="btn btn-secondary" @click.prevent="back">Back</button>
            </div>
            <div class="col text-right">
                <button type="button" class="btn btn-primary" @click.prevent="submit" :disabled="$v.$invalid">Submit</button>
            </div>
        </div>
    </div>
</template>
<style scoped src="./SubmissionReview.css"></style>
<script src="./SubmissionReview.js"></script>