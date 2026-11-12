<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { IconConfig, useTranslate } from '@hy-app/ui';

/**
 * 在线客服聊天页（Figma 画板 8782:3462 chat support）
 * 头部 Admin/Online + 消息气泡列表 + 底部输入框
 */
definePage({
    style: {
        navigationStyle: 'custom',
    },
});

const { t } = useTranslate('chat');

/** 消息方向 */
type MsgFrom = 'admin' | 'me';

/** 消息项类型 */
interface ChatMessage {
    id: number;
    from: MsgFrom;
    content: string;
    time: string;
}

/** 初始消息（Figma 设计稿对话） */
const messages = ref<ChatMessage[]>([
    { id: 1, from: 'admin', content: t('msgFrom'), time: t('timeFrom') },
    { id: 2, from: 'me', content: t('msgTo'), time: t('timeTo') },
]);

/** 输入内容 */
const draft = ref('');

/** 滚动区域滚动位置 */
const scrollTop = ref(0);

// ============== 事件处理 ==============

/** 返回上一页 */
const onBack = () => {
    uni.navigateBack();
};

/** 发送消息 */
const onSend = () => {
    const content = draft.value.trim();
    if (!content) return;

    messages.value.push({
        id: Date.now(),
        from: 'me',
        content,
        time: t('timeTo'),
    });
    draft.value = '';

    nextTick(() => {
        scrollTop.value = messages.value.length * 400;
    });
};
</script>

<template>
    <view class="chat-page">
        <!-- ============== 顶部：返回 + Admin/Online ============== -->
        <view class="chat-page__header">
            <view class="chat-page__back" @tap="onBack">
                <hy-icon :name="IconConfig.LEFT" size="36rpx" color="#1a1a1a" />
            </view>
            <hy-icon
                :name="IconConfig.CUSTOMER_SERVICE"
                size="40rpx"
                color="#343434"
            />
            <view class="chat-page__info">
                <text class="chat-page__name">{{ t('admin') }}</text>
                <view class="chat-page__status">
                    <view class="chat-page__dot" />
                    <text class="chat-page__online">{{ t('online') }}</text>
                </view>
            </view>
        </view>

        <!-- ============== 消息列表 ============== -->
        <scroll-view
            scroll-y
            class="chat-body"
            :scroll-top="scrollTop"
            :show-scrollbar="false"
        >
            <view
                v-for="msg in messages"
                :key="msg.id"
                class="chat-msg"
                :class="`chat-msg--${msg.from}`"
            >
                <text class="chat-msg__time">{{ msg.time }}</text>
                <view class="chat-msg__bubble">{{ msg.content }}</view>
            </view>
            <view class="chat-body__placeholder" />
        </scroll-view>

        <!-- ============== 底部输入 ============== -->
        <view class="chat-input">
            <hy-input
                v-model="draft"
                :placeholder="t('placeholder')"
                :border="false"
                confirm-type="send"
                custom-class="chat-input__field"
                @confirm="onSend"
            />
            <view class="chat-input__send" @tap="onSend">
                <hy-icon :name="IconConfig.SEND" size="36rpx" color="#ffffff" />
            </view>
        </view>
    </view>
</template>

<style lang="scss" scoped>
.chat-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: calc(var(--status-bar-height) + 24rpx) 40rpx
        calc(24rpx + env(safe-area-inset-bottom));
    box-sizing: border-box;
    background-color: $hy-background;

    &__header {
        display: flex;
        align-items: center;
        gap: 24rpx;
        height: 96rpx;
    }

    &__back {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56rpx;
        height: 56rpx;
        margin-left: -16rpx;
    }

    &__info {
        display: flex;
        flex-direction: column;
        gap: 4rpx;
    }

    &__name {
        font-size: 30rpx;
        font-weight: 700;
        color: $hy-text-color;
    }

    &__status {
        display: flex;
        align-items: center;
        gap: 10rpx;
    }

    &__dot {
        width: 14rpx;
        height: 14rpx;
        background-color: #3ac569;
        border-radius: $hy-radius-circle;
    }

    &__online {
        font-size: 22rpx;
        color: #3ac569;
    }
}

/* 消息列表 */
.chat-body {
    flex: 1;
    min-height: 0;
    margin-top: 16rpx;

    &__placeholder {
        height: 24rpx;
    }
}

.chat-msg {
    display: flex;
    flex-direction: column;
    margin-bottom: 32rpx;

    &--admin {
        align-items: flex-start;

        .chat-msg__bubble {
            background-color: $hy-background--empty;
            color: $hy-text-color;
            border-radius: 32rpx 32rpx 32rpx 8rpx;
        }
    }

    &--me {
        align-items: flex-end;

        .chat-msg__bubble {
            background-color: #343434;
            color: var(--hy-text-color--inverse, #ffffff);
            border-radius: 32rpx 32rpx 8rpx 32rpx;
        }
    }

    &__time {
        margin-bottom: 12rpx;
        font-size: 20rpx;
        color: $hy-text-color--3;
    }

    &__bubble {
        max-width: 76%;
        padding: 24rpx 32rpx;
        font-size: 28rpx;
        line-height: 1.5;
        word-break: break-word;
    }
}

/* 底部输入 */
.chat-input {
    display: flex;
    align-items: center;
    gap: 20rpx;
    padding: 16rpx 16rpx 16rpx 32rpx;
    background-color: $hy-background--empty;
    border-radius: 100rpx;

    &__send {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 72rpx;
        height: 72rpx;
        background-color: #343434;
        border-radius: $hy-radius-circle;

        &:active {
            opacity: 0.85;
        }
    }
}

:deep(.chat-input__field) {
    font-size: 28rpx;
}
</style>
