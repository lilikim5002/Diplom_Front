export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    productBrand: string;
    productType: string;
}

export class Product implements Product {}