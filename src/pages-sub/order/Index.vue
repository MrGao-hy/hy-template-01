<script setup lang="ts">
import { computed, ref } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';
import { mockOrders } from './components/data';
import type { OrderItem, OrderStatus } from './components/types';

/**
 * 我的订单列表（Figma 节点 2251/2377/2403/2942/3008 因限流未获取，
 * 按 FluxStore 常规订单流程实现，待设计稿校准）
 */
definePage({
    style: {
        navigationStyle: 'custom'
    },
});

const { t } = useTranslate('order');

/** 状态 Tab 键 */
type TabKey = 'all' | OrderStatus;

/** Tab 配置 */
const tabs = computed<{ key: TabKey; label: string }[]>(() => [
    { key: 'all', label: t('tabAll') },
    { key: 'processing', label: t('tabProcessing') },
    { key: 'completed', label: t('tabCompleted') },
    { key: 'cancelled', label: t('tabCancelled') },
]);

const activeTab = ref<TabKey>('all');

/** 当前 Tab 订单列表 */
const filteredOrders = computed<OrderItem[]>(() => {
    if (activeTab.value === 'all') return mockOrders;
    return mockOrders.filter((o) => o.status === activeTab.value);
});

/** 状态文案 */
const statusTextMap = computed<Record<OrderStatus, string>>(() => ({
    processing: t('statusProcessing'),
    completed: t('statusCompleted'),
    cancelled: t('statusCancelled'),
}));

// ============== 事件 ==============

/** 返回上一页 */
const onBack = () => {
    uni.navigateBack();
};

/** 切换 Tab */
const onTabChange = (key: TabKey) => {
    activeTab.value = key;
};

/** 查看订单详情 */
const onViewDetails = (order: OrderItem) => {
    uni.navigateTo({
        url: `/pages-sub/order/details?no=${order.no}`,
    });
};

/** 再次购买 → 商品详情 */
const onReorder = (_order: OrderItem) => {
    uni.navigateTo({ url: '/pages-sub/product/details/Index' });
};
</script>

<template>
    <view class="order-page">
        <!-- ============== 顶部：返回 + 标题 ============== -->
        <view class="order-page__header">
            <view class="order-page__back" @tap="onBack">
                <hy-icon
                    :name="IconConfig.LEFT"
                    size="36rpx"
                    color="#1a1a1a"
                />
            </view>
            <text class="order-page__title">{{ t('title') }}</text>
        </view>

        <!-- ============== 状态 Tab ============== -->
        <view class="order-tabs">
            <view
                v-for="tab in tabs"
                :key="tab.key"
                class="order-tabs__item"
                :class="{ 'is-active': activeTab === tab.key }"
                @tap="onTabChange(tab.key)"
            >
                {{ tab.label }}
            </view>
        </view>

        <!-- ============== 订单列表 ============== -->
        <view v-if="filteredOrders.length" class="order-list">
            <view
                v-for="order in filteredOrders"
                :key="order.no"
                class="order-card"
                @tap="onViewDetails(order)"
            >
                <view class="order-card__head">
                    <text class="order-card__no">
                        {{ t('orderNo', { no: order.no }) }}
                    </text>
                    <text
                        class="order-card__status"
                        :class="`order-card__status--${order.status}`"
                    >
                        {{ statusTextMap[order.status] }}
                    </text>
                </view>

                <!-- 商品缩略行 -->
                <view
                    v-for="product in order.products"
                    :key="product.id"
                    class="order-product"
                >
                    <hy-image
                        :src="product.image"
                        width="120rpx"
                        height="120rpx"
                        radius="20rpx"
                        mode="aspectFill"
                        lazy-load
                    />
                    <view class="order-product__info">
                        <text class="order-product__name">
                            {{ product.name }}
                        </text>
                        <text class="order-product__spec">
                            {{ product.spec }}
                        </text>
                        <text class="order-product__price">
                            $ {{ product.price.toFixed(2) }}
                        </text>
                    </view>
                </view>

                <view class="order-card__footer">
                    <view class="order-card__total">
                        <text class="order-card__total-label">
                            {{ t('total') }}
                        </text>
                        <text class="order-card__total-value">
                            $ {{ order.total.toFixed(2) }}
                        </text>
                    </view>
                    <view
                        v-if="order.status === 'processing'"
                        class="order-card__btn order-card__btn--ghost"
                        @tap.stop="onViewDetails(order)"
                    >
                        {{ t('cancelOrder') }}
                    </view>
                    <view
                        class="order-card__btn order-card__btn--primary"
                        @tap.stop="onReorder(order)"
                    >
                        {{ t('reorder') }}
                    </view>
                </view>
            </view>
        </view>

        <!-- ============== 空状态 ============== -->
        <view v-else class="order-empty">
            <text class="order-empty__text">{{ t('empty') }}</text>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.order-page {
    min-height: 100vh;
    // padding: calc(var(--status-bar-height) + 40rpx) 40rpx
    //     calc(40rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
    background-color: $hy-background;

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
        color: $hy-text-color;
    }
}

/* 状态 Tab */
.order-tabs {
    display: flex;
    gap: 16rpx;
    margin-top: 40rpx;

    &__item {
        padding: 14rpx 36rpx;
        font-size: 26rpx;
        color: rgba(51, 48, 46, 0.7);
        background-color: $hy-background--3;
        border-radius: $hy-radius-base;
        transition: all 0.2s;

        &.is-active {
            color: var(--hy-text-color--inverse, #FFFFFF);
            background-color: #343434;
        }
    }
}

/* 订单卡片 */
.order-list {
    display: flex;
    flex-direction: column;
    gap: 32rpx;
    margin-top: 40rpx;
}

.order-card {
    padding: 32rpx;
    background-color: $hy-background--2;
    border: 1rpx solid $hy-background--3;
    border-radius: $hy-radius-lg;
    box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.05);

    &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__no {
        font-size: 26rpx;
        font-weight: 700;
        color: $hy-text-color;
    }

    &__status {
        font-size: 24rpx;
        font-weight: 600;

        &--processing {
            color: $hy-primary;
        }

        &--completed {
            color: $hy-text-color;
        }

        &--cancelled {
            color: #981b1f;
        }
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 20rpx;
        padding-top: 24rpx;
        margin-top: 8rpx;
        border-top: 2rpx solid $hy-background--empty;
    }

    &__total {
        display: flex;
        flex: 1;
        align-items: baseline;
        gap: 12rpx;
    }

    &__total-label {
        font-size: 24rpx;
        color: $hy-text-color--3;
    }

    &__total-value {
        font-size: 32rpx;
        font-weight: 700;
        color: $hy-text-color;
    }

    &__btn {
        padding: 0 32rpx;
        height: 64rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24rpx;
        font-weight: 600;
        border-radius: 100rpx;

        &:active {
            opacity: 0.8;
        }

        &--ghost {
            color: rgba(51, 48, 46, 0.7);
            border: 2rpx solid rgba(51, 48, 46, 0.15);
        }

        &--primary {
            color: var(--hy-text-color--inverse, #FFFFFF);
            background-color: #343434;
        }
    }
}

.order-product {
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
        color: $hy-text-color;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__spec {
        font-size: 20rpx;
        color: $hy-text-color--3;
    }

    &__price {
        font-size: 28rpx;
        font-weight: 700;
        color: $hy-text-color;
    }
}

/* 空状态 */
.order-empty {
    display: flex;
    justify-content: center;
    padding: 200rpx 0;

    &__text {
        font-size: 28rpx;
        color: $hy-text-color--3;
    }
}
</style>
