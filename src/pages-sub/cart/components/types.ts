/** 购物车商品条目 */
export interface CartItem {
    /** 商品 ID */
    id: number;
    /** 商品名称 */
    name: string;
    /** 单价 */
    price: number;
    /** 规格描述（如 Size: L | Color: Cream） */
    spec: string;
    /** 商品图 */
    image: string;
    /** 角标色块颜色（同时作为勾选框选中色） */
    badgeColor: string;
    /** 可选颜色列表 */
    colors: string[];
    /** 数量 */
    quantity: number;
}
