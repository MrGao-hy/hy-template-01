<script setup lang="ts">
import type { CSSProperties } from 'vue';

/**
 * 玻璃拟态按钮组件
 * 基于 Figma 原型规格：rgba(255,255,255,0.25) + blur(5px) + 白色边框 + 圆角29.5px
 */
interface IProps {
    /** 按钮文字 */
    text?: string;
    /** 自定义样式 */
    customStyle?: CSSProperties;
    /** 自定义类名 */
    customClass?: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否显示水波纹反馈 */
    ripple?: boolean;
}

interface IEmit {
    (e: 'click', event: Event): void;
}

const props = withDefaults(defineProps<IProps>(), {
    text: '',
    disabled: false,
    ripple: true,
});

const emit = defineEmits<IEmit>();

const onClick = (e: Event) => {
    if (props.disabled) return;
    emit('click', e);
};
</script>

<template>
    <view
        class="glass-button"
        :class="[
            customClass,
            { 'is-disabled': disabled, 'is-ripple': ripple && !disabled },
        ]"
        :style="customStyle"
        :hover-class="ripple && !disabled ? 'glass-button--hover' : ''"
        :hover-stay-time="100"
        @click="onClick"
    >
        <text v-if="text" class="glass-button__text">{{ text }}</text>
        <slot v-else />
    </view>
</template>

<style lang="scss">
.glass-button {
    /* 原型规格：padding 15px 53px */
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20rpx;
    /* 1.18px → 2.36rpx */
    box-sizing: border-box;
    /* 原型圆角 29.5px → 59rpx */
    border-radius: 59rpx;
    /* 原型背景 rgba(255,255,255,0.25) + backdrop blur(5px) */
    background-color: rgba(255, 255, 255, 0.25);
    border: 2rpx solid #ffffff;
    padding: 30rpx 106rpx;
    /* H5/App 玻璃模糊效果 */
    /* #ifdef H5 || APP-PLUS */
    backdrop-filter: blur(10rpx);
    -webkit-backdrop-filter: blur(10rpx);
    /* #endif */
    /* 小程序不支持 backdrop-filter，保留半透明背景作为降级 */
    transition: transform 0.15s ease, background-color 0.15s ease;

    &__text {
        font-size: 32rpx;
        font-weight: 700;
        line-height: 1.41em;
        color: #ffffff;
        text-align: center;
    }

    /* #ifdef H5 */
    &--hover {
        background-color: rgba(255, 255, 255, 0.4);
        transform: scale(0.97);
    }
    /* #endif */

    &.is-disabled {
        opacity: 0.5;
    }

    /* #ifdef H5 || APP-PLUS */
    &.is-ripple:active {
        transform: scale(0.97);
        background-color: rgba(255, 255, 255, 0.4);
    }
    /* #endif */
}
</style>
