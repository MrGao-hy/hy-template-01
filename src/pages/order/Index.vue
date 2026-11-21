<script setup lang="ts">
import { computed, ref } from 'vue';
import { useToast, useTranslate, useMessage } from '@hy-app/ui';
import Tabbar from '@/components/Tabbar.vue';
import AppNavbar from '@/components/AppNavbar.vue';
import OrderList from './components/OrderList.vue';
import { mockOrders } from './components/data';
import type { OrderItem, OrderStatus } from './components/types';

/**
 * 我的订单列表（Figma 节点 2251/2377/2403/2942/3008 因限流未获取，
 * 按 FluxStore 常规订单流程实现，待设计稿校准）
 */
definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('order');
const toast = useToast();
const message = useMessage();

/** 状态 Tab 键 */
type TabKey = 'all' | OrderStatus;

/** Tab 配置 */
const tabs = computed<{ key: TabKey; label: string }[]>(() => [
    { key: 'all', label: t('tabAll') },
    { key: 'processing', label: t('tabProcessing') },
    { key: 'completed', label: t('tabCompleted') },
    { key: 'cancelled', label: t('tabCancelled') },
]);

const activeTab = ref<TabKey>('all');

/** 当前 Tab 订单列表 */
const filteredOrders = computed<OrderItem[]>(() => {
    if (activeTab.value === 'all') return mockOrders;
    return mockOrders.filter(o => o.status === activeTab.value);
});

// ============== 事件 ==============

/** 自定义 tabbar 内部已自行处理跳转 */
const onToPages = () => {};

/** 切换 Tab */
const onTabChange = (key: TabKey) => {
    activeTab.value = key;
};

/** 查看订单详情 */
const onViewDetails = (order: OrderItem) => {
    uni.navigateTo({
        url: `/pages-sub/order/details?no=${order.no}`,
    });
};

/** 再次购买 → 购物车 */
const onReorder = (_order: OrderItem) => {
    uni.navigateTo({ url: '/pages-sub/cart/Index' });
};

/** 取消订单 → 二次确认提示 */
const onCancel = (order: OrderItem) => {
    message.confirm({
        title: t('cancelTitle'),
        content: t('cancelConfirmTip', { no: order.no }),
        confirm: () => {
            toast.success(t('cancelSuccess'));
        },
    });
};
</script>

<template>
    <view class="order-page">
        <!-- ============== 顶部导航栏 ============== -->
        <app-navbar :title="t('title')" :active-id="3" />

        <!-- ============== 状态 Tab ============== -->
        <view class="order-tabs">
            <view
                v-for="tab in tabs"
                :key="tab.key"
                class="order-tabs__item"
                :class="{ 'is-active': activeTab === tab.key }"
                @tap="onTabChange(tab.key)"
            >
                {{ tab.label }}
            </view>
        </view>

        <!-- ============== 订单列表 ============== -->
        <order-list
            v-if="filteredOrders.length"
            :orders="filteredOrders"
            @view-details="onViewDetails"
            @reorder="onReorder"
            @cancel="onCancel"
        />

        <!-- ============== 空状态 ============== -->
        <hy-empty v-else mode="order"></hy-empty>

        <!-- ============== 自定义 Tabbar ============== -->
        <tabbar :current="2" @change="onToPages" />
    </view>
</template>

<style lang="scss" scoped>
.order-page {
    padding: 0 40rpx calc(52px + env(safe-area-inset-bottom));
    box-sizing: border-box;
    background-color: $hy-background;
}

/* 状态 Tab */
.order-tabs {
    display: flex;
    gap: 16rpx;
    margin-top: 40rpx;

    &__item {
        padding: 14rpx 36rpx;
        font-size: 26rpx;
        border-radius: $hy-radius-semicircle;
        transition: all 0.2s;

        &.is-active {
            background-color: $hy-background--active;
        }
    }
}
</style>
