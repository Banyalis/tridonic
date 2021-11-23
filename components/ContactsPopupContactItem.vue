<template>
    <div class="ContactsPopupContactItem">
        <div class="ContactsPopupContactItem-info">
            <div class="ContactsPopupContactItem-infoImage">
                <img :src="contact.image" :alt="contact.name" />
            </div>
            <div class="ContactsPopupContactItem-infoDescr">
                <div
                    class="ContactsPopupContactItem-infoName"
                    v-text="contact.name"
                ></div>
                <div
                    class="ContactsPopupContactItem-infoPosition"
                    v-text="contact.position"
                ></div>
                <div class="ContactsPopupContactItem-infoPhone">
                    <div
                        class="ContactsPopupContactItem-infoPhoneText"
                        v-text="$translations.phone()"
                    ></div>
                    <a
                        :href="`tel:${contact.phone.url}`"
                        class="ContactsPopupContactItem-infoPhoneLink"
                        v-text="contact.phone.title"
                    ></a>
                </div>
            </div>
        </div>
        <div class="ContactsPopupContactItem-email">
            <RoundedButton
                type="isWhite"
                :link="{
                    url: `mailto:${contact.email}`,
                    title: $translations.textEmail(),
                    isExternal: true
                }"
            />
        </div>
    </div>
</template>

<script>
import RoundedButton from '@/components/RoundedButton';
export default {
    name: 'ContactsPopupContactItem',
    components: { RoundedButton },
    props: {
        contact: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.ContactsPopupContactItem {
    $component: &;

    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include mobile {
        flex-direction: column;
        align-items: flex-start;
    }

    &-info {
        width: 50%;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;

        @include mobile {
            width: 100%;
            flex-direction: row-reverse;
            justify-content: space-between;
        }

        &Image {
            @include m-aspectRatio(80, 80);

            border-radius: 100%;
            overflow: hidden;
            width: (80 * 100% / 380);

            @include mobile {
                width: (60 * 100% / 280);
            }

            img {
                @include m-absoluteObjectFit();
            }
        }

        &Descr {
            margin-left: (40 * 100% / 380);
            display: flex;
            flex-direction: column;
            margin-top: 1px;
            color: $c-white;

            @include mobile {
                width: (200 * 100% / 280);
                margin-top: 0;
                margin-left: 0;
            }
        }

        &Name {
            @include text;

            line-height: (20 / 24);

            @include mobile {
                line-height: (20 / 18);
            }
        }

        &Position {
            @include text-light-same-mobile;

            margin-top: 4px;
        }

        &Phone {
            @include text-light-same-mobile;

            display: flex;

            &Text {
                margin-right: 5px;
            }

            &Link {
                color: $c-white;
                transition: $d-hover color;

                @include mobile {
                    color: $c-blue;
                }

                @include hover {
                    &:hover {
                        color: $c-blue;
                    }
                }
            }
        }
    }

    &-email {
        width: 160px;

        @include mobile {
            margin-top: 15px;
        }
    }
}
</style>
