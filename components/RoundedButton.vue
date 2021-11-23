<template>
    <button
        v-if="!link"
        class="RoundedButton"
        :class="[type ? type : '']"
        @click="clickButton($event)"
        v-text="text"
    ></button>
    <a
        v-else-if="link.isExternal"
        :href="link.url"
        target="_blank"
        rel="nofollow"
        class="RoundedButton"
        :download="link.isDownload"
        :class="[type ? type : '']"
        v-text="link.title"
    ></a>
    <nuxt-link
        v-else
        :to="link.url"
        class="RoundedButton"
        :download="link.isDownload"
        :class="[type ? type : '']"
        v-text="link.title"
    ></nuxt-link>
</template>

<script>
export default {
    name: 'RoundedButton',
    props: {
        text: {
            type: String,
            required: false,
            default: ''
        },
        link: {
            type: Object,
            required: false,
            default: null
        },
        type: {
            type: String,
            required: false,
            default: 'isTransparent'
        },
        isSubmit: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        clickButton(event) {
            if (!this.isSubmit) event.preventDefault();

            this.$emit('click', event);
        }
    }
};
</script>

<style lang="scss" scoped>
.RoundedButton {
    @include text-light;

    font-weight: $fw-medium;
    width: 200px;
    max-width: 100%;
    padding: 10px 0;
    color: $c-white;
    border: $border-default $c-white;
    border-radius: 30px;
    background: none;
    outline: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    transition: $d-hover color, $d-hover background, $d-hover border-color;

    @include mobile {
        @include text-light-same-mobile;

        font-weight: $fw-medium;
    }

    @include hover {
        &:hover {
            color: $c-purple;
            background-color: $c-white;
        }
    }

    &.isPurple {
        border: $border-default $c-purple;
        background: $c-purple;

        @include hover {
            &:hover {
                color: $c-white;
                background-color: $c-blue;
                border-color: $c-blue;
            }
        }
    }

    &.isBlack {
        border: $border-default $c-black;
        color: $c-black;

        @include hover {
            &:hover {
                color: $c-white;
                background-color: $c-purple;
                border-color: $c-purple;
            }
        }
    }

    &.isWhite {
        border: $border-default $c-white;
        color: $c-white;

        @include hover {
            &:hover {
                color: $c-black;
                background-color: $c-white;
                border-color: $c-white;
            }
        }
    }

    &.isWhiteFilled {
        border: $border-default $c-white;
        background: $c-white;
        color: $c-black;

        @include hover {
            &:hover {
                background-color: transparent;
                color: $c-white;
            }
        }
    }
}
</style>
