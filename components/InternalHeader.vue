<template>
    <div
        class="InternalHeader"
        :class="{
            hasBackground,
            hasIndent
        }"
    >
        <div class="InternalHeader-container b-container">
            <h2
                v-if="topTitle"
                class="InternalHeader-title"
                v-text="topTitle"
            ></h2>
            <!-- eslint-disable -->
            <div
                v-if="mainTitle"
                class="InternalHeader-text"
                v-html="mainTitle"
            ></div>
            <!-- eslint-enable -->
            <div v-if="buttonLink" class="InternalHeader-buttons">
                <RoundedButton :link="buttonLink" type="isPurple" />
            </div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import RoundedButton from '@/components/RoundedButton';

export default {
    components: {
        RoundedButton
    },
    props: {
        hasBackground: {
            type: Boolean,
            default: true
        },
        hasIndent: {
            type: Boolean,
            default: false
        },
        /**
         * Small centered title at the top of header
         */
        topTitle: {
            type: String,
            default: ''
        },
        /**
         * Big main title right after top title (may contain html string)
         */
        mainTitle: {
            type: String,
            default: ''
        },
        /**
         * Link object with button style
         */
        buttonLink: {
            type: Object,
            default: null
        },
        /**
         * Link related to the main title
         */
        mainTitleLink: {
            type: Object,
            default: null
        }
    }
};
</script>

<style lang="scss" scoped>
.InternalHeader {
    $component: &;

    margin-top: -90px;
    padding: 138px 0 48px;
    width: 100%;

    &.hasBackground {
        background: $c-purple url('~assets/images/bg_purple.png') repeat;
        background-size: 48px 48px;
        color: $c-white;
    }

    &.hasIndent {
        padding: 138px 0 235px;

        @include mobile {
            padding: 93px 0 34px;
        }

        #{$component}-text {
            margin: 46px 0 0;

            @include mobile {
                margin: 36px 0 0;
            }
        }
    }

    @include mobile {
        margin-top: -70px;
        padding: 93px 0 23px;
    }

    &-title {
        @include title-bordered-h2;
    }

    &-text {
        @include title;
        margin: 46px auto;

        @include mobile {
            font-size: 24px;
            font-weight: $fw-normal;
            letter-spacing: -0.2px;
            line-height: calc(30 / 24);
            margin: 36px auto;
        }

        & /deep/ a {
            color: $c-blue;
            transition: color $d-hover ease-in-out;

            @include hover {
                &:hover {
                    color: $c-white;
                }
            }
        }
    }

    &-buttons {
        margin: 60px auto 12px;
        text-align: center;
    }
}
</style>
