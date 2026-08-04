<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';

/**
 * 引导页 Cover Flow 3D 轮播单张卡片
 * - active(偏移0)：正面居中全宽显示
 * - prev(偏移-1)/next(偏移+1)：缩小+左右倾斜，仅露边边
 * - 超出±1：隐藏
 */
interface IProps {
    /** 标题 */
    title: string;
    /** 副标题 */
    subtitle: string;
    /** 主图资源 */
    image: string;
    /** 相对当前激活页的偏移量：-1=左侧, 0=当前, 1=右侧 */
    offset: number;
}

const props = defineProps<IProps>();

const emit = defineEmits<{
    (e: 'click'): void;
}>();

/**
 * 根据偏移量计算 3D 变换
 * 模拟 Cover Flow：
 *   offset=0  → 正面居中，scale 1，无旋转
 *   offset=-1 → 左移-58%，rotateY +35°（朝右），scale 0.7
 *   offset=+1 → 右移+58%，rotateY -35°（朝左），scale 0.7
 */
const cardTransform = computed(() => {
    const o = props.offset;
    if (Math.abs(o) > 1) {
        // 超出相邻范围：完全隐藏
        return 'translateX(200%) translateZ(-1000rpx) scale(0.4)';
    }
    const translateX = o * 58; // 百分比
    const rotateY = o === 0 ? 0 : o < 0 ? 35 : -35;
    const scale = o === 0 ? 1 : 0.72;
    const tz = o === 0 ? 0 : -120;
    return `perspective(1400rpx) translateX(${translateX}%) translateZ(${tz}rpx) rotateY(${rotateY}deg) scale(${scale})`;
});

/** 卡片容器样式 */
const cardStyle = computed<CSSProperties>(() => ({
    transform: cardTransform.value,
    opacity:
        Math.abs(props.offset) > 1 ? 0 : Math.abs(props.offset) === 1 ? 0.7 : 1,
    zIndex: 10 - Math.abs(props.offset),
    transition:
        'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.6s ease',
    boxShadow:
        props.offset === 0
            ? '0 30rpx 60rpx rgba(0, 0, 0, 0.35)'
            : '0 16rpx 32rpx rgba(0, 0, 0, 0.2)',
}));

/** 标题动画：仅当前页显示 */
const headerStyle = computed<CSSProperties>(() => ({
    opacity: props.offset === 0 ? 1 : 0,
    transform: props.offset === 0 ? 'translateY(0)' : 'translateY(40rpx)',
    transition: 'opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s',
}));
</script>

<template>
    <view class="cover-slide" :style="cardStyle" @click="emit('click')">
        <!-- 灰色背景卡片 #E7E8E9 圆角10px -->
        <view class="cover-slide__card-bg" />
        <!-- 主图 -->
        <image
            class="cover-slide__image"
            :src="image"
            mode="aspectFill"
            lazy-load
        />
    </view>
    <!-- 标题块：独立于卡片，固定在原型位置，仅当前页显示 -->
    <view class="cover-slide__header" :style="headerStyle">
        <text class="cover-slide__title">{{ title }}</text>
        <text class="cover-slide__subtitle">{{ subtitle }}</text>
    </view>
</template>

<style lang="scss">
/* 单卡片容器：原型主图规格 261×368，居中定位 */
.cover-slide {
    position: absolute;
    left: 50%;
    top: 382rpx;
    width: 522rpx;
    height: 736rpx;
    margin-left: -261rpx;
    transform-style: preserve-3d;
    /* #ifdef H5 || APP-PLUS */
    backface-visibility: hidden;
    /* #endif */

    /* 灰色背景卡片 #E7E8E9 圆角10px */
    &__card-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #e7e8e9;
        border-radius: 20rpx;
    }

    /* 主图：铺满卡片 */
    &__image {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 20rpx;
    }
}

/* 标题块：原型 y=90，居中，gap 17px */
.cover-slide__header {
    position: absolute;
    top: 180rpx;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 34rpx;
    padding: 0 52rpx;
    z-index: 20;
    pointer-events: none;
}

/* 标题：20px Bold 黑色，lineHeight 34px，letterSpacing 0.018em */
.cover-slide__title {
    font-size: 40rpx;
    font-weight: 700;
    line-height: 68rpx;
    letter-spacing: 0.018em;
    color: #000000;
    text-align: center;
}

/* 副标题：14px Regular 黑色，lineHeight 20px，width 271px */
.cover-slide__subtitle {
    font-size: 28rpx;
    font-weight: 400;
    line-height: 40rpx;
    color: #000000;
    text-align: center;
    width: 542rpx;
}
</style>
