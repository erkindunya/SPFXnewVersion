$templatePath = Join-Path (Get-Location) '\lists\template.xml'
#Connect-PnPOnline -Url "https://kier.sharepoint.com/sites/ITRequestsPortal/" -UseWebLogin
Connect-PnPOnline -Url "https://devkier.sharepoint.com/sites/ITRequestsPorta/" -UseWebLogin
Get-PnPProvisioningTemplate -Out $templatePath -Handlers Lists, ContentTypes, Fields