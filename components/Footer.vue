<template>
    <footer class="Footer">
        <div class="Footer-wrapper">
            <div v-if="footer" class="Footer-container b-container">
                <div class="Footer-columns">
                    <FooterColumn
                        v-for="(column, key) of footer.columns"
                        :key="key"
                        :column="column"
                    ></FooterColumn>
                </div>
                <div v-if="footer.bottom" class="Footer-bottom">
                    <div class="Footer-copyrights">
                        © {{ footer.bottom.copyright }} Tridonic All rights
                        reserved
                    </div>
                    <div class="Footer-bottomLinks">
                        <nuxt-link
                            v-for="(link, key) of footer.bottom.links"
                            :key="key"
                            :to="link.url"
                        >
                            {{ link.title }}
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import { mapState } from 'vuex';
import FooterColumn from '@/components/FooterColumn';

export default {
    name: 'Footer',
    components: { FooterColumn },
    computed: {
        ...mapState('footer', ['footer'])
    }
};
</script>

<style lang="scss">
.Footer {
    width: 100%;
    background: $c-black;

    &-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        max-width: $bp-desktop;
        padding: 0 !important;

        @include mobile {
            padding-top: 40px;
        }
    }

    &-bottom {
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        border-top: 1px solid $c-footerBorder;
        padding: 20px 40px 20px 20px;

        @include desktop {
            border-left: 1px solid $c-footerBorder;
            border-right: 1px solid $c-footerBorder;
        }

        @include mobile {
            padding: 20px 20px 35px;
            justify-content: flex-start;
            flex-direction: column-reverse;
            align-items: center;
        }

        &Links {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;

            a {
                @include text-thin;

                display: flex;
                color: $c-white;
                margin-left: 51px;
                transition: $d-hover color;

                @include hover {
                    &:hover {
                        color: $c-blue;
                    }
                }

                &:first-child {
                    margin-left: 0;
                }
                @include mobile {
                    font-weight: $fw-medium;
                }

                &:last-child {
                    @include mobile {
                        display: none;
                    }
                }
            }
        }
    }

    &-copyrights {
        @include text-light-same-mobile;

        letter-spacing: 0.6px;
        color: $c-lightBlueFooter;

        @include mobile {
            margin-top: 20px;
        }
    }

    &-columns {
        width: 100%;
        display: flex;
        align-items: stretch;
        justify-content: flex-start;

        @include mobile {
            flex-direction: column;
        }

        @media (min-width: 1440px) {
            border-left: 1px solid $c-footerBorder;
            border-right: 1px solid $c-footerBorder;
        }
    }
}
</style>
