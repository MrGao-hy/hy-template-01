<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useTranslate } from '@hy-app/ui';
import GlassButton from '@/components/GlassButton.vue';
import TheRootPages from '@/components/TheRootPages.vue';
import welcomeBg from '@/assets/welcome/welcome-bg.png';

const { t } = useTranslate('welcome');

definePage({
    style: {
        navigationStyle: 'custom',
        disableScroll: true,
    },
});

/** 控制进场动画 */
const visible = ref(false);

onMounted(() => {
    // 下一帧触发动画，确保过渡生效
    setTimeout(() => {
        visible.value = true;
    }, 50);

    console.log(t('title'));
});

/** 点击 Get Started 跳转引导页 */
const onStart = () => {
    uni.redirectTo({
        url: '/pages-sub/intro/Index',
    });
};
</script>

<template>
    <the-root-pages>
        <view class="welcome" :class="{ 'is-visible': visible }">
            <!-- 背景图：原型 image 45 (541x812, 偏移-113,0) -->
            <image
                class="welcome__bg"
                :src="welcomeBg"
                mode="aspectFill"
                lazy-load
            />
            <!-- 黑色遮罩 rgba(0,0,0,0.5) -->
            <view class="welcome__overlay" />

            <!-- 文本与按钮内容区 -->
            <view class="welcome__content">
                <!-- 标题块：原型位于 (47,528)，居中 -->
                <view class="welcome__text-block">
                    <text class="welcome__title">{{ t('title') }}</text>
                    <text class="welcome__subtitle">{{ t('subtitle') }}</text>
                </view>
                <!-- Get Started 按钮：原型位于 (87,659) -->
                <glass-button text="Get Started" @click="onStart" />
            </view>
        </view>
    </the-root-pages>
</template>

<style lang="scss">
.welcome {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    /* 背景图铺满全屏（含状态栏区域） */
    &__bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* 进场缩放动画 */
        transform: scale(1.08);
        transition: transform 1.2s ease-out;
    }

    &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }

    &__content {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        /* 原型按钮底部距屏幕底 100px → 200rpx + 安全区 */
        /* #ifdef H5 || APP-PLUS */
        padding-bottom: calc(200rpx + env(safe-area-inset-bottom));
        /* #endif */
        /* #ifdef MP-WEIXIN */
        padding-bottom: calc(200rpx + constant(safe-area-inset-bottom));
        padding-bottom: calc(200rpx + env(safe-area-inset-bottom));
        /* #endif */
    }

    &__text-block {
        display: flex;
        flex-direction: column;
        align-items: center;
        /* 原型 gap 13px → 26rpx */
        gap: 26rpx;
        /* 原型文本块底到按钮顶间距 60px → 120rpx */
        margin-bottom: 120rpx;
        opacity: 0;
        transform: translateY(40rpx);
        transition:
            opacity 0.8s ease 0.3s,
            transform 0.8s ease 0.3s;
    }

    /* 原型：25px Bold 白色 Product Sans */
    &__title {
        font-size: 50rpx;
        font-weight: 700;
        line-height: 1.41em;
        color: var(--hy-text-color--inverse, #FFFFFF);
        text-align: center;
    }

    /* 原型：16px Bold 白色 Product Sans */
    &__subtitle {
        font-size: 32rpx;
        font-weight: 700;
        line-height: 1.41em;
        color: var(--hy-text-color--inverse, #FFFFFF);
        text-align: center;
    }

    /* 按钮进场动画 */
    &__content .glass-button {
        opacity: 0;
        transform: translateY(40rpx);
        transition:
            opacity 0.8s ease 0.6s,
            transform 0.8s ease 0.6s;
    }

    /* 触发进场动画 */
    &.is-visible {
        .welcome__bg {
            transform: scale(1);
        }
        .welcome__text-block {
            opacity: 1;
            transform: translateY(0);
        }
        .glass-button {
            opacity: 1;
            transform: translateY(0);
        }
    }
}
</style>
