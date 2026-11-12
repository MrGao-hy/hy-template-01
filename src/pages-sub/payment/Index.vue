<script setup lang="ts">
import { useTranslate } from '@hy-app/ui';
import Navbar from '@/components/Navbar.vue';
import { Config } from '@/config';

/**
 * 支付管理页
 * 标题栏 + Card Management / Add new+ + 银行卡 + or check out with + 快捷支付品牌
 */
definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('payment');

/** 银行卡项 */
interface BankCard {
    id: number;
    /** 卡号（4 位一组，空格分隔） */
    no: string;
    /** 持卡人 */
    holder: string;
    /** 有效期 MM/YY */
    valid: string;
}

/** 快捷支付方式 */
interface PaymentMethod {
    name: string;
    logo: string;
}

/** 银行卡列表（Figma 设计稿 mock 数据） */
const cards: BankCard[] = [
    { id: 1, no: '4364 1345 8932 8378', holder: 'Sunie Pham', valid: '05/24' },
];

/** 快捷支付品牌（Figma payments 组件：PayPal / Visa / Mastercard / Alipay / Amex） */
const paymentMethods: PaymentMethod[] = [
    { name: 'PayPal', logo: `${Config.IMG}/logo-paypal.svg` },
    { name: 'Visa', logo: `${Config.IMG}/logo-visa.svg` },
    { name: 'Mastercard', logo: `${Config.IMG}/logo-mastercard.svg` },
    { name: 'Alipay', logo: `${Config.IMG}/logo-alipay.svg` },
    { name: 'Amex', logo: `${Config.IMG}/logo-amex.svg` },
];

// ============== 事件处理 ==============

/** 返回上一页 */
const onBack = () => {
    uni.navigateBack();
};

/** 添加新卡 */
const onAddNew = () => {
    uni.navigateTo({ url: '/pages-sub/add-card/Index' });
};
</script>

<template>
    <!-- ============== 顶部：返回 + 标题 ============== -->
    <navbar :title="t('title')"></navbar>


    <view class="payment-page">
        <!-- ============== Card Management + Add new+ ============== -->
        <view class="payment-page__bar">
            <text class="payment-page__section">{{ t('cardManagement') }}</text>
            <text class="payment-page__add" @tap="onAddNew">
                {{ t('addNew') }}
            </text>
        </view>

        <!-- ============== 银行卡 ============== -->
        <view class="card-list">
            <view v-for="card in cards" :key="card.id" class="bank-card">
                <view class="bank-card__brand">
                    <hy-image
                        :src="`${Config.IMG}/logo-visa-white.svg`"
                        width="118rpx"
                        height="40rpx"
                        mode="aspectFit"
                        :show-loading="false"
                        :show-error="false"
                    />
                </view>
                <view class="bank-card__no">
                    <text
                        v-for="(seg, i) in card.no.split(' ')"
                        :key="i"
                        class="bank-card__seg"
                    >
                        {{ seg }}
                    </text>
                </view>
                <view class="bank-card__foot">
                    <view class="bank-card__field">
                        <text class="bank-card__field-label">
                            {{ t('cardholder') }}
                        </text>
                        <text class="bank-card__field-value">
                            {{ card.holder }}
                        </text>
                    </view>
                    <view class="bank-card__field bank-card__field--right">
                        <text class="bank-card__field-label">
                            {{ t('validThru') }}
                        </text>
                        <text class="bank-card__field-value">
                            {{ card.valid }}
                        </text>
                    </view>
                </view>
            </view>
        </view>

        <!-- ============== or check out with ============== -->
        <text class="payment-page__or">{{ t('orCheckOutWith') }}</text>
        <view class="payment-methods">
            <hy-image
                v-for="method in paymentMethods"
                :key="method.name"
                :src="method.logo"
                width="99rpx"
                height="68rpx"
                mode="aspectFit"
                :show-loading="false"
                :show-error="false"
            />
        </view>
    </view>
</template>

<style lang="scss" scoped>
.payment-page {
    box-sizing: border-box;
    min-height: 100vh;
    padding: calc(var(--status-bar-height) + 20rpx) 60rpx
        calc(60rpx + env(safe-area-inset-bottom));
    background-color: $hy-background;

    &__bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 72rpx;
    }

    &__section {
        font-size: 36rpx;
        font-weight: 700;
    }

    &__add {
        font-size: 28rpx;
        font-weight: 700;
        color: #ed0006;

        &:active {
            opacity: 0.7;
        }
    }

    &__or {
        display: block;
        margin-top: 100rpx;
        font-size: 24rpx;
        color: $hy-text-color--2;
    }
}

/* 银行卡列表（左右各外扩 12rpx，对齐设计稿 654rpx 卡宽） */
.card-list {
    display: flex;
    flex-direction: column;
    gap: 32rpx;
    margin: 80rpx -12rpx 0;
}

.bank-card {
    box-sizing: border-box;
    height: 382rpx;
    padding: 44rpx 32rpx;
    background: linear-gradient(180deg, #57adf4 0%, #14c1d9 55%, #998fd4 100%);
    border-radius: 22rpx;
    box-shadow: 0 20rpx 30rpx rgba(171, 169, 167, 0.55);

    &__brand {
        display: flex;
        justify-content: flex-end;
    }

    &__no {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 90rpx;
    }

    &__seg {
        font-size: 40rpx;
        letter-spacing: 6rpx;
        color: var(--hy-text-color--inverse, #ffffff);
    }

    &__foot {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-top: 44rpx;
    }

    &__field {
        display: flex;
        flex-direction: column;
        gap: 8rpx;

        &--right {
            align-items: flex-end;
        }
    }

    &__field-label {
        font-size: 18rpx;
        font-weight: 800;
        letter-spacing: 2rpx;
        color: var(--hy-text-color--inverse, #ffffff);
    }

    &__field-value {
        font-size: 22rpx;
        font-weight: 600;
        color: var(--hy-text-color--inverse, #ffffff);
    }
}

/* 快捷支付品牌 */
.payment-methods {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 56rpx;
}
</style>
