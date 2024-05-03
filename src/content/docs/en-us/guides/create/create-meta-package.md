---
order: 7
xref: howto-create-metapackage
title: How To Create a Chocolatey Meta Package
description: Creating a Chocolatey meta package allowing you to, in a single package installation, provision many things onto a computer
---

Meta packages are essentially "bundles" of Chocolatey packages, allowing you to, in a single package installation, provision many things onto a computer. Meta packages work by only defining dependencies inside their package metadata. There is no need for a `tools` directory, or any scripting. Chocolatey's built-in dependency resolver does all the work for you! This is handy for things like setting up a developer computer where you may want to do something like `choco install developertools -y` and have that package actually install:

- Visual Studio
- Any necessary Visual Studio workloads
- Git
- BeyondCompare
- VS Code
- GitKraken
- Cake

Meta packages are a really cool trick to keep up your sleeve, let's go ahead and create one now!

### Creating Your Meta Package

1. Open the `tutorials` folder in VS Code.
2. Press `Ctrl+Shift+P` or use the **View** menu and click on **Command Palette**.
3. Type `Chocolatey:` and select `Create new Chocolatey package` from the list of available commands.
4. Give your package a name, e.g. `meta-package`.
5. Select `Default Template` when prompted.

### Creating Your Package Metadata

Our meta package is a very simple example of one. We'll install the `putty.portable` package with our meta package. While you can leverage the full power of Chocolatey dependency [versioning](xref:package-dependencies), our simple example leaves off any version requirements ensuring the latest available version of the `putty.portable` package is installed.

Replace the contents of `meta-package.nuspec` with the following:

```xml
<package xmlns="http://schemas.microsoft.com/packaging/2015/06/nuspec.xsd">
  <metadata>
    <id>meta-package</id>
    <version>1.0.0</version>
    <title>meta-package (Install)</title>
    <authors>Chocolatey Software</authors>
    <tags>meta-package tutorial</tags>
    <summary>Tutorial for creating metapackages</summary>
    <description>Tutorial for creating metapackages</description>
    <dependencies>
      <dependency id="putty.portable" />
    </dependencies>
  </metadata>
</package>
```

### Compile Your Meta Package

The `choco pack` command is used to compile your Chocolatey package, creating a file with a `.nupkg` extension.

1. In VS Code press `Ctrl+Shift+P` or use the **View** menu and click on **Command Palette**.
2. Type `Chocolatey:` and click `Chocolatey: Pack Chocolatey package(s)`.
3. Select `meta-package.nuspec` from the list.
4. In **Additional Arguments** enter `--output-directory='C:\tutorials'` and press `Enter`.

### Install Your Meta Package

You can test your package, and see how it behaves with the following command in an _elevated PowerShell command prompt_:

```powershell
choco install meta-package -y
```

### Uninstall Your Script Meta Package

You'll need to use special consideration when uninstalling a meta package. By default, all dependent packages installed as part of the package are removed from the system. You can remove the dependencies as well by adding `--remove-dependencies` to your uninstall command. **Be warned**, however, that adding this switch will apply to _all_ dependencies, which may cause other packages to break.

You can test the uninstall behavior with the following, note we _will_ pass `--remove-dependencies`, as in this case it is known that only the packages we installed will be removed, so it is safe to do so. Run the following command in an _elevated PowerShell command prompt_:

```powershell
choco uninstall meta-package -y --remove-dependencies
```

### Conclusion

At this point, you should have a working meta package! Congratulations! Hopefully you can apply this to other meta package ideas you may have!