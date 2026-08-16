import { MockCommerceProvider } from "./mock";
import type { CommerceProvider } from "./types";

export function getCommerceProvider(): CommerceProvider {
  return new MockCommerceProvider();
}
