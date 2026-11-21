<script setup lang="ts">
import { computed, ref } from 'vue';
import { useToast, useTranslate } from '@hy-app/ui';
import { onLoad } from '@dcloudio/uni-app';
import { mockOrders } from './components/data';
import { Config } from '@/config';
import type { OrderItem } from './components/types';
import Navbar from '@/components/Navbar.vue';

/**
 * 订单详情
 */
definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('order');
const toast = useToast();

/** 当前订单 */
const order = ref<OrderItem>(mockOrders[0]);

onLoad(options => {
    const no = options?.no;
    const found = mockOrders.find(item => item.no === no);
    if (found) order.value = found;
});

/** 是否已送达（completed） */
const isDelivered = computed(() => order.value.status === 'completed');

/** 状态横幅主/副文案 */
const banner = computed(() =>
    isDelivered.value
        ? { title: t('bannerDelivered'), sub: t('bannerDeliveredSub') }
        : { title: t('bannerOnway'), sub: t('bannerOnwaySub') }
);

/** 横幅右侧图标（送达 → 成功；配送中 → 导航） */
const bannerIcon = computed(() =>
    isDelivered.value
        ? `${Config.IMG2}/icon_01.png`
        : `${Config.IMG2}/icon_02.png`
);

/** 订单信息行（左 label / 右 value） */
const infoRows = computed(() => [
    { label: t('orderNumber'), value: `#${order.value.no}` },
    { label: t('trackingNumber'), value: order.value.trackingNo ?? '-' },
    { label: t('deliveryAddress'), value: order.value.address ?? '-' },
]);

/** 商品金额小计 */
const subtotal = computed(() =>
    order.value.products.reduce(
        (sum, p) => sum + p.price * (p.quantity ?? 1),
        0
    )
);

// ============== 事件 ==============

const onBack = () => {
    uni.navigateBack();
};

/** 配送中横幅点击 → 物流跟踪 */
const onBannerTap = () => {
    if (isDelivered.value) return;
    uni.navigateTo({ url: `/pages-sub/order/tracking?no=${order.value.no}` });
};

/** 返回首页 */
const onReturnHome = () => {
    uni.switchTab({ url: '/pages/index/Index' });
};

/** 去评价 */
const onRate = () => {
    uni.navigateTo({ url: `/pages-sub/order/review?no=${order.value.no}` });
};

/** 继续购物（返回首页） */
const onContinueShopping = () => {
    toast.success(t('continueShopping'));
    onReturnHome();
};
</script>

<template>
    <view class="order-detail">
        <!-- ============== 顶部：返回 + 订单号 ============== -->
        <navbar :title="t('detailNo', { no: order.no })"></navbar>

        <!-- ============== 状态横幅（配送中可点击跳转跟踪） ============== -->
        <view class="status-banner" @tap="onBannerTap">
            <view class="status-banner__text">
                <text class="status-banner__title">
                    {{ banner.title }}
                </text>
                <text class="status-banner__sub">
                    {{ banner.sub }}
                </text>
            </view>
            <hy-image
                :src="bannerIcon"
                width="50"
                height="50"
                mode="aspectFit"
            />
        </view>

        <!-- ============== 订单信息卡 ============== -->
        <hy-card :border-radius="10" padding="0" margin="32rpx 0 0">
            <hy-cell :border="false" :is-right-icon="false">
                <hy-cell-item
                    v-for="row in infoRows"
                    :key="row.label"
                    :title="row.label"
                    :border="false"
                >
                    <template #value>
                        <text class="cell-value">{{ row.value }}</text>
                    </template>
                </hy-cell-item>
            </hy-cell>
        </hy-card>

        <!-- ============== 商品与金额汇总卡 ============== -->
        <hy-card
            :border-radius="10"
            padding="0"
            margin="32rpx 0 0"
            foot-border-top
        >
            <hy-cell :border="false" :is-right-icon="false">
                <hy-cell-item
                    v-for="product in order.products"
                    :key="product.id"
                    :title="product.name"
                    :border="false"
                >
                    <template #value>
                        <view class="goods-meta">
                            <text class="goods-meta__qty">
                                x{{ product.quantity ?? 1 }}
                            </text>
                            <text class="goods-meta__price">
                                $ {{ product.price.toFixed(2) }}
                            </text>
                        </view>
                    </template>
                </hy-cell-item>

                <hy-cell-item
                    :title="t('subTotal')"
                    :value="subtotal.toFixed(2)"
                    :border="false"
                />
                <hy-cell-item
                    :title="t('shippingFee')"
                    value="0.00"
                    :border="false"
                />
            </hy-cell>

            <template #footer>
                <hy-cell :border="false" :is-right-icon="false">
                    <hy-cell-item :title="t('total')" :border="false">
                        <template #value>
                            <text class="total-value">
                                $ {{ order.total.toFixed(2) }}
                            </text>
                        </template>
                    </hy-cell-item>
                </hy-cell>
            </template>
        </hy-card>

        <!-- ============== 底部操作（随状态变化） ============== -->
        <view class="order-detail__footer">
            <hy-flex gap="10">
                <template v-if="isDelivered">
                    <hy-button
                        shape="circle"
                        type="info"
                        plain
                        :text="t('returnHome')"
                        :custom-style="{ flex: 1 }"
                        @click="onReturnHome"
                    />
                    <hy-button
                        shape="circle"
                        color="#343434"
                        :text="t('rate')"
                        :custom-style="{ flex: 1 }"
                        @click="onRate"
                    />
                </template>
                <hy-button
                    v-else-if="order.status === 'processing'"
                    shape="circle"
                    color="#343434"
                    :text="t('continueShopping')"
                    :custom-style="{ flex: 1 }"
                    @click="onContinueShopping"
                />
                <hy-button
                    v-else
                    shape="circle"
                    color="#343434"
                    :text="t('returnHome')"
                    :custom-style="{ flex: 1 }"
                    @click="onReturnHome"
                />
            </hy-flex>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.order-detail {
    min-height: 100vh;
    box-sizing: border-box;
    padding: calc(var(--status-bar-height) + 40rpx) 30rpx
        calc(180rpx + env(safe-area-inset-bottom));

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
        width: 72rpx;
        height: 72rpx;
    }

    &__title {
        font-size: 36rpx;
        font-weight: 700;
        color: $hy-text-color--2;
    }

    &__footer {
        position: fixed;
        right: 50rpx;
        bottom: calc(40rpx + env(safe-area-inset-bottom));
        left: 50rpx;
        z-index: 10;
    }
}

/* 状态横幅 */
.status-banner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 40rpx;
    padding: 40rpx;
    background-color: #575757;
    border-radius: 20rpx;

    &:active {
        opacity: 0.92;
    }

    &__text {
        display: flex;
        flex: 1;
        flex-direction: column;
        min-width: 0;
        margin-right: 32rpx;
    }

    &__title {
        font-size: 32rpx;
        font-weight: 700;
        letter-spacing: -0.5rpx;
        color: var(--hy-text-color--inverse, #ffffff);
    }

    &__sub {
        margin-top: 12rpx;
        font-size: 20rpx;
        font-weight: 600;
        line-height: 32rpx;
        letter-spacing: -0.5rpx;
        color: var(--hy-text-color--inverse, #ffffff);
    }
}

/* 单元格文字 */
.cell-value {
    display: block;
    max-width: 360rpx;
    font-size: 24rpx;
    font-weight: 500;
    text-align: right;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

/* 商品数量与单价 */
.goods-meta {
    display: flex;
    align-items: center;
    gap: 28rpx;

    &__qty {
        font-size: 26rpx;
        font-weight: 300;
        color: $hy-text-color;
    }

    &__price {
        font-size: 32rpx;
        font-weight: 500;
        color: $hy-text-color;
    }
}

/* 合计金额 */
.total-value {
    font-size: 32rpx;
    font-weight: 700;
    color: $hy-text-color;
}

/* hy-cell-item 默认值文字为灰色，统一为主题文字色 */
.order-detail {
    :deep(.hy-cell-item__center--value) {
        color: $hy-text-color;
    }
}
</style>
