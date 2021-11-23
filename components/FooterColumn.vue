<template>
    <div class="FooterColumn">
        <div class="FooterColumn-wrapper">
            <div class="FooterColumn-title" @click="toggleFooterItem">
                {{ column.title }}

                <div class="FooterColumn-titleIcon">
                    <div class="FooterColumn-titleIconItem"></div>
                    <div class="FooterColumn-titleIconItem"></div>
                </div>
            </div>
            <div class="FooterColumn-body">
                <div v-if="column.description" class="FooterColumn-description">
                    {{ column.description }}
                </div>
                <div v-if="column.phones" class="FooterColumn-phones">
                    <a
                        v-for="(phone, phoneKey) of column.phones"
                        :key="phoneKey"
                        :href="phone.url"
                        class="FooterColumn-phone"
                    >
                        <span>{{ phone.type }}&nbsp;</span>
                        {{ phone.title }}
                    </a>
                </div>
                <div class="FooterColumn-links">
                    <div
                        v-for="(link, keyLink) of column.links"
                        :key="keyLink"
                        class="FooterColumn-link"
                    >
                        <nuxt-link :to="link.url">
                            {{ link.title }}
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FooterColumn',
    props: {
        column: {
            type: Object,
            default: () => {
                return {
                    title: '',
                    links: [
                        {
                            url: '',
                            title: ''
                        }
                    ]
                };
            },
            required: true
        }
    },
    methods: {
        toggleFooterItem: (event) => {
            event.target.classList.toggle('is-open');
        }
    }
};
</script>

<style lang="scss" scoped>
.FooterColumn {
    width: (100% / 6);
    display: flex;
    border-left: 1px solid $c-footerBorder;
    padding: 30px 20px 35px;

    @include tablet {
        padding: 40px 20px 16px;
    }

    @include mobile {
        width: 100%;
        padding: 20px 20px 20px;
        border-left: none;
        border-top: 1px solid #303030;
    }

    &:first-child {
        border-left: none;
    }

    &-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    &-title {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        font-size: 24px;
        line-height: (20 / 24);
        font-weight: normal;
        margin-bottom: 24px;
        color: $c-darkBlueFooter;

        @include mobile {
            font-size: 18px;
            line-height: (20 / 18);
            margin-bottom: 0;
            position: relative;
        }

        &Icon {
            display: none;
            width: 20px;
            height: 20px;
            position: relative;

            @include mobile {
                display: flex;
            }

            &Item {
                width: 10px;
                height: 2px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%, -50%, 0);
                background: #fafafa;

                &:last-child {
                    transform: translate3d(-50%, -50%, 0) rotate(90deg);

                    .is-open & {
                        opacity: 0;
                    }
                }
            }
        }
    }

    &-body {
        display: flex;
        width: 100%;
        flex-direction: column;

        @include mobile {
            display: none;
            margin: 25px 0 15px;

            .is-open + & {
                display: flex;
            }
        }
    }

    &-links {
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    &-link {
        @include text-light-same-mobile;

        width: 100%;
        display: flex;
        font-size: 14px;
        line-height: (20 / 14);
        font-weight: normal;
        letter-spacing: 0.4px;
        margin-top: 20px;

        &:first-child {
            margin-top: 0;
        }

        a {
            color: $c-white;
            transition: $d-hover color;

            @include hover {
                &:hover {
                    color: $c-blue;
                }
            }
        }
    }

    &-description {
        @include text-light-same-mobile;

        width: 100%;
        display: flex;
        font-size: 14px;
        line-height: (20 / 14);
        font-weight: normal;
        letter-spacing: 0.2px;
        margin-bottom: 20px;
        color: $c-lightBlueFooter;
    }

    &-address {
        @include text-light-same-mobile;

        width: 100%;
        display: flex;
        font-size: 14px;
        line-height: (20 / 14);
        font-weight: normal;
        letter-spacing: 0.2px;
        margin-bottom: 20px;
        color: $c-lightBlueFooter;
        white-space: pre-line;
    }

    &-phones {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    &-phone {
        @include text-light-same-mobile;

        width: 100%;
        display: flex;
        font-size: 14px;
        line-height: (20 / 14);
        font-weight: normal;
        letter-spacing: 0.4px;
        color: $c-white;
        transition: $d-hover color;

        @include hover {
            &:hover {
                color: $c-blue;
            }
        }

        span {
            color: $c-lightBlueFooter;
        }
    }
}
</style>
