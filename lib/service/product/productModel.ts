export interface Product {
    id: string;
    name: string;
    description: string;
    categories: Category[];
    product_materials: Material[];
    price: number;
    images?: { url: string;[key: string]: any }[];
    status: string;
}


export interface Category {
    id: string;
    name: string;
}

export interface Material {
    id: string;
    name: string;
}