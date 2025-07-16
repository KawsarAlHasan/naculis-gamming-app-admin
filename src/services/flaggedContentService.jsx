import { useQuery } from "@tanstack/react-query";
import { getMockFlaggedContent } from "../api/api";

export const useAllFlaggedContent = (params) => {
  const {
    data: response = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allFlaggedContent", params],
    queryFn: () => getMockFlaggedContent(params),
    keepPreviousData: true,
  });

  const { data: allFlaggedContent = [], pagination = {} } = response;

  return { allFlaggedContent, pagination, isLoading, isError, error, refetch };
};
