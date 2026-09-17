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
            <hy-icon
                :name="IconConfig.DELETE"
                size="42rpx"
                color="#1D1F22"
                @tap="onClearAll"
            />
        </view>

        <!-- ============== 搜索词标签 ============== -->
        <view class="recent-searches__list">
            <view
                v-for="keyword in keywords"
                :key="keyword"
                class="recent-searches__chip"
                @tap="onKeywordTap(keyword)"
            >
                <text class="recent-searches__chip-text">{{ keyword }}</text>
                <hy-icon
                    :name="IconConfig.CLOSE_CIRCLE"
                    size="38rpx"
                    color="#33302E"
                    stop
                    custom-class="recent-searches__chip-close"
                    @click="onKeywordRemove(keyword)"
                />
            </view>
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
        font-size: $flux-font-lg;
        font-weight: 700;
        color: rgba(51, 48, 46, 0.49);
    }

    &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 36rpx 28rpx;
    }

    &__chip {
        display: flex;
        align-items: center;
        gap: 16rpx;
        height: 76rpx;
        padding: 0 24rpx 0 44rpx;
        background-color: #fafafa;
        border-radius: $flux-radius-md;

        &:active {
            opacity: 0.7;
        }
    }

    &__chip-text {
        font-size: $flux-font-lg;
        font-weight: 600;
        color: rgba(51, 48, 46, 0.7);
    }

    &__chip-close {
        opacity: 0.6;
    }
}
</style>
