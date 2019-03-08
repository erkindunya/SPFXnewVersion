<template>
    <div>
        <h2>Summary</h2> 
        <h3>Hardware/Software</h3>
        <div v-if="hasHardware">
            <div v-for="(items, key) in hardware.products" :key="key">
                <h5>{{key | keyToTitle}}</h5>
                <div v-if="key === 'computer' && hardware.bimbuild">
                    <p>A BIM build is required</p>
                </div>
                <div v-if="key === 'computer' && hardware.isRecycled === true">
                    <p>Recycled item is required</p>
                </div>
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
        <h5>Network Drives</h5>
        <ul v-if="access.drives.length > 0">
            <li v-for="(item, key) in access.drives" :key="key">{{item}}</li>
        </ul>
        <h6 v-if="access.customDrives">Other Network Drives</h6>
        <ul v-if="access.customDrives">
            <li>{{access.customDrives}}</li>
        </ul>
        <h5>Mailboxes</h5>
        <ul v-if="access.mailboxes.length > 0">
            <li v-for="(item, key) in access.mailboxes" :key="key">{{item}}</li>
        </ul>
        <h6 v-if="access.customMailboxes">Other Mailboxes</h6>
        <ul v-if="access.customMailboxes">
            <li>{{access.customMailboxes}}</li>
        </ul>
        <h5>Distribution Lists</h5>
        <ul v-if="access.distributions.length > 0">
            <li v-for="(item, key) in access.distributions" :key="key">{{item}}</li>
        </ul>
        <h6 v-if="access.customDistributions">Other Distribution Lists</h6>
        <ul v-if="access.customDistributions">
            <li>{{access.customDistributions}}</li>
        </ul>
        <p v-if="access.length === 0">No access selected.</p>
        <h3>Approval Details</h3>
        <p>Financial Director - {{fd}}</p>

        
        <div v-if="hardware.mobileLineManager">
            <h3>Line Manager Employee ID</h3>
            <p>{{hardware.mobileLineManager}}</p>
        </div>
        <div v-if="hasHardware">
            <h3>Delivery Address</h3>
            <p v-html="printAddress"></p>   
        </div>
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