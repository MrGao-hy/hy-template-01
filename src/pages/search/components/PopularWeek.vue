<script setup lang="ts">
import { ref } from 'vue';
import { useTranslate } from '@hy-app/ui';
import HyScrollList from '@hy-app/ui/components/hy-scroll-list/hy-scroll-list.vue';
import type { PopularProduct } from './types';

const { t } = useTranslate('search');

/** 商品数据（Figma: Popular this week） */
const products = ref<PopularProduct[]>([
    {
        id: 1,
        name: 'Lihua Tunic White',
        price: 53.0,
        image: '/static/images/fluxstore/image_bf181dce9683e508a3d7498d690355439da54ab7.png',
    },
    {
        id: 2,
        name: 'Skirt Dress',
        price: 34.0,
        image: '/static/images/fluxstore/image_afe1124daae45a0f616c3229768c00d4df765aff.png',
    },
    {
        id: 3,
        name: 'Kimi Green Dress',
        price: 47.99,
        image: '/static/images/fluxstore/image_dbd313f3e91dae05087bab8930b7dba79f15e751.png',
    },
]);

interface IEmits {
    (e: 'tap', item: PopularProduct): void;
    (e: 'show-all'): void;
}

const emit = defineEmits<IEmits>();

/** 点击商品 */
const onProductTap = (item: PopularProduct) => {
    emit('tap', item);
};

/** 查看全部 */
const onShowAll = () => {
    emit('show-all');
};
</script>

<template>
    <view class="popular-week">
        <!-- ============== 标题栏 ============== -->
        <view class="popular-week__header">
            <text class="popular-week__title">{{ t('popularWeek') }}</text>
            <text class="popular-week__more" @tap="onShowAll">
                {{ t('showAll') }}
            </text>
        </view>

        <!-- ============== 横向商品列表 ============== -->
        <hy-scroll-list :indicator="false">
            <view class="popular-week__list">
                <view
                    v-for="item in products"
                    :key="item.id"
                    class="popular-card"
                    @tap="onProductTap(item)"
                >
                    <view class="popular-card__image-wrap">
                        <hy-image
                            :src="item.image"
                            width="252rpx"
                            height="344rpx"
                            mode="aspectFill"
                            radius="20rpx"
                            lazy-load
                        />
                    </view>
                    <text class="popular-card__name">{{ item.name }}</text>
                    <text class="popular-card__price">
                        $ {{ item.price.toFixed(2) }}
                    </text>
                </view>
            </view>
        </hy-scroll-list>
    </view>
</template>

<style lang="scss" scoped>
.popular-week {
    margin-top: 64rpx;

    &__header {
        display: flex;
        align-items: center;
        gap: 150rpx;
        margin-bottom: 44rpx;
    }

    &__title {
        font-size: 40rpx;
        font-weight: 700;
        color: #000000;
    }

    &__more {
        font-size: 26rpx;
        color: #9b9b9b;
    }

    &__list {
        display: flex;
        gap: 70rpx;
        padding: 20rpx 0 30rpx;
    }
}

.popular-card {
    display: flex;
    flex-direction: column;
    gap: 4rpx;
    width: 296rpx;

    &:active {
        opacity: 0.7;
    }

    &__image-wrap {
        width: 252rpx;
        height: 344rpx;
        margin: 0 auto 24rpx;
    }

    &__name {
        font-size: $flux-font-sm;
        color: $flux-text-primary;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__price {
        font-size: $flux-font-lg;
        font-weight: 700;
        color: $flux-text-primary;
    }
}
</style>
