<template>
    <div class="Tag" :class="tagTypeClass">
        <span class="Tag-text" v-text="text"></span>
    </div>
</template>

<script>
export default {
    props: {
        /**
         * Type of the tag
         * @values isYellow, isGray, isRed
         */
        type: {
            type: String,
            default: 'isGray'
        },
        id: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            required: true
        }
    },
    computed: {
        tagTypeClass() {
            if (!this.id) {
                return this.type;
            }

            return this.id === 'new' ? 'isYellow' : this.type;
        }
    }
};
</script>

<style lang="scss" scoped>
.Tag {
    display: flex;
    padding: 0 10px;
    background: transparent;

    @include mobile {
        padding: 3px 6px;
    }

    &.isYellow {
        background: $c-tag--yellow;
        color: $c-black;
    }

    &.isRed {
        background: $c-tag--red;
        color: $c-white;
    }

    &.isGray {
        background: $c-tag--gray;
        color: $c-white;
    }

    &-text {
        @include text-tag;
    }
}
</style>
