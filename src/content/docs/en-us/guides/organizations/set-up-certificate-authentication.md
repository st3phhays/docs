---
order: 50
xref: set-up-certificate-authentication
title: How To Set Up a Repository With Certificate Authentication
description: How To Set Up a Repository With Certificate Authentication
---

## Overview

Chocolatey CLI has the capability to use [Client Certificates](https://en.wikipedia.org/wiki/Client_certificate) to authenticate to http(s) based sources that require [mutual TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security#Client-authenticated_TLS_handshake). This guide provides some information about setting it up on both the client side and the server side.

## Chocolatey CLI Client Setup

Chocolatey CLI requires an x509 `.pfx` file that contains the client certificate with the private key. This `.pfx` file can be specified in two different ways. The first is to use the `--cert` option when running commands, the second is to specify it as part of a saved source.

### Using the `--cert` Option

The `--cert` option is used to specify the path to the `.pfx` file. If the certificate is password protected, the `--certpassword` option is also required. Certificates specified on the command line apply to all sources. Below is an example of the outdated command using the `--cert` option:

```
choco outdated --source="'https://repository.example.com/api/v2/'" --cert="'C:\path\to\certificate.pfx'" --certpassword="'<CERTIFICATE PASSWORD>'"
```

### Adding a Certificate to a Configured Source

Certificates can also be added to configured sources. Just like for other commands, the `--cert` option is used to specify the path to the `.pfx` file and the the `--certpassword` option is used to specify the password, if required. When adding/updating a source and specifying a certificate, it applies to that source only.

```
choco source add --name="'Internal-Repository'" --source="'https://repository.example.com/api/v2/'" --cert="'C:\path\to\certificate.pfx'" --certpassword="'<CERTIFICATE PASSWORD>'"
```

## Repository Setup

Most package repositories do not natively support client certificate authentication, instead requiring a reverse proxy like Nginx or Apache to do that. This may take the form of having the repository allowing anonymous access, and handling all authentication on the reverse proxy side, or the repository may support user authentication via a header after the reverse proxy validates the certificate.

### Generating the Certificates

In organizational contexts, where the organization already has client certificates distributed to users, the certificate of the certificate authority can be used to authenticate clients. 

In other cases, a certificate authority and client certificates will need to be generated. There is an [external blog post](https://fardog.io/blog/2017/12/30/client-side-certificate-authentication-with-nginx/) that goes into detail about how these could be generated for Nginx.

### Reverse Proxy Setup

There are many configuration scenarios and reverse proxies available. Far too many to give specific recommendations. However, to give a general idea for using Nginx; once the reverse proxy is set up, client certificates can be enabled like this:

1. Copy the public key of the certificate authority to a location that Nginx can access.
2. Add these lines to the Nginx configuration under the `server` that is reverse-proxying the repository:
```
# client certificate
ssl_client_certificate /path/to/certs/ca.crt;
ssl_verify_client on;
```
3. Reload the Nginx configuration with `nginx -S reload`.

The following guides are available:

* For Apache, there is a [guide from Sonatype](https://help.sonatype.com/repomanager3/nexus-repository-administration/user-authentication/authentication-via-remote-user-token#AuthenticationviaRemoteUserToken-ConfiguringtheReverseProxy).
* For Artifactory, [JFrog has different recommendations](https://www.jfrog.com/confluence/display/JFROG/HTTP+Settings#HTTPSettings-ConfiguringaReverseProxytoSupportmTLSconfigreverseproxy).

In the case that the repository itself is configured for anonymous/public access, there are no steps required on the repository end.

### Using Sonatype Nexus

Sonatype Nexus has the capability to use the client certificate common name to authenticate a a specific user. There are set up instructions below, which are based on the [official documentation](https://help.sonatype.com/repomanager3/nexus-repository-administration/user-authentication/authentication-via-remote-user-token), but modified to be based on Nginx instead of Apache:

1. Create a user named `Choco-User` that can access the `nuget-testing` repository.
1. Enable the "Rut Auth Realm" in Settings -> Security -> Realms.
1. Add the "Rut Auth" capability under Settings -> System ->  Capabilities -> Create Capability with the http header name being `X-SSO-USER`.
1. Add the [below snippet to the Nginx configuration](https://stackoverflow.com/questions/55325548/getting-common-name-from-distinguished-name-of-client-certificate-in-nginx), right before the `server` block:

```
map $ssl_client_s_dn $ssl_client_s_dn_cn {
    default "";
    ~CN=(?<CN>[^,]+) $CN;
}
```
1. Add the below snippet inside the `location` block in the `server` block of the reverse proxy and then reload the Nginx config:

```
# Set header for Nexus Auth
proxy_set_header X-SSO-USER $ssl_client_s_dn_cn;
```
1. Add users to Nexus.
    * The username should match the Common Name (CN) of the client certificate.
    * Assign appropriate permissions to each Nexus user, according to what the owner of the client certificate should have access to.
    * Depending on how the client certificates are generated and the pattern of Common Names used, it may be possible to use external role mapping to automatically set this up.
1. Test out the configuration, see the Client Setup section above.
