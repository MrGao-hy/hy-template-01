<script setup lang="ts">
import { computed, ref } from 'vue';
import { IconConfig, useCurrentLang, useToast, useTranslate } from '@hy-app/ui';
import { setLocale } from '@/locale';
import AppNavbar from '@/components/AppNavbar.vue';

definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('setting');
const toast = useToast();

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

// ============== 事件处理 ==============

/** 设置项点击（hy-cell 派发 name，即菜单 key） */
const onCellClick = (name: string | number) => {
    const item = menuList.value.find(i => i.key === name);
    if (item) onItemTap(item);
};

/** 设置项点击 */
const onItemTap = (item: SettingItem) => {
    if (item.url) {
        uni.navigateTo({ url: item.url });
        return;
    }
    if (item.key === 'language') {
        // 中英文互切，切换后写入本地缓存，重启后保持
        const next = lang.value === 'zh-CN' ? 'en-US' : 'zh-CN';
        setLocale(next);
        toast.success(langLabels[next]);
        return;
    }
    toast.show(item.label);
};
</script>

<template>
    <!-- ============== 顶部：菜单 + 返回 + 标题 ============== -->
    <app-navbar :title="t('title')" :active-id="5" />

    <view class="setting-page">
        <!-- ============== 设置菜单 ============== -->
        <hy-cell custom-class="setting-list" @click="onCellClick">
            <hy-cell-item
                v-for="item in menuList"
                :key="item.key"
                :name="item.key"
                :title="item.label"
                :icon="{ name: item.icon }"
                :right-icon="{
                    size: '23rpx',
                }"
            />
        </hy-cell>
    </view>
</template>

<style lang="scss" scoped>
.setting-page {
    min-height: 100vh;
    padding: calc(var(--status-bar-height) + 40rpx) 40rpx
        calc(40rpx + env(safe-area-inset-bottom));

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
        color: $hy-text-color;
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

/* 设置菜单列表（hy-cell） */
.setting-list {
    --hy-cell-item-icon-margin: 32rpx;

    :deep(.hy-cell-item) {
        height: 100rpx;
        --hy-cell-item-background: transparent;
    }
}
</style>
