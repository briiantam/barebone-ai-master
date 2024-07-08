import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetCompaniesAI = () => {
  const query = useQuery({
    queryKey: ["companiesAI"], // Unique key for companies query
    queryFn: async () => {
      const response = await client.api.companiesAI.$get(); // Fetch companies data from API

      if (!response.ok) {
        throw new Error("Failed to fetch companies analysis results");
      }
      const { data } = await response.json();
      return data;
    },
  });
  return query;
};
