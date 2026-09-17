<script setup lang="ts">
import { ref } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';
import type { SelectValueVo } from '@hy-app/ui';

const show = defineModel('show', { default: false });

const emit = defineEmits<{
    (e: 'apply'): void;
}>();

const { t } = useTranslate('search');

/** 价格范围 [最小, 最大] */
const MIN_PRICE = 100;
const MAX_PRICE = 1000;
const PRICE_STEP = 10;
const rangeValue = ref<number[]>([300, 500]);

/** 颜色选项 */
const colorOptions = [
    { key: 'orange', color: '#E9933B' },
    { key: 'red', color: '#E85A4F' },
    { key: 'black', color: '#1F1F1F' },
    { key: 'blue', color: '#5B7178' },
    { key: 'grey', color: '#BFBFBF' },
    { key: 'brown', color: '#6F4A36' },
    { key: 'pink', color: '#E7B7B0' },
];
const selectedColor = ref<string | null>(null);

/** 星级 */
const maxStars = 5;
const selectedStars = ref<number>(0);

/** 分类选项 */
const categoryOptions = [
    ['Crop Tops', 'Dresses', 'Jackets', 'Sweaters', 'Shoes', 'Bags'],
];
const categoryIndex = ref<string>('');

/** 折扣标签 */
const discountOptions = ['50% off', '40% off', '30% off', '25% off'];
const selectedDiscounts = ref<string[]>([]);

// ============== 事件 ==============

/** 价格区间变化 */
const onPriceChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
        rangeValue.value = value;
    }
};

const onColorTap = (key: string) => {
    selectedColor.value = selectedColor.value === key ? null : key;
};

const onStarTap = (i: number) => {
    selectedStars.value = i;
};

const onCategoryChange = (params: SelectValueVo) => {
    const v = Number(params.value);
    // if (!Number.isNaN(v)) categoryIndex.value = v;
};

const onDiscountToggle = (discount: string) => {
    const i = selectedDiscounts.value.indexOf(discount);
    if (i === -1) selectedDiscounts.value.push(discount);
    else selectedDiscounts.value.splice(i, 1);
};

const onReset = () => {
    rangeValue.value = [MIN_PRICE, MAX_PRICE];
    selectedColor.value = null;
    selectedStars.value = 0;
    categoryIndex.value = '';
    selectedDiscounts.value = [];
};

const onApply = () => {
    emit('apply');
    onClose();
};

const onClose = () => {
    show.value = false;
};
</script>

<template>
    <hy-popup
        v-model:show="show"
        v-if="show"
        mode="right"
        safe-area-inset-top
        close-on-click-overlay
        :custom-style="{
            width: '80vw',
        }"
        :z-index="13000"
        :round="20"
        @close="show = false"
    >
        <scroll-view
            scroll-y
            :show-scrollbar="false"
            class="filter-popup__scroll"
        >
            <!-- ============== 头部：标题 + 设置 ============== -->
            <view class="filter-popup__header">
                <text class="filter-popup__title">{{ t('filter.title') }}</text>
                <hy-icon
                    :name="IconConfig.SETTING"
                    size="44rpx"
                    color="#1A1A1A"
                />
            </view>

            <!-- ============== 价格 ============== -->
            <view class="filter-section">
                <text class="filter-section__title">{{
                    t('filter.price')
                }}</text>
                <view class="price-range">
                    <hy-slider
                        is-range
                        v-model:range-value="rangeValue"
                        :min="MIN_PRICE"
                        :max="MAX_PRICE"
                        :step="PRICE_STEP"
                        :block-size="20"
                        active-color="#1A1A1A"
                        inactive-color="#E6E6E6"
                        block-color="#1A1A1A"
                        show-value
                        custom-class="price-slider"
                    />
                </view>
            </view>

            <!-- ============== 颜色 ============== -->
            <view class="filter-section">
                <text class="filter-section__title">{{
                    t('filter.color')
                }}</text>
                <view class="color-list">
                    <view
                        v-for="item in colorOptions"
                        :key="item.key"
                        class="color-dot"
                        :class="{ 'is-active': selectedColor === item.key }"
                        :style="{ backgroundColor: item.color }"
                        @tap="onColorTap(item.key)"
                    ></view>
                </view>
            </view>

            <!-- ============== 星级 ============== -->
            <view class="filter-section">
                <text class="filter-section__title">{{
                    t('filter.starRating')
                }}</text>
                <view class="star-list">
                    <view
                        v-for="i in maxStars"
                        :key="i"
                        class="star-item"
                        :class="{ 'is-active': selectedStars >= i }"
                        @tap="onStarTap(i)"
                    >
                        <text class="star-item__num">{{ i }}</text>
                        <hy-icon
                            :name="IconConfig.STAR_FILL"
                            size="26rpx"
                            color="currentColor"
                        />
                    </view>
                </view>
            </view>

            <!-- ============== 分类 ============== -->
            <view class="filter-section">
                <text class="filter-section__title">{{
                    t('filter.category')
                }}</text>
                <hy-picker
                    :columns="categoryOptions"
                    v-model="categoryIndex"
                    has-input
                    @change="onCategoryChange"
                >
                    <template #default>
                        <view class="category-picker">
                            <view class="category-picker__inner">
                                <text class="category-picker__icon">👚</text>
                                <text class="category-picker__text">
                                    {{ categoryIndex[0] }}
                                </text>
                            </view>
                            <hy-icon
                                :name="IconConfig.DOWN"
                                size="24rpx"
                                color="#1A1A1A"
                            />
                        </view>
                    </template>
                </hy-picker>
            </view>

            <!-- ============== 折扣 ============== -->
            <view class="filter-section">
                <text class="filter-section__title">{{
                    t('filter.discount')
                }}</text>
                <view class="discount-list">
                    <view
                        v-for="d in discountOptions"
                        :key="d"
                        class="discount-tag"
                        :class="{ 'is-active': selectedDiscounts.includes(d) }"
                        @tap="onDiscountToggle(d)"
                    >
                        <text>{{ d }}</text>
                        <hy-icon
                            v-if="selectedDiscounts.includes(d)"
                            :name="IconConfig.CLOSE"
                            size="18rpx"
                            color="currentColor"
                        />
                    </view>
                </view>
            </view>

            <view class="filter-popup__safe-bottom" />
        </scroll-view>

        <!-- ============== 底部按钮 ============== -->
        <view class="filter-popup__footer">
            <view class="footer-btn footer-btn--ghost" @tap="onReset">
                {{ t('filter.reset') }}
            </view>
            <view class="footer-btn footer-btn--primary" @tap="onApply">
                {{ t('filter.apply') }}
            </view>
        </view>
    </hy-popup>
</template>

<style lang="scss" scoped>
.filter-popup {
    height: 100%;
    display: flex;
    flex-direction: column;

    &__scroll {
        flex: 1;
        padding: 32rpx 40rpx 0;
        box-sizing: border-box;
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40rpx;
    }

    &__title {
        font-size: 40rpx;
        font-weight: 700;
        color: #1a1a1a;
    }

    &__safe-bottom {
        height: 40rpx;
    }

    &__footer {
        display: flex;
        gap: 24rpx;
        padding: 24rpx 40rpx;
        padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
        background: #fff;
        border-top: 2rpx solid #f1f2f4;
    }
}

.filter-section {
    margin-bottom: 44rpx;

    &__title {
        display: block;
        font-size: 32rpx;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 24rpx;
    }
}

:deep(.price-slider) {
    //flex: 1;
    width: 100%;
    z-index: 999;
}

/* 颜色 */
.color-list {
    display: flex;
    gap: 24rpx;
    flex-wrap: wrap;
}

.color-dot {
    width: 64rpx;
    height: 64rpx;
    border-radius: 50%;
    position: relative;
    transition: transform 0.2s;

    &.is-active::after {
        content: '';
        position: absolute;
        inset: -8rpx;
        border-radius: 50%;
        border: 3rpx solid #1a1a1a;
    }
}

/* 星级 */
.star-list {
    display: flex;
    gap: 20rpx;
}

.star-item {
    width: 88rpx;
    height: 72rpx;
    border-radius: 16rpx;
    border: 2rpx solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4rpx;
    color: #bfbfbf;
    transition: all 0.2s;

    &.is-active {
        background: #1a1a1a;
        border-color: #1a1a1a;
        color: #fff;
    }

    &__num {
        font-size: 28rpx;
        font-weight: 700;
    }
}

/* 分类 */
.category-picker {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 2rpx solid #e6e6e6;
    border-radius: 16rpx;
    padding: 0 24rpx;
    height: 80rpx;

    &__inner {
        display: flex;
        align-items: center;
        gap: 16rpx;
    }

    &__icon {
        font-size: 32rpx;
    }

    &__text {
        font-size: 28rpx;
        color: #1a1a1a;
    }
}

/* 折扣 */
.discount-list {
    display: flex;
    gap: 20rpx;
    flex-wrap: wrap;
}

.discount-tag {
    display: inline-flex;
    align-items: center;
    gap: 8rpx;
    padding: 12rpx 24rpx;
    border-radius: 100rpx;
    border: 2rpx solid #e6e6e6;
    font-size: 26rpx;
    color: #1a1a1a;
    background: #fff;
    transition: all 0.2s;

    &.is-active {
        border-color: #1a1a1a;
        background: #1a1a1a;
        color: #fff;
    }
}

/* 底部按钮 */
.footer-btn {
    flex: 1;
    height: 88rpx;
    border-radius: 100rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30rpx;
    font-weight: 600;
    transition: opacity 0.2s;

    &:active {
        opacity: 0.7;
    }

    &--ghost {
        background: #f2f2f4;
        color: #1a1a1a;
    }

    &--primary {
        background: #1a1a1a;
        color: #fff;
    }
}
</style>
