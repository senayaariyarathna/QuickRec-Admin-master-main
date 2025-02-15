import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      headers.set("authorization", localStorage.getItem("profile"));
      return headers;
    },
  }),

  reducerPath: "adminApi",
  tagTypes: ["Vacancy", "Application", "Applications", "Master", "Admins"],
  endpoints: (builder) => ({
    getApplicationsByVacancy: builder.query({
      query: (vacancyId) =>
        `/application/allApplications?vacancyId=${vacancyId ?? 0}`,
      providesTags: ["Applications"],
      invalidatesTags: ["Vacancy"],
    }),
    getVacancyBySearch: builder.query({
      query: (searchQuery) => {
        return { url: `/vacancy/search/`, params: { ...searchQuery } };
      },
      providesTags: ["Vacancy"],
    }),
    getMasterData: builder.query({
      query: () => `/common/masterData`,
      providesTags: ["Master"],
    }),
    getAdmins: builder.mutation({
      query: () => ({
        url: `user/admins`,
      }),
      providesTags: ["Admins"],
    }),
    getAppDetails: builder.query({
      query: ({ userId, applicationId }) => ({
        url: `/application/userApplication?userId=${userId}&applicationId=${applicationId}`,
      }),
      providesTags: ["Application"],
    }),
    getEmployee: builder.query({
      query: ({ employeeNo, admin }) => ({
        url: `user/getEmployee?employeeNo=${employeeNo}&admin=${admin}`,
      }),
      providesTags: ["Admins"],
    }),
    createVacancy: builder.mutation({
      query: ({ createReq, attachment }) => {
        const formData = new FormData();
        formData.append("VacancyName", createReq.VacancyName);
        createReq.VacancyId &&
          formData.append("VacancyId", createReq.VacancyId);
        formData.append("RecruitmentType", createReq.RecruitmentType);
        formData.append("SalaryGroupId", createReq.SalaryGroupId);
        formData.append("BoardGradeId", createReq.BoardGradeId);
        formData.append("PublishedDate", createReq.PublishedDate);
        formData.append("ClosingDate", createReq.ClosingDate);
        formData.append("NoOfVacancies", createReq.NoOfVacancies);
        formData.append("PlannedInterViewDate", createReq.PlannedInterViewDate);
        formData.append("AgeLimit", createReq.AgeLimit);
        formData.append("Remarks", createReq.Remarks);
        formData.append(
          "ExpectedNoOfApplicants",
          createReq.ExpectedNoOfApplicants
        );
        formData.append("AdvertismentPath", createReq.AdvertismentPath);
        formData.append("attachment", attachment);
        formData.append("Status", createReq.Status);
        return {
          url: `/vacancy/createVacancy`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Vacancy", "Master"],
    }),
    approveDetail: builder.mutation({
      query: ({ applicationId, stepId, detailId, isApproved }) => ({
        url: `/application/approve?applicationId=${applicationId}&stepId=${stepId}&detailId=${detailId}&isApproved=${isApproved}`,
        method: "POST",
      }),
      invalidatesTags: ["Application"],
    }),
    reviewApplication: builder.mutation({
      query: ({ applicationId, status, remarks }) => ({
        url: `/application/reviewed?applicationId=${applicationId}&status=${status}&remarks=${remarks}`,
        method: "POST",
      }),
      invalidatesTags: ["Application", "Applications", "Vacancy", "Master"],
    }),
    changeUserRole: builder.mutation({
      query: ({ userId, userRoleId }) => ({
        url: `user/changeUserRole?userId=${userId}&userRoleId=${userRoleId}`,
        method: "POST",
      }),
      invalidatesTags: ["Admins"],
    }),

    //.....pini.......................................................................................

  // getAllApplicantsDetails: builder.query({
  //     query: () => ({
  //       url: `application/AllApplicantsDetails`,
  //       method: "GET",
  getAllApplicantsDetails: builder.query({
    query: (params) => ({
      url: params?.vacancyId 
        ? `application/AllApplicantsDetails?vacancyId=${params.vacancyId}`
        : 'application/AllApplicantsDetails',
      method: "GET",
      }),
     
    }),
    
  }),
});

export const {
  useGetApplicationsByVacancyQuery,
  useGetVacancyBySearchQuery,
  useGetMasterDataQuery,
  useApproveDetailMutation,
  useCreateVacancyMutation,
  useGetAppDetailsQuery,
  useReviewApplicationMutation,
  useGetEmployeeQuery,
  useChangeUserRoleMutation,
  useGetAllApplicantsDetailsQuery
} = api;
