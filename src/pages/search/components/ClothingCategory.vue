<script setup lang="ts">
import { ref } from 'vue';
import { useTranslate } from '@hy-app/ui';
import { Config } from '@/config';
import CategoryGroup, { type SubCategoryItem } from './CategoryGroup.vue';

defineOptions({
    options: {
        styleIsolation: 'shared',
    },
});

const { t } = useTranslate('search');

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
    /** 图片宽度（rpx） */
    imageWidth: number;
    /** 展开后的子分类列表（由 CategoryGroup 递归渲染） */
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
        image: `${Config.IMG}/search_1.png`,
        imageWidth: 380,
        items: [
            {
                titleKey: 'classification1',
                count: 128,
                children: [
                    { titleKey: 'subClassification1', count: 45 },
                    { titleKey: 'subClassification2', count: 28 },
                    { titleKey: 'subClassification3', count: 22 },
                    { titleKey: 'subClassification4', count: 18 },
                    { titleKey: 'subClassification62', count: 15 },
                ],
            },
            {
                titleKey: 'classification2',
                count: 40,
                children: [
                    { titleKey: 'subClassification11', count: 18 },
                    { titleKey: 'subClassification12', count: 13 },
                    { titleKey: 'subClassification13', count: 9 },
                ],
            },
            {
                titleKey: 'classification3',
                count: 36,
                children: [
                    { titleKey: 'subClassification14', count: 16 },
                    { titleKey: 'subClassification15', count: 11 },
                    { titleKey: 'subClassification16', count: 6 },
                    { titleKey: 'subClassification63', count: 3 },
                ],
            },
            {
                titleKey: 'classification4',
                count: 24,
                children: [
                    { titleKey: 'subClassification17', count: 11 },
                    { titleKey: 'subClassification18', count: 8 },
                    { titleKey: 'subClassification19', count: 5 },
                ],
            },
            {
                titleKey: 'classification5',
                count: 14,
                children: [
                    { titleKey: 'subClassification20', count: 9 },
                    { titleKey: 'subClassification21', count: 5 },
                ],
            },
            {
                titleKey: 'classification6',
                count: 12,
                children: [
                    { titleKey: 'subClassification23', count: 7 },
                    { titleKey: 'subClassification24', count: 5 },
                ],
            },
            {
                titleKey: 'classification7',
                count: 9,
                children: [
                    { titleKey: 'subClassification26', count: 5 },
                    { titleKey: 'subClassification27', count: 4 },
                ],
            },
        ],
    },
    {
        key: 2,
        titleKey: 'categoryTitle2',
        background: 'rgba(156,148,146,0.5)',
        circleLight: 'rgba(156, 148, 146, 0.5)',
        circleBg: '#9C9492',
        image: `${Config.IMG}/search_2.png`,
        imageWidth: 350,
        items: [
            {
                titleKey: 'classification8',
                count: 64,
                children: [
                    { titleKey: 'subClassification8', count: 24 },
                    { titleKey: 'subClassification9', count: 16 },
                    { titleKey: 'subClassification10', count: 12 },
                    { titleKey: 'subClassification64', count: 7 },
                    { titleKey: 'subClassification65', count: 5 },
                ],
            },
            {
                titleKey: 'classification9',
                count: 28,
                children: [
                    { titleKey: 'subClassification29', count: 14 },
                    { titleKey: 'subClassification30', count: 9 },
                    { titleKey: 'subClassification31', count: 5 },
                ],
            },
            {
                titleKey: 'classification10',
                count: 18,
                children: [
                    { titleKey: 'subClassification32', count: 9 },
                    { titleKey: 'subClassification33', count: 6 },
                    { titleKey: 'subClassification34', count: 3 },
                ],
            },
            {
                titleKey: 'classification11',
                count: 12,
                children: [
                    { titleKey: 'subClassification35', count: 7 },
                    { titleKey: 'subClassification36', count: 5 },
                ],
            },
            {
                titleKey: 'classification12',
                count: 9,
                children: [
                    { titleKey: 'subClassification38', count: 5 },
                    { titleKey: 'subClassification39', count: 4 },
                ],
            },
        ],
    },
    {
        key: 3,
        titleKey: 'categoryTitle3',
        background: '#44565C',
        circleLight: 'rgba(91, 113, 120, 0.5)',
        circleBg: '#5B7178',
        image: `${Config.IMG}/search_3.png`,
        imageWidth: 370,
        items: [
            {
                titleKey: 'classification13',
                count: 86,
                children: [
                    { titleKey: 'subClassification5', count: 32 },
                    { titleKey: 'subClassification6', count: 22 },
                    { titleKey: 'subClassification7', count: 14 },
                    { titleKey: 'subClassification66', count: 11 },
                    { titleKey: 'subClassification67', count: 7 },
                ],
            },
            {
                titleKey: 'classification14',
                count: 32,
                children: [
                    { titleKey: 'subClassification41', count: 15 },
                    { titleKey: 'subClassification42', count: 11 },
                    { titleKey: 'subClassification43', count: 6 },
                ],
            },
            {
                titleKey: 'classification15',
                count: 26,
                children: [
                    { titleKey: 'subClassification44', count: 12 },
                    { titleKey: 'subClassification45', count: 9 },
                    { titleKey: 'subClassification46', count: 5 },
                ],
            },
            {
                titleKey: 'classification16',
                count: 15,
                children: [
                    { titleKey: 'subClassification47', count: 9 },
                    { titleKey: 'subClassification48', count: 6 },
                ],
            },
        ],
    },
    {
        key: 4,
        titleKey: 'categoryTitle4',
        background: '#B9AEB2',
        circleLight: 'rgba(214, 207, 210, 0.5)',
        circleBg: '#D1CACD',
        image: `${Config.IMG}/search_4.png`,
        imageWidth: 170,
        items: [
            {
                titleKey: 'classification17',
                count: 45,
                children: [
                    { titleKey: 'subClassification50', count: 18 },
                    { titleKey: 'subClassification51', count: 12 },
                    { titleKey: 'subClassification52', count: 9 },
                    { titleKey: 'subClassification68', count: 6 },
                ],
            },
            {
                titleKey: 'classification18',
                count: 20,
                children: [
                    { titleKey: 'subClassification53', count: 9 },
                    { titleKey: 'subClassification54', count: 7 },
                    { titleKey: 'subClassification55', count: 4 },
                ],
            },
            {
                titleKey: 'classification19',
                count: 16,
                children: [
                    { titleKey: 'subClassification56', count: 8 },
                    { titleKey: 'subClassification57', count: 5 },
                    { titleKey: 'subClassification58', count: 3 },
                ],
            },
            {
                titleKey: 'classification20',
                count: 12,
                children: [
                    { titleKey: 'subClassification59', count: 7 },
                    { titleKey: 'subClassification60', count: 5 },
                ],
            },
        ],
    },
]);

/** 当前展开的分类 key 列表（hy-folding-panel 为受控组件，必须 v-model 绑定） */
const activeKeys = ref<number[]>([]);

/** 分类选中（任意层级叶子节点） */
const onSelect = (item: SubCategoryItem) => {
    console.log('category selected:', t(item.titleKey));
};
</script>

<template>
    <view class="category">
        <hy-folding-panel v-model:model-value="activeKeys" :border="false">
            <hy-folding-panel-item
                v-for="item in list"
                :key="item.key"
                :index="item.key"
            >
                <!-- ============== 卡片头部 ============== -->
                <template #header>
                    <view
                        class="category-card"
                        :style="{ backgroundColor: item.background }"
                    >
                        <!-- 装饰圆 + 分类图片（同心居中） -->
                        <view class="category-card__decor">
                            <view
                                class="category-card__circle category-card__circle--light"
                                :style="{ backgroundColor: item.circleLight }"
                            ></view>
                            <view
                                class="category-card__circle"
                                :style="{ backgroundColor: item.circleBg }"
                            ></view>
                            <hy-image
                                :src="item.image"
                                :width="`${item.imageWidth}rpx`"
                                mode="widthFix"
                                lazy-load
                                custom-class="category-card__image"
                            />
                        </view>
                        <!-- 分类标题 -->
                        <text class="category-card__title">{{
                            t(item.titleKey)
                        }}</text>
                    </view>
                </template>

                <!-- ============== 子分类（CategoryGroup 递归渲染所有层级） ============== -->
                <template #default>
                    <CategoryGroup
                        v-if="item.items?.length"
                        :items="item.items"
                        @select="onSelect"
                    />
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

    /* 装饰圆 + 图片容器 */
    &__decor {
        position: absolute;
        top: 50%;
        right: 42rpx;
        width: 210rpx;
        height: 210rpx;
        transform: translateY(-50%);
    }

    &__circle {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 150rpx;
        height: 150rpx;
        border-radius: $hy-radius-circle;
        transform: translate(-50%, -50%);

        &--light {
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

    /* 图片以圆圈中心点为基准居中，偏移量由 custom-style 的 transform 覆盖 */
    :deep(.category-card__image) {
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1;
        transform: translate(-50%, -50%);
    }
}
</style>
