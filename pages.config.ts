import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages';

export default defineUniPages({
    homePage: 'pages/index/Index',
    globalStyle: {
        navigationBarTitleText: '移动端模板一',
        navigationBarBackgroundColor: '@navBgColor',
        navigationBarTextStyle: '@navTxtStyle',
        backgroundColor: '@bgColor',
        backgroundTextStyle: '@bgTxtStyle',
        backgroundColorTop: '@bgColorTop',
        backgroundColorBottom: '@bgColorBottom',
    },
    tabBar: {
        custom: true,
        color: '#7A7E83',
        selectedColor: '#3cc51f',
        borderStyle: 'black',
        backgroundColor: '#f8f8f8',
        list: [
            {
                pagePath: 'pages/index/Index',
                text: '首页',
            },
            {
                pagePath: 'pages/search/Index',
                text: '搜索',
            },
            {
                pagePath: 'pages/order/Index',
                text: '订单',
            },
            {
                pagePath: 'pages/mine/Index',
                text: '我的',
            },
        ],
    },
    easycom: {
        autoscan: true,
        custom: {
            '^hy-(.*)': '@hy-app/ui/components/hy-$1/hy-$1.vue',
        },
    },
});
