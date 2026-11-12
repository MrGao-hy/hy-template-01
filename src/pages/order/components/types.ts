/** 订单状态 */
export type OrderStatus = 'processing' | 'completed' | 'cancelled';

/** 订单商品 */
export interface OrderProduct {
    /** 商品 ID */
    id: number;
    /** 商品名称 */
    name: string;
    /** 商品图 */
    image: string;
    /** 规格 */
    spec: string;
    /** 单价 */
    price: number;
}

/** 订单 */
export interface OrderItem {
    /** 订单号 */
    no: string;
    /** 下单日期 */
    date: string;
    /** 订单状态 */
    status: OrderStatus;
    /** 商品列表 */
    products: OrderProduct[];
    /** 合计金额 */
    total: number;
    /** 数量 */
    quantity: number;
}

/** 订单评价 */
export interface OrderReview {
    /** 商品 ID */
    productId: number;
    /** 评分（1-5） */
    rating: number;
    /** 评价内容 */
    content: string;
}
