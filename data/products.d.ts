export interface Product {
    id: number;
    slug: string;
    name: string;
    category: string;
    image: string;
    description: string;
    benefits: string[];
    applications: string[];
    spec_models?: Record<string, string | number>[];
    faqs?: {
        question: string;
        answer: string;
    }[];
}
export declare const products: Product[];
