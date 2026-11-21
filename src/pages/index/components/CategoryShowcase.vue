<script lang="ts">
export default {
    options: {
        styleIsolation: 'shared',
    },
};
</script>

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
                        alignItems: item.id === 1 ? 'flex-end' : 'flex-start',
                    }"
                >
                    <text class="category-showcase-card__category">{{
                        t(item.categoryKey)
                    }}</text>
                    <text class="category-showcase-card__title">{{
                        t(item.titleKey)
                    }}</text>
                </view>
                <hy-image
                    :src="item.image"
                    radius="24rpx"
                    height="228"
                    mode="widthFix"
                    lazy-load
                    :custom-class="`category-showcase-card__image ${item.id === 1 ? 'image--left' : 'image--right'}`"
                />
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.home__section {
    margin-bottom: $hy-border-margin-padding-xl;
}

.category-showcase-grid {
    display: flex;
    flex-direction: row;
    gap: $hy-border-margin-padding-base;
}

.category-showcase-card {
    flex: 1;
    height: 440rpx;
    position: relative;
    border-radius: $hy-radius-lg;
    overflow: hidden;

    :deep(.category-showcase-card__image) {
        position: absolute;
        z-index: 999;

        &.image--left {
            top: -80rpx;
            left: -200rpx;
        }

        &.image--right {
            top: -50rpx;
            right: -180rpx;
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
        gap: $hy-border-margin-padding-sm;
        background-color: $hy-background--container;
    }

    &__category {
        font-size: $hy-font-size-sm;
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
