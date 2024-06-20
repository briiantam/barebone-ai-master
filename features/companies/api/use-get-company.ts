// This is to get a single account/startup from the database

import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

export const useGetCompany = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["company", { id }],
    queryFn: async () => {
      const response = await client.api.companies[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch this company");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
