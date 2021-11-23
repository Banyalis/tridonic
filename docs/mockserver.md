# Mockserver

In order to keep the frontend compliant to the API-description and compatible to other environments, a mockserver that
implements the API-description, is used.

## Installation

The mockserver and the implemented API-description are available at
[tr.website-poc-api](https://git.dev.zgrp.net/tr.website/poc/tr.website-poc-api).

To install the mockserver, simply add it as a dev-dependency (SSH has to be used, in order to make it work on our CI
servers):

```bash
npm install -D "git+ssh://git@git.dev.zgrp.net:tr.website/poc/tr.website-poc-api.git#semver:v0.2.0"
```

If the mockserver has to be updated, simply execute the command again with the updated the semantic version at the end.

```bash
npm install -D "git+ssh://git@git.dev.zgrp.net:tr.website/poc/tr.website-poc-api.git#semver:v0.3.0"
```
