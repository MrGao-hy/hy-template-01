<script setup lang="ts">
import { ref, computed } from 'vue';
import { useToast, useTranslate } from '@hy-app/ui';
import { Config } from '@/config';
import Navbar from '@/components/Navbar.vue';
import WishItemCard, { type WishItem } from './components/WishItemCard.vue';
import WishBoardCard, { type WishBoard } from './components/WishBoardCard.vue';

/**
 * 我的收藏页
 */
definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('wishlist');

// ============== Tab 配置 ==============

/** Tab 键 */
type TabValue = 'allItems' | 'boards';

/** 分段器数据源 */
const tabList = computed(() => [
    { name: t('allItems'), value: 'allItems' as TabValue },
    { name: t('boards'), value: 'boards' as TabValue },
]);

/** 当前选中值 */
const activeTab = ref<TabValue>('allItems');
const toast = useToast();

// ============== 收藏商品数据 ==============

/** 收藏商品列表 */
const wishItems = computed<WishItem[]>(() => [
    {
        id: 1,
        name: t('linenDress'),
        rating: 5,
        scoreCount: 64,
        price: 52,
        originPrice: 90,
        image: `${Config.IMG}/good_4.png`,
    },
    {
        id: 2,
        name: t('tieBackMini'),
        rating: 5,
        scoreCount: 39,
        price: 67,
        image: `${Config.IMG}/good_1.png`,
    },
    {
        id: 3,
        name: t('frontTieMini'),
        rating: 4,
        scoreCount: 38,
        price: 59,
        image: `${Config.IMG}/good_5.png`,
    },
    {
        id: 4,
        name: t('oharaDress'),
        rating: 5,
        scoreCount: 50,
        price: 85,
        image: `${Config.IMG}/good_6.png`,
    },
]);

/** 看板列表（每张卡 6 张拼贴图：左 2 大 + 右 4 小） */
const boards = computed<WishBoard[]>(() => [
    {
        id: 1,
        name: t('goingOut'),
        count: 36,
        images: [
            `${Config.IMG}/good_12.png`,
            `${Config.IMG}/good_13.png`,
            `${Config.IMG}/good_14.png`,
            `${Config.IMG}/good_15.png`,
            `${Config.IMG}/good_16.png`,
            `${Config.IMG}/good_17.png`,
        ],
    },
    {
        id: 2,
        name: t('officeFashion'),
        count: 20,
        images: [
            `${Config.IMG}/good_18.png`,
            `${Config.IMG}/good_19.png`,
            `${Config.IMG}/good_20.png`,
            `${Config.IMG}/good_21.png`,
            `${Config.IMG}/good_22.png`,
            `${Config.IMG}/good_23.png`,
        ],
    },
    {
        id: 3,
        name: t('partyFashion'),
        count: 20,
        images: [
            `${Config.IMG}/good_24.png`,
            `${Config.IMG}/good_25.png`,
            `${Config.IMG}/good_26.png`,
            `${Config.IMG}/good_27.png`,
            `${Config.IMG}/good_28.png`,
            `${Config.IMG}/good_29.png`,
        ],
    },
]);

// ============== 事件处理 ==============

/** 分段器 change：回传索引，映射为 TabValue */
const onTabChange = (index: number) => {
    activeTab.value = tabList.value[index].value;
};

/** 查看商品 */
const onViewItem = (_item: WishItem) => {
    uni.navigateTo({ url: '/pages-sub/product/details/Index' });
};

/** 切换商品收藏状态 */
const onToggleFav = (item: WishItem) => {
    toast.show(item.name);
};

/** 查看看板 */
const onViewBoard = (board: WishBoard) => {};
</script>

<template>
    <!-- 顶部导航 -->
    <navbar :title="t('title')" />

    <view class="wishlist-page">
        <!-- 分段器：激活黑底白字 / 未激活白底黑框 -->
        <view class="wishlist-page__tabs">
            <hy-subsection
                v-model="activeTab"
                :list="tabList"
                activeColor="var(--hy-text-color)"
                bg-color="var(--hy-text-color)"
                :font-size="16"
                :bold="true"
                @change="onTabChange"
            />
        </view>

        <!-- 全部商品：双列网格 -->
        <view v-if="activeTab === 'allItems'" class="wishlist-page__items">
            <WishItemCard
                v-for="item in wishItems"
                :key="item.id"
                :item="item"
                @tap="onViewItem"
                @toggle-fav="onToggleFav"
            />
        </view>

        <!-- 看板：单列全宽卡片 -->
        <view v-else class="wishlist-page__boards">
            <WishBoardCard
                v-for="board in boards"
                :key="board.id"
                :board="board"
                :count-text="t('itemsCount', { count: board.count })"
                @tap="onViewBoard"
            />
        </view>
    </view>
</template>

<style lang="scss" scoped>
.wishlist-page {
    min-height: 100vh;
    padding-bottom: calc(
        $hy-border-margin-padding-lg + env(safe-area-inset-bottom)
    );
    box-sizing: border-box;

    /* 分段器容器：Figma tab 位于 x=40 / y=112（40px → 80rpx） */
    &__tabs {
        color: $hy-background;
        margin-top: 24rpx;
        padding: 0 80rpx;

        /* 容器透明底 */
        //:deep(.hy-subsection__button) {
        //    background-color: transparent;
        //}

        /* 滑块：黑色（覆盖库内 !important 的容器色变量） */
        //:deep(.hy-subsection__button--bar) {
        //    background-color: #1d1f22 !important;
        //}
        //
        ///* 未激活项：1px 黑框（激活项边框被滑块遮盖） */
        //:deep(.hy-subsection__item) {
        //    border: 2rpx solid #1d1f22;
        //    box-sizing: border-box;
        //}
    }

    /* 全部商品网格：x=32 → 64rpx；首行 y=173（距 tab 底 25px → 50rpx） */
    &__items {
        display: flex;
        flex-wrap: wrap;
        gap: 52rpx 58rpx;
        padding: 50rpx 64rpx 0;
    }

    /* 看板列表：x=22 → 44rpx；卡片间距 28px → 56rpx */
    &__boards {
        display: flex;
        flex-direction: column;
        gap: 56rpx;
        padding: 50rpx 44rpx 0;
    }
}
</style>
