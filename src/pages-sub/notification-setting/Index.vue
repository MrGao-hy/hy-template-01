<script setup lang="ts">
import { ref } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';
import Navbar from '@/components/Navbar.vue';

definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('notificationSetting');

/** 开关项类型 */
interface SwitchItem {
    key: 'show' | 'sound' | 'lock';
    title: string;
    desc: string;
}

/** 开关配置 */
const items: SwitchItem[] = [
    { key: 'show', title: t('showTitle'), desc: t('showDesc') },
    { key: 'sound', title: t('soundTitle'), desc: t('soundDesc') },
    { key: 'lock', title: t('lockTitle'), desc: t('lockDesc') },
];

/** 开关状态 */
const switchState = ref<Record<SwitchItem['key'], boolean>>({
    show: true,
    sound: true,
    lock: false,
});

</script>

<template>
    <view class="notify-setting">
        <!-- ============== 顶部：返回 + 标题 ============== -->
        <Navbar :title="t('title')"></Navbar>

        <!-- ============== 开关列表（hy-cell） ============== -->
        <hy-cell class="switch-list" :border="false" size="large" :is-right-icon="false">
            <hy-cell-item
                v-for="item in items"
                :key="item.key"
                :title="item.title"
                :sub="item.desc"
            >
                <template #value>
                    <hy-switch v-model="switchState[item.key]" size="small" />
                </template>
            </hy-cell-item>
        </hy-cell>
    </view>
</template>

<style lang="scss" scoped>
.notify-setting {
    min-height: 100vh;
    padding: calc(var(--status-bar-height) + 40rpx) 40rpx
        calc(40rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
}

/* 开关列表（hy-cell）：覆盖默认背景/padding/字号/分隔线以贴合 Figma */
.switch-list {
    margin-top: 40rpx;
    --hy-cell-item-background: transparent;
}
</style>
