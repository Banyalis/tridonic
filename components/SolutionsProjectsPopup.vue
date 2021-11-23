<template>
    <div class="SolutionsProjectsPopup">
        <div class="SolutionsProjectsPopup-header">
            <img :src="popup.cover" alt="" />
        </div>

        <section class="SolutionsProjectsPopup-content">
            <div class="SolutionsProjectsPopup-contentWrapper">
                <h1
                    class="SolutionsProjectsPopup-contentTitle"
                    v-text="popup.title"
                ></h1>

                <div class="SolutionsProjectsPopup-contentSection">
                    <div class="SolutionsProjectsPopup-contentSectionText">
                        <div
                            v-if="popup.info"
                            class="SolutionsProjectsPopup-contentInfo"
                        >
                            <div
                                v-if="popup.info.location"
                                class="SolutionsProjectsPopup-contentInfoItem"
                            >
                                <div
                                    class="SolutionsProjectsPopup-contentInfoItemTitle"
                                    v-text="`${$translations.textLocation()}:`"
                                ></div>
                                <div
                                    class="SolutionsProjectsPopup-contentInfoItemValue"
                                    v-text="
                                        `${popup.info.location.city} / ${popup.info.location.country}`
                                    "
                                ></div>
                            </div>
                            <div
                                v-for="(prop, index) in popup.info.props"
                                :key="index"
                                class="SolutionsProjectsPopup-contentInfoItem"
                            >
                                <div
                                    class="SolutionsProjectsPopup-contentInfoItemTitle"
                                    v-text="prop.title + ':'"
                                ></div>
                                <div
                                    class="SolutionsProjectsPopup-contentInfoItemValue"
                                    v-text="prop.value"
                                ></div>
                            </div>
                        </div>
                        <div
                            v-for="(block, idx) in popup.blocks"
                            :key="`block-${idx}`"
                            class="SolutionsProjectsPopup-contentBlock"
                            :class="[
                                `SolutionsProjectsPopup-contentBlock--${block.type}`
                            ]"
                        >
                            <h2
                                v-if="block.title"
                                class="SolutionsProjectsPopup-contentBlockTitle"
                                v-text="block.title"
                            ></h2>

                            <!-- eslint-disable -->
                            <TextContent
                                v-if="block.type === 'text'"
                                v-html="block.content"
                            />
                            <!-- eslint-enable -->

                            <!-- eslint-disable -->
                            <CommonColumnText
                                v-else-if="block.type === 'column-text'"
                                :columns="block.content.columns"
                                :text="block.content.text"
                            />
                            <!-- eslint-enable -->

                            <RoundedButton
                                v-else-if="block.type === 'button'"
                                :link="block.content.link"
                                :type="block.content.type"
                            />

                            <ReleaseNotes
                                v-else-if="block.type === 'release-notes'"
                                :releases="block.content.releases"
                            />

                            <CommonImageTextList
                                v-else-if="block.type === 'image-text-list'"
                                :image-text-list="block.content.imageTextList"
                            />

                            <div
                                v-else-if="block.type === 'related-products'"
                                class="SolutionsProjectsPopup-contentBlockList"
                            >
                                <div
                                    v-for="(product, key) in block.content
                                        .familyList"
                                    :key="`block-${idx}-item-${key}`"
                                    class="SolutionsProjectsPopup-contentBlockListItem"
                                >
                                    <ProductItem
                                        :product="product"
                                        :is-gray="true"
                                        :is-comparable="false"
                                    />
                                </div>
                            </div>

                            <CommonDownloads
                                v-else-if="block.type === 'downloads'"
                                :downloads="block.content.files"
                                :hide-sort="true"
                            />

                            <CommonTabs
                                v-else-if="block.type === 'tabs'"
                                :tabs="block.content"
                            />

                            <CommonImageTextList
                                v-else-if="block.type === 'image-text-list'"
                                :image-text-list="block.content.imageTextList"
                            />

                            <CommonRelatedProjects
                                v-else-if="block.type === 'related-projects'"
                                :projects="block.content"
                            />

                            <CommonUpcomingEvents
                                v-else-if="block.type === 'upcoming-events'"
                                :events="block.content"
                            />

                            <CommonLinkList
                                v-else-if="block.type === 'link-list'"
                                :list="block.content"
                            />

                            <CommonContacts
                                v-else-if="block.type === 'contacts'"
                                :contacts="block.content"
                            />
                        </div>
                    </div>
                    <div class="SolutionsProjectsPopup-contentSectionMedia">
                        <div
                            v-for="(block, idx) in popup.media"
                            :key="`media-block-${idx}`"
                            class="SolutionsProjectsPopup-contentBlock"
                            :class="[
                                `SolutionsProjectsPopup-contentBlock--${block.type}`
                            ]"
                        >
                            <CommonGallery
                                v-if="block.type === 'gallery'"
                                :gallery="block.content"
                            />

                            <CommonVideo
                                v-else-if="block.type === 'video'"
                                :poster="block.content.poster"
                                :video="block.content.video"
                                :desc="block.content.desc"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div
            class="SolutionsProjectsPopup-footerSection SolutionsProjectsPopup-footerSection--products"
        >
            <div class="SolutionsProjectsPopup-footerSectionWrapper">
                <SolutionsProjectsRelatedProducts
                    :products="popup.relatedProducts"
                />
            </div>
        </div>
        <div
            class="SolutionsProjectsPopup-footerSection SolutionsProjectsPopup-footerSection--projects"
        >
            <div class="SolutionsProjectsPopup-footerSectionWrapper">
                <SolutionsProjectsMoreProjects :projects="popup.moreProjects" />
            </div>
        </div>
    </div>
</template>

<script>
import TextContent from '@/components/TextContent';
import RoundedButton from '@/components/RoundedButton';
import CommonVideo from '@/components/CommonVideo';
import ReleaseNotes from '@/components/ReleaseNotes';
import CommonImageTextList from '@/components/CommonImageTextList';
import CommonDownloads from '@/components/CommonDownloads';
import ProductItem from '@/components/ProductItem';
import CommonTabs from '@/components/CommonTabs';
import CommonColumnText from '@/components/CommonColumnText';
import CommonGallery from '@/components/CommonGallery';
import CommonRelatedProjects from '@/components/CommonRelatedProjects';
import CommonUpcomingEvents from '@/components/CommonUpcomingEvents';
import CommonLinkList from '@/components/CommonLinkList';
import CommonContacts from '@/components/CommonContacts';
import SolutionsProjectsRelatedProducts from '@/components/SolutionsProjectsRelatedProducts';
import SolutionsProjectsMoreProjects from '@/components/SolutionsProjectsMoreProjects';

export default {
    name: 'SolutionsProjectsPopup',

    components: {
        SolutionsProjectsMoreProjects,
        SolutionsProjectsRelatedProducts,
        CommonContacts,
        CommonLinkList,
        CommonUpcomingEvents,
        CommonRelatedProjects,
        CommonGallery,
        CommonColumnText,
        CommonTabs,
        ProductItem,
        TextContent,
        RoundedButton,
        CommonVideo,
        ReleaseNotes,
        CommonImageTextList,
        CommonDownloads
    },

    props: {
        popup: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.SolutionsProjectsPopup {
    $component: &;

    $block--button: #{$component}-contentBlock--button;
    $block--tabs: #{$component}-contentBlock--tabs;
    $block--video: #{$component}-contentBlock--video;
    $block--related-products: #{$component}-contentBlock--related-products;
    $block--related-projects: #{$component}-contentBlock--related-projects;

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    &-header {
        @include m-aspectRatio(1400, 700);

        background: $c-purple;
        border-radius: 10px 10px 0 0;
        display: flex;
        width: 100%;
        margin-bottom: 46px;
        overflow: hidden;

        @include mobile {
            margin-bottom: 16px;
            min-height: 160px;
            border-radius: 0;
        }

        img {
            @include m-absoluteObjectFit();
        }
    }

    &-content {
        &Wrapper {
            margin: 0 auto;
            max-width: 1240px;
            padding: 0 40px;
            width: 100%;

            @include mobile {
                padding: 0 20px;
            }
        }

        &Section {
            width: 100%;
            display: flex;
            flex-direction: row;
            align-items: flex-start;
            justify-content: space-between;
            margin-top: 74px;

            @include mobile {
                flex-direction: column;
                justify-content: flex-start;
                margin-top: 34px;
            }

            &Text,
            &Media {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: (560 * 100% / 1160);

                @include mobile {
                    width: 100%;
                }
            }
        }

        &Info {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            margin-bottom: 7px;

            @include mobile {
                margin-bottom: 22px;
            }

            &Item {
                @include text-light-same-mobile;

                color: $c-black;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid $c-gray--shadow;

                &:first-child {
                    border-top: 1px solid $c-gray--shadow;
                }

                &Title {
                    display: flex;
                    width: (100 * 100% / 560);
                    min-width: 100px;
                    font-weight: $fw-medium;

                    @include mobile {
                        width: (100 * 100% / 280);
                    }
                }

                &Value {
                    display: flex;
                    width: (440 * 100% / 560);

                    @include mobile {
                        width: (160 * 100% / 280);
                    }
                }
            }
        }

        &Title {
            @include title;

            color: $c-black;
            margin: 0 auto 32px;

            @include mobile {
                font-size: 24px;
                font-weight: $fw-normal;
                letter-spacing: -0.2px;
                line-height: calc(30 / 24);
                margin-bottom: 29px;
            }
        }

        &Block {
            width: 100%;
            margin: 20px 0 22px;

            #{$component}-contentSectionMedia & {
                margin: 35px 0 0;

                &:first-child {
                    @include mobile {
                        margin-top: 13px;
                    }
                }
            }

            &:first-child {
                margin-top: 0;
            }

            &#{$block--video} {
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            &#{$block--button} {
                display: flex;
                flex-direction: row;
                align-items: flex-start;
            }

            &.isExtended,
            &#{$block--tabs} {
                width: (1060 * 100% / 840);
                max-width: calc(100vw - 120px);

                @include mobile {
                    width: 100vw;
                    max-width: initial;
                }

                & #{$component}-contentBlockTitle {
                    padding: 0 20px;
                }
            }

            &#{$block--related-projects} {
                @include mobile {
                    width: 100vw;
                }

                & #{$component}-contentBlockTitle {
                    @include mobile {
                        padding: 0 20px;
                    }
                }
            }

            &Title {
                @include title-h2;

                color: $c-black;
                margin: 0 0 12px;
            }

            &List {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                width: 100%;

                &Item {
                    width: 100%;

                    #{$block--related-products} & {
                        width: (100% / 3);

                        @include mobile {
                            width: 50%;
                        }
                    }
                }
            }
        }
    }

    &-footerSection {
        width: 100%;
        display: flex;
        flex-direction: column;
        box-shadow: inset 0 1px 0 0 $c-gray--shadow;

        &--products {
            background: $c-gray--bg;
            margin-top: 135px;

            @include mobile {
                margin-top: 38px;
            }
        }

        &Wrapper {
            width: 100%;
            margin: 0 auto;
            max-width: 1240px;
            padding: 28px 40px 80px;

            @include mobile {
                padding: 36px 0 26px;
            }
        }
    }
}
</style>
