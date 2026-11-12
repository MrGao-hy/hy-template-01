<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useTranslate } from '@hy-app/ui';
import AuthField from '@/components/auth/AuthField.vue';
import AuthButton from '@/components/auth/AuthButton.vue';
import SocialAuth from '@/components/auth/SocialAuth.vue';
import TheRootPages from '@/components/TheRootPages.vue';

/**
 * 注册页
 */
definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('signup');

/** hy-form 实例类型 */
interface FormInstance {
    validate: () => Promise<boolean>;
    resetFields: () => void;
    clearValidate: (fields?: string[]) => void;
}

const formRef = ref<FormInstance>();

const form = reactive({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
});

/** 表单校验规则 */
const rules = {
    name: [
        {
            required: true,
            message: t('nameRequired'),
            trigger: ['blur', 'change'],
        },
    ],
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
    confirmPassword: [
        {
            required: true,
            message: t('confirmRequired'),
            trigger: ['blur', 'change'],
        },
        {
            validator: (value: string) => value === form.password,
            message: t('confirmMismatch'),
            trigger: ['blur', 'change'],
        },
    ],
};

/** 提交中 */
const loading = ref(false);

/** 点击注册 */
const onSignUp = async () => {
    try {
        await formRef.value?.validate();
    } catch {
        // 校验失败，错误信息已显示在字段下方
        return;
    }
    loading.value = true;
    // TODO: 调用注册 API，成功后跳转首页
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

/** 社交注册 */
const onSocial = (provider: 'apple' | 'google' | 'facebook') => {
    // TODO: 调用对应社交登录
    console.log('social signup:', provider);
};

/** 跳转登录页 */
const onLogIn = () => {
    uni.navigateTo({ url: '/pages-sub/login/Index' });
};
</script>

<template>
    <the-root-pages>
        <view class="auth-page">
            <!-- 标题 -->
            <view class="auth-page__title">
                <text class="auth-page__title-line">{{ t('titleLine1') }}</text>
                <text class="auth-page__title-line">{{ t('titleLine2') }}</text>
            </view>

            <!-- 表单：原型 (33,208) gap 20px -->
            <hy-form ref="formRef" :model="form" :rules="rules">
                <view class="auth-page__form">
                    <hy-form-item prop="name">
                        <auth-field
                            v-model="form.name"
                            :placeholder="t('namePlaceholder')"
                        />
                    </hy-form-item>
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
                    <hy-form-item prop="confirmPassword">
                        <auth-field
                            v-model="form.confirmPassword"
                            :placeholder="t('confirmPlaceholder')"
                            type="password"
                        />
                    </hy-form-item>
                </view>
            </hy-form>

            <!-- 注册按钮：居中 -->
            <view class="auth-page__action">
                <auth-button
                    :text="t('button')"
                    :loading="loading"
                    @click="onSignUp"
                />
            </view>

            <!-- 分隔文案 -->
            <text class="auth-page__divider">{{ t('orWith') }}</text>

            <!-- 社交注册 -->
            <view class="auth-page__social">
                <social-auth @select="onSocial" />
            </view>

            <!-- 底部跳转 -->
            <view class="auth-page__footer">
                <text class="auth-page__footer-text">{{
                    t('hasAccount')
                }}</text>
                <text class="auth-page__footer-link" @click="onLogIn">{{
                    t('logIn')
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
    background-color: $hy-background;

    &__title {
        display: flex;
        flex-direction: column;
    }

    &__title-line {
        font-size: 48rpx;
        font-weight: 700;
        line-height: 96rpx;
        color: $hy-text-color;
        text-align: left;
    }

    &__form {
        display: flex;
        flex-direction: column;
        gap: 40rpx;
        /* 原型 title→form 19px */
        margin-top: 38rpx;

        /* 覆盖 hy-form-item 默认 margin-bottom，用 gap 控制间距 */
        :deep(.hy-form-item) {
            margin-bottom: 0;
        }
    }

    &__action {
        display: flex;
        justify-content: center;
        /* 原型 form→button 44px */
        margin-top: 88rpx;
    }

    &__divider {
        text-align: center;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 48rpx;
        color: $hy-text-color;
        opacity: 0.6;
        letter-spacing: 0.02em;
        /* 原型 button→divider 28px */
        margin-top: 56rpx;
    }

    &__social {
        display: flex;
        justify-content: center;
        /* 原型 divider→social 28px */
        margin-top: 56rpx;
    }

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
