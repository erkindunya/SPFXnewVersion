$templatePath = Join-Path (Get-Location) '\lists\template.xml'
Connect-PnPOnline -Url "https://kier.sharepoint.com/sites/talentdev2/" -UseWebLogin
Get-PnPProvisioningTemplate -Out $templatePath -Handlers Lists, ContentTypes, Fields
