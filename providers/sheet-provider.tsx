"use client";

import { useMountedState } from "react-use";

import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
import { EditAccountSheet } from "@/features/accounts/components/edit-account-sheet";

export const SheetProvider = () => {
  const isMounted = useMountedState(); //useMountedState is a hook that returns a function that returns a boolean value indicating whether the component is mounted or not. Essentially it replaces useState / useEffect combo for this common use case.

  if (!isMounted) return null;

  return (
    <>
      <NewAccountSheet />
      <EditAccountSheet />
    </>
  );
};
