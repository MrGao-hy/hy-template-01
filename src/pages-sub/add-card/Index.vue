<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTranslate } from '@hy-app/ui';
import Navbar from '@/components/Navbar.vue';
import { Config } from '@/config';

definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('addCard');

/** 新增卡片表单 */
interface AddCardForm {
    /** 持卡人姓名 */
    cardholder: string;
    /** 卡号（纯数字） */
    cardNumber: string;
    /** 有效期 MM/YY */
    expires: string;
    /** 安全码 */
    cvv: string;
}

/** 表单数据 */
const form = ref<AddCardForm>({
    cardholder: '',
    cardNumber: '',
    expires: '',
    cvv: '',
});

/** 卡片预览：卡号按 4 位分组，未输入部分显示 **** */
const previewGroups = computed(() =>
    Array.from({ length: 4 }, (_, i) =>
        form.value.cardNumber.slice(i * 4, i * 4 + 4).padEnd(4, '*')
    )
);

// ============== 事件处理 ==============

/** 有效期输入格式化 MM/YY */
const onExpiresInput = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    form.value.expires =
        digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};

/** CVV 仅数字，最多 3 位 */
const onCvvInput = (val: string) => {
    form.value.cvv = val.replace(/\D/g, '').slice(0, 3);
};

/** 提交添加卡片 */
const onAddCard = () => {
    const { cardholder, cardNumber, expires, cvv } = form.value;
    const isIncomplete =
        cardholder.trim().length === 0 ||
        cardNumber.length < 16 ||
        expires.length < 5 ||
        cvv.length < 3;
    if (isIncomplete) {
        uni.showToast({ title: t('fillRequired'), icon: 'none' });
        return;
    }
    uni.showToast({ title: t('addCard'), icon: 'success' });
    setTimeout(() => uni.navigateBack(), 800);
};
</script>

<template>
    <!-- ============== 顶部：返回 + 标题 ============== -->
    <navbar :title="t('title')"></navbar>

    <view class="add-card">
        <!-- ============== 卡片预览 ============== -->
        <view class="bank-card">
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
                    v-for="(seg, i) in previewGroups"
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
                        {{ form.cardholder || 'NAME' }}
                    </text>
                </view>
                <view class="bank-card__field bank-card__field--right">
                    <text class="bank-card__field-label">
                        {{ t('validThru') }}
                    </text>
                    <text class="bank-card__field-value">
                        {{ form.expires || 'MM/YY' }}
                    </text>
                </view>
            </view>
        </view>

        <!-- ============== 表单 ============== -->
        <hy-form class="form" :model="form" label-position="top" :border="true">
            <hy-form-item :label="t('cardholderName')" prop="cardholder">
                <hy-input
                    v-model="form.cardholder"
                    border="none"
                    font-size="30rpx"
                    placeholder="Sunie Pham"
                />
            </hy-form-item>
            <hy-form-item :label="t('cardNumber')" prop="cardNumber">
                <hy-input
                    v-model="form.cardNumber"
                    type="number"
                    border="none"
                    font-size="30rpx"
                    :maxlength="16"
                    placeholder="5412 3632 7283 7284"
                />
            </hy-form-item>
            <view class="form__row">
                <hy-form-item :label="t('expires')" prop="expires">
                    <hy-input
                        :model-value="form.expires"
                        border="none"
                        font-size="30rpx"
                        placeholder="03/23"
                        :maxlength="5"
                        @update:model-value="onExpiresInput"
                    />
                </hy-form-item>
                <hy-form-item :label="t('cvv')" prop="cvv">
                    <hy-input
                        :model-value="form.cvv"
                        border="none"
                        font-size="30rpx"
                        placeholder="999"
                        password
                        :maxlength="3"
                        @update:model-value="onCvvInput"
                    />
                </hy-form-item>
            </view>
        </hy-form>

        <!-- ============== 添加按钮 ============== -->
        <hy-button
            class="add-card__submit"
            size="large"
            shape="circle"
            color="#343434"
            :text="t('addCard')"
            @click="onAddCard"
        />
    </view>
</template>

<style lang="scss" scoped>
.add-card {
    box-sizing: border-box;
    min-height: 100vh;
    padding: calc(var(--status-bar-height) + 20rpx) 60rpx
        calc(60rpx + env(safe-area-inset-bottom));
    background-color: $hy-background;

    &__submit {
        margin-top: 72rpx;
    }
}

/* 卡片预览（与支付管理页保持同一视觉） */
.bank-card {
    box-sizing: border-box;
    height: 382rpx;
    margin: 72rpx -12rpx 0;
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

/* 表单 */
.form {
    display: flex;
    flex-direction: column;
    gap: 40rpx;
    margin-top: 64rpx;

    &__row {
        display: flex;
        gap: 40rpx;
    }
}

/* 有效期 / CVV 并排等宽 */
.form__row :deep(.hy-form-item) {
    flex: 1;
    min-width: 0;
}

/* 覆盖 hy-form-item：贴合 Figma（label 24rpx 灰、分隔线 #f1f2f3） */
:deep(.hy-form-item) {
    margin-bottom: 0;

    .hy-form-item__label {
        margin-bottom: 8rpx;
        font-size: 24rpx;
        line-height: 1.5;
        color: $hy-text-color--3;
    }

    .hy-border__bottom {
        padding-bottom: 16rpx;
        border-bottom-color: $hy-background--empty;
    }
}
</style>
