<template>
    <div class="SolutionsProjectsCategoryItem">
        <nuxt-link
            :to="project.url"
            class="SolutionsProjectsCategoryItem-wrapper"
        >
            <div class="SolutionsProjectsCategoryItem-image">
                <img :src="project.image" :alt="project.title" />
            </div>
            <div class="SolutionsProjectsCategoryItem-info">
                <div
                    class="SolutionsProjectsCategoryItem-infoLocation"
                    v-text="
                        `${project.location.city} / ${project.location.country}`
                    "
                ></div>
                <div
                    class="SolutionsProjectsCategoryItem-infoTitle"
                    v-text="project.title"
                ></div>
                <div class="SolutionsProjectsCategoryItem-infoArrow">
                    <Arrow />
                </div>
            </div>
        </nuxt-link>
    </div>
</template>

<script>
import Arrow from '@/components/Arrow';

export default {
    name: 'SolutionsProjectsCategoryItem',

    components: {
        Arrow
    },

    props: {
        project: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss">
.SolutionsProjectsCategoryItem {
    $component: &;

    display: flex;
    width: 100%;

    &-wrapper {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

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

                        &Arrow {
                            opacity: 1;

                            & svg {
                                transform: none;
                            }
                        }
                    }
                }
            }
        }
    }

    &-image {
        @include m-aspectRatio(360, 240);

        overflow: hidden;
        width: 100%;

        img {
            @include m-absoluteObjectFit();

            transform: translate3d(0, 0, 0);
            transition: $d-hover transform;
        }
    }

    &-info {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        margin-top: 25px;

        @include mobile {
            margin-top: 10px;
        }

        &Location {
            @include text-light-same-mobile;

            color: $c-gray;
        }

        &Title {
            @include text;

            color: $c-black;
            margin-top: 11px;
            transition: $d-hover color;

            @include mobile {
                margin-top: 3px;
            }
        }

        &Arrow {
            color: $c-blue;
            display: flex;
            margin-top: 27px;
            opacity: 0;
            transition: $d-hover opacity;

            @include mobile {
                display: none;
            }
        }
    }
}
</style>
