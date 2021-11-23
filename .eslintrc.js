module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        '@nuxtjs',
        'prettier',
        'prettier/vue',
        'plugin:prettier/recommended',
        'plugin:nuxt/recommended',
        'plugin:sonarjs/recommended'
    ],
    plugins: ['nuxt', 'only-error', 'prettier', 'sonarjs'],
    // add your custom rules here
    rules: {
        'prettier/prettier': ['error']
    }
};
