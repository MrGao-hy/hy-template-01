<script setup lang="ts">
import { IconConfig } from '@hy-app/ui';

/** 可选标题（不传时保持原样，仅返回按钮） */
defineProps<{
    title?: string;
}>();

/** 返回登录 */
const onBack = () => {
    uni.navigateBack();
};
</script>

<template>
    <hy-navbar
        :title="title"
        placeholder
        bg-color="var(--hy-navbar-bg)"
        :title-style="{ fontSize: '35rpx', fontWeight: 700 }"
    >
        <template #left>
            <view class="left-back" @tap="onBack">
                <hy-icon :name="IconConfig.LEFT"></hy-icon>
            </view>
        </template>
    </hy-navbar>
</template>

<style lang="scss" scoped>
.left-back {
    width: 60rpx;
    height: 60rpx;
    border-radius: $hy-radius-circle;
    box-shadow: $hy-shadow-sm;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: $hy-shadow-base;
}
</style>
