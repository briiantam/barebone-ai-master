"use client";

//TODO: reformat

import React from "react";
import { Loader2, Plus } from "lucide-react";

import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useBulkDeleteAccounts } from "@/features/accounts/api/use-bulk-delete-accounts";

import { Button } from "@/components/ui/button";
// import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";

import { columns } from "./columns";

export const dynamic = "force-dynamic";

export default function FindInvestorsPage() {
  const newAccount = useNewAccount();
  const deleteAccounts = useBulkDeleteAccounts();
  const accountsQuery = useGetAccounts();
  const accounts = accountsQuery.data || [];

  const isDisabled = accountsQuery.isLoading || deleteAccounts.isPending;

  if (accountsQuery.isLoading) {
    return (
      <main className="pb-24">
        <div className="py-16 px-24">
          <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
              <CardHeader>
                <Skeleton className="h-8 w-48" />
              </CardHeader>
              <CardContent>
                <div className="h-[500px] w-full flex items-center justify-center">
                  <Loader2 className="size-6 text-slate-300 animate-spin" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pb-24">
      <div className="py-16 px-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
            <CardTitle className="text-xl line-clamp-1">
              Startups Page
            </CardTitle>
            <Button onClick={newAccount.onOpen} size="sm">
              <Plus className="size-4 mr-2" />
              Add new
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable
              filterKey="email"
              columns={columns}
              data={accounts} // how you get accounts and how to present data from database
              onDelete={(row) => {
                const ids = row.map((r) => r.original.id);
                deleteAccounts.mutate({ ids });
              }}
              disabled={isDisabled}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
