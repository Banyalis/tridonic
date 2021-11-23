<template>
    <div class="ContactsPopupEshop" :class="{ isHidden }">
        <div class="ContactsPopupEshop-info">
            <div class="ContactsPopupEshop-infoText">
                {{ $translations.textContactEshop() }}
                <a
                    :href="content.linkEshop"
                    target="_blank"
                    v-text="$translations.textEshop()"
                />,
                {{ $translations.textContactViaEmail() }}
                <a :href="`mailto:${content.email}`" v-text="content.email"></a>
            </div>
        </div>
        <div class="ContactsPopupEshop-images">
            <div class="ContactsPopupEshop-imagesDesktop">
                <CommonBlockDesktopImage :image="content.images.desktop" />
            </div>
            <div class="ContactsPopupEshop-imagesMobile">
                <CommonBlockMobileImage :image="content.images.mobile" />
            </div>
        </div>
    </div>
</template>

<script>
import CommonBlockDesktopImage from '@/components/CommonBlockDesktopImage';
import CommonBlockMobileImage from '@/components/CommonBlockMobileImage';

export default {
    name: 'ContactsPopupEshop',

    components: { CommonBlockMobileImage, CommonBlockDesktopImage },

    props: {
        content: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            isHidden: true
        };
    },

    mounted() {
        setTimeout(() => {
            this.isHidden = false;
        }, 60);
    }
};
</script>

<style lang="scss" scoped>
.ContactsPopupEshop {
    $component: &;

    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    transform: translate3d(0, 0, 0);
    transition: $d-hover opacity, $d-hover transform;

    @include mobile {
        margin-top: 10px;
    }

    &.isHidden {
        opacity: 0;
        transform: translate3d(0, 50px, 0);
    }

    &-info {
        width: 100%;

        &Text {
            @include text;

            color: $c-white;
            width: 475px;

            @include mobile {
                width: 100%;
            }

            a {
                color: $c-blue;
                transition: $d-hover color;

                @include hover {
                    &:hover {
                        color: $c-white;
                    }
                }
            }
        }
    }

    &-images {
        position: relative;
        width: (600 * 100% / 760);
        margin-top: 44px;

        @include mobile {
            margin-top: 60px;
            width: 100%;
        }

        &Desktop {
            width: 100%;
        }

        &Mobile {
            width: (160 * 100% / 600);
            position: absolute;
            right: 40px;
            bottom: -40px;
        }
    }
}
</style>
