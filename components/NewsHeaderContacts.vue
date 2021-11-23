<template>
    <div class="NewsHeaderContacts">
        <div
            v-for="(block, index) in blocks"
            :key="index"
            class="NewsHeaderContacts-block"
        >
            <div
                class="NewsHeaderContacts-blockTitle"
                v-text="block.title"
            ></div>
            <div
                class="NewsHeaderContacts-blockDescr"
                v-text="block.descr"
            ></div>
            <div class="NewsHeaderContacts-blockLink">
                <ArrowLink
                    :title="block.button.title"
                    :url="block.button.url"
                />
            </div>
        </div>
        <div class="NewsHeaderContacts-block">
            <div
                class="NewsHeaderContacts-blockTitle"
                v-text="$translations.pressContact()"
            ></div>
            <div class="NewsHeaderContacts-blockDescr">
                <div
                    class="NewsHeaderContacts-blockName"
                    v-text="contact.name"
                ></div>
                <div class="NewsHeaderContacts-blockPhones">
                    <div
                        v-for="(phone, index) in contact.phones"
                        :key="index"
                        class="NewsHeaderContacts-blockPhone"
                    >
                        <div
                            class="NewsHeaderContacts-blockPhoneType"
                            v-text="phone.type"
                        ></div>
                        <nuxt-link
                            :to="phone.value"
                            class="NewsHeaderContacts-blockPhoneLink"
                            v-text="phone.formattedValue"
                        ></nuxt-link>
                    </div>
                </div>
            </div>
            <div class="NewsHeaderContacts-blockLink">
                <ArrowLink
                    :title="$translations.textEmail()"
                    :url="`mailto: ${contact.email}`"
                />
            </div>
        </div>
    </div>
</template>

<script>
import ArrowLink from '@/components/ArrowLink';

export default {
    components: {
        ArrowLink
    },

    props: {
        contact: {
            type: Object,
            required: true
        },
        linkPressKit: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            blocks: [
                {
                    title: this.$translations.signUpForNewsletter(),
                    descr: this.$translations.descrNewsletter(),
                    button: {
                        title: this.$translations.textSubscribe(),
                        url: '/'
                    }
                },
                {
                    title: this.$translations.downloadPressKit(),
                    descr: this.$translations.descrDownloadPressKit(),
                    button: {
                        title: this.$translations.textDownload(),
                        url: this.linkPressKit
                    }
                }
            ]
        };
    }
};
</script>

<style lang="scss">
.NewsHeaderContacts {
    $component: &;

    margin-top: 40px;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    position: relative;

    &-block {
        width: (360 * 100% / 1160);
        display: flex;
        flex-direction: column;

        &:before {
            content: '';
            width: 40px;
            height: 2px;
            background: $c-white;
        }

        &Title {
            @include text;

            margin-top: 14px;
        }

        &Descr {
            @include text-light-same-mobile;

            margin-top: 19px;
            display: flex;
            width: 100%;
            flex-direction: column;
        }

        &Link {
            margin-top: 15px;
        }

        &Phones {
            width: 100%;
            display: flex;
            flex-direction: column;
        }

        &Phone {
            width: 100%;
            display: flex;

            &Link {
                color: $c-white;
                margin-left: 5px;
                transition: $d-hover color;

                @include hover {
                    &:hover {
                        color: $c-blue;
                    }
                }
            }
        }
    }
}
</style>
