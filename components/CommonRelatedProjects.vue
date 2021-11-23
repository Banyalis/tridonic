<template>
    <div class="CommonRelatedProjects">
        <div ref="slider" class="CommonRelatedProjects-slider swiper-container">
            <ul
                ref="sliderWrapper"
                class="CommonRelatedProjects-list swiper-wrapper"
            >
                <li
                    v-for="(project, index) in projects"
                    :key="index"
                    ref="sliderItem"
                    class="CommonRelatedProjects-listItem swiper-slide"
                >
                    <CommonRelatedProjectsItem :project="project" />
                </li>
            </ul>
        </div>

        <div
            v-if="projects.length > 1"
            ref="sliderPagination"
            class="CommonRelatedProjects-sliderPagination swiper-pagination"
        ></div>
    </div>
</template>

<script>
import { Swiper, Pagination } from 'swiper';
import 'swiper/swiper.scss';
import { isMobile } from '@/utils/utils';

import CommonRelatedProjectsItem from '@/components/CommonRelatedProjectsItem';
import { DURATION_ANIMATION_POPUPS } from '@/utils/constants';

// Swiper modules
Swiper.use([Pagination]);

export default {
    name: 'CommonRelatedProjects',

    components: { CommonRelatedProjectsItem },

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
        projects() {
            setTimeout(() => {
                this.swiper && this.swiper.destroy();
                this.swiper = undefined;
                this.$refs.sliderWrapper.removeAttribute('style');
                this.$refs.sliderItem[0].removeAttribute('style');
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
                this.swiper = new Swiper(this.$refs.slider, {
                    direction: 'horizontal',
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                    loop: true,
                    pagination: {
                        el: '.CommonRelatedProjects-sliderPagination',
                        clickable: true
                    }
                });
            } else if (!isMobile() && this.swiper !== undefined) {
                this.swiper.destroy();
                this.swiper = undefined;
                this.$refs.sliderWrapper.removeAttribute('style');
                this.$refs.sliderItem[0].removeAttribute('style');
            }
        }
    }
};
</script>

<style lang="scss">
.CommonRelatedProjects {
    $component: &;

    width: 100%;
    display: flex;
    flex-direction: column;

    &-slider {
        width: 100%;
        display: flex;
        flex-direction: column;

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

            .swiper-pagination-bullet {
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

    &-list {
        @include u-noList;

        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;

        @include mobile {
            flex-wrap: nowrap;
            justify-content: flex-start;
        }

        &Item {
            display: flex;
            width: (360 * 100% / 760);
            flex-direction: column;

            &:nth-child(n + 3) {
                margin-top: 44px;

                @include mobile {
                    margin-top: 0;
                }
            }

            &:first-child:last-child {
                width: 100%;
            }

            @include mobile {
                width: (240 * 100% / 320);
            }
        }
    }
}
</style>
