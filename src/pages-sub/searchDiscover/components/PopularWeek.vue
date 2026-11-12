<script setup lang="ts">
import { ref } from 'vue';
import { useTranslate } from '@hy-app/ui';
import { Config } from '@/config';
import type { PopularProduct } from '../../../pages/search/components/types';

const { t } = useTranslate('search');

/** 商品数据（Figma: Popular this week） */
const products = ref<PopularProduct[]>([
    {
        id: 1,
        name: 'Lihua Tunic White',
        price: 53.0,
        image: `${Config.IMG}/good_30.png`,
    },
    {
        id: 2,
        name: 'Skirt Dress',
        price: 34.0,
        image: `${Config.IMG}/good_31.png`,
    },
    {
        id: 3,
        name: 'Kimi Green Dress',
        price: 47.99,
        image: `${Config.IMG}/good_32.png`,
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
        <hy-flex align="center" justify="space-between">
            <text class="popular-week__title">{{ t('popularWeek') }}</text>
            <text class="popular-week__more" @tap="onShowAll">
                {{ t('showAll') }}
            </text>
        </hy-flex>

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
    margin-top: 154rpx;

    &__title {
        font-size: 40rpx;
        font-weight: 700;
        color: $hy-text-color;
    }

    &__more {
        font-size: 26rpx;
        color: #9b9b9b;
    }

    &__list {
        display: flex;
        gap: 40rpx;
        padding: 20rpx 0 30rpx;
    }
}

.popular-card {
    display: flex;
    flex-direction: column;
    gap: 4rpx;

    &:active {
        opacity: 0.7;
    }

    &__image-wrap {
        width: 252rpx;
        height: 344rpx;
        margin: 0 auto 24rpx;
    }

    &__name {
        font-size: $hy-font-size-sm;
        color: $hy-text-color;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__price {
        font-size: $hy-font-size-md;
        font-weight: 700;
        color: $hy-text-color;
    }
}
</style>
