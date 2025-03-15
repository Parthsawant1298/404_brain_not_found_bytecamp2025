import ChatWidgetProvider from "@/components/chatbot_new";
import "./globals.css";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatWidgetProvider />
      </body>
    </html>
  );
}