import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.companiesAI)[":id"]["$delete"]
>;

export const useDeleteCompanyAI = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const response = await client.api.companiesAI[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Company profile deleted");
      queryClient.invalidateQueries({ queryKey: ["companyAI", { id }] });
      queryClient.invalidateQueries({ queryKey: ["companiesAI"] });
      //TODO
    },
    onError: () => {
      toast.error("Failed to edit company details");
    },
  });

  return mutation;
};
