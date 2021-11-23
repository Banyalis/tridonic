<template>
    <section
        class="CommonDataTable"
        :class="[type ? `CommonDataTable--${type}` : '']"
    >
        <div
            v-if="table.title"
            class="CommonDataTable-title"
            v-text="table.title"
        ></div>
        <div class="CommonDataTable-table">
            <div class="CommonDataTable-tableWrapper">
                <div class="CommonDataTable-tableHead">
                    <common-data-table-head
                        :head="table.head"
                        :type="type"
                        @on-sorted-table="setSorted"
                    ></common-data-table-head>
                </div>
                <div class="CommonDataTable-tableBody">
                    <common-data-table-row
                        v-for="(row, key) in body"
                        :key="key"
                        :row="row"
                        :odd="key % 2 === 0"
                        :type="type"
                    ></common-data-table-row>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import CommonDataTableRow from '@/components/CommonDataTableRow';
import CommonDataTableHead from '@/components/CommonDataTableHead';

export default {
    name: 'CommonDataTable',

    components: { CommonDataTableHead, CommonDataTableRow },

    props: {
        table: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            body: []
        };
    },

    watch: {
        table() {
            this.body = [...this.table.body];
        }
    },

    mounted() {
        this.body = [...this.table.body];
    },

    methods: {
        setSorted(index) {
            this.body.sort((a, b) => {
                if (a[index].text > b[index].text) {
                    return 1;
                }
                if (a[index].text < b[index].text) {
                    return -1;
                }

                return 0;
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonDataTable {
    $component: &;

    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    &-title {
        @include text;

        color: $c-black;
        margin-bottom: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    &-table {
        width: 100%;
        display: flex;
        flex-direction: column;

        @include mobile {
            overflow-x: scroll;
            width: calc(100% + 40px);
            margin-left: -20px;
        }

        &::-webkit-scrollbar {
            width: 0;
        }

        &::-webkit-scrollbar-track {
            background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
            background-color: transparent;
        }

        &::-webkit-scrollbar-button {
            background-color: transparent;
        }

        &::-webkit-scrollbar-corner {
            background-color: transparent;
        }

        &Wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
        }

        &Head,
        &Body {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;

            @include mobile {
                width: auto;
                min-width: 100%;
                padding: 0 20px;
            }
        }
    }

    &--popup,
    &--drivers,
    &--module,
    &--suitable {
        #{$component}-table {
            @include mobile {
                width: calc(100% + 20px);
                margin-left: -10px;

                &Head,
                &Body {
                    padding: 0 10px;
                }
            }
        }
    }
}
</style>
