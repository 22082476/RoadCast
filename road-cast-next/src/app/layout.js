import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

export const metadata = {
    title: "RoadCast",
    description: "Weather forecast for motorcyclists",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                {children}
                <Analytics />
            </body>
        </html>
    );
}
