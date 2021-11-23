<template>
    <div
        class="FiltersMobileWrapper"
        :class="{ isActive: isMobileFiltersOpened }"
    >
        <div class="FiltersMobileWrapper-background"></div>
        <div class="FiltersMobileWrapper-wrapper">
            <div class="FiltersMobileWrapper-content">
                <component
                    :is="filterComponent"
                    :filter-list="filterList[apiEvent]"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import Filters from '@/components/Filters';

export default {
    name: 'FiltersMobileWrapper',
    components: {
        Filters
    },
    computed: {
        ...mapState('filters', ['filterList', 'apiEvent']),
        ...mapState('filters-mobile', [
            'isMobileFiltersOpened',
            'filterComponent'
        ])
    },
    methods: {
        ...mapMutations({
            blockScroll: 'blockScroll'
        })
    }
};
</script>

<style lang="scss" scoped>
.FiltersMobileWrapper {
    @include m-absolute100;
    position: fixed;
    pointer-events: none;
    opacity: 0;
    display: none;
    transition: $d-hover opacity, $d-hover transform;
    z-index: $z-mobileFilters;
    overflow: hidden;

    @include mobile {
        display: block;
    }

    &.isActive {
        opacity: 1;
        pointer-events: all;
    }

    &-background {
        @include m-absolute100;
        backdrop-filter: blur(10px);
        background: $c-purple--dimmed;
    }

    &-wrapper {
        @include m-absolute100;
        overflow-y: scroll;
        transform: translate3d(0, 100%, 0);
        transition: $d-hover transform;
        pointer-events: none;

        .isActive & {
            transform: none;
            pointer-events: all;
        }
    }

    &-content {
        min-height: calc(100% - 80px);
        background: $c-white;
        width: 100%;
        margin-top: 80px;
        padding: 0 20px;
        position: relative;
    }
}
</style>
