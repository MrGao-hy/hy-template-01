<script setup lang="ts">
import { ref } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';

const { t } = useTranslate('search');

/** 最近搜索词 */
const keywords = ref<string[]>(['Sunglasses', 'Sweater', 'Hoodie']);

interface IEmits {
    (e: 'search', keyword: string): void;
}

const emit = defineEmits<IEmits>();

/** 点击搜索词 */
const onKeywordTap = (keyword: string) => {
    emit('search', keyword);
};

/** 移除单个搜索词 */
const onKeywordRemove = (keyword: string) => {
    console.log(keywords.value, keyword);

    keywords.value = keywords.value.filter(item => item !== keyword);
};

/** 清空全部搜索词 */
const onClearAll = () => {
    keywords.value = [];
};
</script>

<template>
    <view v-if="keywords.length" class="recent-searches">
        <!-- ============== 标题栏 ============== -->
        <view class="recent-searches__header">
            <text class="recent-searches__title">{{
                t('recentSearches')
            }}</text>
            <hy-icon :name="IconConfig.DELETE" size="42rpx" @tap="onClearAll" />
        </view>

        <!-- ============== 搜索词标签 ============== -->
        <view class="recent-searches__list">
            <hy-tag
                v-for="keyword in keywords"
                :key="keyword"
                :label="keyword"
                :value="keyword"
                shape="circle"
                size="medium"
                color="var(--hy-background--track)"
                :border="false"
                closable
                :custom-style="{ marginRight: 0, marginTop: 0, color: 'var(--hy-text-color)' }"
                @click="onKeywordTap(keyword)"
                @close="onKeywordRemove(keyword)"
            />
        </view>
    </view>
</template>

<style lang="scss" scoped>
.recent-searches {
    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 56rpx 0 40rpx;
    }

    &__title {
        font-size: $hy-font-size-md;
        font-weight: 700;
    }

    &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 36rpx 28rpx;
    }
}
</style>
