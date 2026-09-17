/** 分类导航类型 */
export interface CategoryNav {
    id: number;
    nameKey: string;
    icon: string;
    active?: boolean;
}

/** 轮播图类型 */
export interface BannerItem {
    id: number;
    image: string;
    titleKey: string;
    subtitleKey: string;
}

/** 商品类型 */
export interface Product {
    id: number;
    nameKey: string;
    price: number;
    originalPrice?: number;
    image: string;
    tag?: string;
}

/** 推荐商品类型 */
export interface RecommendedProduct {
    id: number;
    nameKey: string;
    price: number;
    image: string;
}

/** 合集横幅类型 */
export interface CollectionBanner {
    id: number;
    tagKey: string;
    titleKey: string;
    subtitleKey?: string;
    image: string;
}

/** 分类展示类型 */
export interface CategoryShowcase {
    id: number;
    categoryKey: string;
    titleKey: string;
    image: string;
}

/** 侧边工具列表菜单项类型 */
export interface SideMenuItem {
    id: number;
    /** 国际化 key（home.sideMenu 下） */
    nameKey: string;
    /** 图标名称（IconConfig） */
    icon: string;
}
