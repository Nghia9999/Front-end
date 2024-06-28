import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
console.log(process.env.REACT_APP_API_KEY)
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_KEY }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Asset",
    "Staffs",
    "Faculty",
    "Department",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
    "HistoryLiquidate",
    "HistoryTransfer",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `users/${id}`,
      providesTags: ["User"],
    }),
    getAsset: build.query({
      query: () => "asset",
      providesTags: ["Asset"],
    }),
    getAssetsByDepartment: build.query({
      query: (departmentId) => `asset/department/${departmentId}`,
      providesTags: ["Asset"],
    }),
    getStaffs: build.query({
      query: () => "staffs",
      providesTags: ["Staff"],
    }),
    getFacultys: build.query({
      query: () => "faculty",
      providesTags: ["Faculty"],
    }),
    getDepartmentsByFaculty: build.query({
      query: (facultyId) => `department/faculties/${facultyId}`,
      providesTags: ["Department"],
    }),
    getDepartments: build.query({
      query: () => "departments",
      providesTags: ["Department"],
    }),
    getSales: build.query({
      query: () => "sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    addAsset: build.mutation({
      query: (newAsset) => ({
        url: 'asset',
        method: 'POST',
        body: newAsset,
      }),
      invalidatesTags: ["Asset"],
    }),
    updateAsset: build.mutation({
      query: ({ id,updateAsset }) => ({
        url: `asset/${id}`,
        method: 'PUT',
        body: updateAsset,
      }),
      invalidatesTags: ["Asset"],
    }),
    deleteAsset: build.mutation({
      query: (id) => ({
        url: `asset/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Asset"],
    }),
    addDepartment: build.mutation({
      query: (newDepartment) => ({
        url: 'departments',
        method: 'POST',
        body: newDepartment,
      }),
      invalidatesTags: ["Department"],
    }),
    login: build.mutation({
      query: (credentials) => ({
        url: 'login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    getDepartmentById: build.query({
      query: (id) => `departments/${id}`,
      providesTags: ["Department"],
    }),
    updateDepartment: build.mutation({
      query: ({ id, updateDepartment }) => ({
        url: `departments/${id}`,
        method: 'PUT',
        body: updateDepartment,
      }),
      invalidatesTags: ["Department"],
    }),
    deleteDepartment: build.mutation({
      query: (id) => ({
        url: `departments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Department"],
    }),
    addFaculty: build.mutation({
      query: (newFaculty) => ({
        url: 'faculty',
        method: 'POST',
        body: newFaculty,
      }),
      invalidatesTags: ["Faculty"],
    }),
    updateFaculty: build.mutation({
      query: ({ id, updateFaculty }) => ({
        url: `faculty/${id}`,
        method: 'PUT',
        body: updateFaculty,
      }),
      invalidatesTags: ["Faculty"],
    }),
    deleteFaculty: build.mutation({
      query: (id) => ({
        url: `faculty/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Faculty"],
    }),
    addAccount: build.mutation({
      query: (newAccount) => ({
        url: 'register',
        method: 'POST',
        body: newAccount,
      }),
      invalidatesTags: ["User"],
    }),
    addStaff: build.mutation({
      query: (newStaff) => ({
        url: 'staffs',
        method: 'POST',
        body: newStaff,
      }),
      invalidatesTags: ["Staff"],
    }),
    deleteStaff: build.mutation({
      query: (id) => ({
        url: `staffs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Staff"], // You may need to adjust the tag invalidation based on your backend logic
    }),
    getAccounts: build.query({
      query: () => ({
        url: 'account',
        method: 'GET',
        
      }),
      invalidatesTags: ["Account"],
    }),
    liquidateAsset: build.mutation({
      query: ({ id, name, quantity, price, dateliquidate }) => ({
        url: `asset/liquidate/${id}`,
        method: 'POST',
        body: { name, quantity, price, dateliquidate },
      }),
      invalidatesTags: ["Asset"],
    }),
    transferAsset: build.mutation({
      query: ({ id, transferData }) => ({
        url: `asset/transfer/${id}`,
        method: 'POST',
        body: transferData,
      }),
      invalidatesTags: ["Asset"],
    }),
    getHistoryLiquidate: build.query({
      query: () => 'historyLiquidate',
      providesTags: ["HistoryLiquidate"],
    }),
    getHistoryTransfer: build.query({
      query: () => 'history-transfer',
      providesTags: ["HistoryTransfer"],
    }),
    getFacultysByStaffId: build.query({
      query: (id) => `faculty/staff/${id}`,
      providesTags: ["Faculty"],
    }),
    getDepartmentsByUser: build.query({
      query: (userId) => `users/${userId}/departments`,
      providesTags: ["Department"],
    }),
    getDepartmentsByMultipleDepartmentIds: build.query({
      query: (departmentIds) => `departments/staff/${departmentIds}`,
      providesTags: ["Department"],
    }),
    getAssetsByFaculty: build.query({
      query: (facultyId) => `asset/faculty/${facultyId}`, // Example URL structure, adjust based on your API
      providesTags: ["Asset"], // Assuming assets are tagged under "Asset"
    }),
  }),
});

export const {
  useGetUserQuery,
  useGetAssetQuery,
  useGetAssetsByDepartmentQuery,
  useGetStaffsQuery,
  useGetFacultysQuery,
  useGetDepartmentsQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDepartmentsByFacultyQuery,
  useAddAssetMutation, 
  useUpdateAssetMutation,
  useDeleteAssetMutation,
  useAddDepartmentMutation, 
  useAddFacultyMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
  useAddAccountMutation, // New mutation
  useAddStaffMutation, // New mutation
  useDeleteStaffMutation,
  useGetAccountsQuery,
  useLiquidateAssetMutation, // New mutation
  useTransferAssetMutation,
  useGetHistoryLiquidateQuery,
  useGetHistoryTransferQuery,
  useGetDepartmentByIdQuery,
  useLoginMutation,
  useGetFacultysByStaffIdQuery,
  useGetDepartmentsByUserQuery,
  useGetDepartmentsByMultipleDepartmentIdsQuery,
  useGetAssetsByFacultyQuery,
} = api;
