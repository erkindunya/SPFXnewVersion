<template>
    <div>
    <h2>Hardware and Software</h2>
    <div class="form-group">
        <div class="form-check form-check-inline">
            <input type="checkbox" id="MobileRequired" class="form-check-input" v-model="sections.mobile">
            <label class="form-check-label" for="MobileRequired">Mobile</label>
        </div>
    </div>
    <div v-if="sections.mobile">
        <div v-match-heights="{el: ['.card-title', '.card-desc']}">
            <carousel :navigationEnabled="true" :per-page-custom="[[320, 2], [800, 3]]" :space-padding="20">
                <slide v-for="(option, key) in options.mobile" :key="key">
                    <div class="card" :class="{'border border-success': option.selected}">
                        <img class="card-img-top" :src="option.image" :alt="option.name">
                        <div class="card-body">
                            <h5 class="card-title">{{option.name}}</h5>
                            <p class="card-text card-desc">{{option.description}}</p>
                            <p class="card-text"><strong>{{option.price}} GBP</strong></p>
                            <button class="btn" :class="{'btn-primary': !option.selected, 'btn-secondary': option.selected}" @click.prevent="selectSingleOption(options.mobile, option, option.selected)">{{ !option.selected ? 'Select' : 'Remove' }}</button>
                        </div>
                    </div>
                </slide>
            </carousel>
        </div>
        
        <div class="card">
            <div class="card-body">
                <div class="form-group">
                    <label>Manager Employee No.</label>
                    <input type="text" class="form-control" :class="{ 'is-invalid': $v.options.mobileLineManager.$invalid }" v-model="options.mobileLineManager">
                </div>
            </div>
        </div>
    </div>
    <div class="form-group">
        <div class="form-check form-check-inline">
            <input type="checkbox" id="SoftwareRequired" class="form-check-input" v-model="sections.software">
            <label class="form-check-label" for="SoftwareRequired">Software</label>
        </div>
    </div>
    <div v-if="sections.software">
        
            <div class="form-group">
                <p>Select the software you require below. You may select more than one option.</p>
                <list-select v-model="options.software" placeholder="Select the software you require." listName="SoftwarePackages" multiple="true">
                    <template slot="option" slot-scope="option">
                        <strong>{{ option.Title }}</strong>
                        Costs: {{ option.Additional_x0020_Costs }}
                    </template>

                </list-select>
            </div>
        
    </div>
    <div class="form-group"> 
        <div class="form-check form-check-inline">
            <input type="checkbox" id="ComputerRequired" class="form-check-input" v-model="sections.computer">
            <label class="form-check-label" for="ComputerRequired">Computer Package</label>
        </div>
    </div>
    <div v-if="sections.computer">
        <div v-match-heights="{el: ['.card-title', '.card-desc']}">
            <carousel :navigationEnabled="true" :per-page-custom="[[320, 2], [800, 3]]" :space-padding="20"  >
                <slide v-for="(option, key) in options.computer" :key="key">
                    <div class="card" :class="{'border border-success': option.selected}">
                        <img class="card-img-top" :src="option.image" :alt="option.name">
                        <div class="card-body">
                            <h5 class="card-title">{{option.name}}</h5>
                            <p class="card-text card-desc">{{option.description}}</p>
                            <p class="card-text"><strong>{{option.price}} GBP</strong></p>
                            <button class="btn" :class="{'btn-primary': !option.selected, 'btn-secondary': option.selected}" @click.prevent="selectSingleOption(options.computer, option, option.selected)">{{ !option.selected ? 'Select' : 'Remove' }}</button>
                        </div>
                    </div>
                </slide>
            </carousel>
        </div>
        <div class="card" >
            <div class="card-body">
                <div class="form-group" v-for="(option, key) in options.monitors" :key="key">
                    <div class="form-check form-check-inline">
                        <input type="checkbox" class="form-check-input" v-model="option.selected">
                        <label class="form-check-label">{{option.name}} ({{option.price}} GBP)</label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="form-group">
        <div class="form-check form-check-inline">
            <input type="checkbox" id="RequirePeripherals" class="form-check-input" v-model="sections.peripherals">
            <label class="form-check-label" for="RequirePeripherals">Peripherals</label>
        </div>
    </div>
        <div v-if="sections.peripherals" class="card">
        <div class="card-body">
            <div class="form-group" v-for="(option, key) in options.peripherals" :key="key">
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input" v-model="option.selected">
                    <label class="form-check-label">{{option.name}} ({{option.price}} GBP)</label>
                </div>
            </div> 
        </div>
    </div>
    <div class="form-group">
        <div class="form-check form-check-inline">
            <input type="checkbox" id="RequireSkype" class="form-check-input" v-model="sections.skype">
            <label class="form-check-label" for="RequireSkype">Skype</label>
        </div>
    </div>
    <div v-if="sections.skype">
        <carousel  :navigationEnabled="true" :per-page-custom="[[320, 2], [800, 3]]" :space-padding="20">
            <slide v-for="(option, key) in options.skype" :key="key">
                <div class="card" :class="{'border border-success': option.selected}">
                    <img class="card-img-top" :src="option.image" :alt="option.name">
                    <div class="card-body">
                        <h5 class="card-title">{{option.name}}</h5>
                        <p class="card-text">{{option.description}}</p>
                        <p class="card-text"><strong>{{option.price}} GBP</strong></p>
                        <button class="btn" :class="{'btn-primary': !option.selected, 'btn-secondary': option.selected}" @click.prevent="option.selected = !option.selected">{{ !option.selected ? 'Select' : 'Remove' }}</button>
                    </div>
                </div>
            </slide>
        </carousel>
    </div>  
    
    <div class="row">
        <div class="col">
            <button type="button" class="btn btn-secondary" @click.prevent="back">Back</button>
        </div>
        <div class="col text-right">
            <button type="button" class="btn btn-primary" @click.prevent="submit" :disabled="$v.options.$invalid">Next</button>
        </div>
    </div>
</div>
</template>
<style scoped src="./Hardware.css"></style>
<script src="./Hardware.js"></script>