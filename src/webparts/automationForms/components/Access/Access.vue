<template>
    <div>
        <h2>Account Access</h2>
        <div class="form-group">
            <div class="form-check form-check-inline">
                <input type="checkbox" class="form-check-input" id="drives" v-model="sections.drives">
                <label class="form-check-label" for="drives">Network Drives</label>
            </div>
        </div>
        <div v-if="sections.drives" class="card">
            <div class="card-body">
                <div class="form-group" v-for="(option, key) in options.drives" :key="key">
                    <div class="form-check form-check-inline">
                        <input type="checkbox" class="form-check-input" v-bind:id="option.selected" v-model="option.selected">
                        <label class="form-check-label" v-bind:for="option.selected">{{option.name}}</label>
                    </div>
                </div>
                <div class="form-group">
                <p>Other</p>
                <list-select v-model="allOptions.drives" placeholder="Select the network drives you require." listName="NetworkDrives" multiple="true" :lazyLoad="true">
                    <template slot="option" slot-scope="option">
                        <strong>{{ option.Title }}</strong>
                    </template>
                </list-select>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-check form-check-inline">
                <input type="checkbox" id="mailboxes" class="form-check-input" v-model="sections.mailboxes">
                <label class="form-check-label" for="mailboxes">Shared Mailboxes</label>
            </div>
        </div>
        <div v-if="sections.mailboxes" class="card">
            <div class="card-body">
                <div class="form-group" v-for="(option, key) in options.mailboxes" :key="key">
                    <div class="form-check form-check-inline">
                        <input type="checkbox" class="form-check-input" v-bind:id="option.selected" v-model="option.selected">
                        <label class="form-check-label" v-bind:for="option.selected">{{option.name}}</label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Other</label>
                    <input type="text" class="form-control" v-model="custom.mailbox" :class="{ 'is-invalid': $v.custom.mailbox.$invalid }">
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="form-check form-check-inline">
                <input type="checkbox" class="form-check-input" id="distributions" v-model="sections.distributions">
                <label class="form-check-label" for="distributions">Distribution Lists</label>
            </div>
        </div>
        <div v-if="sections.distributions" class="card">
            <div class="card-body">
                <div class="form-group" v-for="(option, key) in options.distributions" :key="key">
                    <div class="form-check form-check-inline">
                        <input type="checkbox" class="form-check-input" v-model="option.selected">
                        <label class="form-check-label">{{option.name}}</label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Other</label>
                    <input type="text" class="form-control" v-model="custom.distribution" :class="{ 'is-invalid': $v.custom.distribution.$invalid }">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <button type="button" class="btn btn-secondary" @click.prevent="back">Back</button>
            </div>
            <div class="col text-right">
                <button type="button" class="btn btn-primary" @click.prevent="submit" :disabled="$v.$invalid">Next</button>
            </div>
        </div>
    </div>
</template>
<style scoped src="./Access.css"></style>
<script src="./Access.js"></script>