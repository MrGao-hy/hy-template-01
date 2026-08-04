<script setup lang="ts">
import { ref, computed, type CSSProperties } from 'vue';
import { IconConfig } from '@hy-app/ui';

/**
 * 认证页下划线输入框
 * 基于 hy-input 封装，还原 Figma "TextFields / Place Holder" 组件：
 *   310×50，底部 1px #D6D6D6 分隔线，placeholder 14px Light #000
 */
interface IProps {
    /** v-model 绑定值 */
    modelValue: string;
    /** 占位文案 */
    placeholder: string;
    /** 输入类型：text 普通文本 / password 密码（点） */
    type?: 'text' | 'password';
    /** 最大输入长度 */
    maxlength?: number;
}

interface IEmit {
    (e: 'update:modelValue', value: string): void;
    (e: 'focus'): void;
    (e: 'blur'): void;
}

const props = withDefaults(defineProps<IProps>(), {
    type: 'text',
    maxlength: 140,
});

const emit = defineEmits<IEmit>();

const showPassword = ref(false);
const isPassword = computed(() => props.type === 'password');

/** 密码模式下的眼睛图标 */
const suffixIcon = computed(() => {
    if (!isPassword.value) return {};
    return {
        name: showPassword.value ? IconConfig.EYE : IconConfig.EYE_CLOSE,
        size: '20',
    };
});

/** placeholder 内联样式（保证多端一致） */
const placeholderStyle: CSSProperties = {
    color: '#000000',
    fontSize: '28rpx',
    fontWeight: 300,
};

/** hy-input 自定义样式：去除默认内边距，对齐 Figma 规格 */
const customStyle: CSSProperties = {
    paddingTop: '40rpx',
    paddingBottom: '0',
    paddingLeft: '0',
    paddingRight: '0',
};

const onSuffix = () => {
    if (isPassword.value) {
        showPassword.value = !showPassword.value;
    }
};

const onFocus = () => emit('focus');
const onBlur = () => emit('blur');
</script>

<template>
    <hy-input
        class="auth-field"
        :model-value="modelValue"
        :placeholder="placeholder"
        :placeholder-style="placeholderStyle"
        :password="isPassword && !showPassword"
        :suffix-icon="suffixIcon"
        :maxlength="maxlength"
        border="bottom"
        font-size="28rpx"
        color="#000000"
        input-align="left"
        :custom-style="customStyle"
        @update:model-value="(v: string) => emit('update:modelValue', v)"
        @focus="onFocus"
        @blur="onBlur"
        @on-suffix="onSuffix"
    />
</template>

<style lang="scss">
.auth-field {
    /* 聚焦时下划线保持 #D6D6D6，不使用主题色 */
    --hy-theme-color: #d6d6d6;

    :deep(.hy-border__bottom) {
        border-color: #d6d6d6 !important;
    }

    /* #ifdef H5 || APP-PLUS */
    :deep(.hy-border__bottom) {
        border-bottom-width: 2rpx !important;
        border-bottom-style: solid !important;
    }
    /* #endif */
}
</style>
