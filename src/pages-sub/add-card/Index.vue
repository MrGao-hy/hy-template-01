<script setup lang="ts">
import { ref } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';

/**
 * 添加新卡页（Figma 画板 8782:3885 add new card）
 * 卡片预览（**** **** **** ****）+ Cardholder/Card Number/Expires/CVV 表单 + Add card
 */
definePage({
    style: {
        navigationStyle: 'custom',
        navigationBarTextStyle: 'black',
    },
});

const { t } = useTranslate('addCard');

/** 表单数据 */
const form = ref({
    cardholder: '',
    cardNumber: '',
    expires: '',
    cvv: '',
});

/** 卡号掩码预览（4 组 ****） */
const maskedGroups = ['****', '****', '****', '****'];

// ============== 事件处理 ==============

/** 返回上一页 */
const onBack = () => {
    uni.navigateBack();
};

/** 有效期输入格式化 MM/YY */
const onExpiresInput = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    form.value.expires =
        digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

/** CVV 仅数字 */
const onCvvInput = (val: string) => {
    form.value.cvv = val.replace(/\D/g, '').slice(0, 3);
};

/** 提交添加卡片 */
const onAddCard = () => {
    if (!form.value.cardholder || !form.value.cardNumber) {
        uni.showToast({ title: t('cardholderName'), icon: 'none' });
        return;
    }
    uni.showToast({ title: t('addCard'), icon: 'success' });
    setTimeout(() => uni.navigateBack(), 800);
};
</script>

<template>
    <view class="add-card">
        <!-- ============== 顶部：返回 + 标题 ============== -->
        <view class="add-card__header">
            <view class="add-card__back" @tap="onBack">
                <hy-icon :name="IconConfig.LEFT" size="36rpx" color="#1a1a1a" />
            </view>
            <text class="add-card__title">{{ t('title') }}</text>
        </view>

        <!-- ============== 卡片预览 ============== -->
        <view class="bank-card">
            <view class="bank-card__no">
                <text
                    v-for="(seg, i) in maskedGroups"
                    :key="i"
                    class="bank-card__seg"
                >
                    {{ seg }}
                </text>
            </view>
            <view class="bank-card__bottom">
                <view class="bank-card__field">
                    <text class="bank-card__field-label">
                        {{ form.cardholder || 'NAME' }}
                    </text>
                    <text class="bank-card__field-value">
                        {{ form.cardholder || t('cardholderName') }}
                    </text>
                </view>
                <view class="bank-card__field bank-card__field--right">
                    <text class="bank-card__field-value">
                        {{ form.expires || 'MM/YY' }}
                    </text>
                    <text class="bank-card__field-label">{{ t('expires') }}</text>
                </view>
            </view>
        </view>

        <!-- ============== 表单 ============== -->
        <view class="form">
            <view class="form__field">
                <text class="form__label">{{ t('cardholderName') }}</text>
                <hy-input v-model="form.cardholder" :border="false" placeholder="Sunie Pham" custom-class="form__input" />
            </view>
            <view class="form__field">
                <text class="form__label">{{ t('cardNumber') }}</text>
                <hy-input v-model="form.cardNumber" type="number" :border="false" placeholder="5412363272837284" custom-class="form__input" />
            </view>
            <view class="form__row">
                <view class="form__field">
                    <text class="form__label">{{ t('expires') }}</text>
                    <hy-input
                        :model-value="form.expires"
                        :border="false"
                        placeholder="03/23"
                        type="number"
                        custom-class="form__input"
                        @update:model-value="onExpiresInput"
                    />
                </view>
                <view class="form__field">
                    <text class="form__label">{{ t('cvv') }}</text>
                    <hy-input
                        :model-value="form.cvv"
                        :border="false"
                        placeholder="999"
                        type="number"
                        password
                        custom-class="form__input"
                        @update:model-value="onCvvInput"
                    />
                </view>
            </view>
        </view>

        <!-- ============== 添加按钮 ============== -->
        <view class="add-btn" @tap="onAddCard">
            {{ t('addCard') }}
        </view>
    </view>
</template>

<style lang="scss" scoped>
.add-card {
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

/* 卡片预览 */
.bank-card {
    padding: 36rpx;
    margin-top: 40rpx;
    background: linear-gradient(135deg, #43434b 0%, #191920 60%, #2f2f38 100%);
    border-radius: 28rpx;

    &__no {
        display: flex;
        gap: 32rpx;
    }

    &__seg {
        font-size: 36rpx;
        font-weight: 700;
        letter-spacing: 4rpx;
        color: #ffffff;
    }

    &__bottom {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-top: 48rpx;
    }

    &__field {
        display: flex;
        flex-direction: column;
        gap: 6rpx;

        &--right {
            align-items: flex-end;
        }
    }

    &__field-label {
        font-size: 18rpx;
        letter-spacing: 2rpx;
        color: rgba(255, 255, 255, 0.6);
    }

    &__field-value {
        font-size: 26rpx;
        font-weight: 600;
        color: #ffffff;
    }
}

/* 表单 */
.form {
    display: flex;
    flex-direction: column;
    margin-top: 32rpx;

    &__row {
        display: flex;
        gap: 32rpx;
    }

    &__field {
        display: flex;
        flex: 1;
        flex-direction: column;
        gap: 12rpx;
        padding: 20rpx 0;
        border-bottom: 2rpx solid #f1f2f3;
    }

    &__label {
        font-size: 24rpx;
        color: #8a8a8f;
    }
}

:deep(.form__input) {
    font-size: 30rpx;
}

/* 添加按钮 */
.add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 96rpx;
    margin-top: 64rpx;
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
