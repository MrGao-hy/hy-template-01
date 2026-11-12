<script setup lang="ts">
import type { ParamType } from '@hy-app/ui';
import { ref } from 'vue';

interface IProps {
    current: number;
}
const props = withDefaults(defineProps<IProps>(), {});
const emit = defineEmits(['change']);
const tabs = ref([
    {
        icon: 'home',
    },
    {
        icon: 'search',
    },
    {
        icon: 'shopping-bag',
    },
    {
        icon: 'mine',
    },
]);

const onChange = (param: ParamType) => {
    console.log(param);
    const val = param.value;
    emit('change');
    switch (val) {
        case 0:
            uni.switchTab({ url: '/pages/index/Index' });
            break;
        case 1:
            uni.switchTab({ url: '/pages/search/Index' });
            break;
        case 2:
            uni.switchTab({ url: '/pages/order/Index' });
            break;
        case 3:
            uni.switchTab({ url: '/pages/mine/Index' });
            break;
    }
};
</script>

<template>
    <hy-tabbar-group
        v-model="props.current"
        shape="circle"
        fixed
        @change="onChange"
        active-color="#2463EB"
        inactive-color="#E6E8EC"
        safe-area-inset-bottom
    >
        <hy-tabbar-item
            v-for="(item, index) in tabs"
            :key="index"
            :icon="item.icon"
        ></hy-tabbar-item>
    </hy-tabbar-group>
</template>
