<script setup lang="ts">
import { computed } from 'vue';
import { useToast, useTranslate } from '@hy-app/ui';
import Navbar from '@/components/Navbar.vue';

definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('address');
const toast = useToast();

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

/** 编辑地址 */
const onEdit = (item: AddressItem) => {
    toast.show(`${t('edit')}: ${item.label}`);
};

/** 新增地址 */
const onAddNew = () => {
    toast.show(t('addNew'));
};
</script>

<template>
    <!-- ============== 顶部：返回 + 标题 ============== -->
    <navbar :title="t('title')"></navbar>

    <view class="address-page">
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
                        <hy-text
                            :text="t('edit')"
                            mode="link"
                            color="red"
                            size="small"
                        ></hy-text>
                    </view>
                </view>
                <text class="address-card__label">{{ item.label }}</text>
                <text class="address-card__text">{{ item.text }}</text>
            </view>
        </view>

        <!-- ============== 新增地址 ============== -->
        <hy-button
            @click="onAddNew"
            :text="t('addNew')"
            shape="circle"
            custom-class="add-btn"
        ></hy-button>
    </view>
</template>

<style lang="scss" scoped>
.address-page {
    min-height: 100vh;
    padding: calc(var(--status-bar-height) + 40rpx) 40rpx
        calc(40rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
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
    border: 2rpx solid $hy-background--empty;
    border-radius: $hy-radius-lg;
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
        color: $hy-text-color--3;
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
        color: $hy-text-color--3;
    }

    &__label {
        font-size: 30rpx;
        font-weight: 700;
        color: $hy-text-color;
    }

    &__text {
        font-size: 26rpx;
        line-height: 1.5;
        color: $hy-text-color--3;
    }
}

/* 新增按钮 */
:deep(.add-btn) {
    position: fixed;
    right: 40rpx;
    left: 40rpx;
    bottom: calc(150rpx + env(safe-area-inset-bottom));
}
</style>
