<script setup lang="ts">
import { computed, ref } from 'vue';
import { useTranslate } from '@hy-app/ui';
import GlassButton from '@/components/GlassButton.vue';
import IntroSlide from './components/IntroSlide.vue';
import TheRootPages from '@/components/TheRootPages.vue';
import introModel from '@/assets/intro/intro-model.png';
import introFashion from '@/assets/intro/intro-fashion.png';
import introPngegg from '@/assets/intro/intro-pngegg.png';

definePage({
    style: {
        navigationStyle: 'custom',
        navigationBarTextStyle: 'black',
        disableScroll: true,
    },
});

const { t } = useTranslate('intro');

/** 当前激活索引 */
const current = ref(0);
const total = 3;

/** 三页卡片配置 */
interface SlideConfig {
    titleKey: string;
    subtitleKey: string;
    image: string;
}

const slides = computed<SlideConfig[]>(() => [
    {
        titleKey: 'slide1.title',
        subtitleKey: 'slide1.subtitle',
        image: introModel,
    },
    {
        titleKey: 'slide2.title',
        subtitleKey: 'slide2.subtitle',
        image: introFashion,
    },
    {
        titleKey: 'slide3.title',
        subtitleKey: 'slide3.subtitle',
        image: introPngegg,
    },
]);

/** 按钮文案（三页相同） */
const buttonText = computed(() => t('slide1.button'));

/** 是否最后一页 */
const isLast = computed(() => current.value === total - 1);

/** 计算每张卡片相对当前的偏移量 */
const offsetOf = (i: number) => i - current.value;

/** 滑动手势：起点 X 坐标 */
const touchStartX = ref(0);
/** 滑动手势：是否正在滑动 */
const touching = ref(false);

const onTouchStart = (e: TouchEvent | MouseEvent) => {
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    touchStartX.value = x;
    touching.value = true;
};

const onTouchEnd = (e: TouchEvent | MouseEvent) => {
    if (!touching.value) return;
    touching.value = false;
    const x = 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
    const dx = x - touchStartX.value;
    const threshold = 50; // 滑动阈值 px
    if (dx < -threshold && current.value < total - 1) {
        // 左滑→下一页
        current.value += 1;
    } else if (dx > threshold && current.value > 0) {
        // 右滑→上一页
        current.value -= 1;
    }
};

/** 点击卡片：点击左右侧图跳转，点击中间图无操作 */
const onCardClick = (offset: number) => {
    if (offset === 0) return;
    current.value += offset;
};

/** 点击按钮：非末页→下一页，末页→跳转首页 */
const onShopNow = () => {
    if (isLast.value) {
        uni.navigateTo({
            url: '/pages-sub/login/Index',
        });
    } else {
        current.value += 1;
    }
};

/** 点击分页指示器跳转 */
const onDotClick = (index: number) => {
    current.value = index;
};
</script>

<template>
    <the-root-pages>
        <view
            class="intro"
            @touchstart="onTouchStart"
            @touchend="onTouchEnd"
            @mousedown="onTouchStart"
            @mouseup="onTouchEnd"
        >
            <!-- 底部深灰块：原型 y=461，375×351，#464447 -->
            <view class="intro__bottom-bg" />

            <!-- Cover Flow 3D 轮播区：同时渲染3张卡片 -->
            <view class="intro__stage">
                <intro-slide
                    v-for="(slide, i) in slides"
                    :key="i"
                    :title="t(slide.titleKey)"
                    :subtitle="t(slide.subtitleKey)"
                    :image="slide.image"
                    :offset="offsetOf(i)"
                    @click="onCardClick(offsetOf(i))"
                />
            </view>

            <!-- 分页指示器：原型 y=616，3个 6×6 椭圆，gap 8px -->
            <view class="intro__indicators">
                <view
                    v-for="(_, i) in slides"
                    :key="i"
                    class="intro__dot"
                    :class="{ 'is-active': current === i }"
                    @click="onDotClick(i)"
                />
            </view>

            <!-- Shopping now 按钮：原型 y=649 -->
            <view class="intro__action">
                <glass-button :text="buttonText" @click="onShopNow" />
            </view>
        </view>
    </the-root-pages>
</template>

<style lang="scss">
.intro {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background-color: #ffffff;
    touch-action: pan-y;

    /* 底部深灰块：原型 (0,461) 375×351 #464447 */
    &__bottom-bg {
        position: absolute;
        left: 0;
        top: 922rpx;
        width: 750rpx;
        height: 702rpx;
        background-color: #464447;
    }

    /* Cover Flow 舞台：占据中间区域，preserve-3d 让子卡片层叠生效 */
    &__stage {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* #ifdef H5 || APP-PLUS */
        transform-style: preserve-3d;
        /* #endif */
    }

    /* 分页指示器：原型 (171,616) 3个 6×6 椭圆 gap 8px */
    &__indicators {
        position: absolute;
        left: 0;
        right: 0;
        top: 1232rpx;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 16rpx;
        z-index: 30;
    }

    /* 单个指示点 6×6 */
    &__dot {
        width: 12rpx;
        height: 12rpx;
        border-radius: 50%;
        /* 未激活：空心白边框 0.5px */
        border: 2rpx solid #ffffff;
        background-color: transparent;
        transition: all 0.3s ease;

        /* 激活：实心白 */
        &.is-active {
            background-color: #ffffff;
        }
    }

    /* 按钮区：原型 y=649，居中 */
    &__action {
        position: absolute;
        left: 0;
        right: 0;
        top: 1298rpx;
        display: flex;
        justify-content: center;
        z-index: 30;
    }
}
</style>
