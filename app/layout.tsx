import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AWS CCP Trainer",
  description: "AWS Certified Cloud Practitioner 学習アプリ",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
