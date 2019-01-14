<template>
    <div>
    <h2>Hardware and Software</h2>
    <div class="form-group">
        <div class="form-check form-check-inline">
            <input type="checkbox" class="form-check-input" v-model="sections.mobile">
            <label class="form-check-label">Mobile</label>
        </div>
    </div>
    <div v-if="sections.mobile">
        <carousel :per-page-custom="[[320, 2], [800, 3]]" :space-padding="20">
            <slide v-for="(option, key) in options.mobile" :key="key">
                <div class="card" :class="{'border border-success': option.selected}">
                    <img class="card-img-top" :src="option.image" :alt="option.name">
                    <div class="card-body">
                        <h5 class="card-title">{{option.name}}</h5>
                        <p class="card-text">{{option.description}}</p>
                        <p class="card-text"><strong>{{option.price}} GBP</strong></p>
                        <button class="btn" :class="{'btn-primary': !option.selected, 'btn-secondary': option.selected}" v-on:click="option.selected = !option.selected">{{ !option.selected ? 'Select' : 'Remove' }}</button>
                    </div>
                </div>
            </slide>
        </carousel>
    </div>
    <div class="form-group">
        <div class="form-check form-check-inline">
            <input type="checkbox" class="form-check-input" v-model="sections.software">
            <label class="form-check-label">Software</label>
        </div>
    </div>
    <div v-if="sections.software" class="card">
        <div class="card-body">
            <div class="form-group" v-for="(option, key) in options.software" :key="key">
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input" v-model="option.selected">
                    <label class="form-check-label">{{option.name}} ({{option.price}} GBP)</label>
                </div>
            </div>
        </div>
    </div>
    <div class="form-group">
        <div class="form-check form-check-inline">
            <input type="checkbox" class="form-check-input" v-model="sections.computer">
            <label class="form-check-label">Computer Package</label>
        </div>
    </div>
    <div v-if="sections.computer">
        <carousel :per-page-custom="[[320, 2], [800, 3]]" :space-padding="20">
            <slide v-for="(option, key) in options.computer" :key="key">
                <div class="card" :class="{'border border-success': option.selected}">
                    <img class="card-img-top" :src="option.image" :alt="option.name">
                    <div class="card-body">
                        <h5 class="card-title">{{option.name}}</h5>
                        <p class="card-text">{{option.description}}</p>
                        <p class="card-text"><strong>{{option.price}} GBP</strong></p>
                        <button class="btn" :class="{'btn-primary': !option.selected, 'btn-secondary': option.selected}" v-on:click="option.selected = !option.selected">{{ !option.selected ? 'Select' : 'Remove' }}</button>
                    </div>
                </div>
            </slide>
        </carousel>
        <div class="card">
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
            <input type="checkbox" class="form-check-input" v-model="sections.peripherals">
            <label class="form-check-label">Peripherals</label>
        </div>
    </div>
    <div v-if="sections.peripherals">
        <carousel :per-page-custom="[[320, 2], [800, 3]]" :space-padding="20">
            <slide v-for="(option, key) in options.peripherals" :key="key">
                <div class="card" :class="{'border border-success': option.selected}">
                    <img class="card-img-top" :src="option.image" :alt="option.name">
                    <div class="card-body">
                        <h5 class="card-title">{{option.name}}</h5>
                        <p class="card-text">{{option.description}}</p>
                        <p class="card-text"><strong>{{option.price}} GBP</strong></p>
                        <button class="btn" :class="{'btn-primary': !option.selected, 'btn-secondary': option.selected}" v-on:click="option.selected = !option.selected">{{ !option.selected ? 'Select' : 'Remove' }}</button>
                    </div>
                </div>
            </slide>
        </carousel>
    </div>
    <div class="form-group">
        <div class="form-check form-check-inline">
            <input type="checkbox" class="form-check-input" v-model="sections.oracle">
            <label class="form-check-label">Do you require additional Oracle / Boost access other than self-service, such as Kier goods receipting</label>
        </div>
    </div>
    <div v-if="sections.oracle">
        <div class="card-body">
            <div class="border">Oracle for Business</div>
            <div class="form-header">General Oracle access for finance, general procurement, goods receipting, admin and projects. Each option comes with all the access required to fulfil the tasks described so only one box should be selected.</div>
            <div class="section-header">Click a maximum of one box in this section.</div>
            <div class="form-title">Operational Staff</div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="radio" class="form-check-input-sub" v-model="formData.operationalStaff" value="Procurement and project inquires only">
                    <label class="form-check-label">Procurement and project inquires only</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="radio" class="form-check-input-sub" v-model="formData.operationalStaff" value="Goods receipting access only">
                    <label class="form-check-label">Goods receipting access only</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="radio" class="form-check-input-sub" v-model="formData.operationalStaff" value="Pre-construction">
                    <label class="form-check-label">Pre-construction</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="radio" class="form-check-input-sub" v-model="formData.operationalStaff" value="Operational Staff">
                    <label class="form-check-label">Operational Staff – with Key Member access of Project Manager, Contracts Manager or Operations 	Director</label>
                </div>
            </div>
            <div class="form-title">Commercial Staff</div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox"  class="form-check-input-sub" v-model="formData.commercialStaff" >
                    <label class="form-check-label">Access to manage Apps & Certs and subcontractor payments</label>
                </div>
            </div>
            <div>
                <div style="display:inline-block;" class="form-title">Buyers or Requisitioner</div>
                <label style="display:inline-block;">- with access to commodity and subcontractor procurement either as;</label>
            </div>      
            <div>
                <div class="form-check form-check-inline">
                    <input type="radio" class="form-check-input-sub" v-model="formData.buyersOrRequisitioner" value="Buyer">
                    <label class="form-check-label">Buyer</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="radio" class="form-check-input-sub" v-model="formData.buyersOrRequisitioner" value="iProcurement Requisitioner">
                    <label class="form-check-label">iProcurement Requisitioner</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="radio" class="form-check-input-sub" v-model="formData.buyersOrRequisitioner" value="Administrator same as Operational Staff, plus can make AR and AP inquiries">
                    <label class="form-check-label">Administrator same as Operational Staff, plus can make AR and AP inquiries</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="radio" class="form-check-input-sub" v-model="formData.buyersOrRequisitioner" value="Administrator with project management">
                    <label class="form-check-label">Administrator with project management</label>
                </div>
            </div>
            <div class="form-title">Finance Staff</div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub">
                    <label class="form-check-label">Financial inquiry with access to general ledger reports.  (Finance staff)</label>
                </div>
            </div>
            <div class="form-title">Apps & Certs Approval levels</div>
            <div>
                <div class="form-check form-check-inline">
                    <label style="margin-left: 10px;display:inline-block;" class="form-check-label">Commercial Manager access to projects and approval of Apps & Certs</label>
                    <input style="display:inline-block;" type="radio" class="form-check-input-sub" v-model="formData.appsCertsApprovalLevels" value="Commercial Manager">  
                    <label style="display:inline-block;" class="form-check-label">(Commercial Manager)</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <label style="margin-left: 10px;display:inline-block;" class="form-check-label">Managing Director approval of Apps & Certs in line with standing orders</label>                    
                    <input style="display:inline-block;" type="radio" class="form-check-input-sub" v-model="formData.appsCertsApprovalLevels" value="Managing Director">  
                    <label style="display:inline-block;" class="form-check-label">(Managing Director)</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <label style="margin-left: 10px;display:inline-block;" class="form-check-label">Commercial Director approval of Apps & Certs in line with standing orders </label>
                    <input style="display:inline-block;" type="radio" class="form-check-input-sub" v-model="formData.appsCertsApprovalLevels" value="Commercial Director">  
                    <label style="display:inline-block;" class="form-check-label">(Commercial Director)</label>
                </div>
            </div>
            <div class="border">AD Hoc Access</div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" v-model="formData.adHocAccessESS" >
                    <label class="form-check-label">ESS/ MSS Gross Pay Report   reporting units to be added below (Kier OTL Financial Controller)</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" v-model="formData.adHocAccessKWS" >
                    <label class="form-check-label">KWS Facilities management only - Requisition Load for CPA payment (Kier Requisition load User)</label>
                </div>
            </div>
            <div class="border">Kier Property only</div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" v-model="formData.kierPropertyOnlyESS">
                    <label class="form-check-label">ESS/ MSS Gross Pay Report   re  Property – Goods receipting</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" v-model="formData.kierPropertyOnlyESSPropertyCom">
                    <label class="form-check-label">Property – Commercial Director</label>
                </div>
            </div>
             <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" v-model="formData.kierPropertyOnlyESSPropertyFin" >
                    <label class="form-check-label">Property Finance staff</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" v-model="formData.kierPropertyOnlyExtra">
                    <label class="form-check-label">Extra functional access for Property Finance staff</label>
                </div>
            </div>
            <div class="border">Hyperion and PBCS</div>
            <div>
                <label style="margin-left: 10px;" class="form-check-label">Click the box(es) for the access needed then get approval from </label>
                <a href="mailto:John.Hudson@kier.co.uk?Subject=Approval%20Request" target="_top">John.Hudson@kier.co.uk</a>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" v-model="formData.hyperionFinancialManagement">
                    <label class="form-check-label">Hyperion Financial Management - financial consolidation & reporting for Finance staff</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" v-model="formData.hyperionPBCS">
                    <label class="form-check-label">Hyperion PBCS – Forecasting and project reporting</label>
                </div>
            </div>
            <div class="border">Business intelligence (BI) reporting</div>
            <div class="form-header">This concerns access to Oracle’s data analysis BI tool ‘Analytics’. If you request BI access, the service desk with seek guidance from the BI team on your behalf to confirm exactly what type of access is needed.</div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" v-model="formData.biOracleBIReporting">
                    <label class="form-check-label">Oracle BI reporting</label>
                </div>
            </div>
            <div class="border">VCR – Select one dropdown answer from each of the VCR modules you requirerting</div>
            <div class="form-group">
                <label class="form-check-label-sub">VCR Lump Sum Project</label>
                <vue-select :options="['Permanent', 'Contractor', 'Blue Collar']" v-model="formData.vcrLumpSumproject" :class="{ 'is-invalid': $v.formData.vcrLumpSumproject.$invalid }"></vue-select>
            </div>
            <div class="form-group">
                <label class="form-check-label-sub">VCR Conversion Project</label>
                <!-- <vue-select :options="['Permanent', 'Contractor', 'Blue Collar']" v-model="formData.employeeType" :class="{ 'is-invalid': $v.formData.employeeType.$invalid }"></vue-select> -->
            </div>
            <div class="form-group">
                <label class="form-check-label-sub">VCR Repairs & Maintenance</label>
                <!-- <vue-select :options="['Permanent', 'Contractor', 'Blue Collar']" v-model="formData.employeeType" :class="{ 'is-invalid': $v.formData.employeeType.$invalid }"></vue-select> -->
            </div>
            <div class="form-group">
                <label class="form-check-label-sub">SPM Supplier Performance Management</label>
                <!-- <vue-select :options="['Permanent', 'Contractor', 'Blue Collar']" v-model="formData.employeeType" :class="{ 'is-invalid': $v.formData.employeeType.$invalid }"></vue-select> -->
            </div>
            <div class="border">Oracle Self Service and Time and Labour (OTL)</div>
            <div class="section-header">Click the box(es) for the access needed.</div>
            <div class="form-title">Oracle Employee and Manager Self Service</div>
            <div class="form-header">ESS or MSS access will be set-up automatically for all new employees.  However, if anything’s is missing please click the relevant selection box below;</div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" v-model="formData.oEmployeeKESSBasic">
                    <label class="form-check-label">(Kier Employee Self Service) – Basic access – provides payslips/personal details only.</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" v-model="formData.oEmployeeKESSBasicWAbsence">
                    <label class="form-check-label">(Kier Employee Self Service (with Absence)) – As Basic access, but with holiday booking</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" v-model="formData.oEmployeeKSST">
                    <label class="form-check-label">(Kier Self Service Time) -Timecard entry</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" v-model="formData.oEmployeeKMSS">
                    <label class="form-check-label">(Kier Manager Self Service) – View team details and approve timecards (if required)</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" v-model="formData.oEmployeeKLMS">
                    <label class="form-check-label">(Kier Line Manager Self Service) – As above but with holiday approvals</label>
                </div>
            </div>
            <div class="form-title">Timekeeping</div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" v-model="formData.oTimeTimekeeper">
                    <label class="form-check-label">Timekeeper</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" v-model="formData.oTimeTimekeeperGroup">
                    <label class="form-check-label">Timekeeper Group Maintenance – Add or remove employees to/from timekeeper groups</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" v-model="formData.oTimeSuperTimekeeper">
                    <label class="form-check-label">Super Timekeeper – Can enter time for more than one timekeeper group</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" v-model="formData.oKierOTL">
                    <label class="form-check-label">Kier OTL Financial Controller access – Access to payroll summary reports</label>
                </div>
            </div>
            <div class="border">Other Access</div> 
            <div class="form-header">Please indicate any other specific access requirements you may have that you feel is not covered by this form, e.g. you are a current user and now no longer need access to a specific area of Oracle</div>   
            <div>
                <a class="form-check-label-sub" href="mailto:servicedesk@kier.co.uk?Subject=Requirement" target="_top">[Click here to inform the service desk of your requirement]</a>         
            </div>
            <div class="border">Reporting Unit Codes</div> 
            <div class="form-header">Please select all reporting unit codes for the Time Keeping Groups you require.  For guidance regarding Reporting User Codes click the attached excel document.</div>   
            <div>
                <a class="form-check-label-sub"  href="https://www.google.com">Reproting Unit Codes</a>
            </div>
            <div class="form-group">
                <label class="form-check-label-sub" >Reporting Unit Code entry:</label>
                <input type="text" class="form-check-label-sub " v-model="formData.reportingUnitCodeEntry" :class="{ 'is-invalid': $v.formData.reportingUnitCodeEntry.$invalid }">
            </div>
            <div>
                <label class="form-check-label-sub" >e.g. 1001, 1003 etc.</label>
            </div>
            <!-- <div class="form-group" v-for="(option, key) in options.oracle" :key="key">
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input" v-model="option.selected">
                    <label class="form-check-label">{{option.name}} ({{option.price}} GBP)</label>
                </div>
            </div> -->
        </div>
    </div>
    
    <div class="row">
        <div class="col">
            <button type="button" class="btn btn-secondary" v-on:click="back">Back</button>
        </div>
        <div class="col text-right">
            <button type="button" class="btn btn-primary" v-on:click="submit">Next</button>
        </div>
    </div>
</div>
</template>
<style scoped src="./Hardware.css"></style>
<script src="./Hardware.js"></script>