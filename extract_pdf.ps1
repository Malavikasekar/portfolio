$bytes = [System.IO.File]::ReadAllBytes("Malavika Resume new.pdf")
$str = [System.Text.Encoding]::ASCII.GetString($bytes)
$pattern = '\(([^)]+)\)'
$results = [regex]::Matches($str, $pattern)
foreach ($match in $results) {
    $val = $match.Groups[1].Value
    if ($val -match '[A-Za-z]{2,}' -and $val -notmatch '^(Identity|Adobe|URI|Creator|Producer|PDF|Canva|http)') {
        Write-Output $val
    }
}
