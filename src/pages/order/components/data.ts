import { Config } from '@/config';
import type { OrderItem } from './types';

/** 商品图（复用 fluxstore 素材） */
const IMG = {
    sportwear: `${Config.IMG}/good_1.png`,
    sweater: `${Config.IMG}/good_2.png`,
    tshirt: `${Config.IMG}/good_3.png`,
    maxi: `${Config.IMG}/good_4.png`,
};

/** 模拟订单数据（按 FluxStore 常规订单流程占位，待设计稿校准） */
export const mockOrders: OrderItem[] = [
    {
        no: '256022',
        date: '2026-09-12',
        status: 'processing',
        trackingNo: 'IK287368838',
        address: 'SBI Building, Software Park',
        products: [
            {
                id: 1,
                name: 'Sportwear Set',
                image: IMG.sportwear,
                spec: 'Size: L | Color: Cream',
                price: 80.0,
                quantity: 1,
            },
            {
                id: 2,
                name: 'Turtleneck Sweater',
                image: IMG.sweater,
                spec: 'Size: M | Color: Brown',
                price: 39.99,
                quantity: 1,
            },
        ],
        total: 119.99,
    },
    {
        no: '256018',
        date: '2026-09-08',
        status: 'completed',
        trackingNo: 'IK287368830',
        address: 'SBI Building, Software Park',
        products: [
            {
                id: 3,
                name: 'Cotton T-shirt',
                image: IMG.tshirt,
                spec: 'Size: S | Color: White',
                price: 30.0,
                quantity: 1,
            },
        ],
        total: 30.0,
    },
    {
        no: '256011',
        date: '2026-09-02',
        status: 'completed',
        trackingNo: 'IK987362341',
        address: 'SBI Building, Software Park',
        products: [
            {
                id: 4,
                name: 'Maxi Dress',
                image: IMG.maxi,
                spec: 'Size: M | Color: Green',
                price: 68.0,
                quantity: 1,
            },
            {
                id: 1,
                name: 'Sportwear Set',
                image: IMG.sportwear,
                spec: 'Size: L | Color: Cream',
                price: 80.0,
                quantity: 1,
            },
        ],
        total: 148.0,
    },
    {
        no: '256005',
        date: '2026-08-25',
        status: 'cancelled',
        trackingNo: 'IK287368826',
        address: 'SBI Building, Software Park',
        products: [
            {
                id: 3,
                name: 'Cotton T-shirt',
                image: IMG.tshirt,
                spec: 'Size: S | Color: White',
                price: 30.0,
                quantity: 1,
            },
        ],
        total: 30.0,
    },
];
