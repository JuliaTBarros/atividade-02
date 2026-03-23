import type {Product, ProductsResponse} from "@/features/products/model/product.types";

const BASE_URL = "https://dummyjson.com";

export async function fetchProducts(
    page: number = 1,
    limit: number = 10
): Promise<ProductsResponse> {
    const skip = (page - 1) * limit;
    const response = await fetch(`${BASE_URL}/products?limit=${limit}&skip=${skip}`);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    return response.json();
}

export async function fetchAllProducts(limitPerPage: number = 50): Promise<Product[]> {
    const firstPage = await fetchProducts(1, limitPerPage);

    if (firstPage.total <= firstPage.products.length) {
        return firstPage.products;
    }

    const totalPages = Math.ceil(firstPage.total / limitPerPage);
    const remainingPageRequests = Array.from({length: totalPages - 1}, (_, index) =>
        fetchProducts(index + 2, limitPerPage),
    );
    const remainingPages = await Promise.all(remainingPageRequests);

    return [
        ...firstPage.products,
        ...remainingPages.flatMap((page) => page.products),
    ].slice(0, firstPage.total);
}

export async function fetchProductById(id: number): Promise<Product> {
    const response = await fetch(`${BASE_URL}/products/${id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch product");
    }

    return response.json();
}

