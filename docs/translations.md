# Common translations

All the common translations (e.g. pagination back button text or search input placeholder) are fetched in `plugins/translations.js` module and injected into a context.

### Access translations

All translations are accessible in any component/page via `this.$translations` or just `$translations` in template

`this.$translations` is an object which contains keys from `etc/data/translation-keys.json` as a keys and `text` field values from `etc/data/translation-keys.json` as values, decorated as functions.

All values in `this.$translations` are functions.

So to access `back` translation from `etc/data/translation-keys.json` you should call `this.$translations.back()` function which will return the corresponding string.

### Pluralization

For pluralization the [messageformat](https://npmjs.org/messageformat) library is used.

To pluralize the string you should design the string in `etc/data/translation-keys.json` according to `messageformat` documentation.

Then this translation will be available via `this.$translations.someKey({ COUNT: 10 })`. `COUNT` is a param for `messageformat`. Note, that the name of this param is set via formatted string in `etc/data/translation-keys.json`

### Examples

#### Plain string

Add the key to `etc/data/translation-keys.json`:

```json
{
...
  "back": {
    "description": "Back button text for the pagination",
    "text": "back"
  }
}
```

And then access it from the component:

in template:

```vue
<div v-text="$translations.back()"></div>
```

and in script:

```js
this.$translations.back();
```


#### Pluralized string
Add the key to the `etc/data/translation-keys.json`:
```json
{
...
  "pluralizedArticle": {
    "description": "Text for count of articles in catalog (singular)",
    "text": "{ARTICLE_COUNT, plural, one {article} other {articles}}"
  }
}
```

`ARTICLE_COUNT` is the name of the parameter we gonna use in function to access pluralized string:

in template:

```vue
<div v-text="$translations.pluralizedArticle({ ARTICLE_COUNT: 10 })"
```

in script:

```js
this.$translations.pluralizedArticle({ ARTICLE_COUNT: 10 });
```
