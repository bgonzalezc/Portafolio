import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const contrast = localFont({
  src: [
    { path: "./fonts/inter-latin-200-normal.woff2", weight: "200" },
    { path: "./fonts/inter-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/inter-latin-600-normal.woff2", weight: "600" },
  ],
  variable: "--font-contrast",
  display: "swap",
});
export const metadata: Metadata = {
  icons: { icon: "/icon.svg" },
  title: "Benjamín González — Systems Portfolio",
  description:
    "Ingeniería Civil Informática. Proyectos de software, análisis de datos e infraestructura. Santiago, Chile.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={contrast.variable}>
      <body>{children}</body>
    </html>
  );
}
