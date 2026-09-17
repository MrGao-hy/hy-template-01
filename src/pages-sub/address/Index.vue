<script setup lang="ts">
import { computed } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';

/**
 * 收货地址页（Figma 画板 8782:3707 address）
 * 2 张地址卡片（SEND TO / Edit / 名称 / 地址）+ Add new address
 */
definePage({
    style: {
        navigationStyle: 'custom',
        navigationBarTextStyle: 'black',
    },
});

const { t } = useTranslate('address');

/** 地址项类型 */
interface AddressItem {
    key: string;
    label: string;
    text: string;
}

/** 地址列表 */
const addressList = computed<AddressItem[]>(() => [
    { key: 'office', label: t('myOffice'), text: t('addressText') },
    { key: 'home', label: t('myHome'), text: t('addressText') },
]);

// ============== 事件处理 ==============

/** 返回上一页 */
const onBack = () => {
    uni.navigateBack();
};

/** 编辑地址 */
const onEdit = (item: AddressItem) => {
    uni.showToast({ title: `${t('edit')}: ${item.label}`, icon: 'none' });
};

/** 新增地址 */
const onAddNew = () => {
    uni.showToast({ title: t('addNew'), icon: 'none' });
};
</script>

<template>
    <view class="address-page">
        <!-- ============== 顶部：返回 + 标题 ============== -->
        <view class="address-page__header">
            <view class="address-page__back" @tap="onBack">
                <hy-icon :name="IconConfig.LEFT" size="36rpx" color="#1a1a1a" />
            </view>
            <text class="address-page__title">{{ t('title') }}</text>
        </view>

        <!-- ============== 地址列表 ============== -->
        <view class="address-list">
            <view
                v-for="item in addressList"
                :key="item.key"
                class="address-card"
            >
                <view class="address-card__head">
                    <text class="address-card__tag">{{ t('sendTo') }}</text>
                    <view class="address-card__edit" @tap="onEdit(item)">
                        <hy-icon :name="IconConfig.EDIT" size="26rpx" color="#8a8a8f" />
                        <text class="address-card__edit-text">{{ t('edit') }}</text>
                    </view>
                </view>
                <text class="address-card__label">{{ item.label }}</text>
                <text class="address-card__text">{{ item.text }}</text>
            </view>
        </view>

        <!-- ============== 新增地址 ============== -->
        <view class="add-btn" @tap="onAddNew">
            {{ t('addNew') }}
        </view>
    </view>
</template>

<style lang="scss" scoped>
.address-page {
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

/* 地址卡片 */
.address-list {
    display: flex;
    flex-direction: column;
    gap: 32rpx;
    margin-top: 40rpx;
}

.address-card {
    display: flex;
    flex-direction: column;
    gap: 12rpx;
    padding: 32rpx;
    border: 2rpx solid #f1f2f3;
    border-radius: $flux-radius-lg;
    box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.04);

    &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__tag {
        font-size: 20rpx;
        font-weight: 600;
        letter-spacing: 2rpx;
        color: #8a8a8f;
    }

    &__edit {
        display: flex;
        align-items: center;
        gap: 8rpx;

        &:active {
            opacity: 0.6;
        }
    }

    &__edit-text {
        font-size: 24rpx;
        color: #8a8a8f;
    }

    &__label {
        font-size: 30rpx;
        font-weight: 700;
        color: $flux-text-primary;
    }

    &__text {
        font-size: 26rpx;
        line-height: 1.5;
        color: #8a8a8f;
    }
}

/* 新增按钮 */
.add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 96rpx;
    margin-top: 48rpx;
    font-size: 30rpx;
    font-weight: 600;
    color: #ffffff;
    background-color: #343434;
    border-radius: 100rpx;

    &:active {
        opacity: 0.85;
    }
}
</style>
