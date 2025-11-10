import type { Metadata } from "next";
import ForDevsClient from "./ForDevsClient";

export const metadata: Metadata = {
  title: "For Devs - Development Info",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ForDevsPage() {
  return <ForDevsClient />;
}
