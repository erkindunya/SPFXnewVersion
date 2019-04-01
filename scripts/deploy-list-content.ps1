param([string]$filter='OracleReportingUnits.csv')
$listDirectory = Join-Path (Get-Location) '\lists\'

Connect-PnPOnline -Url https://kier.sharepoint.com/sites/talentdev2/ -UseWebLogin

Get-ChildItem $listDirectory -Filter $filter | Foreach-Object {
    # Prepare variables
    Write-Host $_.FullName
    $listName = $_.BaseName
    write-host $listName
    $listData = Import-Csv -Path $_.FullName

    # Add rows to list
    $listData | Foreach-Object {
        # Convert row to hashtable
        $row = @{}
        $_.PSObject.Properties | ForEach-Object {
            $row[$_.Name.split('|')[0]] = $_.Value
        }
        Add-PnPListItem -List $listName -Values $row
    }

}
