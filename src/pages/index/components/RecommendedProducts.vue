<script setup lang="ts">
import { useTranslate } from '@hy-app/ui';
import HyScrollList from '@hy-app/ui/components/hy-scroll-list/hy-scroll-list.vue';
import type { RecommendedProduct } from './types';

const { t } = useTranslate('home');

interface IProps {
    list: RecommendedProduct[];
}

interface IEmits {
    (e: 'tap', item: RecommendedProduct): void;
    (e: 'show-all'): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const onProductTap = (item: RecommendedProduct) => {
    emit('tap', item);
};

const onShowAllTap = () => {
    emit('show-all');
};
</script>

<template>
    <view class="home__section">
        <view class="home__section-header">
            <text class="home__section-title">{{
                t('recommended.title')
            }}</text>
            <view
                class="home__section-more"
                @tap="onShowAllTap"
            >
                <text class="home__section-more-text">{{
                    t('recommended.showAll')
                }}</text>
            </view>
        </view>
        <hy-scroll-list :indicator="false">
            <hy-flex gap="10">
                <view
                    v-for="item in props.list"
                    :key="item.id"
                    class="recommended-card"
                    @tap="onProductTap(item)"
                >
                    <view class="recommended-card__image-wrap">
                        <hy-image
                            :src="item.image"
                            width="160rpx"
                            height="160rpx"
                            radius="20rpx"
                            mode="aspectFill"
                            lazy-load
                        />
                    </view>
                    <view class="recommended-card__info">
                        <text class="recommended-card__name">{{
                            t(item.nameKey)
                        }}</text>
                        <text class="recommended-card__price"
                            >${{ item.price.toFixed(2) }}</text
                        >
                    </view>
                </view>
            </hy-flex>
        </hy-scroll-list>
    </view>
</template>

<style lang="scss" scoped>
.home__section {
    margin-bottom: $flux-spacing-xl;

    &-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: $flux-spacing-md;
    }

    &-title {
        font-size: 36rpx;
        font-weight: 700;
        color: $flux-text-primary;
    }

    &-more {
        padding: $flux-spacing-xs $flux-spacing-sm;
        &-text {
            font-size: $flux-font-sm;
            color: $flux-text-secondary;
        }
    }
}

.recommended-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: $flux-spacing-md;
    background-color: $hy-background--box;
    border-radius: $flux-radius-md;
    box-shadow: $hy-shadow-base;
    width: 500rpx;
    margin: 10rpx auto;

    &__image-wrap {
        width: 160rpx;
        height: 160rpx;
        flex-shrink: 0;
        overflow: hidden;
        border-radius: $flux-radius-md;
    }

    &__info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: $flux-spacing-xs;
    }

    &__name {
        font-size: $flux-font-md;
        font-weight: 500;
        color: $flux-text-primary;
        line-height: 1.4;
    }

    &__price {
        font-size: $flux-font-lg;
        font-weight: 700;
        color: $flux-text-primary;
    }
}
</style>
