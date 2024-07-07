import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import PortalNavbar from "./PortalNavbar";
import { SheetProvider } from "@/providers/sheet-provider";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/providers/query-provider";

export default async function PortalLayout({
  children,
}: {
  children: ReactNode;
}) {
  //   const session = await getServerSession(authOptions);

  //   if (!session) {
  //     redirect(config.auth.loginUrl);
  //   }

  return (
    <div className="h-full relative z-[50] bg-black">
      <header className="fixed top-0 w-full z-10">
        <div>
          <PortalNavbar />
        </div>
      </header>
      <main
        className="w-full mx-auto pb-10 mt-10"
        style={{ maxWidth: "2000px" }}
      >
        <QueryProvider>
          {/* <SheetProvider /> */}
          <Toaster />
          {children}
        </QueryProvider>
      </main>
    </div>
  );
}
