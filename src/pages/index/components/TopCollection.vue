<script setup lang="ts">
import { useTranslate } from '@hy-app/ui';
import type { CollectionBanner } from './types';

const { t } = useTranslate('home');

interface IProps {
    list: CollectionBanner[];
}

interface IEmits {
    (e: 'tap', item: CollectionBanner): void;
    (e: 'show-all'): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const onCollectionTap = (item: CollectionBanner) => {
    emit('tap', item);
};

const onShowAllTap = () => {
    emit('show-all');
};
</script>

<template>
    <view class="home__section">
        <view class="home__section-header">
            <text class="home__section-title">{{
                t('topCollection.title')
            }}</text>
            <view
                class="home__section-more"
                @tap="onShowAllTap"
            >
                <text class="home__section-more-text">{{
                    t('topCollection.showAll')
                }}</text>
            </view>
        </view>
        <view class="top-collection-list">
            <view
                v-for="item in props.list"
                :key="item.id"
                class="collection-banner collection-banner--no"
                :class="[
                    item.id === 1
                        ? 'collection-banner--slim'
                        : 'collection-banner--summer',
                ]"
                @tap="onCollectionTap(item)"
            >
                <view class="collection-banner__content">
                    <view class="collection-banner__tag-wrap">
                        <view
                            class="collection-banner__tag-line"
                        />
                        <text class="collection-banner__tag">{{
                            t(item.tagKey)
                        }}</text>
                    </view>
                    <text
                        class="collection-banner__title"
                        :class="{
                            'collection-banner__title--dark':
                                item.id === 2,
                        }"
                    >
                        {{ t(item.titleKey) }}
                    </text>
                </view>
                <view class="collection-banner__image-wrap">
                    <hy-image
                        :src="item.image"
                        :width="
                            item.id === 1 ? '240rpx' : '280rpx'
                        "
                        :height="
                            item.id === 1 ? '300rpx' : '400rpx'
                        "
                        radius="0"
                        mode="aspectFit"
                        lazy-load
                    />
                </view>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.home__section {
    margin-bottom: $flux-spacing-xl;

    &-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: $flux-spacing-md;
    }

    &-title {
        font-size: 36rpx;
        font-weight: 700;
        color: $flux-text-primary;
    }

    &-more {
        padding: $flux-spacing-xs $flux-spacing-sm;
        &-text {
            font-size: $flux-font-sm;
            color: $flux-text-secondary;
        }
    }
}

.collection-banner {
    padding: 0 $hy-border-margin-padding-lg;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    position: relative;
    background-color: $hy-background--track;

    &--slim {
        min-height: 200rpx;
        margin-bottom: $flux-spacing-md;
    }

    &--summer {
        min-height: 340rpx;
    }

    &--no {
        border-radius: $hy-radius-base;
        margin: $hy-border-margin-padding-base 0;
    }

    &__content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: $flux-spacing-md;
        z-index: 1;
    }

    &__tag-wrap {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: $flux-spacing-sm;
    }

    &__tag-line {
        width: 4rpx;
        height: 28rpx;
        background-color: $flux-primary;
        border-radius: 2rpx;
    }

    &__tag {
        font-size: $flux-font-xs;
        font-weight: 500;
        color: $flux-text-secondary;
        letter-spacing: 1rpx;
        white-space: nowrap;
    }

    &__title {
        font-size: 40rpx;
        color: $flux-text-secondary;
        line-height: 1.2;
        white-space: pre-line;

        &--dark {
            color: $flux-text-primary;
        }
    }

    &__image-wrap {
        flex-shrink: 0;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        position: relative;

        &::after {
            content: '';
            background-color: #f1f1f1;
            width: 200rpx;
            height: 200rpx;
            border-radius: $hy-radius-circle;
            position: absolute;
            top: 80rpx;
            left: 30rpx;
        }

        :deep(.hy-image) {
            z-index: 99;
        }
    }
}

.top-collection-list {
    padding: 0;
}
</style>
