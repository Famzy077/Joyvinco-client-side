import { Geist, Geist_Mono } from "next/font/google";
import Script from 'next/script';
import PageProvider from "./page";
import dynamic from "next/dynamic";
import { HeaderPage, MobileBottomNav } from "../UI/Header";
import Footer from "../Footer";
import { Toaster } from "react-hot-toast";
import "@/app/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// app/layout.tsx
export const metadata = {
  title: "Joyvinco Ventures - Your Trusted Detergent Dealer",
  description: "Joyvinco is your one-stop solution for detergents and cleaning products across Nigeria, Ghana, Côte d'Ivoire, and more.",
  keywords: "detergent, cleaning products, distributor, wholesale, toothpaste, Joyvinco, Nigeria, Ghana, Côte d'Ivoire",
  openGraph: {
    title: "Joyvinco - Detergent & Cleaning Products Distributor",
    description: "Trusted source for detergents, soaps, toothpaste and more. Delivering across Nigeria, Ghana, Côte d'Ivoire.",
    url: "https://joyvinco.com.ng",
    siteName: "Joyvinco Ventures",
    images: [
      {
        url: "https://joyvinco.com.ng/og-image.png",
        width: 1200,
        height: 630,
        alt: "Joyvinco Cleaning Products",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
};

const CookieConsentWrapper = dynamic(
  () => import('../UI/CookieConsentWrapper')
);


export default function PageLayout({ children }) {
  
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-G-XG3M5YQVQH" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XG3M5YQVQH');
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          
        <main className="relative z-0">
          <PageProvider>

            <HeaderPage />
            <Script type="text/javascript">
              {`var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/68a8a77b166cf5192761818e/1j39cseq7';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
              })();`}
            </Script>

            {children}
            <MobileBottomNav />
            <Footer />
          </PageProvider>
        </main>
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              zIndex: 99999, // So it stays above navbar etc
            },
          }}
          
        />

        <CookieConsentWrapper/>

      </body>
    </html>
  );
}