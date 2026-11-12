<script setup lang="ts">
import { ref } from 'vue';
import { IconConfig } from '@hy-app/ui';
import Icon from '@/components/Icon.vue';
import SideMenuPopup from '@/components/SideMenuPopup.vue';
import { openSideMenuRoute } from '@/components/side-menu';
import type { SideMenuItem } from '@/pages/index/components/types';

/**
 * 主页面通用导航栏：左侧菜单按钮 + 标题 + 右侧通知（带红点）
 * 内部已处理侧边菜单弹窗打开与菜单跳转、通知页跳转
 */
const props = withDefaults(
    defineProps<{
        /** 导航栏标题 */
        title?: string;
        /** 侧边菜单默认激活项 id */
        activeId?: number;
    }>(),
    { activeId: 1 }
);

/** 侧边工具列表弹窗显隐 */
const showSideMenu = ref(false);

/** 菜单点击：打开侧边工具列表弹窗 */
const onMenuTap = () => {
    showSideMenu.value = true;
};

/** 侧边工具列表选中：跳转对应页面 */
const onSideMenuSelect = (item: SideMenuItem) => {
    openSideMenuRoute(item.id);
};

/** 通知点击：跳转通知页 */
const onNotificationTap = () => {
    uni.navigateTo({ url: '/pages-sub/notification/Index' });
};
</script>

<template>
    <hy-navbar
        :title="props.title"
        :title-style="{ fontSize: '36rpx', fontWeight: '700' }"
        placeholder
        @left-click="onMenuTap"
        @right-click="onNotificationTap"
    >
        <template #left>
            <Icon name="menu" />
        </template>
        <template #right>
            <view class="navbar-right-item">
                <hy-icon :name="IconConfig.REMIND" />
                <hy-badge is-dot absolute :offset="[0, 12]"></hy-badge>
            </view>
        </template>
    </hy-navbar>

    <!-- ============== 侧边工具列表弹窗 ============== -->
    <side-menu-popup
        v-model:show="showSideMenu"
        :active-id="props.activeId"
        @select="onSideMenuSelect"
    />
</template>

<style lang="scss" scoped>
.navbar-right-item {
    position: relative;

    .hy-badge {
        border: 2px solid $hy-background;
    }
}
</style>
