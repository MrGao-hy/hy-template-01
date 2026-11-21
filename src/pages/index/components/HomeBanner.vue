<script setup lang="ts">
import { computed } from 'vue';
import { useTranslate } from '@hy-app/ui';
import type { BannerItem } from './types';

const { t } = useTranslate('home');

interface IProps {
    list: BannerItem[];
}

/** 轮播高度：微信小程序端插槽分发会插入编译器 wrapper 节点（无高度），
 *  插槽内容 height:100% 会塌陷为 0 导致不显示，
 *  故 .banner-item 需显式高度，须与下方 $banner-height 同步修改 */
const BANNER_HEIGHT = '360rpx';

interface IEmits {
    (e: 'tap', index: number): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const onBannerTap = (index: number) => {
    emit('tap', index);
};
</script>

<template>
    <view class="home__banner">
        <hy-swiper
            :list="list"
            :height="BANNER_HEIGHT"
            radius="32rpx"
            indicator
            indicator-mode="dot"
            indicator-active-color="#1A1A1A"
            indicator-color="rgba(26,26,26,0.2)"
            autoplay
            circular
        >
            <template #default="{ index, record }">
                <view class="banner-item" @tap="onBannerTap(index)">
                    <hy-image
                        :src="record.image"
                        width="100%"
                        height="100%"
                        radius="32rpx"
                        mode="aspectFill"
                    />
                    <view class="banner-item__overlay">
                        <view class="banner-item__content">
                            <text class="banner-item__title">{{
                                t(record.titleKey)
                            }}</text>
                            <text class="banner-item__subtitle">{{
                                t(record.subtitleKey)
                            }}</text>
                        </view>
                    </view>
                </view>
            </template>
            <template #indicator="{ current }">
                <view class="swiper-dots">
                    <view class="dot" :class="{ active: current === 0 }"></view>
                    <view class="dot" :class="{ active: current === 1 }"></view>
                    <view class="dot" :class="{ active: current === 2 }"></view>
                </view>
            </template>
        </hy-swiper>
    </view>
</template>

<style lang="scss" scoped>
/* 与 script 中 BANNER_HEIGHT 保持一致，微信小程序插槽内容高度不可用 100% */
$banner-height: 360rpx;

.home__banner {
    margin-bottom: $hy-border-margin-padding-xl;
}

.banner-item {
    width: 100%;
    /* 小程序端插槽 wrapper 节点高度为 0，显式高度兜底（H5 不受影响） */
    height: $banner-height;
    position: relative;
    overflow: hidden;

    &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 60rpx;
    }

    &__content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    &__title {
        font-size: $hy-font-size-xxl;
        font-weight: 700;
        color: var(--hy-text-color--inverse, #ffffff);
        line-height: 1.2;
        text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
    }

    &__subtitle {
        font-size: $hy-font-size-lg;
        font-weight: 600;
        color: rgba(255, 255, 255, 0.9);
        line-height: 1.2;
        margin-top: 4rpx;
        text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
    }
}

.swiper-dots {
    display: flex;
    gap: 30rpx;
    width: 180rpx;
    justify-content: center;
    margin-bottom: 20rpx;

    .dot {
        width: 10rpx;
        height: 10rpx;
        border-radius: $hy-radius-circle;
        background-color: var(--hy-text-color--inverse, #ffffff);
        position: relative;

        &.active {
            &::before {
                content: '';
                position: absolute;
                top: -8rpx;
                left: -8rpx;
                right: -8rpx;
                bottom: -8rpx;
                border: 1px solid var(--hy-text-color--inverse, #ffffff);
                border-radius: $hy-radius-circle;
            }
        }
    }
}
</style>
