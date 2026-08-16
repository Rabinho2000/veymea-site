import type { VeymeaProfile } from "../../content/quiz/profiles";
import type { CommerceProvider, Product, Collection, Cart } from "./types";

const mockProducts: Product[] = [
  {
    id: "mock-lubricant-01",
    handle: "veymea-lubrificante",
    title: "Veymea Lubrificante",
    description: "Sensação e conforto, sem excessos.",
    productFamily: "lubricants",
    images: [],
    variants: [
      {
        id: "mock-lubricant-01-v1",
        title: "Default",
        available: false,
        price: { amount: "0", currencyCode: "EUR" },
      },
    ],
    recommendationMeta: {
      veymeaProfiles: ["warm", "fresh"],
      experienceLevel: "beginner",
      coupleFriendly: true,
      soloFriendly: true,
    },
  },
  {
    id: "mock-candle-01",
    handle: "veymea-vela-de-massagem",
    title: "Veymea Vela de Massagem",
    description: "Calor que se transforma em toque.",
    productFamily: "massage-candles",
    images: [],
    variants: [
      {
        id: "mock-candle-01-v1",
        title: "Default",
        available: false,
        price: { amount: "0", currencyCode: "EUR" },
      },
    ],
    recommendationMeta: {
      veymeaProfiles: ["slow", "warm"],
      experienceLevel: "beginner",
      coupleFriendly: true,
      soloFriendly: true,
    },
  },
  {
    id: "mock-box-01",
    handle: "veymea-box",
    title: "Veymea Box",
    description: "Uma curadoria pensada a dois.",
    productFamily: "veymea-box",
    images: [],
    variants: [
      {
        id: "mock-box-01-v1",
        title: "Default",
        available: false,
        price: { amount: "0", currencyCode: "EUR" },
      },
    ],
    recommendationMeta: {
      veymeaProfiles: ["play", "slow", "warm", "fresh"],
      coupleFriendly: true,
      soloFriendly: false,
    },
  },
];

const mockCollections: Collection[] = [
  {
    id: "mock-col-all",
    handle: "all",
    title: "Todos os produtos",
    description: "A primeira experiência Veymea.",
    productIds: mockProducts.map((p) => p.id),
  },
];

export class MockCommerceProvider implements CommerceProvider {
  async getProducts(): Promise<Product[]> {
    return mockProducts;
  }

  async getProduct(handle: string): Promise<Product | null> {
    return mockProducts.find((p) => p.handle === handle) ?? null;
  }

  async getCollections(): Promise<Collection[]> {
    return mockCollections;
  }

  async getProductsByProfile(profile: VeymeaProfile): Promise<Product[]> {
    return mockProducts.filter((p) =>
      p.recommendationMeta?.veymeaProfiles.includes(profile),
    );
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
