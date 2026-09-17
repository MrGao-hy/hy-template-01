<script lang="ts" setup>
interface IProps {
    name: string;
    color?: string;
    size?: string | number;
}
const props = withDefaults(defineProps<IProps>(), {
    name: '',
});
</script>

<template>
    <hy-icon custom-prefix="icon" :name="name" :color="color" :size="size" />
</template>
