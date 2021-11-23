<template>
    <div class="CommonVideo">
        <div class="CommonVideo-figure" @click="onVideoToggle">
            <img
                v-if="!isPlayed && poster"
                :src="poster.url"
                :alt="poster.alt"
            />

            <video
                v-if="isPlayed && !video.embed && video.sources.length"
                autoplay
                muted
                playsinline
            >
                <source
                    v-for="(source, id) in video.sources"
                    :key="`source-video-${id}`"
                    :src="source.url"
                    :type="source.type"
                />
            </video>

            <iframe
                v-if="isPlayed && video.embed"
                :src="video.embed.url"
                allow="accelerometer; autoplay; fullscreen; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                allowtransparency
            ></iframe>
            <div v-if="!isPlayed" class="CommonVideo-data">
                <button type="button" class="CommonVideo-playBtn">
                    <svg-icon name="icon-play" class="CommonVideo-playIcon" />
                </button>
                <div v-if="video.title" class="CommonVideo-dataInner">
                    <div class="CommonVideo-title" v-text="video.title"></div>
                    <div
                        class="CommonVideo-duration"
                        v-text="video.duration"
                    ></div>
                </div>
            </div>
        </div>
        <div v-if="desc" class="CommonVideo-desc">
            {{ desc }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'CommonVideo',
    props: {
        poster: {
            type: Object,
            required: false,
            default: null
        },
        video: {
            type: Object,
            required: true
        },
        desc: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            isPlayed: false
        };
    },

    methods: {
        onVideoToggle() {
            this.isPlayed = !this.isPlayed;
        }
    }
};
</script>

<style lang="scss">
.CommonVideo {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    &-figure {
        background: $c-purple;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        width: 100%;

        &::before {
            display: block;
            content: '';
            width: 100%;
            padding-top: (9 / 16) * 100%;
            background: $c-black;
        }

        img {
            transition: $d-hover transform;
            transform: translate3d(0, 0, 0);
        }

        img,
        iframe,
        video {
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            height: 100%;
            max-width: 100%;
            width: 100%;
            z-index: 1;
        }

        @include hover {
            &:hover {
                .CommonVideo-playIcon {
                    fill: $c-blue;
                }

                img {
                    transform: translate3d(0, 0, 0) scale(1.05);
                }
            }
        }
    }

    &-data {
        position: absolute;
        left: 40px;
        bottom: 40px;
        display: flex;
        z-index: 2;
        color: $c-white;

        &Inner {
            margin: -15px 0 0 40px;

            @include mobile {
                display: none;
            }
        }
    }

    &-playBtn {
        background: #fff;
        border: none;
        border-radius: 100%;
        display: flex;
        padding: 0;
        outline: 0;
        height: 60px;
        width: 60px;
        z-index: 2;
        cursor: pointer;

        @include mobile {
            left: 20px;
            bottom: 20px;
            height: 40px;
            width: 40px;
        }

        @include hover {
            &:hover {
                .CommonVideo-playIcon {
                    fill: $c-blue;
                }
            }
        }

        &:focus {
            .CommonVideo-playIcon {
                fill: $c-blue;
            }
        }
    }

    &-playIcon {
        fill: $c-black;
        display: block;
        margin: auto;
        height: 100%;
        width: 100%;
        transition: fill $d-hover;
    }

    &-title {
        @include title-h2;
    }

    &-duration {
        @include text-light-same-mobile;
    }

    &-desc {
        @include text-light;

        width: 100%;
        color: $c-gray;
        margin: 5px 0 0;

        @include mobile {
            margin-top: 10px;
        }
    }
}
</style>
