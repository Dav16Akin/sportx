import { Montserrat, Lato, Oswald } from "next/font/google";

export const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const oswald = Oswald({
  weight: ["200", "300", "400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});
