import axios from 'axios';
import { DEFAULT_LANGUAGE, DEFAULT_REGION } from '@/utils/constants';
import MessageFormat from 'messageformat';

export default async (context, inject) => {
    const { $config } = context;
    const { language, region, prmsLocaleInfo } = await _determineLocaleInfo(
        context
    );
    // We're using a promise here, because `nuxtServerInit` doesn't wait for plugin-promises to be resolved
    context.$prmsLocaleInfo = prmsLocaleInfo;

    await prmsLocaleInfo;
    const res = await axios.get(
        `${$config.baseURL}/${language}/${region}/translations`
    );

    const translations = _compileTranslations(res.data, language);
    inject('translations', translations);
};

function _compileTranslations(translationStrings = {}, languageCode) {
    const messageFormat = new MessageFormat(languageCode);
    const compiledStrings = {};
    Object.entries(translationStrings).forEach(([stringKey, stringValue]) => {
        compiledStrings[stringKey] = messageFormat.compile(stringValue);
    });

    return compiledStrings;
}

async function _determineLocaleInfo(context) {
    const { $cookies, req, $config } = context;
    let language = $cookies.get('language');
    let region = $cookies.get('region');
    const prmsLocaleInfo = new Promise((resolve) => {
        if (language && region) {
            resolve({ language, region });

            return;
        }

        const locale = req.headers['accept-language'];
        axios
            .get(`${$config.baseURL}/initial-language`, {
                params: {
                    locale
                }
            })
            .then((res) => {
                language = res.data.language;
                region = res.data.region;
                $cookies.set('language', language);
                $cookies.set('region', region);

                resolve({ language, region });
            })
            .catch(() => {
                // To prevent 500 error we use the default language and region
                language = DEFAULT_LANGUAGE;
                region = DEFAULT_REGION;

                resolve({ language, region });
            });
    });

    // we need to await promise resolved to be sure correct language and region (local function variables) is set
    await prmsLocaleInfo;

    return { language, region, prmsLocaleInfo };
}
