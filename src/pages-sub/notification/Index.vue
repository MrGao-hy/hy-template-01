<script setup lang="ts">
import { computed } from 'vue';
import { IconConfig, useTranslate, useToast } from '@hy-app/ui';
import Navbar from '@/components/Navbar.vue';

/**
 * 通知列表页（Figma 画板 8782:3378 notification）
 * 3 条通知卡片：图标 + 标题 + 描述
 */
definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('notification');
const toast = useToast()

/** 通知项类型 */
interface NotificationItem {
    key: string;
    title: string;
    desc: string;
    icon: string;
}

/** 通知列表 */
const notifications = computed<NotificationItem[]>(() => [
    { key: 'item1', title: t('item1Title'), desc: t('item1Desc'), icon: IconConfig.REMIND },
    { key: 'item2', title: t('item2Title'), desc: t('item2Desc'), icon: IconConfig.TAG },
    { key: 'item3', title: t('item3Title'), desc: t('item3Desc'), icon: IconConfig.STAR_FILL },
]);

// ============== 事件处理 ==============

/** 通知点击 */
const onItemTap = (item: NotificationItem) => {
    toast.show(item.title)
};
</script>

<template>
    <view class="notification-page">
        <!-- ============== 顶部：返回 + 标题 ============== -->
        <navbar :title="t('title')"></navbar>

        <!-- ============== 通知列表 ============== -->
        <view class="notice-list">
            <view
                v-for="item in notifications"
                :key="item.key"
                class="notice-card"
                @tap="onItemTap(item)"
            >
                <view class="notice-card__icon">
                    <hy-icon :name="item.icon" size="40rpx" />
                </view>
                <view class="notice-card__body">
                    <text class="notice-card__title">{{ item.title }}</text>
                    <text class="notice-card__desc">{{ item.desc }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.notification-page {
    min-height: 100vh;
    padding: calc(var(--status-bar-height) + 40rpx) 40rpx
        calc(40rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
}

/* 通知卡片 */
.notice-list {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
    margin-top: 40rpx;
}

.notice-card {
    display: flex;
    align-items: flex-start;
    gap: 28rpx;
    padding: 32rpx;
    background-color: $hy-background--container;
    border-radius: $hy-radius-lg;

    &:active {
        opacity: 0.8;
    }

    &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 80rpx;
        height: 80rpx;
        background-color: $hy-background--2;
        border-radius: $hy-radius-circle;
    }

    &__body {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 8rpx;
        min-width: 0;
    }

    &__title {
        font-size: 28rpx;
        font-weight: 700;
        color: $hy-text-color;
    }

    &__desc {
        font-size: 24rpx;
        line-height: 1.5;
        color: $hy-text-color--grey;
    }
}
</style>
