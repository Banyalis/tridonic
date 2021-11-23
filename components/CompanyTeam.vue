<template>
    <div class="CompanyTeam">
        <div
            v-for="(item, index) in content.items"
            :key="index"
            class="CompanyTeam-item"
        >
            <div class="CompanyTeam-itemImage">
                <picture>
                    <source
                        :srcset="item.image + ' 1x, ' + item.image2x + ' 2x'"
                    />
                    <img :src="item.image" alt="" />
                </picture>
            </div>
            <div class="CompanyTeam-itemName" v-text="item.name"></div>
            <div class="CompanyTeam-itemPosition" v-text="item.position"></div>
            <a
                :href="'tel:' + item.phone"
                class="CompanyTeam-itemPhone"
                v-text="item.phone"
            ></a>
            <a :href="'mailto:' + item.email.url" class="CompanyTeam-itemEmail">
                <svg-icon name="link-arrow-right"></svg-icon>
                <div
                    class="CompanyTeam-itemEmailTitle"
                    v-text="item.email.title"
                ></div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CompanyTeam',

    props: {
        content: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.CompanyTeam {
    $component: &;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 35px 40px;
    width: 100%;

    @include mobile {
        grid-template-columns: repeat(1, 1fr);
    }

    &-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        color: $c-black;

        &Image {
            @include m-aspectRatio(360, 240);

            width: 100%;
            margin-bottom: 16px;

            @include mobile {
                @include m-aspectRatio(360, 180);
            }

            img {
                @include m-absoluteObjectFit();
            }
        }

        &Name {
            @include text;
        }

        &Position,
        &Phone,
        &EmailTitle {
            @include text-light-same-mobile;
        }

        &Position {
            margin-bottom: 20px;
        }

        &Phone,
        &Email {
            transition: color $d-hover ease-in-out;

            @include hover {
                &:hover {
                    color: $c-blue;
                }
            }
        }

        &Phone {
            margin-bottom: 3px;
            color: $c-black;
        }

        &Email {
            display: flex;
            align-items: center;
            color: $c-purple;

            svg {
                width: 15px;
                height: 11px;
                margin-right: 7px;
                fill: currentColor;
                transition: fill $d-hover ease-in-out;
            }

            &Title {
                font-weight: $fw-medium;
            }
        }
    }
}
</style>
