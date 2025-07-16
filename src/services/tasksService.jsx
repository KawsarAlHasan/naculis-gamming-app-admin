import { useQuery } from "@tanstack/react-query";
import { getMockTasks } from "../api/api";

export const useAllTasks = (params) => {
  const {
    data: response = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allTasks", params],
    queryFn: () => getMockTasks(params),
    keepPreviousData: true,
  });

  const { data: allTasks = [], pagination = {} } = response;

  return { allTasks, pagination, isLoading, isError, error, refetch };
};
