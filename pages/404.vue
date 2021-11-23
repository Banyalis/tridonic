<template>
    <div class="NotFound">
        <div class="NotFound-image">
            <picture>
                <source
                    srcset="
                        ~assets/images/404.png,
                        ~assets/images/404@2x.png 2x
                    "
                    media="(min-width: 960px)"
                />
                <source
                    srcset="~assets/images/404-m.png"
                    media="(max-width: 959px)"
                />
                <img src="~assets/images/404.png" alt="" />
            </picture>
        </div>
        <div class="NotFound-inner">
            <div class="NotFound-title" v-text="title"></div>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="NotFound-text" v-html="text"></p>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import axios from 'axios';
import { mixinOpenPopup } from '@/utils/mixins';

export default {
    name: 'NotFound',

    mixins: [mixinOpenPopup],

    async fetch({ $config: { baseURL }, store }) {
        if (store.state.popup.isNowClosed) {
            if (!store.state.popup.isOpen || !store.state.popup.isOpenBlack)
                store.commit('popup/resetIsNowClosed');

            return;
        }

        const language = store.state.locale.language;
        const region = store.state.locale.region;
        const notFound = await axios.get(
            `${baseURL}/${language}/${region}/not-found`
        );

        store.commit('404/init', notFound.data);
    },
    computed: {
        ...mapState('404', ['title', 'text'])
    }
};
</script>

<style lang="scss" scoped>
.NotFound {
    width: 100%;
    padding-top: (800 / 1440) * 100%;
    position: relative;
    background-color: $c-purple;

    @include mobile {
        padding-top: (520 / 320) * 100%;
    }

    &-image {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }

    &-inner {
        position: absolute;
        top: 106px;
        left: 50%;
        width: 520px;
        margin-left: -260px;
        color: $c-white;
        text-align: center;

        @include mobile {
            top: 128px;
            width: 280px;
            margin-left: -140px;
        }
    }

    &-title {
        @include title;

        margin-bottom: 30px;

        @include mobile {
            margin-bottom: 17px;
        }
    }

    &-text {
        @include text;

        @include mobile {
            font-size: 14px;
            line-height: (20 / 14);
        }

        & /deep/ a {
            position: relative;
            color: $c-white;

            &:after {
                content: '';
                display: block;
                position: absolute;
                left: 0;
                right: 0;
                bottom: 3px;
                height: 1px;
                background-color: $c-white;
                transition: opacity $d-hover ease-in-out;
            }

            @include hover {
                &:hover:after {
                    opacity: 0;
                }
            }
        }
    }
}
</style>
