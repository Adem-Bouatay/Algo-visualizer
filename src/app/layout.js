import { Inter } from "next/font/google";
import "./globals.css";
import "./codeBlock.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Algo Visualizer",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <script
          defer
          src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js"
        ></script>
      </body>
    </html>
  );
}
