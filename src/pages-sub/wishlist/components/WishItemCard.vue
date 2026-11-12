<script setup lang="ts">
import { IconConfig } from '@hy-app/ui';

/**
 * 收藏商品卡片（Figma 8782:2506 · all items 卡片 141×253px）
 * - 图片：141×186px，圆角 10px，右上角收藏图标
 * - 信息区（自上而下）：名称（12px Medium）→ 价格 + 划线价（12px Bold / 12px 灰）→ 星级 + 评价数
 */

/** 收藏商品数据 */
export interface WishItem {
    id: number;
    /** 商品名称 */
    name: string;
    /** 评分 */
    rating: number;
    /** 评分人数（Figma 设计稿中为括号内数字） */
    scoreCount: number;
    /** 当前价（美元） */
    price: number;
    /** 划线原价（可选） */
    originPrice?: number;
    /** 商品图片路径 */
    image: string;
}

const props = defineProps<{
    /** 商品数据 */
    item: WishItem;
}>();

const emit = defineEmits<{
    /** 点击卡片 */
    (e: 'tap', item: WishItem): void;
    /** 点击收藏图标 */
    (e: 'toggleFav', item: WishItem): void;
}>();

const onTap = () => {
    emit('tap', props.item);
};

const onToggleFav = () => {
    emit('toggleFav', props.item);
};
</script>

<template>
    <view class="wish-item" @tap="onTap">
        <!-- 商品图 + 右上角收藏 -->
        <view class="wish-item__cover">
            <hy-image
                :src="item.image"
                width="100%"
                radius="20rpx"
                mode="widthFix"
                :fade="true"
                lazy-load
                :custom-style="{ height: '372rpx' }"
            />
            <view class="wish-item__fav" @tap.stop="onToggleFav">
                <hy-icon :name="IconConfig.STAR_FILL" size="32rpx" color="#FF6E6E" />
            </view>
        </view>

        <!-- 信息区：名称 → 价格行 → 评分行 -->
        <view class="wish-item__info">
            <text class="wish-item__name">{{ item.name }}</text>

            <view class="wish-item__price-row">
                <text class="wish-item__price">$ {{ item.price.toFixed(2) }}</text>
                <text v-if="item.originPrice" class="wish-item__origin">
                    $ {{ item.originPrice.toFixed(2) }}
                </text>
            </view>

            <view class="wish-item__rate">
                <hy-rate
                    v-model="item.rating"
                    readonly
                    :size="8"
                    :gutter="4"
                    active-color="#f5c33b"
                />
                <text class="wish-item__rate-text">({{ item.scoreCount }})</text>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.wish-item {
    /* 两列布局：卡宽 282rpx，列间距 58rpx，页面左右各 64rpx → 64*2+282*2+58 = 750rpx */
    width: calc(50% - 29rpx);

    &:active {
        opacity: 0.85;
    }

    &__cover {
        position: relative;
    }

    /* 收藏图标：图片右上角（Figma 27×27px，right 8px / top 10px） */
    &__fav {
        position: absolute;
        top: 20rpx;
        right: 16rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 54rpx;
        height: 54rpx;
        z-index: 2;
        border-radius: $hy-radius-circle;
        background-color: $hy-background--box;
    }

    &__info {
        display: flex;
        flex-direction: column;
        gap: 4rpx;
        margin-top: 28rpx;
    }

    &__name {
        font-size: 24rpx;
        font-weight: 500;
        line-height: 40rpx;
        color: $hy-text-color--2;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__price-row {
        display: flex;
        align-items: baseline;
        gap: 10rpx;
    }

    &__price {
        font-size: 24rpx;
        font-weight: 700;
        line-height: 38rpx;
        color: $hy-text-color--2;
    }

    &__origin {
        font-size: 24rpx;
        font-weight: 300;
        line-height: 38rpx;
        color: $hy-text-color--4;
        text-decoration: line-through;
    }

    &__rate {
        display: flex;
        align-items: center;
        gap: 8rpx;
        margin-top: 4rpx;
    }

    &__rate-text {
        font-size: 20rpx;
        font-weight: 300;
        line-height: 32rpx;
        color: $hy-text-color--2;
    }
}
</style>
