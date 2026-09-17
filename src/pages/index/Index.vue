<script setup lang="ts">
import { ref } from 'vue';
import { IconConfig, useTranslate, type GridItemVo } from '@hy-app/ui';
import TheRootPages from '@/components/TheRootPages.vue';
import Icon from '@/components/Icon.vue';
import Tabbar from '@/components/Tabbar.vue';

import CategoryNav from './components/CategoryNav.vue';
import HomeBanner from './components/HomeBanner.vue';
import FeatureProducts from './components/FeatureProducts.vue';
import NewCollectionBanner from './components/NewCollectionBanner.vue';
import RecommendedProducts from './components/RecommendedProducts.vue';
import TopCollection from './components/TopCollection.vue';
import CategoryShowcase from './components/CategoryShowcase.vue';
import SideMenuPopup from '@/components/SideMenuPopup.vue';

import type {
    CategoryNav as CategoryNavType,
    BannerItem,
    Product,
    RecommendedProduct,
    CollectionBanner,
    CategoryShowcase as CategoryShowcaseType,
    SideMenuItem,
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
        image: '/static/images/fluxstore/image_071373fad51ad0143a98105907f84f8d80c53d58.png',
        titleKey: 'banner.autumnTitle',
        subtitleKey: 'banner.autumnSubtitle',
    },
    {
        id: 2,
        image: '/static/images/fluxstore/image_09a1be8060c68fe8e2d0ea8f62839ee9328cede6.png',
        titleKey: 'banner.summerTitle',
        subtitleKey: 'banner.summerSubtitle',
    },
    {
        id: 3,
        image: '/static/images/fluxstore/image_09e90f5ea1ecc64acbaaa975deb94ffe18def16c.png',
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
        image: '/static/images/fluxstore/home_swiper_1.png',
    },
    {
        id: 2,
        nameKey: 'featureProducts.longSleeveDress',
        price: 45.0,
        image: '/static/images/fluxstore/home_swiper_2.png',
    },
    {
        id: 3,
        nameKey: 'featureProducts.sportswearSet',
        price: 80.0,
        image: '/static/images/fluxstore/home_swiper_3.png',
    },
    {
        id: 4,
        nameKey: 'featureProducts.casualJacket',
        price: 65.0,
        image: '/static/images/fluxstore/home_swiper_4.png',
    },
]);

/** NEW COLLECTION - 新合集横幅 */
const newCollectionBanner = ref<CollectionBanner>({
    id: 1,
    tagKey: 'newCollection.tag',
    titleKey: 'newCollection.title',
    image: '/static/images/fluxstore/home_1.png',
});

/** Recommended - 推荐商品列表 */
const recommendedList = ref<RecommendedProduct[]>([
    {
        id: 1,
        nameKey: 'recommended.whiteHoodie',
        price: 29.0,
        image: '/static/images/fluxstore/home_good_1.png',
    },
    {
        id: 2,
        nameKey: 'recommended.cottonTshirt',
        price: 30.0,
        image: '/static/images/fluxstore/home_good_2.png',
    },
]);

/** Top Collection - 合集横幅列表 */
const topCollectionList = ref<CollectionBanner[]>([
    {
        id: 1,
        tagKey: 'topCollection.saleTag',
        titleKey: 'topCollection.slimTitle',
        image: '/static/images/fluxstore/home_good_3.png',
    },
    {
        id: 2,
        tagKey: 'topCollection.summerTag',
        titleKey: 'topCollection.sexyTitle',
        image: '/static/images/fluxstore/home_good_4.png',
    },
]);

/** 分类展示 - T-Shirts / Dresses */
const categoryShowcaseList = ref<CategoryShowcaseType[]>([
    {
        id: 1,
        categoryKey: 'categoryShowcase.tshirts',
        titleKey: 'categoryShowcase.tshirtsTitle',
        image: '/static/images/fluxstore/home_good_5.png',
    },
    {
        id: 2,
        categoryKey: 'categoryShowcase.dresses',
        titleKey: 'categoryShowcase.dressesTitle',
        image: '/static/images/fluxstore/home_good_6.png',
    },
]);

// ============== 事件处理 ==============

/** 侧边工具列表弹窗显隐 */
const showSideMenu = ref(false);

/** 菜单点击：打开侧边工具列表弹窗 */
const onMenuTap = () => {
    showSideMenu.value = true;
};

/** 侧边工具列表选中 */
const onSideMenuSelect = (item: SideMenuItem) => {
    console.log('side menu selected:', t(`sideMenu.${item.nameKey}`));
};

/** 通知点击 */
const onNotificationTap = () => {
    uni.navigateTo({ url: '/pages-sub/notification/Index' });
};

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
    <the-root-pages>
        <view class="home">
            <!-- ============== 顶部导航栏 ============== -->
            <hy-navbar
                :title="t('navbarTitle')"
                :title-style="{ fontSize: '36rpx', fontWeight: '700' }"
                placeholder
                @left-click="onMenuTap"
                @right-click="onNotificationTap"
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

            <scroll-view scroll-y class="home__scroll" :show-scrollbar="false">
                <view class="home__container">
                    <!-- ============== 分类导航区 - Women/Men/Accessories/Beauty ============== -->
                    <CategoryNav
                        :list="categoryNavList"
                        @tap="onCategoryNavTap"
                    />

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

                <!-- ============== 底部安全区 ============== -->
                <view class="home__safe-bottom" />
            </scroll-view>

            <!-- ============== 底部 TabBar ============== -->
            <tabbar :current="0" @change="onToPages" />

            <!-- ============== 侧边工具列表弹窗 ============== -->
            <SideMenuPopup
                v-model:show="showSideMenu"
                @select="onSideMenuSelect"
            />
        </view>
    </the-root-pages>
</template>

<style lang="scss" scoped>
.home {
    min-height: 100vh;
    background-color: $flux-bg-page;
    position: relative;
    display: flex;
    flex-direction: column;

    .navbar-right-item {
        position: relative;

        .hy-badge {
            border: 2px solid $hy-background;
        }
    }

    &__navbar-icon {
        width: 44rpx;
        height: 44rpx;
    }

    &__navbar-title {
        font-size: $flux-font-xl;
        font-weight: 700;
        color: $flux-text-primary;
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

    /* ============== 底部安全区 ============== */
    &__safe-bottom {
        /* #ifdef H5 || APP-PLUS */
        height: calc(160rpx + env(safe-area-inset-bottom));
        /* #endif */
        /* #ifdef MP-WEIXIN */
        height: calc(160rpx + constant(safe-area-inset-bottom));
        height: calc(160rpx + env(safe-area-inset-bottom));
        /* #endif */
    }
}
</style>
