import { BasicShoe } from "./BasicShoe";

export interface ShoeItem { 
    id: string;
    size: number;
    dateCreated: Date;
    datePurchased: Date;
    userRating: number;
    basicShoe: BasicShoe;
};