<template>
    <div class="ProductItem" :class="{ isGray, isBig }">
        <div class="ProductItem-wrapper">
            <HiddenLink
                v-if="!isList && product.url"
                :is-external="false"
                :url="product.url"
            />
            <div
                v-if="isComparable"
                class="ProductItem-compare"
                :class="{ isInComparison, isHidden: products.length === 3 }"
                @click="toggleCompare($event)"
            >
                <svg-icon
                    name="compare-icon"
                    class="ProductItem-compareIcon"
                ></svg-icon>
                <svg-icon
                    name="compare-icon-hover"
                    class="ProductItem-compareIconHovered"
                ></svg-icon>
                <svg-icon
                    name="compare-icon-mobile"
                    class="ProductItem-compareIcon_mobile"
                ></svg-icon>
            </div>
            <div class="ProductItem-image">
                <figure>
                    <img :src="product.image" :alt="product.name" />
                </figure>
            </div>
            <div class="ProductItem-info">
                <div class="ProductItem-tag">
                    <tag
                        v-if="product.tag && product.tag.text"
                        :text="product.tag.text"
                        :type="getProductTagType(product.tag.id)"
                    ></tag>
                </div>
                <div class="ProductItem-name" v-text="product.name"></div>
                <div class="ProductItem-articles">
                    <span
                        v-if="product.articles.length > 1"
                        class="ProductItem-articlesText"
                        v-text="getArticlesString(product.articles.length)"
                    ></span>
                    <span
                        class="ProductItem-articlesTextList"
                        v-text="getArticlesString(product.articles.length)"
                    ></span>
                    <div class="ProductItem-articlesList">
                        <div class="ProductItem-articlesListInner">
                            <div
                                v-for="(link, key) in product.articles"
                                :key="key"
                                class="ProductItem-articlesItem"
                                :class="{
                                    isHidden: key > 4 && !isArticleListExpanded
                                }"
                            >
                                <nuxt-link
                                    :to="link.url"
                                    class="ProductItem-articlesItemLink"
                                    v-text="link.name"
                                ></nuxt-link>
                            </div>
                        </div>
                        <div
                            v-if="product.articles.length >= 6"
                            class="ProductItem-articlesListMore"
                            @click="toggleShowMore"
                            v-text="
                                $translations.showMoreButton({
                                    IS_EXPANDED: isArticleListExpanded
                                })
                            "
                        ></div>
                    </div>
                </div>
                <div class="ProductItem-description">
                    <div
                        v-if="product.articles.length > 1"
                        class="ProductItem-descriptionTitle"
                        v-text="product.name"
                    ></div>
                    <div
                        class="ProductItem-descriptionText"
                        v-text="product.description"
                    ></div>
                    <nuxt-link
                        v-if="product.dataSheetUrl"
                        :to="product.dataSheetUrl"
                        class="ProductItem-descriptionDataSheetUrl"
                        download
                        v-text="$translations.dataSheet()"
                    ></nuxt-link>
                </div>
            </div>
        </div>
        <nuxt-link
            v-if="product.dataSheetUrl"
            :to="product.dataSheetUrl"
            class="ProductItem-dataSheetUrl b-hidden-link"
            download
            v-text="$translations.dataSheet()"
        ></nuxt-link>
    </div>
</template>

<script>
import Tag from '@/components/Tag';
import { mapMutations, mapState } from 'vuex';
import HiddenLink from '@/components/HiddenLink';

export default {
    components: {
        HiddenLink,
        Tag
    },

    props: {
        product: {
            type: Object,
            required: true
        },
        isList: {
            type: Boolean,
            default: false
        },
        isComparable: {
            type: Boolean,
            default: true
        },
        isBig: {
            type: Boolean,
            default: false
        },
        isGray: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            isArticleListExpanded: false,
            newTagId: 'new',
            yellowTagType: 'isYellow'
        };
    },

    computed: {
        isInComparison() {
            return !!this.products.filter(
                (product) => product.id === this.product.id
            ).length;
        },
        ...mapState('comparison', ['products'])
    },

    methods: {
        getArticlesString(articleCount) {
            return `${articleCount} ${this.$translations.pluralizedArticle({
                ARTICLE_COUNT: articleCount
            })}`;
        },
        toggleShowMore() {
            this.isArticleListExpanded = !this.isArticleListExpanded;
        },
        getProductTagType(tagId) {
            return tagId === this.newTagId ? this.yellowTagType : undefined;
        },
        toggleCompare(event) {
            event.preventDefault();
            event.stopPropagation();

            if (this.isInComparison) {
                this.removeProduct(this.product.id);

                return;
            }

            if (this.products.length === 3) {
                return;
            }

            this.addProduct(this.product);
        },

        ...mapMutations({
            addProduct: 'comparison/addProduct',
            removeProduct: 'comparison/removeProduct'
        })
    }
};
</script>

<style lang="scss" scoped>
.ProductItem {
    display: flex;
    position: relative;
    z-index: $z-productItem;
    border: 2px solid transparent;
    width: 100%;

    @include hover {
        &:hover {
            z-index: $z-productItemHover;

            & .ProductItem-compare {
                opacity: 1;

                &.isHidden {
                    opacity: 0;
                    pointer-events: none;

                    &.isInComparison {
                        opacity: 1;
                        pointer-events: all;
                    }
                }
            }

            & .ProductItem-wrapper {
                box-shadow: $v-product-item-shadow;
            }

            & .ProductItem-dataSheetUrl {
                opacity: 1;
            }

            .isList & .ProductItem-image img {
                transform: translate3d(0, 0, 0) scale(1);
            }
        }
    }

    &-wrapper {
        position: relative;
        background: $c-white;
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 16.6% 15% 14.5%;

        @include mobile {
            padding: 18px 8px 16px;
        }

        .isList & {
            flex-direction: row;
            padding: 38px 40px;
        }

        .isGray > & {
            background: $c-gray--bg;
        }
    }

    &-image {
        @include m-aspectRatio(160, 160);

        width: 100%;
        overflow: visible;

        @include mobile {
            width: calc(100% - 36px);
        }

        .isList & {
            width: 160px;

            img {
                transform: translate3d(0, 0, 0) scale(0.75);
            }
        }

        img {
            @include m-absoluteObjectFit();

            transition: $d-hover transform;
        }
    }

    &-info {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-top: 20px;

        @include tablet {
            margin-top: 10px;
        }

        .isList & {
            padding-left: 20px;
            flex-direction: row-reverse;
            justify-content: flex-end;
        }
    }

    &-description {
        display: none;
        flex-direction: column;
        width: (260 * 100% / 960);
        margin-right: (200 * 100% / 960);

        .isList & {
            display: flex;
        }

        &Title {
            @include text-small;

            color: $c-black;
        }

        &Text {
            @include text-light-same-mobile;
            color: $c-gray;
        }

        &DataSheetUrl {
            @include text-light-same-mobile-medium;
            color: $c-purple;
            pointer-events: all;
            transition: $d-hover opacity;
            display: flex;
            width: auto;

            @include hover {
                &:hover {
                    color: $c-blue;
                }
            }
        }
    }

    &-tag {
        display: flex;
        height: 20px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: absolute;
        left: 20px;
        top: 20px;

        .isList & {
            position: relative;
            margin-top: 2px;
            left: auto;
            top: auto;
        }

        @include mobile {
            margin-top: 6px;
            height: 14px;
            left: 10px;
            top: 10px;
        }
    }

    &-name {
        @include text-light-same-mobile-medium;
        color: $c-black;
        margin-top: 3px;
        width: 100%;
        text-align: center;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;

        @include mobile {
            margin-top: 5px;

            .isBig & {
                @include text-small;

                line-height: (20 / 18);
            }
        }

        .isList & {
            display: none;
        }
    }

    &-articles {
        @include text-light-same-mobile;
        color: $c-gray;
        letter-spacing: 0.4px;
        width: 100%;
        text-align: center;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 20px;

        @include mobile {
            letter-spacing: 0;
            margin-top: 5px;
        }

        .isList & {
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            max-width: (420 * 100% / 960);
            height: auto;
        }

        &Text {
            .isList & {
                display: none;
            }

            &List {
                display: none;

                .isList & {
                    display: flex;
                }
            }
        }

        &List {
            display: none;
            width: 100%;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;

            .isList & {
                display: flex;
            }

            &Inner {
                display: flex;
                width: 100%;
            }

            &Inner {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                width: 100%;
            }

            &More {
                @include text-light-same-mobile-medium;
                cursor: pointer;
                pointer-events: all;
                color: $c-purple;
                transition: $d-hover color;

                @include hover {
                    &:hover {
                        color: $c-blue;
                    }
                }
            }
        }

        &Item {
            @include text-light-same-mobile-medium;
            display: flex;
            pointer-events: all;

            &Link {
                color: $c-black;
                transition: $d-hover color;

                @include hover {
                    &:hover {
                        color: $c-blue;
                    }
                }
            }

            &All,
            &.isHidden {
                display: none;
            }
        }
    }

    &-dataSheetUrl {
        @include text-light-same-mobile-medium;
        color: $c-purple;
        letter-spacing: 0;
        margin-top: 2px;
        text-align: center;
        display: flex;
        width: auto;
        cursor: pointer;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        height: 20px;
        top: auto;
        bottom: 18px;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        transition: $d-hover opacity;

        @include hover {
            &:hover {
                color: $c-blue;
            }
        }

        @include mobile {
            display: none;
        }

        .isList & {
            display: none;
        }
    }

    &-compare {
        width: 40px;
        height: 40px;
        position: absolute;
        right: 8px;
        top: 10px;
        opacity: 0;
        transition: $d-hover opacity;
        cursor: pointer;
        z-index: 4;

        svg {
            width: 100%;
            height: 100%;
            transition: $d-hover opacity;
            position: absolute;
            top: 0;
            left: 0;
        }

        &Icon {
            opacity: 1;
        }

        &Icon_mobile {
            display: none;
        }

        &IconHovered {
            opacity: 0;
        }

        @include hover {
            &:hover {
                .ProductItem-compareIcon {
                    opacity: 0;
                }

                .ProductItem-compareIconHovered {
                    opacity: 1;
                }

                @include mobile {
                    .ProductItem-compareIcon {
                        opacity: 1;
                    }

                    .ProductItem-compareIconHovered {
                        opacity: 0;
                    }
                }
            }
        }

        @include mobile {
            opacity: 1;
            width: 20px;
            height: 20px;
            top: 12px;

            &Icon {
                display: none;
            }

            &Icon_mobile {
                display: block;
            }
        }

        &.isHidden {
            opacity: 0;
        }

        &.isInComparison {
            opacity: 1;

            &.isHidden {
                opacity: 1;
            }

            .ProductItem-compareIconHovered {
                opacity: 1;
            }

            .ProductItem-compareIcon,
            .ProductItem-compareIcon_mobile {
                opacity: 0;
            }
        }
    }
}
</style>
