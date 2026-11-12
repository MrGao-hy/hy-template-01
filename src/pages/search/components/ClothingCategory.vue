<script setup lang="ts">
import { ref } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';
import { Config } from '@/config';

const { t } = useTranslate('search');

/** 子分类项 */
interface SubCategoryItem {
    /** 国际化 key */
    titleKey: string;
    /** 商品数量 */
    count: number;
}

/** 分类卡片 */
interface CategoryCard {
    key: number;
    /** 国际化 key */
    titleKey: string;
    /** 卡片背景色 */
    background: string;
    /** 外层装饰圆颜色 */
    circleLight: string;
    /** 内层装饰圆颜色 */
    circleBg: string;
    /** 分类图片 */
    image: string;
    /** 展开后的子分类列表 */
    items?: SubCategoryItem[];
}

/** 分类卡片数据 */
const list = ref<CategoryCard[]>([
    {
        key: 1,
        titleKey: 'categoryTitle1',
        background: '#A3A798',
        circleLight: 'rgba(194, 199, 181, 0.5)',
        circleBg: '#C2C7B5',
        image: `${Config.IMG}/image_c793677696d160379456b9e0b7274fcb6b4facc6.png`,
        items: [
            { titleKey: 'classification1', count: 128 },
            { titleKey: 'classification2', count: 40 },
            { titleKey: 'classification3', count: 36 },
            { titleKey: 'classification4', count: 24 },
            { titleKey: 'classification5', count: 14 },
            { titleKey: 'classification6', count: 12 },
            { titleKey: 'classification7', count: 9 },
        ],
    },
    {
        key: 2,
        titleKey: 'categoryTitle2',
        background: '#9C9492',
        circleLight: 'rgba(156, 148, 146, 0.5)',
        circleBg: '#9C9492',
        image: `${Config.IMG}/image_96c516a4449f5653b7738bfaff52d2373eb9d940.png`,
    },
    {
        key: 3,
        titleKey: 'categoryTitle3',
        background: '#44565C',
        circleLight: 'rgba(91, 113, 120, 0.5)',
        circleBg: '#5B7178',
        image: `${Config.IMG}/image_3d3c56ecc5dd806b206d8595e4f1e074342375c1.png`,
    },
    {
        key: 4,
        titleKey: 'categoryTitle4',
        background: '#B9AEB2',
        circleLight: 'rgba(214, 207, 210, 0.5)',
        circleBg: '#D1CACD',
        image: `${Config.IMG}/image_94e3f60d0bcca95f03fb944f30384d4c322d886e.png`,
    },
]);

/** 当前展开的分类 key 列表（hy-folding-panel 为受控组件，必须 v-model 绑定） */
const activeKeys = ref<number[]>([]);

/** 子分类点击 */
const onSubCategoryTap = (item: SubCategoryItem) => {
    console.log('sub category tapped:', t(item.titleKey));
};
</script>

<template>
    <view class="category">
        <hy-folding-panel v-model:model-value="activeKeys" :border="false">
            <hy-folding-panel-item
                v-for="(item, index) in list"
                :key="item.key"
                :index="item.key"
            >
                <!-- ============== 卡片头部 ============== -->
                <template #header>
                    <view
                        class="category-card"
                        :style="{ backgroundColor: item.background }"
                    >
                        <!-- 装饰圆 -->
                        <view
                            class="category-card__circle category-card__circle--light"
                            :style="{ backgroundColor: item.circleLight }"
                        ></view>
                        <view
                            class="category-card__circle"
                            :style="{ backgroundColor: item.circleBg }"
                        ></view>
                        <!-- 分类标题 -->
                        <text class="category-card__title">{{
                            t(item.titleKey)
                        }}</text>
                        <!-- 分类图片 -->
                        <hy-image
                            :src="item.image"
                            width="246rpx"
                            height="252rpx"
                            mode="aspectFill"
                            radius="30rpx"
                            lazy-load
                            class="category-card__image"
                        />
                    </view>
                </template>

                <!-- ============== 展开的子分类列表 ============== -->
                <template #default>
                    <view v-if="item.items?.length" class="sub-category">
                        <view
                            v-for="(sub, i) in item.items"
                            :key="i"
                            class="sub-category__item"
                            @tap="onSubCategoryTap(sub)"
                        >
                            <text class="sub-category__name">{{
                                t(sub.titleKey)
                            }}</text>
                            <view class="sub-category__count">
                                <text>{{ sub.count }} {{ t('items') }}</text>
                                <hy-icon
                                    :name="IconConfig.RIGHT"
                                    size="24rpx"
                                    class="sub-category__arrow"
                                />
                            </view>
                        </view>
                    </view>
                </template>
            </hy-folding-panel-item>
        </hy-folding-panel>
    </view>
</template>

<style lang="scss" scoped>
/* 覆盖折叠面板项默认内边距，使卡片撑满 */
:deep(.hy-folding-panel-item) {
    padding: 0 !important;
    --hy-background--container: transparent;
}

/* ============== 分类卡片 ============== */
.category-card {
    position: relative;
    height: 252rpx;
    width: 100%;
    border-radius: 30rpx;
    overflow: hidden;
    display: flex;
    align-items: center;
    padding-left: 44rpx;

    &__circle {
        position: absolute;
        top: 50rpx;
        right: 72rpx;
        width: 150rpx;
        height: 150rpx;
        border-radius: $hy-radius-circle;

        &--light {
            top: 20rpx;
            right: 42rpx;
            width: 210rpx;
            height: 210rpx;
        }
    }

    &__title {
        position: relative;
        z-index: 1;
        color: var(--hy-text-color--inverse, #ffffff);
        font-size: $hy-font-size-md;
        font-weight: 700;
        letter-spacing: 2rpx;
    }

    &__image {
        position: absolute;
        right: 0;
        top: 0;
    }
}

/* ============== 子分类列表 ============== */
.sub-category {
    background-color: $hy-background;

    &__item {
        display: flex;
        align-items: center;
        width: 100%;
        height: 110rpx;
        position: relative;
        justify-content: space-between;

        &::after {
            content: '';
            position: absolute;
            left: 36rpx;
            right: 36rpx;
            bottom: 0;
            height: 2rpx;
            background-color: $hy-background--container;
        }

        &:last-child::after {
            display: none;
        }
    }

    &__name {
        font-size: $hy-font-size-base;
        color: $hy-text-color;
    }

    &__count {
        font-size: $hy-font-size-sm;
        color: $hy-text-color--4;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__arrow {
        margin-left: 10rpx;
    }
}
</style>
