<template>
    <div class="Firmware">
        <div class="Firmware-container b-container">
            <h2 v-if="title" class="Firmware-title">{{ title }}</h2>

            <ul class="FirmwareList">
                <li
                    v-for="item in list"
                    :key="item.id"
                    class="FirmwareList-item"
                >
                    <a class="FirmwareProductCard" :href="item.link.url">
                        <div class="FirmwareProductCard-header">
                            <div class="FirmwareProductCard-image">
                                <img
                                    v-if="item.image"
                                    :src="item.image"
                                    alt=""
                                />
                                <svg-icon name="icon-reload" />
                            </div>
                            <h3 class="FirmwareProductCard-title">
                                {{ item.title }}
                            </h3>
                        </div>
                        <div class="FirmwareProductCard-content">
                            <p class="FirmwareProductCard-desc">
                                {{ item.desc }}
                            </p>

                            <div class="FirmwareProductCard-contentFooter">
                                <span
                                    :href="item.link.url"
                                    class="FirmwareProductCard-link"
                                >
                                    <svg-icon
                                        class="FirmwareProductCard-linkIcon"
                                        name="link-arrow-small"
                                    />
                                    <span class="FirmwareProductCard-linkText">
                                        {{ item.link.title }}
                                    </span>
                                </span>

                                <div class="FirmwareProductCard-notes">
                                    <span class="FirmwareProductCard-version">
                                        {{ item.version }}
                                    </span>
                                    <span class="FirmwareProductCard-date">
                                        {{ item.date }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: null
        },
        list: {
            type: Array,
            default: () => {
                return [];
            }
        }
    }
};
</script>

<style lang="scss">
.Firmware {
    background: $c-gray--bg;
    box-shadow: inset 0 1px 0 0 $c-gray--shadow;
    padding: 68px 0;
    overflow: hidden;

    @include mobile {
        padding: 43px 0;
    }

    &-title {
        @include title-bordered-h2;
    }
}

.FirmwareList {
    @include u-noList;
    margin: 20px auto 0;

    @include mobile {
        margin-top: 16px;
    }

    &-item {
        border-bottom: 1px solid $c-gray--shadow;
        padding: 36px 0;
        position: relative;

        &::before {
            content: '';
            background: $c-white;
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.15);
            opacity: 0;
            position: absolute;
            top: -1px;
            bottom: -1px;
            left: -40px;
            right: -40px;
            z-index: 1;

            transition: opacity $d-hover ease;
        }

        @include hover {
            &:hover {
                &::before {
                    opacity: 1;
                }

                .FirmwareProductCard-link {
                    color: $c-blue;
                }
            }
        }

        &:last-child {
            border-bottom: 0;
        }

        @include mobile {
            border: 0;
            padding: 28px 0;
        }
    }
}

.FirmwareProductCard {
    color: $c-black;
    display: block;
    position: relative;
    padding-left: 200px;
    text-decoration: none;
    z-index: 1;

    @include mobile {
        padding: 0;
    }

    &-header {
        display: contents;

        @include mobile {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            margin: 0 0 20px;
        }
    }

    &-image {
        display: flex;
        flex-shrink: 0;
        flex-grow: 0;
        position: absolute;
        left: 0;
        height: 120px;
        width: 120px;

        img {
            display: block;
            margin: auto;
            max-height: 100%;
            max-width: 100%;
        }

        svg {
            fill: $c-purple;
            position: absolute;
            bottom: -6px;
            right: -2px;
            height: 24px;
            width: 22px;

            @include mobile {
                bottom: 0;
                right: 0;
                height: 15px;
                width: 14px;
            }
        }

        @include mobile {
            position: relative;
            margin-right: 20px;
            height: 60px;
            width: 60px;
        }
    }

    &-title {
        font-size: 24px;
        font-weight: $fw-normal;
        line-height: calc(30 / 24);
        letter-spacing: -0.2px;
        margin: 0 0 19px;

        @include mobile {
            font-size: 18px;
            line-height: calc(20 / 18);
            letter-spacing: 0;
            margin: 0;
        }
    }

    &-content {
        max-width: 560px;

        @include mobile {
            max-width: none;
        }
    }

    &-desc {
        font-size: 14px;
        letter-spacing: 0;
        line-height: calc(20 / 14);
        margin: 0 0 20px;
    }

    &-link {
        color: $c-purple;
        font-size: 14px;
        font-weight: $fw-medium;
        display: inline-flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        letter-spacing: 0;
        line-height: calc(20 / 14);
        text-decoration: none;
        transition: color $d-hover;

        @include hover {
            &:hover {
                color: $c-blue;
            }
        }
    }

    &-linkIcon {
        fill: currentColor;
        flex-shrink: 0;
        margin: 2px 5px 0 0;
        height: 12px;
        width: 15px;
    }

    &-contentFooter {
        color: $c-gray--text;
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: space-between;
        font-size: 14px;
        font-weight: normal;
        letter-spacing: 0;
        line-height: calc(20 / 14);
    }

    &-notes {
        text-align: right;
        margin-left: auto;
        position: absolute;
        top: 9px;
        right: 0;

        @include mobile {
            font-size: 10px;
            line-height: calc(12 / 10);
            margin-bottom: 2px;
            position: static;
        }
    }

    &-version {
        margin-right: 54px;

        @include mobile {
            margin-right: 29px;
        }
    }
}
</style>
