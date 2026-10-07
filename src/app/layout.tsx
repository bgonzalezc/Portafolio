import type { Metadata } from "next";
import "./globals.css";
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
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
