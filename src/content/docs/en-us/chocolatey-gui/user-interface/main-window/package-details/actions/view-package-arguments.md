---
order: 10
xref: gui-package-details-actions-view-package-arguments
title: View Package Arguments
description: Information on how to use the View Package Arguments action
---

Each time a package is installed, either via Chocolatey or Chocolatey GUI, the arguments that were passed into the
command are recorded, so that they can be re-used when performing an upgrade of the package.

> :choco-warning: **WARNING**
>
> The useRememberedArgumentsForUpgrades feature of Chocolatey needs to be enabled for this ability to be used.

It can be useful to view the remembered arguments that Chocolatey has stored for a given package version.

Clicking the `View Package Arguments` button while on the package details page for a package will show a modal window
populated with the arguments.  For example:

![Modal window showing the remembered package arguments for the current package version](/images/chocolatey-gui/user_interface_main-window_package-details_view-package-arguments.png "Modal window showing the remembered package arguments for the current package version")

If there are no remembered arguments for the current package version, this will also be shown:

![Modal window showing there were no remembered package arguments for the current package version](/images/chocolatey-gui/user_interface_main-window_package-details_view-package-arguments_empty.png "Modal window showing there were no remembered package arguments for the current package version")