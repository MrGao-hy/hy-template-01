<script setup lang="ts">
import { ref } from 'vue';
import { IconConfig, useToast, useTranslate } from '@hy-app/ui';
import ProductHero from './components/ProductHero.vue';
import ProductReviews from './components/ProductReviews.vue';
import SimilarProducts from './components/SimilarProducts.vue';
import type {
    ColorOption,
    RatingBar,
    ReviewItem,
    SimpleProduct,
} from './components/types';

/**
 * 商品详情页（Figma: 8782-1828 / 8782-1981）
 */
definePage({
    style: {
        navigationStyle: 'custom',
        navigationBarTextStyle: 'black',
    },
});

const { t } = useTranslate('product');
const toast = useToast();

/** 商品主图（Figma: 550c3057） */
const HERO_IMAGE =
    '/static/images/fluxstore/image_550c305749d6c4a8efe5849bb6952d297db4e2c1.png';

/** 商品信息 */
const product = {
    name: 'Sportwear Set',
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
const description = `The Sportwear Set features a soft, breathable fabric blend that keeps you comfortable through workouts and casual days alike. The set includes a relaxed-fit top and matching joggers with an adjustable drawstring waist. Designed in a versatile green tone, it pairs easily with sneakers for an effortless everyday look.`;

/** 描述是否展开 */
const descriptionExpanded = ref(false);

/** 当前展开的面板索引（0=详情 1=评价 2=相似推荐，设计稿默认全开） */
const expandedPanels = ref<number[]>([0, 1, 2]);

/** 评分分布 */
const ratingBars: RatingBar[] = [
    { star: 5, percent: 78 },
    { star: 4, percent: 15 },
    { star: 3, percent: 5 },
    { star: 2, percent: 1 },
    { star: 1, percent: 1 },
];

/** 评价列表（Figma: Jennifer Rose / Kelly Rihana） */
const reviews: ReviewItem[] = [
    {
        id: 1,
        name: 'Jennifer Rose',
        avatar: '/static/images/fluxstore/image_f38890a225ddff0443fafd8c2e8b14967c27e285.png',
        time: '5m ago',
        rating: 5,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
    {
        id: 2,
        name: 'Kelly Rihana',
        avatar: '/static/images/fluxstore/image_09e90f5ea1ecc64acbaaa975deb94ffe18def16c.png',
        time: '9m ago',
        rating: 4,
        content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
];

/** 相似商品 */
const similarProductList: SimpleProduct[] = [
    {
        id: 1,
        name: 'Maxi Dress',
        price: 68.0,
        image: '/static/images/fluxstore/image_ab2f4ed424ae6384ab7d20a54f772bf15d7db671.png',
    },
    {
        id: 2,
        name: 'Linen Dress',
        price: 52.0,
        image: '/static/images/fluxstore/image_226c7c5428720a36a74b4a0234996217317a7aac.png',
    },
    {
        id: 3,
        name: 'Kimi Green Dress',
        price: 47.99,
        image: '/static/images/fluxstore/image_dbd313f3e91dae05087bab8930b7dba79f15e751.png',
    },
];

// ============== 事件 ==============

/** 返回上一页 */
const onBack = () => {
    uni.navigateBack();
};

/** 选择颜色 */
const onSelectColor = (key: string) => {
    selectedColor.value = key;
};

/** 选择尺码 */
const onSelectSize = (size: string) => {
    selectedSize.value = size;
};

/** 切换描述展开 */
const onToggleDescription = () => {
    descriptionExpanded.value = !descriptionExpanded.value;
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
        <product-hero :image="HERO_IMAGE" @back="onBack" />

        <!-- ============== 白色信息面板 ============== -->
        <view class="product-panel">
            <!-- 标题 + 价格 -->
            <view class="product-panel__head">
                <text class="product-panel__name">{{ product.name }}</text>
                <text class="product-panel__price">
                    $ {{ product.price.toFixed(2) }}
                </text>
            </view>
            <view class="product-panel__rating">
                <hy-rate
                    :model-value="product.rating"
                    readonly
                    :count="5"
                    :size="18"
                    :gutter="4"
                    active-color="#508A7B"
                    inactive-color="#eff0f1"
                />
                <text class="product-panel__reviews">
                    ({{ product.reviews }})
                </text>
            </view>

            <!-- 颜色 -->
            <view class="option-row">
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
            </view>

            <!-- 尺码 -->
            <view class="option-row">
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
            </view>

            <!-- 折叠区：详情 / 评价 / 相似推荐 -->
            <hy-folding-panel v-model="expandedPanels" :border="false">
                <hy-folding-panel-item
                    :index="0"
                    :title="t('description')"
                    default-open
                    :custom-style="{ padding: '0' }"
                >
                    <view class="description">
                        <text
                            class="description__text"
                            :class="{
                                'description__text--clamped':
                                    !descriptionExpanded,
                            }"
                        >
                            {{ description }}
                        </text>
                        <text
                            class="description__more"
                            @tap="onToggleDescription"
                        >
                            {{ t('readMore') }}
                        </text>
                    </view>
                </hy-folding-panel-item>

                <hy-folding-panel-item
                    :index="1"
                    default-open
                    :title="t('reviews')"
                >
                    <product-reviews
                        :score="product.score"
                        :total="product.reviews"
                        :bars="ratingBars"
                        :reviews="reviews"
                    />
                </hy-folding-panel-item>

                <hy-folding-panel-item
                    :index="2"
                    default-open
                    :title="t('similarProduct')"
                >
                    <similar-products
                        :products="similarProductList"
                        @tap="onSimilarTap"
                    />
                </hy-folding-panel-item>
            </hy-folding-panel>
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
    padding-bottom: calc(220rpx + env(safe-area-inset-bottom));
    background-color: #ffffff;
}

.product-panel {
    position: relative;
    z-index: 2;
    padding: 48rpx 40rpx 40rpx;
    background-color: #ffffff;
    border-radius: 40rpx 40rpx 0 0;
    box-shadow: 0 -8rpx 30rpx rgba(0, 0, 0, 0.04);

    &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__name {
        font-size: 36rpx;
        font-weight: 700;
        color: $flux-text-primary;
    }

    &__price {
        font-size: 52rpx;
        font-weight: 700;
        color: $flux-text-primary;
    }

    &__rating {
        display: flex;
        align-items: center;
        gap: 10rpx;
        margin-top: 16rpx;
    }

    &__reviews {
        font-size: 20rpx;
        color: rgba(51, 48, 46, 0.5);
    }
}

/* 颜色 / 尺码行 */
.option-row {
    margin-top: 40rpx;

    &__head {
        display: flex;
        align-items: center;
        gap: 20rpx;
    }

    &__label {
        font-size: $flux-font-lg;
        font-weight: 700;
        color: $flux-text-primary;

        &--alone {
            display: block;
            margin-bottom: 20rpx;
            font-weight: 400;
            color: #777e90;
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
        border: 3rpx solid $flux-text-primary;
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
    color: $flux-text-primary;
    background-color: #fafafa;
    border-radius: 50%;

    &.is-active {
        color: #ffffff;
        background-color: #515151;
    }
}

/* 描述 */
.description {
    &__text {
        font-size: 24rpx;
        line-height: 40rpx;
        color: rgba(51, 48, 46, 0.7);
    }

    &__text--clamped {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        text-overflow: ellipsis;
    }

    &__more {
        display: inline-block;
        margin-top: 12rpx;
        font-size: 24rpx;
        color: #508a7b;
        text-decoration: underline;
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
        color: #ffffff;
    }
}
</style>
