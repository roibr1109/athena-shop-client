import { Brand } from "./enums/Brand";

export interface BasicShoe {
    id: string;
    brands: Brand[];
    model: string;
    price: number;
    rank: number;
    numberOfRates: number;
}

