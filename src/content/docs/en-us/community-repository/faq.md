---
order: 90
xref: ccr-faq
title: Chocolatey Community Repository FAQ
description: Chocolatey Community Repository Frequently Asked Questions
---

### How Do I Ask Questions About a Package?

If you have a question about the _package_, please follow **both** these steps:

1. [Contact the package Maintainers](#how-do-i-contact-the-package-maintainers). Some Maintainers have opted-out of receiving email, so this option may not be available.
1. [Find the package source](#how-do-i-find-the-package-source) and if the repository supports it, raise a discussion. The majority of Maintainers have the package source on a platform such as GitHub which allows issues and discussions to be created, if enabled.

![Package Source link on the Chocolatey Community Repository package page](/images/triage-packagesource.jpg)

### How Do I Ask Questions About the Package Software?

If you have questions about the _software_ the package installs, please contact the Software Vendor/Author. Maintainers do not provide support for the software that is packaged.

If you want to ask questions about the _package_, see [here](#how-do-i-ask-questions-about-a-package).

### How Do I Contact the Package Maintainers?

You may want to contact the package maintainers with package questions, or to report a broken or outdated package. On the [Chocolatey Community Repository](https://community.chocolatey.org/packages) package page, click the **Contact Maintainers** link.

![Contact Maintainers link on the Chocolatey Community Repository package page](/images/triage-maintainers.jpg)

If your question is about the software installed by the package, please contact the Software Vendor or Author directly as package maintainers cannot provide software support. The exception is if the package Maintainer is also the Software Vendor/Author. You can find out who the package maintainers are on the [Chocolatey Community Repository](https://community.chocolatey.org/packages) package page.

![Package Maintainers profile links on the Chocolatey Community Repository](/images/triage-maintainerlinks.jpg)

### How Do I Contact the Site Admins?

You should contact the Site Admins if:

* You have read this FAQ and your question is not answered.

You should not contact the Site Admins to:

* [Request a package be updated](xref:package-triage-process#package-is-outdated).
* [Report a package is outdated](xref:package-triage-process#package-is-outdated).
* Marketing or sales communications.
* [Ask for package support](#how-do-i-ask-questions-about-a-package).
* [Ask for support on the packaged software](#how-do-i-ask-questions-about-the-package-software).
* [Ask for Chocolatey product support](https://chocolatey.org/support).

To contact the Site Admins, click the **Contact Site Admins** link to contact the site Administrators. Please include as much information as possible including dates and times. The Site Administrators will then follow up with you.

![Contact Site Admins link on the Chocolatey Community Repository package page](/images/triage-siteadmins.jpg)

### How Do I Create Chocolatey Packages?

It's easy to [create and maintain packages](xref:create-packages).

### How Do I Find the Package Source?

On the [Chocolatey Community Repository](https://community.chocolatey.org/packages) package page, click the **Package Source** link, if it's available.

![Package Source link on the Chocolatey Community Repository](/images/triage-packagesource.jpg)

Not all Maintainers provide a publicly accessible package source. If the **Package Source** link is missing, you also could try to find a link to the package sources in the profiles of the Maintainers.

![Package Maintainers profile links on the Chocolatey Community Repository](/images/triage-maintainerlinks.jpg)
![Package Maintainer profile on the Chocolatey Community Repository with GitHub repository link](/images/triage-maintainerrepository.jpg)

### How Do I Inspect the Contents of a Chocolatey Package?

> :choco-info: **NOTE**
>
> Packages submitted before 2014 do not have files listed under the **Files** section.

The contents of every Chocolatey package is available to be inspected both on the Chocolatey Community Repository package page under the **Files** section.

![Chocolatey Community Repository package files section with chocolateyInstall.ps1 PowerShell script expanded](/images/moderation-10.jpg)

You can also download the actual package and inspect the contents. On the left menu there is a **Download** button where you can download and rename the `.nupkg` file extension to `.zip`, extract it and see the contents.

![Download package button on the Chocolatey Community Repository](/images/triage-download.jpg)

### How Do I See All Versions Of a Package

Packages can have multiple version, both stable and prerelease. All of these versions are listed on the package page and can be found by scrolling down the page to the **Version History** section and clicking the link.

![Version History section of the package page on the Chocolatey Community Repository](/images/packagepage-versionhistory.jpg)

Only a limited number are shown initially. If there are more version available, click the **Show Additional Versions** button to view them all.

### How Do I See the Package Source Code?

See [this FAQ question](#how-do-i-find-the-package-source).

### How To Report An Abusive Package

> :choco-info: **NOTE**
> 
> Do not use the **Report Abuse** form to submit reports of:
>
> * [A package being outdated](xref:package-triage-process#package-is-outdated).
> * [A package being broken or not working](xref:package-triage-process#package-is-broken).
> * Marketing or sales communications.
> * [Package support](#how-do-i-ask-questions-about-a-package).
> * [Support on the packaged software](#how-do-i-ask-questions-about-the-package-software).
> * [Chocolatey product support or help](https://chocolatey.org/support).

We take package abuse very seriously. But what is package abuse, or an abusive package?

There are many definitions of what could make a package, or the software it installs, abusive. An abusive package could be:

* A package that installs software that contains malware, adware, or potentially unwanted applications (PUA).
* A package that violates [distribution rights](xref:legal#distributions).

If a package is abusive, please report it by clicking on the **Report Abuse** link on the package page, fill out and submit the form. The Site Administrators will follow up with you.

![How to report abuse on the Chocolatey Community Repository](/images/triage-reportabuse.jpg)
