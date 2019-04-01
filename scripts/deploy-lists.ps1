$templatePath = Join-Path (Get-Location) '\lists\template.xml'
Connect-PnPOnline -Url "https://kier.sharepoint.com/sites/talentdev2/" -UseWebLogin
Apply-PnPProvisioningTemplate -path $templatePath -overwrite
# Add-PnPListItem -List "New Starter Submissions" -ContentType "NewStarterSubmissions" -Values @{"Title" = "Test Title"}
