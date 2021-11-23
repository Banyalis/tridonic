<template>
    <div class="CommonBlockDesktopImage">
        <div class="CommonBlockDesktopImage-screenBorder">
            <div class="CommonBlockDesktopImage-screen">
                <img :src="image" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommonBlockDesktopImage',

    props: {
        image: {
            type: String,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonBlockDesktopImage {
    $component: &;

    width: 100%;
    position: relative;
    background: $c-white;
    border-radius: 15px;
    padding: 18px;

    @include mobile {
        border-radius: 7px;
        padding: 9px;
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
