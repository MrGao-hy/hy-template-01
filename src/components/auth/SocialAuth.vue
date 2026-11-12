<script setup lang="ts">
/**
 * 社交登录入口区
 * 还原 Figma "logo social" 组件：3 个 42×42 圆形按钮，gap 20px
 *   - 白底 + 1px #332218 @ opacity 0.14 描边
 *   - 内部 22×22 品牌图标
 */
import iconApple from '@/assets/auth/icon-apple.svg';
import iconGoogle from '@/assets/auth/icon-google.svg';
import iconFacebook from '@/assets/auth/icon-facebook.svg';

type SocialProvider = 'apple' | 'google' | 'facebook';

interface IEmit {
    (e: 'select', provider: SocialProvider): void;
}

const emit = defineEmits<IEmit>();

const providers: { key: SocialProvider; icon: string }[] = [
    { key: 'apple', icon: iconApple },
    { key: 'google', icon: iconGoogle },
    { key: 'facebook', icon: iconFacebook },
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
            <image
                class="social-auth__icon"
                :src="p.icon"
                mode="aspectFit"
                lazy-load
            />
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
        background-color: $hy-background--2;
        /* 原型描边 #332218 @ opacity 0.14 */
        border: 2rpx solid rgba(51, 34, 24, 0.14);
        display: flex;
        align-items: center;
        justify-content: center;
        transition:
            transform 0.15s ease,
            background-color 0.15s ease;

        &--hover {
            transform: scale(0.94);
            background-color: #f5f5f5;
        }
    }

    &__icon {
        /* 原型内部图标 22×22 */
        width: 44rpx;
        height: 44rpx;
    }
}
</style>
