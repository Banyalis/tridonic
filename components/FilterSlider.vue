<template>
    <div class="FilterSlider">
        <div class="FilterSlider-title" v-text="title"></div>
        <div v-if="tooltipText" class="FilterSlider-tooltip">
            <TooltipIcon :text="tooltipText"></TooltipIcon>
        </div>
        <div ref="slider" class="FilterSlider-slider">
            <div class="FilterSlider-line"></div>
            <div
                class="FilterSlider-lineBetween"
                :style="{
                    left: leftCirclePosition,
                    right: rightCirclePosition
                }"
            ></div>
            <div
                ref="rightCircle"
                class="FilterSlider-circle FilterSlider-circle_right"
                :class="{ isActive: isRightCircleMouseDown }"
                :style="{
                    right: rightCirclePosition,
                    zIndex: rightCircleZIndex
                }"
                @mousedown="onRightCircleMouseDown"
                @touchstart="onRightCircleMouseDown"
            ></div>
            <div
                ref="leftCircle"
                class="FilterSlider-circle FilterSlider-circle_left"
                :class="{ isActive: isLeftCircleMouseDown }"
                :style="{ left: leftCirclePosition, zIndex: leftCircleZIndex }"
                @mousedown="onLeftCircleMouseDown"
                @touchstart="onLeftCircleMouseDown"
            ></div>
        </div>
        <div class="FilterSlider-inputs">
            <input
                :ref="minInputRef"
                v-model="minValueModelComputed"
                type="text"
                class="b-input FilterSlider-input FilterSlider-input_min"
                @blur="updateModelOnInputBlur(minInputRef)"
                @keypress.enter="blurInput"
                @focus="setPreviousInputValue(minInputRef)"
            />
            <input
                :ref="maxInputRef"
                v-model="maxValueModelComputed"
                type="text"
                class="b-input FilterSlider-input FilterSlider-input_max"
                @blur="updateModelOnInputBlur(maxInputRef)"
                @keypress.enter="blurInput"
                @focus="setPreviousInputValue(maxInputRef)"
            />
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { REGEXPS, VUE_CUSTOM_EVENTS } from '@/utils/constants';
import { getFilterValueFromQueryById } from '@/utils/utils';
import TooltipIcon from '@/components/TooltipIcon';

export default {
    name: 'FilterSlider',
    components: { TooltipIcon },
    model: {
        prop: 'isChanged',
        event: VUE_CUSTOM_EVENTS.isFilterChanged
    },
    props: {
        title: {
            type: String,
            required: true
        },
        minValue: {
            type: Number,
            required: true
        },
        maxValue: {
            type: Number,
            required: true
        },
        initialMinValue: {
            type: Number,
            required: true
        },
        initialMaxValue: {
            type: Number,
            required: true
        },
        categoryKey: {
            type: Number,
            required: true
        },
        sectionKey: {
            type: Number,
            required: true
        },
        filterId: {
            type: String,
            required: true
        },
        tooltipText: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            minValueModel: 0,
            maxValueModel: 0,
            isMounted: false,
            leftCirclePosition: '0px',
            rightCirclePosition: '0px',
            isLeftCircleMouseDown: false,
            isRightCircleMouseDown: false,
            leftCircleZIndex: 1,
            rightCircleZIndex: 1,
            valuesSplitter: ',',
            inputPreviousValue: 0,
            minInputRef: 'minInput',
            maxInputRef: 'maxInput'
        };
    },
    computed: {
        minValueModelComputed: {
            get() {
                return this.minValueModel;
            },
            set(value) {
                this.minValueModel = value; // to be sure it will be updated
                this.minValueModel = this.getValidatedValue(value, 'min');
                this.updateCirclePosition('min');
            }
        },
        maxValueModelComputed: {
            get() {
                return this.maxValueModel;
            },
            set(value) {
                this.maxValueModel = value;
                this.maxValueModel = this.getValidatedValue(value, 'max');
                this.updateCirclePosition('max');
            }
        }
    },
    mounted() {
        this.minValueModel = this.initialMinValue;
        this.maxValueModel = this.initialMaxValue;
        this.isMounted = true;
        this.updateCirclePosition('min');
        this.updateCirclePosition('max');
        window.addEventListener('mouseup', this.onMouseUp);
        window.addEventListener('touchend', this.onMouseUp);
        window.addEventListener('mousemove', this.onLeftCircleMouseMove);
        window.addEventListener('mousemove', this.onRightCircleMouseMove);
        window.addEventListener('touchmove', this.onLeftCircleMouseMove, {
            passive: false
        });
        window.addEventListener('touchmove', this.onRightCircleMouseMove, {
            passive: false
        });

        this.$root.$on(VUE_CUSTOM_EVENTS.clearFilters, this.clearFilter);
        this.setValueFromQuery();
    },
    beforeDestroy() {
        window.removeEventListener('mouseup', this.onMouseUp);
    },
    destroyed() {
        this.$root.$off(VUE_CUSTOM_EVENTS.clearFilters, this.clearFilter);
    },
    methods: {
        onMouseUp() {
            if (!this.isRightCircleMouseDown && !this.isLeftCircleMouseDown) {
                return;
            }
            this.isLeftCircleMouseDown = false;
            this.isRightCircleMouseDown = false;
            this.updateCirclesPositionAndModel();
        },
        blurInput() {
            this.$refs.minInput.blur();
            this.$refs.maxInput.blur();
        },
        setPreviousInputValue(inputRef) {
            this.inputPreviousValue = this.$refs[inputRef].value;
        },
        updateModelOnInputBlur(inputRef) {
            const value = this.$refs[inputRef].value;
            if (value === this.inputPreviousValue) {
                return;
            }

            this.updateModel();
        },
        setValueFromQuery() {
            const filterValue = getFilterValueFromQueryById(
                this.$router,
                this.filterId
            );

            if (filterValue === null) {
                return;
            }

            const filterValuesSplit = filterValue.split(this.valuesSplitter);
            this.minValueModel = +filterValuesSplit[0];
            this.maxValueModel = +filterValuesSplit[1];

            this.updateCirclesPositionAndModel();
        },
        clearFilter(categoryKey, sectionKey) {
            if (categoryKey !== null && categoryKey !== this.categoryKey) {
                return;
            }

            if (sectionKey !== null && sectionKey !== this.sectionKey) {
                return;
            }
            this.minValueModel = this.minValue;
            this.maxValueModel = this.maxValue;
            this.updateCirclesPositionAndModel();
        },
        updateCirclesPositionAndModel() {
            this.updateCirclePosition('min');
            this.updateCirclePosition('max');
            this.updateModel();
        },
        updateModel() {
            this.updateFilterValue({
                categoryKey: this.categoryKey,
                sectionKey: this.sectionKey,
                filterId: this.filterId,
                filterValue: this.getFilterStringValue()
            });
            this.$emit(
                VUE_CUSTOM_EVENTS.isFilterChanged,
                this.isFilterChanged()
            );
        },
        getFilterStringValue() {
            if (!this.isFilterChanged()) {
                return null;
            }

            return `${this.minValueModel},${this.maxValueModel}`;
        },
        isFilterChanged() {
            return (
                this.minValue !== this.minValueModel ||
                this.maxValue !== this.maxValueModel
            );
        },
        onLeftCircleMouseDown() {
            this.isLeftCircleMouseDown = true;
            this.leftCircleZIndex = 2;
            this.rightCircleZIndex = 1;
        },
        onLeftCircleMouseMove(event) {
            if (!this.isLeftCircleMouseDown) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            const pointerLeftPosition =
                event.clientX || event?.touches[0]?.clientX;

            const newLeftPosition =
                pointerLeftPosition -
                this.$refs.slider.getBoundingClientRect().left;

            const rightCirclePosition =
                this.$refs.rightCircle.offsetLeft +
                this.$refs.rightCircle.offsetWidth;

            if (newLeftPosition > rightCirclePosition || newLeftPosition < 0) {
                return;
            }

            this.leftCirclePosition = `${newLeftPosition}px`;
            setTimeout(() => {
                this.updateValueOnCircleMove('min');
            });
        },
        onRightCircleMouseDown() {
            this.isRightCircleMouseDown = true;
            this.rightCircleZIndex = 2;
            this.leftCircleZIndex = 1;
        },
        onRightCircleMouseMove(event) {
            if (!this.isRightCircleMouseDown) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            const pointerLeftPosition =
                event.clientX || event.touches[0]?.clientX;

            const newOffsetLeft =
                pointerLeftPosition -
                this.$refs.slider.getBoundingClientRect().left;

            const newRightPosition =
                this.$refs.slider.offsetWidth - newOffsetLeft;

            const leftCirclePosition =
                this.$refs.leftCircle.offsetLeft -
                this.$refs.leftCircle.offsetWidth;

            if (
                newOffsetLeft - this.$refs.rightCircle.offsetWidth <
                    leftCirclePosition ||
                newRightPosition < 0
            ) {
                return;
            }

            this.rightCirclePosition = `${newRightPosition}px`;
            setTimeout(() => {
                this.updateValueOnCircleMove('max');
            });
        },
        updateValueOnCircleMove(type) {
            const circle =
                type === 'min' ? this.$refs.leftCircle : this.$refs.rightCircle;
            let circlePosition = circle.offsetLeft;
            if (type !== 'min') {
                circlePosition =
                    this.$refs.slider.offsetWidth -
                    circlePosition -
                    this.$refs.rightCircle.offsetWidth;
            }

            const sliderWidth = this.$refs.slider.offsetWidth;
            const percentageOffset = circlePosition / sliderWidth;
            const diff = this.maxValue - this.minValue;
            if (type === 'min') {
                this.minValueModel = Math.round(
                    this.minValue + diff * percentageOffset
                );

                return;
            }
            this.maxValueModel = Math.round(
                this.maxValue - diff * percentageOffset
            );
        },
        updateCirclePosition(type) {
            if (!this.isMounted) {
                return;
            }
            const sliderWidth = this.$refs.slider.offsetWidth;
            const diffValue = this.maxValue - this.minValue;
            const offsetPerValue = sliderWidth / diffValue;
            const currentValue =
                type === 'min'
                    ? this.minValueModel - this.minValue
                    : this.maxValue - this.maxValueModel;

            const circlePosition = `${offsetPerValue * currentValue}px`;

            if (type === 'min') {
                this.leftCirclePosition = circlePosition;
                return;
            }

            this.rightCirclePosition = circlePosition;
        },
        getValidatedValue(value, type) {
            const valueWithoutSpaces = value.replaceAll(' ', '');
            if (!REGEXPS.number.test(valueWithoutSpaces)) {
                return type === 'min' ? this.minValueModel : this.maxValueModel;
            }

            if (valueWithoutSpaces < this.minValue) {
                return this.minValue;
            }

            if (valueWithoutSpaces > this.maxValue) {
                return this.maxValue;
            }

            return valueWithoutSpaces;
        },
        ...mapMutations({
            updateFilterValue: 'filters/updateFilterValue'
        })
    }
};
</script>

<style lang="scss" scoped>
.FilterSlider {
    position: relative;

    @include hover {
        &:hover {
            .FilterSlider-tooltip {
                opacity: 1;
            }
        }
    }

    &-title {
        @include text-light-same-mobile;
        color: $c-black;
    }

    &-slider {
        width: calc(100% - 14px);
        position: relative;
        height: 40px;
        margin-left: 7px;
    }

    &-line {
        width: 100%;
        height: 4px;
        background: $c-filterSliderLine;
        position: absolute;
        top: 50%;
        transform: translate3d(0, -50%, 0);
    }

    &-circle {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        border: 1px solid $c-filterSliderLine;
        position: absolute;
        top: 50%;
        background: $c-white;
        transform: translate3d(-50%, -50%, 0);
        cursor: pointer;

        &:after {
            content: '';
            position: absolute;
            left: 50%;
            top: 50%;
            background: $c-purple;
            opacity: 0;
            transition: $d-hover opacity;
            width: 8px;
            height: 8px;
            transform: translate3d(-50%, -50%, 0);
            border-radius: 50%;
        }

        @include hover {
            &:hover {
                &:after {
                    opacity: 1;

                    @include mobile {
                        opacity: 0;
                    }
                }
            }
        }

        &.isActive {
            &:after {
                opacity: 1;
            }
        }

        &_right {
            transform: translate3d(50%, -50%, 0);
        }
    }

    &-lineBetween {
        position: absolute;
        height: 4px;
        background: $c-purple;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        z-index: 1;
    }

    &-inputs {
        display: flex;
        justify-content: space-between;
    }

    &-input {
        width: 40px;
        border: 1px solid $c-gray--border;
        border-radius: 2px;
        color: $c-black;
        @include text-light-same-mobile;
        text-align: center;
        box-shadow: none;

        @include hover {
            &:hover {
                border-color: $c-black;
            }
        }

        &:focus {
            border-color: $c-black;
        }
    }

    &-tooltip {
        position: absolute;
        right: 0;
        top: 0;
        opacity: 0;
        transition: $d-hover opacity;

        @include mobile {
            opacity: 1;
        }
    }
}
</style>
