// import React, { useState } from "react";
// import { Box, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useGetDepartmentsQuery,
//   useGetDepartmentsByFacultyQuery,
//   useAddDepartmentMutation,
//   useUpdateDepartmentMutation,
//   useDeleteDepartmentMutation,
  
// } from "state/api";
// import Header from "components/Header";
// import DataDepartmentToolbar from "components/DataDepartmentToolbar";
// import DepartmentFormModal from "components/DepartmentFormModal";

// const Department = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { facultyId } = useParams();

//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(20);
//   const [sort, setSort] = useState({});
//   const [search, setSearch] = useState("");
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [searchInput, setSearchInput] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRowData, setSelectedRowData] = useState(null);

//   const queryArgs = {
//     page,
//     pageSize,
//     sort: JSON.stringify(sort),
//     search,
//   };

//   const { data: assetsData, isLoading: isAssetsLoading, refetch } = useGetDepartmentsQuery(queryArgs, {
//     skip: !!facultyId,
//   });
//   const { data: departmentAssetsData, isLoading: isDepartmentAssetsLoading } = useGetDepartmentsByFacultyQuery(
//     facultyId,
//     queryArgs,
//     {
//       skip: !facultyId,
//     }
//   );

//   const data = facultyId ? departmentAssetsData : assetsData;
//   const isLoading = facultyId ? isDepartmentAssetsLoading : isAssetsLoading;

//   const [addDepartment] = useAddDepartmentMutation();
//   const [updateDepartment] = useUpdateDepartmentMutation();
//   const [deleteDepartment] = useDeleteDepartmentMutation();
  
//   // Hook mới để lấy tài sản theo phòng
//  // const { data: assetsByDepartmentData } = useGetAssetsByDepartmentQuery(selectedRows[0] || null);

//   const columns = [
//     { field: "_id", headerName: "ID", flex: 1 },
//     { field: "name", headerName: "Name", flex: 1 },
//     {
//       field: "faculty",
//       headerName: "Faculty",
//       flex: 1,
//       valueGetter: (params) => (params.row.faculty ? params.row.faculty.name : ""),
//     },
//   ];

//   const handleAdd = () => {
//     setIsModalOpen(true);
//   };

//   const handleEdit = () => {
//     if (selectedRows.length === 1) {
//       const selectedRowId = selectedRows[0];
//       const selectedRow = data.find((row) => row._id === selectedRowId);
//       setSelectedRowData(selectedRow);
//       setIsModalOpen(true);
//     } else {
//       console.log("Please select one row to edit.");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       for (const id of selectedRows) {
//         await deleteDepartment(id);
//       }
//       refetch();
//       console.log("Delete successful");
//     } catch (error) {
//       console.error("Failed to delete department", error);
//     }
//   };

//   const handleViewAssets = () => {
//     // Điều hướng hoặc hiển thị các tài sản của phòng được chọn
//     navigate(`/assets/${selectedRows[0]}`);
//   };

//   const handleFormSubmit = async (formData) => {
//     try {
//       if (selectedRowData) {
//         await updateDepartment({ id: selectedRowData._id, updateDepartment: formData }).unwrap();
//         //await updateDepartment({ id: selectedRowData._id, ...formData });
//       } else {
//         await addDepartment(formData);
//       }
//       refetch();
//       setIsModalOpen(false);
//       setSelectedRowData(null);
//       console.log("Form submitted successfully");
//     } catch (error) {
//       console.error("Failed to submit form", error);
//     }
//   };

//   return (
//     <Box m="1.5rem 2.5rem">
//       <Header title="Phòng" subtitle="Danh sách các phòng" />
//       <Box
//         height="80vh"
//         sx={{
//           "& .MuiDataGrid-root": { border: "none" },
//           "& .MuiDataGrid-cell": { borderBottom: "none" },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: theme.palette.background.alt,
//             color: theme.palette.secondary[100],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: theme.palette.primary.light,
//           },
//           "& .MuiDataGrid-footerContainer": {
//             backgroundColor: theme.palette.background.alt,
//             color: theme.palette.secondary[100],
//             borderTop: "none",
//           },
//           "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//             color: `${theme.palette.secondary[200]} !important`,
//           },
//         }}
//       >
//         <DataGrid
//           loading={isLoading || !data}
//           getRowId={(row) => row._id}
//           rows={(data && data) || []}
//           columns={columns}
//           rowCount={(data && data.total) || 0}
//           rowsPerPageOptions={[20, 50, 100]}
//           pagination
//           page={page}
//           pageSize={pageSize}
//           paginationMode="server"
//           sortingMode="server"
//           onPageChange={(newPage) => setPage(newPage)}
//           onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//           onSortModelChange={(newSortModel) => setSort(newSortModel)}
//           checkboxSelection
//           onSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
//           components={{ Toolbar: DataDepartmentToolbar }}
//           componentsProps={{
//             toolbar: {
//               searchInput,
//               setSearchInput,
//               setSearch,
//               selectedRows,
//               onAdd: handleAdd,
//               onEdit: handleEdit,
//               onDelete: handleDelete,
//               onView: handleViewAssets, 
//             },
//           }}
//         />
//       </Box>
//       <DepartmentFormModal
//         open={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedRowData(null);
//         }}
//         onSubmit={handleFormSubmit}
//         initialFormData={selectedRowData}
//       />
//     </Box>
//   );
// };
// export default Department;
// import React, { useState, useEffect } from "react";
// import { Box, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from 'react-redux';

// import {
//   useGetDepartmentsQuery,
//   useGetDepartmentsByMultipleDepartmentIdsQuery,
//   useGetDepartmentsByFacultyQuery,
//   useGetDepartmentByIdQuery,
//   useGetDepartmentsByUserQuery,
//   useAddDepartmentMutation,
//   useUpdateDepartmentMutation,
//   useDeleteDepartmentMutation,
// } from "state/api";
// import Header from "components/Header";
// import DataDepartmentToolbar from "components/DataDepartmentToolbar";
// import DepartmentFormModal from "components/DepartmentFormModal";

// const Department = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { facultyId } = useParams();

//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(20);
//   const [sort, setSort] = useState({});
//   const [search, setSearch] = useState("");
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [searchInput, setSearchInput] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRowData, setSelectedRowData] = useState(null);

//   const user = useSelector((state) => state.global.user);

//   const isAdmin = user && user.user.role === 'admin';
//   const isStaff = user && user.user.role === 'staff';
//   const isUser = user?.user?.account?.role === 'user';

//   const queryArgs = {
//     page,
//     pageSize,
//     sort: JSON.stringify(sort),
//     search,
//   };

//   const adminQuery = useGetDepartmentsQuery(queryArgs, {
//     skip: !isAdmin,
//   });

//   const staffQuery = useGetDepartmentsByFacultyQuery(isStaff? user.staff.faculties:null, queryArgs, {
//     skip: !isStaff,
//   });

//   const userQuery = useGetDepartmentsByMultipleDepartmentIdsQuery(user && user.user.departments, queryArgs, {
//     skip: !isUser,
//   });

//   const { data, isLoading, refetch } = isAdmin ? adminQuery : isStaff ? staffQuery : isUser ? userQuery : { data: [], isLoading: false, refetch: () => {} };

//   const [addDepartment] = useAddDepartmentMutation();
//   const [updateDepartment] = useUpdateDepartmentMutation();
//   const [deleteDepartment] = useDeleteDepartmentMutation();

//   useEffect(() => {
//     console.log('User:', user.user.role); // Log thông tin người dùng
//     console.log('Data:', data);
//   }, [user]);

//   const columns = [
//     { field: "_id", headerName: "ID", flex: 1 },
//     { field: "name", headerName: "Name", flex: 1 },
//     {
//       field: "faculty",
//       headerName: "Faculty",
//       flex: 1,
//       valueGetter: (params) => (params.row.faculty ? params.row.faculty.name : ""),
//     },
//   ];

//   const handleAdd = () => {
//     setIsModalOpen(true);
//   };

//   const handleEdit = () => {
//     if (selectedRows.length === 1) {
//       const selectedRowId = selectedRows[0];
//       const selectedRow = data.find((row) => row._id === selectedRowId);
//       setSelectedRowData(selectedRow);
//       setIsModalOpen(true);
//     } else {
//       console.log("Please select one row to edit.");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       for (const id of selectedRows) {
//         await deleteDepartment(id);
//       }
//       refetch();
//       console.log("Delete successful");
//     } catch (error) {
//       console.error("Failed to delete department", error);
//     }
//   };

//   const handleViewAssets = () => {
//     // Điều hướng hoặc hiển thị các tài sản của phòng được chọn
//     navigate(`/asset/department/${selectedRows[0]}`);
//   };

//   const handleFormSubmit = async (formData) => {
//     try {
//       if (selectedRowData) {
//         await updateDepartment({ id: selectedRowData._id, updateDepartment: formData }).unwrap();
//       } else {
//         await addDepartment(formData);
//       }
//       refetch();
//       setIsModalOpen(false);
//       setSelectedRowData(null);
//       console.log("Form submitted successfully");
//     } catch (error) {
//       console.error("Failed to submit form", error);
//     }
//   };

//   return (
//     <Box m="1.5rem 2.5rem">
//       <Header title="Phòng" subtitle="Danh sách các phòng" />
//       <Box
//         height="80vh"
//         sx={{
//           "& .MuiDataGrid-root": { border: "none" },
//           "& .MuiDataGrid-cell": { borderBottom: "none" },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: theme.palette.background.alt,
//             color: theme.palette.secondary[100],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: theme.palette.primary.light,
//           },
//           "& .MuiDataGrid-footerContainer": {
//             backgroundColor: theme.palette.background.alt,
//             color: theme.palette.secondary[100],
//             borderTop: "none",
//           },
//           "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//             color: `${theme.palette.secondary[200]} !important`,
//           },
//         }}
//       >
//         <DataGrid
//           loading={isLoading || !data}
//           getRowId={(row) => row._id}
//           rows={(data && data) || []}
//           columns={columns}
//           rowCount={(data && data.total) || 0}
//           rowsPerPageOptions={[20, 50, 100]}
//           pagination
//           page={page}
//           pageSize={pageSize}
//           paginationMode="server"
//           sortingMode="server"
//           onPageChange={(newPage) => setPage(newPage)}
//           onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//           onSortModelChange={(newSortModel) => setSort(newSortModel)}
//           checkboxSelection
//           onSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
//           components={{ Toolbar: DataDepartmentToolbar }}
//           componentsProps={{
//             toolbar: {
//               searchInput,
//               setSearchInput,
//               setSearch,
//               selectedRows,
//               onAdd: handleAdd,
//               onEdit: handleEdit,
//               onDelete: handleDelete,
//               onView: handleViewAssets, 
//             },
//           }}
//         />
//       </Box>
//       <DepartmentFormModal
//         open={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedRowData(null);
//         }}
//         onSubmit={handleFormSubmit}
//         initialFormData={selectedRowData}
//       />
//     </Box>
//   );
// };

// export default Department;
import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import {
  useGetDepartmentsQuery,
  useGetDepartmentsByMultipleDepartmentIdsQuery,
  useGetDepartmentsByFacultyQuery,
  useGetDepartmentByIdQuery,
  useGetDepartmentsByUserQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} from "state/api";
import Header from "components/Header";
import DataDepartmentToolbar from "components/DataDepartmentToolbar";
import DepartmentFormModal from "components/DepartmentFormModal";

const Department = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { facultyId } = useParams();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const user = useSelector((state) => state.global.user);

  const isAdmin = user && user.user.role === 'admin';
  const isStaff = user && user.user.role === 'staff';
  const isUser = user?.user?.account?.role === 'user';

  const queryArgs = {
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  };

  const adminQuery = useGetDepartmentsQuery(queryArgs, {
    skip: !isAdmin,
  });

  const staffQuery = useGetDepartmentsByFacultyQuery(isStaff? user.staff.faculties:null, queryArgs, {
    skip: !isStaff,
  });

  const userQuery = useGetDepartmentsByMultipleDepartmentIdsQuery(user && user.user.departments, queryArgs, {
    skip: !isUser,
  });

  const { data, isLoading, refetch } = isAdmin ? adminQuery : isStaff ? staffQuery : isUser ? userQuery : { data: [], isLoading: false, refetch: () => {} };

  const [addDepartment] = useAddDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();
  const [deleteDepartment] = useDeleteDepartmentMutation();

  useEffect(() => {
    console.log('User:', user.user.role); // Log thông tin người dùng
    console.log('Data:', data);
  }, [user]);

  const columns = [
    // { field: "_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "faculty",
      headerName: "Faculty",
      flex: 1,
      valueGetter: (params) => (params.row.faculty ? params.row.faculty.name : ""),
    },
  ];

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    if (selectedRows.length === 1) {
      const selectedRowId = selectedRows[0];
      const selectedRow = data.find((row) => row._id === selectedRowId);
      setSelectedRowData(selectedRow);
      setIsModalOpen(true);
    } else {
      console.log("Please select one row to edit.");
    }
  };

  const handleDelete = async () => {
    try {
      for (const id of selectedRows) {
        await deleteDepartment(id);
      }
      refetch();
      console.log("Delete successful");
    } catch (error) {
      console.error("Failed to delete department", error);
    }
  };

  const handleViewAssets = () => {
    // Điều hướng hoặc hiển thị các tài sản của phòng được chọn
    navigate(`/assets/${selectedRows[0]}`);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedRowData) {
        await updateDepartment({ id: selectedRowData._id, updateDepartment: formData }).unwrap();
      } else {
        await addDepartment(formData);
      }
      refetch();
      setIsModalOpen(false);
      setSelectedRowData(null);
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Failed to submit form", error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Phòng" subtitle="Danh sách các phòng" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": { border: "none" },
          "& .MuiDataGrid-cell": { borderBottom: "none" },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(newSortModel)}
          checkboxSelection
          onSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
          components={{ Toolbar: DataDepartmentToolbar }}
          componentsProps={{
            toolbar: {
              searchInput,
              setSearchInput,
              setSearch,
              selectedRows,
              onAdd: handleAdd,
              onEdit: handleEdit,
              onDelete: handleDelete,
              onView: handleViewAssets, 
            },
          }}
        />
      </Box>
      <DepartmentFormModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRowData(null);
        }}
        onSubmit={handleFormSubmit}
        initialFormData={selectedRowData}
      />
    </Box>
  );
};

export default Department;
