/** 颜色选项 */
export interface ColorOption {
    /** 选项键名 */
    key: string;
    /** 色值 */
    value: string;
}

/** 评价条目 */
export interface ReviewItem {
    /** 评价 ID */
    id: number;
    /** 用户名 */
    name: string;
    /** 头像 */
    avatar: string;
    /** 发布时间 */
    time: string;
    /** 评分 */
    rating: number;
    /** 评价内容 */
    content: string;
}

/** 评分分布条 */
export interface RatingBar {
    /** 星级 */
    star: number;
    /** 占比（0-100） */
    percent: number;
}

/** 相似商品 */
export interface SimpleProduct {
    /** 商品 ID */
    id: number;
    /** 商品名称 */
    name: string;
    /** 价格 */
    price: number;
    /** 商品图 */
    image: string;
}
