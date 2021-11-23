<template>
    <div class="Arrow">
        <svg-icon
            name="arrow-right-long-dotted"
            class="Arrow-desktop"
        ></svg-icon>
        <svg-icon
            name="arrow-right-long-dotted-mobile"
            class="Arrow-mobile"
        ></svg-icon>
    </div>
</template>

<script>
export default {
    name: 'Arrow'
};
</script>

<style lang="scss" scoped>
.Arrow {
    width: 62px;
    height: 34px;
    position: relative;
    overflow: hidden;

    @include mobile {
        width: 32px;
        height: 20px;
    }

    &-desktop {
        @include mobile {
            display: none;
        }
    }

    &-mobile {
        display: none;

        @include mobile {
            display: block;
        }
    }

    @include hover {
        &:hover {
            svg {
                transform: none;
            }
        }
    }

    svg {
        @include m-absolute100;

        fill: currentColor;
        transform: translate3d(-12px, 0, 0);
        transition: $d-hover transform, $d-hover fill;

        @include mobile {
            transform: none;
        }
    }
}
</style>
