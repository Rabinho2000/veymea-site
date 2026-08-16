import type { VeymeaProfile } from "../../content/quiz/profiles";
import type { CommerceProvider, Product, Collection, Cart } from "./types";

export class MockCommerceProvider implements CommerceProvider {
  async getProducts(): Promise<Product[]> {
    return [];
  }

  async getProduct(_handle: string): Promise<Product | null> {
    return null;
  }

  async getCollections(): Promise<Collection[]> {
    return [];
  }

  async getProductsByProfile(_profile: VeymeaProfile): Promise<Product[]> {
    return [];
  }

  async createCart(): Promise<Cart> {
    return { id: `mock-cart-${Date.now()}`, lines: [] };
  }

  async addToCart(
    cartId: string,
    variantId: string,
    quantity: number,
  ): Promise<Cart> {
    return {
      id: cartId,
      lines: [{ productId: "mock", variantId, quantity }],
    };
  }
}
