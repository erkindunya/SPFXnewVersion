param([string]$filter='*.csv')
$listDirectory = Join-Path (Get-Location) '\lists\'

Connect-PnPOnline -Url https://kier.sharepoint.com/sites/ITRequestsPortal -UseWebLogin

Get-ChildItem $listDirectory -Filter $filter | Foreach-Object {
    # Prepare variables
    Write-Host $_.FullName
    $listName = $_.BaseName
    $listData = Import-Csv -Path $_.FullName
    $headers = $listData | Get-member -MemberType 'NoteProperty' | Select-Object -ExpandProperty 'Name'

    if(Get-PnPList -Identity ("Lists/$listName")) {
        $items = Get-PnPListItem -List $listName -PageSize 1000

        if($items) {
            $items | Foreach-Object {
                Remove-PnPListItem -List $listName -Identity $_.Id -Force
            }
        }

        Remove-PnPList -Identity $listName -Force

    }

    if($headers.Count -gt 1) {
        try {
            $group = Get-PnPGroup -Identity 'SPFX Fields'
        } catch {
            $group = New-PnPGroup -Title 'SPFX Fields'
        }
        try {
            Remove-PnPContentType -Identity ("$listName SPFX Types") -Force
        } catch {
            Write-Host "Failed to remove"
        }
        # Create content type
        $contentTypeAdd = Add-PnPContentType -Name ("$listName SPFX Types") -Group 'SPFX Fields'

        $contentType = Get-PnPContentType -Identity ("$listName SPFX Types")
        Write-Host $headers.Count
        $headers | ForEach-Object {
            $name = $_
            $type = "Text"
            
            if ($name.trim() -eq '' -or $name -eq 'Title') {
                return;
            }

            $headerSections = $_.split('|')
            if($headerSections.Count -gt 1) {
                $type = $headerSections[1]
                $name = $headerSections[0]
            }

            if(!(Get-PnpField -Identity $name -ErrorAction Continue)) {
                # Create fields and add to content type
                $field = Add-PnPField -DisplayName $name -InternalName $name -Type $type -Id (New-Guid) -Group 'SPFX Fields' -Required
            }
            try {
                $fieldAdd = Add-PnPFieldToContentType -Field $name -ContentType $contentType
            } catch {
                Write-Host $_.Exception.Message
                Write-Host "Error adding content type"
            }
        }
    }
    Write-Host "Creating $listName"
    # Create List
    New-PnPList -Title $listName -Template GenericList -Url ("Lists/$listName")
    $list = Get-PnPList -Identity ("Lists/$listName")

    if($headers.Count -gt 1) {
        # Add content type to list
        Set-PnPList -Identity $listName -EnableContentTypes $true -EnableVersioning $true -MajorVersions 100
        Add-PnPContentTypeToList -List $list -ContentType $contentType -DefaultContentType
    }

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