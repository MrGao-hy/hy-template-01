/** 侧边菜单项对应的跳转路由 */
const SIDE_MENU_ROUTES: Record<number, string> = {
    1: '/pages/index/Index',
    2: '/pages/search/Index',
    3: '/pages/order/Index',
    4: '/pages/mine/Index',
    5: '/pages-sub/setting/Index',
    6: '/pages-sub/chat-support/Index',
};

/** TabBar 页面路由集合（需使用 switchTab 跳转） */
const TAB_ROUTES = new Set([
    '/pages/index/Index',
    '/pages/search/Index',
    '/pages/order/Index',
    '/pages/mine/Index',
]);

/**
 * 侧边菜单点击后跳转对应页面
 * @param id 菜单项 id（7 = About us，仅提示版本信息）
 */
export const openSideMenuRoute = (id: number) => {
    const url = SIDE_MENU_ROUTES[id];
    if (!url) {
        uni.showToast({ title: 'GemStore v1.0.0', icon: 'none' });
        return;
    }
    if (TAB_ROUTES.has(url)) {
        uni.switchTab({ url });
    } else {
        uni.navigateTo({ url });
    }
};
