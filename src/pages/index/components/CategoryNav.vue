<script setup lang="ts">
import { useTranslate, type GridItemVo } from '@hy-app/ui';
import Icon from '@/components/Icon.vue';
import type { CategoryNav } from './types';

const { t } = useTranslate('home');

interface IProps {
    list: CategoryNav[];
}

interface IEmits {
    (e: 'tap', item: GridItemVo): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const onCategoryNavTap = (item: GridItemVo) => {
    emit('tap', item);
};
</script>

<template>
    <hy-grid
        :list="props.list"
        :col="4"
        :item-height="80"
        custom-class="home__category-nav"
    >
        <template #default="{ record: item }">
            <view
                class="category-nav-item"
                @click="onCategoryNavTap(item)"
            >
                <view
                    class="category-nav-item__icon-wrap"
                    :class="{
                        'category-nav-item__icon-wrap--active':
                            item.active,
                    }"
                >
                    <Icon :name="item.icon" :size="17" />
                </view>
                <text
                    class="category-nav-item__name"
                    :class="{
                        'category-nav-item__name--active':
                            item.active,
                    }"
                >
                    {{ t(item.nameKey) }}
                </text>
            </view>
        </template>
    </hy-grid>
</template>

<style lang="scss" scoped>
.home__category-nav {
    padding: $hy-border-margin-padding-base 0;
}

.category-nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: $flux-spacing-sm;

    &__icon-wrap {
        width: 72rpx;
        height: 72rpx;
        border-radius: $hy-radius-semicircle;
        background-color: $flux-bg-category;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;

        &--active {
            background-color: $hy-primary;
            position: relative;

            &::before {
                content: '';
                position: absolute;
                top: -8rpx;
                left: -8rpx;
                right: -8rpx;
                bottom: -8rpx;
                border: 1px solid $hy-primary;
                border-radius: inherit;
            }

            .hy-icon {
                color: #ffffff;
            }
        }
    }

    &__name {
        font-size: $flux-font-xs;
        color: $flux-text-secondary;
        transition: all 0.3s ease;
        white-space: nowrap;

        &--active {
            color: $hy-primary;
            font-weight: 600;
        }
    }
}
</style>
