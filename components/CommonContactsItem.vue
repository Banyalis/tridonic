<template>
    <div
        class="CommonContactsItem"
        :class="[type ? `CommonContactsItem--${type}` : '']"
    >
        <div class="CommonContactsItem-wrapper">
            <div class="CommonContactsItem-image">
                <div class="CommonContactsItem-imageAvatar">
                    <img :src="contact.image" :alt="contact.name" />
                </div>
                <div
                    class="CommonContactsItem-imageName"
                    v-text="contact.name"
                ></div>
            </div>
            <div class="CommonContactsItem-info">
                <div
                    class="CommonContactsItem-infoName"
                    v-text="contact.name"
                ></div>
                <div class="CommonContactsItem-infoDescr">
                    <div class="CommonContactsItem-infoAddress">
                        <div
                            v-if="contact.position"
                            class="CommonContactsItem-infoAddressPosition"
                            v-text="contact.position"
                        ></div>
                        <div
                            class="CommonContactsItem-infoAddressLocation"
                            v-text="contact.address"
                        ></div>
                    </div>
                    <div class="CommonContactsItem-infoContacts">
                        <div
                            v-for="(phone, index) in contact.phones"
                            :key="`phone-${index}`"
                            class="CommonContactsItem-infoContactsItem CommonContactsItem-infoContactsItem--phone"
                        >
                            <div
                                class="CommonContactsItem-infoContactsItemType"
                                v-text="phone.type"
                            ></div>
                            <nuxt-link
                                :to="phone.value"
                                class="CommonContactsItem-infoContactsItemPhone"
                                v-text="phone.formattedValue"
                            ></nuxt-link>
                        </div>
                        <nuxt-link
                            v-for="(link, index) in contact.links"
                            :key="`link-${index}`"
                            :to="link.url"
                            class="CommonContactsItem-infoContactsItem CommonContactsItem-infoContactsItem--link"
                            v-text="link.title"
                        ></nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommonContactsItem',

    props: {
        contact: {
            type: Object,
            required: true
        },

        type: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss">
.CommonContactsItem {
    $component: &;
    $component--isSolution: #{$component}--isSolution;

    width: 100%;
    display: flex;
    flex-direction: column;
    background: $c-gray--bg;

    &#{$component--isSolution} {
        background: transparent;
    }

    &-wrapper {
        padding: 40px;
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;

        @include mobile {
            padding: 20px;
            flex-direction: column;
        }

        #{$component--isSolution} & {
            padding: 0 !important;
        }
    }

    &-image {
        width: (120 * 100% / 680);
        margin-right: (40 * 100% / 680);

        @include mobile {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;
            margin-right: 0;

            &:before {
                display: none;
            }
        }

        &Avatar {
            @include m-aspectRatio(120, 120);

            width: 100%;
            border-radius: 100%;
            overflow: hidden;

            @include mobile {
                width: 60px;
                margin-right: 20px;
            }

            img {
                @include m-absoluteObjectFit();
            }
        }

        &Name {
            @include text-small;

            display: none;
            line-height: (20 / 18);
            color: $c-black;
            width: calc(100% - 80px);

            #{$component--isSolution} & {
                color: $c-white;
            }

            @include mobile {
                display: flex;
            }
        }
    }

    &-info {
        display: flex;
        flex-direction: column;
        width: (520 * 100% / 680);

        @include mobile {
            width: 100%;
        }

        &Name {
            @include text;

            width: 100%;
            color: $c-black;

            #{$component--isSolution} & {
                color: $c-white;
            }

            @include mobile {
                display: none;
            }
        }

        &Descr {
            @include text-light-same-mobile;

            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: flex-start;
            margin-top: 15px;
            color: $c-black;

            #{$component--isSolution} & {
                color: $c-white;
            }

            @include mobile {
                margin-top: 20px;
                flex-direction: column;
            }
        }

        &Address {
            display: flex;
            flex-direction: column;
            width: 220px;

            @include mobile {
                width: 100%;
            }

            &Position {
                font-weight: $fw-medium;
            }

            &Location {
                white-space: pre-line;
            }
        }

        &Contacts {
            display: flex;
            flex-direction: column;
            margin-left: 20px;

            @include mobile {
                width: 100%;
                margin-left: 0;
                margin-top: 20px;
            }

            &Item {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: flex-start;

                &Type {
                    margin-right: 7px;
                }

                &Phone {
                    color: $c-black;
                    transition: $d-hover color;

                    #{$component--isSolution} & {
                        color: $c-white;
                    }

                    @include mobile {
                        font-weight: $fw-medium;
                        color: $c-purple;

                        #{$component--isSolution} & {
                            color: $c-blue;
                        }
                    }

                    @include hover {
                        &:hover {
                            color: $c-blue;
                        }
                    }
                }

                &--link {
                    font-weight: $fw-medium;
                    color: $c-purple;
                    transition: $d-hover color;

                    #{$component--isSolution} & {
                        color: $c-blue;

                        #{$component--isSolution} & {
                            color: $c-blue;
                        }
                    }

                    @include hover {
                        &:hover {
                            color: $c-blue;
                        }
                    }
                }
            }
        }
    }
}
</style>
