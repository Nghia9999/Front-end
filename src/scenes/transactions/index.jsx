// import React, { useState } from "react";
// import { Box, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useNavigate } from "react-router-dom";
// import {
//   useGetFacultysQuery,
//   useAddFacultyMutation,
//   useUpdateFacultyMutation,
//   useDeleteFacultyMutation,
// } from "state/api"; // Hook để lấy danh sách các khoa và thêm khoa

// import Header from "components/Header";
// import DataGridCustomToolbar from "components/DataGridAssetToolbar";
// import AddFacultyModal from "components/AddFacultyModal"; // Import modal mới tạo

// const Transactions = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();

//   // values to be sent to the backend
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(20);
//   const [sort, setSort] = useState({});
//   const [search, setSearch] = useState("");

//   const [searchInput, setSearchInput] = useState("");
//   const { data, isLoading, refetch } = useGetFacultysQuery({
//     page,
//     pageSize,
//     sort: JSON.stringify(sort),
//     search,
//   });

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRowData, setSelectedRowData] = useState(null);
//   const [addFaculty] = useAddFacultyMutation();
//   const [updateFaculty] = useUpdateFacultyMutation();
//   const [deleteFaculty] = useDeleteFacultyMutation();

//   const columns = [
//     {
//       field: "_id",
//       headerName: "ID",
//       flex: 1,
//     },
//     {
//       field: "name",
//       headerName: "Tên Khoa",
//       flex: 1,
//     },
//   ];

//   const handleRowClick = (params) => {
//     const facultyId = params.row._id;
//     navigate(`/department/${facultyId}`);
//   };

//   const handleAddClick = () => {
//     setIsModalOpen(true);
//   };

//   const handleEditClick = () => {
//     if (selectedRowData) {
//       setIsModalOpen(true);
//     } else {
//       console.log("Please select a faculty to edit.");
//     }
//   };

//   const handleDeleteClick = async () => {
//     try {
//       if (selectedRowData) {
//         await deleteFaculty(selectedRowData._id);
//         refetch();
//         setSelectedRowData(null);
//         console.log("Delete successful");
//       } else {
//         console.log("Please select a faculty to delete.");
//       }
//     } catch (error) {
//       console.error("Failed to delete faculty", error);
//     }
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//   };

//   const handleFormSubmit = async (formData) => {
//     try {
//       if (selectedRowData) {
//         await updateFaculty({ id: selectedRowData._id, ...formData });
//       } else {
//         await addFaculty(formData);
//       }
//       refetch();
//       setIsModalOpen(false);
//       setSelectedRowData(null);
//     } catch (error) {
//       console.error("Failed to add or update faculty", error);
//     }
//   };

//   return (
//     <Box m="1.5rem 2.5rem">
//       <Header title="Khoa" subtitle="Danh sách các khoa" />
//       <Box
//         height="80vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
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
//           onRowClick={handleRowClick}
//          //components={{ Toolbar: DataGridCustomToolbar }}
//           componentsProps={{
//             toolbar: {
//               searchInput,
//               setSearchInput,
//               setSearch,
//               onAddClick: handleAddClick, // Thêm sự kiện cho nút "Add"
//               onEditClick: handleEditClick, // Thêm sự kiện cho nút "Edit"
//               onDeleteClick: handleDeleteClick, // Thêm sự kiện cho nút "Delete"
//             },
//           }}
//         />
//       </Box>
//       <AddFacultyModal
//         open={isModalOpen}
//         onClose={handleModalClose}
//         onSubmit={handleFormSubmit}
//         initialFormData={selectedRowData}
//       />
//     </Box>
//   );
// };

// export default Transactions;
// import React, { useState } from "react";
// import { Box, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useGetFacultysQuery,
//   useAddFacultyMutation,
//   useUpdateFacultyMutation,
//   useDeleteFacultyMutation,
// } from "state/api"; // Hook để lấy danh sách các khoa và thêm khoa

// import Header from "components/Header";
// import AddFacultyModal from "components/AddFacultyModal";
// import DataFacultyToolbar from "components/DataFacultyToolbar";

// const Transactions = () => {
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

//   const { data, isLoading, refetch } = useGetFacultysQuery({
//     page,
//     pageSize,
//     sort: JSON.stringify(sort),
//     search,
//   });
  
//   const [addFaculty] = useAddFacultyMutation();
//   const [updateFaculty] = useUpdateFacultyMutation();
//   const [deleteFaculty] = useDeleteFacultyMutation();
//   const columns = [
//     {
//       field: "_id",
//       headerName: "ID",
//       flex: 1,
//     },
//     {
//       field: "name",
//       headerName: "Tên Khoa",
//       flex: 1,
//     },
//   ];

//   const handleView = () => {
//     //const facultyId = params.row._id;
//     // navigate(`/department/${facultyId}`);
//     navigate(`/department/${selectedRows[0]}`);
//   };

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
//         await deleteFaculty(id);
//       }
//       refetch();
//       console.log("Delete successful");
//     } catch (error) {
//       console.error("Failed to delete department", error);
//     }
//   };

//   const handleFormSubmit = async (formData) => {
//     try {
//       if (selectedRowData) {
//         await updateFaculty({ id: selectedRowData._id, updateFaculty: formData }).unwrap();
//         //await updateFaculty({ id: selectedRowData._id, ...formData });
//       } else {
//         await addFaculty(formData);
//       }
//       refetch();
//       setIsModalOpen(false);
//       setSelectedRowData(null);
//     } catch (error) {
//       console.error("Failed to add or update faculty", error);
//     }
//   };

//   const handleSelectionModelChange = (newSelection) => {
//     setSelectedRows(newSelection);
//   };

//   return (
//     <Box m="1.5rem 2.5rem">
//       <Header title="Khoa" subtitle="Danh sách các khoa" />
//       <Box
//         height="80vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
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
//           components={{ Toolbar: DataFacultyToolbar }}
//           componentsProps={{
//             toolbar: {
//               searchInput,
//               setSearchInput,
//               setSearch,
//               selectedRows,
//               onAdd: handleAdd,
//               onEdit: handleEdit,
//               onDelete: handleDelete,
//               onView: handleView,
//             },
//           }}
//           selectionModel={selectedRows}
//           onSelectionModelChange={handleSelectionModelChange}
//         />
//       </Box>
//       <AddFacultyModal
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

// export default Transactions;
// import React, { useState, useEffect } from "react";
// import { Box, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from 'react-redux'; // Import useSelector từ react-redux

// import {
//   useGetFacultysQuery,
//   useAddFacultyMutation,
//   useUpdateFacultyMutation,
//   useDeleteFacultyMutation,
// } from "state/api"; // Hook để lấy danh sách các khoa và thêm khoa

// import Header from "components/Header";
// import AddFacultyModal from "components/AddFacultyModal";
// import DataFacultyToolbar from "components/DataFacultyToolbar";


// const Transactions = () => {
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

//   const { data, isLoading, refetch } = useGetFacultysQuery({
//     page,
//     pageSize,
//     sort: JSON.stringify(sort),
//     search,
//   });
  
//   const [addFaculty] = useAddFacultyMutation();
//   const [updateFaculty] = useUpdateFacultyMutation();
//   const [deleteFaculty] = useDeleteFacultyMutation();

//   const user = useSelector((state) => state.global.user); // Lấy thông tin người dùng từ Redux store

//   useEffect(() => {
//     console.log('User:', user); // Log thông tin người dùng
//   }, [user]);

//   const columns = [
//     {
//       field: "_id",
//       headerName: "ID",
//       flex: 1,
//     },
//     {
//       field: "name",
//       headerName: "Tên Khoa",
//       flex: 1,
//     },
//   ];

//   const handleView = () => {
//     navigate(`/department/${selectedRows[0]}`);
//   };

//   const handleAdd = () => {
//     if (user && user.role === 'admin') {
//       setIsModalOpen(true);
//     } else {
//       console.log("You do not have permission to add.");
//     }
//   };

//   const handleEdit = () => {
//     if (user && user.user.role === 'admin') {
//       if (selectedRows.length === 1) {
//         const selectedRowId = selectedRows[0];
//         const selectedRow = data.find((row) => row._id === selectedRowId);
//         setSelectedRowData(selectedRow);
//         setIsModalOpen(true);
//       } else {
//         console.log("Please select one row to edit.");
//       }
//     } else {
//       console.log("You do not have permission to edit.");
//     }
//   };

//   const handleDelete = async () => {
//     if (user && user.role === 'admin') {
//       try {
//         for (const id of selectedRows) {
//           await deleteFaculty(id);
//         }
//         refetch();
//         console.log("Delete successful");
//       } catch (error) {
//         console.error("Failed to delete department", error);
//       }
//     } else {
//       console.log("You do not have permission to delete.");
//     }
//   };

//   const handleFormSubmit = async (formData) => {
//     try {
//       if (selectedRowData) {
//         await updateFaculty({ id: selectedRowData._id, updateFaculty: formData }).unwrap();
//       } else {
//         await addFaculty(formData);
//       }
//       refetch();
//       setIsModalOpen(false);
//       setSelectedRowData(null);
//     } catch (error) {
//       console.error("Failed to add or update faculty", error);
//     }
//   };

//   const handleSelectionModelChange = (newSelection) => {
//     setSelectedRows(newSelection);
//   };

//   return (
//     <Box m="1.5rem 2.5rem">
//       <Header title="Khoa" subtitle="Danh sách các khoa" />
//       <Box
//         height="80vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
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
//           components={{ Toolbar: DataFacultyToolbar }}
//           componentsProps={{
//             toolbar: {
//               searchInput,
//               setSearchInput,
//               setSearch,
//               selectedRows,
//               onAdd: handleAdd,
//               onEdit: handleEdit,
//               onDelete: handleDelete,
//               onView: handleView,
//             },
//           }}
//           selectionModel={selectedRows}
//           onSelectionModelChange={handleSelectionModelChange}
//         />
//       </Box>
//       <AddFacultyModal
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

// export default Transactions;
// import React, { useState, useEffect } from "react";
// import { Box, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from 'react-redux'; // Import useSelector từ react-redux

// import {
//   useGetFacultysQuery,
//   useGetFacultysByStaffIdQuery,
//   useAddFacultyMutation,
//   useUpdateFacultyMutation,
//   useDeleteFacultyMutation,
// } from "state/api"; // Hook để lấy danh sách các khoa và thêm khoa

// import Header from "components/Header";
// import AddFacultyModal from "components/AddFacultyModal";
// import DataFacultyToolbar from "components/DataFacultyToolbar";

// const Transactions = () => {
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

//   const user = useSelector((state) => state.global.user); // Lấy thông tin người dùng từ Redux store

//   // Use separate states and variables for data fetching based on user role
//   const adminQuery = useGetFacultysQuery({
//     page,
//     pageSize,
//     sort: JSON.stringify(sort),
//     search,
//   });

//   const staffQuery = useGetFacultysByStaffIdQuery(user.staff._id, {
//     page,
//     pageSize,
//     sort: JSON.stringify(sort),
//     search,
//   });

//   const { data, isLoading, refetch } = user.user && user.user.role === 'admin' ? adminQuery : staffQuery;

//   const [addFaculty] = useAddFacultyMutation();
//   const [updateFaculty] = useUpdateFacultyMutation();
//   const [deleteFaculty] = useDeleteFacultyMutation();

//   useEffect(() => {
//     console.log('User:', user.user.role); // Log thông tin người dùng
//   }, [user]);

//   const columns = [
//     {
//       field: "_id",
//       headerName: "ID",
//       flex: 1,
//     },
//     {
//       field: "name",
//       headerName: "Tên Khoa",
//       flex: 1,
//     },
//   ];

//   const handleView = () => {
//     navigate(`/department/${selectedRows[0]}`);
//   };

//   const handleAdd = () => {
//     if (user && user.role === 'admin') {
//       setIsModalOpen(true);
//     } else {
//       console.log("You do not have permission to add.");
//     }
//   };

//   const handleEdit = () => {
//     if (user && user.role === 'admin') {
//       if (selectedRows.length === 1) {
//         const selectedRowId = selectedRows[0];
//         const selectedRow = data.find((row) => row._id === selectedRowId);
//         setSelectedRowData(selectedRow);
//         setIsModalOpen(true);
//       } else {
//         console.log("Please select one row to edit.");
//       }
//     } else {
//       console.log("You do not have permission to edit.");
//     }
//   };

//   const handleDelete = async () => {
//     if (user && user.role === 'admin') {
//       try {
//         for (const id of selectedRows) {
//           await deleteFaculty(id);
//         }
//         refetch();
//         console.log("Delete successful");
//       } catch (error) {
//         console.error("Failed to delete department", error);
//       }
//     } else {
//       console.log("You do not have permission to delete.");
//     }
//   };

//   const handleFormSubmit = async (formData) => {
//     try {
//       if (selectedRowData) {
//         await updateFaculty({ id: selectedRowData._id, updateFaculty: formData }).unwrap();
//       } else {
//         await addFaculty(formData);
//       }
//       refetch();
//       setIsModalOpen(false);
//       setSelectedRowData(null);
//     } catch (error) {
//       console.error("Failed to add or update faculty", error);
//     }
//   };

//   const handleSelectionModelChange = (newSelection) => {
//     setSelectedRows(newSelection);
//   };

//   return (
//     <Box m="1.5rem 2.5rem">
//       <Header title="Khoa" subtitle="Danh sách các khoa" />
//       <Box
//         height="80vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
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
//           components={{ Toolbar: DataFacultyToolbar }}
//           componentsProps={{
//             toolbar: {
//               searchInput,
//               setSearchInput,
//               setSearch,
//               selectedRows,
//               onAdd: handleAdd,
//               onEdit: handleEdit,
//               onDelete: handleDelete,
//               onView: handleView,
//             },
//           }}
//           selectionModel={selectedRows}
//           onSelectionModelChange={handleSelectionModelChange}
//         />
//       </Box>
//       <AddFacultyModal
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

// export default Transactions;
import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

import {
  useGetFacultysQuery,
  useGetFacultysByStaffIdQuery,
  useAddFacultyMutation,
  useUpdateFacultyMutation,
  useDeleteFacultyMutation,
} from "state/api";

import Header from "components/Header";
import AddFacultyModal from "components/AddFacultyModal";
import DataFacultyToolbar from "components/DataFacultyToolbar";

const Transactions = () => {
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

  const adminQuery = useGetFacultysQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const staffQuery = useGetFacultysByStaffIdQuery(isStaff ? user.staff._id : null, {
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });

  const { data, isLoading, refetch } = isAdmin ? adminQuery : isStaff ? staffQuery : { data: [], isLoading: false, refetch: () => {} };
  

  const [addFaculty] = useAddFacultyMutation();
  const [updateFaculty] = useUpdateFacultyMutation();
  const [deleteFaculty] = useDeleteFacultyMutation();

  useEffect(() => {
    console.log('User:', user); // Log thông tin người dùng
  }, [user]);

  const columns = [
    // {
    //   field: "_id",
    //   headerName: "ID",
    //   flex: 1,
    // },
    {
      field: "name",
      headerName: "Tên Khoa",
      flex: 1,
    },
  ];

  const handleView = () => {
    navigate(`/department/${selectedRows[0]}`);
   
  };

  const handleAdd = () => {
    if (isAdmin) {
      setIsModalOpen(true);
    } else {
      console.log("You do not have permission to add.");
    }
  };

  const handleEdit = () => {
    if (isAdmin) {
      if (selectedRows.length === 1) {
        const selectedRowId = selectedRows[0];
        const selectedRow = data.find((row) => row._id === selectedRowId);
        setSelectedRowData(selectedRow);
        setIsModalOpen(true);
      } else {
        console.log("Please select one row to edit.");
      }
    } else {
      console.log("You do not have permission to edit.");
    }
  };

  const handleDelete = async () => {
    if (isAdmin) {
      try {
        for (const id of selectedRows) {
          await deleteFaculty(id);
        }
        refetch();
        console.log("Delete successful");
      } catch (error) {
        console.error("Failed to delete department", error);
      }
    } else {
      console.log("You do not have permission to delete.");
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedRowData) {
        await updateFaculty({ id: selectedRowData._id, updateFaculty: formData }).unwrap();
      } else {
        await addFaculty(formData);
      }
      refetch();
      setIsModalOpen(false);
      setSelectedRowData(null);
    } catch (error) {
      console.error("Failed to add or update faculty", error);
    }
  };

  const handleSelectionModelChange = (newSelection) => {
    setSelectedRows(newSelection);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Khoa" subtitle="Danh sách các khoa" />
      <Box
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
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
          components={{ Toolbar: DataFacultyToolbar }}
          componentsProps={{
            toolbar: {
              searchInput,
              setSearchInput,
              setSearch,
              selectedRows,
              onAdd: handleAdd,
              onEdit: handleEdit,
              onDelete: handleDelete,
              onView: handleView,
            },
          }}
          selectionModel={selectedRows}
          onSelectionModelChange={handleSelectionModelChange}
        />
      </Box>
      <AddFacultyModal
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

export default Transactions;
