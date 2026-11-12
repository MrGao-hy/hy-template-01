<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { IconConfig, useToast, useTranslate } from '@hy-app/ui';

/**
 * 结算 STEP 1：配送信息（Figma: 8782-2325）
 */
const { t } = useTranslate('checkout');
const toast = useToast();

/** hy-form 实例类型 */
interface FormInstance {
    validate: () => Promise<boolean>;
    resetFields: () => void;
    clearValidate: (fields?: string[]) => void;
}

const formRef = ref<FormInstance>();

/** 国家选项（key 为国际化 key，label 为当前语言文案） */
const COUNTRY_OPTIONS = [
    { key: 'countryVietnam' },
    { key: 'countryChina' },
    { key: 'countryUnitedStates' },
    { key: 'countryJapan' },
];

/** 默认国家 */
const DEFAULT_COUNTRY_KEY = 'countryChina';

/** 配送表单（country 为 hy-picker 回填的文本值） */
const form = reactive({
    firstName: 'Pham',
    lastName: '',
    country: t(DEFAULT_COUNTRY_KEY),
    streetName: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
});

/** 必填校验规则 */
const rules = {
    firstName: { required: true, message: t('fieldRequired') },
    lastName: { required: true, message: t('fieldRequired') },
    country: { required: true, message: t('fieldRequired') },
    streetName: { required: true, message: t('fieldRequired') },
    city: { required: true, message: t('fieldRequired') },
    zipCode: { required: true, message: t('fieldRequired') },
    phone: { required: true, message: t('fieldRequired') },
};

/** 国家选项（随语言切换） */
const countryOptions = computed(() =>
    COUNTRY_OPTIONS.map(item => ({ key: item.key, label: t(item.key) }))
);

/** hy-picker 列数据 */
const countryColumns = computed(() => [
    countryOptions.value.map(item => item.label),
]);

/** 选中国家文案（兼容初始空串与 picker 回填数组） */
const countryText = computed(() => {
    const value = form.country;
    if (Array.isArray(value)) return String(value[0] ?? '');
    return String(value ?? '');
});

/** 配送方式 */
interface ShippingMethod {
    key: string;
    title: string;
    price: string;
    desc: string;
}

const shippingMethods: ShippingMethod[] = [
    {
        key: 'home-free',
        title: t('deliveryHome'),
        price: t('free'),
        desc: t('deliveryFrom3to7'),
    },
    {
        key: 'home',
        title: t('deliveryHome'),
        price: '$9.90',
        desc: t('deliveryFrom4to6'),
    },
    {
        key: 'fast',
        title: t('fastDelivery'),
        price: '$9.90',
        desc: t('deliveryFrom2to3'),
    },
];
const selectedMethod = ref('home-free');

/** 复制账单地址（hy-checkbox 单布尔模式：columns 长度须为 1） */
const copyAddress = ref(false);
const copyColumns = ref([{ label: t('copyAddress'), value: 1 }]);

/** 优惠券码 */
const couponCode = ref('');

// ============== 事件 ==============

/** 选择配送方式 */
const onSelectMethod = (key: string) => {
    selectedMethod.value = key;
};

/** 验证优惠码 */
const onValidateCoupon = () => {
    if (!couponCode.value) {
        toast.show(t('couponPlaceholder'));
        return;
    }
    toast.success(t('validate'));
};

/** 校验表单（供父组件在切换步骤前调用） */
const validate = () => formRef.value?.validate();

defineExpose({ validate });
</script>

<template>
    <view class="shipping-step">
        <!-- ============== 配送信息表单 ============== -->
        <hy-form
            ref="formRef"
            :model="form"
            :rules="rules"
            label-position="top"
            border
        >
            <view class="checkout-form">
                <hy-form-item :label="t('firstName')" prop="firstName" required>
                    <hy-input v-model="form.firstName" border="none" />
                </hy-form-item>
                <hy-form-item :label="t('lastName')" prop="lastName" required>
                    <hy-input v-model="form.lastName" border="none" />
                </hy-form-item>

                <!-- 国家（下拉选择，直接绑定 form.country） -->
                <hy-form-item :label="t('country')" prop="country" required>
                    <hy-picker
                        :columns="countryColumns"
                        v-model="form.country"
                        has-input
                    >
                        <template #default>
                            <view class="form-picker">
                                <text
                                    class="form-picker__text"
                                    :class="{
                                        'form-picker__text--placeholder':
                                            !countryText.length,
                                    }"
                                >
                                    {{ countryText || t('country') }}
                                </text>
                                <hy-icon
                                    :name="IconConfig.DOWN"
                                    size="24rpx"
                                    color="#777e90"
                                />
                            </view>
                        </template>
                    </hy-picker>
                </hy-form-item>

                <hy-form-item
                    :label="t('streetName')"
                    prop="streetName"
                    required
                >
                    <hy-input v-model="form.streetName" border="none" />
                </hy-form-item>
                <hy-form-item :label="t('city')" prop="city" required>
                    <hy-input v-model="form.city" border="none" />
                </hy-form-item>
                <hy-form-item :label="t('state')" prop="state">
                    <hy-input v-model="form.state" border="none" />
                </hy-form-item>
                <hy-form-item :label="t('zipCode')" prop="zipCode" required>
                    <hy-input v-model="form.zipCode" border="none" />
                </hy-form-item>
                <hy-form-item :label="t('phone')" prop="phone" required>
                    <hy-input
                        v-model="form.phone"
                        border="none"
                        type="number"
                    />
                </hy-form-item>
            </view>
        </hy-form>

        <!-- ============== 配送方式 ============== -->
        <view class="method-section">
            <text class="method-section__title">
                {{ t('shippingMethod') }}
            </text>
            <view
                v-for="method in shippingMethods"
                :key="method.key"
                class="method-item"
                @tap="onSelectMethod(method.key)"
            >
                <view
                    class="method-item__radio"
                    :class="{ 'is-active': selectedMethod === method.key }"
                >
                    <view
                        v-if="selectedMethod === method.key"
                        class="method-item__radio-dot"
                    ></view>
                </view>
                <view class="method-item__body">
                    <view class="method-item__head">
                        <text class="method-item__name">
                            {{ method.title }}
                        </text>
                        <text class="method-item__price">
                            {{ method.price }}
                        </text>
                    </view>
                    <text class="method-item__desc">{{ method.desc }}</text>
                </view>
            </view>
        </view>

        <!-- ============== 优惠券 ============== -->
        <view class="coupon-section">
            <text class="coupon-section__title">{{ t('couponCode') }}</text>
            <view class="coupon-section__row">
                <hy-input
                    v-model="couponCode"
                    :placeholder="t('couponPlaceholder')"
                    shape="circle"
                    custom-class="coupon-section__input"
                >
                    <template #suffix>
                        <text
                            class="coupon-section__validate"
                            @tap="onValidateCoupon"
                        >
                            {{ t('validate') }}
                        </text>
                    </template>
                </hy-input>
            </view>
        </view>

        <!-- ============== 账单地址 ============== -->
        <view class="billing-section">
            <text class="billing-section__title">
                {{ t('billingAddress') }}
            </text>
            <hy-checkbox
                v-model="copyAddress"
                :columns="copyColumns"
                shape="square"
                active-color="#508a7b"
                inactive-color="#bebfc4"
                :icon-size="16"
                label-size="14"
                label-color="#575757"
            />
        </view>
    </view>
</template>

<style lang="scss" scoped>
/* 表单 */
.checkout-form {
    margin-top: 48rpx;
}

.form-picker {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 16rpx;

    &__text {
        font-size: 28rpx;
        color: $hy-text-color;

        &--placeholder {
            color: #cbcdd8;
        }
    }
}

/* 配送方式 */
.method-section {
    margin-top: 64rpx;

    &__title {
        display: block;
        margin-bottom: 28rpx;
        font-size: $hy-font-size-md;
        font-weight: 700;
        color: $hy-text-color;
    }
}

.method-item {
    display: flex;
    align-items: flex-start;
    gap: 24rpx;
    padding: 24rpx 0;

    &:active {
        opacity: 0.8;
    }

    &__radio {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 46rpx;
        height: 46rpx;
        margin-top: 4rpx;
        border: 3rpx solid $hy-text-color--4;
        border-radius: 50%;

        &.is-active {
            border-color: $hy-primary;
        }
    }

    &__radio-dot {
        width: 18rpx;
        height: 18rpx;
        background-color: $hy-primary;
        border-radius: 50%;
    }

    &__body {
        flex: 1;
        min-width: 0;
    }

    &__head {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__name {
        font-size: 28rpx;
        font-weight: 600;
        color: $hy-text-color;
    }

    &__price {
        font-size: 28rpx;
        font-weight: 600;
        color: $hy-text-color;
    }

    &__desc {
        display: block;
        margin-top: 8rpx;
        font-size: 24rpx;
        color: $hy-text-color--4;
    }
}

/* 账单地址 */
.billing-section {
    margin-top: 40rpx;

    &__title {
        display: block;
        margin-bottom: 24rpx;
        font-size: $hy-font-size-md;
        font-weight: 700;
        color: $hy-text-color;
    }
}

/* 优惠券 */
.coupon-section {
    margin-top: 48rpx;

    &__title {
        display: block;
        margin-bottom: 24rpx;
        font-size: $hy-font-size-md;
        font-weight: 700;
    }

    &__row {
        display: flex;
        align-items: center;
        gap: 24rpx;
    }

    &__input {
        flex: 1;
        height: 96rpx;
        padding: 0 32rpx;
        color: $hy-text-color;
        background-color: $hy-background--track;
        border-radius: $hy-radius-base;

        :deep(.uni-input-input) {
            font-size: $hy-font-size-xxl;
        }
    }

    &__validate {
        flex-shrink: 0;
        font-size: 28rpx;
        font-weight: 600;
        color: $hy-primary;

        &:active {
            opacity: 0.7;
        }
    }
}

:deep(.coupon-placeholder) {
    color: #cbcdd8;
}
</style>
