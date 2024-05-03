---
order: 10
xref: choco-unable-to-load-service-index
title: Unable to Load Service Index Errors
description: Information on solutions/workarounds for a problem that can have multiple underlying causes
---

On occasion, you may run into issues where Chocolatey CLI is unable to communicate with a package source.
There are a number of possible reasons for this, many of which will result in a warning that looks like this:

> Unable to load the service index for source <URL>.

This page contains the currently known information about these errors, as well as how to further diagnose the problem and find a solution.

## Finding the Underlying Error(s)

In Chocolatey CLI v2.0.0 and v2.1.0, the underlying errors are not fully enumerated in the Chocolatey logs.
To discover the underlying issue causing the error in these versions, you will need to use a tool that can inspect network traffic, like Fiddler.
Gary Park has a [short YouTube video](https://www.youtube.com/watch?v=z4CwJ-MF7ik) describing how to use Fiddler to inspect the network traffic using Fiddler Classic.

As of Chocolatey CLI v2.2.0, the underlying errors will all be logged, but only a portion of the total stack of errors will be shown by default.
If more information is required, you will need to check the chocolatey.log file or re-run the command with the `--debug` option to see the additional errors.

## Known Issues

### SSL / TLS Errors

Some server configurations require specific TLS versions and cipher suites to be available in order for clients to connect to them.
As a result, users lacking these TLS versions or cipher suites may have issues communicating with package sources on these servers.
One such example is the Chocolatey Community Repository, which requires TLS 1.2 as a minimum.

Some examples of these kinds of error messages are:

> The request was aborted: Could not create SSL/TLS secure channel.

> HTTPS handshake to community.chocolatey.org (for #3) failed. System.Security.Authentication.AuthenticationException A call to SSPI failed, see inner exception.
> < The function requested is not supported
> 
> Win32 (SChannel) Native Error Code: 0x80090302

In these cases, one of two issues is present:

1. Your operating system is not using TLS 1.2 by default.
   TLS issues are mostly seen in older Windows systems, primarily Windows 7/Windows Server 2008 R2, and earlier.
1. Your operating system has a missing cipher suite that is required by the server.

In both cases, this can be most easily resolved using the `iiscrypto` tool to configure your operating system correctly.
This can be installed via Chocolatey CLI with:

```code
choco install iiscrypto
```

However, if you are having issues connecting to the Chocolatey Community Repository, you can [download the IIS Crypto tool from their website](https://www.nartac.com/Products/IISCrypto/) directly.
Once installed, open the IIS Crypto tool and follow these instructions:

1. On the **Schannel** tab (which is shown on starting the IIS Crypto tool by default) click the **Best Practices** button.
1. You will be prompted to click the Apply button, but follow the next steps before doing so.
1. Click on the **Cipher Suites** tab in the menu on the left to switch to it.
1. Click the **Best Practices** button again.
1. Click the **Apply** button.
1. Restart your computer.

If this does not resolve the issue, continue reading below.

### Certificate Errors

In some cases, users who are communicating with the Chocolatey Community Repository through a proxy server or a network gateway proxy have experienced issues where Chocolatey CLI is unable to verify the SSL Certificate.

A common error message in these circumstances looks like this:

> The remote certificate is invalid according to the validation procedure.

To confirm whether the issue is related to your proxy configuration, we recommend temporarily bypassing or disabling the proxy in order to verify whether you are otherwise able to communicate with the Chocolatey Community Repository.

Specific resolutions for various products which proxy traffic are outside the scope of this article; we suggest you contact your network administrator to resolve these issues.
