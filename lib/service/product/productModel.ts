export interface Product {
    id: number;
    name: string;
    categories: Category[];
    product_materials: Material[];
    price: number;
}

export interface Category {
    id: number;
    name: string;
}

export interface Material {
    id: number;
    name: string;
}