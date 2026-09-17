<script setup lang="ts">
import { ref } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';

/**
 * 通知设置页（Figma 画板 8782:3417 notification setting）
 * 3 个开关项：显示通知 / 通知提示音 / 锁屏通知
 */
definePage({
    style: {
        navigationStyle: 'custom',
        navigationBarTextStyle: 'black',
    },
});

const { t } = useTranslate('notificationSetting');

/** 开关项类型 */
interface SwitchItem {
    key: 'show' | 'sound' | 'lock';
    title: string;
    desc: string;
}

/** 开关配置 */
const items: SwitchItem[] = [
    { key: 'show', title: t('showTitle'), desc: t('showDesc') },
    { key: 'sound', title: t('soundTitle'), desc: t('soundDesc') },
    { key: 'lock', title: t('lockTitle'), desc: t('lockDesc') },
];

/** 开关状态 */
const switchState = ref<Record<SwitchItem['key'], boolean>>({
    show: true,
    sound: true,
    lock: false,
});

// ============== 事件处理 ==============

/** 返回上一页 */
const onBack = () => {
    uni.navigateBack();
};

/** 开关变更 */
const onSwitchChange = (key: SwitchItem['key'], value: boolean) => {
    switchState.value[key] = value;
};
</script>

<template>
    <view class="notify-setting">
        <!-- ============== 顶部：返回 + 标题 ============== -->
        <view class="notify-setting__header">
            <view class="notify-setting__back" @tap="onBack">
                <hy-icon :name="IconConfig.LEFT" size="36rpx" color="#1a1a1a" />
            </view>
            <text class="notify-setting__title">{{ t('title') }}</text>
        </view>

        <!-- ============== 开关列表 ============== -->
        <view class="switch-list">
            <view
                v-for="item in items"
                :key="item.key"
                class="switch-item"
            >
                <view class="switch-item__body">
                    <text class="switch-item__title">{{ item.title }}</text>
                    <text class="switch-item__desc">{{ item.desc }}</text>
                </view>
                <hy-switch
                    :model-value="switchState[item.key]"
                    size="small"
                    active-color="#343434"
                    @update:model-value="(v: boolean) => onSwitchChange(item.key, v)"
                />
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.notify-setting {
    min-height: 100vh;
    padding: calc(var(--status-bar-height) + 40rpx) 40rpx
        calc(40rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
    background-color: #ffffff;

    &__header {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80rpx;
    }

    &__back {
        position: absolute;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56rpx;
        height: 56rpx;
    }

    &__title {
        font-size: 36rpx;
        font-weight: 700;
        color: $flux-text-primary;
    }
}

/* 开关列表 */
.switch-list {
    display: flex;
    flex-direction: column;
    margin-top: 40rpx;
}

.switch-item {
    display: flex;
    align-items: center;
    gap: 32rpx;
    padding: 32rpx 0;
    border-bottom: 2rpx solid #f1f2f3;

    &:last-child {
        border-bottom: none;
    }

    &__body {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 8rpx;
        min-width: 0;
    }

    &__title {
        font-size: 30rpx;
        font-weight: 600;
        color: $flux-text-primary;
    }

    &__desc {
        font-size: 24rpx;
        line-height: 1.5;
        color: #8a8a8f;
    }
}
</style>
