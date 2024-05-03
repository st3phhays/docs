---
order: 10
xref: qde-deprecation
title: Quick Deploy Environment Deprecation Notice
description: Landing page for old QDE links
showInNavbar: false
showInSidebar: false
redirectFrom:
- en-us/quick-deployment
- en-us/c4b-environments/quick-deployment
- en-us/c4b-environments/quick-deployment/index.html
- en-us/c4b-environments/quick-deployment/release-notes
- en-us/c4b-environments/quick-deployment/setup
- en-us/c4b-environments/quick-deployment/setup/index.html
- en-us/c4b-environments/quick-deployment/setup/desktop-readme
- en-us/c4b-environments/quick-deployment/setup/ssl-setup
- en-us/c4b-environments/quick-deployment/setup/client-setup
- en-us/c4b-environments/quick-deployment/setup/internet-setup
- en-us/c4b-environments/quick-deployment/setup/upgrade-license
- en-us/c4b-environments/quick-deployment/v1
- en-us/c4b-environments/quick-deployment/v1/index.html
- en-us/c4b-environments/quick-deployment/v1/setup
- en-us/c4b-environments/quick-deployment/v1/desktop-readme
- en-us/c4b-environments/quick-deployment/v1/ssl-setup
- en-us/c4b-environments/quick-deployment/v1/client-setup
---

## Why Has the Quick Deploy Environment Been Deprecated

The Quick Deploy Environment (QDE) solution has been deprecated in favor of our [Chocolatey For Business Quick Start Guide (QSG)](xref:c4b-quick-start-guide) and [Chocolatey For Business Azure Environment](xref:c4b-azure) offerings. The reasoning behind this is the Quick Deploy Environment became too complex and cumbersome to support given the need to build out several different format virtual-machine images to work across the ever-increasing number of Hypervisors being used by our customer base. The Quick Start Guide was created as a solution to this problem. It allows deploying the same components you find in a Quick Deploy Environment, but installing them as PowerShell steps rather than needing to bundle them all as a full Windows Server virtual-machine image. This allows customers to bring their own Windows Server virtual-machine setup into the Hypervisor of their choice. We just simply install the needed components onto the virtual-machine provided.

The Chocolatey For Business Azure Environment was later developed as our replacement for the Quick Deployment Environment Hyper-V to Azure offering. The Chocolatey For Business Azure Environment is a complete cloud native solution offered through the [Microsoft Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/chocolateysoftwareinc1605695330527.c4b_azure_qde). It stands up the same components of the previous Quick Deploy Environment and current Quick Start Guide solutions using the Azure cloud tooling for the host virtual-machine and networking.

## I Have a Quick Deploy Environment Solution In Place. What Should I Do Now?

While we don't support the Quick Deploy Environment as a new deployment option, if already deployed, you have the same components (Sonatype Nexus, Jenkins, and Chocolatey Central Management) as our current environment solutions. You simply need to keep them up-to-date going forward.

### How Do I Handle SSL Certificate Renewal?

Our [certificate renewal documentation](xref:quick-start-guide-cert-renewal) for the Quick Start Guide works on the older Quick Deploy Environment.

### How Do I Upgrade My Sonatype Nexus Instance?

The same [Sonatype Nexus upgrade documentation](xref:upgrade-nexus) works for the Quick Start Guide and Quick Deploy Environment solutions.

### How Do I Upgrade Chocolatey Central Management (CCM)?

See [Chocolatey Central Management Upgrade Documentation](xref:ccm-upgrade).

### How Do I Upgrade Jenkins?

See [Jenkins Upgrade Documentation](xref:upgrade-jenkins)
