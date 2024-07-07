// "use client";

// import React from "react";
// import { Loader2, Plus } from "lucide-react";

// import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
// import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
// // import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts";

// import { Button } from "@/components/ui/button";
// // import { DataTable } from "@/components/data-table";
// // import { Skeleton } from "@/components/ui/skeleton";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// // import { columns } from "./columns";

// export const dynamic = "force-dynamic";

// export default function FindInvestorsPage() {
//   const newAccount = useNewAccount();
//   return (
//     <main className="pb-24">
//       <div className="py-24 px-24">
//         <Card className="border-none drop-shadow-sm">
//           <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
//             <CardTitle className="text-xl line-clamp-1">
//               Accounts page
//             </CardTitle>
//             <Button onClick={newAccount.onOpen} size="sm">
//               <Plus className="size-4 mr-2" />
//               Add new
//             </Button>
//           </CardHeader>
//         </Card>
//       </div>
//     </main>
//   );
// }
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  // const data = await getData();

  return (
    <main className="pb-24">
      <div className="h-screen max-w-full mx-auto py-20 px-6 sm:px-8 lg:px-20 flex items-center justify-center">
        <div className="w-full text-white">
          {/* <CompanyInputs /> */}
          outreach
        </div>
      </div>
    </main>
  );
}
