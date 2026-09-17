<script setup lang="ts">
import { ref, computed } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';
import Icon from '@/components/Icon.vue';
import type { SideMenuItem } from '@/pages/index/components/types';

const show = defineModel('show', { default: false });

const emit = defineEmits<{
    (e: 'select', item: SideMenuItem): void;
}>();

const { t } = useTranslate('home');

// ============== 模拟数据 ==============

/** 当前登录用户（Figma 设计稿模拟数据） */
const userInfo = {
    name: 'Sunie Pham',
    email: 'sunieux@gmail.com',
    avatar: '/static/images/fluxstore/avatar.jpg',
};

/** 主题切换选项 */
const themeOptions = [
    {
        key: 'light',
        labelKey: 'light',
        icon: '/static/images/fluxstore/icon-sun.svg',
    },
    {
        key: 'dark',
        labelKey: 'dark',
        icon: '/static/images/fluxstore/icon-moon.svg',
    },
] as const;

type ThemeKey = (typeof themeOptions)[number]['key'];
const activeTheme = ref<ThemeKey>('light');

/** 主菜单：Homepage / Discover / My Order / My profile */
const mainMenuList = computed<SideMenuItem[]>(() => [
    { id: 1, nameKey: 'homepage', icon: IconConfig.HOME },
    { id: 2, nameKey: 'discover', icon: IconConfig.SEARCH },
    { id: 3, nameKey: 'myOrder', icon: IconConfig.ORDER },
    { id: 4, nameKey: 'myProfile', icon: IconConfig.MINE },
]);

/** 其他菜单：Setting / Support / About us */
const otherMenuList = computed<SideMenuItem[]>(() => [
    { id: 5, nameKey: 'setting', icon: IconConfig.SETTING },
    { id: 6, nameKey: 'support', icon: IconConfig.MESSAGE },
    { id: 7, nameKey: 'aboutUs', icon: IconConfig.NOTICE_CIRCLE },
]);

/** 当前激活的菜单项 */
const activeMenuId = ref<number>(1);

// ============== 事件处理 ==============

/** 菜单项对应的跳转路由（switchTab/navigateTo） */
const menuRoutes: Record<number, string> = {
    1: '/pages/index/Index',
    2: '/pages/search/Index',
    3: '/pages-sub/order/Index',
    4: '/pages/mine/Index',
    5: '/pages-sub/setting/Index',
    6: '/pages-sub/chat-support/Index',
};

/** TabBar 页面路由集合 */
const tabRoutes = new Set([
    '/pages/index/Index',
    '/pages/search/Index',
    '/pages/mine/Index',
]);

/** 菜单项点击：激活、关闭弹窗并跳转对应页面 */
const onMenuTap = (item: SideMenuItem) => {
    activeMenuId.value = item.id;
    emit('select', item);
    show.value = false;

    const url = menuRoutes[item.id];
    if (!url) {
        // About us：仅提示
        uni.showToast({ title: 'GemStore v1.0.0', icon: 'none' });
        return;
    }
    if (tabRoutes.has(url)) {
        uni.switchTab({ url });
    } else {
        uni.navigateTo({ url });
    }
};

/** 主题切换 */
const onThemeTap = (key: ThemeKey) => {
    activeTheme.value = key;
};
</script>

<template>
    <hy-popup
        v-model:show="show"
        mode="left"
        safe-area-inset-top
        close-on-click-overlay
        :custom-style="{ width: '586rpx' }"
        :z-index="13000"
        round="24"
        @close="show = false"
    >
        <scroll-view scroll-y :show-scrollbar="false" class="side-menu">
            <!-- ============== 用户信息头部 ============== -->
            <view class="side-menu__header">
                <hy-avatar :src="userInfo.avatar"></hy-avatar>
                <view class="side-menu__user">
                    <text class="side-menu__username">{{ userInfo.name }}</text>
                    <text class="side-menu__email">{{ userInfo.email }}</text>
                </view>
            </view>

            <!-- ============== 主菜单 ============== -->
            <view class="side-menu__group">
                <view
                    v-for="item in mainMenuList"
                    :key="item.id"
                    class="side-menu__item"
                    :class="{ 'is-active': activeMenuId === item.id }"
                    @tap="onMenuTap(item)"
                >
                    <Icon :name="item.icon" size="36rpx" color="currentColor" />
                    <text class="side-menu__item-text">
                        {{ t(`sideMenu.${item.nameKey}`) }}
                    </text>
                </view>
            </view>

            <!-- ============== 其他分组 ============== -->
            <view class="side-menu__group-title">
                {{ t('sideMenu.other') }}
            </view>
            <view class="side-menu__group">
                <view
                    v-for="item in otherMenuList"
                    :key="item.id"
                    class="side-menu__item"
                    :class="{ 'is-active': activeMenuId === item.id }"
                    @tap="onMenuTap(item)"
                >
                    <Icon :name="item.icon" size="36rpx" color="currentColor" />
                    <text class="side-menu__item-text">
                        {{ t(`sideMenu.${item.nameKey}`) }}
                    </text>
                </view>
            </view>
        </scroll-view>

        <!-- ============== 底部主题切换 ============== -->
        <view class="side-menu__theme">
            <view
                v-for="option in themeOptions"
                :key="option.key"
                class="theme-option"
                :class="{ 'is-active': activeTheme === option.key }"
                @tap="onThemeTap(option.key)"
            >
                <image
                    class="theme-option__icon"
                    :src="option.icon"
                    mode="aspectFit"
                />
                <text class="theme-option__text">
                    {{ t(`sideMenu.${option.labelKey}`) }}
                </text>
            </view>
        </view>
    </hy-popup>
</template>

<style lang="scss" scoped>
.side-menu {
    /* ============== 弹窗整体：纵向 flex 布局 ============== */
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    /* ============== 用户信息头部 ============== */
    &__header {
        display: flex;
        align-items: center;
        gap: 34rpx;
        padding: 48rpx 88rpx 40rpx;
    }

    &__user {
        display: flex;
        flex-direction: column;
        gap: 6rpx;
        min-width: 0;
    }

    &__username {
        font-size: $flux-font-lg;
        font-weight: 700;
        color: $flux-text-primary;
    }

    &__email {
        font-size: $flux-font-md;
        color: $flux-text-primary;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    /* ============== 菜单分组 ============== */
    &__group {
        display: flex;
        flex-direction: column;
    }

    &__group-title {
        margin: 48rpx 0 32rpx;
        padding-left: 66rpx;
        font-size: $flux-font-md;
        font-weight: 500;
        color: $flux-text-secondary;
        text-transform: uppercase;
    }

    /* ============== 菜单项 ============== */
    &__item {
        display: flex;
        align-items: center;
        gap: 40rpx;
        height: 110rpx;
        margin: 0 26rpx;
        padding-left: 40rpx;
        border-radius: 20rpx;
        color: $flux-text-secondary;
        transition: background-color 0.2s;

        /* #ifdef H5 */
        cursor: pointer;
        /* #endif */

        &:active {
            opacity: 0.7;
        }

        &.is-active {
            background-color: #f4f5f6;
            color: $flux-text-primary;
        }
    }

    &__item-text {
        font-size: $flux-font-lg;
        font-weight: 500;
        line-height: 1.4;

        .is-active & {
            font-weight: 700;
        }
    }

    /* ============== 底部主题切换 ============== */
    &__theme {
        display: flex;
        align-items: center;
        margin: 24rpx 52rpx;
        margin-bottom: calc(24rpx + env(safe-area-inset-bottom));
        padding: 8rpx;
        border-radius: 100rpx;
        background-color: #f4f5f6;
    }
}

.theme-option {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16rpx;
    height: 76rpx;
    border-radius: 100rpx;
    color: $flux-text-secondary;
    transition: all 0.2s;

    /* #ifdef H5 */
    cursor: pointer;
    /* #endif */

    &.is-active {
        background-color: $hy-background--container;
        color: #2c2f32;
    }

    &__icon {
        width: 44rpx;
        height: 44rpx;
    }

    &__text {
        font-size: $flux-font-md;
        font-weight: 500;
    }
}
</style>
