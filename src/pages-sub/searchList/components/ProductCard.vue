<script setup lang="ts">
import { ref } from 'vue';
import { IconConfig } from '@hy-app/ui';
import type { SearchResultProduct } from './types';

const props = defineProps<{
    /** 商品数据 */
    product: SearchResultProduct;
}>();

const emit = defineEmits<{
    (e: 'tap', product: SearchResultProduct): void;
}>();

/** 收藏状态 */
const favorite = ref(false);

/** 切换收藏 */
const onToggleFavorite = () => {
    favorite.value = !favorite.value;
};

/** 点击卡片 */
const onCardTap = () => {
    emit('tap', props.product);
};

/** 满星数组（设计稿为整行星标） */
const FULL_STARS = 5;
</script>

<template>
    <view class="product-card" @tap="onCardTap">
        <!-- ============== 商品图 ============== -->
        <view class="product-card__media">
            <hy-image
                :src="product.image"
                width="282rpx"
                height="372rpx"
                mode="aspectFill"
                radius="20rpx"
                lazy-load
            />
            <!-- 收藏（库内无 heart 图标，以星标代替） -->
            <view class="product-card__fav" @tap.stop="onToggleFavorite">
                <hy-icon
                    :name="favorite ? IconConfig.STAR_FILL : IconConfig.STAR"
                    size="40rpx"
                    color="#ffffff"
                    custom-class="product-card__fav-icon"
                />
            </view>
        </view>

        <!-- ============== 名称 ============== -->
        <text class="product-card__name">{{ product.name }}</text>

        <!-- ============== 评分 + 评价数 ============== -->
        <view class="product-card__rating">
            <view class="product-card__stars">
                <hy-icon
                    v-for="i in FULL_STARS"
                    :key="i"
                    :name="IconConfig.STAR_FILL"
                    size="15rpx"
                    color="#ffc529"
                />
            </view>
            <text class="product-card__reviews">
                ({{ product.reviews }})
            </text>
        </view>

        <!-- ============== 价格 ============== -->
        <view class="product-card__price-row">
            <text class="product-card__price">
                $ {{ product.price.toFixed(2) }}
            </text>
            <text v-if="product.oldPrice" class="product-card__old-price">
                $ {{ product.oldPrice.toFixed(2) }}
            </text>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.product-card {
    display: flex;
    flex-direction: column;
    width: 282rpx;

    &:active {
        opacity: 0.7;
    }

    &__media {
        position: relative;
        width: 282rpx;
        height: 372rpx;
        margin-bottom: 14rpx;
    }

    &__fav {
        position: absolute;
        top: 16rpx;
        right: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0 2rpx 6rpx rgba(0, 0, 0, 0.3));
    }

    &__name {
        font-size: $flux-font-sm;
        color: $flux-text-primary;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__rating {
        display: flex;
        align-items: center;
        gap: 8rpx;
        margin-top: 6rpx;
    }

    &__stars {
        display: flex;
        align-items: center;
        gap: 4rpx;
    }

    &__reviews {
        font-size: $flux-font-xs;
        color: rgba(51, 48, 46, 0.5);
    }

    &__price-row {
        display: flex;
        align-items: baseline;
        gap: 12rpx;
        margin-top: 10rpx;
    }

    &__price {
        font-size: $flux-font-lg;
        font-weight: 700;
        color: $flux-text-primary;
    }

    &__old-price {
        font-size: $flux-font-sm;
        color: #bebfc4;
        text-decoration: line-through;
    }
}
</style>
