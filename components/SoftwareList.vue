<template>
    <div class="SoftwareListWrapper">
        <ul class="SoftwareList">
            <li v-for="item in list" :key="item.id" class="SoftwareList-item">
                <nuxt-link :to="item.link.url" class="SoftwareListItem">
                    <div class="SoftwareListItem-figure">
                        <div class="SoftwareListItem-figureSoftware">
                            <div
                                class="SoftwareListItem-figureInner SoftwareListItem-figureInner--desktop"
                            >
                                <img :src="item.images.desktop.image" alt="" />
                            </div>
                        </div>
                        <div class="SoftwareListItem-figureApp">
                            <div
                                class="SoftwareListItem-figureInner SoftwareListItem-figureInner--mobile"
                            >
                                <img :src="item.images.mobile.image" alt="" />
                            </div>
                        </div>
                    </div>
                    <div class="SoftwareListItem-content">
                        <h3 class="SoftwareListItem-title">{{ item.title }}</h3>
                        <div class="SoftwareListItem-platform">
                            {{ item.platform }}
                        </div>
                        <div class="SoftwareListItem-description">
                            <p class="SoftwareListItem-descriptionText">
                                {{ item.text }}
                            </p>
                            <span class="SoftwareListItem-link">
                                <span class="b-visuallyhidden">
                                    {{ item.link.title }}
                                </span>
                                <svg-icon
                                    name="arrow-big-right"
                                    class="SoftwareListItem-linkIcon"
                                    width="50"
                                    height="34"
                                />
                            </span>
                        </div>
                    </div>
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
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
.SoftwareListWrapper {
    padding: 0 20px;
    margin: 72px auto 172px;
    max-width: 1280px;

    @include mobile {
        margin-bottom: 98px;
    }
}

.SoftwareList {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    list-style: none;
    margin: 0;
    padding: 0;

    @media (max-width: 767px) {
        display: block;
    }

    &-item {
        color: $c-black;
        width: calc(50% - 20px);

        @media (max-width: 767px) {
            margin: 0 auto 40px;
            width: 100%;
        }
    }
}

.SoftwareListItem {
    color: $c-black;

    @include hover {
        &:hover {
            .SoftwareListItem-title {
                color: $c-blue;
            }

            .SoftwareListItem-linkIcon {
                fill: $c-blue;
            }

            .SoftwareListItem-figure {
                transform: scale(1.05);
            }
        }
    }

    &-figure {
        // box-shadow: 0 10px 40px 0 rgba(0, 0, 0, 0.25);
        filter: drop-shadow(0 0 20px rgba(0, 0, 0, 0.25));
        border-radius: 15px;
        position: relative;
        margin: 0 auto 28px;
        min-height: 300px;
        transition: transform $d-hover;

        img {
            display: block;
            pointer-events: none;
            max-width: 100%;
        }

        @media (max-width: 767px) {
            margin-bottom: 14px;
            min-height: 215px;
        }

        @include mobile {
            min-height: 150px;
        }
    }

    &-figureSoftware {
        position: relative;

        @media (max-width: 767px) {
            max-width: 88%;
        }
    }

    &-figureApp {
        overflow: hidden;
        position: relative;
        max-height: 320px;
        max-width: 160px;
        position: absolute;
        bottom: -40px;
        right: 40px;
        width: 26.667%;

        @media (max-width: 767px) {
            bottom: 0;
            right: 0;
            max-width: 20%;
        }
    }

    &-content {
        margin-left: 40px;
        max-width: 530px;

        @include mobile {
            margin-left: 0;
        }
    }

    &-title {
        @include title-small;
        margin: 0;
        transition: color $d-hover;

        @include mobile {
            font-size: 24px;
            line-height: (30 / 24);
            letter-spacing: -0.2px;
        }
    }

    &-platform {
        color: $c-gray;
        font-size: 14px;
        line-height: (20 / 14);

        @include mobile {
            font-size: 10px;
            line-height: (12 / 10);
        }
    }

    &-description {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: flex-start;
        margin: 11px 0 0;

        @include mobile {
            flex-direction: column;
            margin-top: 3px;
        }
    }

    &-descriptionText {
        font-size: 24px;
        line-height: (30 / 24);
        letter-spacing: -0.2px;
        margin: 0;
        max-width: 440px;

        @include mobile {
            font-size: 14px;
            line-height: (20 / 14);
            letter-spacing: 0;
            margin: 3px 0 0;
        }
    }

    &-link {
        flex-grow: 0;
        flex-shrink: 0;
        text-decoration: none;
        margin: 7px 0 0 auto;

        @include mobile {
            margin-left: 0;
        }
    }

    &-linkIcon {
        display: block;
        height: 34px;
        width: 50px;
        transition: fill $d-hover;

        @include mobile {
            height: 16px;
            width: 23px;
        }
    }
}
</style>
