<script setup lang="ts">
import { useTranslate } from '@hy-app/ui';
import type { CategoryShowcase } from './types';

const { t } = useTranslate('home');

interface IProps {
    list: CategoryShowcase[];
}

interface IEmits {
    (e: 'tap', item: CategoryShowcase): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const onCategoryShowcaseTap = (item: CategoryShowcase) => {
    emit('tap', item);
};
</script>

<template>
    <view class="home__section">
        <view class="category-showcase-grid">
            <view
                v-for="item in props.list"
                :key="item.id"
                class="category-showcase-card"
                @tap="onCategoryShowcaseTap(item)"
            >
                <view
                    class="category-showcase-card__overlay"
                    :style="{
                        alignItems:
                            item.id === 1
                                ? 'flex-end'
                                : 'flex-start',
                    }"
                >
                    <text
                        class="category-showcase-card__category"
                        >{{ t(item.categoryKey) }}</text
                    >
                    <text
                        class="category-showcase-card__title"
                        >{{ t(item.titleKey) }}</text
                    >
                </view>
                <hy-image
                    :src="item.image"
                    width="100%"
                    height="100%"
                    radius="24rpx"
                    mode="aspectFill"
                    lazy-load
                    :class="[
                        'category-showcase-card__image',
                        item.id === 1
                            ? 'image--left'
                            : 'image--right',
                    ]"
                />
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.home__section {
    margin-bottom: $flux-spacing-xl;
}

.category-showcase-grid {
    display: flex;
    flex-direction: row;
    gap: $flux-spacing-md;
}

.category-showcase-card {
    flex: 1;
    height: 440rpx;
    position: relative;
    border-radius: $flux-radius-lg;
    overflow: hidden;

    &__image {
        position: absolute;
        z-index: 999;

        &.image--left {
            top: -100rpx;
            left: -150rpx;
            height: 800rpx !important;
        }

        &.image--right {
            right: -100rpx;
        }
    }

    &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        padding: $hy-border-margin-padding-base;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: $flux-spacing-xs;
        background-color: $hy-background--track;
    }

    &__category {
        font-size: $flux-font-sm;
        font-weight: 500;
        color: $hy-text-color--3;
        letter-spacing: 0.5rpx;
    }

    &__title {
        font-size: 36rpx;
        line-height: 1.2;
        white-space: pre-line;
        text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
        margin-top: 50rpx;
    }
}
</style>
