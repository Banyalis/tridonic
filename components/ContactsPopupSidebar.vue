<template>
    <div class="ContactsPopupSidebar">
        <div
            v-for="(category, index) in categories"
            :key="index"
            class="ContactsPopupSidebar-item"
            :class="{ isActive: category.id === activeCategory.id }"
            @click="changeCategory(category)"
        >
            <div
                class="ContactsPopupSidebar-itemText"
                v-text="category.name"
            ></div>
            <div class="ContactsPopupSidebar-itemArrow">
                <Arrow />
            </div>
        </div>
    </div>
</template>

<script>
import { VUE_CUSTOM_EVENTS } from '@/utils/constants';
import Arrow from '@/components/Arrow';

export default {
    name: 'ContactsPopupSidebar',
    components: { Arrow },
    props: {
        categories: {
            type: Array,
            required: true
        }
    },

    data() {
        return {
            activeCategory: {
                id: '',
                name: ''
            }
        };
    },

    mounted() {
        this.activeCategory = this.categories[0];
    },

    methods: {
        changeCategory(category) {
            this.activeCategory = category;
            this.$emit(VUE_CUSTOM_EVENTS.changeCategoryContacts, category);
        }
    }
};
</script>

<style lang="scss" scoped>
.ContactsPopupSidebar {
    $component: &;

    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;

    &-item {
        @include text-light-same-mobile-medium;

        width: 100%;
        padding: 10px 0;
        color: $c-white;
        transition: $d-hover color;
        border-top: 1px solid rgba($c-white, 0.15);
        cursor: pointer;

        &:first-child {
            padding-top: 0;
            border-top: none;
        }

        @include mobile {
            padding: 20px;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            border-top: 1px solid #303030;

            &:first-child {
                padding-top: 20px;
                border-top: 1px solid #303030;
            }

            &:last-child {
                border-bottom: 1px solid #303030;
            }
        }

        @include hover {
            &:hover {
                color: $c-blue;
            }
        }

        &.isActive {
            color: $c-blue;
            pointer-events: none;

            @include mobile {
                color: $c-white;
                pointer-events: all;
            }
        }

        &Arrow {
            display: none;

            @include mobile {
                display: flex;
            }
        }
    }
}
</style>
