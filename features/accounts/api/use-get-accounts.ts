import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetAccounts = () => {
  const query = useQuery({
    queryKey: ["accounts"], //this matches what was used in use-create-account
    queryFn: async () => {
      const response = await client.api.accounts.$get();
      // automatically infers type of data it expects given AppType

      if (!response.ok) {
        throw new Error("Failed to fetch startups");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
