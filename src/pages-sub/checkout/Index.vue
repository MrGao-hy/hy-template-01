<script setup lang="ts">
import { computed, ref } from 'vue';
import { onReady } from '@dcloudio/uni-app';
import { IconConfig, useToast, useTranslate } from '@hy-app/ui';
import TheRootPages from '@/components/TheRootPages.vue';
import ShippingStep from './components/ShippingStep.vue';
import PaymentStep from './components/PaymentStep.vue';
import ConfirmStep from './components/ConfirmStep.vue';

/**
 * 结算流程页（Figma: 8782-2325）
 * 进度条下共 3 步：1 配送信息 → 2 支付方式 → 3 确认订单
 */
definePage({
    style: {
        navigationBarTitleText: '',
    },
});

const { t } = useTranslate('checkout');
const toast = useToast();

onReady(() => {
    uni.setNavigationBarTitle({
        title: t('title'),
    });
});

/** 结算步骤总数 */
const STEP_COUNT = 3;

/** 步骤图标（配送地址 / 支付 / 确认订单） */
const STEP_ICONS = [IconConfig.MAP, IconConfig.SECURITY, IconConfig.CHECK_MASK];

/** 当前步骤（1 起） */
const currentStep = ref(3);

/** 步骤标题映射 */
const stepTitle = computed(() => {
    if (currentStep.value === 1) return t('shippingTitle');
    if (currentStep.value === 2) return t('paymentTitle');
    return t('confirmTitle');
});

/** 底栏按钮文案（随步骤变化） */
const footerText = computed(() => {
    if (currentStep.value === 1) return t('continuePayment');
    if (currentStep.value === 2) return t('continueReview');
    return t('placeOrder');
});

/** STEP 1 组件实例（表单校验用） */
interface ShippingStepInstance {
    validate: () => Promise<boolean>;
}
const shippingRef = ref<ShippingStepInstance>();

// ============== 事件 ==============

/** 底栏按钮：推进步骤（STEP 1 需先通过表单校验） */
const onStepNext = async () => {
    if (currentStep.value === 1) {
        const valid = await shippingRef.value?.validate();
        if (!valid) return;
    }
    if (currentStep.value >= STEP_COUNT) {
        toast.success(t('orderPlaced'));
        return;
    }
    currentStep.value += 1;
};
</script>

<template>
    <the-root-pages class="checkout-page">
        <!-- ============== 步骤条（图标节点 + 留缝连接线） ============== -->
        <view class="step-bar">
            <view class="step-bar__track">
                <template v-for="i in STEP_COUNT" :key="i">
                    <view
                        class="step-bar__node"
                        :class="{ 'is-active': i <= currentStep }"
                    >
                        <hy-icon
                            :name="STEP_ICONS[i - 1]"
                            size="26rpx"
                            :color="i <= currentStep ? '#ffffff' : '#bebfc4'"
                        />
                    </view>
                    <view
                        v-if="i < STEP_COUNT"
                        class="step-bar__line"
                        :class="{ 'is-active': i < currentStep }"
                    ></view>
                </template>
            </view>
            <text class="step-bar__label">
                {{ t('stepLabel', { step: currentStep }) }}
            </text>
            <text class="step-bar__name">{{ stepTitle }}</text>
        </view>

        <!-- ============== STEP 1：配送信息 ============== -->
        <shipping-step v-show="currentStep === 1" ref="shippingRef" />

        <!-- ============== STEP 2：支付方式 ============== -->
        <payment-step v-show="currentStep === 2" />

        <!-- ============== STEP 3：确认订单 ============== -->
        <confirm-step v-show="currentStep === 3" />

        <!-- ============== 底部：下一步（hy-button） ============== -->
        <view class="checkout-footer">
            <hy-button
                shape="circle"
                color="#343434"
                :text="footerText"
                @click="onStepNext"
            />
        </view>
    </the-root-pages>
</template>

<style lang="scss" scoped>
.checkout-page {
    padding: 0 30rpx 180rpx;
}

/* 步骤条 */
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
        background-color: #f1f2f3;
        border-radius: 50%;

        &.is-active {
            background-color: #508a7b;
        }
    }

    &__line {
        flex: 1;
        height: 4rpx;
        margin: 0 20rpx;
        background-color: #e8e8e8;
        border-radius: 2rpx;

        &.is-active {
            background-color: #508a7b;
        }
    }

    &__label {
        display: block;
        margin-top: 24rpx;
        font-size: 22rpx;
        font-weight: 600;
        letter-spacing: 2rpx;
        color: #8a8a8f;
        text-transform: uppercase;
    }

    &__name {
        display: block;
        margin-top: 8rpx;
        font-size: 50rpx;
        font-weight: 700;
        color: $flux-text-primary;
    }
}

/* 底部按钮容器 */
.checkout-footer {
    position: fixed;
    right: 40rpx;
    bottom: calc(40rpx + env(safe-area-inset-bottom));
    left: 40rpx;
    z-index: 10;
}
</style>
