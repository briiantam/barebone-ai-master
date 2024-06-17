import { ReactNode } from "react";
import { Inter } from "next/font/google";
import PlausibleProvider from "next-plausible";
// import { getSEOTags } from "@/libs/seo";
// import ClientLayout from "@/components/LayoutClient";
import config from "@/config";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";

/* ClientLayout contains all the client wrappers (Crisp chat support, toast messages, tooltips, etc.) */

const font = Inter({ subsets: ["latin"] });

// This adds default SEO tags to all pages in our app.
// You can override them in each page passing params to getSOTags() function.
// export const metadata = getSEOTags();

export default function RootLayout({ children }: { children: ReactNode }) {
  const dark = true; // Define the variable 'dark' before using it
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${font.className} text-white bg-black`}
        data-theme={dark}
      >
        <head>
          <title>{config.appName}</title>
        </head>
        <body>
          {config.domainName && (
            <PlausibleProvider domain={config.domainName} />
          )}
          {/* 
          <QueryProvider>
            <SheetProvider /> */}
          {children}
          {/* </QueryProvider> */}
          {/* </ClientLayout> */}
        </body>
      </html>
    </ClerkProvider>
  );
}
