export interface Product {
    id: number;
    brand: string;
    name: string;
    perfumeType: string;
    size: number;
    container: string;
    gender: string;
    priceInDollar: number;
    priceInRub: number;
    photoPath: string;
    quantity: number;
    isHit:boolean;
    isNew:boolean;
}

export class Product implements Product {}