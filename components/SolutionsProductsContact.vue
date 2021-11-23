<template>
    <div class="SolutionsProductsContact">
        <div class="SolutionsProductsContact-wrapper">
            <div
                class="SolutionsProductsContact-title"
                v-text="$translations.titleContactSolutions()"
            ></div>
            <div class="SolutionsProductsContact-contact">
                <CommonContactsItem :contact="contact" type="isSolution" />
            </div>
        </div>
    </div>
</template>

<script>
import CommonContactsItem from '@/components/CommonContactsItem';

export default {
    name: 'SolutionsProductsContact',
    components: { CommonContactsItem },
    props: {
        contact: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.SolutionsProductsContact {
    $component: &;

    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 48px 0 80px;
    background: $c-purple url('~assets/images/bg_purple.png') repeat;
    background-size: 48px 48px;
    border-radius: 0 0 10px 10px;
    overflow: hidden;

    @include mobile {
        padding: 23px 0 40px;
    }

    &-wrapper {
        width: 100%;
        max-width: 650px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        padding: 0 40px;

        @include mobile {
            padding: 0 20px;
        }
    }

    &-title {
        @include title-h2;

        color: $c-white;
    }

    &-contact {
        margin-top: 48px;
        display: flex;
        width: 100%;
        max-width: 550px;

        @include mobile {
            margin-top: 37px;
        }
    }
}
</style>
