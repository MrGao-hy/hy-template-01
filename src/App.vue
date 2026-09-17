<template></template>

<script setup lang="ts"></script>

<style lang="scss">
@use './static/style/icons.scss' as *;

page {
    font-family:
        'Product Sans Medium', 'PingFang SC', 'Helvetica Neue', sans-serif;
    --hy-background: #ffffff;
    --hy-border-box-shadow: 0 8rpx 12rpx -8rpx rgba(0, 0, 0, 0.15);
}

/* #ifdef H5 */
.uni-tabbar {
    display: none !important;
}
/* #endif */
</style>
