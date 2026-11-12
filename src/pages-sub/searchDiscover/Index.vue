<script setup lang="ts">
import { ref } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';
import SearchHeader from '@/pages/search/components/SearchHeader.vue';
import RecentSearches from './components/RecentSearches.vue';
import PopularWeek from './components/PopularWeek.vue';
import FilterPopup from '@/pages/search/components/FilterPopup.vue';
import type { PopularProduct } from '@/pages/search/components/types';

/**
 * 搜索发现页
 * 主搜索页点击搜索框进入，支持关键词搜索
 */
definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('search');

/** 筛选弹窗 */
const filterVisible = ref(false);

const onFilterTap = () => {
    filterVisible.value = true;
};

const onFilterApply = () => {
    console.log('filter applied');
};

const onFilterUpdateShow = (value: boolean) => {
    filterVisible.value = value;
};

// ============== 路由跳转 ==============

/** 返回上一页 */
const onBack = () => {
    uni.navigateBack();
};

/** 跳转搜索结果页 */
const onToSearchList = (keyword: string) => {
    uni.navigateTo({
        url: `/pages-sub/searchList/Index?keyword=${encodeURIComponent(keyword)}`,
    });
};

/** 跳转商品详情页 */
const onToProductDetail = (_item: PopularProduct) => {
    uni.navigateTo({ url: '/pages-sub/product/details/Index' });
};

/** 查看全部热门商品 */
const onShowAllPopular = () => {
    uni.navigateTo({
        url: `/pages-sub/searchList/Index?keyword=${encodeURIComponent('Popular')}`,
    });
};
</script>

<template>
    <view class="search-discover">
        <!-- ============== 顶部：返回 + 可搜索栏 ============== -->
        <view class="search-discover__header">
            <view class="search-discover__back" @tap="onBack">
                <hy-icon :name="IconConfig.LEFT" size="36rpx" />
            </view>
            <search-header
                class="search-discover__bar"
                :disabled="false"
                @filter-tap="onFilterTap"
            />
        </view>

        <!-- ============== 最近搜索 ============== -->
        <recent-searches @search="onToSearchList" />

        <!-- ============== 本周热门 ============== -->
        <popular-week @tap="onToProductDetail" @show-all="onShowAllPopular" />

        <!-- ============== 筛选弹窗 ============== -->
        <filter-popup
            :show="filterVisible"
            @update:show="onFilterUpdateShow"
            @apply="onFilterApply"
        />
    </view>
</template>

<style lang="scss" scoped>
.search-discover {
    min-height: 100vh;
    padding: calc(var(--status-bar-height) + 20rpx) 62rpx
        calc(40rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
    background-color: $hy-background;

    &__header {
        display: flex;
        align-items: center;
        gap: 20rpx;
    }

    &__back {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__bar {
        flex: 1;
        min-width: 0;
    }
}

.search-discover :deep(.search-bar) {
    padding: 0;
}
</style>
