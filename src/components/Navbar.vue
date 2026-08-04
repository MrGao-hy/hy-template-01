<script setup lang="ts">
import { IconConfig } from '@hy-app/ui';

/** 返回登录 */
const onBack = () => {
    uni.navigateBack();
};
</script>

<template>
    <hy-navbar placeholder>
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
}
</style>
