<script setup lang="ts">
import type { CSSProperties } from 'vue';

interface IProps {
    customStyle?: CSSProperties;
    padding?: string | number;
}
const props = withDefaults(defineProps<IProps>(), {});
</script>

<template>
    <hy-config-provider :custom-style="customStyle" :padding="padding">
        <slot></slot>

        <hy-toast></hy-toast>
        <hy-modal></hy-modal>
    </hy-config-provider>
</template>

<style lang="scss" scoped></style>
