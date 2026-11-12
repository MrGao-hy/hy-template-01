<script setup lang="ts">
import { IconConfig, useTranslate } from '@hy-app/ui';
import type { RatingBar, ReviewItem } from './types';

const props = defineProps<{
    /** 平均分 */
    score: number;
    /** 评价总数 */
    total: number;
    /** 评分分布 */
    bars: RatingBar[];
    /** 评价列表 */
    reviews: ReviewItem[];
}>();

const { t } = useTranslate('product');

/** 满星数 */
const FULL_STARS = 5;
</script>

<template>
    <view class="product-reviews">
        <!-- ============== 评分汇总 ============== -->
        <view class="product-reviews__summary">
            <view class="product-reviews__top">
                <view class="product-reviews__top-left">
                    <text class="product-reviews__score">{{
                        props.score
                    }}</text>
                    <text class="product-reviews__out">{{ t('outOf5') }}</text>
                </view>
                <view class="product-reviews__top-right">
                    <hy-rate
                        v-model="props.score"
                        readonly
                        allow-half
                        :count="FULL_STARS"
                        :size="18"
                        :gutter="3"
                        active-color="#508A7B"
                        inactive-color="#eff0f1"
                    />
                    <text class="product-reviews__total">
                        {{ t('ratingsCount', { count: props.total }) }}
                    </text>
                </view>
            </view>

            <!-- 评分分布 -->
            <view class="product-reviews__bars">
                <view
                    class="product-reviews__bars-row"
                    v-for="bar in props.bars"
                    :key="bar.star"
                >
                    <text style="color: #8a8a8f">{{ bar.star }}</text>
                    <hy-icon
                        :name="IconConfig.STAR_FILL"
                        color="#508a7b"
                        size="15"
                    ></hy-icon>
                    <hy-line-progress
                        :percentage="bar.percent"
                        :show-text="false"
                        :height="6"
                        active-color="#508a7b"
                        inactive-color="#eff0f1"
                    />
                    <text style="width: 80rpx; text-align: right"
                        >{{ bar.percent }}%</text
                    >
                </view>
            </view>
        </view>

        <!-- ============== 评价列表 ============== -->
        <view
            v-for="review in props.reviews"
            :key="review.id"
            class="review-item"
        >
            <hy-avatar :src="review.avatar" size="small" />
            <view class="review-item__body">
                <view class="review-item__head">
                    <text class="review-item__name">{{ review.name }}</text>
                    <text class="review-item__time">{{ review.time }}</text>
                </view>
                <view class="review-item__stars">
                    <hy-rate
                        :model-value="review.rating"
                        readonly
                        :count="FULL_STARS"
                        :size="10"
                        :gutter="4"
                        active-color="#508A7B"
                        inactive-color="#eff0f1"
                    />
                </view>
                <text class="review-item__content">{{ review.content }}</text>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.product-reviews {
    &__summary {
        display: flex;
        flex-direction: column;
        width: 100%;
        align-items: center;
        gap: 60rpx;
        padding: 32rpx 0;
        margin-bottom: 16rpx;
    }

    &__top {
        width: 100%;
        display: flex;
        justify-content: space-between;

        &-left {
            display: flex;
            align-items: center;
            gap: 20rpx;
        }

        &-right {
        }
    }

    &__score {
        font-size: 80rpx;
        font-weight: 700;
        line-height: 80rpx;
    }

    &__out {
        font-size: 22rpx;
        color: $hy-text-color--grey;
    }

    &__stars {
        display: flex;
        align-items: center;
        gap: 4rpx;
    }

    &__total {
        font-size: 22rpx;
        color: $hy-text-color--grey;
    }

    &__bars {
        display: flex;
        flex-direction: column;
        width: 100%;

        &-row {
            display: flex;
            width: 100%;
            gap: 10rpx;
            align-items: center;
            margin: 15rpx 0;
        }
    }
}

.review-item {
    display: flex;
    gap: 20rpx;
    padding: 28rpx 0;

    &__body {
        flex: 1;
        min-width: 0;
    }

    &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__name {
        font-size: 26rpx;
        font-weight: 700;
        color: $hy-text-color;
    }

    &__time {
        font-size: 22rpx;
        color: rgba(51, 48, 46, 0.25);
    }

    &__stars {
        display: flex;
        align-items: center;
        gap: 4rpx;
        margin-top: 10rpx;
    }

    &__content {
        margin-top: 12rpx;
        font-size: 22rpx;
        line-height: 34rpx;
    }
}
</style>
