<script setup lang="ts">
import { computed } from 'vue';
import { useTranslate } from '@hy-app/ui';
import type { OrderItem, OrderStatus } from './types';

/**
 * 我的订单列表：订单卡片（订单号 / 状态 / 商品 / 合计 / 操作按钮）
 */
const props = defineProps<{
    /** 订单列表 */
    orders: OrderItem[];
}>();

const emit = defineEmits<{
    (e: 'view-details', order: OrderItem): void;
    (e: 'reorder', order: OrderItem): void;
    (e: 'cancel', order: OrderItem): void;
}>();

const { t } = useTranslate('order');

/** 状态文案 */
const statusTextMap = computed<Record<OrderStatus, string>>(() => ({
    processing: t('statusProcessing'),
    completed: t('statusCompleted'),
    cancelled: t('statusCancelled'),
}));
</script>

<template>
    <view class="order-list">
        <hy-card
            v-for="order in props.orders"
            :key="order.no"
            show-head
            box-shadow
            @click="emit('view-details', order)"
        >
            <template #header>
                <hy-flex justify="space-between">
                    <text class="order-card__no">
                        {{ t('orderNo', { no: order.no }) }}
                    </text>
                    <text
                        class="order-card__status"
                        :class="`order-card__status--${order.status}`"
                    >
                        {{ statusTextMap[order.status] }}
                    </text>
                </hy-flex>
            </template>

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

            <template #footer>
                <hy-flex align="center">
                    <view class="order-card__total">
                        <text class="order-card__total-label">
                            {{ t('total') }}
                        </text>
                        <text class="order-card__total-value">
                            $ {{ order.total.toFixed(2) }}
                        </text>
                    </view>
                    <hy-flex gap="10">
                        <hy-button
                            v-if="order.status === 'processing'"
                            :text="t('cancelOrder')"
                            plain
                            shape="circle"
                            size="small"
                            @tap.stop="emit('cancel', order)"
                        >
                        </hy-button>
                        <hy-button
                            :text="t('reorder')"
                            shape="circle"
                            size="small"
                            @tap.stop="emit('reorder', order)"
                        >
                        </hy-button>
                    </hy-flex>
                </hy-flex>
            </template>
        </hy-card>
    </view>
</template>

<style lang="scss" scoped>
/* 订单卡片 */
.order-list {
    display: flex;
    flex-direction: column;
    gap: 32rpx;
    margin-top: 40rpx;
}

.order-card {
    &__no {
        font-size: 26rpx;
        font-weight: 700;
        color: $hy-text-color;
    }

    &__status {
        font-size: 24rpx;
        font-weight: 600;

        &--processing {
            color: $hy-warning;
        }

        &--completed {
            color: $hy-success;
        }

        &--cancelled {
            color: $hy-error;
        }
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
</style>
