<template>
    <div>
        <h2>Hardware and Software</h2>

        <div class="accordian-container">
            <div class="accordian-head" :class="showSections.mobile ? 'active' : ''" @click.prevent="setSelectedBar('mobile')">
                <h4>Mobile Devices</h4>
                <span>{{ options["mobile"].filter((item) => item.selected).length }} Items Selected</span>
            </div>
            <div class="accordian-body">
                <div id="ContainerMobile" v-if="showSections.mobile">
                    <div v-match-heights="{el: ['#ContainerMobile .card-title', '#ContainerMobile .card-desc']}">
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
            </div>
        </div>

        <div class="accordian-container">
            <div class="accordian-head" :class="showSections.computer ? 'active' : ''" @click.prevent="setSelectedBar('computer')">
                <h4>Computer Packages</h4>
                <span>{{ options["computer"].filter((item) => item.selected).length }} Items Selected</span>
            </div>
            <div class="accordian-body">
                <div id="ContainerComputer" v-if="showSections.computer" class="smlPadding">
                    <ul>
                        <li>Computer packages <strong>do not </strong>include a keyboard, mouse, docking station or monitor; these must be purchased separately.</li>
                        <li>There is a <strong>£8</strong> delivery charge for all Computers, Laptops and Monitors from SCC.</li> 
                    </ul>
                    <div class="form-group check-padding">
                        <input type="checkbox" class="form-check-input" v-model="details.sccengineer" /><Strong>An SCC engineer is required, there will be an additional £85 fee. </strong>The SCC engineer will set up your device, connect to local printer and take you through first logon to make sure you are working. If you are having an existing device replace the SCC engineer will conduct local data transfer and copy you desktop profile to your new device.
                    </div>
                    <div class="form-group check-padding">
                        <input type="checkbox" class="form-check-input" v-model="details.bimbuild" /><Strong>A BIM build is required.</strong>
                    </div>                    
                    <div v-match-heights="{el: ['#ContainerComputer .card-title', '#ContainerComputer .card-desc']}">
                        <carousel :navigationEnabled="true" :per-page-custom="[[320, 2], [800, 3]]" :space-padding="20"  >
                            <slide v-for="(option, key) in options.computer" :key="key">
                                <div class="card" :class="{'border border-success': option.selected}">
                                    <img class="card-img-top" :src="option.image" :alt="option.name">
                                    <div class="card-body">
                                        <h5 class="card-title">{{option.name}}</h5>
                                        <p class="card-text card-desc">{{option.description}}</p>
                                        <p v-if="!option.isRecycled" class="card-text"><strong>{{option.price}} GBP</strong></p>
                                        <p v-if="option.isRecycled" class="card-text"><strong>300.00 GBP</strong></p>
                                        <div class="form-check form-check-inline">
                                            <input type="checkbox" for="isRecycled" v-model="option.isRecycled">
                                            <label class="form-check-label"  id="isRecycled">Recycled</label>
                                        </div>
                                        <button class="btn" v-on:click.once="callModalWindow()" :class="{'btn-primary': !option.selected, 'btn-secondary': option.selected}" @click.prevent="selectSingleOption(options.computer, option, option.selected)">{{ !option.selected ? 'Select' : 'Remove' }}</button>
                                    </div>
                                </div>
                            </slide> 
                        </carousel>
                    </div>
                    <h2>Monitors</h2>
                    <div class="form-group" >
                        <p>Monitors are not included as part of a computer build package, are new monitors required?</p>
                        <div class="form-group" id="monitorRadio">
                            <input type="radio" id="yesMonitors" value="yes" v-model="showSections.picked">  Yes <br>
                            <input type="radio" id="noMonitors" value="no" v-model="showSections.picked" @click="uncheckAll">  No <br>
                            <input type="radio" id="existingMonitors" value="use-existing" v-model="showSections.picked" @click="uncheckAll">  Use existing
                        </div>
                        <div v-if="showSections.picked == 'yes'" class="card">
                            <div class="card-body">
                                <div class="form-group" v-for="(option, key) in options.monitors" :key="key">
                                    <div class="form-check form-check-inline">
                                        <input type="radio" class="form-check-input" v-model="details.selectedMonitor" :value="option.name">
                                        <label class="form-check-label">{{option.name}} ({{option.price}} GBP)</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="showSections.picked == 'use-existing'">
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
            </div>
        </div>

        <div class="accordian-container">
            <div class="accordian-head" :class="showSections.software ? 'active' : ''" @click.prevent="setSelectedBar('software')">
                <h4>Software</h4>
                <span>{{ options.software.length }} Items Selected</span>
            </div>
            <div class="accordian-body">
                <div v-if="showSections.software">
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
            </div>
        </div>
        
        <div class="accordian-container">
            <div class="accordian-head" :class="showSections.peripherals ? 'active' : ''" @click.prevent="setSelectedBar('peripherals')">
                <h4>Peripherals</h4>
                <span>{{ options["peripherals"].filter((item) => item.selected).length }} Items Selected</span>
            </div>
            <div class="accordian-body">
                <div v-if="showSections.peripherals" class="card">
                    <div class="card-body">
                        <div class="form-group" v-for="(option, key) in options.peripherals" :key="key">
                            <div class="form-check form-check-inline">
                                <input type="checkbox" class="form-check-input" v-model="option.selected">
                                <label class="form-check-label">{{option.name}} ({{option.price}} GBP)</label>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        
        <div class="accordian-container">
            <div class="accordian-head" :class="showSections.skype ? 'active' : ''" @click.prevent="setSelectedBar('skype')">
                <h4>Skype</h4>
                <span>{{ options["skype"].filter((item) => item.selected).length }} Items Selected</span>
            </div>
            <div class="accordian-body">
                <div id="ContainerSkype" v-if="showSections.skype">
                    <div v-match-heights="{el: ['#ContainerSkype .card-title', '#ContainerSkype .card-desc']}">
                        <carousel  :navigationEnabled="true" :per-page-custom="[[320, 2], [800, 3]]" :space-padding="20">
                            <slide v-for="(option, key) in options.skype" :key="key">
                                <div class="card" :class="{'border border-success': option.selected}">
                                    <img class="card-img-top" :src="option.image" :alt="option.name">
                                    <div class="card-body">
                                        <h5 class="card-title">{{option.name}}</h5>
                                        <p class="card-text card-desc">{{option.description}}</p>
                                        <p class="card-text"><strong>{{option.price}} GBP</strong></p>
                                        <button class="btn" :class="{'btn-primary': !option.selected, 'btn-secondary': option.selected}" @click.prevent="option.selected = !option.selected">{{ !option.selected ? 'Select' : 'Remove' }}</button>
                                    </div>
                                </div> 
                            </slide>
                        </carousel>
                    </div>
                </div>  
            </div>
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
        <div id="softwareListModal" class="overlay">
            <div class="popup">
                <p id="modalHeader">The below software is included in the standard build</p>
                <a class="close cancel" href="#">&times;</a>
                <div class="content">
                    <ul>
                        <li>Adobe Flash Player (Viewing multimedia, streaming video & audio in web browser)</li>
                        <li>Adobe Reader (Provides the ability to view PDF files)</li>
                        <li>CutePDF Writer (Provides the ability to create PDF files)</li>
                        <li>Internet Explorer (Web Browser allowing you to surf the web)</li>
                        <li>Microsoft Skype for Business 2016 (Provides instant messaging between users)</li>
                        <li>Microsoft Office Professional 2016 ready for O365 (Access, Excel, Outlook, PowerPoint, Word)</li>
                        <li>Symantec Endpoint Protection (Virus protection tool)</li>
                        <li>Boost Desktop shortcut (Expenses, Recruitment, Performance, HR Self Service and more)</li>
                        <li>One Drive Sync Client</li>
                        <li>Google Chrome (Additional Web Browser allowing you to surf the web)</li>                        
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped src="./Hardware.css"></style>
<script src="./Hardware.js"></script>