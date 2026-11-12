<script setup lang="ts">
import { ref } from 'vue';
import type { CartItem } from './types';

const props = defineProps<{
    /** 购物车条目 */
    items: CartItem[];
}>();

const emit = defineEmits<{
    (e: 'change', id: number, quantity: number): void;
}>();

/** 选中颜色（默认勾选第一项） */
const checkedValue = ref<string[]>([]);

/** 最小数量 */
const MIN_QUANTITY = 1;

/** 减少数量 */
const onDecrease = (item: CartItem) => {
    if (item.quantity <= MIN_QUANTITY) return;
    emit('change', item.id, item.quantity - 1);
};

/** 增加数量 */
const onIncrease = (item: CartItem) => {
    emit('change', item.id, item.quantity + 1);
};

/** 跳转详情页面 */
const toProductDetailPage = () => {
    uni.navigateTo({
        url: '/pages-sub/product/details/Index',
    });
};
</script>

<template>
    <hy-checkbox-group
        v-model="checkedValue"
        placement="column"
        :icon-size="10"
        active-color="#508A7B"
    >
        <view
            class="cart-item"
            v-for="item in items"
            :key="item.id"
            @tap="toProductDetailPage"
        >
            <!-- ============== 商品图 ============== -->
            <hy-image
                :src="item.image"
                width="196rpx"
                radius="40rpx"
                mode="widthFix"
                bg-color="#FFFBF8"
                lazy-load
                :custom-style="{ height: '198rpx' }"
            />

            <!-- ============== 信息区 ============== -->
            <view class="cart-item__body">
                <text class="cart-item__name">{{ item.name }}</text>
                <text class="cart-item__spec">{{ item.spec }}</text>

                <view class="cart-item__footer">
                    <text class="cart-item__price">
                        $ {{ item.price.toFixed(2) }}
                    </text>

                    <!-- 数量胶囊 -->
                    <view class="quantity-capsule">
                        <view
                            class="quantity-capsule__btn"
                            @tap.stop="onDecrease(item)"
                        >
                            -
                        </view>
                        <text class="quantity-capsule__num">
                            {{ item.quantity }}
                        </text>
                        <view
                            class="quantity-capsule__btn"
                            @tap.stop="onIncrease(item)"
                        >
                            +
                        </view>
                    </view>
                </view>
            </view>

            <!-- ============== 颜色勾选（原角标色块） ============== -->
            <view class="cart-item__colors">
                <hy-checkbox-item />
            </view>
        </view>
    </hy-checkbox-group>
</template>

<style lang="scss" scoped>
.cart-item {
    position: relative;
    display: flex;
    padding: 0;
    background-color: $hy-background--2;
    border: 1rpx solid $hy-background--3;
    border-radius: 40rpx;
    box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.05);
    margin-bottom: 30rpx;

    &__body {
        display: flex;
        flex: 1;
        flex-direction: column;
        min-width: 0;
        padding: 24rpx 60rpx 20rpx 24rpx;
    }

    &__name {
        font-size: 26rpx;
        font-weight: 700;
        color: $hy-text-color;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__spec {
        margin-top: 8rpx;
        font-size: 20rpx;
        color: $hy-text-color--3;
    }

    &__footer {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-top: 20rpx;
    }

    &__price {
        font-size: $hy-font-size-md;
        font-weight: 700;
        color: $hy-text-color;
    }

    &__colors {
        position: absolute;
        top: 16rpx;
        right: 16rpx;
        display: flex;
        flex-direction: column;
        gap: 8rpx;
    }
}

/* 数量胶囊 */
.quantity-capsule {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 168rpx;
    height: 48rpx;
    padding: 0 16rpx;
    border: $hy-border-line;
    border-radius: 40rpx;
    box-sizing: border-box;

    &__btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40rpx;
        height: 40rpx;
        font-size: 28rpx;
        color: $hy-text-color;

        &:active {
            opacity: 0.5;
        }
    }

    &__num {
        min-width: 32rpx;
        font-size: 24rpx;
        text-align: center;
        color: $hy-text-color;
    }
}
</style>
