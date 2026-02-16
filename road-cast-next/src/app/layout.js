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
            </body>
        </html>
    );
}
