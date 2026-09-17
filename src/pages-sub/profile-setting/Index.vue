<script setup lang="ts">
import { ref } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';

/**
 * 个人资料设置页（Figma 画板 8782:3327 profile setting）
 * 头像（可更换）+ First/Last Name/Email/Gender/Phone 表单 + Save change
 */
definePage({
    style: {
        navigationStyle: 'custom',
        navigationBarTextStyle: 'black',
    },
});

const { t } = useTranslate('profileSetting');

/** 表单数据（Figma 设计稿模拟数据） */
const form = ref({
    avatar: '/static/images/fluxstore/avatar.jpg',
    firstName: 'Sunie',
    lastName: 'Pham',
    email: 'sunieux@gmail.com',
    gender: 'Female',
    phone: '(+1) 23456789',
});

/** 性别选项 */
const genderOptions = ['Female', 'Male'];

// ============== 事件处理 ==============

/** 返回上一页 */
const onBack = () => {
    uni.navigateBack();
};

/** 更换头像 */
const onChangeAvatar = () => {
    uni.chooseImage({
        count: 1,
        success: (res) => {
            form.value.avatar = res.tempFilePaths[0];
        },
    });
};

/** 选择性别 */
const onGenderChange = (e: { detail: { value: number } }) => {
    form.value.gender = genderOptions[e.detail.value] ?? form.value.gender;
};

/** 保存修改 */
const onSave = () => {
    uni.showToast({ title: t('saveSuccess'), icon: 'success' });
    setTimeout(() => uni.navigateBack(), 800);
};
</script>

<template>
    <view class="profile-setting">
        <!-- ============== 顶部：返回 + 标题 ============== -->
        <view class="profile-setting__header">
            <view class="profile-setting__back" @tap="onBack">
                <hy-icon :name="IconConfig.LEFT" size="36rpx" color="#1a1a1a" />
            </view>
            <text class="profile-setting__title">{{ t('title') }}</text>
        </view>

        <!-- ============== 更换头像 ============== -->
        <view class="avatar-box" @tap="onChangeAvatar">
            <hy-image
                :src="form.avatar"
                width="128rpx"
                height="128rpx"
                radius="36rpx"
                :fade="true"
                lazy-load
            />
            <view class="avatar-box__badge">
                <hy-icon :name="IconConfig.CAMERA" size="24rpx" color="#ffffff" />
            </view>
        </view>

        <!-- ============== 表单 ============== -->
        <view class="form">
            <view class="form__field">
                <text class="form__label">{{ t('firstName') }}</text>
                <hy-input v-model="form.firstName" :border="false" custom-class="form__input" />
            </view>
            <view class="form__field">
                <text class="form__label">{{ t('lastName') }}</text>
                <hy-input v-model="form.lastName" :border="false" custom-class="form__input" />
            </view>
            <view class="form__field">
                <text class="form__label">{{ t('email') }}</text>
                <hy-input v-model="form.email" :border="false" custom-class="form__input" />
            </view>
            <picker mode="selector" :range="genderOptions" @change="onGenderChange">
                <view class="form__field">
                    <text class="form__label">{{ t('gender') }}</text>
                    <view class="form__picker">
                        <text class="form__picker-value">{{ form.gender }}</text>
                        <hy-icon :name="IconConfig.DOWN" size="24rpx" color="#8a8a8f" />
                    </view>
                </view>
            </picker>
            <view class="form__field">
                <text class="form__label">{{ t('phone') }}</text>
                <hy-input v-model="form.phone" type="tel" :border="false" custom-class="form__input" />
            </view>
        </view>

        <!-- ============== 保存按钮 ============== -->
        <view class="save-btn" @tap="onSave">
            {{ t('saveChange') }}
        </view>
    </view>
</template>

<style lang="scss" scoped>
.profile-setting {
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

/* 头像 */
.avatar-box {
    position: relative;
    display: flex;
    justify-content: center;
    width: 128rpx;
    margin: 48rpx auto 0;

    &__badge {
        position: absolute;
        right: -8rpx;
        bottom: -8rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44rpx;
        height: 44rpx;
        background-color: #343434;
        border-radius: $hy-radius-circle;
        border: 4rpx solid #ffffff;
        box-sizing: border-box;
    }
}

/* 表单 */
.form {
    display: flex;
    flex-direction: column;
    margin-top: 48rpx;

    &__field {
        display: flex;
        flex-direction: column;
        gap: 12rpx;
        padding: 20rpx 0;
        border-bottom: 2rpx solid #f1f2f3;
    }

    &__label {
        font-size: 24rpx;
        color: #8a8a8f;
    }

    &__picker {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 56rpx;
    }

    &__picker-value {
        font-size: 30rpx;
        color: $flux-text-primary;
    }
}

/* hy-input 内部输入字体 */
:deep(.form__input) {
    font-size: 30rpx;
}

/* 保存按钮 */
.save-btn {
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
