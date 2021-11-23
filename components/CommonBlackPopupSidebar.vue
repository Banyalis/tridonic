<template>
    <div class="CommonBlackPopupSidebar">
        <div
            v-if="sidebar.title"
            class="CommonBlackPopupSidebar-title"
            v-text="sidebar.title"
        ></div>
        <p
            v-if="sidebar.text"
            class="CommonBlackPopupSidebar-text"
            v-text="sidebar.text"
        ></p>
        <div v-if="sidebar.nav" class="CommonBlackPopupSidebar-nav">
            <div
                v-for="(item, index) in sidebar.nav"
                :key="index"
                class="CommonBlackPopupSidebar-navItem"
                :class="{ isActive: item.id === activeCategory.id }"
                @click="changeCategory(item)"
                v-text="item.title"
            ></div>
        </div>
        <div v-if="loadedFiles.length" class="CommonBlackPopupSidebar-files">
            <div
                v-for="(file, index) in loadedFiles"
                :key="index"
                class="CommonBlackPopupSidebar-file"
            >
                <div class="CommonBlackPopupSidebar-fileIcon">
                    <svg-icon :name="file.type.toLowerCase()" />
                </div>
                <div
                    class="CommonBlackPopupSidebar-fileName"
                    v-text="file.name"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import { VUE_CUSTOM_EVENTS } from '@/utils/constants';

export default {
    name: 'CommonBlackPopupSidebar',

    props: {
        sidebar: {
            type: Object,
            required: true
        },
        loadedFiles: {
            type: Array,
            default: () => []
        }
    },

    data() {
        return {
            activeCategory: {
                id: '',
                title: ''
            }
        };
    },

    mounted() {
        if (this.sidebar.nav) this.changeCategory(this.sidebar.nav[0]);
    },

    methods: {
        changeCategory(item) {
            this.$emit(VUE_CUSTOM_EVENTS.changeCategoryPrivacy, item);
            this.activeCategory = item;
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonBlackPopupSidebar {
    $component: &;

    width: (280 * 100% / 1160);

    @include mobile {
        width: 100%;
        margin-bottom: 40px;
    }

    &-title {
        @include title-small;

        color: $c-white;
    }

    &-text {
        @include text-light-same-mobile;

        margin-top: 17px;
        color: $c-gray--text;

        @include mobile {
            margin-top: 20px;
        }
    }

    &-nav {
        @include mobile {
            display: flex;
            margin-bottom: -15px;
            padding-bottom: 9px;
            border-bottom: 1px solid rgba($c-white, 0.15);
        }

        &Item {
            @include text-light-same-mobile;

            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba($c-white, 0.15);
            cursor: pointer;
            color: $c-white;
            font-weight: $fw-medium;
            transition: color $d-hover ease-in-out;

            @include mobile {
                width: 50%;
                margin-bottom: 0;
                padding-bottom: 0;
                border-bottom: none;
                position: relative;
                text-align: center;

                &:before {
                    content: '';
                    display: block;
                    position: absolute;
                    left: 0;
                    right: 0;
                    bottom: -10px;
                    height: 2px;
                    background-color: $c-blue;
                    opacity: 0;
                    transition: opacity $d-hover ease-in-out;
                }
            }

            &:last-child {
                margin-bottom: 0;
                padding-bottom: 0;
                border-bottom: none;
            }

            &.isActive {
                color: $c-blue;

                @include mobile {
                    &:before {
                        opacity: 1;
                    }
                }
            }

            @include hover {
                &:hover {
                    color: $c-blue;
                }
            }
        }
    }

    &-files {
        width: 100%;
        margin-top: 15px;
        display: flex;
        flex-direction: column;
    }

    &-file {
        display: flex;
        width: 100%;
        align-items: center;
        margin-top: 10px;

        &:first-child {
            margin-top: 0;
        }

        &Icon {
            display: flex;
            width: 16px;
            height: 20px;
            flex: 0 0 auto;
            position: relative;

            svg {
                @include m-absolute100;

                fill: $c-white;
            }
        }

        &Name {
            @include text-light-same-mobile-medium;

            display: flex;
            color: $c-white;
            margin-left: 12px;
        }
    }
}
</style>
