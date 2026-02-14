
export interface Product {
    id: number;
    name: string;
    category: Category;
    material: string;
    price: number;
}

export const mockCategories: Category[] = [
    { id: 1, name: "Bags", description: "Premium leather bags for all occasions", productCount: 120, isActive: true },
    { id: 2, name: "Accessories", description: "Minimalist leather accessories", productCount: 45, isActive: true },
    { id: 3, name: "Wallets", description: "Handcrafted wallets and card holders", productCount: 89, isActive: true },
    { id: 4, name: "Belts", description: "Genuine leather belts with premium buckles", productCount: 32, isActive: true },
];

export const mockProducts: Product[] = Array.from({ length: 500 }, (_, i) => ({
    id: i + 1,
    name: i % 2 === 0 ? `Premium Bag ${i + 1}` : `Leather Wallet ${i + 1}`,
    category: mockCategories[i % mockCategories.length],
    material: i % 3 === 0 ? "Full Grain" : i % 3 === 1 ? "Veg Tan" : "Suede",
    price: 300000 + (i * 20000),
}));

export const fetchProducts = async (params: {
    page: number;
    limit: number;
    search?: string;
    sort?: string;
    dir?: "asc" | "desc";
}) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    let filtered = [...mockProducts];

    if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.category.name.toLowerCase().includes(q) ||
                p.material.toLowerCase().includes(q)
        );
    }

    if (params.sort) {
        filtered.sort((a, b) => {
            const aVal = (a as any)[params.sort!];
            const bVal = (b as any)[params.sort!];
            if (aVal < bVal) return params.dir === "asc" ? -1 : 1;
            if (aVal > bVal) return params.dir === "asc" ? 1 : -1;
            return 0;
        });
    }

    const total = filtered.length;
    const start = (params.page - 1) * params.limit;
    const items = filtered.slice(start, start + params.limit);

    return {
        items,
        total,
    };
};

export const fetchProductById = async (id: number) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    const product = mockProducts.find((p) => p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
};

export interface Category {
    id: number;
    name: string;
    description: string;
    productCount: number;
    isActive: boolean;
}

export const fetchCategories = async (params: {
    page: number;
    limit: number;
    search?: string;
    sort?: string;
    dir?: "asc" | "desc";
}) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    let filtered = [...mockCategories];

    if (params.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter((c) => 
            c.name.toLowerCase().includes(q) || 
            c.description.toLowerCase().includes(q)
        );
    }

    if (params.sort) {
        filtered.sort((a, b) => {
            const aVal = (a as any)[params.sort!];
            const bVal = (b as any)[params.sort!];
            if (aVal < bVal) return params.dir === "asc" ? -1 : 1;
            if (aVal > bVal) return params.dir === "asc" ? 1 : -1;
            return 0;
        });
    }

    const total = filtered.length;
    const start = (params.page - 1) * params.limit;
    const items = filtered.slice(start, start + params.limit);

    return {
        items,
        total,
    };
};

export const fetchCategoryById = async (id: number) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const category = mockCategories.find((c) => c.id === id);
    if (!category) throw new Error("Category not found");
    return category;
};
