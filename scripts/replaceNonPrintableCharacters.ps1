#############################################################
######                                                  #####
######    Script to replace non-Printable characters    #####
######                                                  #####
#############################################################


$siteURL = "https://kier.sharepoint.com/sites/talentdev2"
$listName = "SoftwarePackages"
$fields = ("ID","Title","Additional_x0020_Costs")  ##ID is always needed

Connect-PnPOnline -Url $siteUrl -UseWebLogin

$items = (Get-PnPListItem -List $listName -id 9 -Fields $fields).Fieldvalues

foreach($item in $items){
   foreach($field in $fields){
    $newString = $item[$field] -replace "[^\u0009\u000A\u000D\u0020-\u007E]", "£"
    Set-PnPListItem -List $listName -Identity $Item.ID -Values @{$field = $newString}
   }
}
