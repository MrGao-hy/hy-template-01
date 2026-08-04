<script setup lang="ts">
import type { CSSProperties } from 'vue';

/**
 * 认证页主操作按钮
 * 基于 hy-button 封装，还原 Figma "button upper case" 组件：
 *   147×51，背景 #2D201C，圆角 26.5px，白色 16px Bold 大写文案
 */
interface IProps {
    /** 按钮文案（会自动转大写显示） */
    text: string;
    /** 是否禁用 */
    disabled?: boolean;
    /** 是否显示加载中 */
    loading?: boolean;
}

interface IEmit {
    (e: 'click', event: Event): void;
}

const props = withDefaults(defineProps<IProps>(), {
    disabled: false,
    loading: false,
});

const emit = defineEmits<IEmit>();

/** 自定义样式：还原 Figma 147×51 规格 + 圆角 26.5px */
const customStyle: CSSProperties = {
    width: '100%',
    height: '102rpx',
};

const onClick = (e: Event) => {
    if (props.disabled || props.loading) return;
    emit('click', e);
};
</script>

<template>
    <hy-button
        class="auth-button"
        :text="text"
        :disabled="disabled"
        :loading="loading"
        color="#2D201C"
        shape="circle"
        :custom-style="customStyle"
        :hair-line="false"
        @click="onClick"
    />
</template>

<style lang="scss">
/* 文案大写 + 字体 */
.auth-button {
    :deep(.hy-button__text) {
        text-transform: uppercase;
    }
}
</style>
