---
order: 31
xref: c4b-azure-license-update
title: License Update
description: How to update the license in use on your Chocolatey for Business Azure Environment
---

## Summary

If you use the Chocolatey for Business Azure Environment for long periods of time, the license you used to deploy it may expire and you will need to update it.

### Prerequisites

- You will need Chocolatey CLI installed.
- You will need your new Chocolatey for Business license file.
- You will need the FQDN of your Chocolatey for Business Azure Environment.
- You will need the API Key for your Nexus repository (or access to the Resource Group hosting your Azure Key Vault to be able to [retrieve it](xref:c4b-azure#accessing-services)).

## Creating a New License Package

When you initially deploy a Chocolatey for Business Azure Environment, you upload your Chocolatey for Business license. This is then used to create a Chocolatey package that installs the license on your nodes.

We will need to create an updated version of the package, which will overwrite the previous version of the license on install.

Open a PowerShell window and run the following code (which will prompt you for information for values that are not set):

```PowerShell
if (-not $LicensePath) {
    $LicensePath = "$(Read-Host -Prompt 'Please enter the path to your license file')"
}

# Generate the license package layout
$WorkingDirectory = Join-Path $env:Temp "ChocolateyLicensedPackage"
if (-not (Test-Path $WorkingDirectory)) {
    $null = New-Item -Path $WorkingDirectory -ItemType Directory
}

$PackageDirectory = Join-Path $WorkingDirectory "chocolatey-license"

$ToolsDir = Join-Path $PackageDirectory "tools"
if (-not (Test-Path $ToolsDir)) {
    $null = New-Item $ToolsDir -ItemType Directory
}

Set-Content -Path $ToolsDir\chocolateyInstall.ps1 -Encoding UTF8 -Value @'
$ErrorActionPreference = "Stop"
$ToolsDir = Split-Path -Parent $MyInvocation.MyCommand.Definition

if (-not (Test-Path $env:ChocolateyInstall\license -PathType Container)) {
    $null = New-Item $env:ChocolateyInstall\license -ItemType Directory -Force
}
Copy-Item -Path $ToolsDir\chocolatey.license.xml -Destination $env:ChocolateyInstall\license\chocolatey.license.xml -Force
'@

Set-Content -Path $ToolsDir\chocolateyUninstall.ps1 -Encoding UTF8 -Value @'
Remove-Item -Path "$env:ChocolateyInstall\license\chocolatey.license.xml" -Force
'@

Set-Content -Path $PackageDirectory\chocolatey-license.nuspec -Encoding UTF8 -Value @'
<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://schemas.microsoft.com/packaging/2015/06/nuspec.xsd">
  <metadata>
    <id>chocolatey-license</id>
    <version>1.0.0</version>
    <title>Chocolatey License</title>
    <authors>Chocolatey Software, Inc</authors>
    <tags>chocolatey license</tags>
    <summary>Installs the Chocolatey commercial license file.</summary>
    <description>This package ensures installation of the Chocolatey commercial license file.
This should be installed internally prior to installing other packages, directly after Chocolatey is installed and prior to installing `chocolatey.extension` and `chocolatey-agent`.
The order for scripting is this:
* chocolatey
* chocolatey-license
* chocolatey.extension
* chocolatey-agent
If items are installed in any other order, it could have strange effects or fail.
    </description>
  </metadata>
  <files>
    <file src="tools\**" target="tools" />
  </files>
</package>
'@.Trim()

# Update the license
Copy-Item -Path $LicensePath -Destination $ToolsDir\chocolatey.license.xml -Force

# Get license expiration date and node count
[xml]$licenseXml = Get-Content -Path $LicensePath
$licenseExpiration = [datetimeoffset]::Parse("$($licenseXml.SelectSingleNode('/license').expiration) +0")
$null = $licenseXml.license.name -match "(?<=\[).*(?=\])"
$licenseNodeCount = $Matches.Values -replace '\s[A-Za-z]+',''

if ($licenseExpiration -lt [datetimeoffset]::UtcNow) {
    Write-Warning "THE LICENSE FILE AT '$LicensePath' is EXPIRED. This is the file used by this script to generate this package, not at '$licensePackageFolder'"
    Write-Warning "Please update the license file correctly in the environment FIRST, then rerun this script."
    throw "License is expired as of $($licenseExpiration.ToString()). Please use an up to date license."
}

if (-not $LicensePackageVersion) {
    $LicensePackageVersion = ($licenseExpiration | Get-Date -Format 'yyyy.MM.dd') + '.' + "$licenseNodeCount"
}

# Pack everything up
choco pack $WorkingDirectory\chocolatey-license\chocolatey-license.nuspec --output-directory="$WorkingDirectory" --version="$LicensePackageVersion"
```

## Uploading the License Package

We now need to upload this new package to the Nexus repository. Open a PowerShell window and run the following code (which will prompt you for information for values are not set):

```PowerShell
if (-not $FQDN) {
    $FQDN = "$(Read-Host -Prompt 'Please enter the FQDN for the Chocolatey for Business Azure Environment application')"
    if (([uri]$FQDN).Host) {$FQDN = ([uri]$FQDN).Host}
}
if (-not $NexusApiKey) {
    $NexusApiKey = "$(Read-Host -Prompt 'Please enter the API Key to be used to push Chocolatey packages to Nexus')"
}

$LicensePackage = (Get-Item $env:Temp\ChocolateyLicensedPackage\*.nupkg)[-1]
choco push $LicensePackage.FullName --source="https://$($FQDN)/nexus/repository/ChocolateyInternal/" --api-key="$NexusApiKey" --force
```

## Pushing the New License to Nodes

You can either rely on automation to push this package (and updated license) to your nodes, or refer to [these documents](xref:ccm-deployments) to trigger a deployment manually.
