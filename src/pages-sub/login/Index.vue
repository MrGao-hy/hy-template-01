<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useTranslate } from '@hy-app/ui';
import AuthField from '@/components/auth/AuthField.vue';
import AuthButton from '@/components/auth/AuthButton.vue';
import SocialAuth from '@/components/auth/SocialAuth.vue';

/**
 * 登录页
 */
definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('login');

/** hy-form 实例类型 */
interface FormInstance {
    validate: () => Promise<boolean>;
    resetFields: () => void;
    clearValidate: (fields?: string[]) => void;
}

const formRef = ref<FormInstance>();

const form = reactive({
    email: '',
    password: '',
});

/** 表单校验规则 */
const rules = {
    email: [
        {
            required: true,
            message: t('emailRequired'),
            trigger: ['blur', 'change'],
        },
        { type: 'email', message: t('emailFormat'), trigger: ['blur'] },
    ],
    password: [
        {
            required: true,
            message: t('passwordRequired'),
            trigger: ['blur', 'change'],
        },
    ],
};

/** 提交中 */
const loading = ref(false);

/** 点击登录 */
const onLogin = async () => {
    try {
        await formRef.value?.validate();
    } catch {
        // 校验失败，错误信息已显示在字段下方
        return;
    }
    loading.value = true;
    // TODO: 调用登录 API，成功后跳转首页
    uni.switchTab({
        url: '/pages/index/Index',
        fail: () => {
            uni.reLaunch({ url: '/pages/index/Index' });
        },
        complete: () => {
            loading.value = false;
        },
    });
};

/** 忘记密码 */
const onForgot = () => {
    uni.navigateTo({ url: '/pages-sub/forgot-password/email' });
};

/** 社交登录 */
const onSocial = (provider: 'apple' | 'google' | 'facebook') => {
    // TODO: 调用对应社交登录
    console.log('social login:', provider);
};

/** 跳转注册页 */
const onSignUp = () => {
    uni.navigateTo({ url: '/pages-sub/signup/Index' });
};
</script>

<template>
    <view class="auth-page">
        <!-- 标题：24px Bold #000，lineHeight 48px -->
        <view class="auth-page__title">
            <text class="auth-page__title-line">{{ t('titleLine1') }}</text>
            <text class="auth-page__title-line">{{ t('titleLine2') }}</text>
        </view>

        <!-- 表单：原型 (33,237) gap 20px -->
        <hy-form ref="formRef" :model="form" :rules="rules">
            <hy-form-item prop="email">
                <auth-field
                    v-model="form.email"
                    :placeholder="t('emailPlaceholder')"
                />
            </hy-form-item>
            <hy-form-item prop="password">
                <auth-field
                    v-model="form.password"
                    :placeholder="t('passwordPlaceholder')"
                    type="password"
                />
            </hy-form-item>

            <!-- 忘记密码：右对齐 -->
            <view class="auth-page__forgot" @click="onForgot">
                <text class="auth-page__forgot-text">{{
                    t('forgotPassword')
                }}</text>
            </view>
        </hy-form>

        <!-- 登录按钮：居中 -->
        <view class="auth-page__action">
            <auth-button
                :text="t('button')"
                :loading="loading"
                @click="onLogin"
            />
        </view>

        <!-- 分隔文案：12px Light opacity 0.6 -->
        <text class="auth-page__divider">{{ t('orWith') }}</text>

        <!-- 社交登录 -->
        <view class="auth-page__social">
            <social-auth @select="onSocial" />
        </view>

        <!-- 底部跳转 -->
        <view class="auth-page__footer">
            <text class="auth-page__footer-text">{{ t('noAccount') }}</text>
            <text class="auth-page__footer-link" @click="onSignUp">{{
                t('signUp')
            }}</text>
        </view>
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
    /* 原型底距 103px → 安全区 + 90rpx */
    /* #ifdef H5 || APP-PLUS */
    padding-bottom: calc(90rpx + env(safe-area-inset-bottom));
    /* #endif */
    /* #ifdef MP-WEIXIN */
    padding-bottom: calc(90rpx + constant(safe-area-inset-bottom));
    padding-bottom: calc(90rpx + env(safe-area-inset-bottom));
    /* #endif */
    background-color: $hy-background;

    /* 标题 */
    &__title {
        display: flex;
        flex-direction: column;
        margin-bottom: 60rpx;
    }

    &__title-line {
        font-size: 48rpx;
        font-weight: 700;
        line-height: 96rpx;
        color: $hy-text-color;
        text-align: left;
    }

    /* 忘记密码 */
    &__forgot {
        display: flex;
        justify-content: flex-end;
        /* 原型 form→forgot 28px */
        margin-top: 56rpx;
    }

    &__forgot-text {
        font-size: 24rpx;
        font-weight: 400;
        line-height: 48rpx;
        color: $hy-text-color;
    }

    /* 按钮 */
    &__action {
        display: flex;
        justify-content: center;
        /* 原型 forgot→button 25px */
        margin-top: 50rpx;
    }

    /* 分隔文案 */
    &__divider {
        text-align: center;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 48rpx;
        color: $hy-text-color;
        opacity: 0.6;
        letter-spacing: 0.02em;
        /* 原型 button→divider 32px */
        margin-top: 64rpx;
    }

    /* 社交登录 */
    &__social {
        display: flex;
        justify-content: center;
        /* 原型 divider→social 23px */
        margin-top: 46rpx;
    }

    /* 底部跳转：推到底部 */
    &__footer {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 14rpx;
        margin-top: auto;
    }

    &__footer-text {
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: $hy-text-color;
    }

    &__footer-link {
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: $hy-text-color;
        text-decoration: underline;
    }
}
</style>
