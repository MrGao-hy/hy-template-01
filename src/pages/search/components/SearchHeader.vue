<script setup lang="ts">
import { ref } from 'vue';
import { useTranslate, IconConfig } from '@hy-app/ui';
import Icon from '@/components/Icon.vue';

const props = withDefaults(
    defineProps<{
        /** 是否禁用输入（禁用时点击搜索框对外抛出 search-tap） */
        disabled?: boolean;
    }>(),
    { disabled: true }
);

const { t } = useTranslate('search');
// ============== 搜索 ==============
/** 搜索关键字 */
const keyword = ref('');

/** 提交搜索，跳转搜索列表页 */
const onSearch = (_e: unknown, value: string) => {
    const kw = (value ?? keyword.value).trim();
    if (!kw) return;
    uni.navigateTo({
        url: `/pages-sub/searchList/Index?keyword=${encodeURIComponent(kw)}`,
    });
};

/** 点击搜索框（禁用态） */
const onSearchBoxTap = () => {
    if (props.disabled) emit('search-tap');
};

// ============== 筛选 ==============
const emit = defineEmits<{
    (e: 'filter-tap'): void;
    (e: 'search-tap'): void;
}>();

const onFilterTap = () => {
    emit('filter-tap');
};
</script>

<template>
    <view class="search-bar">
        <view class="search-bar__field" @tap="onSearchBoxTap">
            <hy-search
                v-model="keyword"
                shape="circle"
                :height="40"
                :show-action="false"
                :disabled="disabled"
                :search-icon="{ name: IconConfig.SEARCH, color: '#A3A5AD' }"
                :placeholder="t('searchPlaceholder')"
                placeholder-color="#A3A5AD"
                color="#1A1A1A"
                @search="onSearch"
            />
        </view>
        <view class="right-icon" @tap="onFilterTap">
            <Icon name="filtrate"></Icon>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.search-bar {
    padding: 32rpx 0 48rpx;
    display: flex;
    gap: 20rpx;

    &__field {
        flex: 1;
    }

    :deep(.hy-search__content) {
        box-shadow: $hy-border-shadow-base;
    }

    .right-icon {
        width: 84rpx;
        height: 84rpx;
        background-color: $hy-background--track;
        border-radius: $hy-radius-lg;
        box-shadow: $hy-border-shadow-base;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
