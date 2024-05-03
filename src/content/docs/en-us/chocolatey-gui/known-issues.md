---
order: 70
xref: chocolateygui-known-issues
title: Known Issues
description: Current known issues regarding Chocolatey GUI
redirectFrom: docs/chocolatey-gui-known-issues
---

## Not all available packages are shown, or there is no way to navigate to next page of results

Chocolatey GUI is reliant on the repository server providing accurate information in order to determine whether there are more packages available than it was given in the first set of results.
In some implementations of NuGet v3 feeds, we have observed that the repository server is returning incorrect information.
As a result, there are cases where Chocolatey GUI may not be able to display all packages that the repository server has in its list.

Currently, we are aware of this affecting Sonatype Nexus NuGet v3 repository feeds, but any repository implementation that reports incorrect metadata may result in similar issues.
Follow [the NEXUS-37861 Jira ticket](https://issues.sonatype.org/browse/NEXUS-38761) for further information on when this will be resolved by Sonatype.

### Technical details

Chocolatey GUI works on the concept of "pages" of packages.
This means that it will request only a subset of the total number of packages that exist on a particular repository server.
By default, Chocolatey GUI requests packages in a page size of 30.
If the page of packages returned has less than 30, Chocolatey GUI takes this to mean that there are no further packages to be returned, since it wasn't a full page.
In order for Chocolatey GUI to correctly display and paginate through all available packages, it is reliant on the correct information coming back from the repository server that is being queried.
In other words, the pages of packages that are returned need to be correct.

During testing, there have been cases where a lower number of packages than was known to exist on the repository server was returned.
When this happens, Chocolatey GUI determines that there are no more packages on the server to request.
The result is that not all packages are displayed within Chocolatey GUI if this occurs.

In addition, there have been cases where information about the total number of packages that exist on the repository server has not been returned correctly.
Where this has been witnessed to happen, the total number of packages is reported by the server as `1`, rather than the actual number.
Chocolatey GUI relies on this information in order to know how many pages of packages need to be shown, so that the correct `Next`, `Previous`, `First`, and `Last` buttons can be shown.
When the information is returned incorrectly from the repository server, the result is that all the pagination buttons are disabled, and can't be clicked.

## Package installation arguments are not remembered when upgrading a package with Chocolatey GUI

When the `useRememberedArgumentsForUpgrades` Chocolatey feature is enabled, package arguments are not correctly retained when upgrading packages.

This is due to [a known bug in chocolatey.lib](https://github.com/chocolatey/choco/issues/2886).

If you need to use this feature, you must currently upgrade affected packages via Chocolatey CLI instead of Chocolatey GUI.


## Chocolatey GUI asking for credentials for my non-administrator accounts

If a user is a member of the Built-in AD group `Network Configuration Operators`, then that means they have an elevation token available and will be treated in the same way as administrative accounts. To fix this, you have two options:

* Remove the users from `Network Configuration Operators` - PowerShell offers an alternative to `ipconfig /flushdns` that does not require admin permissions - `Clear-DnsClientCache`.
* OR change the ChocolateyGui.exe.manifest file in v0.17.0+ in the Chocolatey GUI folder under Program Files to `<requestedExecutionLevel level="asInvoker" uiAccess="false" />` (from `highestAvailable`).

Please see the following [GitHub Issue](https://github.com/chocolatey/ChocolateyGUI/issues/629) for more details.


## Pin command does not work when running with Background Mode enabled

In the current versions of Chocolatey CLI (v0.11.1) and Chocolatey GUI (v0.19.0), when attempting to pin a package using the Chocolatey CLI (choco.exe) with Background Mode enabled, things will work as expected.  i.e. when running: `choco pin add --name="procmon"`.

The procmon package will be correctly pinned.

However, if you attempt the same operation via Chocolatey GUI, using the "Pin (Ignore Updates)" context menu, you will get an error stating:

> Failed to pin package
>
> Exception: System.NullReferenceException: Object reference not set to an instance of an object

This was fixed as part of a feature addition within [Chocolatey GUI Licensed Extension V 0.2.0](xref:chocolatey-gui-licensed-extension-release-notes#march-9-2021).


## chocolateyguicli Command Not Registered by System

If you recieve an error in the shell stating `chocolateyguicli is not registered` or `ObjectNotFound`, please go through the following steps.

1. Reinstall the `chococlateygui` package. `choco upgrade chocolateygui -y --force`
1. If step 1 did not fix the issue, please check that your antivirus software is not blocking the Chocolatey GUI Config from being written to. The Chocolatey GUI Config file can be located at `C:\ProgramData\Chocolatey GUI\Config\Data.db`.
1. If further assistance is needed please reach out via your support means. Listed by running `choco support`. If running Chocolatey OSS please reach out via our [Community Chat](https://ch0.co/community).

## Package Installation Failures Don't Always Report Errors

When installing packages with Chocolatey GUI, only the log output of the first installation is processed by Chocolatey GUI for reporting errors.

This is due to a [known bug in Chocolatey GUI](https://github.com/chocolatey/ChocolateyGUI/issues/998).
