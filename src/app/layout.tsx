import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const contrast = localFont({
  src: "./fonts/inter-latin-400-normal.woff2",
  variable: "--font-contrast",
  weight: "400",
  display: "swap",
});
const telemetry = localFont({
  src: "./fonts/jetbrains-mono-latin-400-normal.woff2",
  variable: "--font-telemetry",
  weight: "400",
  display: "swap",
});
const display = localFont({
  src: "./fonts/vt323-latin-400-normal.woff2",
  variable: "--font-display",
  weight: "400",
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
    <html
      lang="es"
      className={`${contrast.variable} ${telemetry.variable} ${display.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
