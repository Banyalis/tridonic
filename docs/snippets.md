# Snippets

## Render WYSIWYG

In order to render HTML-code in a `vue`-template, use the `v-html`-directive and suppress the ESLint-rule via comment.

**However, use direct HTML-rendering scarcely and only when it's necessary as it may introduce dangerous XSS
security issues** 

```html
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p class="title is-2 mission-statement" v-html="missionStatement"></p>
```
