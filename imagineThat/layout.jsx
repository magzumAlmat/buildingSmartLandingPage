import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata = {
  title: "Приглашение на конференцию",
  description: "Присоединяйтесь к нам на ежегодной конференции",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${poppins.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
