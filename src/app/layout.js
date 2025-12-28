import { Outfit } from "next/font/google"; // Using Outfit for a modern, bold feel
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import Navigation from "@/components/ui/Navigation";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { OrderProvider } from "@/context/OrderContext";
import { AdminProductProvider } from "@/context/AdminProductContext";
import { WishlistProvider } from "@/context/WishlistContext";
import CartSidebar from "@/components/ui/CartSidebar";

// Initialize the font
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata = {
  title: "Perfume Store | Minimalist Luxury",
  description: "A high-end creative portfolio for luxury perfumes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} antialiased bg-background text-foreground transition-colors duration-300`}>
        <AdminProductProvider>
        <OrderProvider>
            <AuthProvider>
            <CartProvider>
            <WishlistProvider>
                <SmoothScroll />
                <Cursor />
                <CartSidebar />
                <Navigation />
                {children}
            </WishlistProvider>
            </CartProvider>
            </AuthProvider>
        </OrderProvider>
        </AdminProductProvider>
      </body>
    </html>
  );
}
