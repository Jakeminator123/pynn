import type { Metadata } from "next";
import ForDevsClient from "./ForDevsClient";

export const metadata: Metadata = {
  title: "For Developers - Technical Documentation | Pynn AI",
  description:
    "Technical documentation for developers working with Pynn AI platform. Learn about SEO improvements, subdomain strategies, and technical implementation details.",
  robots: {
    index: true,
    follow: true,
  },
};

export default function ForDevsPage() {
  return <ForDevsClient />;
}
