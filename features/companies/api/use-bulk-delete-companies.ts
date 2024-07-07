import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

// these all match with what we wrote in companies.ts
type ResponseType = InferResponseType<
  (typeof client.api.companies)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.companies)["bulk-delete"]["$post"]
>["json"]; //based on account.ts

export const useBulkDeleteCompanies = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.companies["bulk-delete"]["$post"]({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Company details deleted");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      // TODO: Also invalidate summary
    },
    onError: () => {
      toast.error("Failed to delete company details");
    },
  });

  return mutation;
};
