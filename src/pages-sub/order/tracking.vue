<script setup lang="ts">
import { ref } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';
import { onLoad } from '@dcloudio/uni-app';

/**
 * 物流跟踪（常规订单流程占位实现，待 Figma 设计稿校准）
 */
definePage({
    style: {
        navigationStyle: 'custom',
        navigationBarTextStyle: 'black',
    },
});

const { t } = useTranslate('order');

/** 订单号 */
const orderNo = ref('');

onLoad((options) => {
    orderNo.value = options?.no ?? '';
});

/** 物流节点 */
interface TrackNode {
    title: string;
    time: string;
    /** 是否已完成 */
    done: boolean;
}

const trackNodes = ref<TrackNode[]>([
    { title: t('trackPacked'), time: t('trackTime1'), done: true },
    { title: t('trackShipped'), time: t('trackTime2'), done: true },
    { title: t('trackDelivered'), time: t('trackTime3'), done: false },
]);

const onBack = () => {
    uni.navigateBack();
};
</script>

<template>
    <view class="tracking-page">
        <!-- ============== 顶部 ============== -->
        <view class="tracking-page__header">
            <view class="tracking-page__back" @tap="onBack">
                <hy-icon
                    :name="IconConfig.LEFT"
                    size="36rpx"
                    color="#1a1a1a"
                />
            </view>
            <text class="tracking-page__title">{{ t('trackingTitle') }}</text>
        </view>

        <!-- ============== 订单号 ============== -->
        <text class="tracking-page__no">
            {{ t('orderNo', { no: orderNo }) }}
        </text>

        <!-- ============== 物流时间线 ============== -->
        <view class="timeline">
            <view
                v-for="(node, index) in trackNodes"
                :key="index"
                class="timeline-item"
                :class="{ 'is-done': node.done }"
            >
                <!-- 节点圆点与连线 -->
                <view class="timeline-item__rail">
                    <view
                        class="timeline-item__dot"
                        :class="{ 'is-done': node.done }"
                    ></view>
                    <view
                        v-if="index < trackNodes.length - 1"
                        class="timeline-item__line"
                        :class="{ 'is-done': node.done }"
                    ></view>
                </view>

                <!-- 节点内容 -->
                <view class="timeline-item__body">
                    <text class="timeline-item__title">{{ node.title }}</text>
                    <text class="timeline-item__time">{{ node.time }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.tracking-page {
    min-height: 100vh;
    padding: calc(var(--status-bar-height) + 40rpx) 40rpx
        calc(40rpx + env(safe-area-inset-bottom));
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

    &__no {
        display: block;
        margin-top: 40rpx;
        font-size: 26rpx;
        font-weight: 600;
        color: rgba(51, 48, 46, 0.7);
    }
}

/* 物流时间线 */
.timeline {
    margin-top: 48rpx;
}

.timeline-item {
    display: flex;
    gap: 28rpx;

    &:last-child .timeline-item__line {
        display: none;
    }

    &__rail {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__dot {
        flex-shrink: 0;
        width: 24rpx;
        height: 24rpx;
        margin-top: 8rpx;
        background-color: #e8e8e8;
        border-radius: 50%;

        &.is-done {
            background-color: #508a7b;
        }
    }

    &__line {
        flex: 1;
        width: 4rpx;
        min-height: 100rpx;
        background-color: #e8e8e8;

        &.is-done {
            background-color: #508a7b;
        }
    }

    &__body {
        display: flex;
        flex-direction: column;
        gap: 8rpx;
        padding-bottom: 48rpx;
    }

    &__title {
        font-size: 28rpx;
        font-weight: 600;
        color: rgba(51, 48, 46, 0.4);

        .is-done & {
            color: $flux-text-primary;
        }
    }

    &__time {
        font-size: 24rpx;
        color: #8a8a8f;
    }
}
</style>
