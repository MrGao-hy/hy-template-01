<script setup lang="ts">
import { computed } from 'vue';
import { useTranslate } from '@hy-app/ui';

/**
 * 结算 STEP 3：确认订单
 */
const { t } = useTranslate('checkout');

interface SummaryItem {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
}

/** 订单商品摘要 */
const summaryItems: SummaryItem[] = [
    {
        id: 1,
        name: 'Sportwear Set',
        image:
            '/static/images/fluxstore/image_550c305749d6c4a8efe5849bb6952d297db4e2c1.png',
        price: 80.0,
        quantity: 1,
    },
    {
        id: 2,
        name: 'Turtleneck Sweater',
        image: '/static/images/fluxstore/home_swiper_1.png',
        price: 39.99,
        quantity: 1,
    },
];

/** 运费固定免费 */
const SHIPPING_FREE = 0;

/** 商品金额 */
const productTotal = computed(() =>
    summaryItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
);

/** 应付合计 */
const grandTotal = computed(() => productTotal.value + SHIPPING_FREE);
</script>

<template>
    <view class="confirm-step">
        <text class="confirm-step__title">
            {{ t('confirmTitle') }}
        </text>

        <!-- ============== 商品清单 ============== -->
        <view class="confirm-step__items">
            <view
                v-for="item in summaryItems"
                :key="item.id"
                class="summary-item"
            >
                <hy-image
                    :src="item.image"
                    width="120rpx"
                    height="120rpx"
                    radius="16rpx"
                    mode="aspectFill"
                    lazy-load
                />
                <view class="summary-item__body">
                    <text class="summary-item__name">{{ item.name }}</text>
                    <text class="summary-item__qty">
                        x{{ item.quantity }}
                    </text>
                </view>
                <text class="summary-item__price">
                    $ {{ (item.price * item.quantity).toFixed(2) }}
                </text>
            </view>
        </view>

        <!-- ============== 金额汇总 ============== -->
        <view class="confirm-step__summary">
            <view class="summary-row">
                <text class="summary-row__label">
                    {{ t('summaryProduct') }}
                </text>
                <text class="summary-row__value">
                    $ {{ productTotal.toFixed(2) }}
                </text>
            </view>
            <view class="summary-row">
                <text class="summary-row__label">
                    {{ t('summaryShipping') }}
                </text>
                <text class="summary-row__value summary-row__value--green">
                    {{ t('free') }}
                </text>
            </view>
            <view class="summary-row">
                <text class="summary-row__label summary-row__label--bold">
                    {{ t('total') }}
                </text>
                <text class="summary-row__total">
                    $ {{ grandTotal.toFixed(2) }}
                </text>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.confirm-step {
    margin-top: 64rpx;

    &__title {
        display: block;
        margin-bottom: 28rpx;
        font-size: $flux-font-lg;
        font-weight: 700;
        color: $flux-text-primary;
    }

    &__items {
        display: flex;
        flex-direction: column;
        gap: 24rpx;
    }

    &__summary {
        margin-top: 40rpx;
        padding-top: 24rpx;
        border-top: 2rpx solid #f1f2f3;
    }
}

.summary-item {
    display: flex;
    align-items: center;
    gap: 24rpx;

    &__body {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 8rpx;
        min-width: 0;
    }

    &__name {
        font-size: 26rpx;
        font-weight: 600;
        color: $flux-text-primary;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__qty {
        font-size: 24rpx;
        color: #8a8a8f;
    }

    &__price {
        font-size: 28rpx;
        font-weight: 700;
        color: $flux-text-primary;
    }
}

.summary-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16rpx;

    &__label {
        font-size: 28rpx;
        color: #8a8a8f;

        &--bold {
            font-weight: 700;
            color: $flux-text-primary;
        }
    }

    &__value {
        font-size: 28rpx;
        font-weight: 600;
        color: $flux-text-primary;

        &--green {
            color: #508a7b;
        }
    }

    &__total {
        font-size: 36rpx;
        font-weight: 700;
        color: $flux-text-primary;
    }
}
</style>
