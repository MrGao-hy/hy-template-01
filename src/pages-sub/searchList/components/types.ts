/** 搜索结果商品 */
export interface SearchResultProduct {
    /** 商品 ID */
    id: number;
    /** 商品名称 */
    name: string;
    /** 现价 */
    price: number;
    /** 原价（划线价） */
    oldPrice?: number;
    /** 评价数 */
    reviews: number;
    /** 评分 */
    rating: number;
    /** 商品图 */
    image: string;
}
