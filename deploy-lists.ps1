$templatePath = Join-Path (Get-Location) '\lists\Lists.xml'
Connect-PnPOnline -Url "https://kier.sharepoint.com/sites/ITRequestsPortal/" -UseWebLogin
# Connect-PnPOnline -Url "https://devkier.sharepoint.com/sites/ITRequestsPorta/" -UseWebLogin
Apply-PnPProvisioningTemplate -path $templatePath -overwrite
# Add-PnPListItem -List "New Starter Submissions" -ContentType "NewStarterSubmissions" -Values @{"Title" = "Test Title"}