import type { VeymeaProfile } from "../../content/quiz/profiles";

export type ProductImage = {
  url: string;
  altText: string;
  width?: number;
  height?: number;
};

export type ProductVariant = {
  id: string;
  title: string;
  available: boolean;
  price: { amount: string; currencyCode: string };
};

export type ProductRecommendationMeta = {
  veymeaProfiles: VeymeaProfile[];
  experienceLevel?: "beginner" | "intermediate" | "advanced";
  intensity?: "low" | "medium" | "high";
  useCase?: string[];
  coupleFriendly?: boolean;
  soloFriendly?: boolean;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productFamily: "lubricants" | "massage-candles" | "veymea-box";
  images: ProductImage[];
  variants: ProductVariant[];
  recommendationMeta?: ProductRecommendationMeta;
};

export type Collection = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productIds: string[];
};

export type Cart = {
  id: string;
  lines: Array<{ productId: string; variantId: string; quantity: number }>;
  checkoutUrl?: string;
};

export interface CommerceProvider {
  getProducts(): Promise<Product[]>;
  getProduct(handle: string): Promise<Product | null>;
  getCollections(): Promise<Collection[]>;
  getProductsByProfile(profile: VeymeaProfile): Promise<Product[]>;
  createCart(): Promise<Cart>;
  addToCart(cartId: string, variantId: string, quantity: number): Promise<Cart>;
}
