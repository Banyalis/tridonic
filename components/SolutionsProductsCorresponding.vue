<template>
    <div class="SolutionsProductsCorresponding">
        <div class="SolutionsProductsCorresponding-wrapper b-container">
            <div
                class="SolutionsProductsCorresponding-title"
                v-text="$translations.titleCorrespondingProducts()"
            ></div>
            <div class="SolutionsProductsCorresponding-products">
                <div
                    v-for="(product, index) in products"
                    :key="`${product.id}-${index}`"
                    class="SolutionsProductsCorresponding-product"
                >
                    <ProductItem :product="product" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductItem from '@/components/ProductItem';

export default {
    name: 'SolutionsProductsCorresponding',
    components: { ProductItem },
    props: {
        products: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.SolutionsProductsCorresponding {
    $component: &;

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background: $c-gray--bg;
    padding: 48px 0 80px;
    box-shadow: inset 0 1px 0 0 $c-gray--shadow;

    @include mobile {
        padding: 23px 0 40px;
    }

    &-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
    }

    &-title {
        @include title-bordered-h2;

        color: $c-black;
    }

    &-products {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        margin-top: 40px;

        @include mobile {
            width: 100vw;
            margin-top: 20px;
        }
    }

    &-product {
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
