<template>
    <section class="CommonDownloads" :class="[type ? type : undefined]">
        <div class="CommonDownloads-table">
            <div class="CommonDownloads-tableWrapper">
                <div
                    v-if="head.length && !hideSort"
                    class="CommonDownloads-tableHead"
                >
                    <div class="CommonDownloads-tableCheckbox">
                        <input
                            id="allFiles"
                            v-model="inputValues['allFiles']"
                            type="checkbox"
                            class="CommonDownloads-tableCheckboxInput"
                            @change="onChangeValueAll"
                        />
                        <label
                            class="CommonDownloads-tableCheckboxLabel"
                            for="allFiles"
                        ></label>
                    </div>
                    <div class="CommonDownloads-tableName">
                        <div
                            class="CommonDownloads-tableRowItem CommonDownloads-tableRowItem--name"
                            :class="{ isActive: activeIndex === 0 }"
                            @click="onSort(0, 'name')"
                        >
                            <div
                                class="CommonDownloads-tableRowItemText"
                                v-text="head[0].text"
                            ></div>
                            <div class="CommonDownloads-tableRowItemIcon">
                                <svg-icon name="arrows-sorting"></svg-icon>
                            </div>
                        </div>
                    </div>
                    <div class="CommonDownloads-tableAttrs">
                        <div
                            v-for="(file, key) in getHead"
                            :key="key"
                            class="CommonDownloads-tableRowItem"
                            :class="[
                                `CommonDownloads-tableRowItem--${file.item}`,
                                activeIndex === key + 1 ? 'isActive' : ''
                            ]"
                            @click="onSort(key + 1, file.item)"
                        >
                            <div
                                class="CommonDownloads-tableRowItemText"
                                v-text="file.text"
                            ></div>
                            <div class="CommonDownloads-tableRowItemIcon">
                                <svg-icon name="arrows-sorting"></svg-icon>
                            </div>
                        </div>
                        <div
                            class="CommonDownloads-tableRowItem CommonDownloads-tableRowItem--tag"
                        ></div>
                    </div>
                    <div class="CommonDownloads-tableRowItemSelect">
                        <select
                            v-model="selectValue"
                            dir="rtl"
                            @change="onSelect"
                        >
                            <option
                                v-for="(option, key) in head"
                                :key="key"
                                :value="option.item"
                                v-text="
                                    `${$translations.sortBy()} ${option.text}`
                                "
                            ></option>
                        </select>
                    </div>
                </div>
                <div class="CommonDownloads-tableBody">
                    <div
                        v-for="(file, key) in body"
                        :key="file.id"
                        class="CommonDownloads-tableRow"
                        :class="[
                            key % 2 === 0 ? `CommonDownloads-tableRow--odd` : ''
                        ]"
                    >
                        <div class="CommonDownloads-tableRowBg"></div>
                        <div
                            v-if="!hideSort"
                            class="CommonDownloads-tableCheckbox"
                        >
                            <input
                                :id="file.id"
                                v-model="inputValues[file.id]"
                                type="checkbox"
                                class="CommonDownloads-tableCheckboxInput"
                                @change="onChangeValue(file.id)"
                            />
                            <label
                                class="CommonDownloads-tableCheckboxLabel"
                                :for="file.id"
                            ></label>
                        </div>
                        <component
                            :is="file.isLocked ? 'div' : 'nuxt-link'"
                            :to="file.isLocked ? undefined : file.link"
                            class="CommonDownloads-tableRowInner"
                            @click="onClickFile(file)"
                        >
                            <div class="CommonDownloads-tableRowItemWrapper">
                                <div class="CommonDownloads-tableName">
                                    <div
                                        class="CommonDownloads-tableRowItem CommonDownloads-tableRowItem--name"
                                    >
                                        <div
                                            :download="true"
                                            class="CommonDownloads-tableRowItemText CommonDownloads-tableRowItemName"
                                            v-text="file.name"
                                        ></div>
                                        <div
                                            v-if="file.isLocked"
                                            class="CommonDownloads-tableRowItemLocked"
                                        >
                                            <svg-icon
                                                name="icon-lock"
                                            ></svg-icon>
                                        </div>
                                    </div>
                                </div>
                                <div class="CommonDownloads-tableAttrs">
                                    <div
                                        v-if="file.info"
                                        class="CommonDownloads-tableRowItem CommonDownloads-tableRowItem--info"
                                    >
                                        <div
                                            class="CommonDownloads-tableRowItemText"
                                            v-text="file.info"
                                        ></div>
                                    </div>
                                    <div
                                        v-if="file.date"
                                        class="CommonDownloads-tableRowItem CommonDownloads-tableRowItem--date"
                                    >
                                        <div
                                            class="CommonDownloads-tableRowItemText"
                                            v-text="file.date"
                                        ></div>
                                    </div>
                                    <div
                                        v-if="file.size"
                                        class="CommonDownloads-tableRowItem CommonDownloads-tableRowItem--size"
                                    >
                                        <div
                                            class="CommonDownloads-tableRowItemText"
                                            v-text="file.size"
                                        ></div>
                                    </div>
                                    <div
                                        v-if="file.type"
                                        class="CommonDownloads-tableRowItem CommonDownloads-tableRowItem--type"
                                    >
                                        <div
                                            class="CommonDownloads-tableRowItemFile"
                                        >
                                            <svg-icon
                                                :name="file.type.toLowerCase()"
                                            ></svg-icon>
                                        </div>
                                        <div
                                            class="CommonDownloads-tableRowItemText"
                                            v-text="file.type"
                                        ></div>
                                    </div>
                                    <div
                                        class="CommonDownloads-tableRowItem CommonDownloads-tableRowItem--tag"
                                    >
                                        <tag
                                            v-if="file.tag"
                                            :id="file.tag.id"
                                            :text="file.tag.text"
                                        ></tag>
                                    </div>
                                </div>
                            </div>
                        </component>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Tag from '@/components/Tag';

import { VUE_CUSTOM_EVENTS } from '@/utils/constants';
import { mapMutations } from 'vuex';

export default {
    name: 'CommonDownloads',

    components: { Tag },

    props: {
        downloads: {
            type: Array,
            required: true
        },
        hideSort: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            head: [],
            body: [],
            headNames: {
                name: 'downloadsName',
                date: 'downloadsDate',
                info: 'downloadsInfo',
                type: 'downloadsType',
                size: 'downloadsSize'
            },
            inputValues: [],
            activeIndex: 0,
            selectValue: ''
        };
    },

    computed: {
        getHead() {
            return this.head.filter((item, id) => id !== 0);
        }
    },

    watch: {
        downloads() {
            this.initialize();
        }
    },

    mounted() {
        this.$root.$on(VUE_CUSTOM_EVENTS.clearTablesSorts, this.resetSorted);
        if (!this.downloads) {
            return;
        }
        this.initialize();
    },

    destroyed() {
        this.$root.$off(VUE_CUSTOM_EVENTS.clearTablesSorts, this.resetSorted);
    },

    methods: {
        initialize() {
            this.setHead();
            this.selectValue = this.head[0].item;
            this.body = [...this.downloads];
        },

        setHead() {
            this.head = Object.entries(this.downloads[0])
                .map(([key]) => {
                    let text = '';
                    if (this.headNames[key]) {
                        text = this.$translations[this.headNames[key]]();
                    }
                    return {
                        text,
                        item: key
                    };
                })
                .filter(
                    (item) =>
                        item.item !== 'id' &&
                        item.item !== 'tag' &&
                        item.item !== 'isLocked' &&
                        item.item !== 'link'
                );
        },

        onSort(index, type) {
            this.activeIndex = index;

            this.body.sort((a, b) => {
                if (a[type] > b[type]) {
                    return 1;
                }

                if (a[type] < b[type]) {
                    return -1;
                }

                return 0;
            });
        },

        onChangeValue() {
            let selectedFiles = [];

            selectedFiles = this.body.filter(
                (item) => !!this.inputValues[item.id]
            );

            this.$emit('on-select-files', selectedFiles);
        },

        onChangeValueAll() {
            const selectedFiles = [];

            this.body.forEach((item) => {
                this.inputValues.allFiles && selectedFiles.push(item);
                this.inputValues[item.id] = this.inputValues.allFiles;
            });

            this.$emit('on-select-files', selectedFiles);
        },

        onSelect() {
            let index = 0;

            this.head.forEach((item, id) => {
                if (item.item === this.selectValue) index = id;
            });

            this.onSort(index, this.selectValue);
        },

        resetSorted() {
            this.activeIndex = 0;
        },

        onClickFile(file) {
            if (file.isLocked) {
                this.updateFiles([file]);
                this.$router.push('/get-access');
                // window.history.pushState({}, null, '/get-access');
            }
        },

        ...mapMutations({
            updateFiles: 'get-access-files/updateFiles'
        })
    }
};
</script>

<style lang="scss" scoped>
.CommonDownloads {
    $component: &;

    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    &-table {
        width: 100%;
        display: flex;
        flex-direction: column;

        &Wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
        }

        &Name {
            display: flex;
            width: (300 * 100% / 1120);
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            position: relative;
            z-index: 2;

            @include mobile {
                width: 100%;
            }

            #{$component}.isLong & {
                width: (560 * 100% / 1120);

                @include mobile {
                    width: 100%;
                    position: initial;
                }
            }
        }

        &Attrs {
            width: (820 * 100% / 1120);
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            position: relative;
            z-index: 2;

            @include mobile {
                width: 100%;
                position: initial;
            }

            #{$component}.isLong & {
                width: (560 * 100% / 1120);

                @include mobile {
                    width: 100%;
                    position: initial;
                }
            }
        }

        &Head {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            padding: 0 0 10px;

            @include mobile {
                align-items: center;
                padding: 0 0 20px;
            }

            & #{$component}-tableRowItem {
                cursor: pointer;

                &Text {
                    @include text-light-same-mobile;

                    color: #909096;
                }

                @include hover {
                    &:hover {
                        svg {
                            fill: $c-purple;
                        }
                    }
                }
            }

            & #{$component}-tableName,
            & #{$component}-tableAttrs {
                @include mobile {
                    display: none;
                }
            }
        }

        &Body {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;

            & #{$component}-tableRowItem {
                cursor: pointer;

                &Text {
                    @include text-light-same-mobile;

                    color: $c-black;

                    @include mobile {
                        font-size: 10px;
                        line-height: 20px;
                        color: $c-gray;
                    }
                }

                &--name #{$component}-tableRowItemText {
                    @include mobile {
                        font-size: 14px;
                    }
                }

                &--info #{$component}-tableRowItemText {
                    @include mobile {
                        font-size: 12px;
                    }
                }

                &--type #{$component}-tableRowItemText {
                    @include mobile {
                        color: $c-black;
                    }
                }

                & a,
                & #{$component}-tableRowItemName {
                    @include text-light-same-mobile-medium;

                    color: $c-purple;
                    transition: $d-hover color;

                    @include hover {
                        &:hover {
                            color: $c-blue;
                        }
                    }
                }
            }
        }

        &Row {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;
            position: relative;
            padding: 10px 0;
            border-top: 1px solid #e4e4e4;
            transition: $d-hover border-color;

            &--odd {
                background: $c-gray--bg;
            }

            &:last-child {
                border-bottom: 1px solid #e4e4e4;
            }

            @include hover {
                &:hover {
                    border-color: transparent;

                    &:last-child {
                        border-color: transparent;
                    }

                    & + #{$component}-tableRow {
                        border-top-color: transparent;
                    }

                    & #{$component}-tableRowBg {
                        opacity: 1;
                    }
                }
            }

            &Inner {
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-end;
                position: relative;
                cursor: pointer;
            }

            &Bg {
                position: absolute;
                top: -1px;
                left: -10px;
                right: -10px;
                bottom: -1px;
                background: $c-purpleBgRow;
                z-index: 1;
                opacity: 0;
                transition: $d-hover opacity;

                @include mobile {
                    display: none;
                }
            }

            &Item {
                display: flex;
                align-items: center;
                justify-content: flex-start;

                &--name {
                    justify-content: flex-start !important;

                    @include mobile {
                        width: 100%;
                        padding-right: (50 * 100% / 250);
                    }
                }

                &--info {
                    width: (190 * 100% / 820);
                    margin-right: (50 * 100% / 820);

                    @include mobile {
                        width: (177 * 100% / 250);
                        margin-right: 0;
                    }
                }

                &--date {
                    width: (100 * 100% / 820);
                    margin-right: (50 * 100% / 820);
                    min-width: 65px;

                    @include mobile {
                        display: none;
                    }
                }

                &--size {
                    width: (100 * 100% / 820);
                    margin-right: (60 * 100% / 820);

                    @include mobile {
                        width: (48 * 100% / 250);
                        margin-right: 0;
                        justify-content: flex-end;
                    }
                }

                &--type {
                    width: 55px;

                    @include mobile {
                        width: (25 * 100% / 250);
                        justify-content: flex-end;
                    }
                }

                #{$component}-tableAttrs &:last-child {
                    width: 70px;
                    flex-direction: row;
                    display: flex;
                    justify-content: flex-end;

                    @include mobile {
                        position: absolute;
                        top: 1px;
                        right: 0;
                    }
                }

                &.isActive svg {
                    fill: $c-purple;
                }

                &Select {
                    display: none;
                    width: calc(100% - 30px);
                    align-items: center;
                    justify-content: flex-end;
                    text-align: right;

                    @include mobile {
                        display: flex;
                    }

                    & select {
                        @include text-light-same-mobile-medium;

                        color: $c-purple;
                        appearance: none;
                        background-color: transparent;
                        border: none;
                        padding: 0;
                        margin: 0;
                        font-family: inherit;
                        font-size: inherit;
                        cursor: inherit;
                        line-height: inherit;
                        outline: none;
                        display: flex;

                        &::-ms-expand {
                            display: none;
                        }
                    }
                }

                &Wrapper {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    //width: calc(100% - 40px);

                    @include mobile {
                        //width: calc(100% - 30px);
                    }
                }

                &Icon {
                    @include m-absoluteSvg;

                    display: flex;
                    position: relative;
                    width: 10px;
                    height: 16px;
                    margin-left: 9px;

                    svg {
                        fill: $c-gray;
                        transition: $d-hover fill;
                    }
                }

                &Locked,
                &File {
                    @include m-absoluteSvg;

                    display: flex;
                    position: relative;
                    width: 16px;
                    height: 20px;

                    svg {
                        fill: $c-purple;
                        transition: $d-hover fill;
                    }
                }

                &File {
                    @include mobile {
                        display: none;
                    }
                }

                &Locked {
                    margin-left: 10px;
                }

                &File {
                    margin-right: 10px;
                }
            }
        }

        &Checkbox {
            display: flex;
            width: 20px;
            height: 20px;
            margin-right: 20px;
            position: relative;
            justify-self: flex-start;
            z-index: 2;
            pointer-events: none;

            @include mobile {
                margin-right: 10px;
            }

            &Input {
                position: absolute;
                opacity: 0;
            }

            &Label {
                padding-left: 25px;
                transition: $d-hover color;
                cursor: pointer;
                pointer-events: all;

                &::before {
                    content: '';
                    position: absolute;
                    left: 0;
                    width: 20px;
                    height: 20px;
                    top: 50%;
                    transform: translate3d(0, -50%, 0);
                    transition: $d-hover color;
                    border-radius: 2px;
                    background: $c-white;
                    border: 1px solid;
                    color: $c-filterSliderLine;
                }

                &::after {
                    content: '';
                    position: absolute;
                    background: $c-purple;
                    opacity: 0;
                    border-radius: 1px;
                    transition: $d-hover opacity;
                    width: 12px;
                    height: 12px;
                    left: 4px;
                    top: 50%;
                    transform: translate3d(0, -50%, 0);
                }
            }

            @include hover {
                &Input:hover + &Label,
                &Input:checked:hover + &Label {
                    &:before {
                        border: 2px solid;
                        color: $c-purple;
                    }
                }
            }

            &Input:checked + &Label {
                &:after {
                    opacity: 1;
                }

                &:before {
                    border-width: 1px;
                }
            }
        }
    }
}
</style>
