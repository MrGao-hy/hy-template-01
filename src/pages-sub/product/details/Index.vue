<script setup lang="ts">
import { computed, ref } from 'vue';
import { IconConfig, useToast, useTranslate } from '@hy-app/ui';
import { Config } from '@/config';
import ProductHero from './components/ProductHero.vue';
import ProductSections from './components/ProductSections.vue';
import type {
    ColorOption,
    RatingBar,
    ReviewItem,
    SimpleProduct,
} from './components/types';

/**
 * 商品详情页
 */
definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('product');
const toast = useToast();

/** 商品主图轮播（Figma: 550c3057） */
const HERO_IMAGES = [
    `${Config.IMG}/good_0.png`,
    `${Config.IMG}/good_1.png`,
    `${Config.IMG}/good_2.png`,
];

/** 商品信息（名称走多语言） */
const product = {
    price: 80.0,
    rating: 5,
    reviews: 83,
    score: 4.9,
};

/** 颜色选项（4 available） */
const colorOptions: ColorOption[] = [
    { key: 'green', value: '#508A7B' },
    { key: 'dark', value: '#343434' },
    { key: 'tan', value: '#EACAB7' },
    { key: 'orange', value: '#E9933B' },
];
const selectedColor = ref('green');

/** 尺码选项 */
const sizeOptions = ['S', 'M', 'L'];
const selectedSize = ref('L');

/** 详情描述（商品数据） */
const description = computed(() => t('descriptionText'));

/** 评分分布 */
const ratingBars: RatingBar[] = [
    { star: 5, percent: 78 },
    { star: 4, percent: 15 },
    { star: 3, percent: 5 },
    { star: 2, percent: 1 },
    { star: 1, percent: 1 },
];

/** 评价列表（Figma: Jennifer Rose / Kelly Rihana，文案走多语言） */
const reviews = computed<ReviewItem[]>(() => [
    {
        id: 1,
        name: t('review1Name'),
        avatar: `${Config.IMG}/avatar_1.png`,
        time: t('reviewTimeAgo', { minutes: 5 }),
        rating: 5,
        content: t('review1Content'),
    },
    {
        id: 2,
        name: t('review2Name'),
        avatar: `${Config.IMG}/avatar_2.png`,
        time: t('reviewTimeAgo', { minutes: 9 }),
        rating: 4,
        content: t('review2Content'),
    },
]);

/** 相似商品（名称走多语言，修复原损坏行） */
const similarProductList = computed<SimpleProduct[]>(() => [
    {
        id: 1,
        name: t('similar1Name'),
        price: 68.0,
        image: `${Config.IMG}/good_9.png`,
    },
    {
        id: 2,
        name: t('similar2Name'),
        price: 52.0,
        image: `${Config.IMG}/good_10.png`,
    },
    {
        id: 3,
        name: t('similar3Name'),
        price: 47.99,
        image: `${Config.IMG}/good_11.png`,
    },
]);

// ============== 事件 ==============

/** 选择颜色 */
const onSelectColor = (key: string) => {
    selectedColor.value = key;
};

/** 选择尺码 */
const onSelectSize = (size: string) => {
    selectedSize.value = size;
};

/** 加入购物车 */
const onAddToCart = () => {
    uni.navigateTo({ url: '/pages-sub/cart/Index' });
};

/** 点击相似商品 → 刷新为对应详情（当前设计稿为单详情，仅提示） */
const onSimilarTap = (_item: SimpleProduct) => {
    uni.navigateTo({ url: '/pages-sub/product/details/Index' });
};
</script>

<template>
    <view class="product-detail">
        <!-- ============== 顶部主图 ============== -->
        <product-hero :images="HERO_IMAGES" />

        <!-- ============== 白色信息面板 ============== -->
        <view class="product-panel">
            <view class="product-panel__head">
                <!-- 标题 + 价格 -->
                <hy-flex align="center" justify="space-between">
                    <text class="product-panel__head--name">{{ t('name') }}</text>
                    <text class="product-panel__head--price">
                        $ {{ product.price.toFixed(2) }}
                    </text>
                </hy-flex>
                <hy-flex gap="5" :custom-style="{ marginTop: '10px' }">
                    <hy-rate
                        :model-value="product.rating"
                        readonly
                        :count="5"
                        :size="18"
                        :gutter="4"
                        active-color="#508A7B"
                        inactive-color="#eff0f1"
                    />
                    <text class="product-panel__head--reviews">
                        ({{ product.reviews }})
                    </text>
                </hy-flex>
            </view>

            <hy-flex
                align="center"
                justify="space-between"
                custom-class="option-row"
            >
                <!-- 颜色 -->
                <hy-flex vertical>
                    <view class="option-row__head">
                        <text class="option-row__label">{{ t('color') }}</text>
                        <text class="option-row__hint">
                            {{ t('available', { count: colorOptions.length }) }}
                        </text>
                    </view>
                    <view class="option-row__colors">
                        <view
                            v-for="color in colorOptions"
                            :key="color.key"
                            class="color-dot"
                            :class="{
                                'is-active': selectedColor === color.key,
                            }"
                            :style="{ backgroundColor: color.value }"
                            @tap="onSelectColor(color.key)"
                        ></view>
                    </view>
                </hy-flex>

                <!-- 尺码 -->
                <hy-flex vertical>
                    <text class="option-row__label option-row__label--alone">
                        {{ t('size') }}
                    </text>
                    <view class="option-row__sizes">
                        <view
                            v-for="size in sizeOptions"
                            :key="size"
                            class="size-dot"
                            :class="{ 'is-active': selectedSize === size }"
                            @tap="onSelectSize(size)"
                        >
                            {{ size }}
                        </view>
                    </view>
                </hy-flex>
            </hy-flex>

            <!-- 折叠区：详情 / 评价 / 相似推荐 -->
            <product-sections
                :description="description"
                :score="product.score"
                :total="product.reviews"
                :bars="ratingBars"
                :reviews="reviews"
                :products="similarProductList"
                @similar-tap="onSimilarTap"
            />
        </view>

        <!-- ============== 底部加购栏 ============== -->
        <view class="add-cart-bar" @tap="onAddToCart">
            <hy-icon
                :name="IconConfig.SHOPPING_BAG"
                size="44rpx"
                color="#ffffff"
            />
            <text class="add-cart-bar__text">{{ t('addToCart') }}</text>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.product-detail {
    min-height: 100vh;
    --hy-folding-panel-header-background: transparent;
}

.product-panel {
    position: relative;
    z-index: 2;
    padding: 48rpx 40rpx calc(220rpx + env(safe-area-inset-bottom));
    background-color: $hy-background--2;
    border-radius: 40rpx 40rpx 0 0;
    transform: translateY(-40rpx);

    &__head {
        border-bottom: $hy-border-line;
        padding-bottom: 50rpx;

        &--name {
            font-size: $hy-font-size-lg;
            font-weight: 700;
        }

        &--price {
            font-size: $hy-font-size-xxl;
            font-weight: 700;
        }

        &--reviews {
            font-size: $hy-font-size-sm;
            color: $hy-text-color--grey;
        }
    }
}

/* 颜色 / 尺码行 */
.option-row {
    padding: 40rpx 0;
    border-bottom: $hy-border-line;

    &__head {
        display: flex;
        align-items: center;
        gap: 20rpx;
    }

    &__label {
        font-size: $hy-font-size-md;
        font-weight: 700;
        color: $hy-text-color;

        &--alone {
            display: block;
            margin-bottom: 20rpx;
            font-weight: 400;
            color: $hy-text-color--3;
        }
    }

    &__hint {
        font-size: 28rpx;
        font-weight: 600;
        color: #a6abc4;
    }

    &__colors {
        display: flex;
        align-items: center;
        gap: 28rpx;
        margin-top: 24rpx;
    }

    &__sizes {
        display: flex;
        align-items: center;
        gap: 24rpx;
    }
}

.color-dot {
    position: relative;
    width: 56rpx;
    height: 56rpx;
    border-radius: 50%;

    &.is-active::after {
        content: '';
        position: absolute;
        inset: -8rpx;
        border-radius: 50%;
        border: 3rpx solid $hy-text-color;
    }
}

.size-dot {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 66rpx;
    height: 66rpx;
    font-size: 24rpx;
    font-weight: 500;
    color: $hy-text-color;
    background-color: $hy-background--track;
    border-radius: 50%;

    &.is-active {
        color: $hy-icon-color;
        background-color: $hy-background--hover;
    }
}

/* 底部加购栏 */
.add-cart-bar {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16rpx;
    height: 164rpx;
    padding-bottom: env(safe-area-inset-bottom);
    background-color: #343434;
    border-radius: 48rpx 48rpx 0 0;

    &:active {
        opacity: 0.9;
    }

    &__text {
        font-size: 36rpx;
        font-weight: 700;
        color: var(--hy-text-color--inverse, #ffffff);
    }
}
</style>
