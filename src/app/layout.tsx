import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  title: {
    default: "Beit El Teb | Personal healthcare",
    template: "%s | Beit El Teb",
  },
  description: "Compassionate family healthcare and preventive wellness.",
  openGraph: {
    title: "Beit El Teb",
    description: "Care that feels like home",
    type: "website",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
