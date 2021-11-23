<template>
    <section class="ReleaseNotes">
        <div
            v-for="(release, idx) in releases"
            :key="`release-${idx}`"
            class="ReleaseNotes-content"
        >
            <div class="ReleaseNotes-contentReleaseInfo">
                <div class="ReleaseNotes-contentReleaseVer">
                    {{ release.ver }}
                </div>
                <div class="ReleaseNotes-contentReleaseDate">
                    {{ release.date }}
                </div>
            </div>
            <div class="ReleaseNotes-contentDescription">
                <!-- eslint-disable-next-line -->
                <TextContent v-html="release.text" />
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ReleaseNotes',
    props: {
        releases: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.ReleaseNotes {
    &-content {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        margin: 0 0 20px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    &-contentReleaseInfo {
        margin-right: 40px;
        min-width: 80px;

        @include mobile {
            margin-right: 10px;
            min-width: 45px;
        }
    }

    &-contentReleaseDate {
        color: $c-black;
        font-size: 14px;
        font-weight: $fw-normal;
        letter-spacing: 0;
        line-height: calc(20 / 14);

        @include mobile {
            color: $c-gray--text;
            font-size: 10px;
            line-height: calc(12 / 10);
        }
    }

    &-contentReleaseVer {
        @include title-h2;
        color: $c-black;
        line-height: 1;

        @include mobile {
            font-size: 24px;
            letter-spacing: -0.2px;
            line-height: calc(30 / 24);
        }
    }

    &-contentDescription {
        margin: 4px 0 0;
    }
}
</style>
