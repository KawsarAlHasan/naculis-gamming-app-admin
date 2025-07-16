import { useQuery } from "@tanstack/react-query";
import {  getMockPayouts } from "../api/api";

export const useAllPayouts = (params) => {
  const {
    data: response = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allPayouts", params],
    queryFn: () => getMockPayouts(params),
    keepPreviousData: true,
  });

  const { data: allPayouts = [], pagination = {} } = response;

  return { allPayouts, pagination, isLoading, isError, error, refetch };
};
