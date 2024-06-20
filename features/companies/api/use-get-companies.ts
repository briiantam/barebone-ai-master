import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetCompanies = () => {
  const query = useQuery({
    queryKey: ["companies"], // Unique key for companies query
    queryFn: async () => {
      const response = await client.api.companies.$get(); // Fetch companies data from API

      if (!response.ok) {
        throw new Error("Failed to fetch companies");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
