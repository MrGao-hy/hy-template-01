<script setup lang="ts">
import { ref } from 'vue';
import { IconConfig } from '@hy-app/ui';

const props = defineProps<{
    /** 商品主图 */
    image: string;
}>();

const emit = defineEmits<{
    (e: 'back'): void;
}>();

/** 收藏状态 */
const favorite = ref(false);

/** 返回上一页 */
const onBack = () => {
    emit('back');
};
</script>

<template>
    <view class="product-hero">
        <!-- ============== 背景椭圆 ============== -->
        <view class="product-hero__ellipse"></view>

        <!-- ============== 顶部操作栏 ============== -->
        <view class="product-hero__header">
            <view class="product-hero__action" @tap="onBack">
                <hy-icon
                    :name="IconConfig.LEFT"
                    size="36rpx"
                    color="#1a1a1a"
                />
            </view>
            <view class="product-hero__actions-right">
                <view
                    class="product-hero__action"
                    @tap="favorite = !favorite"
                >
                    <hy-icon
                        :name="
                            favorite
                                ? IconConfig.STAR_FILL
                                : IconConfig.STAR
                        "
                        size="44rpx"
                        color="#1a1a1a"
                    />
                </view>
                <view class="product-hero__action">
                    <hy-icon
                        :name="IconConfig.SHARE"
                        size="44rpx"
                        color="#1a1a1a"
                    />
                </view>
            </view>
        </view>

        <!-- ============== 商品主图 ============== -->
        <view class="product-hero__media">
            <hy-image
                :src="props.image"
                width="710rpx"
                height="1064rpx"
                mode="aspectFill"
                lazy-load
            />
        </view>
    </view>
</template>

<style lang="scss" scoped>
.product-hero {
    position: relative;
    height: 812rpx;
    background-color: #fffcfa;

    &__ellipse {
        position: absolute;
        top: 186rpx;
        left: 50%;
        width: 468rpx;
        height: 260rpx;
        transform: translateX(-50%);
        border-radius: 50%;
        background-color: rgba(234, 202, 183, 0.2);
    }

    &__header {
        position: absolute;
        top: calc(var(--status-bar-height) + 30rpx);
        left: 40rpx;
        right: 40rpx;
        z-index: 3;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__action {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 64rpx;
        height: 64rpx;

        &:active {
            opacity: 0.7;
        }
    }

    &__actions-right {
        display: flex;
        align-items: center;
        gap: 20rpx;
    }

    &__media {
        position: absolute;
        top: 24rpx;
        left: 50%;
        z-index: 1;
        transform: translateX(-50%);
    }
}
</style>
