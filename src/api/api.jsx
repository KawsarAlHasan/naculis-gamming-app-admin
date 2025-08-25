import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const API = axios.create({
  baseURL: "http://10.10.7.85:9000",
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

// export const API = axios.create({
//   baseURL: "https://education-management-backend-8jm1.onrender.com/api/v1",
//   // baseURL: "http://localhost:3001/api/v1",
// });

// API.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// get admin

// export const useAdminProfile = () => {
//   const getAdmin = async () => {
//     const response = await API.get("/admin/me");
//     return response.data;
//   };

//   const {
//     data: admin = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["admin"],
//     queryFn: getAdmin,
//   });

//   return { admin, isLoading, isError, error, refetch };
// };

// // sign out
// export const signOutAdmin = () => {
//   localStorage.removeItem("token");
//   window.location.href = "/login";
// };

// export const useDashboard = () => {
//   const getDashboard = async () => {
//     const response = await API.get("/dashboard");
//     return response.data;
//   };

//   const {
//     data: dashboardData = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["dashboardData"],
//     queryFn: getDashboard,
//   });

//   return { dashboardData, isLoading, isError, error, refetch };
// };

// // get all user
// export const useAllUsers = ({ page = 1, limit = 50, status, role } = {}) => {
//   const getUsers = async () => {
//     const response = await API.get("/user/all", {
//       params: { page, limit, status, role },
//     });
//     return response.data;
//   };

//   const {
//     data: response = {},
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["allUsers", page, limit, status, role],
//     queryFn: getUsers,
//     keepPreviousData: true,
//   });

//   const { data: allUsers = [], pagination = {} } = response;

//   return { allUsers, pagination, isLoading, isError, error, refetch };
// };

// // get courses all
// export const useAllCourses = () => {
//   const getAllCourses = async () => {
//     const response = await API.get("/courses/all");
//     return response.data.data;
//   };

//   const {
//     data: allCourses = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["allCourses"],
//     queryFn: getAllCourses,
//   });

//   return { allCourses, isLoading, isError, error, refetch };
// };

// // get topics by course id
// export const useTopicsByCoursesID = (coursesID) => {
//   const getTopicsbyCoursesID = async () => {
//     const response = await API.get(`/courses/with-topic/${coursesID}`);
//     return response.data;
//   };

//   const {
//     data: topicsByCoursesID = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["topicsByCoursesID", coursesID],
//     queryFn: getTopicsbyCoursesID,
//   });

//   return { topicsByCoursesID, isLoading, isError, error, refetch };
// };

// // get single topics with teacher
// export const useSingleTopicsWithTeacher = (topicId) => {
//   const getTopicWithTeacher = async () => {
//     const response = await API.get(`/courses-topic/${topicId}`);
//     return response.data;
//   };

//   const {
//     data: topicsWithTeacher = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["topicsWithTeacher", topicId],
//     queryFn: getTopicWithTeacher,
//   });

//   return { topicsWithTeacher, isLoading, isError, error, refetch };
// };

// // courses-deatials/?course_topic_id=2&teacher_id=4
// export const useCourseContents = (course_topic_id, teacher_id) => {
//   const getContents = async () => {
//     const response = await API.get(
//       `/courses-deatials/?course_topic_id=${course_topic_id}&teacher_id=${teacher_id}`
//     );

//     return response.data;
//   };

//   const {
//     data: contentsWithDetails = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["contentsWithDetails", course_topic_id, teacher_id],
//     queryFn: getContents,
//   });

//   return { contentsWithDetails, isLoading, isError, error, refetch };
// };

// // courses-deatials by id
// export const useCourseContentsByID = (course_details_id) => {
//   const getContents = async () => {
//     const response = await API.get(
//       `/courses-deatials/single/${course_details_id}`
//     );

//     return response.data;
//   };

//   const {
//     data: contentsWithDetailsByID = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["contentsWithDetailsByID", course_details_id],
//     queryFn: getContents,
//   });

//   return { contentsWithDetailsByID, isLoading, isError, error, refetch };
// };

// // school courses start
// // get courses all
// export const useAllSchoolCourses = () => {
//   const getAllSchoolCourses = async () => {
//     const response = await API.get("/school-courses/all");
//     return response.data.data;
//   };

//   const {
//     data: allSchoolCourses = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["allSchoolCourses"],
//     queryFn: getAllSchoolCourses,
//   });

//   return { allSchoolCourses, isLoading, isError, error, refetch };
// };

// // get single School Courses
// export const useSingleSchoolCourse = (schoolCoursesID) => {
//   const getSingleSchoolCourse = async () => {
//     const response = await API.get(`/school-courses/${schoolCoursesID}`);
//     return response.data;
//   };

//   const {
//     data: singleSCDetail = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["singleSCDetail", schoolCoursesID],
//     queryFn: getSingleSchoolCourse,
//   });

//   return { singleSCDetail, isLoading, isError, error, refetch };
// };

// // get all Orders
// export const useOrders = ({ page = 1, limit = 50, status } = {}) => {
//   const getOrders = async () => {
//     const response = await API.get("/order/all", {
//       params: { page, limit, status },
//     });
//     return response.data;
//   };

//   const {
//     data: response = {},
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["orders", page, limit, status],
//     queryFn: getOrders,
//     keepPreviousData: true,
//   });

//   const { data: orders = [], pagination = {} } = response;

//   return { orders, pagination, isLoading, isError, error, refetch };
// };

// // get single order
// export const useSingleOrder = (orderId) => {
//   const getSingleOrder = async () => {
//     const response = await API.get(`/order/${orderId}`);
//     return response.data;
//   };

//   const {
//     data: singleOrder = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["singleOrder", orderId],
//     queryFn: getSingleOrder,
//   });

//   return { singleOrder, isLoading, isError, error, refetch };
// };

// // get all School Orders
// export const useSchoolOrders = ({ page = 1, limit = 50, status } = {}) => {
//   const getSchoolOrders = async () => {
//     const response = await API.get("/school-order/all", {
//       params: { page, limit, status },
//     });
//     return response.data;
//   };

//   const {
//     data: response = {},
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["schoolOrders", page, limit, status],
//     queryFn: getSchoolOrders,
//     keepPreviousData: true,
//   });

//   const { data: schoolOrders = [], pagination = {} } = response;

//   return { schoolOrders, pagination, isLoading, isError, error, refetch };
// };

// // get single School order
// export const useSingleSchoolOrder = (schoolOrderId) => {
//   const getSingleSchoolOrder = async () => {
//     const response = await API.get(`/school-order/single/${schoolOrderId}`);
//     return response.data;
//   };

//   const {
//     data: singleSchoolOrder = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["singleSchoolOrder", schoolOrderId],
//     queryFn: getSingleSchoolOrder,
//   });

//   return { singleSchoolOrder, isLoading, isError, error, refetch };
// };

// // get single School order
// export const useSingleVideoPackage = (contentID) => {
//   const getSingleVideoPackage = async () => {
//     const response = await API.get(`/video/package/${contentID}`);
//     return response.data;
//   };

//   const {
//     data: singleVideoPackage = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["singleVideoPackage", contentID],
//     queryFn: getSingleVideoPackage,
//   });

//   return { singleVideoPackage, isLoading, isError, error, refetch };
// };

// // get single School order
// export const useTeacherWithDetails = (teacherId) => {
//   const getData = async () => {
//     const response = await API.get(`/user/teacher/${teacherId}`);
//     return response.data;
//   };

//   const {
//     data: teacherDetails = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["teacherDetails", teacherId],
//     queryFn: getData,
//   });

//   return { teacherDetails, isLoading, isError, error, refetch };
// };

// // get single School order
// export const useStudentWithDetails = (studentId) => {
//   const getData = async () => {
//     const response = await API.get(`/user/student/${studentId}`);
//     return response.data;
//   };

//   const {
//     data: studentDetails = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["studentDetails", studentId],
//     queryFn: getData,
//   });

//   return { studentDetails, isLoading, isError, error, refetch };
// };

// // get all coupon code
// export const useAllCoupons = () => {
//   const getAllCoupons = async () => {
//     const response = await API.get(`/coupon`);
//     return response.data;
//   };

//   const {
//     data: allCoupons = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["allCoupons"],
//     queryFn: getAllCoupons,
//   });

//   return { allCoupons, isLoading, isError, error, refetch };
// };

// // get all assignments
// export const useAllAssignments = () => {
//   const getAllData = async () => {
//     const response = await API.get(
//       `/assignment/all-for-admin?order=desc&status=`
//     );
//     return response.data;
//   };

//   const {
//     data: allAssignments = [],
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["allAssignments"],
//     queryFn: getAllData,
//   });

//   return { allAssignments, isLoading, isError, error, refetch };
// };

// // not use
// // not use
// // not use
// // not use
// // not use

// export const useGlobalData = (table, { status, page = 1, limit = 10 }) => {
//   const fetchGlobalData = async () => {
//     const queryParams = new URLSearchParams({
//       page,
//       limit,
//       ...(status && { status }),
//     });

//     const res = await API.get(`/global/${table}`, {
//       params: { page, limit, status },
//     });
//     return res.data;
//   };

//   const {
//     data = {},
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["globalData", table, status, page, limit],
//     queryFn: fetchGlobalData,
//     keepPreviousData: true,
//   });

//   return {
//     globalData: data.data || [],
//     pagination: data.pagination || {},
//     isLoading,
//     isError,
//     error,
//     refetch,
//   };
// };
