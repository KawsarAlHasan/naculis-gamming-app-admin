import { useQuery } from "@tanstack/react-query";
import {  getMockLeaderboard } from "../api/api";

export const useAllLeaderboard = (params) => {
  const {
    data: response = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allLeaderboard", params],
    queryFn: () => getMockLeaderboard(params),
    keepPreviousData: true,
  });

  const { data: allLeaderboard = [], pagination = {} } = response;

  return { allLeaderboard, pagination, isLoading, isError, error, refetch };
};
