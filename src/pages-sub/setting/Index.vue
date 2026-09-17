<script setup lang="ts">
import { computed, ref } from 'vue';
import { IconConfig, Locale, useCurrentLang, useTranslate } from '@hy-app/ui';
import SideMenuPopup from '@/components/SideMenuPopup.vue';

/**
 * 设置页（Figma 画板 8782:3517 setting / 8782:3582 sidebar-setting）
 * sidebar-setting 为本页叠加首页侧边工具列表弹窗（SideMenuPopup 复用）
 */
definePage({
    style: {
        navigationStyle: 'custom',
        navigationBarTextStyle: 'black',
    },
});

const { t } = useTranslate('setting');

/** 当前语言（Locale 内部响应式 ref） */
const lang = useCurrentLang();

/** 语言显示名（按惯例显示各自母语，无需翻译） */
const langLabels: Record<string, string> = {
    'en-US': 'English',
    'zh-CN': '中文',
};

/** 菜单项类型 */
interface SettingItem {
    key: string;
    label: string;
    icon: string;
    url?: string;
}

/** 设置菜单（对应 Figma：Language / Notification / Terms of Use / Privacy Policy / Chat support） */
const menuList = computed<SettingItem[]>(() => [
    { key: 'language', label: t('language'), icon: IconConfig.NETWORK },
    {
        key: 'notification',
        label: t('notification'),
        icon: IconConfig.REMIND,
        url: '/pages-sub/notification-setting/Index',
    },
    { key: 'terms', label: t('termsOfUse'), icon: IconConfig.LIST_DOT },
    { key: 'privacy', label: t('privacyPolicy'), icon: IconConfig.LOCK },
    {
        key: 'chat',
        label: t('chatSupport'),
        icon: IconConfig.CUSTOMER_SERVICE,
        url: '/pages-sub/chat-support/Index',
    },
]);

/** 侧边工具列表弹窗显隐 */
const showSideMenu = ref(false);

// ============== 事件处理 ==============

/** 返回上一页 */
const onBack = () => {
    uni.navigateBack();
};

/** 打开侧边工具列表（sidebar-setting） */
const onMenuTap = () => {
    showSideMenu.value = true;
};

/** 设置项点击 */
const onItemTap = (item: SettingItem) => {
    if (item.url) {
        uni.navigateTo({ url: item.url });
        return;
    }
    if (item.key === 'language') {
        // 中英文互切，Locale.use 后所有 t() 响应式刷新
        const next = lang.value === 'zh-CN' ? 'en-US' : 'zh-CN';
        Locale.use(next);
        uni.showToast({ title: langLabels[next], icon: 'none' });
        return;
    }
    uni.showToast({ title: item.label, icon: 'none' });
};
</script>

<template>
    <view class="setting-page">
        <!-- ============== 顶部：菜单 + 返回 + 标题 ============== -->
        <view class="setting-page__header">
            <view class="setting-page__icon-btn" @tap="onMenuTap">
                <hy-icon :name="IconConfig.MENU" size="36rpx" color="#1a1a1a" />
            </view>
            <text class="setting-page__title">{{ t('title') }}</text>
            <view class="setting-page__back" @tap="onBack">
                <hy-icon :name="IconConfig.LEFT" size="36rpx" color="#1a1a1a" />
            </view>
        </view>

        <!-- ============== 设置菜单 ============== -->
        <view class="setting-list">
            <view
                v-for="item in menuList"
                :key="item.key"
                class="setting-item"
                @tap="onItemTap(item)"
            >
                <hy-icon :name="item.icon" size="40rpx" color="#343434" />
                <text class="setting-item__label">{{ item.label }}</text>
                <hy-icon
                    :name="IconConfig.RIGHT"
                    size="28rpx"
                    color="#8a8a8f"
                />
            </view>
        </view>

        <!-- ============== 侧边工具列表弹窗（sidebar-setting） ============== -->
        <SideMenuPopup v-model:show="showSideMenu" />
    </view>
</template>

<style lang="scss" scoped>
.setting-page {
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

    &__title {
        font-size: 36rpx;
        font-weight: 700;
        color: $flux-text-primary;
    }

    &__icon-btn {
        position: absolute;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56rpx;
        height: 56rpx;
    }

    &__back {
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56rpx;
        height: 56rpx;
    }
}

/* 设置菜单列表 */
.setting-list {
    display: flex;
    flex-direction: column;
    margin-top: 40rpx;
    background-color: #ffffff;
}

.setting-item {
    display: flex;
    align-items: center;
    gap: 32rpx;
    height: 120rpx;
    border-bottom: 2rpx solid #f1f2f3;

    &:last-child {
        border-bottom: none;
    }

    &:active {
        opacity: 0.7;
    }

    &__label {
        flex: 1;
        font-size: 30rpx;
        font-weight: 500;
        color: $flux-text-primary;
    }
}
</style>
