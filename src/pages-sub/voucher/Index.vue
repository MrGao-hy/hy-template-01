<script setup lang="ts">
import { computed } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';

/**
 * 优惠券页（Figma 画板 8782:3640 voucher）
 * 3 张券：左侧折扣色块（折扣 + 有效期）+ 右侧标题/描述/优惠码
 */
definePage({
    style: {
        navigationStyle: 'custom',
        navigationBarTextStyle: 'black',
    },
});

const { t } = useTranslate('voucher');

/** 优惠券项类型 */
interface VoucherItem {
    key: string;
    title: string;
    desc: string;
    code: string;
    percent: number;
    expire: string;
}

/** 券列表 */
const vouchers = computed<VoucherItem[]>(() => [
    { key: 'item1', title: t('item1Title'), desc: t('item1Desc'), code: t('item1Code'), percent: 30, expire: `${t('exp')} 12.22` },
    { key: 'item2', title: t('item2Title'), desc: t('item2Desc'), code: t('item2Code'), percent: 20, expire: `${t('exp')} 12.28` },
    { key: 'item3', title: t('item3Title'), desc: t('item3Desc'), code: t('item3Code'), percent: 50, expire: `${t('exp')} 12.20` },
]);

// ============== 事件处理 ==============

/** 返回上一页 */
const onBack = () => {
    uni.navigateBack();
};

/** 使用优惠券 */
const onUseVoucher = (item: VoucherItem) => {
    uni.setClipboardData({
        data: item.code.replace('Code: ', ''),
        success: () => {
            uni.showToast({ title: item.title, icon: 'none' });
        },
    });
};
</script>

<template>
    <view class="voucher-page">
        <!-- ============== 顶部：返回 + 标题 ============== -->
        <view class="voucher-page__header">
            <view class="voucher-page__back" @tap="onBack">
                <hy-icon :name="IconConfig.LEFT" size="36rpx" color="#1a1a1a" />
            </view>
            <text class="voucher-page__title">{{ t('title') }}</text>
        </view>

        <!-- ============== 优惠券列表 ============== -->
        <view class="voucher-list">
            <view
                v-for="item in vouchers"
                :key="item.key"
                class="voucher-card"
                @tap="onUseVoucher(item)"
            >
                <!-- 左侧折扣色块 -->
                <view class="voucher-card__left">
                    <text class="voucher-card__percent">{{ item.percent }}%</text>
                    <text class="voucher-card__expire">{{ item.expire }}</text>
                </view>

                <!-- 右侧信息 -->
                <view class="voucher-card__body">
                    <text class="voucher-card__title">{{ item.title }}</text>
                    <text class="voucher-card__desc">{{ item.desc }}</text>
                    <text class="voucher-card__code">{{ item.code }}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.voucher-page {
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

/* 优惠券列表 */
.voucher-list {
    display: flex;
    flex-direction: column;
    gap: 32rpx;
    margin-top: 40rpx;
}

.voucher-card {
    display: flex;
    align-items: stretch;
    border-radius: $flux-radius-lg;
    overflow: hidden;
    box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.05);

    &:active {
        opacity: 0.85;
    }

    &__left {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8rpx;
        flex-shrink: 0;
        width: 200rpx;
        padding: 32rpx 0;
        background: linear-gradient(160deg, #3d3d43 0%, #191920 100%);
        color: #ffffff;
    }

    &__percent {
        font-size: 44rpx;
        font-weight: 700;
    }

    &__expire {
        font-size: 20rpx;
        opacity: 0.8;
    }

    &__body {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        gap: 8rpx;
        min-width: 0;
        padding: 32rpx;
        background-color: #fafafa;
    }

    &__title {
        font-size: 30rpx;
        font-weight: 700;
        color: $flux-text-primary;
    }

    &__desc {
        font-size: 24rpx;
        color: #8a8a8f;
    }

    &__code {
        margin-top: 8rpx;
        padding: 8rpx 20rpx;
        align-self: flex-start;
        font-size: 22rpx;
        font-weight: 600;
        color: #343434;
        background-color: #ffffff;
        border: 2rpx dashed rgba(52, 52, 52, 0.4);
        border-radius: 100rpx;
    }
}
</style>
