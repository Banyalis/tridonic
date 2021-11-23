<template>
    <div class="CommonDetailPopup">
        <div v-if="popup.header" class="CommonDetailPopup-header">
            <img
                v-if="popup.header.hasBackgroundImage"
                :src="popup.header.image"
                alt=""
            />
        </div>

        <section class="CommonDetailPopup-content">
            <TextContentWrapper>
                <h1 v-if="popup.title" class="CommonDetailPopup-contentTitle">
                    {{ popup.title }}
                </h1>

                <div
                    v-if="popup.category || popup.date"
                    class="CommonDetailPopup-category"
                >
                    <div
                        v-if="popup.category"
                        class="CommonDetailPopup-categoryTitle"
                        v-text="popup.category"
                    ></div>
                    <div
                        v-if="popup.date"
                        class="CommonDetailPopup-categoryDate"
                        v-text="popup.date"
                    ></div>
                </div>

                <div class="CommonDetailPopup-contentSection">
                    <template v-for="(block, idx) in popup.blocks">
                        <div
                            :key="`block-${idx}`"
                            class="CommonDetailPopup-contentBlock"
                            :class="[
                                `CommonDetailPopup-contentBlock--${block.type}`,
                                block.isExtended ? 'isExtended' : ''
                            ]"
                        >
                            <h2
                                v-if="block.title"
                                class="CommonDetailPopup-contentBlockTitle"
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

                            <CommonVideo
                                v-else-if="block.type === 'video'"
                                :poster="block.content.poster"
                                :video="block.content.video"
                                :desc="block.content.desc"
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
                                class="CommonDetailPopup-contentBlockList"
                            >
                                <div
                                    v-for="(product, key) in block.content
                                        .familyList"
                                    :key="`block-${idx}-item-${key}`"
                                    class="CommonDetailPopup-contentBlockListItem"
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

                            <CommonGallery
                                v-else-if="block.type === 'gallery'"
                                :gallery="block.content"
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

                            <CommonPartners
                                v-else-if="block.type === 'partners'"
                                :partners="block.content"
                                modifier="popup"
                            />
                        </div>
                    </template>
                </div>
            </TextContentWrapper>
        </section>
    </div>
</template>

<script>
import TextContentWrapper from '@/components/TextContentWrapper';
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
import CommonPartners from '@/components/CommonPartners';

export default {
    name: 'CommonDetailPopup',
    components: {
        CommonContacts,
        CommonLinkList,
        CommonUpcomingEvents,
        CommonRelatedProjects,
        CommonGallery,
        CommonColumnText,
        CommonTabs,
        ProductItem,
        TextContent,
        TextContentWrapper,
        RoundedButton,
        CommonVideo,
        ReleaseNotes,
        CommonImageTextList,
        CommonDownloads,
        CommonPartners
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
.CommonDetailPopup {
    $component: &;

    $block--button: #{$component}-contentBlock--button;
    $block--tabs: #{$component}-contentBlock--tabs;
    $block--video: #{$component}-contentBlock--video;
    $block--related-products: #{$component}-contentBlock--related-products;
    $block--related-projects: #{$component}-contentBlock--related-projects;

    padding: 0 0 132px;
    width: 100%;
    position: relative;

    @include mobile {
        padding-bottom: 80px;
    }

    &-header {
        @include m-aspectRatio(1400, 540);

        background: $c-purple;
        border-radius: 10px 10px 0 0;
        display: flex;
        overflow: hidden;

        @include mobile {
            min-height: 160px;
            border-radius: 0;
        }

        img {
            @include m-absoluteObjectFit();
        }
    }

    &-category {
        @include text-light-same-mobile;

        position: absolute;
        left: -80px;
        top: 20px;
        transform: translate3d(-100%, 0, 0);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        color: $c-gray;
        width: 80px;

        &Title {
            display: flex;
            width: 100%;
            padding-bottom: 15px;
        }

        &Date {
            display: flex;
            width: 100%;

            #{$component}-categoryTitle + & {
                padding-top: 15px;
                border-top: 1px solid #dbdae0;
            }
        }
    }

    &-content {
        margin-top: 46px;

        @include mobile {
            margin-top: 16px;
        }

        &Section {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        &Title {
            color: $c-black;
            font-size: 64px;
            font-weight: $fw-light;
            letter-spacing: -2px;
            line-height: calc(60 / 64);
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

            &:first-child {
                margin-top: 0;
            }

            &:last-child {
                margin-bottom: 0;
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
}
</style>
