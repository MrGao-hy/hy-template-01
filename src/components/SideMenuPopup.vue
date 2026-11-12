<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import { IconConfig, useTranslate } from '@hy-app/ui';
import type { ThemeModeType } from '@hy-app/ui';
import { useToolsStore } from '@/store';
import { Config } from '@/config';
import type { SideMenuItem } from '@/pages/index/components/types';
import Icon from '@/components/Icon.vue';

const show = defineModel('show', { default: false });

const props = withDefaults(
    defineProps<{
        /** 默认激活的菜单项 id */
        activeId?: number;
    }>(),
    { activeId: 1 }
);

const emit = defineEmits<{
    (e: 'select', item: SideMenuItem): void;
}>();

const { t } = useTranslate('home');

/** 全局工具状态：暗色模式由 tools store 统一管理（App.ku.vue 注入 hy-config-provider） */
const toolsStore = useToolsStore();
const { darkMode } = storeToRefs(toolsStore);

// ============== 模拟数据 ==============

/** 当前登录用户（Figma 设计稿模拟数据） */
const userInfo = {
    name: 'Sunie Pham',
    email: 'sunieux@gmail.com',
    avatar: `${Config.IMG}/avatar.jpg`,
};

/** 主题切换选项（value 对应 ThemeModeType） */
const themeOptions = [
    {
        value: 'light',
        name: 'light',
        icon: 'sun',
    },
    {
        value: 'dark',
        name: 'dark',
        icon: 'moon',
    },
];

/** 主菜单：Homepage / Discover / My Order / My profile */
const mainMenuList = computed<SideMenuItem[]>(() => [
    { id: 1, nameKey: 'homepage', icon: IconConfig.HOME },
    { id: 2, nameKey: 'discover', icon: IconConfig.SEARCH },
    { id: 3, nameKey: 'myOrder', icon: IconConfig.ORDER },
    { id: 4, nameKey: 'myProfile', icon: IconConfig.MINE },
]);

/** 其他菜单：Setting / Support / About us */
const otherMenuList = computed<SideMenuItem[]>(() => [
    { id: 5, nameKey: 'setting', icon: IconConfig.SETTING },
    { id: 6, nameKey: 'support', icon: IconConfig.MESSAGE },
    { id: 7, nameKey: 'aboutUs', icon: IconConfig.NOTICE_CIRCLE },
]);

/** 当前激活的菜单项 */
const activeMenuId = ref<number>(props.activeId);

// ============== 事件处理 ==============

/** 菜单项点击：hy-cell 派发 name（菜单 id），激活、关闭弹窗并通知父级（跳转由父页面执行） */
const onCellClick = (name: string | number) => {
    const item = [...mainMenuList.value, ...otherMenuList.value].find(
        i => i.id === name
    );
    if (!item) return;
    activeMenuId.value = item.id;
    emit('select', item);
    show.value = false;
};

/** 主题切换：直接写入 tools store，由 App.ku.vue 的 hy-config-provider 响应 */
const onThemeChange = (value: string | number) => {
    darkMode.value = value as ThemeModeType;
};
</script>

<template>
    <hy-popup
        v-model:show="show"
        mode="left"
        safe-area-inset-top
        close-on-click-overlay
        :custom-style="{ width: '586rpx' }"
        round="48rpx"
        :z-index="99999"
        @close="show = false"
    >
        <view class="side-menu">
            <scroll-view
                scroll-y
                :show-scrollbar="false"
                class="side-menu__scroll"
            >
                <!-- ============== 用户信息头部 ============== -->
                <view class="side-menu__header">
                    <hy-avatar
                        :src="userInfo.avatar"
                        :custom-style="{ width: '104rpx', height: '104rpx' }"
                    />
                    <view class="side-menu__user">
                        <text class="side-menu__username">{{
                            userInfo.name
                        }}</text>
                        <text class="side-menu__email">{{
                            userInfo.email
                        }}</text>
                    </view>
                </view>

                <!-- ============== 主菜单 ============== -->
                <hy-cell
                    class="side-menu__group"
                    :border="false"
                    :is-right-icon="false"
                    clickable
                    @click="onCellClick"
                >
                    <hy-cell-item
                        v-for="item in mainMenuList"
                        :key="item.id"
                        :name="item.id"
                        :title="t(`sideMenu.${item.nameKey}`)"
                        :icon="{
                            name: item.icon,
                            customStyle: {
                                fontSize: '36rpx',
                                lineHeight: '36rpx',
                            },
                        }"
                        :border="false"
                        :custom-class="
                            activeMenuId === item.id
                                ? 'side-menu__item--active'
                                : ''
                        "
                    />
                </hy-cell>

                <!-- ============== 其他分组 ============== -->
                <view class="side-menu__group-title">
                    {{ t('sideMenu.other') }}
                </view>
                <hy-cell
                    class="side-menu__group"
                    :border="false"
                    :is-right-icon="false"
                    clickable
                    @click="onCellClick"
                >
                    <hy-cell-item
                        v-for="item in otherMenuList"
                        :key="item.id"
                        :name="item.id"
                        :title="t(`sideMenu.${item.nameKey}`)"
                        :icon="{
                            name: item.icon,
                            customStyle: {
                                fontSize: '36rpx',
                                lineHeight: '36rpx',
                            },
                        }"
                        :border="false"
                        :custom-class="
                            activeMenuId === item.id
                                ? 'side-menu__item--active'
                                : ''
                        "
                    />
                </hy-cell>
            </scroll-view>

            <!-- ============== 底部主题切换 ============== -->
            <view class="side-menu__theme">
                <hy-subsection
                    :list="themeOptions"
                    :model-value="darkMode"
                    @update:model-value="onThemeChange"
                >
                    <template #default="{ record }">
                        <Icon :name="record.icon as string"></Icon>
                        <text class="side-menu__theme--text">
                            {{ t(`sideMenu.${record.name}`) }}
                        </text>
                    </template>
                </hy-subsection>
            </view>
        </view>
    </hy-popup>
</template>

<style lang="scss" scoped>
.side-menu {
    /* ============== 弹窗整体：铺满内容区，纵向 flex 布局 ============== */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;

    &__scroll {
        flex: 1;
        height: 0;
    }

    /* ============== 用户信息头部 ============== */
    &__header {
        display: flex;
        align-items: center;
        gap: 34rpx;
        padding: 48rpx 104rpx 102rpx;
    }

    &__user {
        display: flex;
        flex-direction: column;
        gap: 12rpx;
        min-width: 0;
    }

    &__username {
        font-size: 32rpx;
        font-weight: 700;
        line-height: 46rpx;
    }

    &__email {
        font-size: 24rpx;
        font-weight: 500;
        line-height: 30rpx;
        letter-spacing: -0.24rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    /* ============== 菜单分组（hy-cell） ============== */
    &__group {
        --hy-cell-item-icon-margin: 40rpx;

        :deep(.hy-cell-item) {
            height: 110rpx;
            margin: 0 26rpx;
            padding: 0 0 0 40rpx;
            border-radius: 20rpx;
            font-size: 32rpx;
            font-weight: 700;
            color: $hy-text-color--3;
            transition: background-color 0.2s;

            /* #ifdef H5 */
            cursor: pointer;
            /* #endif */

            &.side-menu__item--active {
                background-color: $hy-background--active;
                color: $hy-text-color;
            }
        }
    }

    &__group-title {
        padding-left: 66rpx;
        margin: 48rpx 0;
        font-size: 28rpx;
        font-weight: 500;
        line-height: 40rpx;
        color: $hy-text-color--3;
        text-transform: uppercase;
    }

    /* ============== 底部主题切换 ============== */
    &__theme {
        margin: 24rpx 66rpx calc(120rpx + env(safe-area-inset-bottom));
        --hy-subsection-radius: 100px;

        &--text {
            font-size: 26rpx;
            margin-left: 10rpx;
        }
    }
}
</style>
