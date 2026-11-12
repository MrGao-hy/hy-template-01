<script setup lang="ts">
import { ref } from 'vue';
import { IconConfig } from '@hy-app/ui';

const props = defineProps<{
    /** 商品图集（优先于 image） */
    images?: string[];
}>();

const emit = defineEmits<{
    (e: 'back'): void;
}>();

/** 收藏状态 */
const favorite = ref(false);

const onBack = () => {
    uni.navigateBack();
};
</script>

<template>
    <view class="product-hero">
        <!-- ============== 背景椭圆 ============== -->
        <view class="product-hero__ellipse"></view>

        <!-- ============== 顶部操作栏 ============== -->
        <hy-navbar bg-color="transparent" @left-click="onBack" left-icon-color="#000000">
            <template #right>
                <hy-flex gap="10">
                    <view
                        class="product-hero__action"
                        @tap="favorite = !favorite"
                    >
                        <hy-icon
                            :name="
                                favorite
                                    ? IconConfig.STAR_FILL
                                    : IconConfig.STAR
                            "
                            color="red"
                            size="40rpx"
                        />
                    </view>
                    <view class="product-hero__action">
                        <hy-icon
                            :name="IconConfig.SHARE"
                            size="44rpx"
                            color="#000000"
                        />
                    </view>
                </hy-flex>
            </template>
        </hy-navbar>

        <!-- ============== 商品主图轮播 ============== -->
        <view class="product-hero__media">
            <hy-swiper
                :list="images"
                height="451"
                radius="0"
                bg-color="transparent"
                :autoplay="false"
                indicator
                img-mode="widthFix"
            >
                <template #indicator="{ current, length }">
                    <view class="product-hero__indicator">
                        <view
                            v-for="i in length"
                            :key="i"
                            class="product-hero__indicator-dot"
                            :class="{ 'is-active': i - 1 === current }"
                        >
                            <view
                                v-if="i - 1 === current"
                                class="product-hero__indicator-dot-inner"
                            ></view>
                        </view>
                    </view>
                </template>
            </hy-swiper>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.product-hero {
    position: relative;
    height: 812rpx;
    background-color: #fffcfa;

    &__ellipse {
        position: absolute;
        top: 186rpx;
        left: 50%;
        width: 468rpx;
        height: 468rpx;
        transform: translateX(-50%);
        border-radius: 50%;
        background-color: rgba(234, 202, 183, 0.2);
    }

    &__media {

        z-index: 1;
        width: 100%;
    }

    &__slide {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
    }

    &__indicator {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20rpx;
        margin-bottom: 100rpx;
    }

    &__indicator-dot {
        width: 10rpx;
        height: 10rpx;
        border-radius: 50%;
        background-color: #4a4a4a;

        &.is-active {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 26rpx;
            height: 26rpx;
            background-color: transparent;
            border: 2rpx solid #1a1a1a;
        }
    }

    &__indicator-dot-inner {
        width: 12rpx;
        height: 12rpx;
        border-radius: 50%;
        background-color: #1a1a1a;
    }
}
</style>
