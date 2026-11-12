<script setup lang="ts">
import { ref } from 'vue';
import { useTranslate } from '@hy-app/ui';
import ProductReviews from './ProductReviews.vue';
import SimilarProducts from './SimilarProducts.vue';
import type { RatingBar, ReviewItem, SimpleProduct } from './types';

const props = defineProps<{
    /** 商品描述 */
    description: string;
    /** 平均分 */
    score: number;
    /** 评价总数 */
    total: number;
    /** 评分分布 */
    bars: RatingBar[];
    /** 评价列表 */
    reviews: ReviewItem[];
    /** 相似商品列表 */
    products: SimpleProduct[];
}>();

const emit = defineEmits<{
    (e: 'similar-tap', item: SimpleProduct): void;
}>();

const { t } = useTranslate('product');

/** 当前展开的面板索引（0=详情 1=评价 2=相似推荐，设计稿默认全开） */
const expandedPanels = ref<number[]>([0, 1, 2]);

/** 描述是否展开 */
const descriptionExpanded = ref(false);

/** 切换描述展开 */
const onToggleDescription = () => {
    descriptionExpanded.value = !descriptionExpanded.value;
};

/** 点击相似商品 */
const onSimilarTap = (item: SimpleProduct) => {
    emit('similar-tap', item);
};
</script>

<template>
    <hy-folding-panel v-model="expandedPanels">
        <hy-folding-panel-item
            :index="0"
            :title="t('description')"
            default-open
            :custom-style="{ padding: '0' }"
        >
            <view class="description">
                <text
                    class="description__text"
                    :class="{ 'description__text--clamped': !descriptionExpanded }"
                >
                    {{ props.description }}
                </text>
                <text class="description__more" @tap="onToggleDescription">
                    {{ t('readMore') }}
                </text>
            </view>
        </hy-folding-panel-item>

        <hy-folding-panel-item :index="1" default-open :title="t('reviews')">
            <product-reviews
                :score="props.score"
                :total="props.total"
                :bars="props.bars"
                :reviews="props.reviews"
            />
        </hy-folding-panel-item>

        <hy-folding-panel-item
            :index="2"
            default-open
            :title="t('similarProduct')"
        >
            <similar-products :products="props.products" @tap="onSimilarTap" />
        </hy-folding-panel-item>
    </hy-folding-panel>
</template>

<style lang="scss" scoped>
/* 描述 */
.description {
    margin-bottom: $hy-border-margin-padding-xl;
    &__text {
        font-size: $hy-font-size-sm;
        line-height: 40rpx;
        color: $hy-text-color--grey;
    }

    &__text--clamped {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
    }

    &__more {
        display: inline-block;
        margin-top: 12rpx;
        font-size: 24rpx;
        color: $hy-primary;
        text-decoration: underline;
    }
}
</style>
