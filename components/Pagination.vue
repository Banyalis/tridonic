<template>
    <div v-if="pageCount > 0" class="Pagination">
        <div
            class="Pagination-prev"
            :class="{ isActive: isPrevShown }"
            @click="onPrevClick"
        >
            <div class="Pagination-prevIcon">
                <svg-icon name="pagination-arrow-left"></svg-icon>
            </div>
            <span>{{ $translations.back() }}</span>
        </div>
        <div class="Pagination-desktop">
            <div
                class="Pagination-desktopFirst"
                :class="{ isActive: isLeftWrapperActive }"
                @click="onPageNumberClick(1)"
            >
                1
            </div>
            <div
                class="Pagination-desktopDots"
                :class="{ isActive: isLeftWrapperActive }"
            >
                ...
            </div>
            <div
                v-for="(page, key) in getMainRange"
                :key="key"
                class="Pagination-desktopItem"
                :class="{ isActive: page === activePageNumber }"
                @click="onPageNumberClick(page)"
            >
                <span>{{ page }}</span>
            </div>
            <div
                class="Pagination-desktopDots"
                :class="{ isActive: isRightWrapperActive }"
            >
                ...
            </div>
            <div
                class="Pagination-desktopLast"
                :class="{ isActive: isRightWrapperActive }"
                @click="onPageNumberClick(pageCount)"
            >
                {{ pageCount }}
            </div>
        </div>
        <div class="Pagination-mobile">
            <span class="Pagination-mobileActive">{{ activePageNumber }}</span>
            <span>&nbsp;{{ $translations.paginationCurrentOf() }}&nbsp;</span>
            <span>{{ pageCount }}</span>
        </div>
        <div
            class="Pagination-next"
            :class="{ isActive: isNextShown }"
            @click="onNextClick"
        >
            <span>{{ $translations.next() }}</span>
            <div class="Pagination-nextIcon">
                <svg-icon name="pagination-arrow-right"></svg-icon>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        pageCount: {
            type: Number,
            required: true,
            default: 0
        },
        activePageNumber: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            onPageNumberClickEvent: 'on-page-number-click',
            shownItemsOffset: 5,
            minPageCountShownWithoutWrapping: 7 // minimum of pages shown without wrapping with dots
        };
    },
    computed: {
        isNextShown() {
            return this.activePageNumber < this.pageCount;
        },
        isPrevShown() {
            return this.activePageNumber > 1;
        },
        isLeftWrapperActive() {
            return (
                this.getLowerBound() > 1 &&
                this.pageCount > this.minPageCountShownWithoutWrapping
            );
        },
        isRightWrapperActive() {
            return (
                this.getHigherBound() < this.pageCount &&
                this.pageCount > this.minPageCountShownWithoutWrapping
            );
        },
        getMainRange() {
            if (this.pageCount <= this.minPageCountShownWithoutWrapping) {
                return this.pageCount;
            }
            const higherBound = this.getHigherBound();
            const lowerBound = this.getLowerBound();
            const diff = higherBound - lowerBound;
            const range =
                this.shownItemsOffset > diff ? this.shownItemsOffset : diff;
            return Array.from(
                new Array(range),
                (x, i) => i + this.getLowerBound()
            );
        }
    },
    methods: {
        getLowerBound() {
            let lowerBound =
                this.activePageNumber - Math.floor(this.shownItemsOffset / 2);
            if (lowerBound < Math.ceil(this.shownItemsOffset / 2)) {
                lowerBound = 1;
            }

            if (
                this.activePageNumber >
                this.pageCount - this.shownItemsOffset + 1
            ) {
                lowerBound = this.pageCount - this.shownItemsOffset + 1;
            }

            return lowerBound;
        },

        getHigherBound() {
            let higherBound = this.getLowerBound() + this.shownItemsOffset;

            if (
                this.activePageNumber >
                this.pageCount - this.shownItemsOffset + 1
            ) {
                higherBound = this.pageCount;
            }

            return higherBound;
        },
        onPageNumberClick(pageNumber) {
            this.$emit(this.onPageNumberClickEvent, pageNumber);
        },
        onPrevClick() {
            if (this.activePageNumber === 1) {
                return;
            }
            this.$emit(this.onPageNumberClickEvent, this.activePageNumber - 1);
        },
        onNextClick() {
            if (this.activePageNumber === this.pageCount) {
                return;
            }
            this.$emit(this.onPageNumberClickEvent, this.activePageNumber + 1);
        }
    }
};
</script>

<style lang="scss" scoped>
.Pagination {
    display: flex;
    justify-content: space-between;

    &-desktop {
        display: flex;
        color: $c-gray;
        @include text-light;

        @include mobile {
            display: none;
        }

        &Item {
            margin-left: 15px;
            margin-right: 15px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: $d-hover color;

            @include hover {
                &:hover {
                    color: $c-purple;
                    font-weight: $fw-medium;
                }
            }

            span {
                pointer-events: none;
                z-index: 1;
            }

            &:before {
                content: '';
                position: absolute;
                width: 20px;
                height: 20px;
                background: $c-purple;
                border-radius: 50%;
                z-index: 0;
                opacity: 0;
            }

            &.isActive {
                color: $c-white;
                position: relative;
                font-weight: $fw-medium;
                pointer-events: none;

                &:before {
                    opacity: 1;
                }
            }

            &:first-of-type {
                margin-left: 0;
            }

            &:last-of-type {
                margin-right: 0;
            }
        }

        &Dots {
            margin: 0 15px;
            display: none;

            &.isActive {
                display: block;
            }
        }

        &First {
            margin-right: 15px;
        }

        &Last {
            margin-left: 15px;
        }

        &First,
        &Last {
            cursor: pointer;
            display: none;
            transition: $d-hover color;

            &:before {
                content: '';
                position: absolute;
                width: 20px;
                height: 20px;
                z-index: 0;
                opacity: 0;
            }

            @include hover {
                &:hover {
                    color: $c-purple;
                    font-weight: $fw-medium;
                }
            }

            &.isActive {
                display: block;
            }
        }
    }

    &-mobile {
        display: none;
        @include text-light;
        color: $c-gray;

        &Active {
            color: $c-purple;
            font-weight: $fw-medium;
        }

        @include mobile {
            display: block;
            font-size: 14px;
        }
    }

    &-prevIcon {
        svg {
            transform: translate3d(2px, 0, 0);
        }
    }

    &-nextIcon {
        svg {
            transform: translate3d(-2px, 0, 0);
        }
    }

    &-prev,
    &-next {
        cursor: pointer;
        display: flex;
        opacity: 0;
        pointer-events: none;

        &.isActive {
            opacity: 1;
            pointer-events: all;
        }

        span {
            @include text-light;
            font-weight: $fw-medium;
            color: $c-purple;
            transition: $d-hover color;
            margin: 0 10px;

            @include mobile {
                font-size: 14px;
            }
        }

        &Icon {
            width: 16px;
            height: 12px;
            overflow: hidden;
            margin-top: 4px;
            position: relative;

            @include mobile {
                margin-top: 3px;
            }

            svg {
                fill: $c-purple;
                transition: $d-hover fill, $d-hover transform;
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
            }
        }

        @include hover {
            &:hover {
                .Pagination-prevIcon,
                .Pagination-nextIcon {
                    svg {
                        fill: $c-blue;
                        transform: none;
                    }
                }

                span {
                    color: $c-blue;
                }
            }
        }
    }
}
</style>
