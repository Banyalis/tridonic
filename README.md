# tr-website-frontend

[![pipeline status](https://git.dev.zgrp.net/tr.website/tr.website-frontend/badges/master/pipeline.svg)](https://git.dev.zgrp.net/tr.website/tr.website-frontend/-/commits/master)

Frontend of the Tridonic website 2021.

## Translations

The translations are maintained in the `etc/data/translation-keys.json`-file. The entries have the following structure:

```json
{
  "translationKey": {
    "description": "Description and usage of the translation key",
    "text": "Translated text"
  }
}
```

The `text` contains the translation in the default language (`en`). This file can be used to import the keys, the
description and the translation in the default-language, into an external system (eg. the CMS).

The mockserver will pick this file up, transform it to the structure, defined in the API description and serve it on
the designated endpoint. A server-restart upon key-update is not necessary, as it will read the file on every request.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


## Mockserver

To run the app for local development, the mockserver has to be started:

```bash
npm run mockserver
```


# Release

We use [standard-version](https://www.npmjs.com/package/standard-version) to automatically bundle new releases.
This will update the changelog, based on the commit messages and set the tag with the new version, according to
[semver](https://semver.org/).

**New releases should only be created on the `master`-branch**

To create a new release, execute following command. To push the changes and the new tag, follow the instructions at the
end of the output:

```bash
npm run release
```

If you want to make a dry run (without modifying anything), you can do this with the following command:

```bash
npm run release-dry-run
```


# Development

See [development documentation](./DEVELOP.md)


# Tests

To run the tests (Unit and E2E), execute following command:

```bash
npm run test
```
