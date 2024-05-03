---
order: 31
xref: howto-create-large-files-package
title: How To Create Chocolatey Packages With Large Files
description:  Creating a package containing files over 2GB in size
---

Chocolatey is built on top of NuGet, which itself does not gracefully handle packages that contain files over 2GB in size. When dealing with a scenario where you need to handle files larger than 2GB in size, it's important that the package reaches out to an external location to retrieve the large files. While UNC file paths do work as the location for such files, it is highly recommended to store them on a web host to make it easier to manage permissions.

Our example here will use a relatively small file to keep the tutorial short and easy to follow, but the methods uses seamlessly transpose to using a file of really any size.

### Creating Your Package

1. Open the `tutorials` folder in VS Code.
2. Press `Ctrl+Shift+P` or use the **View** menu and click on **Command Palette**.
3. Type `Chocolatey:` and select `Create new Chocolatey package` from the list of available commands.
4. Give your package a name, e.g. `large-files-package`.
5. Select `Default Template` when prompted.

### Create Your Install Script

Open the `chocolateyInstall.ps1` script from the VS Code Explorer pane. Replace the contents of the script with the following:

```powershell
$ErrorActionPreference = 'Stop';
$toolsDir   = "$(Split-Path -parent $MyInvocation.MyCommand.Definition)"
$url        = 'https://server:8443/repository/choco-install/npp.7.9.3.Installer.x64.zip'
$zipChecksum = 'c3a5c0d10747f80d0e60767b92a8ee4e8f0bdc5067b8747368fcf322926f887c'

$zipArgs = @{
	PackageName = $env:ChocolateyPackageName
	url = $url
	unzipLocation = $toolsDir
	checksum = $zipChecksum
	checksumType = 'SHA256'
}

Install-ChocolateyZipPackage @zipArgs


$fileLocation = Join-Path $toolsDir 'npp.7.9.3.Installer.x64.exe'

$packageArgs = @{
  packageName   = $env:ChocolateyPackageName
  fileType      = 'EXE'
  file = $fileLocation
  softwareName  = 'notepad*'
  checksum      = '942A5FA284DF6018AEC19110B0D9E68742194BFD44DD984B515ADF103D99775A'
  checksumType  = 'sha256'
  silentArgs    = "/S"
  validExitCodes= @(0)
  useOriginalLocation = $true
}

Install-ChocolateyInstallPackage @packageArgs
```

Save and close the file.

### Cleaning Up the Packaging

Our simple example here doesn't require anything special for an upgrade or uninstall scenario. In the VS Code Explorer pane find both the `chocolateyBeforeModify.ps1` and `chocolateyUninstall.ps1` files and remove them.

### Creating the Package Metadata

The package metadata is stored in a file with a `.nuspec`extension. It provides information to Chocolatey such as:

- Package ID
- Package Version
- Author
- Synopsis
- Dependencies

For packages being published to the [Chocolatey Community Repository](https://community.chocolatey.org/packages) additional information is required.
You can find information on package metadata requirements in our [Package Validator Rules](xref:package-validator-rules#requirements) documentation.

In the VS Code Explorer pane, find and open the `large-files-package.nuspec` file.

Replace the contents of the file with the following:

```xml
<!-- Do not remove this test for UTF-8: if “Ω” doesn’t appear as greek uppercase omega letter enclosed in quotation marks, you should use an editor that supports UTF-8, not this one. -->
<package xmlns="http://schemas.microsoft.com/packaging/2015/06/nuspec.xsd">
  <metadata>
    <id>large-files-package</id>
    <version>1.0.0</version>
    <title>large-files-package (Install)</title>
    <authors>Chocolatey Software</authors>
    <tags>large-files-package script tutorial</tags>
    <summary>Tutorial for script package</summary>
    <description>Tutorial for script package</description>
  </metadata>
  <files>
    <!-- this section controls what actually gets packaged into the Chocolatey package -->
    <file src="tools\**" target="tools" />
  </files>
</package>
```

### Compile Your Package

You can now run `choco pack` to compile your Chocolatey package, creating a file with a `.nupkg` extension, ready for installation!

1. In VS Code press `Ctrl+Shift+P` or use the **View** menu and click on **Command Palette**.
2. Type `Chocolatey:` and click `Chocolatey: Pack Chocolatey package(s)`.
3. Select `large-files-package.nuspec` from the list.
4. In **Additional arguments** enter `--output-directory='C:\tutorials'` and press `Enter`.

### Install Your Package

You can test your package, and see how it behaves. In an _elevated PowerShell command prompt_, run:

```powershell
choco install large-files-package -y --source='tutorials'
```

### Uninstall Your Package

You can test the uninstall behavior. In an _elevated PowerShell command prompt_, run:

```powershell
choco uninstall large-files-package -y
```

### Conclusion

At this point, you should have a working package that allows you to use files over 2GB in size! Congratulations! Hopefully you can apply this to other large files for packages!