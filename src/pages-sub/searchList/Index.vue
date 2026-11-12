<script setup lang="ts">
import { ref } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';
import { onLoad } from '@dcloudio/uni-app';
import ProductCard from './components/ProductCard.vue';
import FilterPopup from '@/pages/search/components/FilterPopup.vue';
import type { SearchResultProduct } from './components/types';
import { Config } from '@/config';

/**
 * 搜索结果页（Figma: 8782-3057）
 */
definePage({
    style: {
        navigationBarTitleText: '',
    },
});

const { t } = useTranslate('searchList');

/** 搜索关键词 */
const keyword = ref('Dresses');

onLoad(options => {
    if (options?.keyword) {
        keyword.value = decodeURIComponent(options.keyword);
        uni.setNavigationBarTitle({
            title: keyword.value,
        });
    }
});

/** 结果总数（设计稿固定展示 152） */
const RESULT_COUNT = 152;

/** 商品列表（Figma: Dresses 搜索结果） */
const products = ref<SearchResultProduct[]>([
    {
        id: 1,
        name: 'Maxi Dress',
        price: 68.0,
        reviews: 46,
        rating: 5,
        image: `${Config.IMG}/image_ab2f4ed424ae6384ab7d20a54f772bf15d7db671.png`,
    },
    {
        id: 2,
        name: 'Linen Dress',
        price: 52.0,
        oldPrice: 90.0,
        reviews: 64,
        rating: 5,
        image: `${Config.IMG}/image_226c7c5428720a36a74b4a0234996217317a7aac.png`,
    },
    {
        id: 3,
        name: 'Ohara Dress',
        price: 85.0,
        reviews: 50,
        rating: 5,
        image: `${Config.IMG}/image_0bae90a82fa4f5ac14e4f0e05d1b9536e46e2dad.png`,
    },
    {
        id: 4,
        name: 'Front Tie Mini Dress',
        price: 59.0,
        reviews: 38,
        rating: 5,
        image: `${Config.IMG}/image_277a304a44849c4e605ccf87ec37092bf51698d0.png`,
    },
    {
        id: 5,
        name: 'Tie Back Mini Dress',
        price: 67.0,
        reviews: 39,
        rating: 5,
        image: `${Config.IMG}/image_69401766929aa18a23140b188e176f5dc57c4883.png`,
    },
    {
        id: 6,
        name: 'Filted Waist Dress',
        price: 47.99,
        oldPrice: 82.0,
        reviews: 53,
        rating: 5,
        image: `${Config.IMG}/image_5ff7fc25c9e3fc5d6a2e06d04f48aed5873b9be1.png`,
    },
    {
        id: 7,
        name: 'Leaves Green Dress',
        price: 64.0,
        reviews: 83,
        rating: 5,
        image: `${Config.IMG}/image_6f239608e6eedd4eb1bc0211a6fb49f898973ab9.png`,
    },
    {
        id: 8,
        name: 'Off Shoulder Dress',
        price: 78.99,
        reviews: 25,
        rating: 5,
        image: `${Config.IMG}/image_ba2a806d6be335c904ae672bcb778cd426726789.png`,
    },
]);

/** 筛选弹层 */
const showFilter = ref(false);

// ============== 事件 ==============

/** 返回上一页 */
const onBack = () => {
    uni.navigateBack();
};

/** 点击商品 → 商品详情 */
const onCardTap = (_product: SearchResultProduct) => {
    uni.navigateTo({ url: '/pages-sub/product/details/Index' });
};
</script>

<template>
    <view class="search-list">
        <!-- ============== 结果数 + 筛选 ============== -->
        <view class="search-list__meta">
            <text class="search-list__found">
                {{ t('foundResults', { count: RESULT_COUNT }) }}
            </text>
            <view class="search-list__filter" @tap="showFilter = true">
                <text class="search-list__filter-text">
                    {{ t('filter') }}
                </text>
                <hy-icon :name="IconConfig.ARROW_DOWN_FILL" size="22rpx" />
            </view>
        </view>

        <!-- ============== 商品两列列表 ============== -->
        <view class="search-list__grid">
            <product-card
                v-for="item in products"
                :key="item.id"
                :product="item"
                @tap="onCardTap"
            />
        </view>

        <!-- ============== 筛选弹层（复用搜索页） ============== -->
        <filter-popup v-model:show="showFilter" />
    </view>
</template>

<style lang="scss" scoped>
.search-list {
    min-height: 100vh;
    padding: 40rpx 40rpx calc(40rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
    background-color: $hy-background;

    &__header {
        display: flex;
        align-items: center;
        gap: 30rpx;
    }

    &__back {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56rpx;
        height: 56rpx;
    }

    &__keyword {
        font-size: $hy-font-size-md;
        font-weight: 700;
        color: $hy-text-color;
    }

    &__meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 44rpx;
    }

    &__found {
        font-size: $hy-font-size-lg;
        font-weight: 700;
        line-height: 1.4;
        color: $hy-text-color;
        white-space: pre-line;
    }

    &__filter {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12rpx;
        width: 194rpx;
        height: 80rpx;
        border: $hy-border-line;
        border-radius: $hy-radius-semicircle;
        box-sizing: border-box;

        &:active {
            opacity: 0.7;
        }
    }

    &__filter-text {
        font-size: $hy-font-size-sm;
        font-weight: 600;
    }

    &__grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        row-gap: 40rpx;
        margin-top: 44rpx;
    }
}
</style>
