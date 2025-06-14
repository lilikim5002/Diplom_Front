export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    brand: string;
    productType: string;
}

export class Product implements Product {}