<script setup lang="ts">
import { computed } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';

const props = defineProps<{
    /** 当前步骤（1 起） */
    current: number;
    /** 步骤总数 */
    total: number;
}>();

const { t } = useTranslate('checkout');

/** 步骤图标（配送地址 / 支付 / 确认订单） */
const STEP_ICONS = [IconConfig.MAP, IconConfig.SECURITY, IconConfig.CHECK_MASK];

/** 步骤标题 */
const stepTitle = computed(() => {
    if (props.current === 1) return t('shippingTitle');
    if (props.current === 2) return t('paymentTitle');
    return t('completedTitle');
});
</script>

<template>
    <view class="step-bar">
        <view class="step-bar__track">
            <template v-for="i in props.total" :key="i">
                <view
                    class="step-bar__node"
                    :class="{ 'is-active': i <= props.current }"
                >
                    <hy-icon
                        :name="STEP_ICONS[i - 1]"
                        :size="i <= props.current ? '44rpx' : '26rpx'"
                        :color="
                            i <= props.current
                                ? 'var(--hy-text-color)'
                                : 'var(--hy-text-color--inverse)'
                        "
                    />
                </view>
                <view v-if="i < props.total" class="step-bar__line"></view>
            </template>
        </view>
        <text v-if="props.current < props.total" class="step-bar__label">
            {{ t('stepLabel', { step: props.current }) }}
        </text>
        <text class="step-bar__name">{{ stepTitle }}</text>
    </view>
</template>

<style lang="scss" scoped>
.step-bar {
    margin-top: 40rpx;

    &__track {
        display: flex;
        align-items: center;
        width: 532rpx;
        margin: 0 auto;
    }

    &__node {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 56rpx;
        height: 56rpx;
        background-color: var(--hy-text-color--4);
        border-radius: 50%;

        /* 已到达步骤：仅图标，无圆形底 */
        &.is-active {
            background-color: transparent;
        }
    }

    &__line {
        flex: 1;
        height: 4rpx;
        margin: 0 20rpx;
        background-image: radial-gradient(
            circle,
            var(--hy-text-color--4) 2rpx,
            transparent 2rpx
        );
        background-repeat: repeat-x;
        background-position: center;
        background-size: 26rpx 4rpx;
    }

    &__label {
        display: block;
        margin-top: 24rpx;
        font-size: 22rpx;
        font-weight: 600;
        letter-spacing: 2rpx;
        color: $hy-text-color--3;
        text-transform: uppercase;
    }

    &__name {
        display: block;
        margin-top: 0rpx;
        font-size: 50rpx;
        font-weight: 700;
        color: $hy-text-color;
    }
}
</style>
