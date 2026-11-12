<script setup lang="ts">
import { computed, ref } from 'vue';
import { onReady } from '@dcloudio/uni-app';
import { useToast, useTranslate } from '@hy-app/ui';
import ShippingStep from './components/ShippingStep.vue';
import PaymentStep from './components/PaymentStep.vue';
import ConfirmStep from './components/ConfirmStep.vue';
import StepBar from './components/StepBar.vue';
import Navbar from '@/components/Navbar.vue';

definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('checkout');
const toast = useToast();

/** 结算步骤总数 */
const STEP_COUNT = 3;

/** 当前步骤（1 起） */
const currentStep = ref(1);

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

/** 是否同意条款 */
const agreed = ref(false);

// ============== 事件 ==============

/** 底栏按钮：推进步骤（STEP 1 需表单校验，STEP 2 需勾选条款） */
const onStepNext = async () => {
    if (currentStep.value === 1) {
        const valid = await shippingRef.value?.validate();
        if (!valid) return;
    }
    if (currentStep.value >= STEP_COUNT) {
        // 继续购物：回到首页
        uni.switchTab({ url: '/pages/index/Index' });
        return;
    }
    if (currentStep.value === 2 && !agreed.value) {
        toast.show(t('agreeRequired'));
        return;
    }
    currentStep.value += 1;
};
</script>

<template>
    <view class="checkout-page">
        <navbar :title="t('title')"></navbar>

        <!-- ============== 步骤条（图标节点 + 点线连接） ============== -->
        <step-bar :current="currentStep" :total="STEP_COUNT" />

        <!-- ============== STEP 1：配送信息 ============== -->
        <shipping-step v-show="currentStep === 1" ref="shippingRef" />

        <!-- ============== STEP 2：支付方式 ============== -->
        <payment-step v-show="currentStep === 2" v-model:agreed="agreed" />

        <!-- ============== STEP 3：订单完成 ============== -->
        <confirm-step v-show="currentStep === 3" />

        <!-- ============== 底部：STEP 1/3 下一步（hy-button） ============== -->
        <view class="checkout-footer">
            <hy-button
                shape="circle"
                color="#343434"
                :text="footerText"
                @click="onStepNext"
            />
        </view>
    </view>
</template>

<style lang="scss" scoped>
.checkout-page {
    padding: 0 30rpx 180rpx;
}

/* 底部按钮容器 */
.checkout-footer {
    margin-top: 120rpx;
}
</style>
