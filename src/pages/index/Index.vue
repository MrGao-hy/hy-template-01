<script setup lang="ts">
import { ref } from 'vue';
import { IconConfig } from '@hy-app/ui';
import TheRootPages from '@/components/TheRootPages.vue';

definePage({
    style: {
        navigationStyle: 'custom',
        navigationBarTextStyle: 'black',
    },
});

/** 商品类型 */
interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    tag?: string;
}

/** 分类类型 */
interface Category {
    name: string;
    icon: string;
    bgColor: string;
}

/** 轮播图数据 */
const bannerList = ref<string[]>([
    '/static/images/fluxstore/image_071373fad51ad0143a98105907f84f8d80c53d58.png',
    '/static/images/fluxstore/image_09a1be8060c68fe8e2d0ea8f62839ee9328cede6.png',
    '/static/images/fluxstore/image_09e90f5ea1ecc64acbaaa975deb94ffe18def16c.png',
]);

/** 分类数据 */
const categoryList = ref<Category[]>([
    { name: '时尚', icon: IconConfig.MINE_FILL, bgColor: '#E8D5C4' },
    { name: '发现', icon: IconConfig.SEARCH, bgColor: '#F0F0F2' },
    { name: '推荐', icon: IconConfig.STAR_FILL, bgColor: '#F0F0F2' },
    { name: '分类', icon: IconConfig.CLASS, bgColor: '#F0F0F2' },
]);

/** 商品数据 */
const productList = ref<Product[]>([
    {
        id: 1,
        name: '简约时尚针织衫',
        price: 199,
        originalPrice: 299,
        image: '/static/images/fluxstore/image_0bae90a82fa4f5ac14e4f0e05d1b9536e46e2dad.png',
        rating: 4.8,
        tag: '新品',
    },
    {
        id: 2,
        name: '复古休闲外套',
        price: 329,
        image: '/static/images/fluxstore/image_12f8cad101641db0192ceca19f5110de13c7a264.png',
        rating: 4.6,
    },
    {
        id: 3,
        name: '纯棉印花T恤',
        price: 89,
        originalPrice: 129,
        image: '/static/images/fluxstore/image_15fabd854b7cb3b15474b1d58ae3661dd03a76db.png',
        rating: 4.9,
        tag: '热卖',
    },
    {
        id: 4,
        name: '高腰直筒牛仔裤',
        price: 259,
        image: '/static/images/fluxstore/image_1ba718d3938b04da6be29a56e3d4b6108c22d1e6.png',
        rating: 4.7,
    },
    {
        id: 5,
        name: '轻奢金属项链',
        price: 159,
        originalPrice: 199,
        image: '/static/images/fluxstore/image_2059944f83f665e563d29b20be6188383e033306.png',
        rating: 4.5,
    },
    {
        id: 6,
        name: '百搭帆布单肩包',
        price: 199,
        image: '/static/images/fluxstore/image_226c7c5428720a36a74b4a0234996217317a7aac.png',
        rating: 4.8,
    },
]);

/** 菜单点击 */
const onMenu = () => {
    // TODO: 打开侧边菜单
};

/** 通知点击 */
const onNotification = () => {
    // TODO: 跳转通知页
};

/** 搜索点击 */
const onSearch = () => {
    // TODO: 跳转搜索页
};

/** 筛选点击 */
const onFilter = () => {
    // TODO: 打开筛选
};

/** 分类点击 */
const onCategoryClick = (item: Category) => {
    // TODO: 跳转分类页
    console.log('category:', item.name);
};

/** 商品点击 */
const onProductClick = (item: Product) => {
    // TODO: 跳转商品详情
    console.log('product:', item.id);
};

/** 查看全部 */
const onViewAll = () => {
    // TODO: 跳转全部商品
};

/** 轮播图点击 */
const onBannerClick = (index: number) => {
    console.log('banner:', index);
};
</script>

<template>
    <the-root-pages>
        <view class="home">
            <!-- 顶部导航栏 -->
            <view class="home__navbar">
                <view class="home__navbar-btn" @tap="onMenu">
                    <hy-icon
                        :name="IconConfig.MENU"
                        size="40rpx"
                        color="#33302E"
                    />
                </view>
                <view class="home__navbar-btn" @tap="onNotification">
                    <hy-icon
                        :name="IconConfig.REMIND_FILL"
                        size="40rpx"
                        color="#33302E"
                    />
                    <view class="home__navbar-badge">
                        <hy-badge is-dot type="error" />
                    </view>
                </view>
            </view>

            <!-- 搜索栏 -->
            <view class="home__search">
                <view class="home__search-input" @tap="onSearch">
                    <hy-icon
                        :name="IconConfig.SEARCH"
                        size="32rpx"
                        color="#9E9B95"
                    />
                    <text class="home__search-placeholder">搜索商品...</text>
                </view>
                <view class="home__search-filter" @tap="onFilter">
                    <hy-icon
                        :name="IconConfig.SCREEN"
                        size="32rpx"
                        color="#33302E"
                    />
                </view>
            </view>

            <!-- 分类宫格 -->
            <hy-grid
                :list="categoryList"
                :col="4"
                :gap="'20rpx'"
                @click="onCategoryClick"
            >
                <template #default="{ record }">
                    <view class="category-item">
                        <view
                            class="category-item__icon"
                            :style="{ backgroundColor: record.bgColor }"
                        >
                            <hy-icon
                                :name="record.icon"
                                size="40rpx"
                                color="#33302E"
                            />
                        </view>
                        <text class="category-item__name">{{
                            record.name
                        }}</text>
                    </view>
                </template>
            </hy-grid>

            <!-- 轮播图 -->
            <view class="home__banner">
                <hy-swiper
                    :list="bannerList"
                    height="300rpx"
                    radius="20rpx"
                    indicator
                    indicator-mode="dot"
                    autoplay
                    circular
                    @click="onBannerClick"
                />
            </view>

            <!-- 商品推荐 -->
            <view class="home__section">
                <view class="home__section-header">
                    <text class="home__section-title">推荐商品</text>
                    <view class="home__section-more" @tap="onViewAll">
                        <text class="home__section-more-text">查看全部</text>
                        <hy-icon
                            :name="IconConfig.RIGHT"
                            size="24rpx"
                            color="#9E9B95"
                        />
                    </view>
                </view>
                <scroll-view
                    scroll-x
                    class="home__product-scroll"
                    :show-scrollbar="false"
                >
                    <view class="home__product-list">
                        <view
                            v-for="item in productList"
                            :key="item.id"
                            class="product-card"
                            @tap="onProductClick(item)"
                        >
                            <view class="product-card__image-wrap">
                                <hy-image
                                    :src="item.image"
                                    width="280rpx"
                                    height="280rpx"
                                    radius="16rpx"
                                />
                                <view v-if="item.tag" class="product-card__tag">
                                    <hy-badge :value="item.tag" type="error" />
                                </view>
                            </view>
                            <text class="product-card__name">{{
                                item.name
                            }}</text>
                            <view class="product-card__rating">
                                <hy-icon
                                    :name="IconConfig.STAR_FILL"
                                    size="24rpx"
                                    color="#00C56A"
                                />
                                <text class="product-card__rating-text">{{
                                    item.rating
                                }}</text>
                            </view>
                            <view class="product-card__price-wrap">
                                <text class="product-card__price"
                                    >¥{{ item.price }}</text
                                >
                                <text
                                    v-if="item.originalPrice"
                                    class="product-card__original"
                                    >¥{{ item.originalPrice }}</text
                                >
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </view>

            <!-- 底部安全区 -->
            <view class="home__safe-bottom" />
        </view>
    </the-root-pages>
</template>

<style lang="scss" scoped>
.home {
    min-height: 100vh;
    background-color: #ffffff;

    /* 顶部导航栏 */
    &__navbar {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 32rpx;
        height: 88rpx;
        padding-top: var(--status-bar-height);
    }

    &__navbar-btn {
        position: relative;
        width: 72rpx;
        height: 72rpx;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__navbar-badge {
        position: absolute;
        top: 14rpx;
        right: 14rpx;
        z-index: 1;
    }

    /* 搜索栏 */
    &__search {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 16rpx 32rpx 24rpx;
        gap: 20rpx;
    }

    &__search-input {
        flex: 1;
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 80rpx;
        padding: 0 24rpx;
        background-color: #f5f5f7;
        border-radius: 40rpx;
        gap: 16rpx;
    }

    &__search-placeholder {
        font-size: 28rpx;
        color: #9e9b95;
    }

    &__search-filter {
        width: 80rpx;
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f5f5f7;
        border-radius: 40rpx;
    }

    /* 轮播图 */
    &__banner {
        padding: 0 32rpx;
        margin-top: 16rpx;
    }

    /* 商品推荐区 */
    &__section {
        margin-top: 40rpx;
    }

    &__section-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 32rpx;
        margin-bottom: 24rpx;
    }

    &__section-title {
        font-size: 34rpx;
        font-weight: 700;
        color: #33302e;
    }

    &__section-more {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 4rpx;
    }

    &__section-more-text {
        font-size: 26rpx;
        color: #9e9b95;
    }

    /* 商品横向滚动 */
    &__product-scroll {
        width: 100%;
    }

    &__product-list {
        display: flex;
        flex-direction: row;
        padding: 0 32rpx;
        gap: 20rpx;
    }

    /* 底部安全区 */
    &__safe-bottom {
        /* #ifdef H5 || APP-PLUS */
        height: calc(120rpx + env(safe-area-inset-bottom));
        /* #endif */
        /* #ifdef MP-WEIXIN */
        height: calc(120rpx + constant(safe-area-inset-bottom));
        height: calc(120rpx + env(safe-area-inset-bottom));
        /* #endif */
    }
}

/* 分类项 */
.category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12rpx;

    &__icon {
        width: 96rpx;
        height: 96rpx;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__name {
        font-size: 24rpx;
        color: #33302e;
    }
}

/* 商品卡片 */
.product-card {
    flex-shrink: 0;
    width: 280rpx;

    &__image-wrap {
        position: relative;
        width: 280rpx;
        height: 280rpx;
    }

    &__tag {
        position: absolute;
        top: 16rpx;
        left: 16rpx;
        z-index: 1;
    }

    &__name {
        display: block;
        margin-top: 16rpx;
        font-size: 26rpx;
        color: #33302e;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__rating {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8rpx;
        margin-top: 8rpx;
    }

    &__rating-text {
        font-size: 22rpx;
        color: #9e9b95;
    }

    &__price-wrap {
        display: flex;
        flex-direction: row;
        align-items: baseline;
        gap: 12rpx;
        margin-top: 8rpx;
    }

    &__price {
        font-size: 32rpx;
        font-weight: 700;
        color: #ef466f;
    }

    &__original {
        font-size: 22rpx;
        color: #bebbb5;
        text-decoration: line-through;
    }
}
</style>
