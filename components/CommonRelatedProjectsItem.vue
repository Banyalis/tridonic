<template>
    <nuxt-link :to="project.url" class="CommonRelatedProjectsItem">
        <div class="CommonRelatedProjectsItem-image">
            <img :src="project.image" :alt="project.title" />
        </div>
        <div class="CommonRelatedProjectsItem-info">
            <p class="CommonRelatedProjectsItem-type" v-text="project.type"></p>
            <h3
                class="CommonRelatedProjectsItem-title"
                v-text="project.title"
            ></h3>
        </div>
    </nuxt-link>
</template>

<script>
export default {
    name: 'CommonRelatedProjectsItem',
    props: {
        project: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss">
.CommonRelatedProjectsItem {
    $component: &;

    display: flex;
    width: 100%;
    flex-direction: column;
    cursor: pointer;

    @include hover {
        &:hover {
            #{$component} {
                &-image {
                    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.2);

                    img {
                        transform: translate3d(0, 0, 0) scale(1.05);
                    }
                }

                &-title {
                    color: $c-blue;
                }
            }
        }
    }

    &-image {
        @include m-aspectRatio(360, 240);

        width: 100%;
        display: flex;
        overflow: hidden;
        transition: $d-hover box-shadow;

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
        margin-top: 15px;

        @include mobile {
            margin-top: 10px;
        }
    }

    &-type {
        @include text-light;

        color: $c-gray;
    }

    &-title {
        @include text;

        color: $c-black;
        transition: $d-hover color;

        @include mobile {
            @include text-light-same-mobile-medium;
        }
    }
}
</style>
