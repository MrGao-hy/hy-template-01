<script setup lang="ts">
import { useTranslate } from '@hy-app/ui';
import type { CollectionBanner } from './types';

const { t } = useTranslate('home');

interface IProps {
    banner: CollectionBanner;
}

interface IEmits {
    (e: 'tap', item: CollectionBanner): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const onCollectionTap = () => {
    emit('tap', props.banner);
};
</script>

<template>
    <view class="home__section">
        <view
            class="collection-banner collection-banner--large"
            @tap="onCollectionTap"
        >
            <view class="collection-banner__content">
                <view class="collection-banner__tag-wrap">
                    <view class="collection-banner__tag-line" />
                    <text class="collection-banner__tag">{{
                        t(props.banner.tagKey)
                    }}</text>
                </view>
                <text
                    class="collection-banner__title collection-banner__title--large"
                >
                    {{ t(props.banner.titleKey) }}
                </text>
            </view>
            <view class="collection-banner__image-wrap--circle">
                <view class="bg-circle">
                    <view class="bg-circle__1"></view>
                </view>
                <hy-image
                    :src="props.banner.image"
                    width="360rpx"
                    height="360rpx"
                    radius="50%"
                    mode="aspectFill"
                    lazy-load
                    style="z-index: 10"
                />
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.home__section {
    margin-bottom: $hy-border-margin-padding-xl;
}

.collection-banner {
    padding: 0 $hy-border-margin-padding-lg;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    overflow: hidden;
    position: relative;
    background-color: $hy-background--container;

    &--large {
        padding: 0 0 0 120rpx;
        min-height: 300rpx;
    }

    &__content {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: $hy-border-margin-padding-base;
        z-index: 1;
    }

    &__tag-wrap {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: $hy-border-margin-padding-sm;
    }

    &__tag-line {
        width: 4rpx;
        height: 28rpx;
        background-color: $hy-text-color;
        border-radius: 2rpx;
    }

    &__tag {
        font-size: $hy-font-size-xs;
        font-weight: 500;
        color: $hy-text-color--3;
        letter-spacing: 1rpx;
        white-space: nowrap;
    }

    &__title {
        font-size: 40rpx;
        color: $hy-text-color--3;
        line-height: 1.2;
        white-space: pre-line;

        &--large {
            font-size: 52rpx;
        }
    }

    &__image-wrap--circle {
        height: 350rpx;
        flex-shrink: 0;
        overflow: hidden;
        position: relative;
        margin-right: $hy-border-margin-padding-base;

        .bg-circle {
            position: absolute;
            top: 30rpx;
            left: 50rpx;
            width: 290rpx;
            height: 290rpx;
            border-radius: $hy-radius-circle;
            background-color: var(--hy-home-image-bg--circle);
            display: flex;
            justify-content: center;
            align-items: center;

            &__1 {
                width: 230rpx;
                height: 230rpx;
                border-radius: $hy-radius-circle;
                background-color: var(--hy-home-image-bg--circle-2);
            }
        }
    }
}
</style>
