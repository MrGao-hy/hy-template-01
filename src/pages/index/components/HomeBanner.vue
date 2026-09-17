<script setup lang="ts">
import { computed } from 'vue';
import { useTranslate } from '@hy-app/ui';
import type { BannerItem } from './types';

const { t } = useTranslate('home');

interface IProps {
    list: BannerItem[];
}

interface IEmits {
    (e: 'tap', index: number): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const bannerImageList = computed(() => props.list.map(b => b.image));

const onBannerTap = (index: number) => {
    emit('tap', index);
};
</script>

<template>
    <view class="home__banner">
        <hy-swiper
            :list="bannerImageList"
            height="360rpx"
            radius="32rpx"
            indicator
            indicator-mode="dot"
            indicator-active-color="#1A1A1A"
            indicator-color="rgba(26,26,26,0.2)"
            autoplay
            circular
        >
            <template #default="{ index }">
                <view class="banner-item" @tap="onBannerTap(index)">
                    <hy-image
                        :src="props.list[index].image"
                        width="100%"
                        height="100%"
                        radius="32rpx"
                        mode="aspectFill"
                    />
                    <view class="banner-item__overlay">
                        <view class="banner-item__content">
                            <text class="banner-item__title">{{
                                t(props.list[index].titleKey)
                            }}</text>
                            <text
                                class="banner-item__subtitle"
                                >{{
                                    t(
                                        props.list[index]
                                            .subtitleKey
                                    )
                                }}</text
                            >
                        </view>
                    </view>
                </view>
            </template>
            <template #indicator="{ current }">
                <view class="swiper-dots">
                    <view
                        class="dot"
                        :class="{ active: current === 0 }"
                    ></view>
                    <view
                        class="dot"
                        :class="{ active: current === 1 }"
                    ></view>
                    <view
                        class="dot"
                        :class="{ active: current === 2 }"
                    ></view>
                </view>
            </template>
        </hy-swiper>
    </view>
</template>

<style lang="scss" scoped>
.home__banner {
    margin-bottom: $flux-spacing-xl;
}

.banner-item {
    width: 100%;
    height: 100%;
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
        font-size: $flux-font-xxl;
        font-weight: 700;
        color: #ffffff;
        line-height: 1.2;
        text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
    }

    &__subtitle {
        font-size: $flux-font-xl;
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
        background-color: #ffffff;
        position: relative;

        &.active {
            &::before {
                content: '';
                position: absolute;
                top: -8rpx;
                left: -8rpx;
                right: -8rpx;
                bottom: -8rpx;
                border: 1px solid #fff;
                border-radius: $hy-radius-circle;
            }
        }
    }
}
</style>
