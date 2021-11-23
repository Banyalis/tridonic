<template>
    <section class="ProductPopupDrawersOverview">
        <div class="ProductPopupDrawersOverview-info">
            <div
                v-if="content.items && content.items.length"
                class="ProductPopupDrawersOverview-infoItems"
            >
                <div
                    v-for="(item, key) in content.items"
                    :key="key"
                    class="ProductPopupDrawersOverview-infoItem"
                >
                    <div
                        v-if="item.title"
                        class="ProductPopupDrawersOverview-infoItemTitle"
                        v-text="item.title"
                    ></div>
                    <div
                        v-if="item.text"
                        class="ProductPopupDrawersOverview-infoItemText"
                        v-text="item.text"
                    ></div>
                    <div
                        v-if="item.props && item.props.length"
                        class="ProductPopupDrawersOverview-infoItemText"
                    >
                        <div
                            v-for="(prop, id) in item.props"
                            :key="id"
                            class="ProductPopupDrawersOverview-infoItemTextProp"
                            v-text="prop.text"
                        ></div>
                    </div>
                </div>
            </div>
            <div
                v-if="content.notes"
                class="ProductPopupDrawersOverview-infoNotes"
                v-text="content.notes"
            ></div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ProductPopupDrawersOverview',

    props: {
        content: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.ProductPopupDrawersOverview {
    $component: &;

    width: 100%;
    position: relative;

    @include mobile {
        padding: 0 20px;
    }

    &-info {
        display: flex;
        width: 100%;
        position: relative;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        &Items {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;

            @include mobile {
                flex-direction: column;
            }
        }

        &Item {
            width: (360 * 100% / 1160);
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            margin-left: (40 * 100% / 1160);

            &:nth-child(3n + 1) {
                margin-left: 0;
            }

            &:nth-child(n + 4) {
                margin-top: 40px;

                @include mobile {
                    margin-top: 20px;
                }
            }

            &:first-child {
                margin-top: 0 !important;
            }

            @include mobile {
                width: 100%;
                margin-left: 0;
                margin-top: 20px;
            }

            &Title {
                @include text-light-same-mobile-medium;

                display: flex;
                color: $c-black;
                width: 100%;
            }

            &Text {
                @include text-light-same-mobile;

                display: flex;
                color: $c-black;
                width: 100%;
                flex-direction: column;
                align-items: flex-start;
                justify-content: flex-start;
                white-space: pre-line;

                &Prop {
                    display: flex;
                    width: 100%;
                    padding-left: 15px;
                    position: relative;
                    flex-direction: row;

                    &:before {
                        content: '—';
                        position: absolute;
                        top: 3px;
                        left: 0;
                    }
                }
            }
        }

        &Notes {
            @include text-light-same-mobile;

            margin-top: 40px;
            color: $c-gray;
            display: flex;
            width: 100%;
            white-space: pre-line;
        }
    }
}
</style>
