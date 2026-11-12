<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTranslate } from '@hy-app/ui';
import { onLoad } from '@dcloudio/uni-app';
import { mockOrders } from './components/data';
import type { OrderItem } from './components/types';
import Navbar from '@/components/Navbar.vue';
import Icon from '@/components/Icon.vue';

/**
 * 物流跟踪
 * 标题栏 → 送达时间与运单号 → 竖向虚线时间线（最新节点实心点）→ 评分提示卡
 */
definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('order');

/** 当前订单 */
const order = ref<OrderItem>(mockOrders[0]);

onLoad(options => {
    const found = mockOrders.find(item => item.no === options?.no);
    if (found) order.value = found;
});

/** 物流节点 */
interface TrackNode {
    /** 节点文案 */
    title: string;
    /** 节点时间（设计稿静态物流数据） */
    time: string;
    /** 是否最新节点（实心圆点，其余为对勾） */
    latest: boolean;
}

/** 物流动态：最新节点在上 */
const trackNodes = computed<TrackNode[]>(() => [
    { title: t('trackDeliveredOk'), time: '15 May 10:20', latest: true },
    { title: t('trackOutForDelivery'), time: '14 May 08:00', latest: false },
    { title: t('trackAtBranch'), time: '13 May 17:25', latest: false },
    { title: t('trackInTransit'), time: '13 May 07:00', latest: false },
    { title: t('trackShippedBySender'), time: '12 May 14:25', latest: false },
    { title: t('trackPreparing'), time: '12 May 10:01', latest: false },
]);

/** 送达日期（YYYY-MM-DD → DD.MM.YY） */
const deliveredDate = computed(() => {
    const [year, month, day] = (order.value.date ?? '').split('-');
    return year ? `${day}.${month}.${year.slice(2)}` : '';
});

/** 运单号 */
const trackingNo = computed(() => order.value.trackingNo || '-');

/** 评分星星数量 */
const rateStars = 5;

// ============== 事件 ==============

const onBack = () => {
    uni.navigateBack();
};

/** 去评价 */
const onRate = () => {
    uni.navigateTo({ url: `/pages-sub/order/review?no=${order.value.no}` });
};
</script>

<template>
    <view class="track-page">
        <!-- ============== 顶部：返回 + 标题 ============== -->
        <navbar :title="t('trackingTitle')"></navbar>

        <!-- ============== 送达时间 + 运单号 ============== -->
        <view class="track-summary">
            <text class="track-summary__delivered">
                <text class="track-summary__label">
                    {{ t('deliveredOn') }} :
                </text>
                <text class="track-summary__date">{{ deliveredDate }}</text>
            </text>
            <view class="track-summary__row">
                <text class="track-summary__label">
                    {{ t('trackingNumber') }} :
                </text>
                <text class="track-summary__value">{{ trackingNo }}</text>
            </view>
        </view>

        <!-- ============== 物流时间线 ============== -->
        <view class="timeline">
            <view
                v-for="(node, index) in trackNodes"
                :key="index"
                class="timeline__row"
                :class="{ 'is-compact': index >= 3 }"
            >
                <!-- 节点圆点 / 对勾 / 虚线 -->
                <view class="timeline__rail">
                    <view class="timeline__circle">
                        <view v-if="node.latest" class="timeline__dot"></view>
                        <Icon v-else name="xuanze" size="11"></Icon>
                    </view>
                    <view
                        v-if="index < trackNodes.length - 1"
                        class="timeline__dots"
                    >
                        <view
                            v-for="dot in 3"
                            :key="dot"
                            class="timeline__dots-item"
                        ></view>
                    </view>
                </view>

                <!-- 节点内容 -->
                <view class="timeline__content">
                    <text class="timeline__text">{{ node.title }}</text>
                    <text class="timeline__time">{{ node.time }}</text>
                </view>
            </view>
        </view>

        <!-- ============== 评分提示卡 ============== -->
        <hy-card
            :border-radius="10"
            padding="0"
            margin="116rpx 0 0"
            box-shadow
            :show-head="false"
            :show-foot="false"
            @click="onRate"
        >
            <view class="rate-card">
                <view class="rate-card__art">
                    <Icon
                        name="star-yellow"
                        color="yellow"
                        size="18"
                        custom-class="rate-card__art-star rate-card__art-star--left"
                    ></Icon>
                    <Icon
                        name="star-yellow"
                        color="yellow"
                        size="18"
                        custom-class="rate-card__art-star rate-card__art-star--top"
                    ></Icon>
                    <Icon
                        name="star-yellow"
                        color="yellow"
                        size="18"
                        custom-class="rate-card__art-star rate-card__art-star--right"
                    ></Icon>
                    <Icon
                        name="thumb-up"
                        size="33"
                        custom-class="rate-card__art-thumb"
                    ></Icon>
                </view>

                <text class="rate-card__title">{{ t('dontForgetRate') }}</text>
                <text class="rate-card__desc">{{
                    t('bannerDeliveredSub')
                }}</text>
                <view class="rate-card__stars">
                    <hy-rate
                        v-model="rateStars"
                        active-color="#777E90"
                    ></hy-rate>
                </view>
            </view>
        </hy-card>
    </view>
</template>

<style lang="scss" scoped>
.track-page {
    box-sizing: border-box;
    min-height: 100vh;
    padding: 60rpx 68rpx calc(60rpx + env(safe-area-inset-bottom));
}

/* 送达时间 + 运单号 */
.track-summary {
    &__delivered {
        display: block;
        font-size: 24rpx;
        line-height: 30rpx;
    }

    &__row {
        display: flex;
        align-items: center;
        margin-top: 32rpx;
    }

    &__label {
        font-size: 24rpx;
        line-height: 30rpx;
        color: $hy-text-color--grey;
    }

    &__value {
        margin-left: 2rpx;
        font-size: 28rpx;
        line-height: 40rpx;
    }
}

/* 物流时间线 */
.timeline {
    margin-top: 76rpx;

    &__row {
        display: flex;
        align-items: flex-start;
        min-height: 112rpx;

        &.is-compact {
            min-height: 106rpx;
        }

        &:last-child {
            min-height: 0;
        }
    }

    &__rail {
        display: flex;
        flex-shrink: 0;
        flex-direction: column;
        align-items: center;
        width: 34rpx;
    }

    &__circle {
        display: flex;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 34rpx;
        height: 34rpx;
        border: 2rpx solid $hy-text-color;
        border-radius: $hy-radius-circle;
    }

    &__dot {
        width: 22rpx;
        height: 22rpx;
        background-color: $hy-text-color;
        border-radius: $hy-radius-circle;
    }

    &__dots {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 12rpx;
    }

    &__dots-item {
        width: 8rpx;
        height: 8rpx;
        background-color: $hy-text-color;

        border-radius: $hy-radius-circle;

        & + & {
            margin-top: 12rpx;
        }
    }

    &__content {
        display: flex;
        flex: 1;
        justify-content: space-between;
        min-width: 0;
        padding-top: 2rpx;
        margin-left: 24rpx;
    }

    &__text {
        flex: 1;
        min-width: 0;
        font-size: 24rpx;
        line-height: 30rpx;
    }

    &__time {
        flex-shrink: 0;
        margin-left: 16rpx;
        font-size: 24rpx;
        line-height: 30rpx;
        color: $hy-text-color--grey;
    }
}

/* 评分提示卡（容器外观由 hy-card 提供） */
.rate-card {
    position: relative;
    height: 184rpx;

    &:active {
        opacity: 0.92;
    }

    &__art {
        position: absolute;
        top: 42rpx;
        left: 36rpx;
        width: 98rpx;
        height: 98rpx;
    }

    &__art-star {
        position: absolute;
        width: 32rpx;
        height: 31rpx;

        &--left {
            top: 11rpx;
            left: -5rpx;
        }

        &--top {
            top: -10rpx;
            left: 33rpx;
        }

        &--right {
            top: 11rpx;
            left: 74rpx;
        }
    }

    &__art-thumb {
        position: absolute;
        top: 42rpx;
        left: 18rpx;
        width: 45rpx;
        height: 63rpx;
    }

    &__title {
        position: absolute;
        top: 28rpx;
        left: 180rpx;
        font-size: 24rpx;
        font-weight: 700;
        line-height: 36rpx;
    }

    &__desc {
        position: absolute;
        top: 60rpx;
        left: 180rpx;
        width: 412rpx;
        font-size: 20rpx;
        font-weight: 300;
        line-height: 24rpx;
        color: $hy-text-color--grey;
    }

    &__stars {
        position: absolute;
        top: 116rpx;
        left: 172rpx;
        display: flex;
    }

    &__star {
        width: 48rpx;
        height: 48rpx;
    }
}
</style>
