<script setup lang="ts">
import { computed } from 'vue';
import { IconConfig } from '@hy-app/ui';

/**
 * 收藏看板卡片
 */

defineOptions({
    options: {
        styleIsolation: 'shared',
        virtualHost: true,
    },
});

/** 看板数据 */
export interface WishBoard {
    id: number;
    /** 看板名称 */
    name: string;
    /** 商品数量 */
    count: number;
    /** 拼贴图（6 张：左 2 大 + 右 4 小，不足时循环填充） */
    images: string[];
}

const props = defineProps<{
    /** 看板数据 */
    board: WishBoard;
    /** 数量展示文案（已国际化，如 "20 items"） */
    countText?: string;
}>();

const emit = defineEmits<{
    /** 点击卡片 */
    (e: 'tap', board: WishBoard): void;
}>();

/** 拼贴图固定取 6 张，不足循环填充 */
const mosaicImages = computed<string[]>(() => {
    const imgs = props.board.images ?? [];
    if (!imgs.length) return [];
    return Array.from({ length: 6 }, (_, i) => imgs[i % imgs.length]);
});

/** 数量文案兜底 */
const displayCount = computed(
    () => props.countText ?? `${props.board.count} items`
);

const onTap = () => {
    emit('tap', props.board);
};
</script>

<template>
    <view class="board-card" @tap="onTap">
        <!-- 马赛克拼贴：左 2 张全高大图 + 右侧 2×2 均分网格 -->
        <view class="board-card__mosaic">
            <hy-image
                v-for="img in mosaicImages.slice(0, 2)"
                :key="img"
                :src="img"
                width="100%"
                height="100%"
                mode="aspectFill"
                :fade="true"
                lazy-load
                preview-image
                custom-class="board-card__big"
            />
            <view class="board-card__grid">
                <view
                    v-for="(row, rowIndex) in [
                        mosaicImages.slice(2, 4),
                        mosaicImages.slice(4, 6),
                    ]"
                    :key="rowIndex"
                    class="board-card__row"
                >
                    <hy-image
                        v-for="img in row"
                        :key="img"
                        :src="img"
                        width="100%"
                        height="100%"
                        mode="aspectFill"
                        :fade="true"
                        lazy-load
                        preview-image
                        custom-class="board-card__cell"
                    />
                </view>
            </view>
        </view>

        <!-- 信息行 -->
        <view class="board-card__footer">
            <view class="board-card__meta">
                <text class="board-card__name">{{ board.name }}</text>
                <text class="board-card__count">{{ displayCount }}</text>
            </view>
            <view class="board-card__arrow">
                <hy-icon
                    :name="IconConfig.RIGHT"
                    size="36rpx"
                    color="#1a1a1a"
                />
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.board-card {
    width: 100%;
    padding-bottom: 24rpx;
    border-bottom: 2rpx solid $hy-border-color;
    box-sizing: border-box;

    &:active {
        opacity: 0.85;
    }

    /* 马赛克拼贴：三大列等宽（左 2 大图 + 右区 2×2 网格），8rpx 白缝，容器统一裁圆角 */
    &__mosaic {
        display: flex;
        gap: 8rpx;
        width: 100%;
        height: 300rpx;
        overflow: hidden;
        border-radius: 22rpx;
        background-color: $hy-background;
    }

    /* 左/中：全高大图 */
    :deep(.board-card__big) {
        flex: 1;
        height: 100%;
    }

    /* 右区：两行均分 */
    &__grid {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8rpx;
    }

    /* 右区每行：两图均分 */
    &__row {
        flex: 1;
        display: flex;
        gap: 8rpx;
        min-height: 0;
    }

    :deep(.board-card__cell) {
        flex: 1;
        height: 100%;
    }

    /* 信息行 */
    &__footer {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin-top: 24rpx;
    }

    &__meta {
        display: flex;
        flex-direction: column;
        gap: 6rpx;
    }

    &__name {
        font-size: 44rpx;
        font-weight: 700;
        line-height: 62rpx;
        color: $hy-text-color;
    }

    &__count {
        font-size: 24rpx;
        font-weight: 300;
        line-height: 32rpx;
        color: $hy-text-color--3;
    }

    /* 箭头与名称行垂直居中对齐 */
    &__arrow {
        display: flex;
        align-items: center;
        height: 62rpx;
    }
}
</style>
