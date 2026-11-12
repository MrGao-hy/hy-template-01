<script setup lang="ts">
import { useTranslate } from '@hy-app/ui';
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
            <view class="home__section-more" @tap="onShowAllTap">
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
    margin-bottom: $hy-border-margin-padding-lg;

    &-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: $hy-border-margin-padding-base;
    }

    &-title {
        font-size: 36rpx;
        font-weight: 700;
    }

    &-more {
        padding: $hy-border-margin-padding-sm;
        &-text {
            font-size: $hy-font-size-sm;
            color: $hy-text-color--grey;
        }
    }
}

.recommended-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: $hy-border-margin-padding-base;
    background-color: $hy-background--2;
    border-radius: $hy-radius-base;
    box-shadow: $hy-shadow-base;
    width: 500rpx;
    margin: 10rpx auto;

    &__image-wrap {
        width: 160rpx;
        height: 160rpx;
        flex-shrink: 0;
        overflow: hidden;
        border-radius: $hy-radius-base;
    }

    &__info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: $hy-border-margin-padding-sm;
    }

    &__name {
        font-size: $hy-font-size-base;
        font-weight: 500;
        line-height: 1.4;
    }

    &__price {
        font-size: $hy-font-size-lg;
        font-weight: 700;
    }
}
</style>
