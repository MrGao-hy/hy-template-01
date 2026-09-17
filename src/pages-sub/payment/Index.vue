<script setup lang="ts">
import { ref, computed } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';

/**
 * 支付管理页（Figma 画板 8782:3753 payment / 8782:3782 new card）
 * Card Management 卡片列表 + "or check out with" 快捷支付方式 + Add new+
 */
definePage({
    style: {
        navigationStyle: 'custom',
        navigationBarTextStyle: 'black',
    },
});

const { t } = useTranslate('payment');

/** 银行卡项类型 */
interface BankCard {
    id: number;
    no: string;
    holder: string;
    valid: string;
}

/** 卡片列表（Figma 设计稿模拟数据） */
const cards = ref<BankCard[]>([
    { id: 1, no: '4364 1345 8932 8378', holder: 'Sunie Pham', valid: '05/24' },
    { id: 2, no: '5412 3632 7283 7284', holder: 'Sunie Pham', valid: '03/23' },
]);

/** 当前选中卡片 */
const activeCardId = ref(1);

/** 快捷支付方式（Figma payments 组件：PayPal / Visa / Mastercard） */
const quickPays = ['PayPal', 'Visa', 'Mastercard'];

/** 当前选中的快捷支付 */
const activeQuickPay = ref('');

/** 卡号掩码展示 */
const maskNo = computed(() => (no: string) =>
    no
        .split(' ')
        .map((seg, i) => (i < 3 ? '****' : seg))
        .join('  '),
);

// ============== 事件处理 ==============

/** 返回上一页 */
const onBack = () => {
    uni.navigateBack();
};

/** 选中卡片 */
const onSelectCard = (card: BankCard) => {
    activeCardId.value = card.id;
    activeQuickPay.value = '';
};

/** 选择快捷支付 */
const onSelectQuickPay = (name: string) => {
    activeQuickPay.value = name;
    activeCardId.value = 0;
};

/** 添加新卡 */
const onAddNew = () => {
    uni.navigateTo({ url: '/pages-sub/add-card/Index' });
};
</script>

<template>
    <view class="payment-page">
        <!-- ============== 顶部：返回 + 标题 ============== -->
        <view class="payment-page__header">
            <view class="payment-page__back" @tap="onBack">
                <hy-icon :name="IconConfig.LEFT" size="36rpx" color="#1a1a1a" />
            </view>
            <text class="payment-page__title">{{ t('title') }}</text>
        </view>

        <!-- ============== 卡片管理 ============== -->
        <text class="payment-page__section">{{ t('cardManagement') }}</text>
        <view class="card-list">
            <view
                v-for="card in cards"
                :key="card.id"
                class="bank-card"
                :class="{ 'is-active': activeCardId === card.id }"
                @tap="onSelectCard(card)"
            >
                <view class="bank-card__top">
                    <text class="bank-card__no">
                        <text
                            v-for="(seg, i) in card.no.split(' ')"
                            :key="i"
                            class="bank-card__seg"
                        >
                            {{ i < 3 ? '****' : seg }}
                        </text>
                    </text>
                </view>
                <view class="bank-card__bottom">
                    <view class="bank-card__field">
                        <text class="bank-card__field-label">{{ t('cardholder') }}</text>
                        <text class="bank-card__field-value">{{ card.holder }}</text>
                    </view>
                    <view class="bank-card__field bank-card__field--right">
                        <text class="bank-card__field-value">{{ card.valid }}</text>
                        <text class="bank-card__field-label">{{ t('validThru') }}</text>
                    </view>
                </view>
            </view>
        </view>

        <!-- ============== 或使用以下方式支付 ============== -->
        <view class="divider">
            <view class="divider__line" />
            <text class="divider__text">{{ t('orCheckOutWith') }}</text>
            <view class="divider__line" />
        </view>
        <view class="quick-pays">
            <view
                v-for="name in quickPays"
                :key="name"
                class="quick-pay"
                :class="{ 'is-active': activeQuickPay === name }"
                @tap="onSelectQuickPay(name)"
            >
                {{ name }}
            </view>
        </view>

        <!-- ============== 添加新卡 ============== -->
        <view class="add-btn" @tap="onAddNew">
            {{ t('addNew') }}
        </view>
    </view>
</template>

<style lang="scss" scoped>
.payment-page {
    min-height: 100vh;
    padding: calc(var(--status-bar-height) + 40rpx) 40rpx
        calc(40rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
    background-color: #ffffff;

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
        width: 56rpx;
        height: 56rpx;
    }

    &__title {
        font-size: 36rpx;
        font-weight: 700;
        color: $flux-text-primary;
    }

    &__section {
        display: block;
        margin-top: 48rpx;
        font-size: 30rpx;
        font-weight: 700;
        color: $flux-text-primary;
    }
}

/* 银行卡 */
.card-list {
    display: flex;
    flex-direction: column;
    gap: 32rpx;
    margin-top: 24rpx;
}

.bank-card {
    padding: 36rpx;
    background: linear-gradient(135deg, #43434b 0%, #191920 60%, #2f2f38 100%);
    border-radius: 28rpx;
    border: 4rpx solid transparent;
    transition: border-color 0.2s;

    &.is-active {
        border-color: #343434;
    }

    &__seg {
        margin-right: 16rpx;
        font-size: 32rpx;
        font-weight: 600;
        letter-spacing: 2rpx;
        color: #ffffff;

        &:last-child {
            margin-right: 0;
        }
    }

    &__bottom {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        margin-top: 48rpx;
    }

    &__field {
        display: flex;
        flex-direction: column;
        gap: 6rpx;

        &--right {
            align-items: flex-end;
        }
    }

    &__field-label {
        font-size: 18rpx;
        letter-spacing: 2rpx;
        color: rgba(255, 255, 255, 0.6);
    }

    &__field-value {
        font-size: 26rpx;
        font-weight: 600;
        color: #ffffff;
    }
}

/* 分割线 */
.divider {
    display: flex;
    align-items: center;
    gap: 24rpx;
    margin: 56rpx 0 32rpx;

    &__line {
        flex: 1;
        height: 2rpx;
        background-color: #f1f2f3;
    }

    &__text {
        font-size: 24rpx;
        color: #8a8a8f;
    }
}

/* 快捷支付 */
.quick-pays {
    display: flex;
    gap: 20rpx;
}

.quick-pay {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 88rpx;
    font-size: 26rpx;
    font-weight: 600;
    color: $flux-text-primary;
    background-color: #fafafa;
    border: 2rpx solid #f1f2f3;
    border-radius: 20rpx;

    &.is-active {
        color: #ffffff;
        background-color: #343434;
        border-color: #343434;
    }

    &:active {
        opacity: 0.85;
    }
}

/* 添加新卡按钮 */
.add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 96rpx;
    margin-top: 56rpx;
    font-size: 30rpx;
    font-weight: 600;
    color: #ffffff;
    background-color: #343434;
    border-radius: 100rpx;

    &:active {
        opacity: 0.85;
    }
}
</style>
