<template>
    <div
        ref="tooltip"
        class="Tooltip"
        @mouseenter="onTooltipMouseEnter"
        @mouseleave="onTooltipMouseLeave"
        @click="onTooltipClick"
    >
        <div class="Tooltip-icon">
            <svg-icon
                class="Tooltip-iconInner"
                :class="{ isActive: !isTooltipShown }"
                name="tooltip"
            ></svg-icon>
            <svg-icon
                class="Tooltip-iconInnerHovered"
                name="tooltip-hovered"
                :class="{ isActive: isTooltipShown }"
            ></svg-icon>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { isElementParentOf, isMobile } from '@/utils/utils';

export default {
    name: 'TooltipIcon',
    props: {
        text: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            isTooltipShown: false
        };
    },
    methods: {
        onTooltipMouseEnter() {
            if (isMobile()) {
                return;
            }
            const tooltip = this.$refs.tooltip;
            const leftPosition = tooltip.getBoundingClientRect().x;
            const topPosition = tooltip.getBoundingClientRect().y;
            this.showTooltip({
                tooltipText: this.text,
                tooltipPositionX: leftPosition,
                tooltipPositionY: topPosition
            });
        },
        onTooltipClick() {
            if (!isMobile()) {
                return;
            }

            this.isTooltipShown = true;
            window.addEventListener('touchstart', this.onTouchStart);
            const leftPosition = 20;
            const topPosition = this.$refs.tooltip.getBoundingClientRect().y;
            this.showTooltip({
                tooltipText: this.text,
                tooltipPositionX: leftPosition,
                tooltipPositionY: topPosition
            });
        },
        onTouchStart(event) {
            const tooltipBubble = document.getElementById('tooltip-bubble');
            if (
                tooltipBubble.isEqualNode(event.target) ||
                isElementParentOf(tooltipBubble, event.target)
            ) {
                return;
            }

            this.hideTooltip();
            this.isTooltipShown = false;
            window.removeEventListener('touchstart', this.onTouchStart);
        },
        onTooltipMouseLeave() {
            if (isMobile()) {
                return;
            }

            this.hideTooltip();
        },
        ...mapMutations({
            showTooltip: 'tooltip/showTooltip',
            hideTooltip: 'tooltip/hideTooltip'
        })
    }
};
</script>

<style lang="scss" scoped>
.Tooltip {
    &-icon {
        width: 20px;
        height: 20px;
        position: relative;
        cursor: pointer;

        &Inner,
        &InnerHovered {
            @include m-absolute100;
            transition: $d-hover opacity;
        }

        &InnerHovered {
            opacity: 0;
        }

        @include hover {
            &:hover {
                .Tooltip-iconInner {
                    opacity: 0;
                }

                .Tooltip-iconInnerHovered {
                    opacity: 1;
                }
            }
        }

        @include mobile {
            .Tooltip-iconInner {
                opacity: 1;

                &.isActive {
                    opacity: 1;
                }
            }

            .Tooltip-iconInnerHovered {
                opacity: 0;

                &.isActive {
                    opacity: 1;
                }
            }
        }
    }
}
</style>
