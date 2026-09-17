<script setup lang="ts">
import { computed, ref } from 'vue';
import { IconConfig, useToast, useTranslate } from '@hy-app/ui';
import { onLoad } from '@dcloudio/uni-app';
import { mockOrders } from './components/data';
import type { OrderProduct } from './components/types';

/**
 * 评价商品（常规订单流程占位实现，待 Figma 设计稿校准）
 */
definePage({
    style: {
        navigationStyle: 'custom',
        navigationBarTextStyle: 'black',
    },
});

const { t } = useTranslate('order');
const toast = useToast();

/** 订单号与商品 */
const orderNo = ref('');
const products = ref<OrderProduct[]>([]);

onLoad((options) => {
    orderNo.value = options?.no ?? '';
    const order = mockOrders.find((item) => item.no === orderNo.value);
    if (order) products.value = order.products;
});

/** 满星数 */
const FULL_STARS = 5;

/** 每个商品的评分与内容 */
const ratings = ref<Record<number, number>>({});
const content = ref('');

/** 是否可提交 */
const canSubmit = computed(
    () => products.value.every((p) => (ratings.value[p.id] ?? 0) > 0),
);

// ============== 事件 ==============

const onBack = () => {
    uni.navigateBack();
};

/** 选择星级 */
const onSelectRating = (productId: number, star: number) => {
    ratings.value = { ...ratings.value, [productId]: star };
};

/** 提交评价 */
const onSubmit = () => {
    if (!canSubmit.value) return;
    toast.success(t('reviewSuccess'));
    setTimeout(() => {
        uni.navigateBack();
    }, 1200);
};
</script>

<template>
    <view class="review-page">
        <!-- ============== 顶部 ============== -->
        <view class="review-page__header">
            <view class="review-page__back" @tap="onBack">
                <hy-icon
                    :name="IconConfig.LEFT"
                    size="36rpx"
                    color="#1a1a1a"
                />
            </view>
            <text class="review-page__title">{{ t('reviewTitle') }}</text>
        </view>

        <!-- ============== 商品评分 ============== -->
        <view class="review-goods">
            <view
                v-for="product in products"
                :key="product.id"
                class="review-goods__item"
            >
                <hy-image
                    :src="product.image"
                    width="140rpx"
                    height="140rpx"
                    radius="20rpx"
                    mode="aspectFill"
                    lazy-load
                />
                <view class="review-goods__info">
                    <text class="review-goods__name">{{ product.name }}</text>
                    <view class="review-goods__stars">
                        <hy-icon
                            v-for="i in FULL_STARS"
                            :key="i"
                            :name="IconConfig.STAR_FILL"
                            size="36rpx"
                            :color="
                                i <= (ratings[product.id] ?? 0)
                                    ? '#ffc529'
                                    : '#eff0f1'
                            "
                            @tap="onSelectRating(product.id, i)"
                        />
                    </view>
                </view>
            </view>
        </view>

        <!-- ============== 评价内容 ============== -->
        <view class="review-content">
            <textarea
                v-model="content"
                class="review-content__input"
                :placeholder="t('reviewPlaceholder')"
                placeholder-class="review-placeholder"
                :maxlength="500"
            />
        </view>

        <!-- ============== 底部提交 ============== -->
        <view
            class="review-page__footer"
            :class="{ 'is-disabled': !canSubmit }"
            @tap="onSubmit"
        >
            {{ t('submitReview') }}
        </view>
    </view>
</template>

<style lang="scss" scoped>
.review-page {
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
        right: 40rpx;
        bottom: calc(40rpx + env(safe-area-inset-bottom));
        left: 40rpx;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 96rpx;
        font-size: 32rpx;
        font-weight: 700;
        color: #ffffff;
        background-color: #343434;
        border-radius: 48rpx;

        &:active {
            opacity: 0.9;
        }

        &.is-disabled {
            opacity: 0.4;
        }
    }
}

/* 商品评分 */
.review-goods {
    display: flex;
    flex-direction: column;
    gap: 32rpx;
    margin-top: 48rpx;

    &__item {
        display: flex;
        align-items: center;
        gap: 24rpx;
    }

    &__info {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 16rpx;
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

    &__stars {
        display: flex;
        align-items: center;
        gap: 12rpx;
    }
}

/* 评价内容 */
.review-content {
    margin-top: 48rpx;

    &__input {
        width: 100%;
        height: 260rpx;
        padding: 28rpx 32rpx;
        font-size: 26rpx;
        color: $flux-text-primary;
        background-color: #f7f7f8;
        border-radius: $flux-radius-md;
        box-sizing: border-box;
    }
}

:deep(.review-placeholder) {
    color: #cbcdd8;
}
</style>
