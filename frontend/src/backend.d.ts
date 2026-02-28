import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: string;
    name: string;
    description: string;
    available: boolean;
    imageUrl: string;
    category: string;
    price: bigint;
}
export interface backendInterface {
    addProduct(product: Product): Promise<void>;
    deleteProduct(id: string): Promise<void>;
    getProductById(id: string): Promise<Product>;
    getProducts(): Promise<Array<Product>>;
    initialize(): Promise<void>;
    updateProduct(product: Product): Promise<void>;
}
