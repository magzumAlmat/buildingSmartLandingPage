import ThemeRegistry from '@/components/ThemeRegistry';
import "./globals.css";

export const metadata = {
  title: "BuildingSMART Awards 2025 - Национальная Премия",
  description: "Конференция, посвящённая цифровому строительству и openBIM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
