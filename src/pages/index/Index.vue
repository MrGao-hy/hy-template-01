<script setup lang="ts">
import { ref } from 'vue';
import { useTranslate, type GridItemVo } from '@hy-app/ui';
import AppNavbar from '@/components/AppNavbar.vue';
import Tabbar from '@/components/Tabbar.vue';

import CategoryNav from './components/CategoryNav.vue';
import HomeBanner from './components/HomeBanner.vue';
import FeatureProducts from './components/FeatureProducts.vue';
import NewCollectionBanner from './components/NewCollectionBanner.vue';
import RecommendedProducts from './components/RecommendedProducts.vue';
import TopCollection from './components/TopCollection.vue';
import CategoryShowcase from './components/CategoryShowcase.vue';
import { Config } from '@/config';

import type {
    CategoryNav as CategoryNavType,
    BannerItem,
    Product,
    RecommendedProduct,
    CollectionBanner,
    CategoryShowcase as CategoryShowcaseType,
} from './components/types';

definePage({
    type: 'home',
    style: {
        navigationStyle: 'custom',
    },
});

// ============== 国际化 ==============
const { t } = useTranslate('home');

// ============== 模拟数据（使用 key 方便国际化） ==============

/** 分类导航数据 - Women/Men/Accessories/Beauty */
const categoryNavList = ref<CategoryNavType[]>([
    {
        id: 1,
        nameKey: 'categories.women',
        icon: 'woman',
        active: true,
    },
    {
        id: 2,
        nameKey: 'categories.men',
        icon: 'man',
    },
    {
        id: 3,
        nameKey: 'categories.accessories',
        icon: 'glasses',
    },
    {
        id: 4,
        nameKey: 'categories.beauty',
        icon: 'beauty',
    },
]);

/** 轮播图数据 */
const bannerList = ref<BannerItem[]>([
    {
        id: 1,
        image: `${Config.IMG}/swiper_1.png`,
        titleKey: 'banner.autumnTitle',
        subtitleKey: 'banner.autumnSubtitle',
    },
    {
        id: 2,
        image: `${Config.IMG}/swiper_1.png`,
        titleKey: 'banner.summerTitle',
        subtitleKey: 'banner.summerSubtitle',
    },
    {
        id: 3,
        image: `${Config.IMG}/swiper_1.png`,
        titleKey: 'banner.newTitle',
        subtitleKey: 'banner.newSubtitle',
    },
]);

/** Feature Products - 特色商品横向滚动 */
const featureProductList = ref<Product[]>([
    {
        id: 1,
        nameKey: 'featureProducts.turtleneckSweater',
        price: 39.99,
        image: `${Config.IMG}/home_swiper_1.png`,
    },
    {
        id: 2,
        nameKey: 'featureProducts.longSleeveDress',
        price: 45.0,
        image: `${Config.IMG}/home_swiper_2.png`,
    },
    {
        id: 3,
        nameKey: 'featureProducts.sportswearSet',
        price: 80.0,
        image: `${Config.IMG}/home_swiper_3.png`,
    },
    {
        id: 4,
        nameKey: 'featureProducts.casualJacket',
        price: 65.0,
        image: `${Config.IMG}/home_swiper_4.png`,
    },
]);

/** NEW COLLECTION - 新合集横幅 */
const newCollectionBanner = ref<CollectionBanner>({
    id: 1,
    tagKey: 'newCollection.tag',
    titleKey: 'newCollection.title',
    image: `${Config.IMG}/home_1.png`,
});

/** Recommended - 推荐商品列表 */
const recommendedList = ref<RecommendedProduct[]>([
    {
        id: 1,
        nameKey: 'recommended.whiteHoodie',
        price: 29.0,
        image: `${Config.IMG}/home_good_1.png`,
    },
    {
        id: 2,
        nameKey: 'recommended.cottonTshirt',
        price: 30.0,
        image: `${Config.IMG}/home_good_2.png`,
    },
]);

/** Top Collection - 合集横幅列表 */
const topCollectionList = ref<CollectionBanner[]>([
    {
        id: 1,
        tagKey: 'topCollection.saleTag',
        titleKey: 'topCollection.slimTitle',
        image: `${Config.IMG}/home_good_3.png`,
    },
    {
        id: 2,
        tagKey: 'topCollection.summerTag',
        titleKey: 'topCollection.sexyTitle',
        image: `${Config.IMG}/home_good_4.png`,
    },
]);

/** 分类展示 - T-Shirts / Dresses */
const categoryShowcaseList = ref<CategoryShowcaseType[]>([
    {
        id: 1,
        categoryKey: 'categoryShowcase.tshirts',
        titleKey: 'categoryShowcase.tshirtsTitle',
        image: `${Config.IMG}/home_good_5.png`,
    },
    {
        id: 2,
        categoryKey: 'categoryShowcase.dresses',
        titleKey: 'categoryShowcase.dressesTitle',
        image: `${Config.IMG}/home_good_6.png`,
    },
]);

// ============== 事件处理 ==============

/** 分类导航点击 */
const onCategoryNavTap = (item: GridItemVo) => {
    categoryNavList.value.forEach(cat => {
        cat.active = cat.id === item.id;
    });
    console.log('category tapped:', t(item.nameKey));
};

/** 轮播图点击 */
const onBannerTap = (index: number) => {
    const item = bannerList.value[index];
    console.log('banner tapped:', item?.id);
};

/** 商品点击 */
const onProductTap = (item: Product | RecommendedProduct) => {
    console.log('product tapped:', item.id);
};

/** 查看全部点击 */
const onShowAllTap = (section: string) => {
    console.log('show all tapped:', section);
};

/** 合集横幅点击 */
const onCollectionTap = (item: CollectionBanner) => {
    console.log('collection tapped:', item.id);
};

/** 分类展示点击 */
const onCategoryShowcaseTap = (item: CategoryShowcaseType) => {
    console.log('category showcase tapped:', t(item.categoryKey));
};

/** 导航到tabBar页面 */
const onToPages = () => {};
</script>

<template>
    <view class="home">
        <!-- ============== 顶部导航栏 ============== -->
        <app-navbar :title="t('navbarTitle')" :active-id="1" />

        <scroll-view scroll-y class="home__scroll" :show-scrollbar="false">
            <view class="home__container">
                <!-- ============== 分类导航区 - Women/Men/Accessories/Beauty ============== -->
                <CategoryNav :list="categoryNavList" @tap="onCategoryNavTap" />

                <!-- ============== 轮播图 Banner ============== -->
                <HomeBanner :list="bannerList" @tap="onBannerTap" />

                <!-- ============== Feature Products - 特色商品区 ============== -->
                <FeatureProducts
                    :list="featureProductList"
                    @tap="onProductTap"
                    @show-all="onShowAllTap('feature')"
                />
            </view>

            <!-- ============== NEW COLLECTION - 新合集横幅 ============== -->
            <NewCollectionBanner
                :banner="newCollectionBanner"
                @tap="onCollectionTap"
            />

            <view class="home__container">
                <!-- ============== Recommended - 推荐商品区 ============== -->
                <RecommendedProducts
                    :list="recommendedList"
                    @tap="onProductTap"
                    @show-all="onShowAllTap('recommended')"
                />

                <!-- ============== Top Collection - 顶部合集区 ============== -->
                <TopCollection
                    :list="topCollectionList"
                    @tap="onCollectionTap"
                    @show-all="onShowAllTap('top')"
                />

                <!-- ============== 分类展示 - T-Shirts / Dresses ============== -->
                <CategoryShowcase
                    :list="categoryShowcaseList"
                    @tap="onCategoryShowcaseTap"
                />
            </view>
        </scroll-view>

        <!-- ============== 底部 TabBar ============== -->
        <tabbar :current="0" @change="onToPages" />
    </view>
</template>

<style lang="scss" scoped>
.home {
    min-height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;

    &__navbar-icon {
        width: 44rpx;
        height: 44rpx;
    }

    &__navbar-title {
        font-size: $hy-font-size-lg;
        font-weight: 700;
        color: $hy-text-color;
        letter-spacing: 0.5rpx;
    }

    /* ============== 滚动区域 ============== */
    &__scroll {
        flex: 1;
        height: 0;
    }

    /* ============== 容器区域 ============== */
    &__container {
        padding: 0 $hy-border-margin-padding-lg;
    }
}
</style>
