<script setup lang="ts">
import { computed } from 'vue';
import { IconConfig, useMessage, useTranslate } from '@hy-app/ui';
import TheRootPages from '@/components/TheRootPages.vue';
import Tabbar from '@/components/Tabbar.vue';
import { Config } from '@/config';

definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('profile');
const message = useMessage();

/** 当前登录用户（Figma 设计稿模拟数据） */
const userInfo = {
    name: 'Sunie Pham',
    email: 'sunieux@gmail.com',
    avatar: `${Config.IMG}/avatar.jpg`,
};

/** 菜单项类型 */
interface MenuItem {
    key: string;
    label: string;
    icon: string;
    url?: string;
    danger?: boolean;
}

/** 菜单列表（对应 Figma profile 画板） */
const menuList = computed<MenuItem[]>(() => [
    {
        key: 'address',
        label: t('address'),
        icon: IconConfig.MAP,
        url: '/pages-sub/address/Index',
    },
    {
        key: 'payment',
        label: t('paymentMethod'),
        icon: IconConfig.SHOPPING_BAG,
        url: '/pages-sub/payment/Index',
    },
    {
        key: 'voucher',
        label: t('voucher'),
        icon: IconConfig.TAG,
        url: '/pages-sub/voucher/Index',
    },
    {
        key: 'wishlist',
        label: t('myWishlist'),
        icon: IconConfig.STAR_FILL,
        url: '/pages-sub/wishlist/Index',
    },
    { key: 'rate', label: t('rateThisApp'), icon: IconConfig.STAR },
    {
        key: 'logout',
        label: t('logout'),
        icon: IconConfig.EXPORT,
    },
]);

// ============== 事件处理 ==============

/** 编辑资料 */
const onEditProfile = () => {
    uni.navigateTo({ url: '/pages-sub/profile-setting/Index' });
};

/** 给我们评分 */
const onRateApp = () => {
    uni.showToast({ title: 'GemStore ★ 5.0', icon: 'none' });
};

/** 退出登录确认 */
const onLogout = () => {
    message.confirm({
        title: t('logoutTitle'),
        content: t('logoutContent'),
        cancelText: t('cancel'),
        confirmText: t('confirm'),
        confirm: () => {
            uni.reLaunch({ url: '/pages-sub/welcome/Index' });
        },
    });
};

/** 菜单项点击（hy-cell click 事件，name 对应 item.key） */
const onCellClick = (name: string | number) => {
    const item = menuList.value.find(i => i.key === name);
    if (!item) return;
    if (item.key === 'rate') {
        onRateApp();
        return;
    }
    if (item.key === 'logout') {
        onLogout();
        return;
    }
    if (item.url) {
        uni.navigateTo({ url: item.url });
    }
};

/** 导航到tabBar页面 */
const onToPages = () => {};
</script>

<template>
    <!-- ============== 用户信息头部 ============== -->
    <view class="profile-header" @tap="onEditProfile">
        <hy-avatar :src="userInfo.avatar" />
        <view class="profile-header__info">
            <text class="profile-header__name">{{ userInfo.name }}</text>
            <text class="profile-header__email">{{ userInfo.email }}</text>
        </view>
        <hy-icon :name="IconConfig.SETTING_FILL" :size="24" />
    </view>

    <!-- ============== 菜单列表（hy-card + hy-cell） ============== -->
    <hy-card
        :border-radius="16"
        margin="0 24rpx"
        :padding="0"
        border
        :show-foot="false"
    >
        <hy-cell clickable :border="false" @click="onCellClick" size="large">
            <hy-cell-item
                v-for="item in menuList.filter(i => !i.danger)"
                :key="item.key"
                :name="item.key"
                :title="item.label"
                :icon="{ name: item.icon }"
            />
        </hy-cell>
    </hy-card>

    <!-- ============== 底部 TabBar ============== -->
    <tabbar :current="3" @change="onToPages" />
</template>

<style lang="scss" scoped>
/* 用户信息头部 */
.profile-header {
    display: flex;
    align-items: center;
    gap: 34rpx;
    padding: calc(var(--status-bar-height) + 128rpx) 64rpx;

    &__info {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 6rpx;
        min-width: 0;
    }

    &__name {
        font-size: 32rpx;
        font-weight: 700;
    }

    &__email {
        font-size: 26rpx;
        color: $hy-text-color--3;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
}
</style>
