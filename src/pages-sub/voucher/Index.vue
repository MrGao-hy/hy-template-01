<script setup lang="ts">
import { computed } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';
import Navbar from '@/components/Navbar.vue';

/**
 * 优惠券页
 */
definePage({
    style: {
        navigationStyle: 'custom',
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
    /** 折扣块底色 */
    tint: string;
    /** 有效期：日 */
    day: string;
    /** 有效期：月 */
    month: string;
}

/** 券列表（顺序与配色按设计稿） */
const vouchers = computed<VoucherItem[]>(() => [
    {
        key: 'blackFriday',
        title: t('item3Title'),
        desc: t('item3Desc'),
        code: t('item3Code'),
        percent: 50,
        tint: '#23262F',
        day: '20',
        month: 'Dec',
    },
    {
        key: 'holidaySale',
        title: t('item1Title'),
        desc: t('item1Desc'),
        code: t('item1Code'),
        percent: 30,
        tint: '#777E90',
        day: '22',
        month: 'Dec',
    },
    {
        key: 'firstOrder',
        title: t('item2Title'),
        desc: t('item2Desc'),
        code: t('item2Code'),
        percent: 20,
        tint: '#B1B5C3',
        day: '28',
        month: 'Dec',
    },
]);

// ============== 事件处理 ==============

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
    <!-- ============== 顶部：返回 + 标题 ============== -->
    <navbar
        :title="t('title')"
    ></navbar>

    <view class="voucher-page">
        <!-- ============== 优惠券列表 ============== -->
        <view class="voucher-list">
            <view
                v-for="item in vouchers"
                :key="item.key"
                class="voucher-card"
                @tap="onUseVoucher(item)"
            >
                <!-- 左侧撕边齿（页面底色圆点压边） -->
                <view class="voucher-card__teeth">
                    <view
                        v-for="n in 5"
                        :key="n"
                        class="voucher-card__tooth"
                    />
                </view>

                <!-- 折扣块 -->
                <view
                    class="voucher-card__left"
                    :style="{ backgroundColor: item.tint }"
                >
                    <text class="voucher-card__percent">{{ item.percent }}%</text>
                </view>

                <!-- 右侧信息 -->
                <view class="voucher-card__body">
                    <text class="voucher-card__title">{{ item.title }}</text>
                    <text class="voucher-card__desc">{{ item.desc }}</text>
                    <text class="voucher-card__code">{{ item.code }}</text>
                </view>

                <!-- 有效期 -->
                <view class="voucher-card__exp">
                    <text class="voucher-card__exp-label">{{ t('exp') }}</text>
                    <text class="voucher-card__exp-day">{{ item.day }}</text>
                    <text class="voucher-card__exp-month">{{ item.month }}</text>
                </view>

                <!-- 虚线分隔处上下冲孔 -->
                <view class="voucher-card__punch voucher-card__punch--top" />
                <view
                    class="voucher-card__punch voucher-card__punch--bottom"
                />
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>

.voucher-page {
    box-sizing: border-box;
    min-height: 100vh;
    padding: 0 52rpx calc(40rpx + env(safe-area-inset-bottom));
    background-color: var(--hy-voucher-bg);
}

/* 优惠券列表 */
.voucher-list {
    display: flex;
    flex-direction: column;
    gap: 56rpx;
    padding-top: 60rpx;
}

.voucher-card {
    position: relative;
    display: flex;
    align-items: stretch;
    box-sizing: border-box;
    height: 177rpx;
    border-radius: 18rpx;
    overflow: hidden;
    background-color: var(--hy-voucher-card-bg);
    box-shadow: var(--hy-voucher-card-shadow);

    &:active {
        opacity: 0.85;
    }

    /* 左侧撕边齿 */
    &__teeth {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: 0;
    }

    &__tooth {
        width: 26rpx;
        height: 26rpx;
        margin-left: -13rpx;
        border-radius: 50%;
        background-color: var(--hy-voucher-notch);
    }

    /* 折扣块 */
    &__left {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        align-self: center;
        width: 136rpx;
        height: 136rpx;
        margin-left: 40rpx;
        border-radius: 24rpx;
    }

    &__percent {
        font-size: 40rpx;
        font-weight: 600;
        color: #ffffff;
    }

    /* 信息区 */
    &__body {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: center;
        gap: 6rpx;
        min-width: 0;
        padding: 0 12rpx 0 28rpx;
        box-sizing: border-box;
    }

    &__title {
        font-size: 32rpx;
        font-weight: 700;
        color: var(--hy-voucher-title);
    }

    &__desc {
        font-size: 24rpx;
        color: var(--hy-voucher-desc);
    }

    &__code {
        margin-top: 4rpx;
        font-size: 26rpx;
        font-weight: 600;
        color: var(--hy-voucher-title);
    }

    /* 有效期栏 */
    &__exp {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-shrink: 0;
        box-sizing: border-box;
        width: 88rpx;
        padding-top: 26rpx;
        border-left: 3rpx dashed var(--hy-voucher-divider);
    }

    &__exp-label {
        font-size: 20rpx;
        color: var(--hy-voucher-exp-label);
    }

    &__exp-day {
        margin-top: 36rpx;
        font-size: 22rpx;
        line-height: 1.4;
        color: var(--hy-voucher-exp-date);
    }

    &__exp-month {
        font-size: 22rpx;
        line-height: 1.4;
        color: var(--hy-voucher-exp-date);
    }

    /* 虚线分隔处上下冲孔 */
    &__punch {
        position: absolute;
        right: 88rpx;
        width: 20rpx;
        height: 20rpx;
        border-radius: 50%;
        background-color: var(--hy-voucher-notch);
        transform: translateX(50%);
    }

    &__punch--top {
        top: -10rpx;
    }

    &__punch--bottom {
        bottom: -10rpx;
    }
}
</style>
