<template>
    <div>
    <h2>Oracle Access</h2>
    <div class="form-group">
        <div class="form-check form-check-inline">
            <input type="checkbox" id="oracleAccessRequired" class="form-check-input" v-model="sections.oracle">
            <label class="form-check-label" for="oracleAccessRequired">Do you require additional Oracle access other than self-service, such as Kier goods receipting</label>
        </div>
    </div>
    <div v-if="sections.oracle">
        <div class="card-body">
            <div class="border">Joint Ventures</div>
            <div v-for="(option, key) in formOptions.jointVentures" :key="key">
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" :id="option.id" v-model="option.selected">
                    <label class="form-check-label" :for="option.id" >{{option.name}}</label>
                </div>
            </div> 

            <div class="border">Employee ID</div>
            <div class="form-header">If known, please enter the employee ID below.</div>
            <input type="text" maxlength="255" class="form-control" v-model="formOptions.employeeId" @paste.prevent>

            <div class="border">Oracle for Business</div>
            <div class="form-header">General Oracle access for finance, general procurement, goods receipting, admin and projects. Each option comes with all the access required to fulfil the tasks described so only one box should be selected.</div>
            <div class="section-header">Click a maximum of one box in this section.</div>
            <div class="form-title">Operational Staff</div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input type="radio" id="oracleProcurementAndInquiries" class="form-check-input-sub" v-model="formOptions.oracleForBusiness" value="Procurement and project inquires only">
                    <label class="form-check-label" for="oracleProcurementAndInquiries">Procurement and project inquires only</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Procurement and project inquires only')"></div>
            </div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input type="radio" id="oracleGoodsReceiptingAccess" class="form-check-input-sub" v-model="formOptions.oracleForBusiness" value="Goods receipting access only">
                    <label class="form-check-label" for="oracleGoodsReceiptingAccess">Goods receipting access only</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Goods receipting access only')"></div>
            </div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input type="radio" id="oraclePreconstruction" class="form-check-input-sub" v-model="formOptions.oracleForBusiness" value="Pre-construction">
                    <label class="form-check-label" for="oraclePreconstruction">Pre-construction</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Pre-construction')"></div>
            </div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input type="radio" id="oracleOperationalStaff" class="form-check-input-sub" v-model="formOptions.oracleForBusiness" value="Operational Staff">
                    <label class="form-check-label" for="oracleOperationalStaff">Operational Staff – with Key Member access of Project Manager, Contracts Manager or Operations Director</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Operational Staff – with Key Member access of Project Manager, Contracts Manager or Operations Director')"></div>
            </div>
            <div class="form-title">Commercial Staff</div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input type="radio" id="oracleAccessToManage" class="form-check-input-sub" v-model="formOptions.oracleForBusiness" >
                    <label class="form-check-label" for="oracleAccessToManage">Access to manage Apps & Certs and subcontractor payments</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Access to manage Apps & Certs and subcontractor payments')"></div>
            </div>
            <div>
                <div style="display:inline-block;" class="form-title">Buyers or Requisitioner</div>
                <label style="display:inline-block;">- with access to commodity and subcontractor procurement either as;</label>
            </div>      
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input type="radio" id="oracleBuyer" class="form-check-input-sub" v-model="formOptions.oracleForBusiness" value="Buyer">
                    <label class="form-check-label" for="oracleBuyer">Buyer</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Buyer')"></div>
            </div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input type="radio" id="oracleIProcurement" class="form-check-input-sub" v-model="formOptions.oracleForBusiness" value="iProcurement Requisitioner">
                    <label class="form-check-label" for="oracleIProcurement">iProcurement Requisitioner</label>
                </div> 
                <div class="jtooltip" v-html="getResponsibilities('iProcurement Requisitioner')"></div>
            </div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input type="radio" id="oracleAdministratorSameAsOperational" class="form-check-input-sub" v-model="formOptions.oracleForBusiness" value="Administrator same as Operational Staff, plus can make AR and AP inquiries">
                    <label class="form-check-label" for="oracleAdministratorSameAsOperational">Administrator same as Operational Staff, plus can make AR and AP inquiries</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Administrator same as Operational Staff, plus can make AR and AP inquiries')"></div>
            </div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input type="radio" id="oracleAdministratorWithProjectManagement" class="form-check-input-sub" v-model="formOptions.oracleForBusiness" value="Administrator with project management">
                    <label class="form-check-label" for="oracleAdministratorWithProjectManagement">Administrator with project management</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Administrator with project management')"></div>
            </div>
            <div class="form-title">Finance Staff</div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input type="radio" id="oracleFinanceInquiryWithAccess" class="form-check-input-sub" v-model="formOptions.oracleForBusiness" value="Financial inquiry with access to general ledger reports.  (Finance staff)">
                    <label class="form-check-label" for="oracleFinanceInquiryWithAccess">Financial inquiry with access to general ledger reports. (Finance staff)</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Financial inquiry with access to general ledger reports. (Finance staff)')"></div>
            </div>
            <div class="form-title">Apps & Certs Approval levels</div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input style="display:inline-block;" type="radio" id="oracleCommercialManager" class="form-check-input-sub" v-model="formOptions.oracleForBusiness" value="Commercial Manager">
                    <label style="margin-left: 10px;display:inline-block;" for="oracleCommercialManager" class="form-check-label">Commercial Manager access to projects and approval of Apps & Certs</label>
                    <label style="display:inline-block;" class="form-check-label" for="oracleCommercialManager">(Commercial Manager)</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Commercial Manager access to projects and approval of Apps & Certs')"></div>
            </div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input style="display:inline-block;" type="radio" id="oracleManagingDirector" class="form-check-input-sub" v-model="formOptions.oracleForBusiness" value="Managing Director">
                    <label style="margin-left: 10px;display:inline-block;" for="oracleManagingDirector" class="form-check-label">Managing Director approval of Apps & Certs in line with standing orders</label>                    
                    <label style="display:inline-block;" class="form-check-label" for="oracleManagingDirector">(Managing Director)</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Managing Director approval of Apps & Certs in line with standing orders')"></div>
            </div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input style="display:inline-block;" type="radio" id="oracleCommercialDirector" class="form-check-input-sub" v-model="formOptions.oracleForBusiness" value="Commercial Director">  
                    <label style="margin-left: 10px;display:inline-block;" for="oracleCommercialDirector" class="form-check-label">Commercial Director approval of Apps & Certs in line with standing orders </label>
                    <label style="display:inline-block;" class="form-check-label" for="oracleCommercialDirector">(Commercial Director)</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Commercial Director approval of Apps & Certs in line with standing orders')"></div>
            </div>
            <div class="border">AD Hoc Access</div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" :id="formOptions.adHocAccess.id" class="form-check-input-sub" v-model="formOptions.adHocAccess.selected" >
                    <label class="form-check-label" :for="formOptions.adHocAccess.id">{{formOptions.adHocAccess.name}}</label>
                </div>
            </div>

            <div class="border">Kier Property only</div>
            
            <div v-for="(option, key) in formOptions.kierPropertyOnly" :key="key">
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" :id="option.id" v-model="option.selected">
                    <label class="form-check-label" :for="option.id" >{{option.name}}</label>
                </div>
            </div> 
            
            <div class="border">Oracle Self Service and Time and Labour (OTL)</div>
            <div class="section-header">Click the box(es) for the access needed.</div>
            <div class="form-title">Oracle Employee and Manager Self Service</div>
            <div class="form-header">ESS or MSS access will be set-up automatically for all new employees.  However, if anything’s is missing please click the relevant selection box below:</div>
            
            <div v-for="(option, key) in formOptions.otlSelfService" :key="key">
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" :id="option.id" v-model="option.selected">
                    <label class="form-check-label" :for="option.id" >{{option.name}}</label>
                </div>
            </div> 
            <div class="form-title">Timekeeping</div>
       
            <div v-for="(option, key) in formOptions.otlTimeKeeping" :key="key">
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" :id="option.id" v-model="option.selected">
                    <label class="form-check-label" :for="option.id" >{{option.name}}</label>
                </div>
            </div> 
            <div class="form-title">If requesting Timekeeper Group Maintenance, Super Timekeeper or Kier OTL Financial Controller access, please select all reporting unit codes for the timekeeping groups you require:</div>       
            <div class="form-header">
                <list-select v-model="formOptions.otlTimeKeepingReportingUnit" listName="OracleReportingUnits" label="Title"></list-select>
            </div>

            <div class="border">Hyperion and PBCS</div>
            <div>
                <label style="margin-left: 10px;" class="form-check-label">Click the box(es) for the access needed. Approval will be required from the Head of Group Finance and your Financial Director.</label>
            </div>
            
            <div v-for="(option, key) in formOptions.hyperion" :key="key">
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" :id="option.id" v-model="option.selected">
                    <label class="form-check-label" :for="option.id" >{{option.name}}</label>
                </div>
            </div> 
            <div class="border">Business intelligence (BI) reporting</div>
            <div class="form-header">This concerns access to Oracle’s data analysis BI tool ‘Analytics’. If you request BI access, the service desk with seek guidance from the BI team on your behalf to confirm exactly what type of access is needed.</div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" :id="formOptions.biReporting.id" class="form-check-input-sub" v-model="formOptions.biReporting.selected" >
                    <label class="form-check-label" :for="formOptions.biReporting.id">{{formOptions.biReporting.name}}</label>
                </div>
            </div>
            <div class="border">VCR – Select one dropdown answer from each of the VCR modules you require</div>
            <div class="form-group">
                <label class="form-check-label-sub">VCR Lump Sum Project</label>
                <vue-select :options="['Business unit Inquiry', 'Business unit Director', 'Business Unit Administration', 'Commercial / Operational', 'Commercial Manager', 'Global Inquiry']" v-model="formOptions.vcrLumpSumproject" :class="{ 'is-invalid': $v.formOptions.vcrLumpSumproject.$invalid }"></vue-select>
            </div>
            <div class="form-group">
                <label class="form-check-label-sub">VCR Conversion Project</label>
                <vue-select :options="['Business unit Inquiry', 'Business unit Director', 'Business Unit Administration', 'Commercial / Operational', 'Commercial Manager', 'Global Inquiry']" v-model="formOptions.vcrConversionProject" :class="{ 'is-invalid': $v.formOptions.vcrConversionProject.$invalid }"></vue-select>
            </div>
            <div class="form-group">
                <label class="form-check-label-sub">VCR Repairs &amp; Maintenance</label>
                <vue-select :options="['Business unit Inquiry', 'Business unit Director', 'Business Unit Administration', 'Commercial / Operational', 'Commercial Manager', 'Procurement Lead (SPM only)', 'Global Inquiry']" v-model="formOptions.vcrRepairs" :class="{ 'is-invalid': $v.formOptions.vcrRepairs.$invalid }"></vue-select>
            </div>
            <div class="form-group">
                <label class="form-check-label-sub">SPM Supplier Performance Management</label>
                <vue-select :options="['Business unit Inquiry', 'Business unit Director', 'Business Unit Administration', 'Commercial / Operational', 'Commercial Manager', 'Global Inquiry']" v-model="formOptions.vcrSPM" :class="{ 'is-invalid': $v.formOptions.vcrSPM.$invalid }"></vue-select>
            </div>
            <div class="border">Other Access</div> 
            <div class="form-header">Please indicate any other specific access requirements you may have that you feel is not covered by this form, e.g. you are a current user and now no longer need access to a specific area of Oracle</div>   
            <div>
                <a class="form-check-label-sub" href="mailto:servicedesk@kier.co.uk?Subject=Requirement" target="_top">[Click here to inform the service desk of your requirement]</a>         
            </div>
            <div class="border">Cost Center</div> 
            <input type="text" maxlength="255" class="form-control" v-model="formOptions.costCenter" @paste.prevent>
        </div>
    </div>
    
    <div class="row">
        <div class="col">
            <button type="button" class="btn btn-secondary" @click.prevent="back">Back</button>
        </div>
        <div class="col text-right">
            <button type="button" class="btn btn-primary" @click.prevent="submit">Next</button>
        </div>
    </div>
</div>
</template>
<style scoped src="./Oracle.css"></style>
<script src="./Oracle.js"></script>