import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.companiesAI)["analyze"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.companiesAI)["analyze"]["$post"]
>["json"];

export const useAnalyzeCompany = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.companiesAI["analyze"]["$post"]({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Company analysis completed");
      queryClient.invalidateQueries({ queryKey: ["companiesAI"] });
    },
    onError: () => {
      toast.error("Failed to analyze company");
    },
  });

  return mutation;
};
