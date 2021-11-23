<template>
    <div class="NewsListItem">
        <nuxt-link :to="news.url" class="NewsListItem-wrapper">
            <div class="NewsListItem-date">
                <div class="NewsListItem-dateYear" v-text="news.year"></div>
                <div class="NewsListItem-dateMonth" v-text="news.date"></div>
            </div>
            <div class="NewsListItem-image">
                <img :src="news.image" :alt="news.title" />
            </div>
            <div class="NewsListItem-info">
                <div class="NewsListItem-date">
                    <div class="NewsListItem-dateYear" v-text="news.year"></div>
                    <div
                        class="NewsListItem-dateMonth"
                        v-text="news.date"
                    ></div>
                </div>
                <div class="NewsListItem-infoWrapper">
                    <div class="NewsListItem-infoType" v-text="news.type"></div>
                    <div
                        class="NewsListItem-infoTitle"
                        v-text="news.title"
                    ></div>
                    <div
                        class="NewsListItem-infoDescr"
                        v-text="news.descr"
                    ></div>
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
export default {
    name: 'NewsListItem',

    props: {
        news: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss">
.NewsListItem {
    $component: &;

    display: flex;
    width: 100%;
    padding-bottom: 40px;
    border-bottom: 1px solid $c-gray--shadow;

    @include mobile {
        padding-bottom: 0;
        border-bottom: none;
    }

    &-wrapper {
        display: flex;
        width: 100%;
        align-items: flex-start;
        justify-content: flex-start;

        @include mobile {
            flex-direction: column;
            position: relative;
        }

        @include hover {
            &:hover {
                & #{$component} {
                    &-image img {
                        transform: translate3d(0, 0, 0) scale(1.05);
                    }

                    &-info {
                        &Title {
                            color: $c-blue;
                        }
                    }
                }
            }
        }
    }

    &-date {
        width: (120 * 100% / 1160);
        display: flex;
        flex-direction: column;
        padding-right: (20 * 100% / 1160);
        color: $c-black;

        @include mobile {
            display: none;
        }

        &Year {
            @include text-light;
        }

        &Month {
            @include title-h2;

            margin-top: 3px;

            @include mobile {
                margin-top: 1px;
            }
        }
    }

    &-image {
        @include m-aspectRatio(440, 240);

        width: (440 * 100% / 1160);
        overflow: hidden;

        @include mobile {
            @include m-aspectRatio(280, 140);

            width: 100%;
        }

        img {
            @include m-absoluteObjectFit();

            transform: translate3d(0, 0, 0);
            transition: $d-hover transform;
        }
    }

    &-info {
        display: flex;
        flex-direction: column;
        width: (560 * 100% / 1160);
        margin-left: (40 * 100% / 1160);
        margin-top: 5px;

        @include mobile {
            margin-top: 10px;
            width: 100%;
            margin-left: 0;
            flex-direction: row;
        }

        & #{$component}-date {
            display: none;

            @include mobile {
                width: (60 * 100% / 280);
                padding-right: (10 * 100% / 280);
                display: flex;
            }
        }

        &Wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;

            @include mobile {
                width: (220 * 100% / 280);
            }
        }

        &Type {
            @include text-light;

            color: $c-gray;
        }

        &Title {
            @include title-h2;

            margin-top: 3px;
            color: $c-black;

            @include mobile {
                margin-top: 1px;
            }
        }

        &Title {
            @include title-h2;

            margin-top: 3px;
            color: $c-black;
            transition: $d-hover color;

            @include mobile {
                margin-top: 1px;
            }
        }

        &Descr {
            @include text-light;

            margin-top: 17px;
            color: $c-black;

            @include mobile {
                display: none;
            }
        }
    }
}
</style>
