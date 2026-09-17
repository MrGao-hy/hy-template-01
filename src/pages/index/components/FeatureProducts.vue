<script setup lang="ts">
import { useTranslate } from '@hy-app/ui';
import HyScrollList from '@hy-app/ui/components/hy-scroll-list/hy-scroll-list.vue';
import type { Product } from './types';

const { t } = useTranslate('home');

interface IProps {
    list: Product[];
}

interface IEmits {
    (e: 'tap', item: Product): void;
    (e: 'show-all'): void;
}

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const onProductTap = (item: Product) => {
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
                t('featureProducts.title')
            }}</text>
            <view
                class="home__section-more"
                @tap="onShowAllTap"
            >
                <text class="home__section-more-text">{{
                    t('featureProducts.showAll')
                }}</text>
            </view>
        </view>
        <hy-scroll-list :indicator="false">
            <hy-flex gap="20">
                <view
                    v-for="item in props.list"
                    :key="item.id"
                    class="feature-product-card"
                    @tap="onProductTap(item)"
                >
                    <view
                        class="feature-product-card__image-wrap"
                    >
                        <hy-image
                            :src="item.image"
                            :width="136"
                            :height="192"
                            radius="24rpx"
                            bg-color="#f4f2f0"
                            mode="aspectFill"
                            lazy-load
                        />
                    </view>
                    <text class="feature-product-card__name">{{
                        t(item.nameKey)
                    }}</text>
                    <text class="feature-product-card__price"
                        >${{ item.price.toFixed(2) }}</text
                    >
                </view>
            </hy-flex>
        </hy-scroll-list>
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

.feature-product-card {
    flex-shrink: 0;
    width: 280rpx;
    display: flex;
    flex-direction: column;
    gap: $flux-spacing-sm;

    &__image-wrap {
        overflow: hidden;
    }

    &__name {
        font-size: $flux-font-md;
        font-weight: 500;
        color: $flux-text-primary;
        line-height: 1.3;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &__price {
        font-size: $flux-font-lg;
        font-weight: 700;
        color: $flux-text-primary;
    }
}
</style>
