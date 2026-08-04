<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useTranslate } from '@hy-app/ui';
import AuthField from '@/components/auth/AuthField.vue';
import AuthButton from '@/components/auth/AuthButton.vue';
import TheRootPages from '@/components/TheRootPages.vue';
import Navbar from '@/components/Navbar.vue';

/**
 * 忘记密码 - 步骤1：输入邮箱
 * 基于登录页视觉风格，标题 "Forgot / Password"
 */
definePage({
    style: {
        navigationStyle: 'custom',
        navigationBarTextStyle: 'black',
    },
});

const { t } = useTranslate('forgotPassword');

interface FormInstance {
    validate: () => Promise<boolean>;
}

const formRef = ref<FormInstance>();

const form = reactive({
    email: '',
});

const rules = {
    email: [
        {
            required: true,
            message: t('emailRequired'),
            trigger: ['blur', 'change'],
        },
        { type: 'email', message: t('emailFormat'), trigger: ['blur'] },
    ],
};

const loading = ref(false);

/** 发送验证码 */
const onSend = async () => {
    try {
        await formRef.value?.validate();
    } catch {
        return;
    }
    loading.value = true;
    // TODO: 调用发送验证码 API
    setTimeout(() => {
        loading.value = false;
        uni.navigateTo({
            url: `/pages-sub/forgot-password/code?email=${encodeURIComponent(form.email)}`,
        });
    }, 800);
};

/** 返回登录 */
const onBack = () => {
    uni.navigateBack({
        fail: () => uni.redirectTo({ url: '/pages-sub/login/Index' }),
    });
};
</script>

<template>
    <the-root-pages>
        <view class="auth-page">
            <navbar></navbar>

            <view class="auth-page__title">
                <text class="auth-page__title-line">{{ t('titleLine') }}</text>
                <text class="auth-page__title-sub">{{ t('subTitle') }}</text>
            </view>

            <hy-form ref="formRef" :model="form" :rules="rules">
                <view class="auth-page__form">
                    <hy-form-item prop="email">
                        <auth-field
                            v-model="form.email"
                            :placeholder="t('emailPlaceholder')"
                        />
                    </hy-form-item>
                </view>
            </hy-form>

            <view class="auth-page__action">
                <auth-button
                    :text="t('sendButton')"
                    :loading="loading"
                    @click="onSend"
                />
            </view>

            <view class="auth-page__footer">
                <text class="auth-page__footer-link" @click="onBack">{{
                    t('backToLogin')
                }}</text>
            </view>
        </view>
    </the-root-pages>
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
    background-color: #ffffff;

    &__title {
        display: flex;
        flex-direction: column;
        color: #000000;

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
        margin-top: 88rpx;
    }

    &__footer {
        display: flex;
        justify-content: center;
        margin-top: auto;
    }

    &__footer-link {
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: #000000;
        text-decoration: underline;
    }
}
</style>
