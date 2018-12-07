# SETTINGS
$targetDirectory = Join-Path (Get-Location) '\dist\'
$storageAccountName = "kierforms"
$resourceGroupName = "AutomationForms"
$subscriptionId = "a1a8fbff-dd2c-4095-94ac-c376915ac09e"
$containerName = '$web'

Add-Type -AssemblyName "System.Web"

# SCRIPT
Login-AzureRmAccount
Select-AzureRmSubscription -SubscriptionId $subscriptionId
$keys = Get-AzureRmStorageAccountKey -ResourceGroupName $resourceGroupName -AccountName $storageAccountName
$ctx = New-AzureStorageContext -StorageAccountName $storageAccountName -StorageAccountKey $keys[0].Value
Get-ChildItem $targetDirectory -File | Foreach-Object {
    $mimeType = [System.Web.MimeMapping]::GetMimeMapping($_)
    $blobProperties = @{"ContentType" = $mimeType};
    Set-AzureStorageBlobContent -File ($targetDirectory + $_) -Blob $_ -Container $containerName -Context $ctx -Properties $blobProperties -Force
}

# Clean up old files
$date = [DateTime]::Today.AddDays(-1)
Get-AzureStorageBlob -Context $ctx -Container $containerName | Where-Object {$_.LastModified -lt $date} | Remove-AzureStorageBlob