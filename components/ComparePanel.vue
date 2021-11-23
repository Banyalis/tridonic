<template>
    <div
        class="ComparePanel"
        :class="{ isActive: products.length && !isComparisonHidden }"
    >
        <div
            class="ComparePanel-caption"
            :class="{ isMobileShown: products.length > 1 }"
        >
            <div
                class="ComparePanel-captionTitle"
                v-text="getCompareText"
            ></div>
            <div
                class="ComparePanel-captionClearAll"
                @click="clearProducts"
                v-text="$translations.compareClearAll()"
            ></div>
        </div>
        <div
            v-for="(product, key) in products"
            :key="key"
            class="ComparePanel-item"
        >
            <div class="ComparePanel-itemImage">
                <img :src="product.image" />
            </div>
            <v-clamp autoresize :max-lines="2" class="ComparePanel-itemTitle"
                >{{ product.name }}
            </v-clamp>
            <div
                class="ComparePanel-closeCross"
                @click="removeProduct(product.id)"
            >
                <CloseCross type="filled-small" theme="blue" />
            </div>
        </div>
        <div
            v-if="products.length < 2"
            class="ComparePanel-addAnother"
            v-text="$translations.compareAddAnotherProduct()"
        ></div>
        <div
            class="ComparePanel-arrow"
            :class="{ isActive: products.length >= 2 }"
            @click="openOverlay"
        >
            <Arrow></Arrow>
        </div>
    </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import CloseCross from '@/components/CloseCross';
import Arrow from '@/components/Arrow';
import VClamp from 'vue-clamp';

export default {
    name: 'ComparePanel',
    components: { Arrow, CloseCross, VClamp },
    computed: {
        getCompareText() {
            return `${this.$translations.compareProducts()} / ${
                this.products.length
            }`;
        },
        ...mapState('comparison', [
            'products',
            'isComparisonHidden',
            'comparisonData'
        ]),
        ...mapState('popup', ['isOpen']),
        ...mapState('locale', ['language', 'region'])
    },
    watch: {
        isOpen(newVal) {
            if (!this.products.length) {
                return;
            }
            if (!newVal) {
                if (!this.isComparisonHidden) {
                    return;
                }

                this.openComparisonOverlay();
                this.setIsHidden(false);
                return;
            }

            this.setIsHidden(true);
            this.closeComparisonOverlay(false);
        }
    },
    methods: {
        getProductIds() {
            return this.products.map((product) => product.id);
        },
        async openOverlay() {
            const comparisonData = await this.$axios.get(
                `${this.$config.baseURL}/${this.language}/${this.region}/comparison`,
                {
                    params: this.getProductIds()
                }
            );

            this.openComparisonOverlay(comparisonData.data);
        },
        ...mapMutations({
            removeProduct: 'comparison/removeProduct',
            clearProducts: 'comparison/clearProducts',
            setIsHidden: 'comparison/setIsHidden'
        }),
        ...mapActions({
            openComparisonOverlay: 'comparison/openOverlay',
            closeComparisonOverlay: 'comparison/closeOverlay'
        })
    }
};
</script>

<style lang="scss" scoped>
.ComparePanel {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
    transition: $d-hover transform, $d-hover opacity;
    pointer-events: none;
    height: 80px;
    background: $c-purple;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: $z-comparePanel;
    display: flex;

    @include mobile {
        height: 60px;
    }

    &.isActive {
        transform: none;
        opacity: 1;
        pointer-events: all;
    }

    &-caption {
        flex: 0 0 16.7%;
        border-right: 1px solid rgba($c-white, 0.1);
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 20px;

        &Title {
            @include text-light-same-mobile;
            color: $c-white;
            font-weight: $fw-medium;
        }

        &ClearAll {
            @include text-light-same-mobile;
            cursor: pointer;
            color: $c-blue;
            transition: $d-hover opacity;
            margin-top: 5px;
            font-weight: $fw-medium;

            @include hover {
                &:hover {
                    text-decoration: underline;
                }
            }
        }

        @include mobile {
            opacity: 0;
            pointer-events: none;
            transition: $d-hover opacity;
            border-right: none;
            flex: 100%;
            padding-left: 0;

            &Title {
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate3d(-50%, -50%, 0);
            }

            &ClearAll {
                position: absolute;
                top: 50%;
                left: 20px;
                transform: translate3d(0, -50%, 0);
                margin-top: 0;
            }

            &.isMobileShown {
                opacity: 1;
                pointer-events: all;
            }
        }
    }

    &-item {
        flex: 0 0 22%;
        display: flex;
        align-items: center;
        padding: 20px 2.8vw 20px 1.4vw;
        border-right: 1px solid rgba($c-white, 0.1);
        position: relative;

        &Image {
            flex: 0 0 40px;
            height: 40px;
        }

        &Title {
            @include text-light;
            color: $c-white;
            font-weight: $fw-medium;
            margin-left: 1.4vw;
        }

        @include mobile {
            display: none;
        }
    }

    &-closeCross {
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translate3d(0, -50%, 0);
    }

    &-addAnother {
        @include text-light-same-mobile;
        color: $c-white;
        font-weight: $fw-medium;
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        @include mobile {
            right: auto;
            width: 100%;
            text-align: center;
            transform: translate3d(0, -50%, 0);
            color: rgba($c-white, 0.5);
        }
    }

    &-arrow {
        cursor: pointer;
        position: absolute;
        right: 50px;
        top: 50%;
        transform: translate3d(-10%, -50%, 0);
        opacity: 0;
        color: $c-blue;
        pointer-events: none;
        transition: $d-hover opacity, $d-hover transform;

        @include mobile {
            right: 18px;
        }

        &.isActive {
            opacity: 1;
            pointer-events: all;
            transform: translate3d(0, -50%, 0);
        }
    }
}
</style>
