import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const API = axios.create({
  baseURL: "http://103.186.20.115:10002",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// get admin profile
export const useAdminProfile = () => {
  const getData = async () => {
    const response = await API.get("/api/admin_dashboard/admin-profile/");
    return response.data;
  };

  const {
    data: admin = null,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admin"],
    queryFn: getData,
  });

  return { admin, isLoading, isError, error, refetch };
};

// sign out
export const signOutAdmin = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

// get dashboard stats
export const useDashboardStats = () => {
  const getData = async () => {
    const response = await API.get("/api/admin_dashboard/dashboard/stats/");
    return response.data;
  };

  const {
    data: dashboardStats = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getData,
  });

  return { dashboardStats, isLoading, isError, error, refetch };
};

// get Trends
export const useTrends = () => {
  const getData = async () => {
    const response = await API.get("/api/admin_dashboard/dashboard/trends/");
    return response.data;
  };

  const {
    data: trandsData = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["trandsData"],
    queryFn: getData,
  });

  return { trandsData, isLoading, isError, error, refetch };
};

// get all users
export const useUsers = ({ page = 1, limit = 10 }) => {
  const getData = async () => {
    const response = await API.get(
      `/api/admin_dashboard/users/list/?page=${page}&limit=${limit}`
    );

    return response.data;
  };

  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users", page, limit],
    queryFn: getData,
  });

  return { users, isLoading, isError, error, refetch };
};

// get all users
export const useAllUsersList = () => {
  const getData = async () => {
    const response = await API.get(`/api/admin_dashboard/basic-userlist/`);

    return response.data;
  };

  const {
    data: alluserList = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["alluserList"],
    queryFn: getData,
  });

  return { alluserList, isLoading, isError, error, refetch };
};

// get all users
export const useAllGroupList = () => {
  const getData = async () => {
    const response = await API.get(`/api/core/grouplist/`);

    return response.data;
  };

  const {
    data: allGroupList = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allGroupList"],
    queryFn: getData,
  });

  return { allGroupList, isLoading, isError, error, refetch };
};

// get all users
export const useAllAdminList = () => {
  const getData = async () => {
    const response = await API.get(`/api/admin_dashboard/adminlist/`);

    return response.data;
  };

  const {
    data: allAdmins = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allAdmins"],
    queryFn: getData,
  });

  return { allAdmins, isLoading, isError, error, refetch };
};

// payouts data
export const usePayouts = ({ page = 1, limit = 10 }) => {
  const getData = async () => {
    const response = await API.get(
      `/api/admin_dashboard/payouts/list/?page=${page}&limit=${limit}`
    );

    return response.data;
  };

  const {
    data: payouts = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["payouts", page, limit],
    queryFn: getData,
  });

  return { payouts, isLoading, isError, error, refetch };
};

// tasks data
export const useTasksView = ({ page = 1, limit = 10 }) => {
  const getData = async () => {
    const response = await API.get(
      `/api/tasks/admin/tasks-view/?page=${page}&limit=${limit}`
    );

    return response.data;
  };

  const {
    data: tasksViews = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tasksViews", page, limit],
    queryFn: getData,
  });

  return { tasksViews, isLoading, isError, error, refetch };
};

// flagged content data
export const useFlaggedContent = ({ page = 1, limit = 10 }) => {
  const getData = async () => {
    const response = await API.get(
      `/api/admin_dashboard/flagged-content/?page=${page}&limit=${limit}`
    );

    return response.data;
  };

  const {
    data: flaggedContentData = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["flaggedContentData", page, limit],
    queryFn: getData,
  });

  return { flaggedContentData, isLoading, isError, error, refetch };
};

// Leaderboard data
export const useLeaderboards = ({ value = "xp", page = 1, limit = 10 }) => {
  const getData = async () => {
    const response = await API.get(
      `/api/admin_dashboard/leaderboard/${value}/?page=${page}&limit=${limit}`
    );

    return response.data;
  };

  const {
    data: leaderboardData = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["leaderboardData", value, page, limit],
    queryFn: getData,
  });

  return { leaderboardData, isLoading, isError, error, refetch };
};

// single leaderboard data
export const useSingleLeaderboard = ({ value = "xp", id }) => {
  const getData = async () => {
    const response = await API.get(
      `/api/admin_dashboard/leaderboard/${value}/${id}/`
    );

    return response.data;
  };

  const {
    data: leaderboar = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["leaderboar", value, id],
    queryFn: getData,
  });

  return { leaderboar, isLoading, isError, error, refetch };
};

// mock data
// mock data

// users list
export const getMockUsers = async ({ page = 1, limit = 10 }) => {
  const res = await axios.get("/users.json");
  const allUsers = res.data || [];

  // Fake filtering (if status or role is provided)
  let filteredUsers = allUsers;

  // Fake pagination
  const totalUser = filteredUsers.length;
  const totalPages = Math.ceil(totalUser / limit);
  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  return {
    data: paginatedUsers,
    pagination: {
      totalUser,
      page,
      limit,
      totalPages,
    },
  };
};

// Flagged Content List
export const getMockFlaggedContent = async ({ page = 1, limit = 10 }) => {
  const res = await axios.get("/flagged_content_gendered.json");
  const flaggedContent = res.data || [];

  // Fake pagination
  const totalFlaggedContent = flaggedContent.length;
  const totalPages = Math.ceil(totalFlaggedContent / limit);
  const paginatedData = flaggedContent.slice((page - 1) * limit, page * limit);

  return {
    data: paginatedData,
    pagination: {
      totalFlaggedContent,
      page,
      limit,
      totalPages,
    },
  };
};

// Payouts List
export const getMockPayouts = async ({ page = 1, limit = 10 }) => {
  const res = await axios.get("/payouts_data.json");
  const resData = res.data || [];

  // Fake pagination
  const totalPayOuts = resData.length;
  const totalPages = Math.ceil(totalPayOuts / limit);
  const paginatedData = resData.slice((page - 1) * limit, page * limit);

  return {
    data: paginatedData,
    pagination: {
      totalPayOuts,
      page,
      limit,
      totalPages,
    },
  };
};

// Tasks List
export const getMockTasks = async ({ page = 1, limit = 10 }) => {
  const res = await axios.get("/tasks_data.json");
  const resData = res.data || [];

  // Fake pagination
  const totalTasks = resData.length;
  const totalPages = Math.ceil(totalTasks / limit);
  const paginatedData = resData.slice((page - 1) * limit, page * limit);

  return {
    data: paginatedData,
    pagination: {
      totalTasks,
      page,
      limit,
      totalPages,
    },
  };
};

// leaderboard List
export const getMockLeaderboard = async ({ page = 1, limit = 10 }) => {
  const res = await axios.get("/leaderboard_data.json");
  const resData = res.data || [];

  // Fake pagination
  const totalLeaderboard = resData.length;
  const totalPages = Math.ceil(totalLeaderboard / limit);
  const paginatedData = resData.slice((page - 1) * limit, page * limit);

  return {
    data: paginatedData,
    pagination: {
      totalLeaderboard,
      page,
      limit,
      totalPages,
    },
  };
};

// terms and conditions
export const getMockTermsConditions = async () => {
  const response = await axios.get("/terms_condition.json");

  return response.data;
};

// privacy policy
export const getMockPrivacyPolicy = async () => {
  const response = await axios.get("/privacy_policy.json");

  return response.data;
};


// Terms and Conditions
export const useTermsConditions = () => {
  const getData = async () => {
    const response = await API.get("/api/admin_dashboard/terms-and-conditions/");
    return response.data;
  };

  const {
    data: termsCondition = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["termsCondition"],
    queryFn: getData,
  });

  return { termsCondition, isLoading, isError, error, refetch };
};


// privacy policy
export const usePrivacyPolicy = () => {
  const getData = async () => {
    const response = await API.get("/api/admin_dashboard/privacy-policy/");
    return response.data;
  };

  const {
    data: privacyPolicy = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["privacyPolicy"],
    queryFn: getData,
  });

  return { privacyPolicy, isLoading, isError, error, refetch };
};