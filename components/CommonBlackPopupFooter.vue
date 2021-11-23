<template>
    <div class="CommonBlackPopupFooter">
        <CommonBlackPopupCalculatorResults :results="results" />
    </div>
</template>

<script>
import CommonBlackPopupCalculatorResults from '@/components/CommonBlackPopupCalculatorResults';

export default {
    name: 'CommonBlackPopupFooter',

    components: {
        CommonBlackPopupCalculatorResults
    },

    props: {
        results: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonBlackPopupFooter {
    $component: &;

    width: calc(100% + 80px);
    margin: 80px -40px 0;

    @include tablet {
        width: 100%;
        margin: 80px 0 0;
    }

    @include mobile {
        width: 100%;
        margin: 60px 0 0;
    }
}
</style>
