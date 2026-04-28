import { Language } from "../language";

export interface ProductTranslation {
    product_id: string;
    language_id: string;
    language: Language
    name: string;
    description: string;
}

export interface ProductCategoryTranslation {
    category_id: string;
    language_id: string;
    name: string;
}

export interface ProductMaterialTranslation {
    material_id: string;
    language_id: string;
    name: string;
}

export interface ProductFoundationTranslation {
    foundation_id: string;
    language_id: string;
    name: string;
}

export interface ProductImage {
    id: string;
    product_id: string;
    url: string;
    created_at: string;
    updated_at: string;
}

export interface Category {
    id: string;
    translations: ProductCategoryTranslation[];
    created_at: string;
    updated_at: string;
}

export interface Material {
    id: string;
    translations: ProductMaterialTranslation[];
    created_at: string;
    updated_at: string;
}

export interface Foundation {
    id: string;
    translations: ProductFoundationTranslation[];
    created_at: string;
    updated_at: string;
}

export interface Product {
    id: string;
    price: number;
    status: string;
    created_at: string;
    updated_at: string;
    category_ids: string[];
    material_ids: string[];
    foundation_ids: string[];
    product_categories: Category[];
    product_foundations: Foundation[];
    product_materials: Material[];
    images: ProductImage[];
    translations: ProductTranslation[];
}