<template>
    <section class="ProductPopupDrawersFaqs">
        <div class="ProductPopupDrawersFaqs-items">
            <div class="ProductPopupDrawersFaqs-itemsSection">
                <div
                    v-for="(link, index) in getColumnLeft"
                    :key="index"
                    class="ProductPopupDrawersFaqs-item"
                    :style="{ transitionDelay: `${0.05 * index}s` }"
                    :class="{ isActive: isItemShown }"
                >
                    <arrow-link
                        :title="link.title"
                        :url="link.url"
                        type="popup"
                    ></arrow-link>
                </div>
            </div>
            <div class="ProductPopupDrawersFaqs-itemsSection">
                <div
                    v-for="(link, index) in getColumnRight"
                    :key="index"
                    class="ProductPopupDrawersFaqs-item"
                    :style="{ transitionDelay: `${0.05 * index}s` }"
                    :class="{ isActive: isItemShown }"
                >
                    <arrow-link
                        :title="link.title"
                        :url="link.url"
                        type="popup"
                    ></arrow-link>
                </div>
            </div>
        </div>
        <div
            v-if="content.items.length > 10 && !isExpanded"
            class="ProductPopupDrawersFaqs-showMore"
        >
            <rounded-button
                type="isBlack"
                :text="$translations.viewAllFaqs()"
                @click="onShowAll"
            ></rounded-button>
        </div>
    </section>
</template>

<script>
import ArrowLink from '@/components/ArrowLink';
import RoundedButton from '@/components/RoundedButton';

export default {
    name: 'ProductPopupDrawersFaqs',

    components: { RoundedButton, ArrowLink },

    props: {
        content: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            isExpanded: false,
            isItemShown: false
        };
    },

    computed: {
        getColumnLeft() {
            return this.getColumn(0, 5);
        },

        getColumnRight() {
            return this.getColumn(5, 10);
        }
    },

    mounted() {
        this.isItemShown = true;
    },

    methods: {
        getColumn(start, end) {
            const length = this.content.items.length;

            return this.content.items.filter((item, id) => {
                if (length > 10 && !this.isExpanded) {
                    if (id >= start && id < end) {
                        return item;
                    }
                } else if (end === 5) {
                    if (id <= length / 2) {
                        return item;
                    }
                } else if (id > length / 2) {
                    return item;
                }
            });
        },

        onShowAll() {
            this.isItemShown = false;
            this.isExpanded = true;

            setTimeout(() => {
                this.isItemShown = true;
            });

            setTimeout(() => {
                this.$emit('resize');
            }, 200);
        }
    }
};
</script>

<style lang="scss" scoped>
.ProductPopupDrawersFaqs {
    $component: &;

    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    @include mobile {
        padding: 0 20px;
    }

    &-items {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
        flex: 0 0 auto;

        &Section {
            width: (560 * 100% / 1160);
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;

            @include mobile {
                width: 100%;

                &:last-child #{$component}-item:first-child {
                    border-top: none;
                }
            }
        }
    }

    &-item {
        width: 100%;
        display: flex;
        padding: 20px 0;
        border-top: 1px solid #e4e4e4;
        opacity: 0;
        transition: none;

        &.isActive {
            opacity: 1;
            transition-duration: $d-productShow;
            transition-property: opacity;
        }

        &:last-child {
            border-bottom: 1px solid #e4e4e4;
        }
    }

    &-showMore {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        margin-top: 40px;
        flex: 0 0 auto;
    }
}
</style>
