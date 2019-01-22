<template>
    <div>
        <h2>Summary</h2> 
        <h3>Hardware/Software</h3>
        <div v-if="hasHardware">
            <div v-for="(items, key) in hardware" :key="key">
                <h5>{{key | keyToTitle}}</h5>
                <ul v-if="items.length > 0">
                    <li v-for="(item, itemKey) in items" :key="itemKey">{{item.name}} <span v-if="item.price > 0">- {{item.price}} GBP</span></li>
                </ul>
                <p v-if="items.length === 0">No items selected.</p>
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

        <h3>Delivery Address</h3>
        
        <div class="form-group">
            <label>Would you like to use a different delivery address?</label>
            <div class="form-check form-check-inline">
                <input type="radio" class="form-check-input" v-model="changeAddress" :value="false">
                <label class="form-check-label">No</label>
            </div>
            <div class="form-check form-check-inline">
                <input type="radio" class="form-check-input" v-model="changeAddress" :value="true">
                <label class="form-check-label">Yes</label>
            </div>
        </div>

        <textarea v-if="changeAddress" class="form-control" v-model="address"></textarea>

        
        
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