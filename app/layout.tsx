import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteDescription =
  "CS & Business Information Systems student at the University of Rochester and IT lead for DandyHacks. Projects, live Discord status, resume, and contact — open to internships.";

export const metadata: Metadata = {
  metadataBase: new URL("https://anishkatam.com"),
  title: {
    default: "Anish Katam — Software Engineer",
    template: "%s — Anish Katam",
  },
  description: siteDescription,
  openGraph: {
    title: "Anish Katam — Software Engineer",
    description: siteDescription,
    url: "https://anishkatam.com",
    siteName: "Anish Katam",
    type: "website",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Anish Katam",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Anish Katam — Software Engineer",
    description: siteDescription,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" }, //older browsers
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
