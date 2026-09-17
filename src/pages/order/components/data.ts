import type { OrderItem } from './types';

/** 商品图（复用 fluxstore 素材） */
const IMG = {
    sportwear:
        '/static/images/fluxstore/image_550c305749d6c4a8efe5849bb6952d297db4e2c1.png',
    sweater: '/static/images/fluxstore/home_swiper_1.png',
    tshirt: '/static/images/fluxstore/home_good_2.png',
    maxi: '/static/images/fluxstore/image_ab2f4ed424ae6384ab7d20a54f772bf15d7db671.png',
};

/** 模拟订单数据（按 FluxStore 常规订单流程占位，待设计稿校准） */
export const mockOrders: OrderItem[] = [
    {
        no: '256022',
        date: '2026-09-12',
        status: 'processing',
        products: [
            {
                id: 1,
                name: 'Sportwear Set',
                image: IMG.sportwear,
                spec: 'Size: L | Color: Cream',
                price: 80.0,
            },
            {
                id: 2,
                name: 'Turtleneck Sweater',
                image: IMG.sweater,
                spec: 'Size: M | Color: Brown',
                price: 39.99,
            },
        ],
        total: 119.99,
    },
    {
        no: '256018',
        date: '2026-09-08',
        status: 'completed',
        products: [
            {
                id: 3,
                name: 'Cotton T-shirt',
                image: IMG.tshirt,
                spec: 'Size: S | Color: White',
                price: 30.0,
            },
        ],
        total: 30.0,
    },
    {
        no: '256011',
        date: '2026-09-02',
        status: 'completed',
        products: [
            {
                id: 4,
                name: 'Maxi Dress',
                image: IMG.maxi,
                spec: 'Size: M | Color: Green',
                price: 68.0,
            },
            {
                id: 1,
                name: 'Sportwear Set',
                image: IMG.sportwear,
                spec: 'Size: L | Color: Cream',
                price: 80.0,
            },
        ],
        total: 148.0,
    },
    {
        no: '256005',
        date: '2026-08-25',
        status: 'cancelled',
        products: [
            {
                id: 3,
                name: 'Cotton T-shirt',
                image: IMG.tshirt,
                spec: 'Size: S | Color: White',
                price: 30.0,
            },
        ],
        total: 30.0,
    },
];
