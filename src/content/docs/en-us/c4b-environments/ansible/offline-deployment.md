---
order: 41
xref: c4b-ansible-offline-deployment
title: Preparing for an Offline Deployment
description: How to deploy Chocolatey for Business Ansible Environment without an internet connection
---

## Summary

In some environments, you won't be able to rely on downloadable resources from the internet. For these purposes, you can prepare the Chocolatey for Business Ansible Environment to be deployed without an internet connection.

## Prerequisites

- A Windows machine capable of running Chocolatey.
- An internet connection.
- PowerShell 5.0+.
- A Chocolatey for Business license or Trial license.
- A compatible PFX certificate to use for your deployment.

## Preparing for Offline Deployment

1. To begin, download or clone the `c4b-ansible` repository to your local machine.

1. Open a PowerShell terminal and navigate to the repository directory that contains the files you downloaded, above.

1. In the PowerShell terminal run the `OfflineInstallPreparation.ps1` script with the following arguments:

    a. `-LicensePath`: The path to your Chocolatey license file, if it's not installed in the default location.
    a. `-CertificatePath`: The path to your PFX certificate.
    a. `-CertificatePassword`: A `SecureString` of your PFX certificate password.
        If you do not provide it, you will be prompted to enter it securely.

    ```PowerShell
        .\OfflineInstallPreparation.ps1 -LicensePath ~\Downloads\chocolatey.license.xml -CertificatePath ~\Downloads\c4b.pfx
    ```

1. Transfer the content of the repository, including the files directory, to your offline environment and deploy it as per the instructions within the [main document](xref:c4b-ansible#setup).
