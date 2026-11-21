<script lang="ts">
/** 分类项（递归结构，二级及更深层级复用） */
export interface SubCategoryItem {
    /** 国际化 key */
    titleKey: string;
    /** 商品数量 */
    count: number;
    /** 子分类列表 */
    children?: SubCategoryItem[];
}
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';
import CategoryGroup from './CategoryGroup.vue';

defineOptions({
    options: {
        styleIsolation: 'shared',
    },
});

withDefaults(
    defineProps<{
        /** 分类列表 */
        items: SubCategoryItem[];
        /** 当前层级（0 = 二级分类），用于行缩进 */
        depth?: number;
    }>(),
    { depth: 0 }
);

const emit = defineEmits<{
    /** 叶子分类点击 */
    (e: 'select', item: SubCategoryItem): void;
}>();

const { t } = useTranslate('search');

/** 本层展开的下标（每层实例独立持有） */
const activeKeys = ref<Array<number | string>>([]);

/** 行点击：有子集切换展开，叶子向上派发选中 */
const onRowTap = (sub: SubCategoryItem, index: number) => {
    if (sub.children?.length) {
        const active = activeKeys.value;
        activeKeys.value = active.includes(index)
            ? active.filter(v => v !== index)
            : active.concat(index);
        return;
    }
    emit('select', sub);
};
</script>

<template>
    <hy-folding-panel v-model:model-value="activeKeys" :border="false">
        <view v-for="(sub, i) in items" :key="i" class="category-list__wrap">
            <hy-folding-panel-item :index="i">
                <!-- 头部（所有层级共用同一行结构） -->
                <template #header>
                    <view
                        class="category-list__row"
                        :style="{ paddingLeft: `${36 + depth * 30}rpx` }"
                        @tap.stop="onRowTap(sub, i)"
                    >
                        <text class="category-list__name">{{
                            t(sub.titleKey)
                        }}</text>
                        <view class="category-list__count">
                            <text>{{ sub.count }} {{ t('items') }}</text>
                            <hy-icon
                                :name="IconConfig.RIGHT"
                                size="24rpx"
                            />
                        </view>
                    </view>
                </template>

                <!-- 子级递归渲染 -->
                <template #default>
                    <CategoryGroup
                        v-if="sub.children?.length"
                        :items="sub.children"
                        :depth="depth + 1"
                        @select="$emit('select', $event)"
                    />
                </template>
            </hy-folding-panel-item>
        </view>
    </hy-folding-panel>
</template>

<style lang="scss" scoped>
/* 折叠项头部由行样式接管，去除组件默认内边距与背景 */
:deep(.hy-folding-panel-item__header) {
    padding: 0;
    background: transparent;
}

.category-list {
    &__wrap {
        position: relative;
        background-color: $hy-background;

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

    &__row {
        display: flex;
        align-items: center;
        width: 100%;
        height: 110rpx;
        padding-right: 36rpx;
        box-sizing: border-box;
        justify-content: space-between;
    }

    &__name {
        font-size: $hy-font-size-base;
        color: $hy-text-color;
    }

    &__count {
        display: flex;
        align-items: center;
        font-size: $hy-font-size-sm;
        color: $hy-text-color--4;
    }
}
</style>
