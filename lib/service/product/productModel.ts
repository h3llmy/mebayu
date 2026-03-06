export interface Product {
    id: string;
    name: string;
    categories: Category[];
    product_materials: Material[];
    price: number;
}

export interface Category {
    id: string;
    name: string;
}

export interface Material {
    id: string;
    name: string;
}