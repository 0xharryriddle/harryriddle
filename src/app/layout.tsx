import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://0xharryriddle.dev";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Nguyen Thai Cong | Blockchain Researcher & Engineer",
    template: "%s | 0xharryriddle",
  },
  description: "Blockchain Researcher & Engineer",
  openGraph: {
    title: "0xharryriddle",
    description: "Blockchain Researcher & Engineer",
    url: baseUrl,
    siteName: "0xharryriddle",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main className="pt-16 min-h-screen">
          <div className="max-w-3xl mx-auto px-6 animate-fade-in">
            {children}
          </div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
