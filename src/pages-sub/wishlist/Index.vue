<script setup lang="ts">
import { ref, computed } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';

/**
 * 我的收藏页（Figma 画板 8782:2506 my wishlist-all items / 8782:2594 my wishlist-boards）
 * All items：双列商品网格（名称/评分/价格/划线价）
 * Boards：双列看板卡片（封面 + 名称 + 数量）
 */
definePage({
    style: {
        navigationStyle: 'custom',
        navigationBarTextStyle: 'black',
    },
});

const { t } = useTranslate('wishlist');

/** Tab 键 */
type TabKey = 'allItems' | 'boards';

/** Tab 配置 */
const tabs = computed<{ key: TabKey; label: string }[]>(() => [
    { key: 'allItems', label: t('allItems') },
    { key: 'boards', label: t('boards') },
]);

const activeTab = ref<TabKey>('allItems');

/** 收藏商品类型 */
interface WishItem {
    id: number;
    name: string;
    rate: number;
    price: number;
    originPrice?: number;
    image: string;
}

/** 收藏商品列表（Figma 设计稿模拟数据） */
const wishItems = computed<WishItem[]>(() => [
    { id: 1, name: t('linenDress'), rate: 64, price: 52, originPrice: 90, image: '/static/images/fluxstore/home_good_1.png' },
    { id: 2, name: t('tieBackMini'), rate: 39, price: 67, image: '/static/images/fluxstore/home_good_2.png' },
    { id: 3, name: t('frontTieMini'), rate: 38, price: 59, image: '/static/images/fluxstore/home_good_3.png' },
    { id: 4, name: t('oharaDress'), rate: 50, price: 85, image: '/static/images/fluxstore/home_good_4.png' },
]);

/** 看板类型 */
interface WishBoard {
    id: number;
    name: string;
    count: number;
    cover: string;
}

/** 看板列表 */
const boards = computed<WishBoard[]>(() => [
    { id: 1, name: t('partyFashion'), count: 20, cover: '/static/images/fluxstore/home_swiper_1.png' },
    { id: 2, name: t('officeFashion'), count: 20, cover: '/static/images/fluxstore/home_swiper_2.png' },
    { id: 3, name: t('goingOut'), count: 36, cover: '/static/images/fluxstore/home_swiper_3.png' },
]);

// ============== 事件处理 ==============

/** 返回上一页 */
const onBack = () => {
    uni.navigateBack();
};

/** 切换 Tab */
const onTabChange = (key: TabKey) => {
    activeTab.value = key;
};

/** 查看商品 */
const onViewItem = (item: WishItem) => {
    uni.navigateTo({ url: '/pages-sub/product/details/Index' });
};

/** 查看看板 */
const onViewBoard = (board: WishBoard) => {
    uni.showToast({ title: `${board.name} · ${t('itemsCount', { count: board.count })}`, icon: 'none' });
};
</script>

<template>
    <view class="wishlist-page">
        <!-- ============== 顶部：返回 + 标题 ============== -->
        <view class="wishlist-page__header">
            <view class="wishlist-page__back" @tap="onBack">
                <hy-icon :name="IconConfig.LEFT" size="36rpx" color="#1a1a1a" />
            </view>
            <text class="wishlist-page__title">{{ t('title') }}</text>
        </view>

        <!-- ============== Tab ============== -->
        <view class="wish-tabs">
            <view
                v-for="tab in tabs"
                :key="tab.key"
                class="wish-tabs__item"
                :class="{ 'is-active': activeTab === tab.key }"
                @tap="onTabChange(tab.key)"
            >
                {{ tab.label }}
            </view>
        </view>

        <!-- ============== 全部商品网格 ============== -->
        <view v-if="activeTab === 'allItems'" class="wish-grid">
            <view
                v-for="item in wishItems"
                :key="item.id"
                class="wish-card"
                @tap="onViewItem(item)"
            >
                <hy-image
                    :src="item.image"
                    width="100%"
                    height="320rpx"
                    radius="24rpx"
                    mode="aspectFill"
                    :fade="true"
                    lazy-load
                />
                <view class="wish-card__info">
                    <text class="wish-card__name">{{ item.name }}</text>
                    <view class="wish-card__rate">
                        <hy-icon :name="IconConfig.STAR_FILL" size="22rpx" color="#f5c33b" />
                        <text class="wish-card__rate-text">({{ item.rate }})</text>
                    </view>
                    <view class="wish-card__price-row">
                        <text class="wish-card__price">$ {{ item.price.toFixed(2) }}</text>
                        <text v-if="item.originPrice" class="wish-card__origin">
                            $ {{ item.originPrice.toFixed(2) }}
                        </text>
                    </view>
                </view>
            </view>
        </view>

        <!-- ============== 看板网格 ============== -->
        <view v-else class="wish-grid">
            <view
                v-for="board in boards"
                :key="board.id"
                class="board-card"
                @tap="onViewBoard(board)"
            >
                <hy-image
                    :src="board.cover"
                    width="100%"
                    height="320rpx"
                    radius="24rpx"
                    mode="aspectFill"
                    :fade="true"
                    lazy-load
                />
                <view class="board-card__mask" />
                <view class="board-card__info">
                    <text class="board-card__name">{{ board.name }}</text>
                    <text class="board-card__count">
                        {{ t('itemsCount', { count: board.count }) }}
                    </text>
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.wishlist-page {
    min-height: 100vh;
    padding: calc(var(--status-bar-height) + 40rpx) 40rpx
        calc(40rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
    background-color: #ffffff;

    &__header {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80rpx;
    }

    &__back {
        position: absolute;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56rpx;
        height: 56rpx;
    }

    &__title {
        font-size: 36rpx;
        font-weight: 700;
        color: $flux-text-primary;
    }
}

/* Tab */
.wish-tabs {
    display: flex;
    gap: 16rpx;
    margin-top: 40rpx;

    &__item {
        padding: 14rpx 36rpx;
        font-size: 26rpx;
        color: rgba(51, 48, 46, 0.7);
        background-color: #fafafa;
        border-radius: $flux-radius-md;
        transition: all 0.2s;

        &.is-active {
            color: #ffffff;
            background-color: #343434;
        }
    }
}

/* 双列网格 */
.wish-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 32rpx;
    margin-top: 40rpx;
}

/* 收藏商品卡片 */
.wish-card {
    width: calc(50% - 16rpx);

    &:active {
        opacity: 0.85;
    }

    &__info {
        display: flex;
        flex-direction: column;
        gap: 8rpx;
        margin-top: 16rpx;
    }

    &__name {
        font-size: 26rpx;
        font-weight: 600;
        color: $flux-text-primary;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__rate {
        display: flex;
        align-items: center;
        gap: 8rpx;
    }

    &__rate-text {
        font-size: 22rpx;
        color: #8a8a8f;
    }

    &__price-row {
        display: flex;
        align-items: baseline;
        gap: 16rpx;
    }

    &__price {
        font-size: 28rpx;
        font-weight: 700;
        color: $flux-text-primary;
    }

    &__origin {
        font-size: 22rpx;
        color: #8a8a8f;
        text-decoration: line-through;
    }
}

/* 看板卡片 */
.board-card {
    position: relative;
    width: calc(50% - 16rpx);

    &:active {
        opacity: 0.85;
    }

    &__mask {
        position: absolute;
        inset: 0;
        border-radius: 24rpx;
        background: linear-gradient(to top, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0) 50%);
    }

    &__info {
        position: absolute;
        right: 24rpx;
        bottom: 24rpx;
        left: 24rpx;
        display: flex;
        flex-direction: column;
        gap: 4rpx;
    }

    &__name {
        font-size: 26rpx;
        font-weight: 700;
        color: #ffffff;
    }

    &__count {
        font-size: 22rpx;
        color: rgba(255, 255, 255, 0.85);
    }
}
</style>
