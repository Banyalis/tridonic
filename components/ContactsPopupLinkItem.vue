<template>
    <a :href="link.url" target="_blank" class="ContactsPopupLinkItem">
        <span class="ContactsPopupLinkItem-info">
            <span
                class="ContactsPopupLinkItem-infoTitle"
                v-text="link.title"
            ></span>
            <span
                class="ContactsPopupLinkItem-infoDescr"
                v-text="link.description"
            ></span>
        </span>
        <span class="ContactsPopupLinkItem-arrow">
            <Arrow />
        </span>
    </a>
</template>

<script>
import Arrow from '@/components/Arrow';

export default {
    name: 'ContactsPopupLinkItem',

    components: { Arrow },

    props: {
        link: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.ContactsPopupLinkItem {
    $component: &;

    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include hover {
        &:hover {
            #{$component}-arrow /deep/ svg {
                transform: none;
            }
        }
    }

    &-info {
        display: flex;
        flex-direction: column;
        width: (560 * 100% / 760);

        @include mobile {
            width: 100%;
        }

        &Title {
            @include text;

            line-height: (20 / 24);
            color: $c-white;

            @include mobile {
                line-height: (20 / 18);
            }
        }

        &Descr {
            @include text-light-same-mobile;

            color: $c-gray--text;
            margin-top: 24px;

            @include mobile {
                margin-top: 2px;
            }
        }
    }

    &-arrow {
        color: $c-blue;

        @include mobile {
            position: absolute;
            top: -3px;
            right: 0;
        }
    }
}
</style>
