<template>
    <section class="SolutionsProjectsMoreProjects">
        <div class="SolutionsProjectsMoreProjects-wrapper">
            <h2
                class="SolutionsProjectsMoreProjects-title"
                v-text="$translations.moreProjects()"
            ></h2>
            <div
                ref="moreSlider"
                class="SolutionsProjectsMoreProjects-slider swiper-container"
            >
                <div
                    ref="moreSliderWrapper"
                    class="SolutionsProjectsMoreProjects-sliderWrapper swiper-wrapper"
                >
                    <div
                        v-for="(slide, index) in projects"
                        :key="index"
                        ref="moreSliderItem"
                        class="SolutionsProjectsMoreProjects-sliderItem swiper-slide"
                    >
                        <SolutionsProjectsCategoryItem :project="slide" />
                    </div>
                </div>
            </div>
            <div
                v-if="projects.length > 2"
                class="SolutionsProjectsMoreProjects-sliderPagination swiper-pagination"
            ></div>
        </div>
    </section>
</template>

<script>
import { Swiper, Pagination } from 'swiper';

import 'swiper/swiper.scss';

import SolutionsProjectsCategoryItem from '@/components/SolutionsProjectsCategoryItem';

import { isMobile } from '@/utils/utils';
import { DURATION_ANIMATION_POPUPS } from '@/utils/constants';

// Swiper modules
Swiper.use([Pagination]);

export default {
    name: 'SolutionsProjectsMoreProjects',

    components: { SolutionsProjectsCategoryItem },

    props: {
        projects: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            swiper: undefined
        };
    },

    watch: {
        products() {
            setTimeout(() => {
                this.swiper && this.swiper.destroy();
                this.swiper = undefined;
                this.$refs.moreSliderWrapper.removeAttribute('style');
                this.$refs.moreSliderItem[0].removeAttribute('style');
                this.initSwiper();
            }, DURATION_ANIMATION_POPUPS / 2);
        }
    },

    mounted() {
        window.addEventListener('resize', this.initSwiper);
        this.initSwiper();
    },

    destroyed() {
        window.removeEventListener('resize', this.initSwiper);
    },

    methods: {
        initSwiper() {
            if (isMobile() && this.swiper === undefined) {
                this.swiper = new Swiper(this.$refs.moreSlider, {
                    direction: 'horizontal',
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                    loop: true,
                    pagination: {
                        el: '.SolutionsProjectsMoreProjects-sliderPagination',
                        clickable: true
                    }
                });
            } else if (!isMobile() && this.swiper !== undefined) {
                this.swiper.destroy();
                this.swiper = undefined;
                this.$refs.moreSliderWrapper.removeAttribute('style');
                this.$refs.moreSliderItem[0].removeAttribute('style');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.SolutionsProjectsMoreProjects {
    $component: &;

    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;

    &-wrapper {
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }

    &-title {
        @include title-small;

        width: 100%;
        color: $c-black;

        @include mobile {
            padding: 0 20px;
        }
    }

    &-slider {
        width: 100%;
        display: flex;
        margin-top: 32px;
        overflow: visible;

        @include mobile {
            overflow: hidden;
            margin-top: 14px;
        }

        &Wrapper {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            flex-wrap: wrap;

            @include mobile {
                flex-wrap: nowrap;
            }
        }

        &Item {
            width: (360 * 100% / 1160);
            margin-left: (40 * 100% / 1160);
            display: flex;

            &:nth-child(3n + 1) {
                margin-left: 0;
            }

            &:nth-child(n + 4) {
                margin-top: 40px;
            }

            @include mobile {
                width: (240 * 100% / 320);
                margin-top: 0 !important;
                margin-left: 0 !important;
            }
        }

        &Pagination {
            display: none;
            width: 100%;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            margin-top: 26px;

            @include mobile {
                display: flex;
            }

            & /deep/ .swiper-pagination-bullet {
                width: 8px;
                height: 8px;
                background: transparent;
                display: flex;
                border-radius: 100%;
                border: 1px solid $c-gray;
                margin-left: 12px;

                &:first-child {
                    margin-left: 0;
                }

                &.swiper-pagination-bullet-active {
                    background: $c-purple;
                    border-color: $c-purple;
                }
            }
        }
    }
}
</style>
