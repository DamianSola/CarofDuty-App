
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from './../redux/Provider'
import Footer from './components/footer'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Car of Duty",
  description: "Too easy to do",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
        <Footer/>
      </body>
      
    </html>
  );
}
