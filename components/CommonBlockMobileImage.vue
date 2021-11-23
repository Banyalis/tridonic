<template>
    <div class="CommonBlockMobileImage">
        <div class="CommonBlockMobileImage-screenBorder">
            <div class="CommonBlockMobileImage-screen">
                <img :src="image" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommonBlockMobileImage',

    props: {
        image: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonBlockMobileImage {
    $component: &;

    width: 100%;
    position: relative;
    background: $c-white;
    border-radius: 15px;
    padding: 30px 10px;

    @include mobile {
        border-radius: 7px;
        padding: 13px 4px;
    }

    &:before {
        content: '';
        position: absolute;
        top: 13px;
        left: 50%;
        transform: translate3d(-50%, 0, 0);
        width: 6px;
        height: 6px;
        border-radius: 100%;
        border: 1px solid #dcdcdc;

        @include mobile {
            top: 6px;
            width: 3px;
            height: 3px;
        }
    }

    &-screen {
        background: $c-blue;
        position: relative;
        display: flex;

        &Border {
            border-radius: 2px;
            background: $c-black;
            padding: 2px;

            @include mobile {
                border-radius: 1px;
                padding: 1px;
            }
        }

        img {
            display: flex;
            max-width: 100%;
            width: 100%;
        }
    }
}
</style>
