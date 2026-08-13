import type { Metadata } from "next";
import VeymeaSite from "./VeymeaSite";

export const metadata: Metadata = {
  title: "Veymea — Intimacy. Discovery. Connection.",
  description: "Sexual wellness para casais. Descubram novas sensações, ao vosso ritmo — com intimidade, curiosidade e zero tabus.",
};

export default function Home() {
  return <VeymeaSite />;
}
