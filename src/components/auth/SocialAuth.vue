<script setup lang="ts">
/**
 * 社交登录入口区
 */
import { Config } from '@/config';

type SocialProvider = 'apple' | 'google' | 'facebook';

interface IEmit {
    (e: 'select', provider: SocialProvider): void;
}

const emit = defineEmits<IEmit>();

const providers: { key: SocialProvider; icon: string }[] = [
    { key: 'apple', icon: `${Config.IMG2}/icon-apple.svg` },
    { key: 'google', icon: `${Config.IMG2}/icon-google.svg` },
    { key: 'facebook', icon: `${Config.IMG2}/icon-facebook.svg` },
];

const onSelect = (p: SocialProvider) => emit('select', p);
</script>

<template>
    <view class="social-auth">
        <view
            v-for="p in providers"
            :key="p.key"
            class="social-auth__btn"
            :hover-class="'social-auth__btn--hover'"
            :hover-stay-time="100"
            @click="onSelect(p.key)"
        >
            <hy-icon :name="p.icon" />
        </view>
    </view>
</template>

<style lang="scss">
.social-auth {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    /* 原型 gap 20px */
    gap: 40rpx;

    &__btn {
        /* 原型 42×42 圆形 */
        width: 84rpx;
        height: 84rpx;
        border-radius: 50%;
        background-color: $hy-background--empty;
        display: flex;
        align-items: center;
        justify-content: center;
        transition:
            transform 0.15s ease,
            background-color 0.15s ease;

        &--hover {
            transform: scale(0.94);
            background-color: $hy-background--hover;
        }
    }

    &__icon {
        /* 原型内部图标 22×22 */
        width: 44rpx;
        height: 44rpx;
    }
}
</style>
