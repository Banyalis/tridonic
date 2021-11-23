# Configurations

## Prettier

[Prettier](https://prettier.io/) will be used to auto-format the source-code. Configure your IDE/editor to
automatically format your code on save (for all supported file-formats), if possible. 

For the preferred configuration, see the config-file [.prettierrc](../.prettierrc)


## ESLint

[ESLint](https://eslint.org/) will be used for the static code analysis.

Additionally to the default ruleset, following rulesets will be applied as well:

- [Nuxt](https://www.npmjs.com/package/eslint-plugin-nuxt)
- [Prettier](https://www.npmjs.com/package/eslint-plugin-prettier)
- [SonarJS](https://www.npmjs.com/package/eslint-plugin-sonarjs)

For the preferred configuration, see the config-file [.eslintrc](../.eslintrc.js)


## SCSS/SASS

We recommend using [SCSS](https://sass-lang.com/documentation/syntax) as CSS extension language. It is quite similar
to LESS, but more powerful.

In order to make it work, the dev-dependencies `node-sass` and `sass-loader` have to be installed as well. See also
[official nuxt docs](https://nuxtjs.org/faq/pre-processors/).
