<template>
    <div class="NavigationUtilsEshop">
        <div class="NavigationUtilsEshop-title">{{ eshopPanel.title }}</div>
        <!--        eslint-disable vue/no-v-html -->
        <div
            class="NavigationUtilsEshop-description"
            v-html="eshopPanel.description"
        ></div>
        <!--        eslint-enable vue/no-v-html -->
        <div class="NavigationUtilsEshop-buttons">
            <RoundedButton
                class="NavigationUtilsEshop-buttonsVisit"
                :link="eshopPanel.visitLink"
            ></RoundedButton>
            <ArrowLink
                :title="eshopPanel.requestAccessLink.title"
                :url="eshopPanel.requestAccessLink.url"
                class="NavigationUtilsEshop-arrowLink"
            ></ArrowLink>
        </div>
    </div>
</template>

<script>
import ArrowLink from '~/components/ArrowLink';
import RoundedButton from '~/components/RoundedButton';
export default {
    name: 'NavigationUtilsEshop',
    components: { RoundedButton, ArrowLink },
    props: {
        eshopPanel: {
            type: Object,
            required: true,
            default: () => {
                return {
                    title: '',
                    description: '',
                    visitLink: {
                        title: '',
                        url: '/',
                        isExternal: true
                    },
                    requestAccessLink: {
                        title: '',
                        url: '',
                        isExternal: true
                    }
                };
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.NavigationUtilsEshop {
    width: 100%;

    &-title {
        @include title-small;
        color: $c-white;

        @include mobile {
            letter-spacing: -0.5px;
        }
    }

    &-description {
        margin-top: 17px;
        color: $c-white;
    }

    &-buttons {
        display: flex;
        margin-top: 35px;
        width: 100%;

        @include mobile {
            flex-direction: column;
            align-items: center;
            margin-left: auto;
            margin-right: auto;
            width: 240px;

            &Visit {
                width: 100%;
            }
        }
    }

    &-arrowLink {
        margin-left: 40px;

        @include mobile {
            margin-top: 20px;
            margin-left: 0;
        }
    }
}
</style>
