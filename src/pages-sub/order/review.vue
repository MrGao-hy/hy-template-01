<script setup lang="ts">
import { computed, ref } from 'vue';
import {
    IconConfig,
    useToast,
    useTranslate,
    type FileVo,
    type UploadFileParams,
} from '@hy-app/ui';
import { onLoad } from '@dcloudio/uni-app';
import { Config } from '@/config';
import Navbar from '@/components/Navbar.vue';

/**
 * 评价商品（Figma: 8782-2739）
 * 积分提示条（可折叠）→ 整单评分（hy-rate）→ 评价输入卡（50 字符）→ 提交
 */
definePage({
    style: {
        navigationStyle: 'custom'
    },
});

const { t } = useTranslate('order');
const toast = useToast();

/** 订单号 */
const orderNo = ref('');

onLoad(options => {
    orderNo.value = options?.no ?? '';
});

/** 满星数 */
const FULL_STARS = 5;
/** 输入字符上限（设计稿：50 characters） */
const MAX_CHARS = 50;
/** 最多上传图片数 */
const MAX_IMAGES = 6;

/** 整单评分（1-5） */
const rating = ref(0);

/** 评价内容 */
const content = ref('');

/** 已选图片列表 */
const fileList = ref<FileVo[]>([]);

/** 选择图片后追加到列表 */
const onAfterRead = (params: UploadFileParams) => {
    const files = Array.isArray(params.file) ? params.file : [params.file];
    fileList.value.push(...files);
};

/** 积分提示条展开状态（右侧箭头可折叠） */
const bannerVisible = ref(true);

/** 是否已评分 */
const canSubmit = computed(() => rating.value > 0);

// ============== 事件 ==============

const onBack = () => {
    uni.navigateBack();
};

/** 切换提示条展开/收起 */
const onToggleBanner = () => {
    bannerVisible.value = !bannerVisible.value;
};

/** 提交评价 */
const onSubmit = () => {
    if (!canSubmit.value) return;
    toast.success(t('reviewSuccess'));
    setTimeout(() => {
        uni.navigateBack();
    }, 1200);
};
</script>

<template>
    <view class="review-page">
        <!-- ============== 顶部：返回 + 标题 ============== -->
        <navbar :title="t('rateProductTitle')"></navbar>

        <!-- ============== 积分提示条（可折叠） ============== -->
        <view v-show="bannerVisible" class="point-banner">
            <hy-icon
                :name="`${Config.IMG}/icon_03.png`"
                size="44rpx"
                color="#ffffff"
            />
            <text class="point-banner__text">{{ t('reviewBanner') }}</text>
            <hy-icon
                :name="IconConfig.RIGHT"
                size="48rpx"
                color="#ffffff"
                class="point-banner__arrow"
                @tap="onToggleBanner"
            />
        </view>

        <!-- ============== 整单评分（hy-rate） ============== -->
        <view class="rate-ctl">
            <hy-rate
                v-model="rating"
                :count="FULL_STARS"
                :size="40"
                :gutter="24"
                active-color="#508A7B"
                inactive-color="#eff0f1"
            />
        </view>

        <!-- ============== 评价输入卡（50 字符上限） ============== -->
        <view class="content-card">
            <hy-textarea
                v-model="content"
                :placeholder="t('reviewPlaceholder2')"
                :maxlength="MAX_CHARS"
                :height="267"
                border="none"
                count
            />
        </view>

        <!-- 图片上传（虚线框 + 图片 icon） -->
        <hy-upload
            class="upload"
            :file-list="fileList"
            accept="image"
            :max-count="MAX_IMAGES"
            @after-read="onAfterRead"
        >
            <view class="upload-trigger">
                <hy-icon
                    :name="IconConfig.PHOTO"
                    size="70rpx"
                    color="#CCD2E3"
                />
            </view>
        </hy-upload>

        <!-- ============== 底部提交 ============== -->
        <view class="review-page__footer">
            <hy-button
                shape="circle"
                color="#343434"
                :text="t('submitReview')"
                :custom-style="{ opacity: canSubmit ? 1 : 0.4 }"
                @click="onSubmit"
            />
        </view>
    </view>
</template>

<style lang="scss" scoped>
.review-page {
    min-height: 100vh;
    box-sizing: border-box;
    padding: calc(var(--status-bar-height) + 40rpx) 30rpx
        calc(180rpx + env(safe-area-inset-bottom));

    &__header {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 80rpx;
    }

    &__back {
        position: absolute;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 72rpx;
        height: 72rpx;
    }

    &__title {
        font-size: 36rpx;
        font-weight: 700;
        color: $hy-text-color--2;
    }

    &__footer {
        position: fixed;
        right: 30rpx;
        bottom: calc(140rpx + env(safe-area-inset-bottom));
        left: 30rpx;
        z-index: 10;
    }
}

/* 积分提示条 */
.point-banner {
    display: flex;
    align-items: center;
    margin-top: 40rpx;
    padding: 26rpx 40rpx;
    background-color: #575757;
    border-radius: 12rpx;

    &__text {
        flex: 1;
        min-width: 0;
        margin-left: 20rpx;
        font-size: 24rpx;
        font-weight: 500;
        letter-spacing: -0.5rpx;
        color: var(--hy-text-color--inverse, #ffffff);
    }

    &__arrow {
        flex-shrink: 0;
        margin-left: 24rpx;
    }
}

/* 整单评分 */
.rate-ctl {
    display: flex;
    justify-content: center;
    margin-top: 72rpx;
}

/* 评价输入卡 */
.content-card {
    margin-top: 56rpx;
    padding: 36rpx 36rpx 12rpx;
    background-color: $hy-background--2;
    border-radius: 40rpx;
    box-shadow: 0 2rpx 6rpx -24rpx rgba(0, 0, 0, 0.15);
}

/* 上传占位（虚线边框 + 图片 icon） */
.upload {
    margin-top: 34rpx;

    &-trigger {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 140rpx;
        height: 140rpx;
        border: 2rpx dashed #ccd2e3;
        border-radius: 32rpx;
    }
}
</style>
