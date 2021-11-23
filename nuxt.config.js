/**
 * Path that will be proxied to the mockserver's external-assets (it must match
 * the mockserver's `external-assets-virtual-path` argument, with a leading '/')
 * @type {string}
 */

const PROXY_PATH_EXTERNAL_RESOURCES = '/external-assets';

import { CONFIG_POPUPS, CONFIG_POPUPS_BLACK } from './utils/constants';

// eslint-disable-next-line nuxt/no-cjs-in-config
module.exports = {
    /*
     ** Nuxt routing named
     */
    router: {
        extendRoutes(routes, resolve) {
            Object.values(CONFIG_POPUPS).forEach((nr) => {
                routes.push({
                    name: nr.name,
                    path: nr.path + '/:popupSlug',
                    component: nr.component
                });
            });

            Object.values(CONFIG_POPUPS_BLACK).forEach((nr) => {
                routes.push({
                    name: nr.name,
                    path: nr.path + '/:popupSlug',
                    component: nr.component
                });
            });
        }
    },
    /*
     ** Nuxt rendering mode
     ** See https://nuxtjs.org/api/configuration-mode
     */
    mode: 'universal',
    /*
     ** Nuxt target
     ** See https://nuxtjs.org/api/configuration-target
     */
    target: 'server',
    /*
     ** Headers of the page
     ** See https://nuxtjs.org/api/configuration-head
     */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            },
            {
                hid: 'description',
                name: 'description',
                content: process.env.npm_package_description || ''
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    },
    /*
     ** Global CSS
     */
    css: ['@/assets/scss/fonts.scss', '@/assets/scss/base.scss'],
    /*
     ** Plugins to load before mounting the App
     ** https://nuxtjs.org/guide/plugins
     */
    plugins: [
        { src: '~/plugins/browser-detect.js', ssr: false },
        { src: '~/plugins/perfect-scrollbar.js', ssr: true },
        { src: '~/plugins/translations.js', ssr: true }
    ],
    /*
     ** Auto import components
     ** See https://nuxtjs.org/api/configuration-components
     */
    components: false,
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [
        // Doc: https://github.com/nuxt-community/eslint-module
        '@nuxtjs/eslint-module'
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        // Doc: https://buefy.github.io/#/documentation
        'nuxt-buefy',
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/style-resources',
        '@nuxtjs/svg-sprite',
        '@nuxtjs/proxy',
        'cookie-universal-nuxt',
        ['vue-scrollto/nuxt', { duration: 200 }]
    ],
    /*
     ** Axios module configuration
     ** See https://axios.nuxtjs.org/options
     */
    axios: {},
    proxy: _buildProxyConfig(),
    /*
     ** Build configuration
     ** See https://nuxtjs.org/api/configuration-build/
     */
    build: {
        transpile: ['vue-clamp', 'resize-detector']
    },
    /*
     ** Configuration, available to client and server
     ** See https://nuxtjs.org/guide/runtime-config
     */
    publicRuntimeConfig: {
        baseURL: process.env.SERVICE_URL
    },

    buefy: {
        materialDesignIconsHRef:
            'https://use.fontawesome.com/releases/v5.4.1/css/all.css',
        defaultIconPack: 'fa'
    },

    styleResources: {
        scss: ['@/assets/scss/constants.scss', '@/assets/scss/mixins.scss']
    }
};

function _buildProxyConfig() {
    if (process.env.NODE_ENV !== 'development') {
        return;
    }
    // Proxy-configs that are only available in dev-mode
    return { [PROXY_PATH_EXTERNAL_RESOURCES]: `${process.env.SERVICE_URL}` };
}
