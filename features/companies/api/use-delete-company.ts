import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.companies)[":id"]["$delete"]
>;

export const useDeleteCompany = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async (json) => {
      const response = await client.api.companies[":id"]["$delete"]({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Company profile deleted");
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
