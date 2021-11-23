<template>
    <div class="CommonColumnText">
        <!-- eslint-disable -->
        <div v-if="text" class="CommonColumnText-text" v-html="text"></div>
        <div class="CommonColumnText-columns">
            <div
                v-for="(column, index) in columns"
                :key="index"
                class="CommonColumnText-column"
                v-html="column"
            ></div>
        </div>
        <!-- eslint-enable -->
    </div>
</template>

<script>
export default {
    name: 'CommonColumnText',

    props: {
        text: {
            type: String,
            default: ''
        },

        columns: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss">
.CommonColumnText {
    @include text-small;

    color: $c-gray--dark;
    width: 100%;

    @include mobile {
        @include text-light-same-mobile;
    }

    &-text {
        width: 100%;
        margin-bottom: 20px;
    }

    &-columns {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;

        @include mobile {
            flex-direction: column;
        }
    }

    &-column {
        display: flex;
        flex-direction: column;
        width: (360 * 100% / 760);

        @include mobile {
            width: 100%;

            &:nth-child(n + 2) {
                margin-top: 20px;
            }
        }
    }

    h1 {
        @include title;

        color: $c-black;
        margin: 0 0 32px;

        @include mobile {
            font-size: 24px;
            font-weight: $fw-normal;
            letter-spacing: -0.2px;
            line-height: (30 / 24);
            margin: 0 0 29px;
        }
    }

    h2 {
        @include title-h2;

        color: $c-black;
        margin: 40px 0 10px;

        &:first-child {
            margin-top: 0 !important;
        }
    }

    h3 {
        @include text;

        color: $c-black;
        margin: 0 0 12px;

        @include mobile {
            font-size: 16px;
            letter-spacing: 0;
            line-height: (20 / 16);
        }

        &:first-child {
            margin-top: 0 !important;
        }
    }

    p {
        margin: 0 0 30px;

        @include mobile {
            margin-bottom: 20px;
        }

        &:last-child {
            margin-bottom: 0 !important;
        }

        a {
            color: $c-purple;
            text-decoration: underline;

            @include hover {
                &:hover {
                    color: $c-blue;
                    text-decoration: none;
                }
            }
        }
    }

    p + ol,
    p + ul {
        margin-top: -30px;

        @include mobile {
            margin-top: 0;
        }
    }

    ul {
        list-style: none;
        margin: 0 0 30px;
        padding-left: 20px;

        &:last-child {
            margin-bottom: 0 !important;
        }

        ul,
        ol {
            margin-bottom: 0;
        }

        li {
            position: relative;

            &::before {
                content: '';
                background: #000;
                position: absolute;
                left: -20px;
                top: 20px;
                height: 1px;
                width: 10px;

                @include mobile {
                    top: 14px;
                }
            }
        }
    }

    ol {
        counter-reset: ordered-list;
        list-style: none;
        margin: 0 0 30px 10px;
        padding: 0 0 0 30px;

        &:last-child {
            margin-bottom: 0 !important;
        }

        ol,
        ul {
            margin-bottom: 0;
        }

        li {
            counter-increment: ordered-list;
            position: relative;

            &::before {
                content: counter(ordered-list) '.';
                text-align: left;
                position: absolute;
                top: 0;
                left: -30px;
            }
        }

        ol {
            counter-reset: ordered-list-nesting;

            li {
                counter-increment: ordered-list-nesting;
                position: relative;

                &::before {
                    content: counter(ordered-list) '.'
                        counter(ordered-list-nesting);
                }
            }
        }
    }

    blockquote {
        margin: 42px 0;

        &:first-child {
            margin-top: 0 !important;
        }

        &:last-child {
            margin-bottom: 0 !important;
        }

        p {
            @include title-h2;

            font-style: normal;
            color: $c-black;
            position: relative;

            &:first-child::before {
                content: '“';
                position: absolute;
                left: -16px;

                @include mobile {
                    left: -6px;
                }
            }

            &:last-of-type::after {
                content: '”';
            }
        }

        cite {
            @include text-small;

            color: $c-gray--dark;
            display: block;
            font-style: normal;
            margin: 10px 0 0;

            @include mobile {
                @include text-light-same-mobile;

                margin-top: 22px;
            }
        }
    }

    hr {
        background: $c-gray--divider;
        border: none;
        display: block;
        height: 1px;
        margin: 10px 0;
    }
}
</style>
