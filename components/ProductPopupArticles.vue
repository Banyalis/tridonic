<template>
    <section class="ProductPopupArticles">
        <div ref="articles" class="ProductPopupArticles-filter">
            <div class="ProductPopupArticles-filterContent">
                <product-popup-articles-filters
                    :current-items="currentItems"
                    :count-articles="countArticles"
                    :filter-list="filterList"
                ></product-popup-articles-filters>
            </div>
        </div>
        <div class="ProductPopupArticles-items">
            <div class="ProductPopupArticles-itemsList">
                <div
                    v-for="(article, key) in getArticlesFirst"
                    :key="key"
                    ref="article"
                    class="ProductPopupArticles-itemsListArticle"
                    :class="
                        key < countRenderedItems
                            ? `ProductPopupArticles-itemsListArticleShow`
                            : isShowedAllArticles
                            ? `ProductPopupArticles-itemsListArticleShow`
                            : `ProductPopupArticles-itemsListArticleAll`
                    "
                >
                    <product-item
                        :product="article"
                        :is-comparable="false"
                    ></product-item>
                </div>
                <div
                    ref="articlesListMore"
                    class="ProductPopupArticles-itemsListMore"
                >
                    <div
                        ref="articlesListMoreInner"
                        class="ProductPopupArticles-itemsListInner"
                    >
                        <div
                            v-for="(article, key) in getArticlesTail"
                            :key="key"
                            ref="article"
                            class="ProductPopupArticles-itemsListArticle"
                            :class="
                                key < countRenderedItems
                                    ? `ProductPopupArticles-itemsListArticleShow`
                                    : isShowedAllArticles
                                    ? `ProductPopupArticles-itemsListArticleShow`
                                    : `ProductPopupArticles-itemsListArticleAll`
                            "
                        >
                            <product-item
                                :product="article"
                                :is-comparable="false"
                            ></product-item>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-if="currentItems > countRenderedItems"
                class="ProductPopupArticles-itemsMore"
            >
                <RoundedButton
                    :text="
                        $translations.textShow() +
                        ' ' +
                        (currentItems - countRenderedItems) +
                        ' ' +
                        (isShowedAllArticles
                            ? $translations.textLess()
                            : $translations.textMore())
                    "
                    type="isBlack"
                    @click="toggleShowMore"
                ></RoundedButton>
            </div>
        </div>
    </section>
</template>

<script>
import ProductItem from '@/components/ProductItem';
import RoundedButton from '@/components/RoundedButton';
import ProductPopupArticlesFilters from '@/components/ProductPopupArticlesFilters';
import { mapState } from 'vuex';
import { isMobile, isTablet } from '@/utils/utils';
import VueScrollTo from 'vue-scrollto';

export default {
    name: 'ProductPopupArticles',

    components: { ProductItem, RoundedButton, ProductPopupArticlesFilters },

    props: {
        filterList: {
            type: Array,
            default: () => {
                return [];
            }
        },
        countArticles: {
            type: Number,
            required: true
        },
        articles: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            countItemsDesktop: 10,
            countItemsTablet: 8,
            countItemsMobile: 4,
            countRenderedItems: 10,
            currentItems: 10,
            isShowedAllArticles: false
        };
    },

    computed: {
        getArticlesFirst() {
            return this.articles.filter(
                (item, id) => id < this.countRenderedItems
            );
        },

        getArticlesTail() {
            return this.articles.filter(
                (item, id) => id >= this.countRenderedItems
            );
        },
        ...mapState('popup', ['popup'])
    },

    watch: {
        popup() {
            this.onResize();
            this.isShowedAllArticles = false;
        }
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.onResize();
    },

    updated() {
        this.currentItems = this.$refs.article.length;
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        getCountRenderItems() {
            return isMobile()
                ? this.countItemsMobile
                : isTablet()
                ? this.countItemsTablet
                : this.countItemsDesktop;
        },

        onResize() {
            this.currentItems = this.$refs.article.length;

            this.countRenderedItems = this.getCountRenderItems();

            const articlesList = this.$refs.articlesListMore;
            const articlesListInner = this.$refs.articlesListMoreInner;

            if (this.isShowedAllArticles) {
                articlesList.style.maxHeight = `${articlesListInner.scrollHeight}px`;
            } else if (articlesList.style?.maxHeight) {
                articlesList.style.maxHeight = null;
            }
        },

        toggleShowMore() {
            this.isShowedAllArticles = !this.isShowedAllArticles;

            const articlesList = this.$refs.articlesListMore;
            const articlesListInner = this.$refs.articlesListMoreInner;

            setTimeout(() => {
                this.$emit('resize');
            }, 200);

            if (!this.isShowedAllArticles) {
                const options = {
                    offset: -100,
                    force: true,
                    y: true
                };

                VueScrollTo.scrollTo(this.$refs.articles, 200, options);
            }

            if (articlesList.style?.maxHeight) {
                articlesList.style.maxHeight = null;

                return;
            }

            articlesList.style.maxHeight = `${articlesListInner.scrollHeight}px`;
        }
    }
};
</script>

<style lang="scss" scoped>
.ProductPopupArticles {
    $component: &;

    width: 100%;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-anchor: none;

    &-items {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        margin-top: 32px;

        @include mobile {
            margin-top: 24px;
        }

        &List {
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            align-items: center;
            justify-content: flex-start;

            &More {
                width: 100%;
                max-height: 0;
                overflow: hidden;
                transition: $d-hover max-height;
            }

            &Inner {
                width: 100%;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                justify-content: flex-start;
                flex: 0 0 auto;
            }

            &Article {
                display: flex;
                width: (100% / 5);

                @include tablet {
                    width: (100% / 4);
                }

                @include mobile {
                    width: (100% / 2);
                }
            }
        }

        &More {
            display: flex;
            margin-top: 40px;

            @include mobile {
                margin-top: 20px;
                max-width: 240px;
                width: 100%;
            }

            & button {
                @include mobile {
                    width: 100%;
                }
            }
        }
    }
}
</style>
