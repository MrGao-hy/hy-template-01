<script setup lang="ts">
import { ref } from 'vue';
import { useTranslate } from '@hy-app/ui';

/**
 * 结算 STEP 2：支付方式
 */
const { t } = useTranslate('checkout');

interface PaymentMethod {
    key: string;
    label: string;
}

/** 支付方式列表 */
const paymentMethods: PaymentMethod[] = [
    { key: 'cash', label: t('paymentCash') },
    { key: 'visa', label: t('paymentVisa') },
    { key: 'mastercard', label: t('paymentMastercard') },
    { key: 'paypal', label: t('paymentPaypal') },
];

/** 当前选中的支付方式 */
const selectedMethod = ref('cash');

/** 选择支付方式 */
const onSelectMethod = (key: string) => {
    selectedMethod.value = key;
};
</script>

<template>
    <view class="payment-step">
        <text class="payment-step__title">
            {{ t('paymentTitle') }}
        </text>

        <view
            v-for="method in paymentMethods"
            :key="method.key"
            class="method-item"
            @tap="onSelectMethod(method.key)"
        >
            <view
                class="method-item__radio"
                :class="{ 'is-active': selectedMethod === method.key }"
            >
                <view
                    v-if="selectedMethod === method.key"
                    class="method-item__radio-dot"
                ></view>
            </view>
            <text class="method-item__label">{{ method.label }}</text>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.payment-step {
    margin-top: 64rpx;

    &__title {
        display: block;
        margin-bottom: 28rpx;
        font-size: $flux-font-lg;
        font-weight: 700;
        color: $flux-text-primary;
    }
}

.method-item {
    display: flex;
    align-items: center;
    gap: 24rpx;
    padding: 28rpx 0;

    &:active {
        opacity: 0.8;
    }

    &__radio {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 46rpx;
        height: 46rpx;
        border: 3rpx solid #bebfc4;
        border-radius: 50%;

        &.is-active {
            border-color: #508a7b;
        }
    }

    &__radio-dot {
        width: 18rpx;
        height: 18rpx;
        background-color: #508a7b;
        border-radius: 50%;
    }

    &__label {
        font-size: 28rpx;
        font-weight: 600;
        color: $flux-text-primary;
    }
}
</style>
