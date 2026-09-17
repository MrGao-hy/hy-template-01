<script setup lang="ts">
import { computed, ref } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';
import { onLoad } from '@dcloudio/uni-app';
import { mockOrders } from './components/data';
import type { OrderItem } from './components/types';

/**
 * 订单详情（常规订单流程占位实现，待 Figma 设计稿校准）
 */
definePage({
    style: {
        navigationStyle: 'custom',
        navigationBarTextStyle: 'black',
    },
});

const { t } = useTranslate('order');

/** 当前订单 */
const order = ref<OrderItem>(mockOrders[0]);

onLoad((options) => {
    const no = options?.no;
    const found = mockOrders.find((item) => item.no === no);
    if (found) order.value = found;
});

/** 状态文案映射 */
const statusText = computed(() => {
    const map = {
        processing: t('statusProcessing'),
        completed: t('statusCompleted'),
        cancelled: t('statusCancelled'),
    } as const;
    return map[order.value.status];
});

/** 是否进行中（展示操作按钮） */
const isProcessing = computed(() => order.value.status === 'processing');

// ============== 事件 ==============

const onBack = () => {
    uni.navigateBack();
};

/** 取消订单 → 取消页 */
const onCancel = () => {
    uni.navigateTo({ url: `/pages-sub/order/cancel?no=${order.value.no}` });
};

/** 物流跟踪 */
const onTracking = () => {
    uni.navigateTo({ url: `/pages-sub/order/tracking?no=${order.value.no}` });
};

/** 评价商品 */
const onReview = () => {
    uni.navigateTo({ url: `/pages-sub/order/review?no=${order.value.no}` });
};
</script>

<template>
    <view class="order-detail">
        <!-- ============== 顶部 ============== -->
        <view class="order-detail__header">
            <view class="order-detail__back" @tap="onBack">
                <hy-icon
                    :name="IconConfig.LEFT"
                    size="36rpx"
                    color="#1a1a1a"
                />
            </view>
            <text class="order-detail__title">{{ t('detailsTitle') }}</text>
        </view>

        <!-- ============== 状态条 ============== -->
        <view class="status-bar" :class="`status-bar--${order.status}`">
            <text class="status-bar__no">
                {{ t('orderNo', { no: order.no }) }}
            </text>
            <text class="status-bar__status">{{ statusText }}</text>
        </view>

        <!-- ============== 收货地址 ============== -->
        <view class="address-card">
            <text class="address-card__title">
                {{ t('shippingAddress') }}
            </text>
            <text class="address-card__name">
                {{ t('addressName') }} · {{ t('addressPhone') }}
            </text>
            <text class="address-card__detail">
                {{ t('addressDetail') }}
            </text>
        </view>

        <!-- ============== 商品列表 ============== -->
        <view class="goods-card">
            <view
                v-for="product in order.products"
                :key="product.id"
                class="goods-row"
            >
                <hy-image
                    :src="product.image"
                    width="140rpx"
                    height="140rpx"
                    radius="20rpx"
                    mode="aspectFill"
                    lazy-load
                />
                <view class="goods-row__info">
                    <text class="goods-row__name">{{ product.name }}</text>
                    <text class="goods-row__spec">{{ product.spec }}</text>
                    <text class="goods-row__price">
                        $ {{ product.price.toFixed(2) }}
                    </text>
                </view>
            </view>
        </view>

        <!-- ============== 金额汇总 ============== -->
        <view class="summary-card">
            <view class="summary-row">
                <text class="summary-row__label">
                    {{ t('productPrice') }}
                </text>
                <text class="summary-row__value">
                    $ {{ order.total.toFixed(2) }}
                </text>
            </view>
            <view class="summary-row">
                <text class="summary-row__label">
                    {{ t('shippingFee') }}
                </text>
                <text class="summary-row__value summary-row__value--green">
                    {{ t('free') }}
                </text>
            </view>
            <view class="summary-row summary-row--total">
                <text class="summary-row__label summary-row__label--bold">
                    {{ t('total') }}
                </text>
                <text class="summary-row__subtotal">
                    $ {{ order.total.toFixed(2) }}
                </text>
            </view>
        </view>

        <!-- ============== 底部操作 ============== -->
        <view class="order-detail__footer">
            <view
                v-if="isProcessing"
                class="footer-btn footer-btn--ghost"
                @tap="onCancel"
            >
                {{ t('cancelOrder') }}
            </view>
            <view
                v-if="isProcessing"
                class="footer-btn footer-btn--primary"
                @tap="onTracking"
            >
                {{ t('tracking') }}
            </view>
            <view
                v-if="order.status === 'completed'"
                class="footer-btn footer-btn--primary footer-btn--single"
                @tap="onReview"
            >
                {{ t('writeReview') }}
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.order-detail {
    min-height: 100vh;
    padding: calc(var(--status-bar-height) + 40rpx) 40rpx
        calc(200rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
    background-color: #ffffff;

    &__header {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80rpx;
    }

    &__back {
        position: absolute;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56rpx;
        height: 56rpx;
    }

    &__title {
        font-size: 36rpx;
        font-weight: 700;
        color: $flux-text-primary;
    }

    &__footer {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 10;
        display: flex;
        gap: 24rpx;
        padding: 24rpx 40rpx calc(24rpx + env(safe-area-inset-bottom));
        background-color: #ffffff;
        border-top: 2rpx solid #f1f2f3;
    }
}

/* 状态条 */
.status-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40rpx;
    padding: 28rpx 32rpx;
    background-color: #fafafa;
    border-radius: $flux-radius-lg;

    &--processing {
        background-color: rgba(80, 138, 123, 0.1);
    }

    &--cancelled {
        background-color: rgba(152, 27, 31, 0.08);
    }

    &__no {
        font-size: 26rpx;
        font-weight: 600;
        color: $flux-text-primary;
    }

    &__status {
        font-size: 26rpx;
        font-weight: 700;
        color: #508a7b;

        .status-bar--cancelled & {
            color: #981b1f;
        }
    }
}

/* 地址卡片 */
.address-card {
    margin-top: 32rpx;
    padding: 32rpx;
    background-color: #ffffff;
    border: 1rpx solid #fbfbfb;
    border-radius: $flux-radius-xl;
    box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.05);

    &__title {
        display: block;
        margin-bottom: 16rpx;
        font-size: 26rpx;
        font-weight: 700;
        color: $flux-text-primary;
    }

    &__name {
        display: block;
        font-size: 26rpx;
        font-weight: 600;
        color: rgba(51, 48, 46, 0.7);
    }

    &__detail {
        display: block;
        margin-top: 8rpx;
        font-size: 24rpx;
        line-height: 36rpx;
        color: #8a8a8f;
    }
}

/* 商品卡片 */
.goods-card {
    margin-top: 32rpx;
    padding: 8rpx 32rpx;
    background-color: #ffffff;
    border: 1rpx solid #fbfbfb;
    border-radius: $flux-radius-xl;
    box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.05);
}

.goods-row {
    display: flex;
    gap: 24rpx;
    padding: 24rpx 0;

    &__info {
        display: flex;
        flex: 1;
        flex-direction: column;
        min-width: 0;
        gap: 6rpx;
    }

    &__name {
        font-size: 26rpx;
        font-weight: 600;
        color: $flux-text-primary;
    }

    &__spec {
        font-size: 20rpx;
        color: #8a8a8f;
    }

    &__price {
        font-size: 28rpx;
        font-weight: 700;
        color: $flux-text-primary;
    }
}

/* 金额汇总 */
.summary-card {
    margin-top: 32rpx;
    padding: 32rpx;
    background-color: #ffffff;
    border: 1rpx solid #fbfbfb;
    border-radius: $flux-radius-xl;
    box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.05);
}

.summary-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16rpx;

    &:last-child {
        margin-bottom: 0;
    }

    &__label {
        font-size: 26rpx;
        color: #8a8a8f;

        &--bold {
            font-weight: 700;
            color: $flux-text-primary;
        }
    }

    &__value {
        font-size: 26rpx;
        font-weight: 600;
        color: $flux-text-primary;

        &--green {
            color: #508a7b;
        }
    }

    &__subtotal {
        font-size: 36rpx;
        font-weight: 700;
        color: $flux-text-primary;
    }

    &--total {
        padding-top: 24rpx;
        border-top: 2rpx solid #f1f2f3;
    }
}

/* 底部按钮 */
.footer-btn {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 88rpx;
    font-size: 28rpx;
    font-weight: 700;
    border-radius: 100rpx;

    &:active {
        opacity: 0.85;
    }

    &--ghost {
        color: rgba(51, 48, 46, 0.7);
        border: 2rpx solid rgba(51, 48, 46, 0.15);
    }

    &--primary {
        color: #ffffff;
        background-color: #343434;
    }
}
</style>
