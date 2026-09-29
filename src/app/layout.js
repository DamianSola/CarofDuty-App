import "./globals.css";
import { Plus_Jakarta_Sans, Source_Serif_4 } from "next/font/google";
import Providers from "./../redux/Provider";
import FooterGate from "./components/FooterGate";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata = {
  title: "Car of Duty",
  description: "Reservá servicios para tu auto en pocos pasos.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${sans.variable} ${display.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#contenido-principal"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-surface focus:px-4 focus:py-2"
        >
          Saltar al contenido
        </a>
        <Providers>
          <div id="contenido-principal">{children}</div>
        </Providers>
        <FooterGate />
      </body>
    </html>
  );
}
