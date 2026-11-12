<script setup lang="ts">
import { ref } from 'vue';
import { IconConfig, useTranslate, useToast } from '@hy-app/ui';
import type { SelectValueVo } from '@hy-app/ui';
import Navbar from '@/components/Navbar.vue';
import { Config } from '@/config';

/**
 * 个人资料设置页
 * 头像（可更换）+ First/Last Name/Email/Gender/Phone 表单 + Save change
 */
definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('profileSetting');
const toast = useToast();

/** 表单数据（Figma 设计稿模拟数据） */
const form = ref({
    avatar: `${Config.IMG}/avatar.jpg`,
    firstName: 'Sunie',
    lastName: 'Pham',
    email: 'sunieux@gmail.com',
    gender: 'Female',
    phone: '(+1) 23456789',
});

/** 性别选项 */
const genderOptions = ['Female', 'Male'];

/** 性别选择弹窗显隐 */
const showGenderPicker = ref(false);

// ============== 事件处理 ==============

/** 返回上一页 */
const onBack = () => {
    uni.navigateBack();
};

/** 更换头像 */
const onChangeAvatar = () => {
    uni.chooseImage({
        count: 1,
        success: res => {
            form.value.avatar = res.tempFilePaths[0];
        },
    });
};

/** 确认选择性别 */
const onGenderConfirm = (e: SelectValueVo) => {
    if (typeof e.value[0] === 'string') form.value.gender = e.value[0];
};

/** 保存修改 */
const onSave = () => {
    toast.success(t('saveSuccess'));
    setTimeout(() => uni.navigateBack(), 1200);
};
</script>

<template>
    <view class="profile-setting">
        <!-- ============== 顶部：返回 + 标题 ============== -->
        <navbar :title="t('title')"></navbar>

        <!-- ============== 更换头像 ============== -->
        <view class="avatar-box" @tap="onChangeAvatar">
            <hy-avatar :src="form.avatar" :size="100"></hy-avatar>
            <view class="avatar-box__badge">
                <hy-icon
                    :name="IconConfig.CAMERA"
                    size="24rpx"
                    color="#ffffff"
                />
            </view>
        </view>

        <!-- ============== 表单 ============== -->
        <hy-form class="form" :model="form" label-position="top" :border="true">
            <hy-form-item :label="t('firstName')" prop="firstName">
                <hy-input
                    v-model="form.firstName"
                    border="none"
                    custom-class="form__input"
                />
            </hy-form-item>
            <hy-form-item :label="t('lastName')" prop="lastName">
                <hy-input
                    v-model="form.lastName"
                    border="none"
                    custom-class="form__input"
                />
            </hy-form-item>
            <hy-form-item :label="t('email')" prop="email">
                <hy-input
                    v-model="form.email"
                    border="none"
                    custom-class="form__input"
                />
            </hy-form-item>
            <hy-form-item :label="t('gender')" prop="gender">
                <view class="form__picker" @tap="showGenderPicker = true">
                    <text class="form__picker-value">{{ form.gender }}</text>
                    <hy-icon
                        :name="IconConfig.DOWN"
                        size="24rpx"
                        color="#8a8a8f"
                    />
                </view>
            </hy-form-item>
            <hy-form-item :label="t('phone')" prop="phone">
                <hy-input
                    v-model="form.phone"
                    type="tel"
                    border="none"
                    custom-class="form__input"
                />
            </hy-form-item>
        </hy-form>

        <!-- ============== 保存按钮 ============== -->
        <hy-button
            :text="t('saveChange')"
            shape="circle"
            color="#000000"
            @click="onSave"
        ></hy-button>

        <!-- 性别选择弹窗 -->
        <hy-picker
            v-model:show="showGenderPicker"
            :model-value="form.gender"
            :columns="[genderOptions]"
            :title="t('gender')"
            :immediate-change="false"
            @confirm="onGenderConfirm"
        />
    </view>
</template>

<style lang="scss" scoped>
.profile-setting {
    min-height: 100vh;
    padding: calc(var(--status-bar-height) + 40rpx) 40rpx
        calc(40rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
    background-color: $hy-background;

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
        color: $hy-text-color;
    }
}

/* 头像 */
.avatar-box {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100px;
    margin: 48rpx auto 0;

    &__badge {
        position: absolute;
        right: -8px;
        bottom: -8px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 39px;
        height: 39px;
        background-color: #343434;
        border-radius: $hy-radius-circle;
        border: 3px solid $hy-background;
        box-sizing: border-box;
    }
}

/* 表单 */
.form {
    margin-top: 48rpx;

    &__picker {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 56rpx;
    }

    &__picker-value {
        font-size: 30rpx;
        color: $hy-text-color;
    }
}

/* 覆盖 hy-form-item：贴合 Figma（label 24rpx 灰、字段上下间距、分隔线 #f1f2f3） */
:deep(.hy-form-item) {
    padding: 20rpx 0;

    .hy-form-item__label {
        margin-bottom: 12rpx;
        font-size: 24rpx;
        color: $hy-text-color--3;
    }

    .hy-border__bottom {
        border-bottom-color: $hy-background--empty;
    }
}

/* hy-input 内部输入字体 */
:deep(.form__input) {
    font-size: 30rpx;
}
</style>
