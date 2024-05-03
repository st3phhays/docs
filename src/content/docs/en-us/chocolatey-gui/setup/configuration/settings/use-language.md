---
order: 30
xref: use-language
title: Use Language
description: Information on how to use the Use Language setting
---

By default, Chocolatey GUI will use the locale defined on your machine, to translate the various sections of the user
interface.  However, there are times when you may want to use a locale other than the one defined on your machine.  The
UseLanguage configuration setting allows the user to choose what language (from the list of currently [available languages](xref:use-language#available-languages)),
to use.

> :choco-info: **NOTE**
>
> This configuration setting appears in a slightly different area of the Chocolatey GUI settings screen
>
> ![Showing the choosing of language within settings](/images/chocolatey-gui/user_interface_settings_language.png "Showing the choosing of language within settings")

## Example

To set this configuration parameter, for the currently logged in user, you can run the following:

```powershell
chocolateyguicli config set --name="'UseLanguage'" --value="'de'"
```

Or to set it globally at the machine level, run the following:

```powershell
chocolateyguicli config set --name="'UseLanguage'" --value="'de'" --global
```

See the list of currently [available languages](xref:use-language#available-languages) for the value to use when setting
the language.

## Available Languages

Currently, the following languages can be selected:

- `cs-CZ-` - čeština (Česko) (Czech (Czechia))
- `de` - Deutsch (German)
- `en` - English (English)
- `en_US` - English (United States) (English (United States))
- `es` - español (Spanish)
- `fr` - français (French)
- `nl` - Nederlands (Dutch)
- `nb` - norsk bokmål (Norwegian Bokmål)
- `pt` - português (Portuguese)
- `zh_CN` - 中文(中国) (Chinese (Simplified, China))

> :choco-info: **NOTE**
>
> Chocolatey GUI only uses languages that have over 60% of the languages strings translated. If your desired language
> isn't in the list above, then feel free to join the [localization effort](xref:gui-localization).

## Default Value

The default value for this configuration is the locale defined on your machine if it exists, falling back to English if there is no translation available.

## Availability

The ability to control this setting from the Chocolatey GUI Settings screen has existed since Chocolatey GUI v0.20.0.

The ability to control this feature from the command line using `chocolateyguicli` has existed since Chocolatey GUI
v0.20.0.