---
Order: 20
xref: intune-configuration
Title: Intune Configuration
Description: Intune specific configuration of available commands.
---

<?! Include "../../../shared/intune-note.txt" /?>

## Summary

This document contains information about the configuration values available through the use of `choco config` and similar commands that are a part of the new Intune functionality.

## Configuration Values

Several new configuration values can be set/updated for the new Intune functionality. These configuration values are for pushing packages to your Intune tenant, and most do not need to be changed.

- `intuneTenantGUID` - The tenant to use by default when no `--source` argument is used on the `push` command. The GUID is available on the [Azure AD Application page](https://aad.portal.azure.com/).
- `intuneAuthenticationUrl` - The URL used when authenticating to the Microsoft Intune API. _Only change this if you know what you are doing_.
- `intuneApiUrl` - The URL used when handling requests to the Intune API, for instance, when checking for available packages on Intune.  _Only change this if you know what you are doing_.
- `intuneRetryIntervalInSeconds` - The amount of time, in seconds, that Chocolatey should wait before retrying any calls to the Intune API (_Defaults to 5 seconds_).
- `intuneUploadTimeoutInSeconds` - The amount of time, in seconds, that Chocolatey should wait for completion while uploading files to Intune (_Defaults to 600 seconds_).
- `intuneUploadChunkSizeInMegabytes` - The size of the file, in megabytes, below which Chocolatey will split the upload into multiple chunks. Above this size, Chocolatey will make a best effort to break the upload into logical chunk sizes (_Defaults to 10 megabytes_).

## API Keys

When pushing packages to an Intune tenant, a combination of a Client ID and Client Secret is needed. These can be obtained from the [Azure AD Portal](https://aad.portal.azure.com/) where the Client ID is the value for **Application ID** and the **Secret** is the Client Secret. You can use these on the command line when running the `choco push` command by using the `--source=<INTUNE TENANT GUID>` argument with the `--api-key=<CLIENT ID>:<CLIENT SECRET>` argument.