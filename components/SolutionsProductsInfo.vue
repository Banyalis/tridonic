<template>
    <div class="SolutionsProductsInfo">
        <div class="SolutionsProductsInfo-wrapper">
            <div
                class="SolutionsProductsInfo-title"
                v-text="`Based on your needs, we recommend ${info.title}`"
            ></div>
            <!-- TODO: replace text -->
            <div class="SolutionsProductsInfo-content">
                <!-- eslint-disable -->
                <TextContent v-html="info.content" />
                <!-- eslint-disable -->
                <div class="SolutionsProductsInfo-contentButton">
                    <RoundedButton
                        :link="{
                            url: info.link,
                            title: $translations.textAbout() + ' ' + info.title
                        }"
                        type="isPurple"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import RoundedButton from '@/components/RoundedButton';
import TextContent from '@/components/TextContent';

export default {
    name: 'SolutionsProductsInfo',
    components: { TextContent, RoundedButton },
    props: {
        info: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.SolutionsProductsInfo {
    $component: &;

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 48px 0 80px;
    box-shadow: inset 0 1px 0 0 $c-gray--shadow;

    @include mobile {
        padding: 23px 0 40px;
    }

    &-wrapper {
        width: 100%;
        max-width: 840px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin: 0 auto;
        padding: 0 40px;

        @include mobile {
            width: 100%;
            padding: 0 20px;
        }
    }

    &-title {
        @include title-bordered-h2;

        color: $c-black;
    }

    &-content {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-top: 58px;

        @include mobile {
            margin-top: 25px;
        }

        &Button {
            margin-top: 32px;

            @include mobile {
                margin-top: 35px;
            }
        }
    }
}
</style>
