<template>
    <div>
    <h2>Hardware and Software</h2>
    <div class="form-group">
        <div class="form-check form-check-inline">
            <input type="checkbox" id="MobileRequired" class="form-check-input" v-model="sections.mobile">
            <label class="form-check-label" for="MobileRequired">Mobile Device</label>
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
                            <p class="card-text"><strong>{{option.price}} GBP + {{option.monthly}} GBP Per Month</strong></p>
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
                    <input type="text" class="form-control" :class="{ 'is-invalid': $v.details.mobileLineManager.$invalid }" v-model="details.mobileLineManager">
                </div>
            </div>
        </div>
    </div>
    
    <div class="form-group"> 
        <div class="form-check form-check-inline">
            <input type="checkbox" id="ComputerRequired" class="form-check-input" v-model="sections.computer">
            <label class="form-check-label" for="ComputerRequired">Computer Package</label>
        </div>
    </div>
    <div v-if="sections.computer" class="smlPadding">
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
        <h2>Monitors</h2>
        <div class="card" >
            <p>Monitors are not included as part of a computer build package, are new monitors required?</p>
            <div class="form-check form-check-inline">
                <input type="checkbox" id="yesMonitors" class="form-check-input" v-model="sections.monitors">
                <label class="form-check-label" for="yesMonitors">Yes</label>
            </div>
            <div class="form-check form-check-inline">
                <input type="checkbox" id="noMonitors" class="form-check-input">
                <label class="form-check-label" for="noMonitors">No</label>
            </div>
            <div class="form-check form-check-inline">
                <input type="checkbox" id="existingMonitors" class="form-check-input" v-model="sections.connectors">
                <label class="form-check-label" for="existingMonitors">Use existing</label>
            </div>
            
            <div v-if="sections.monitors" class="card">
                <div class="card-body">
                    <div class="form-group" v-for="(option, key) in options.monitors" :key="key">
                        <div class="form-check form-check-inline">
                            <input type="checkbox" class="form-check-input" v-model="option.selected">
                            <label class="form-check-label">{{option.name}} ({{option.price}} GBP)</label>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="sections.connectors">
                <carousel :navigationEnabled="true" :per-page-custom="[[320, 2], [800, 3]]" :space-padding="20">
                    <slide v-for="(option, key) in options.connectors" :key="key">
                        <div class="card" :class="{'border border-success': option.selected}">
                            <img class="card-img-top" :src="option.image" :alt="option.name">
                            <div class="card-body">
                                <h5 class="card-title">{{option.name}}</h5>
                                <button class="btn" :class="{'btn-primary': !option.selected, 'btn-secondary': option.selected}" @click.prevent="option.selected = !option.selected">{{ !option.selected ? 'Select' : 'Remove' }}</button>
                            </div>
                        </div>
                    </slide>
                </carousel>
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

    <div class="form-group">
        <h3>Delivery Address</h3>
        <p v-if="!(details.changeAddress)">
            {{ $store.state.main.site.SiteAddress }}<br />
            {{ $store.state.main.site.SiteTownCity }}<br />
            {{ $store.state.main.site.SitePostcode }}<br />
            {{ $store.state.main.site.SiteCounty }}
            </p>
        
        <div class="form-group">
            <label>Would you like to use a different delivery address?</label>
            <div class="form-check form-check-inline">
                <input type="radio" class="form-check-input" selected v-model="details.changeAddress" :value="false">
                <label class="form-check-label">No</label>
            </div>
            <div class="form-check form-check-inline">
                <input type="radio" class="form-check-input" v-model="details.changeAddress" :value="true">
                <label class="form-check-label">Yes</label>
            </div>
        </div>

        <textarea v-if="details.changeAddress" class="form-control" v-model="details.deliveryAddress" :class="{ 'is-invalid': $v.details.deliveryAddress.$invalid }"></textarea>
    </div>
    
    <div class="row">
        <div class="col">
            <button type="button" class="btn btn-secondary" @click.prevent="back">Back</button>
        </div>
        <div class="col text-right">
            <button type="button" class="btn btn-primary" @click.prevent="submit" :disabled="$v.details.$invalid">Next</button>
        </div>
    </div>
</div>
</template>
<style scoped src="./Hardware.css"></style>
<script src="./Hardware.js"></script>