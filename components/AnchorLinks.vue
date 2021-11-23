<template>
    <nav class="AnchorLinks">
        <div class="AnchorLinks-container b-container">
            <div
                v-if="anchorLinks.title"
                class="AnchorLinks-title"
                v-text="anchorLinks.title"
            ></div>
            <ul class="AnchorLinks-list">
                <li
                    v-for="item in anchorLinks.links"
                    :key="item.id"
                    class="AnchorLinks-listItem"
                >
                    <nuxt-link :to="item.url" class="AnchorLinks-link">
                        {{ item.title }}

                        <div class="AnchorLinks-linkArrow">
                            <Arrow />
                        </div>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import Arrow from '@/components/Arrow';
export default {
    name: 'AnchorLinks',
    components: { Arrow },
    props: {
        anchorLinks: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss">
.AnchorLinks {
    $component: &;

    background-color: $c-purple;
    background-image: url('~assets/images/bg_purple.png');
    background-repeat: repeat;
    background-position: 0 0;
    background-size: 48px 48px;
    padding: 80px 0;

    @include mobile {
        padding: 32px 0 0;
    }

    &-container {
        max-width: calc(920px + 280px);

        @include tablet {
            max-width: 100%;
        }

        @include mobile {
            max-width: 100%;
            padding: 0;
        }
    }

    &-title {
        @include title-small;
        color: $c-white;
        text-align: center;
        margin: 0 auto 32px;

        @include mobile {
            font-size: 14px;
            font-weight: $fw-medium;
            letter-spacing: 0;
            line-height: calc(20 / 14);
        }
    }

    &-list {
        border-top: 1px solid rgba(255, 255, 255, 0.15);
        border-bottom: 1px solid rgba(255, 255, 255, 0.15);
        list-style: none;
        margin: 0;
        padding: 0;

        @include mobile {
            border-bottom: 0;
        }
    }

    &-listItem {
        border-bottom: 1px solid rgba(255, 255, 255, 0.15);

        &:last-child {
            border: 0;
        }
    }

    &-link {
        @include title-small;
        display: block;
        color: $c-white;
        line-height: calc(40 / 32);
        letter-spacing: -0.5px;
        padding: 20px 0;
        position: relative;
        transition: $d-hover color;
        transform: translate3d(0, 0, 0);

        &Arrow {
            color: $c-blue;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translate3d(0, -50%, 0);

            @include mobile {
                right: 28px;
            }
        }

        @include hover {
            &:hover {
                color: $c-blue;

                #{$component}-linkArrow {
                    svg {
                        transform: none;
                    }
                }
            }
        }

        @include mobile {
            font-size: 24px;
            letter-spacing: -0.2;
            line-height: calc(20 / 24);
            padding: 30px 20px;
        }
    }
}
</style>
