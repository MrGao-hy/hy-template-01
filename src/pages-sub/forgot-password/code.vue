<script setup lang="ts">
import { reactive, ref, computed, onUnmounted } from 'vue';
import { useTranslate } from '@hy-app/ui';
import Navbar from '@/components/Navbar.vue';
import AuthButton from '@/components/auth/AuthButton.vue';
import TheRootPages from '@/components/TheRootPages.vue';

/**
 * 忘记密码 - 步骤2：输入验证码
 * 6 位数字验证码，60s 重发倒计时
 */
definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('forgotPassword');

const props = defineProps<{
    email?: string;
}>();

interface FormInstance {
    validate: () => Promise<boolean>;
}

const formRef = ref<FormInstance>();

const form = reactive({
    code: '',
});

const rules = {
    code: [
        {
            required: true,
            message: t('codeRequired'),
            trigger: ['blur', 'change'],
        },
        {
            validator: (v: string) => /^\d{6}$/.test(v),
            message: t('codeFormat'),
            trigger: ['blur'],
        },
    ],
};

const loading = ref(false);
const countdown = ref(60);
let timer: ReturnType<typeof setInterval> | null = null;

const startCountdown = () => {
    countdown.value = 60;
    timer = setInterval(() => {
        countdown.value -= 1;
        if (countdown.value <= 0) {
            clearInterval(timer!);
            timer = null;
        }
    }, 1000);
};

startCountdown();
onUnmounted(() => {
    if (timer) clearInterval(timer);
});

const resendText = computed(() =>
    countdown.value > 0
        ? t('resendIn', { seconds: countdown.value })
        : t('resend')
);

const canResend = computed(() => countdown.value <= 0);

/** 重发验证码 */
const onResend = () => {
    if (!canResend.value) return;
    // TODO: 调用重发验证码 API
    startCountdown();
};

/** 校验验证码 */
const onVerify = async () => {
    try {
        await formRef.value?.validate();
    } catch {
        return;
    }
    loading.value = true;
    // TODO: 调用校验验证码 API
    setTimeout(() => {
        loading.value = false;
        uni.navigateTo({ url: '/pages-sub/forgot-password/reset' });
    }, 800);
};

/** 邮箱脱敏显示 */
const maskedEmail = computed(() => {
    if (!props.email) return '';
    const at = props.email.indexOf('@');
    if (at < 2) return props.email;
    return props.email.slice(0, 2) + '***' + props.email.slice(at);
});
</script>

<template>
    <the-root-pages>
        <view class="auth-page">
            <navbar></navbar>

            <view class="auth-page__title">
                <text class="auth-page__title-line">{{ t('codeTitle') }}</text>
            </view>

            <text v-if="maskedEmail" class="auth-page__hint">{{
                t('codeSentTo', { email: maskedEmail })
            }}</text>

            <hy-form ref="formRef" :model="form" :rules="rules">
                <view class="auth-page__form">
                    <hy-form-item prop="code">
                        <hy-code-input
                            v-model="form.code"
                            :border="false"
                            size="50"
                        ></hy-code-input>
                    </hy-form-item>
                </view>
            </hy-form>

            <view class="auth-page__resend" @click="onResend">
                <text
                    class="auth-page__resend-text"
                    :class="{ 'is-disabled': !canResend }"
                    >{{ t('resend') }}</text
                >
            </view>

            <view class="auth-page__action">
                <auth-button
                    :text="t('verifyButton')"
                    :loading="loading"
                    @click="onVerify"
                />
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
    }

    &__hint {
        font-size: 24rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: $hy-text-color;
        opacity: 0.6;
        margin-top: 32rpx;
    }

    &__form {
        display: flex;
        flex-direction: column;
        gap: 40rpx;
        margin-top: 64rpx;

        :deep(.hy-form-item) {
            margin-bottom: 0;
        }
    }

    &__resend {
        display: flex;
        justify-content: flex-end;
        margin-top: 40rpx;
    }

    &__resend-text {
        font-size: 24rpx;
        font-weight: 400;
        line-height: 40rpx;
        color: $hy-text-color;

        &.is-disabled {
            opacity: 0.4;
        }
    }

    &__action {
        display: flex;
        justify-content: center;
        margin-top: 64rpx;
    }
}
</style>
