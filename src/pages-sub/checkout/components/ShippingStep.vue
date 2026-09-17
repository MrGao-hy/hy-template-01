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

/** 配送表单（country 为 hy-picker 回填的数组值） */
const form = reactive({
    firstName: 'Pham',
    lastName: '',
    country: '' as string | string[],
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

/** 国家选项 */
const countryColumns = [['Vietnam', 'China', 'United States', 'Japan']];

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
const copyColumns = ref([{ label: t('copyAddress'), value: true }]);

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
        >
            <view class="checkout-form">
                <hy-form-item :label="t('firstName')" prop="firstName" required>
                    <hy-input
                        v-model="form.firstName"
                        border="bottom"
                        placeholder=" "
                    />
                </hy-form-item>
                <hy-form-item :label="t('lastName')" prop="lastName" required>
                    <hy-input
                        v-model="form.lastName"
                        border="bottom"
                        placeholder=" "
                    />
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
                    <hy-input
                        v-model="form.streetName"
                        border="bottom"
                        placeholder=" "
                    />
                </hy-form-item>
                <hy-form-item :label="t('city')" prop="city" required>
                    <hy-input
                        v-model="form.city"
                        border="bottom"
                        placeholder=" "
                    />
                </hy-form-item>
                <hy-form-item :label="t('state')" prop="state">
                    <hy-input
                        v-model="form.state"
                        border="bottom"
                        placeholder=" "
                    />
                </hy-form-item>
                <hy-form-item :label="t('zipCode')" prop="zipCode" required>
                    <hy-input
                        v-model="form.zipCode"
                        border="bottom"
                        placeholder=" "
                    />
                </hy-form-item>
                <hy-form-item :label="t('phone')" prop="phone" required>
                    <hy-input
                        v-model="form.phone"
                        border="bottom"
                        type="number"
                        placeholder=" "
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

        <!-- ============== 优惠券 ============== -->
        <view class="coupon-section">
            <text class="coupon-section__title">{{ t('couponCode') }}</text>
            <view class="coupon-section__row">
                <input
                    v-model="couponCode"
                    class="coupon-section__input"
                    :placeholder="t('couponPlaceholder')"
                    placeholder-class="coupon-placeholder"
                />
                <text class="coupon-section__validate" @tap="onValidateCoupon">
                    {{ t('validate') }}
                </text>
            </view>
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
    border-bottom: 2rpx solid #f1f2f3;

    &__text {
        font-size: 28rpx;
        color: $flux-text-primary;

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
        font-size: $flux-font-lg;
        font-weight: 700;
        color: $flux-text-primary;
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
        border: 3rpx solid #bebfc4;
        border-radius: 50%;

        &.is-active {
            border-color: #508a7b;
        }
    }

    &__radio-dot {
        width: 18rpx;
        height: 18rpx;
        background-color: #508a7b;
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
        color: $flux-text-primary;
    }

    &__price {
        font-size: 28rpx;
        font-weight: 600;
        color: $flux-text-primary;
    }

    &__desc {
        display: block;
        margin-top: 8rpx;
        font-size: 24rpx;
        color: #a3a5ad;
    }
}

/* 账单地址 */
.billing-section {
    margin-top: 40rpx;

    &__title {
        display: block;
        margin-bottom: 24rpx;
        font-size: $flux-font-lg;
        font-weight: 700;
        color: $flux-text-primary;
    }
}

/* 优惠券 */
.coupon-section {
    margin-top: 48rpx;

    &__title {
        display: block;
        margin-bottom: 24rpx;
        font-size: $flux-font-lg;
        font-weight: 700;
        color: #000839;
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
        font-size: 26rpx;
        color: $flux-text-primary;
        background-color: #f7f7f8;
        border-radius: $flux-radius-md;
    }

    &__validate {
        flex-shrink: 0;
        font-size: 28rpx;
        font-weight: 600;
        color: #508a7b;

        &:active {
            opacity: 0.7;
        }
    }
}

:deep(.coupon-placeholder) {
    color: #cbcdd8;
}
</style>
