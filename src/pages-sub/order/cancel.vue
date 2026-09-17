<script setup lang="ts">
import { computed, ref } from 'vue';
import { IconConfig, useToast, useTranslate } from '@hy-app/ui';
import { onLoad } from '@dcloudio/uni-app';

/**
 * 取消订单（常规订单流程占位实现，待 Figma 设计稿校准）
 */
definePage({
    style: {
        navigationStyle: 'custom',
        navigationBarTextStyle: 'black',
    },
});

const { t } = useTranslate('order');
const toast = useToast();

/** 订单号 */
const orderNo = ref('');

onLoad(options => {
    orderNo.value = options?.no ?? '';
});

/** 取消原因选项 */
const reasons = computed(() => [
    t('reasonChange'),
    t('reasonSlow'),
    t('reasonDuplicate'),
    t('reasonOther'),
]);
const selectedReason = ref('');

/** 备注说明 */
const remark = ref('');

// ============== 事件 ==============

const onBack = () => {
    uni.navigateBack();
};

/** 选择原因 */
const onSelectReason = (reason: string) => {
    selectedReason.value = reason;
};

/** 确认取消 */
const onConfirm = () => {
    if (!selectedReason.value) {
        toast.show(t('cancelReason'));
        return;
    }
    toast.success(t('cancelSuccess'));
    setTimeout(() => {
        uni.navigateBack();
    }, 1200);
};
</script>

<template>
    <view class="cancel-page">
        <!-- ============== 顶部 ============== -->
        <view class="cancel-page__header">
            <view class="cancel-page__back" @tap="onBack">
                <hy-icon :name="IconConfig.LEFT" size="36rpx" color="#1a1a1a" />
            </view>
            <text class="cancel-page__title">{{ t('cancelTitle') }}</text>
        </view>

        <!-- ============== 取消原因 ============== -->
        <view class="reason-section">
            <text class="reason-section__title">
                {{ t('cancelReason') }}
            </text>
            <view
                v-for="reason in reasons"
                :key="reason"
                class="reason-item"
                @tap="onSelectReason(reason)"
            >
                <view
                    class="reason-item__radio"
                    :class="{ 'is-active': selectedReason === reason }"
                >
                    <view
                        v-if="selectedReason === reason"
                        class="reason-item__radio-dot"
                    ></view>
                </view>
                <text class="reason-item__label">{{ reason }}</text>
            </view>
        </view>

        <!-- ============== 备注说明 ============== -->
        <view class="remark-section">
            <text class="remark-section__title">{{ t('remarkLabel') }}</text>
            <textarea
                v-model="remark"
                class="remark-section__input"
                :placeholder="t('remarkPlaceholder')"
                placeholder-class="remark-placeholder"
                :maxlength="200"
            />
        </view>

        <!-- ============== 底部确认 ============== -->
        <view class="cancel-page__footer" @tap="onConfirm">
            {{ t('confirmCancel') }}
        </view>
    </view>
</template>

<style lang="scss" scoped>
.cancel-page {
    min-height: 100vh;
    padding: calc(var(--status-bar-height) + 40rpx) 40rpx
        calc(200rpx + env(safe-area-inset-bottom));
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

    &__footer {
        position: fixed;
        right: 40rpx;
        bottom: calc(40rpx + env(safe-area-inset-bottom));
        left: 40rpx;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 96rpx;
        font-size: 32rpx;
        font-weight: 700;
        color: #ffffff;
        background-color: #343434;
        border-radius: 48rpx;

        &:active {
            opacity: 0.9;
        }
    }
}

/* 取消原因 */
.reason-section {
    margin-top: 48rpx;

    &__title {
        display: block;
        margin-bottom: 28rpx;
        font-size: $flux-font-lg;
        font-weight: 700;
        color: $flux-text-primary;
    }
}

.reason-item {
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
        flex: 1;
        font-size: 28rpx;
        color: rgba(51, 48, 46, 0.7);
    }
}

/* 备注说明 */
.remark-section {
    margin-top: 48rpx;

    &__title {
        display: block;
        margin-bottom: 24rpx;
        font-size: $flux-font-lg;
        font-weight: 700;
        color: $flux-text-primary;
    }

    &__input {
        width: 100%;
        height: 220rpx;
        padding: 28rpx 32rpx;
        font-size: 26rpx;
        color: $flux-text-primary;
        background-color: #f7f7f8;
        border-radius: $flux-radius-md;
        box-sizing: border-box;
    }
}

:deep(.remark-placeholder) {
    color: #cbcdd8;
}
</style>
