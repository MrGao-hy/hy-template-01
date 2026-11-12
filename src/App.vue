<template></template>

<script setup lang="ts"></script>

<style lang="scss">
@use './static/style/icons.scss' as *;
@use './static/style/_var.scss' as *;

page {
    font-family:
        'Product Sans Medium', 'PingFang SC', 'Helvetica Neue', sans-serif;
}

/* #ifdef H5 */
.uni-tabbar {
    display: none !important;
}
/* #endif */
</style>
