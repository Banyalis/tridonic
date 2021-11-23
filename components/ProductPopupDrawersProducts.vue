<template>
    <section class="ProductPopupDrawersProducts">
        <div class="ProductPopupDrawersProducts-items">
            <div
                v-for="(product, key) in content.articles"
                :key="key"
                class="ProductPopupDrawersProducts-item"
            >
                <product-item
                    :product="product"
                    :is-comparable="false"
                    :is-gray="true"
                ></product-item>
            </div>
        </div>
    </section>
</template>

<script>
import ProductItem from '@/components/ProductItem';

export default {
    name: 'ProductPopupDrawersProducts',

    components: { ProductItem },

    props: {
        content: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.ProductPopupDrawersProducts {
    $component: &;

    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    &-items {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding-bottom: 20px;
    }

    &-item {
        display: flex;
        width: (100% / 5);

        @include tablet {
            width: (100% / 4);
        }

        @include mobile {
            width: 50%;
        }
    }
}
</style>
