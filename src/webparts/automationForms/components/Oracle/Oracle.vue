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
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" id="jointVentureAccess" v-model="formData.jointVentureAccess">
                    <label class="form-check-label" for="jointVentureAccess">Joint Venture (JV) access needed</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" id="rafLakenheathAccess" v-model="formData.rafLakenheathAccess">
                    <label class="form-check-label" for="rafLakenheathAccess">RAF Lakenheath (JV) access needed</label>
                </div>
            </div>
            <div class="border">Employee ID</div>
            <div class="form-header">If known, please enter the employee ID below.</div>
            <input type="text" class="form-control" v-model="formData.employeeId">
            <div class="border">Oracle for Business</div>
            <div class="form-header">General Oracle access for finance, general procurement, goods receipting, admin and projects. Each option comes with all the access required to fulfil the tasks described so only one box should be selected.</div>
            <div class="section-header">Click a maximum of one box in this section.</div>
            <div class="form-title">Operational Staff</div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input type="radio" id="oracleProcurementAndInquiries" class="form-check-input-sub" v-model="formData.oracleForBusiness" value="Procurement and project inquires only">
                    <label class="form-check-label" for="oracleProcurementAndInquiries">Procurement and project inquires only</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Procurement and project inquires only')"></div>
            </div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input type="radio" id="oracleGoodsReceiptingAccess" class="form-check-input-sub" v-model="formData.oracleForBusiness" value="Goods receipting access only">
                    <label class="form-check-label" for="oracleGoodsReceiptingAccess">Goods receipting access only</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Goods receipting access only')"></div>
            </div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input type="radio" id="oraclePreconstruction" class="form-check-input-sub" v-model="formData.oracleForBusiness" value="Pre-construction">
                    <label class="form-check-label" for="oraclePreconstruction">Pre-construction</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Pre-construction')"></div>
            </div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input type="radio" id="oracleOperationalStaff" class="form-check-input-sub" v-model="formData.oracleForBusiness" value="Operational Staff">
                    <label class="form-check-label" for="oracleOperationalStaff">Operational Staff – with Key Member access of Project Manager, Contracts Manager or Operations Director</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Operational Staff – with Key Member access of Project Manager, Contracts Manager or Operations Director')"></div>
            </div>
            <div class="form-title">Commercial Staff</div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input type="radio" id="oracleAccessToManage" class="form-check-input-sub" v-model="formData.oracleForBusiness" >
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
                    <input type="radio" id="oracleBuyer" class="form-check-input-sub" v-model="formData.oracleForBusiness" value="Buyer">
                    <label class="form-check-label" for="oracleBuyer">Buyer</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Buyer')"></div>
            </div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input type="radio" id="oracleIProcurement" class="form-check-input-sub" v-model="formData.oracleForBusiness" value="iProcurement Requisitioner">
                    <label class="form-check-label" for="oracleIProcurement">iProcurement Requisitioner</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('iProcurement Requisitioner')"></div>
            </div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input type="radio" id="oracleAdministratorSameAsOperational" class="form-check-input-sub" v-model="formData.oracleForBusiness" value="Administrator same as Operational Staff, plus can make AR and AP inquiries">
                    <label class="form-check-label" for="oracleAdministratorSameAsOperational">Administrator same as Operational Staff, plus can make AR and AP inquiries</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Administrator same as Operational Staff, plus can make AR and AP inquiries')"></div>
            </div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input type="radio" id="oracleAdministratorWithProjectManagement" class="form-check-input-sub" v-model="formData.oracleForBusiness" value="Administrator with project management">
                    <label class="form-check-label" for="oracleAdministratorWithProjectManagement">Administrator with project management</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Administrator with project management')"></div>
            </div>
            <div class="form-title">Finance Staff</div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input type="radio" id="oracleFinanceInquiryWithAccess" class="form-check-input-sub" v-model="formData.oracleForBusiness" value="Financial inquiry with access to general ledger reports.  (Finance staff)">
                    <label class="form-check-label" for="oracleFinanceInquiryWithAccess">Financial inquiry with access to general ledger reports. (Finance staff)</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Financial inquiry with access to general ledger reports. (Finance staff)')"></div>
            </div>
            <div class="form-title">Apps & Certs Approval levels</div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input style="display:inline-block;" type="radio" id="oracleCommercialManager" class="form-check-input-sub" v-model="formData.oracleForBusiness" value="Commercial Manager">
                    <label style="margin-left: 10px;display:inline-block;" for="oracleCommercialManager" class="form-check-label">Commercial Manager access to projects and approval of Apps & Certs</label>
                    <label style="display:inline-block;" class="form-check-label" for="oracleCommercialManager">(Commercial Manager)</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Commercial Manager access to projects and approval of Apps & Certs')"></div>
            </div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input style="display:inline-block;" type="radio" id="oracleManagingDirector" class="form-check-input-sub" v-model="formData.oracleForBusiness" value="Managing Director">
                    <label style="margin-left: 10px;display:inline-block;" for="oracleManagingDirector" class="form-check-label">Managing Director approval of Apps & Certs in line with standing orders</label>                    
                    <label style="display:inline-block;" class="form-check-label" for="oracleManagingDirector">(Managing Director)</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Managing Director approval of Apps & Certs in line with standing orders')"></div>
            </div>
            <div class="jtooltip-container">
                <div class="form-check form-check-inline jtooltip-trigger">
                    <input style="display:inline-block;" type="radio" id="oracleCommercialDirector" class="form-check-input-sub" v-model="formData.oracleForBusiness" value="Commercial Director">  
                    <label style="margin-left: 10px;display:inline-block;" for="oracleCommercialDirector" class="form-check-label">Commercial Director approval of Apps & Certs in line with standing orders </label>
                    <label style="display:inline-block;" class="form-check-label" for="oracleCommercialDirector">(Commercial Director)</label>
                </div>
                <div class="jtooltip" v-html="getResponsibilities('Commercial Director approval of Apps & Certs in line with standing orders')"></div>
            </div>
            <div class="border">AD Hoc Access</div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" id="adHocAccessKWS" class="form-check-input-sub" v-model="formData.adHocAccessKWS" >
                    <label class="form-check-label" for="adHocAccessKWS">KWS Facilities management only - Requisition Load for CPA payment (Kier Requisition load User)</label>
                </div>
            </div>
            <div class="border">Kier Property only</div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" id="kierPropertyOnlyESS" v-model="formData.kierPropertyOnlyESS">
                    <label class="form-check-label" for="kierPropertyOnlyESS">ESS/ MSS Gross Pay Report   re  Property – Goods receipting</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" id="kierPropertyOnlyESS" class="form-check-input-sub" v-model="formData.kierPropertyOnlyESSPropertyCom">
                    <label class="form-check-label" for="kierPropertyOnlyESS">Property – Commercial Director</label>
                </div>
            </div>
             <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" id="kierPropertyOnlyESSPropertyFin" v-model="formData.kierPropertyOnlyESSPropertyFin" >
                    <label class="form-check-label" for="kierPropertyOnlyESSPropertyFin">Property Finance staff</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" id="kierPropertyOnlyExtra" v-model="formData.kierPropertyOnlyExtra">
                    <label class="form-check-label" for="kierPropertyOnlyExtra">Extra functional access for Property Finance staff</label>
                </div>
            </div>
            <div class="border">Oracle Self Service and Time and Labour (OTL)</div>
            <div class="section-header">Click the box(es) for the access needed.</div>
            <div class="form-title">Oracle Employee and Manager Self Service</div>
            <div class="form-header">ESS or MSS access will be set-up automatically for all new employees.  However, if anything’s is missing please click the relevant selection box below:</div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" id="oEmployeeKESSBasic" v-model="formData.oEmployeeKESSBasic">
                    <label class="form-check-label" for="oEmployeeKESSBasic">(Kier Employee Self Service) – Basic access – provides payslips/personal details only.</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" id="oEmployeeKESSBasicWAbsence" v-model="formData.oEmployeeKESSBasicWAbsence">
                    <label class="form-check-label" for="oEmployeeKESSBasicWAbsence">(Kier Employee Self Service (with Absence)) – As Basic access, but with holiday booking</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" id="oEmployeeKSST" v-model="formData.oEmployeeKSST">
                    <label class="form-check-label" for="oEmployeeKSST">(Kier Self Service Time) -Timecard entry</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" id="oEmployeeKMSS" v-model="formData.oEmployeeKMSS">
                    <label class="form-check-label" for="oEmployeeKMSS">(Kier Manager Self Service) – View team details and approve timecards (if required)</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" id="oEmployeeKLMS" v-model="formData.oEmployeeKLMS">
                    <label class="form-check-label" for="oEmployeeKLMS">(Kier Line Manager Self Service) – As above but with holiday approvals</label>
                </div>
            </div>
            <div class="form-title">Timekeeping</div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" id="oTimeTimekeeper" v-model="formData.oTimeTimekeeper">
                    <label class="form-check-label" for="oTimeTimekeeper">Timekeeper</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" id="oTimeTimekeeperGroup" v-model="formData.oTimeTimekeeperGroup">
                    <label class="form-check-label" for="oTimeTimekeeperGroup">Timekeeper Group Maintenance – Add or remove employees to/from timekeeper groups</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" id="oTimeSuperTimekeeper" v-model="formData.oTimeSuperTimekeeper">
                    <label class="form-check-label" for="oTimeSuperTimekeeper">Super Timekeeper – Can enter time for more than one timekeeper group</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" id="oKierOTL" v-model="formData.oKierOTL">
                    <label class="form-check-label" for="oKierOTL">Kier OTL Financial Controller access – Access to payroll summary reports</label>
                </div>
            </div>
            <div class="border">Hyperion and PBCS</div>
            <div>
                <label style="margin-left: 10px;" class="form-check-label">Click the box(es) for the access needed then get approval from </label>
                <a href="mailto:John.Hudson@kier.co.uk?Subject=Approval%20Request" target="_top">John.Hudson@kier.co.uk</a>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" id="hyperionFinancialManagement" v-model="formData.hyperionFinancialManagement">
                    <label class="form-check-label" for="hyperionFinancialManagement">Hyperion Financial Management - financial consolidation & reporting for Finance staff</label>
                </div>
            </div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" id="hyperionPBCS" v-model="formData.hyperionPBCS">
                    <label class="form-check-label" for="hyperionPBCS">Hyperion PBCS – Forecasting and project reporting</label>
                </div>
            </div>
            <div class="border">Business intelligence (BI) reporting</div>
            <div class="form-header">This concerns access to Oracle’s data analysis BI tool ‘Analytics’. If you request BI access, the service desk with seek guidance from the BI team on your behalf to confirm exactly what type of access is needed.</div>
            <div>
                <div class="form-check form-check-inline">
                    <input type="checkbox" class="form-check-input-sub" id="biOracleBIReporting" v-model="formData.biOracleBIReporting">
                    <label class="form-check-label" for="biOracleBIReporting">Oracle BI reporting</label>
                </div>
            </div>
            <div class="border">VCR – Select one dropdown answer from each of the VCR modules you require</div>
            <div class="form-group">
                <label class="form-check-label-sub">VCR Lump Sum Project</label>
                <vue-select :options="['Business unit Inquiry', 'Business unit Director', 'Business Unit Administration', 'Commercial / Operational', 'Commercial Manager', 'Global Inquiry']" v-model="formData.vcrLumpSumproject" :class="{ 'is-invalid': $v.formData.vcrLumpSumproject.$invalid }"></vue-select>
            </div>
            <div class="form-group">
                <label class="form-check-label-sub">VCR Conversion Project</label>
                <vue-select :options="['Business unit Inquiry', 'Business unit Director', 'Business Unit Administration', 'Commercial / Operational', 'Commercial Manager', 'Global Inquiry']" v-model="formData.vcrConversionProject" :class="{ 'is-invalid': $v.formData.vcrConversionProject.$invalid }"></vue-select>
            </div>
            <div class="form-group">
                <label class="form-check-label-sub">VCR Repairs &amp; Maintenance</label>
                <vue-select :options="['Business unit Inquiry', 'Business unit Director', 'Business Unit Administration', 'Commercial / Operational', 'Commercial Manager', 'Procurement Lead (SPM only)', 'Global Inquiry']" v-model="formData.vcrRepairs" :class="{ 'is-invalid': $v.formData.vcrRepairs.$invalid }"></vue-select>
            </div>
            <div class="form-group">
                <label class="form-check-label-sub">SPM Supplier Performance Management</label>
                <vue-select :options="['Business unit Inquiry', 'Business unit Director', 'Business Unit Administration', 'Commercial / Operational', 'Commercial Manager', 'Global Inquiry']" v-model="formData.vcrSPM" :class="{ 'is-invalid': $v.formData.vcrSPM.$invalid }"></vue-select>
            </div>
            <div class="border">Other Access</div> 
            <div class="form-header">Please indicate any other specific access requirements you may have that you feel is not covered by this form, e.g. you are a current user and now no longer need access to a specific area of Oracle</div>   
            <div>
                <a class="form-check-label-sub" href="mailto:servicedesk@kier.co.uk?Subject=Requirement" target="_top">[Click here to inform the service desk of your requirement]</a>         
            </div>
            <div class="border">Cost Center</div> 
            <input type="text" class="form-control" v-model="formData.costCenter">
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