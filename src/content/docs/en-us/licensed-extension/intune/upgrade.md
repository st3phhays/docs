---
order: 45
xref: intune-upgrade
title: Upgrading Chocolatey versions through Intune
description: How ot upgrade Chocolatey versions through Intune
---

<?! Include "../../../shared/intune-note.txt" /?>

## Upgrade Considerations

As with all upgrades, it is highly recommended that you do a test deployment to ensure the upgrade process works in your environment prior to deploying it to all systems.

## Minor / Patch Version Upgrades

### Chocolatey CLI Upgrade

The upgrade of minor, or patch, Chocolatey CLI versions that have been deployed through Intune is relatively straightforward.
For example when upgrading from **v1.3.1** to **v1.4.0** of Chocolatey CLI, the process looks like this:

1. Ensure you have downloaded Chocolatey CLI v1.4.0: `choco download chocolatey --version 1.4.0`.
1. Convert the Chocolatey CLI Package: `choco convert chocolatey.1.4.0.nupkg --to=intune`.
1. Push the converted package to Intune: `choco push chocolatey.1.4.0.intunewin --to=intune`.
1. Deploy the upgrade to a group of test computers.
1. When you are ready for full deployment to the rest of your computers, you can replace this version as the dependency on your Chocolatey Licensed Extension and Chocolatey License packages to make it more streamlined.

### Updating Existing Chocolatey License and Chocolatey Licensed Extension Packages

When you are ready for full deployment to all computers, you need to update the Chocolatey CLI that your Chocolatey License and Chocolatey Licensed packages depend on. Below is an example of how to upgrade from Chocolatey CLI v1.2.1 to v1.4.0, but the process is the same whatever version you are using:

1. Navigate to the [Intune Windows apps pane](https://endpoint.microsoft.com/#view/Microsoft_Intune_DeviceSettings/AppsWindowsMenu/~/windowsApps) and search for `Chocolatey License`.
1. For each of the "Chocolatey License" and "Chocolatey Licensed Extension" packages:
    1. Navigate to the **Properties** pane, scroll to **Dependencies** and click **Edit**.
    1. Select the three dots to the right of your Chocolatey CLI package (Chocolatey (v1.2.1)) and select **Remove**.
    1. Click **+ Add**.
    1. Find and Select the new Chocolatey CLI package (Chocolatey (v1.4.0)).
    1. Click **Review + save** twice followed by **Save**.

### Chocolatey License Extension Upgrade

The upgrade of Chocolatey Licensed Extension versions that have been deployed through Intune is relatively straightforward.
For example when upgrading from **v5.0.0** to **v5.0.3** of Chocolatey Licensed Extension, the process is:

1. Ensure you have downloaded Chocolatey Licensed Extension v5.0.3: `choco download chocolatey.extension --version 5.0.3`.
1. Convert the Chocolatey Licensed Extension Package: `choco convert chocolatey.extension.5.0.3.nupkg --to=intune`.
1. Push the converted package to Intune: `choco push chocolatey.extension.5.0.3.intunewin --to=intune`.
1. Deploy the upgrade to a group of test computers.

When you are ready for full deployment to the rest of your computers, you can [update your existing packages](#updating-existing-chocolatey-packages).

### Updating Existing Chocolatey Packages

When you are ready for full deployment to all computers, you need to update the Chocolatey Licensed Extension that your packages depend on. Below is an example of how to upgrade from Chocolatey Licensed Extension v5.0.0 to v5.0.3, but the process is the same whatever version you are using:

1. Navigate to the [Intune Windows apps pane](https://endpoint.microsoft.com/#view/Microsoft_Intune_DeviceSettings/AppsWindowsMenu/~/windowsApps) and search for the package you want to update.
1. Navigate to the **Properties** pane, scroll to **Dependencies** and click **Edit**.
1. Select the three dots to the right of your Chocolatey Licensed Extension package (Chocolatey Licensed Extension (v5.0.0)) and select **Remove**.
1. Click **+ Add**.
1. Find and Select the new Chocolatey Licensed Extension package (Chocolatey Licensed Extension (v5.0.3)).
1. Click **Review + save** twice followed by **Save**.

## Major Versions

### Chocolatey Products

Due to the related dependencies and how they are typically specific across major versions of Chocolatey products, a specific upgrade process must be followed.
For example, when upgrading from **v1.x** to a **v2.x** version of a Chocolatey product, the process is:

1. Ensure you are on the latest stable versions of the Chocolatey products for your current major version.
   For **v1.x** of Chocolatey CLI, this will be **v1.4.0** of Chocolatey CLI, **v5.0.3** of Chocolatey Licensed Extension, **v1.1.3** version of Chocolatey GUI, **v1.0.3** of Chocolatey GUI Licensed Extension, and **v1.1.2** of Chocolatey Agent.
1. Verify what your "Chocolatey License" package version is in Intune (It will be in the format of `Year.Month.Day.NodeCount` with leading zeroes. For example a 100 node count license expiring June 15 2024 will be version 2024.06.15.100).
1. Ensure you have downloaded all of the Chocolatey products to your working directory.
  <?! Include "../../../shared/intune-download-architect.txt" /?>
  <?! Include "../../../shared/intune-download-business.txt" /?>
1. Convert Chocolatey CLI: `choco convert chocolatey.<version>.nupkg --to=intune` (This will create an all encompassing intunewin file that contains all Chocolatey products. See the [FAQ](xref:intune-faq#why-do-i-need-all-of-the-chocolatey-products-if-im-not-using-them) for further information.).
1. Convert Chocolatey Licensed Extension: `choco convert chocolatey.extension.<version>.nupkg --to=intune`.
1. Push Chocolatey CLI to Intune: `choco push chocolatey.<version>.intunewin`.
1. Push Chocolatey Licensed Extension to Intune: `choco push chocolatey.extension.<version>.intunewin`.
1. If your Chocolatey License package version contains a leading 0 see the [next section](#chocolatey-license-considerations).
1. You can now deploy any other Chocolatey package.

### Chocolatey License Considerations

> :choco-info: **NOTE**
>
> If  your license expires on a date with a single digit day or month (for example: July 31, 2024 (2024-7-31) or October 5, 2023 (2023-10-5)), care must be taken when upgrading Chocolatey CLI due to version number normalization in version 2.x.

If your Chocolatey License package version contains a leading 0; follow the preceding steps for [updating Chocolatey Products](#chocolatey-products), then:

1. Navigate to the [Intune Windows apps pane](https://endpoint.microsoft.com/#view/Microsoft_Intune_DeviceSettings/AppsWindowsMenu/~/windowsApps) and search for `Chocolatey Licensed Extension`.
1. For each entry here navigate to the **Properties** pane, scroll to **Dependencies** and click **Edit**.
1. Select the three dots to the right of your License Package ("Chocolatey License (v2024.6.15.100)" in above example) and select **Remove**.
1. Click **+ Add**.
1. Find and Select the license with the leading zeroes ("Chocolatey License (v2024.06.15.100)" in above example).
1. Click **Review + save** twice followed by **Save**.
