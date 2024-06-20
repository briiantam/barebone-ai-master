import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.companies)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.companies)[":id"]["$patch"]
>["json"]; //based on account.ts

export const useEditCompany = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.companies[":id"]["$patch"]({
        json,
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Company details updated");
      queryClient.invalidateQueries({ queryKey: ["company", { id }] });
      queryClient.invalidateQueries({ queryKey: ["companies"] });
      //TODO
    },
    onError: () => {
      toast.error("Failed to edit company details");
    },
  });

  return mutation;
};
