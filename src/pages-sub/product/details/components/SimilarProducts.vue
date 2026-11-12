<script setup lang="ts">
import HyScrollList from '@hy-app/ui/components/hy-scroll-list/hy-scroll-list.vue';
import type { SimpleProduct } from './types';

defineProps<{
    /** 相似商品列表 */
    products: SimpleProduct[];
}>();

const emit = defineEmits<{
    (e: 'tap', product: SimpleProduct): void;
}>();

/** 点击商品 */
const onProductTap = (product: SimpleProduct) => {
    emit('tap', product);
};
</script>

<template>
    <hy-scroll-list :indicator="false">
        <hy-flex gap="10">
            <view
                v-for="item in products"
                :key="item.id"
                class="similar-card"
                @tap="onProductTap(item)"
            >
                <hy-image
                    :src="item.image"
                    width="252rpx"
                    height="344rpx"
                    mode="aspectFill"
                    radius="20rpx"
                    lazy-load
                />
                <text class="similar-card__name">{{ item.name }}</text>
                <text class="similar-card__price">
                    $ {{ item.price.toFixed(2) }}
                </text>
            </view>
        </hy-flex>
    </hy-scroll-list>
</template>

<style lang="scss" scoped>

.similar-card {
    display: flex;
    flex-direction: column;
    gap: 4rpx;

    &:active {
        opacity: 0.7;
    }

    &__name {
        margin-top: 20rpx;
        font-size: $hy-font-size-sm;
        color: $hy-text-color;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__price {
        font-size: $hy-font-size-md;
        font-weight: 700;
        color: $hy-text-color;
    }
}
</style>
