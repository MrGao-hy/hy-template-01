<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTranslate } from '@hy-app/ui';
import CartItemCard from './components/CartItemCard.vue';
import type { CartItem } from './components/types';
import { onReady } from '@dcloudio/uni-app';
import { Config } from '@/config';
import Navbar from '@/components/Navbar.vue';

/**
 * 购物车页（Figma: 8782-2168）
 */
definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('cart');

/** 购物车商品（Turtleneck/Cotton 图缺失，复用首页同款图） */
const items = ref<CartItem[]>([
    {
        id: 1,
        name: 'Sportwear Set',
        price: 80.0,
        spec: 'Size: L | Color: Brown',
        image: `${Config.IMG}/good_0.png`,
        badgeColor: '#508A7B',
        colors: ['Cream', 'Green', 'Dark'],
        quantity: 1,
    },
    {
        id: 2,
        name: 'Turtleneck Sweater',
        price: 39.99,
        spec: 'Size: M | Color: White',
        image: `${Config.IMG}/home_swiper_1.png`,
        badgeColor: '#8E8E8E',
        colors: ['Brown', 'Grey'],
        quantity: 1,
    },
    {
        id: 3,
        name: 'Cotton T-shirt',
        price: 30.0,
        spec: 'Size: S | Color: Black',
        image: `${Config.IMG}/home_good_2.png`,
        badgeColor: '#508A7B',
        colors: ['White', 'Black'],
        quantity: 1,
    },
]);

/** 商品总额 */
const productTotal = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
);

// ============== 事件 ==============

/** 数量变化 */
const onQuantityChange = (id: number, quantity: number) => {
    const target = items.value.find(item => item.id === id);
    if (target) target.quantity = quantity;
};

/** 去结算 */
const onCheckout = () => {
    uni.navigateTo({ url: '/pages-sub/checkout/Index' });
};
</script>

<template>
    <view class="cart-page">
        <navbar :title="t('title')"></navbar>

        <!-- ============== 商品列表 ============== -->
        <view class="cart-page__list">
            <cart-item-card :items="items" @change="onQuantityChange" />
        </view>

        <!-- ============== 底部结算栏 ============== -->
        <view class="cart-footer">
            <view class="summary-row">
                <text class="summary-row__label">
                    {{ t('productPrice') }}
                </text>
                <text class="summary-row__value">
                    $ {{ productTotal.toFixed(2) }}
                </text>
            </view>
            <view class="summary-row">
                <text class="summary-row__label">{{ t('shipping') }}</text>
                <text class="summary-row__value summary-row__value--green">
                    {{ t('freeship') }}
                </text>
            </view>

            <view class="cart-footer__divider"></view>

            <view class="summary-row">
                <text class="summary-row__label summary-row__label--bold">
                    {{ t('subtotal') }}
                </text>
                <text class="summary-row__subtotal">
                    $ {{ productTotal.toFixed(2) }}
                </text>
            </view>

            <hy-button
                class="cart-footer__checkout"
                shape="circle"
                color="#343434"
                :text="t('checkout')"
                @click="onCheckout"
            />
        </view>
    </view>
</template>

<style lang="scss" scoped>
.cart-page {
    min-height: 100vh;
    padding: calc(var(--status-bar-height) + 40rpx) 40rpx
        calc(420rpx + env(safe-area-inset-bottom));
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

    &__list {
        display: flex;
        flex-direction: column;
        gap: 32rpx;
    }
}

/* 底部结算栏 */
.cart-footer {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    padding: 32rpx 40rpx calc(24rpx + env(safe-area-inset-bottom));
    background-color: $hy-background--2;
    border-radius: 30rpx 30rpx 0 0;
    box-shadow: 0 -2rpx 20rpx rgba(0, 0, 0, 0.1);
}

.summary-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16rpx;

    &__label {
        font-size: 28rpx;
        color: $hy-text-color--3;

        &--bold {
            font-weight: 700;
            color: $hy-text-color;
        }
    }

    &__value {
        font-size: 28rpx;
        font-weight: 600;
        color: $hy-text-color;

        &--green {
            color: $hy-primary;
        }
    }

    &__subtotal {
        font-size: 40rpx;
        font-weight: 700;
        color: $hy-text-color;
    }
}

.cart-footer {
    &__divider {
        height: 2rpx;
        margin: 24rpx 0;
        background-color: $hy-border-color;
    }
}
</style>
