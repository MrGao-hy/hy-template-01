<script setup lang="ts">
import { ref } from 'vue';
import Tabbar from '@/components/Tabbar.vue';
import { IconConfig, useTranslate } from '@hy-app/ui';
import Icon from '@/components/Icon.vue';
import TheRootPages from '@/components/TheRootPages.vue';
import ClothingCategory from './components/ClothingCategory.vue';
import SearchHeader from './components/SearchHeader.vue';
import FilterPopup from './components/FilterPopup.vue';

definePage({
    style: {
        navigationStyle: 'custom',
    },
});

// ============== 国际化 ==============
const { t } = useTranslate('search');

// ============== 筛选弹窗 ==============
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

/** 点击搜索框 → 搜索发现页 */
const onToSearchDiscover = () => {
    uni.navigateTo({ url: '/pages-sub/searchDiscover/Index' });
};

/** 导航到 tabBar 其他页 */
const onToPages = () => {
    // tabbar 组件内部已自行处理
};
</script>
<template>
    <the-root-pages>
        <view class="search-page">
            <!-- ============== 顶部导航栏 ============== -->
            <hy-navbar
                :title="t('navbarTitle')"
                :title-style="{ fontSize: '36rpx', fontWeight: '700' }"
                placeholder
            >
                <template #left>
                    <Icon name="menu" />
                </template>
                <template #right>
                    <view class="navbar-right-item">
                        <hy-icon :name="IconConfig.REMIND" />
                        <hy-badge is-dot absolute :offset="[0, 12]"></hy-badge>
                    </view>
                </template>
            </hy-navbar>

            <!-- ============== 搜索栏（含筛选入口，点击进入搜索发现页） ============== -->
            <search-header
                @filter-tap="onFilterTap"
                @search-tap="onToSearchDiscover"
            ></search-header>

            <!-- ============== 分类折叠 ============== -->
            <clothing-category />

            <!-- ============== 底部 TabBar ============== -->
            <tabbar :current="1" @change="onToPages" />
        </view>

        <!-- ============== 筛选弹窗 ============== -->
        <filter-popup
            :show="filterVisible"
            @update:show="onFilterUpdateShow"
            @apply="onFilterApply"
        />
    </the-root-pages>
</template>

<style lang="scss" scoped>
.search-page {
    min-height: 100vh;
    background-color: $flux-bg-page;
    padding: 0 62rpx;
    display: flex;
    flex-direction: column;
}

.navbar-right-item {
    position: relative;

    .hy-badge {
        border: 2px solid $hy-background;
    }
}
</style>
