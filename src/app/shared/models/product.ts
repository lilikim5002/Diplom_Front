export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    MyProperty: string;
    brand: string;
    type: string;
}

export class Product implements Product {}