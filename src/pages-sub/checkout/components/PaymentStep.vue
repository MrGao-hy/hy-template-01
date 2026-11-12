<script setup lang="ts">
import { computed, ref } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';
import { Config } from '@/config';

/**
 * 结算 STEP 2：支付方式（Figma: 8782-2251）
 * Payment Method 三卡片（选中深色）→ Choose your card + 银行卡轮播 → 快捷支付品牌 → 结算金额 + 条款
 */
const { t } = useTranslate('checkout');

/** 是否同意条款（父组件底栏下单前校验） */
const agreed = defineModel<boolean>('agreed', { default: false });

/** 支付渠道 key */
type PaymentChannelKey = 'cash' | 'credit' | 'other';

/** 支付渠道项 */
interface PaymentChannel {
    key: PaymentChannelKey;
    label: string;
    /** 常态图标（白底灰图） */
    icon: string;
    /** 选中态图标（深底白图）；other 使用 hy-icon 字体图标，置空 */
    iconActive?: string;
}

/** 支付方式三卡片 */
const channels: PaymentChannel[] = [
    {
        key: 'cash',
        label: t('payCash'),
        icon: `${Config.IMG}/icon-cash.svg`,
        iconActive: `${Config.IMG}/icon-cash-active.svg`,
    },
    {
        key: 'credit',
        label: t('payCreditCard'),
        icon: `${Config.IMG}/icon-credit-card-normal.svg`,
        iconActive: `${Config.IMG}/icon-credit-card.svg`,
    },
    {
        key: 'other',
        label: t('payOther'),
        icon: '',
    },
];

/** 当前支付渠道（设计稿默认选中 Credit Card） */
const activeChannel = ref<PaymentChannelKey>('credit');

/** 银行卡信息 */
interface BankCard {
    id: number;
    holder: string;
    no: string;
    valid: string;
}

/** 银行卡列表（轮播，数据与支付管理页 mock 一致） */
const cards: BankCard[] = [
    { id: 1, holder: 'Sunie Pham', no: '4364 1345 8932 8378', valid: '05/24' },
    { id: 2, holder: 'Sunie Pham', no: '5412 3632 7283 7284', valid: '03/23' },
];

/** 当前选中卡片的索引 */
const activeCardIndex = ref(0);

/** 快捷支付品牌 logo */
const quickPays = [
    `${Config.IMG}/logo-paypal.svg`,
    `${Config.IMG}/logo-visa.svg`,
    `${Config.IMG}/logo-mastercard.svg`,
    `${Config.IMG}/logo-alipay.svg`,
    `${Config.IMG}/logo-amex.svg`,
];

/** 商品金额（设计稿 mock 数据） */
const PRODUCT_PRICE = 110;

/** 运费（设计稿：免运费） */
const SHIPPING_FEE = 0;

/** 应付小计 */
const subtotal = computed(() => PRODUCT_PRICE + SHIPPING_FEE);

/** 同意条款复选框（hy-checkbox 单布尔模式：columns 长度须为 1） */
const agreeColumns = ref([{ label: '', value: 1 }]);

// ============== 事件 ==============

/** 切换支付渠道 */
const onSelectChannel = (key: PaymentChannelKey) => {
    activeChannel.value = key;
};

/** hy-swiper 轮播切换（update:current 回传索引） */
const onSwiperChange = (index: string | number) => {
    activeCardIndex.value = Number(index);
};

/** 点击卡片选中 */
const onSelectCard = (index: number) => {
    activeCardIndex.value = index;
};

/** 添加新卡 */
const onAddNew = () => {
    uni.navigateTo({ url: '/pages-sub/add-card/Index' });
};
</script>

<template>
    <view class="payment-step">
        <!-- ============== Payment Method：三卡片 ============== -->
        <text class="payment-step__title">{{ t('paymentMethod') }}</text>
        <view class="channel-list">
            <view
                v-for="channel in channels"
                :key="channel.key"
                class="channel-item"
                :class="{ 'is-active': activeChannel === channel.key }"
                @tap="onSelectChannel(channel.key)"
            >
                <image
                    v-if="channel.iconActive"
                    class="channel-item__icon"
                    :src="
                        activeChannel === channel.key
                            ? channel.iconActive
                            : channel.icon
                    "
                    mode="aspectFit"
                />
                <hy-icon
                    v-else
                    :name="IconConfig.ELLIPSIS"
                    size="44rpx"
                    :color="
                        activeChannel === channel.key ? '#ffffff' : '#6e768a'
                    "
                />
                <text class="channel-item__label">{{ channel.label }}</text>
            </view>
        </view>

        <!-- ============== Choose your card + Add new+ ============== -->
        <view class="card-head">
            <text class="card-head__title">{{ t('chooseYourCard') }}</text>
            <text class="card-head__add" @tap="onAddNew">
                {{ t('addNew') }}
            </text>
        </view>

        <!-- ============== 银行卡 3D 轮播（hy-swiper 露边 + 缩放景深，滑动/点选切换） ============== -->
        <hy-swiper
            class="bank-swiper"
            :list="cards"
            :current="activeCardIndex"
            :autoplay="false"
            :circular="false"
            height="464rpx"
            bg-color="transparent"
            previous-margin="30"
            next-margin="30"
            @update:current="onSwiperChange"
        >
            <template #default="{ record, index }">
                <view
                    class="bank-card"
                    :class="{ 'is-active': index === activeCardIndex }"
                    @tap="onSelectCard(index)"
                >
                    <image
                        class="bank-card__brand"
                        :src="`${Config.IMG}/logo-visa-white.svg`"
                        mode="aspectFit"
                    />
                    <view class="bank-card__no">
                        <text
                            v-for="(seg, j) in record.no.split(' ')"
                            :key="j"
                            class="bank-card__seg"
                        >
                            {{ seg }}
                        </text>
                    </view>
                    <view class="bank-card__foot">
                        <view class="bank-card__field">
                            <text class="bank-card__field-label">
                                CARDHOLDER NAME
                            </text>
                            <text class="bank-card__field-value">
                                {{ record.holder }}
                            </text>
                        </view>
                        <view class="bank-card__field bank-card__field--right">
                            <text class="bank-card__field-label">
                                VALID THRU
                            </text>
                            <text class="bank-card__field-value">
                                {{ record.valid }}
                            </text>
                        </view>
                    </view>
                </view>
            </template>
        </hy-swiper>

        <!-- ============== or check out with ============== -->
        <text class="payment-step__or">{{ t('orCheckOutWith') }}</text>
        <view class="quick-pays">
            <image
                v-for="logo in quickPays"
                :key="logo"
                class="quick-pays__logo"
                :src="logo"
                mode="aspectFit"
            />
        </view>

        <!-- ============== 结算金额 + 同意条款 ============== -->
        <view class="sheet">
            <view class="sheet__row">
                <text class="sheet__label">{{ t('productPrice') }}</text>
                <text class="sheet__value">$ {{ PRODUCT_PRICE }}</text>
            </view>
            <view class="sheet__row">
                <text class="sheet__label">{{ t('shipping') }}</text>
                <text class="sheet__value">{{ t('freeship') }}</text>
            </view>
            <view class="sheet__subtotal">
                <text class="sheet__label sheet__label--dark">
                    {{ t('subtotal') }}
                </text>
                <text class="sheet__total">$ {{ subtotal }}</text>
            </view>
            <view class="sheet__agree">
                <hy-checkbox
                    v-model="agreed"
                    :columns="agreeColumns"
                    shape="square"
                    active-color="#343434"
                >
                    <template #label>
                        <text class="agree-text">
                            {{ t('agreePrefix') }}
                            <text class="agree-text__link">
                                {{ t('termsService') }}
                            </text>
                        </text>
                    </template>
                </hy-checkbox>
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.payment-step {
    margin-top: 56rpx;

    &__title {
        display: block;
        margin-bottom: 28rpx;
        font-size: $hy-font-size-md;
        font-weight: 700;
        color: $hy-text-color;
    }

    &__or {
        display: block;
        margin-top: 88rpx;
        font-size: 24rpx;
        color: $hy-text-color--2;
    }
}

/* 支付方式三卡片 */
.channel-list {
    display: flex;
    gap: 28rpx;
}

.channel-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    height: 128rpx;
    padding-top: 24rpx;
    background-color: $hy-background--2;
    border-radius: 12rpx;
    box-shadow: 0 10rpx 32rpx 0 rgba(0, 0, 0, 0.09);
    transition: background-color 0.2s;

    &.is-active {
        background-color: #43484b;
    }

    &:active {
        opacity: 0.85;
    }

    &__icon {
        width: 74rpx;
        height: 44rpx;
    }

    &__label {
        margin-top: 12rpx;
        font-size: 24rpx;
        color: #6e768a;

        .is-active & {
            color: var(--hy-text-color--inverse, #ffffff);
        }
    }
}

/* Choose your card */
.card-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 104rpx;

    &__title {
        font-size: 32rpx;
        font-weight: 700;
        color: $hy-text-color;
    }

    &__add {
        font-size: 24rpx;
        color: #f20000;

        &:active {
            opacity: 0.7;
        }
    }
}

/* 银行卡 3D 轮播（负外边距通栏 + item 内缩，为四周阴影留出渲染空间防止裁剪） */
.bank-swiper {
    margin: 24rpx -30rpx 0;

    /* 覆盖 hy-swiper 内层 wrapper 自带背景色 */
    :deep(.hy-swiper__wrapper) {
        background-color: transparent;
    }

    /* swiper-item 居中 + 内缩（内边距需小于 next-margin，保证相邻卡片有可见露边） */
    :deep(.hy-swiper__wrapper--item) {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

.bank-card {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 382rpx;
    padding: 44rpx 32rpx 52rpx;
    background: linear-gradient(180deg, #14c1d9 0%, #998fd4 100%);
    border-radius: 22rpx;
    box-shadow: 0 10rpx 29rpx 0 rgba(171, 169, 167, 0.6);
    /* 非当前卡片：缩小 + 半透明，形成 3D 景深 */
    opacity: 0.55;
    transform: scale(0.9);
    transition:
        transform 0.25s ease-out,
        opacity 0.25s ease-out;

    /* 当前选中卡片：复位放大 */
    &.is-active {
        opacity: 1;
        transform: scale(1);
    }

    &__brand {
        width: 124rpx;
        height: 42rpx;
        margin-left: auto;
    }

    &__no {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: auto;
    }

    &__seg {
        font-size: 40rpx;
        letter-spacing: 4rpx;
        color: var(--hy-text-color--inverse, #ffffff);
    }

    &__foot {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-top: 44rpx;
    }

    &__field {
        display: flex;
        flex-direction: column;
        gap: 10rpx;

        &--right {
            align-items: flex-end;
        }
    }

    &__field-label {
        font-size: 18rpx;
        font-weight: 800;
        letter-spacing: 2rpx;
        color: var(--hy-text-color--inverse, #ffffff);
    }

    &__field-value {
        font-size: 22rpx;
        font-weight: 600;
        color: var(--hy-text-color--inverse, #ffffff);
    }
}

/* 快捷支付品牌 */
.quick-pays {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 44rpx;

    &__logo {
        width: 100rpx;
        height: 68rpx;

        &:active {
            opacity: 0.8;
        }
    }
}

/* 结算金额面板 */
.sheet {
    margin-top: 88rpx;

    &__row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 24rpx;
        margin-bottom: 24rpx;
        border-bottom: 2rpx solid $hy-border-color;
    }

    &__label {
        font-size: 28rpx;
        color: $hy-text-color--3;

        &--dark {
            color: $hy-text-color;
        }
    }

    &__value {
        font-size: 28rpx;
        font-weight: 600;
        color: $hy-text-color;
    }

    &__subtotal {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 8rpx;
    }

    &__total {
        font-size: 40rpx;
        font-weight: 700;
        color: $hy-text-color;
    }

    &__agree {
        margin-top: 48rpx;
    }
}

/* 条款文案 */
.agree-text {
    font-size: 32rpx;
    color: $hy-text-color--2;

    &__link {
        text-decoration: underline;
    }
}
</style>
