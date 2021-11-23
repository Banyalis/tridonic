<template>
    <div class="CompanyEmployee">
        <div class="CompanyEmployee-content">
            <p class="CompanyEmployee-text" v-text="content.text"></p>
            <div class="CompanyEmployee-social">
                <div
                    v-for="(item, index) in content.social"
                    :key="index"
                    class="CompanyEmployee-socialItem"
                >
                    <HiddenLink
                        :is-external="item.link.isExternal"
                        :url="item.link.url"
                    ></HiddenLink>
                    <svg-icon name="link-arrow-right"></svg-icon>
                    <div
                        class="CompanyEmployee-socialItemTitle"
                        v-text="item.title"
                    ></div>
                </div>
            </div>
        </div>
        <div class="CompanyEmployee-image">
            <picture>
                <source
                    :srcset="content.image + ' 1x, ' + content.image2x + ' 2x'"
                />
                <img :src="content.image" alt="" />
            </picture>
        </div>
    </div>
</template>

<script>
import HiddenLink from '@/components/HiddenLink';

export default {
    name: 'CompanyEmployee',

    components: {
        HiddenLink
    },

    props: {
        content: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.CompanyEmployee {
    $component: &;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    &-content {
        width: (760 * 100% / 1160);

        @include mobile {
            width: 100%;
            margin-bottom: 30px;
        }
    }

    &-social {
        display: flex;
        margin-top: 27px;

        &Item {
            display: flex;
            align-items: center;
            position: relative;
            color: $c-purple;
            transition: color $d-hover ease-in-out;

            &:not(:last-child) {
                margin-right: 30px;
            }

            @include hover {
                &:hover {
                    color: $c-blue;
                }
            }

            svg {
                width: 15px;
                height: 11px;
                margin-right: 7px;
                fill: currentColor;
                transition: fill $d-hover ease-in-out;
            }

            &Title {
                @include text-light-same-mobile;

                font-weight: $fw-medium;
            }
        }
    }

    &-image {
        @include m-aspectRatio(360, 240);

        width: (360 * 100% / 1160);

        @include mobile {
            @include m-aspectRatio(360, 180);

            width: 100%;
        }

        img {
            @include m-absoluteObjectFit();
        }
    }
}
</style>
