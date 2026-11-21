<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useToast, useTranslate } from '@hy-app/ui';
import AuthField from '@/components/auth/AuthField.vue';
import AuthButton from '@/components/auth/AuthButton.vue';
import Navbar from '@/components/Navbar.vue';
import { Config } from '@/config';

/**
 * 忘记密码 - 步骤3：设置新密码
 */
definePage({
    style: {
        navigationStyle: 'custom',
    },
});

interface FormInstance {
    validate: () => Promise<boolean>;
}

const { t } = useTranslate('forgotPassword');
const toast = useToast();
const formRef = ref<FormInstance>();
const form = reactive({
    password: '',
    confirmPassword: '',
});
const hasFormValue = computed(
    () => form.password.trim() || form.confirmPassword.trim()
);
const rules = {
    password: [
        {
            required: true,
            message: t('passwordRequired'),
            trigger: ['blur', 'change'],
        },
    ],
    confirmPassword: [
        {
            required: true,
            message: t('confirmRequired'),
            trigger: ['blur', 'change'],
        },
        {
            validator: (v: string) => v === form.password,
            message: t('confirmMismatch'),
            trigger: ['blur', 'change'],
        },
    ],
};
const showSuccessModel = ref(true);
const loading = ref(false);

const onReset = async () => {
    try {
        await formRef.value?.validate();
    } catch {
        return;
    }
    loading.value = true;
    // TODO: 调用重置密码 API
    setTimeout(() => {
        loading.value = false;
        toast.success(t('successHint'));
        showSuccessModel.value = true;
    }, 1000);
};

const onBackLogin = () => {
    uni.navigateTo({ url: '/pages-sub/login/Index' });
};
</script>

<template>
    <navbar></navbar>
    <view class="auth-page">
        <view class="auth-page__title">
            <text class="auth-page__title-line">{{ t('resetTitle') }}</text>
            <text class="auth-page__title-sub">{{ t('resetSubTitle') }}</text>
        </view>

        <hy-form ref="formRef" :model="form" :rules="rules">
            <view class="auth-page__form">
                <hy-form-item prop="password">
                    <auth-field
                        v-model="form.password"
                        :placeholder="t('passwordPlaceholder')"
                        type="password"
                    />
                </hy-form-item>
                <hy-form-item prop="confirmPassword">
                    <auth-field
                        v-model="form.confirmPassword"
                        :placeholder="t('confirmPlaceholder')"
                        type="password"
                    />
                </hy-form-item>
            </view>
        </hy-form>

        <view class="auth-page__action">
            <auth-button
                :text="t('resetButton')"
                :loading="loading"
                :disabled="!hasFormValue"
                @click="onReset"
            />
        </view>

        <hy-popup :show="showSuccessModel" round="20">
            <view class="success-modal">
                <view class="success-modal__icon">
                    <hy-image
                        :src="`${Config.IMG2}/success.png`"
                        width="46"
                        height="57"
                    ></hy-image>
                </view>
                <view class="success-modal__content">
                    <view class="success-modal__content-title">{{
                        t('successTitle')
                    }}</view>
                    <view class="success-modal__content-desc">{{
                        t('successDesc')
                    }}</view>
                </view>
                <auth-button
                    :text="t('backToLoginButton')"
                    @click="onBackLogin"
                ></auth-button>
            </view>
        </hy-popup>
    </view>
</template>

<style lang="scss">
.auth-page {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    box-sizing: border-box;
    padding-top: calc(var(--status-bar-height) + 98rpx);
    padding-left: 66rpx;
    padding-right: 66rpx;
    /* #ifdef H5 || APP-PLUS */
    padding-bottom: calc(90rpx + env(safe-area-inset-bottom));
    /* #endif */
    /* #ifdef MP-WEIXIN */
    padding-bottom: calc(90rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(90rpx + env(safe-area-inset-bottom));
    /* #endif */
    background-color: $hy-background;

    &__title {
        display: flex;
        flex-direction: column;

        &-line {
            font-size: 48rpx;
            font-weight: 700;
            line-height: 96rpx;
        }

        &-sub {
            font-size: 28rpx;
            line-height: 48rpx;
            color: $hy-text-color--grey;
        }
    }

    &__form {
        display: flex;
        flex-direction: column;
        gap: 40rpx;
        margin-top: 96rpx;

        :deep(.hy-form-item) {
            margin-bottom: 0;
        }
    }

    &__action {
        display: flex;
        justify-content: center;
        margin-top: 300rpx;
    }

    .success-modal {
        min-height: 400rpx;
        padding: $hy-border-margin-padding-xxl;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 120rpx;
        &__icon {
            background: var(--hy-text-color--inverse);
            width: 200rpx;
            height: 200rpx;
            border-radius: $hy-radius-circle;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        &__content {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 20rpx;

            &-title {
                font-size: 34rpx;
            }

            &-desc {
                font-size: 24rpx;
                opacity: 0.6;
            }
        }
    }
}
</style>
