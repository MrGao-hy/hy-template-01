<script setup lang="ts">
import { computed } from 'vue';
import { useTranslate } from '@hy-app/ui';
import { Config } from '@/config';
import Icon from '@/components/Icon.vue';

/**
 * 结算 STEP 3：订单完成（Figma: 8782-2377）
 * 成功插图 + 感谢文案，底部 Continue shopping 按钮由父组件底栏渲染
 */
const { t } = useTranslate('checkout');

const SUCCESS_IMAGE = 'order-completed';

/** 感谢文案（按换行拆分为多行，保证多端换行一致） */
const thankYouLines = computed(() => t('thankYou').split('\n'));
</script>

<template>
    <view class="confirm-step">
        <Icon :name="SUCCESS_IMAGE" size="110"></Icon>
        <view class="confirm-step__text">
            <text
                v-for="(line, i) in thankYouLines"
                :key="i"
                class="confirm-step__line"
            >
                {{ line }}
            </text>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.confirm-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 156rpx;

    &__image {
        width: 220rpx;
        height: 220rpx;
        color: $hy-text-color;
    }

    &__text {
        margin-top: 110rpx;
        text-align: center;
    }

    &__line {
        display: block;
        font-size: 28rpx;
        line-height: 44rpx;
        color: $hy-text-color--grey;
    }
}
</style>
