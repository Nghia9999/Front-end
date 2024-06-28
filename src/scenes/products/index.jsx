
// import React, { useState, useEffect } from "react";
// import { Box, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// import {
//   useGetAssetQuery,
//   useGetAssetsByDepartmentQuery,
//   useGetAssetsByFacultyQuery,
//   useAddAssetMutation,
//   useUpdateAssetMutation,
//   useDeleteAssetMutation,
//   useLiquidateAssetMutation,
//   useTransferAssetMutation,
// } from "state/api";
// import Header from "components/Header";
// import DataGridAssetToolbar from "components/DataGridAssetToolbar";
// import AssetFormModal from "components/AssetFormModal";
// import ConfirmLiquidateModal from "components/ConfirmLiquidateModal";
// import TransferFormModal from "components/TransferFormModal";

// const Product = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { departmentId } = useParams();

//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(20);
//   const [sort, setSort] = useState({});
//   const [search, setSearch] = useState("");
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [searchInput, setSearchInput] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRowData, setSelectedRowData] = useState(null);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

//   const user = useSelector((state) => state.global.user);

//   const isAdmin = user && user.user.role === "admin";
//   const isStaff = user && user.user.role === "staff";
//   const isUser = user?.user?.account?.role === "user";

//   const queryArgs = {
//     page,
//     pageSize,
//     sort: JSON.stringify(sort),
//     search,
//   };

//   const adminQuery = useGetAssetQuery(queryArgs, {
//     skip: !isAdmin,
//   });

//   const staffQuery = useGetAssetsByFacultyQuery(
//     isStaff ? user.staff.faculties : null,
//     queryArgs,
//     {
//       skip: !isStaff,
//     }
//   );

//   const userQuery = useGetAssetsByDepartmentQuery(

//     isUser ? user.user.departments:null,
//     queryArgs,
//     {
//       skip: !isUser,
//     }
//   );

//   const {
//     data: assetsData,
//     isLoading: isAssetsLoading,
//     refetch,
//   } = isAdmin
//     ? adminQuery
//     : isStaff
//     ? staffQuery
//     : isUser
//     ? userQuery
//     : { data: [], isLoading: false, refetch: () => {} };

//   const [addAsset] = useAddAssetMutation();
//   const [updateAsset] = useUpdateAssetMutation();
//   const [deleteAsset] = useDeleteAssetMutation();
//   const [liquidateAsset] = useLiquidateAssetMutation();
//   const [transferAsset] = useTransferAssetMutation();

//   useEffect(() => {
//     console.log("User:", user.user._id); // Log user information
//     console.log("Assets Data:", assetsData);
//   }, [user, assetsData]);

//   const columns = [
//     { field: "_id", headerName: "ID", flex: 1 },
//     { field: "name", headerName: "Name", flex: 1 },
//     { field: "price", headerName: "Price", flex: 1 },
//     { field: "quantity", headerName: "Quantity", flex: 1 },
//     {
//       field: "assettype",
//       headerName: "Asset Type",
//       flex: 1,
//       valueGetter: (params) =>
//         params.row.assettype ? params.row.assettype.name : "",
//     },
//     {
//       field: "department",
//       headerName: "Department",
//       flex: 1,
//       valueGetter: (params) =>
//         params.row.department ? params.row.department.name : "",
//     },
//     {
//       field: "description",
//       headerName: "Description",
//       flex: 1,
//       valueFormatter: (params) =>
//         params.value === null ? "null" : params.value,
//     },
//     {
//       field: "dateuse",
//       headerName: "Date Use",
//       flex: 1,
//       valueFormatter: (params) =>
//         params.value === null ? "null" : params.value,
//     },
//     {
//       field: "wearrate",
//       headerName: "Wear Rate",
//       flex: 1,
//       valueFormatter: (params) =>
//         params.value === null ? "null" : params.value,
//     },
//     {
//       field: "devicecode",
//       headerName: "Device Code",
//       flex: 1,
//       valueFormatter: (params) =>
//         params.value === null ? "null" : params.value,
//     },
//     {
//       field: "specification",
//       headerName: "Specification",
//       flex: 1,
//       valueFormatter: (params) =>
//         params.value === null ? "null" : params.value,
//     },
//   ];

//   const handleAdd = () => {
//     setIsModalOpen(true);
//   };

//   const handleEdit = () => {
//     if (selectedRows.length === 1) {
//       const selectedRowId = selectedRows[0];
//       const selectedRow = assetsData.find((row) => row._id === selectedRowId);
//       setSelectedRowData(selectedRow);
//       setIsModalOpen(true);
//     } else {
//       console.log("Please select one row to edit.");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       for (const id of selectedRows) {
//         await deleteAsset(id);
//       }
//       refetch();
//       console.log("Delete successful");
//     } catch (error) {
//       console.error("Failed to delete asset", error);
//     }
//   };

//   const handleFormSubmit = async (formData) => {
//     try {
//       console.log("Data to be sent:", formData);

//       if (selectedRowData) {
//         await updateAsset({
//           id: selectedRowData._id,
//           updateAsset: formData,
//         }).unwrap();
//       } else {
//         await addAsset(formData);
//       }
//       refetch();
//       setIsModalOpen(false);
//       setSelectedRowData(null);
//       console.log("Form submitted successfully");
//     } catch (error) {
//       console.error("Failed to submit form", error);
//     }
//   };

//   const handleLiquidate = () => {
//     if (selectedRows.length === 1) {
//       const selectedRowId = selectedRows[0];
//       const selectedRow = assetsData.find((row) => row._id === selectedRowId);
//       setSelectedRowData(selectedRow);
//       setIsConfirmModalOpen(true);
//     } else {
//       console.log("Please select one row to liquidate.");
//     }
//   };

//   const handleConfirmLiquidate = async () => {
//     try {
//       if (selectedRowData) {
//         const { _id, name, quantity, price } = selectedRowData;

//         const currentDate = new Date().toISOString();

//         await liquidateAsset({
//           id: _id,
//           name,
//           quantity,
//           price,
//           dateliquidate: currentDate,
//         });

//         await deleteAsset(selectedRowData._id);
//         refetch();
//         setIsConfirmModalOpen(false);
//         setSelectedRowData(null);
//         console.log("Liquidate successful");
//       }
//     } catch (error) {
//       console.error("Failed to liquidate asset", error);
//     }
//   };

//   const handleTransfer = () => {
//     if (selectedRows.length === 1) {
//       const selectedRowId = selectedRows[0];
//       const selectedRow = assetsData.find((row) => row._id === selectedRowId);
//       setSelectedRowData(selectedRow);
//       setIsTransferModalOpen(true);
//     } else {
//       console.log("Please select one row to transfer.");
//     }
//   };

//   const handleConfirmTransfer = async (formData) => {
//     try {
//       if (selectedRowData) {
//         const currentDate = new Date().toISOString();
//         const updatedAssetData = {
//           ...selectedRowData,
//           department: formData.newDepartment,
//         };

//         await transferAsset({
//           id: selectedRowData._id,
//           transferData: {
//             ...formData,
//             transferDate: currentDate,
//           },
//         }).unwrap();

//         await updateAsset({
//           id: selectedRowData._id,
//           updateAsset: updatedAssetData,
//         }).unwrap();

//         refetch();
//         setIsTransferModalOpen(false);
//         setSelectedRowData(null);
//         console.log("Transfer successful");
//       }
//     } catch (error) {
//       console.error("Failed to transfer asset", error);
//     }
//   };

//   return (
//     <Box m="1.5rem 2.5rem">
//       <Header title="Tài sản" subtitle="Danh sách tài sản cố định" />
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
//           loading={isAssetsLoading || !assetsData}
//           getRowId={(row) => row._id}
//           rows={(assetsData && assetsData) || []}
//           columns={columns}
//           rowCount={(assetsData && assetsData.total) || 0}
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
//           components={{ Toolbar: DataGridAssetToolbar }}
//           componentsProps={{
//             toolbar: {
//               searchInput,
//               setSearchInput,
//               setSearch,
//               selectedRows,
//               onAdd: handleAdd,
//               onEdit: handleEdit,
//               onDelete: handleDelete,
//               onLiquidate: handleLiquidate,
//               onTransfer: handleTransfer,
//             },
//           }}
//         />
//       </Box>
//       <AssetFormModal
//         open={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedRowData(null);
//         }}
//         onSubmit={handleFormSubmit}
//         initialFormData={selectedRowData}
//       />
//       <ConfirmLiquidateModal
//         open={isConfirmModalOpen}
//         onClose={() => {
//           setIsConfirmModalOpen(false);
//           setSelectedRowData(null);
//         }}
//         onConfirm={handleConfirmLiquidate}
//         assetData={selectedRowData}
//       />
//       <TransferFormModal
//         open={isTransferModalOpen}
//         onClose={() => {
//           setIsTransferModalOpen(false);
//           setSelectedRowData(null);
//         }}
//         onSubmit={handleConfirmTransfer}
//         initialFormData={selectedRowData}
//       />
//     </Box>
//   );
//   };

//   export default Product;


// import React, { useState, useEffect } from "react";
// import { Box, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// import {
//   useGetAssetQuery,
//   useGetAssetsByDepartmentQuery,
//   useGetAssetsByFacultyQuery,
//   useAddAssetMutation,
//   useUpdateAssetMutation,
//   useDeleteAssetMutation,
//   useLiquidateAssetMutation,
//   useTransferAssetMutation,
// } from "state/api";
// import Header from "components/Header";
// import DataGridAssetToolbar from "components/DataGridAssetToolbar";
// import AssetFormModal from "components/AssetFormModal";
// import ConfirmLiquidateModal from "components/ConfirmLiquidateModal";
// import TransferFormModal from "components/TransferFormModal";

// const Product = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { departmentId } = useParams();

//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(20);
//   const [sort, setSort] = useState({});
//   const [search, setSearch] = useState("");
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [searchInput, setSearchInput] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRowData, setSelectedRowData] = useState(null);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);


//   const user = useSelector((state) => state.global.user);

//   const isAdmin = user && user.user.role === "admin";
//   const isStaff = user && user.user.role === "staff";
//   const isUser = user?.user?.account?.role === "user";

//   const queryArgs = {
//     page,
//     pageSize,
//     sort: JSON.stringify(sort),
//     search,
//   };

//   const adminQuery = useGetAssetQuery(queryArgs, {
//     skip: !isAdmin,
//   });

//   const staffQuery = useGetAssetsByFacultyQuery(
//     isStaff ? user.staff.faculties : null,
//     queryArgs,
//     {
//       skip: !isStaff,
//     }
//   );

//   const userQuery = useGetAssetsByDepartmentQuery(

//     isUser ? user.user.departments:null,
//     queryArgs,
//     {
//       skip: !isUser,
//     }
//   );

//   const {
//     data: assetsData,
//     isLoading: isAssetsLoading,
//     refetch,
//   } = isAdmin
//     ? adminQuery
//     : isStaff
//     ? staffQuery
//     : isUser
//     ? userQuery
//     : { data: [], isLoading: false, refetch: () => {} };

//   const [addAsset] = useAddAssetMutation();
//   const [updateAsset] = useUpdateAssetMutation();
//   const [deleteAsset] = useDeleteAssetMutation();
//   const [liquidateAsset] = useLiquidateAssetMutation();
//   const [transferAsset] = useTransferAssetMutation();

//   useEffect(() => {
//     if (assetsData && assetsData.length > 0) {
//       const updatedAssetsData = assetsData.map((asset) => {
//         const wearRate = calculateWearRate(asset.dateuse);
//         return {
//           ...asset,
//           wearrate: wearRate,
//         };
//       });
//       //setAssetsData(updatedAssetsData);
//     }
//   }, [assetsData]);

//   const calculateWearRate = (dateuse) => {
//     const currentDate = new Date();
//     const useDate = new Date(dateuse);
//     const yearDifference = currentDate.getFullYear() - useDate.getFullYear();
//     const wearRateIncrease = yearDifference * 5; 
//     return wearRateIncrease > 100 ? 100 : wearRateIncrease;
//   };

//   useEffect(() => {
//     console.log("User:", user.user._id); 
//     console.log("Assets Data:", assetsData);
//   }, [user, assetsData]);

//   const columns = [
//     // { field: "_id", headerName: "ID", flex: 1 },
//     { field: "name", headerName: "Tên", flex: 1 },
//     { field: "price", headerName: "Giá", flex: 1 },
//     { field: "quantity", headerName: "Số lượng", flex: 1 },
//     {
//       field: "assettype",
//       headerName: "Loại tài sản",
//       flex: 1,
//       valueGetter: (params) =>
//         params.row.assettype ? params.row.assettype.name : "",
//     },
//     {
//       field: "department",
//       headerName: "Phòng",
//       flex: 1,
//       valueGetter: (params) =>
//         params.row.department ? params.row.department.name : "",
//     },
//     {
//       field: "description",
//       headerName: "Mô tả",
//       flex: 1,
//       valueFormatter: (params) =>
//         params.value === null ? "null" : params.value,
//     },
//     {
//       field: "dateuse",
//       headerName: "Năm sử dụng",
//       flex: 1,
//       valueFormatter: (params) =>
//         params.value === null ? "null" : params.value,
//     },
//     {
//       field: "wearrate",
//       headerName: "Hao mòn",
//       flex: 1,
//       valueGetter: (params) => {
//         const wearRate = calculateWearRate(params.row.dateuse);
//         return wearRate;
//       },
//     },
//     {
//       field: "devicecode",
//       headerName: "Mã thiết bị",
//       flex: 1,
//       valueFormatter: (params) =>
//         params.value === null ? "null" : params.value,
//     },
//     {
//       field: "specification",
//       headerName: "Đặc điểm",
//       flex: 1,
//       valueFormatter: (params) =>
//         params.value === null ? "null" : params.value,
//     },
//     {
//       field: "liquidationStatus",
//       headerName: "Trạng thái",
//       flex: 1,
//       valueGetter: (params) => {
//         const wearRate = calculateWearRate(params.row.dateuse);
//         return wearRate >= 100 ? "Cần thanh lý" : "Đang sử dụng";
//       },
//     },
//   ];

//   const handleAdd = () => {
//     setIsModalOpen(true);
//   };

//   const handleEdit = () => {
//     if (selectedRows.length === 1) {
//       const selectedRowId = selectedRows[0];
//       const selectedRow = assetsData.find((row) => row._id === selectedRowId);
//       setSelectedRowData(selectedRow);
//       setIsModalOpen(true);
//     } else {
//       console.log("Please select one row to edit.");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       for (const id of selectedRows) {
//         await deleteAsset(id);
//       }
//       refetch();
//       console.log("Delete successful");
//     } catch (error) {
//       console.error("Failed to delete asset", error);
//     }
//   };

//   const handleFormSubmit = async (formData) => {
//     try {
//       const updatedFormData = {
//         ...formData,
//         wearrate: calculateWearRate(formData.dateuse),
//       };

//       console.log("Data to be sent:", updatedFormData);

//       if (selectedRowData) {
//         await updateAsset({
//           id: selectedRowData._id,
//           updateAsset: updatedFormData,
//         }).unwrap();
//       } else {
//         await addAsset(updatedFormData);
//       }
//       refetch();
//       setIsModalOpen(false);
//       setSelectedRowData(null);
//       console.log("Form submitted successfully");
//     } catch (error) {
//       console.error("Failed to submit form", error);
//     }
//   };

//   const handleLiquidate = () => {
//     if (selectedRows.length === 1) {
//       const selectedRowId = selectedRows[0];
//       const selectedRow = assetsData.find((row) => row._id === selectedRowId);
//       setSelectedRowData(selectedRow);
//       setIsConfirmModalOpen(true);
//     } else {
//       console.log("Please select one row to liquidate.");
//     }
//   };

//   const handleConfirmLiquidate = async (liquidateQuantity) => {
//     try {
//       if (selectedRowData) {
//         const { _id, name, quantity, price } = selectedRowData;

//         const currentDate = new Date().toISOString();

//         await liquidateAsset({
//           id: _id,
//           name,
//           quantity:liquidateQuantity,
//           price,
//           dateliquidate: currentDate,
//         });

//         const remainingQuantity = quantity - liquidateQuantity;
//         if (remainingQuantity > 0) {
//           await updateAsset({
//             id: _id,
//             updateAsset: {
//               ...selectedRowData,
//               quantity: remainingQuantity,
//             },
//           }).unwrap();
//         } else {
//           await deleteAsset(selectedRowData._id); // Xóa tài sản nếu hết số lượng
//         }

//         // await deleteAsset(selectedRowData._id);
//         refetch();
//         setIsConfirmModalOpen(false);
//         setSelectedRowData(null);
//         console.log("Liquidate successful");
//       }
//     } catch (error) {
//       console.error("Failed to liquidate asset", error);
//     }
//   };

//   const handleTransfer = () => {
//     if (selectedRows.length === 1) {
//       const selectedRowId = selectedRows[0];
//       const selectedRow = assetsData.find((row) => row._id === selectedRowId);
//       setSelectedRowData(selectedRow);
//       setIsTransferModalOpen(true);
//     } else {
//       console.log("Please select one row to transfer.");
//     }
//   };

//   const handleConfirmTransfer = async (formData) => {
//     try {
//       if (selectedRowData) {
//         const currentDate = new Date().toISOString();
//         const updatedAssetData = {
//           ...selectedRowData,
//           department: formData.newDepartment,
//         };

//         await transferAsset({
//           id: selectedRowData._id,
//           transferData: {
//             ...formData,
//             transferDate: currentDate,
//           },
//         }).unwrap();

//         await updateAsset({
//           id: selectedRowData._id,
//           updateAsset: updatedAssetData,
//         }).unwrap();

//         refetch();
//         setIsTransferModalOpen(false);
//         setSelectedRowData(null);
//         console.log("Transfer successful");
//       }
//     } catch (error) {
//       console.error("Failed to transfer asset", error);
//     }
//   };

//   return (
//     <Box m="1.5rem 2.5rem">
//       <Header title="Tài sản" subtitle="Danh sách tài sản cố định" />
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
//           loading={isAssetsLoading || !assetsData}
//           getRowId={(row) => row._id}
//           rows={(assetsData && assetsData) || []}
//           columns={columns}
//           rowCount={(assetsData && assetsData.total) || 0}
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
//           components={{ Toolbar: DataGridAssetToolbar }}
//           componentsProps={{
//             toolbar: {
//               searchInput,
//               setSearchInput,
//               setSearch,
//               selectedRows,
//               onAdd: handleAdd,
//               onEdit: handleEdit,
//               onDelete: handleDelete,
//               onLiquidate: handleLiquidate,
//               onTransfer: handleTransfer,
//             },
//           }}
//         />
//       </Box>
//       <AssetFormModal
//         open={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedRowData(null);
//         }}
//         onSubmit={handleFormSubmit}
//         initialFormData={selectedRowData}
//       />
//       <ConfirmLiquidateModal
//         open={isConfirmModalOpen}
//         onClose={() => {
//           setIsConfirmModalOpen(false);
//           setSelectedRowData(null);
//         }}
//         onConfirm={handleConfirmLiquidate}
//         data={selectedRowData}
//       />
//       <TransferFormModal
//         open={isTransferModalOpen}
//         onClose={() => {
//           setIsTransferModalOpen(false);
//           setSelectedRowData(null);
//         }}
//         onSubmit={handleConfirmTransfer}
//         initialFormData={selectedRowData}
//       />
//     </Box>
//   );
// };

// export default Product;




// import React, { useState, useEffect } from "react";
// import { Box, useTheme } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { useNavigate, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";

// import {
//   useGetAssetQuery,
//   useGetAssetsByDepartmentQuery,
//   useGetAssetsByFacultyQuery,
//   useAddAssetMutation,
//   useUpdateAssetMutation,
//   useDeleteAssetMutation,
//   useLiquidateAssetMutation,
//   useTransferAssetMutation,
// } from "state/api";
// import Header from "components/Header";
// import DataGridAssetToolbar from "components/DataGridAssetToolbar";
// import AssetFormModal from "components/AssetFormModal";
// import ConfirmLiquidateModal from "components/ConfirmLiquidateModal";
// import TransferFormModal from "components/TransferFormModal";

// const Product = () => {
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const { departmentId } = useParams();

//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(20);
//   const [sort, setSort] = useState({});
//   const [search, setSearch] = useState("");
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [searchInput, setSearchInput] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedRowData, setSelectedRowData] = useState(null);
//   const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
//   const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);

//   const user = useSelector((state) => state.global.user);

//   const isAdmin = user && user.user.role === "admin";
//   const isStaff = user && user.user.role === "staff";
//   const isUser = user?.user?.account?.role === "user";

//   const queryArgs = {
//     page,
//     pageSize,
//     sort: JSON.stringify(sort),
//     search,
//   };

//   const adminQuery = useGetAssetQuery(queryArgs, {
//     skip: !isAdmin,
//   });

//   const staffQuery = useGetAssetsByFacultyQuery(
//     isStaff ? user.staff.faculties : null,
//     queryArgs,
//     {
//       skip: !isStaff,
//     }
//   );

//   const userQuery = useGetAssetsByDepartmentQuery(
//     isUser ? user.user.departments : null,
//     queryArgs,
//     {
//       skip: !isUser,
//     }
//   );

//   const {
//     data: assetsData,
//     isLoading: isAssetsLoading,
//     refetch,
//   } = isAdmin
//     ? adminQuery
//     : isStaff
//     ? staffQuery
//     : isUser
//     ? userQuery
//     : { data: [], isLoading: false, refetch: () => {} };

//   const [addAsset] = useAddAssetMutation();
//   const [updateAsset] = useUpdateAssetMutation();
//   const [deleteAsset] = useDeleteAssetMutation();
//   const [liquidateAsset] = useLiquidateAssetMutation();
//   const [transferAsset] = useTransferAssetMutation();

//   useEffect(() => {
//     if (assetsData && assetsData.length > 0) {
//       const updatedAssetsData = assetsData.map((asset) => {
//         const wearRate = calculateWearRate(asset.dateuse);
//         return {
//           ...asset,
//           wearrate: wearRate,
//         };
//       });
//     }
//   }, [assetsData]);

//   const calculateWearRate = (dateuse) => {
//     if (!dateuse) return 0;
//     const currentDate = new Date();
//     const useDate = new Date(dateuse);
//     const yearDifference = currentDate.getFullYear() - useDate.getFullYear();
//     const wearRateIncrease = yearDifference * 5; 
//     return wearRateIncrease > 100 ? 100 : wearRateIncrease;
//   };

//   useEffect(() => {
//     console.log("User:", user.user._id); 
//     console.log("Assets Data:", assetsData);
//   }, [user, assetsData]);

//   const columns = [
//     { field: "name", headerName: "Tên", flex: 1 },
//     { field: "price", headerName: "Giá", flex: 1 },
//     { field: "quantity", headerName: "Số lượng", flex: 1 },
//     {
//       field: "assettype",
//       headerName: "Loại tài sản",
//       flex: 1,
//       valueGetter: (params) =>
//         params.row.assettype ? params.row.assettype.name : "",
//     },
//     {
//       field: "department",
//       headerName: "Phòng",
//       flex: 1,
//       valueGetter: (params) =>
//         params.row.department ? params.row.department.name : "",
//     },
//     {
//       field: "description",
//       headerName: "Mô tả",
//       flex: 1,
//       valueFormatter: (params) =>
//         params.value === null ? "null" : params.value,
//     },
//     {
//       field: "dateuse",
//       headerName: "Năm sử dụng",
//       flex: 1,
//       valueFormatter: (params) =>
//         params.value === null ? "null" : params.value,
//     },
//     {
//       field: "wearrate",
//       headerName: "Hao mòn",
//       flex: 1,
//       valueGetter: (params) => {
//         const wearRate = calculateWearRate(params.row.dateuse);
//         return wearRate;
//       },
//     },
//     {
//       field: "devicecode",
//       headerName: "Mã thiết bị",
//       flex: 1,
//       valueFormatter: (params) =>
//         params.value === null ? "null" : params.value,
//     },
//     {
//       field: "specification",
//       headerName: "Đặc điểm",
//       flex: 1,
//       valueFormatter: (params) =>
//         params.value === null ? "null" : params.value,
//     },
//     {
//       field: "liquidationStatus",
//       headerName: "Trạng thái",
//       flex: 1,
//       valueGetter: (params) => {
//         const wearRate = calculateWearRate(params.row.dateuse);
//         return wearRate >= 100 ? "Cần thanh lý" : "Đang sử dụng";
//       },
//     },
//   ];

//   const handleAdd = () => {
//     setIsModalOpen(true);
//   };

//   const handleEdit = () => {
//     if (selectedRows.length === 1) {
//       const selectedRowId = selectedRows[0];
//       const selectedRow = assetsData.find((row) => row._id === selectedRowId);
//       setSelectedRowData(selectedRow);
//       setIsModalOpen(true);
//     } else {
//       console.log("Please select one row to edit.");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       for (const id of selectedRows) {
//         await deleteAsset(id);
//       }
//       refetch();
//       console.log("Delete successful");
//     } catch (error) {
//       console.error("Failed to delete asset", error);
//     }
//   };

//   const handleFormSubmit = async (formData) => {
//     try {
//       const updatedFormData = {
//         ...formData,
//         wearrate: calculateWearRate(formData.dateuse),
//       };

//       console.log("Data to be sent:", updatedFormData);

//       if (selectedRowData) {
//         await updateAsset({
//           id: selectedRowData._id,
//           updateAsset: updatedFormData,
//         }).unwrap();
//       } else {
//         await addAsset(updatedFormData);
//       }
//       refetch();
//       setIsModalOpen(false);
//       setSelectedRowData(null);
//       console.log("Form submitted successfully");
//     } catch (error) {
//       console.error("Failed to submit form", error);
//     }
//   };

//   const handleLiquidate = () => {
//     if (selectedRows.length === 1) {
//       const selectedRowId = selectedRows[0];
//       const selectedRow = assetsData.find((row) => row._id === selectedRowId);
//       const wearRate = calculateWearRate(selectedRow.dateuse); // Tính toán wearRate
//       setSelectedRowData({ ...selectedRow, wearRate });
//       // setSelectedRowData(selectedRow);
//       setIsConfirmModalOpen(true);
//     } else {
//       console.log("Please select one row to liquidate.");
//     }
//   };

//   const handleConfirmLiquidate = async (liquidateQuantity) => {
//     try {
//       if (selectedRowData) {
//         const { _id, name, quantity, price } = selectedRowData;
//         const currentDate = new Date().toISOString();

//         await liquidateAsset({
//           id: _id,
//           name,
//           quantity: liquidateQuantity,
//           price,
//           dateliquidate: currentDate,
//         });

//         const remainingQuantity = quantity - liquidateQuantity;
//         if (remainingQuantity > 0) {
//           await updateAsset({
//             id: _id,
//             updateAsset: {
//               ...selectedRowData,
//               quantity: remainingQuantity,
//             },
//           }).unwrap();
//         } else {
//           await deleteAsset(selectedRowData._id); 
//         }

//         refetch();
//         setIsConfirmModalOpen(false);
//         setSelectedRowData(null);
//         console.log("Liquidate successful");
//       }
//     } catch (error) {
//       console.error("Failed to liquidate asset", error);
//     }
//   };

//   const handleTransfer = () => {
//     if (selectedRows.length === 1) {
//       const selectedRowId = selectedRows[0];
//       const selectedRow = assetsData.find((row) => row._id === selectedRowId);
//       setSelectedRowData(selectedRow);
//       setIsTransferModalOpen(true);
//     } else {
//       console.log("Please select one row to transfer.");
//     }
//   };

//   // const handleConfirmTransfer = async (formData) => {
//   //   try {
//   //     if (selectedRowData) {
//   //       const currentDate = new Date().toISOString();
//   //       const updatedAssetData = {
//   //         ...selectedRowData,
//   //         department: formData.newDepartment,
//   //       };

//   //       await transferAsset({
//   //         id: selectedRowData._id,
//   //         transferData: {
//   //           ...formData,
//   //           transferDate: currentDate,
//   //         },
//   //       }).unwrap();

//   //       await updateAsset({
//   //         id: selectedRowData._id,
//   //         updateAsset: updatedAssetData,
//   //       }).unwrap();
//   const handleConfirmTransfer = async (formData) => {
//     try {
//       if (selectedRowData) {
//         const currentDate = new Date().toISOString();
//         const updatedAssetData = {
//           ...selectedRowData,
//           department: formData.newDepartment,
//           quantity: formData.quantity, // Cập nhật số lượng mới
//         };

//         await transferAsset({
//           id: selectedRowData._id,
//           transferData: {
//             ...formData,
//             transferDate: currentDate,
//           },
//         }).unwrap();

//         await updateAsset({
//           id: selectedRowData._id,
//           updateAsset: updatedAssetData,
//         }).unwrap();
//         refetch();
//         setIsTransferModalOpen(false);
//         setSelectedRowData(null);
//         console.log("Transfer successful");
//       }
//     } catch (error) {
//       console.error("Failed to transfer asset", error);
//     }
//   //   const handleConfirmTransfer = async (formData) => {
//   //     try {
//   //       if (selectedRowData) {
//   //         const currentDate = new Date().toISOString();
//   //         const { quantity: oldQuantity, ...restSelectedRowData } = selectedRowData;

//   //         const newAssetData = {
//   //           ...restSelectedRowData,
//   //           department: formData.newDepartment,
//   //           quantity: formData.quantity,
//   //         };

//   //         await addAsset(newAssetData); // Create a new asset in the new department

//   //         const remainingQuantity = oldQuantity - formData.quantity;
//   //         if (remainingQuantity > 0) {
//   //           await updateAsset({
//   //             id: selectedRowData._id,
//   //             updateAsset: {
//   //               ...selectedRowData,
//   //               quantity: remainingQuantity,
//   //             },
//   //           }).unwrap();
//   //         } else {
//   //           await deleteAsset(selectedRowData._id); 
//   //         }

//   //         refetch();
//   //         setIsTransferModalOpen(false);
//   //         setSelectedRowData(null);
//   //         console.log('Transfer successful');
//   //       }
//   //     } catch (error) {
//   //       console.error('Failed to transfer asset', error);
//   //     }

//   // };
//   const handleConfirmTransfer = async (formData) => {
//     try {
//       if (selectedRowData) {
//         const { _id, name, price, dateuse, assettype, devicecode, specification, description, quantity } = selectedRowData;

//         const newDepartmentId = formData.newDepartment;
//         const transferQuantity = formData.quantity;
//         const currentDate = new Date().toISOString();

//         // Cập nhật tài sản mới trong phòng mới
//         await addAsset({
//           name,
//           price,
//           quantity: transferQuantity,
//           dateuse,
//           assettype,
//           devicecode,
//           specification,
//           description,
//           department: newDepartmentId,
//         });

//         // Cập nhật số lượng còn lại trong phòng cũ
//         const remainingQuantity = quantity - transferQuantity;
//         if (remainingQuantity > 0) {
//           await updateAsset({
//             id: _id,
//             updateAsset: {
//               ...selectedRowData,
//               quantity: remainingQuantity,
//             },
//           }).unwrap();
//         } else {
//           await deleteAsset(_id); 
//         }

//         refetch();
//         setIsTransferModalOpen(false);
//         setSelectedRowData(null);
//         console.log("Transfer successful");
//       }
//     } catch (error) {
//       console.error("Failed to transfer asset", error);
//     }
//   };


//   return (
//     <Box m="1.5rem 2.5rem">
//       <Header title="Tài sản" subtitle="Danh sách tài sản cố định" />
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
//           loading={isAssetsLoading || !assetsData}
//           getRowId={(row) => row._id}
//           rows={(assetsData && assetsData) || []}
//           columns={columns}
//           rowCount={(assetsData && assetsData.total) || 0}
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
//           components={{ Toolbar: DataGridAssetToolbar }}
//           componentsProps={{
//             toolbar: {
//               searchInput,
//               setSearchInput,
//               setSearch,
//               selectedRows,
//               onAdd: handleAdd,
//               onEdit: handleEdit,
//               onDelete: handleDelete,
//               onLiquidate: handleLiquidate,
//               onTransfer: handleTransfer,
//             },
//           }}
//         />
//       </Box>
//       <AssetFormModal
//         open={isModalOpen}
//         onClose={() => {
//           setIsModalOpen(false);
//           setSelectedRowData(null);
//         }}
//         onSubmit={handleFormSubmit}
//         initialFormData={selectedRowData}
//       />
//       <ConfirmLiquidateModal
//         open={isConfirmModalOpen}
//         onClose={() => {
//           setIsConfirmModalOpen(false);
//           setSelectedRowData(null);
//         }}
//         onConfirm={handleConfirmLiquidate}
//         data={selectedRowData}
//       />
//       <TransferFormModal
//         open={isTransferModalOpen}
//         onClose={() => {
//           setIsTransferModalOpen(false);
//           setSelectedRowData(null);
//         }}
//         onSubmit={handleConfirmTransfer}
//         initialFormData={selectedRowData}
//       />
//     </Box>
//   );
// };

// export default Product;



import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  useGetAssetQuery,
  useGetAssetsByDepartmentQuery,
  useGetAssetsByFacultyQuery,
  useAddAssetMutation,
  useUpdateAssetMutation,
  useDeleteAssetMutation,
  useLiquidateAssetMutation,
  useTransferAssetMutation,
} from "state/api";
import Header from "components/Header";
import DataGridAssetToolbar from "components/DataGridAssetToolbar";
import AssetFormModal from "components/AssetFormModal";
import ConfirmLiquidateModal from "components/ConfirmLiquidateModal";
import TransferFormModal from "components/TransferFormModal";

const Product = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy departmentId từ URL

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const user = useSelector((state) => state.global.user);

  const isAdmin = user && user.user.role === "admin";
  const isStaff = user && user.user.role === "staff";
  const isUser = user?.user?.account?.role === "user";

  const queryArgs = {
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  };

  const adminQuery = useGetAssetQuery(queryArgs, {
    skip: !isAdmin,
  });

  const staffQuery = useGetAssetsByFacultyQuery(
    isStaff ? user.staff.faculties : null,
    queryArgs,
    {
      skip: !isStaff,
    }
  );

  const userQuery = useGetAssetsByDepartmentQuery(
    id ? [id] : null, // Sử dụng departmentId để lọc theo phòng ban
    queryArgs,
    {
      skip: !id || !isUser,
    }
  );

  const {
    data: assetsData,
    isLoading: isAssetsLoading,
    refetch,
  } = isAdmin
      ? adminQuery
      : isStaff
        ? staffQuery
        : isUser
          ? userQuery
          : { data: [], isLoading: false, refetch: () => { } };

  const [addAsset] = useAddAssetMutation();
  const [updateAsset] = useUpdateAssetMutation();
  const [deleteAsset] = useDeleteAssetMutation();
  const [liquidateAsset] = useLiquidateAssetMutation();
  const [transferAsset] = useTransferAssetMutation();

  useEffect(() => {
    if (assetsData && assetsData.length > 0) {
      const updatedAssetsData = assetsData.map((asset) => ({
        ...asset,
        wearrate: calculateWearRate(asset.dateuse),
      }));
      // Cần gán updatedAssetsData vào state hoặc sử dụng nó ở đây
    }
  }, [assetsData]); // Thêm assetsData vào dependency để trigger khi dữ liệu thay đổi

  const calculateWearRate = (dateuse) => {
    if (!dateuse) return 0;
    const currentDate = new Date();
    const useDate = new Date(dateuse);
    const yearDifference = currentDate.getFullYear() - useDate.getFullYear();
    const wearRateIncrease = yearDifference * 5;
    return wearRateIncrease > 100 ? 100 : wearRateIncrease;
  };

  useEffect(() => {
    console.log("User:", user.user._id);
    console.log("Assets Data:", assetsData);
  }, [user, assetsData]);

  const columns = [
    { field: "name", headerName: "Tên", flex: 1 },
    { field: "price", headerName: "Giá", flex: 1 },
    { field: "quantity", headerName: "Số lượng", flex: 1 },
    {
      field: "assettype",
      headerName: "Loại tài sản",
      flex: 1,
      valueGetter: (params) =>
        params.row.assettype ? params.row.assettype.name : "",
    },
    {
      field: "department",
      headerName: "Phòng",
      flex: 1,
      valueGetter: (params) =>
        params.row.department ? params.row.department.name : "",
    },
    {
      field: "description",
      headerName: "Mô tả",
      flex: 1,
      valueFormatter: (params) =>
        params.value === null ? "null" : params.value,
    },
    {
      field: "dateuse",
      headerName: "Năm sử dụng",
      flex: 1,
      valueFormatter: (params) =>
        params.value === null ? "null" : params.value,
    },
    {
      field: "wearrate",
      headerName: "Hao mòn",
      flex: 1,
      valueGetter: (params) => {
        const wearRate = calculateWearRate(params.row.dateuse);
        return wearRate;
      },
    },
    {
      field: "devicecode",
      headerName: "Mã thiết bị",
      flex: 1,
      valueFormatter: (params) =>
        params.value === null ? "null" : params.value,
    },
    {
      field: "specification",
      headerName: "Đặc điểm",
      flex: 1,
      valueFormatter: (params) =>
        params.value === null ? "null" : params.value,
    },
    {
      field: "liquidationStatus",
      headerName: "Trạng thái",
      flex: 1,
      valueGetter: (params) => {
        const wearRate = calculateWearRate(params.row.dateuse);
        return wearRate >= 100 ? "Cần thanh lý" : "Đang sử dụng";
      },
    },
    // {
    //   field: "view",
    //   headerName: "Xem chi tiết",
    //   flex: 1,
    //   renderCell: (params) => {
    //     return <FaRegEye  onClick={() => navigate(`/assets/${params?.id}`)}/>
    //   }
    // }
  ];

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleEdit = () => {
    if (selectedRows.length === 1) {
      const selectedRowId = selectedRows[0];
      const selectedRow = assetsData.find((row) => row._id === selectedRowId);
      setSelectedRowData(selectedRow);
      setIsModalOpen(true);
    } else {
      console.log("Please select one row to edit.");
    }
  };

  const handleDelete = async () => {
    try {
      for (const id of selectedRows) {
        await deleteAsset(id);
      }
      refetch();
      console.log("Delete successful");
    } catch (error) {
      console.error("Failed to delete asset", error);
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      const updatedFormData = {
        ...formData,
        wearrate: calculateWearRate(formData.dateuse),
      };

      console.log("Data to be sent:", updatedFormData);

      if (selectedRowData) {
        await updateAsset({
          id: selectedRowData._id,
          updateAsset: updatedFormData,
        }).unwrap();
      } else {
        await addAsset(updatedFormData);
      }
      refetch();
      setIsModalOpen(false);
      setSelectedRowData(null);
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Failed to submit form", error);
    }
  };

  const handleLiquidate = () => {
    if (selectedRows.length === 1) {
      const selectedRowId = selectedRows[0];
      const selectedRow = assetsData.find((row) => row._id === selectedRowId);
      const wearRate = calculateWearRate(selectedRow.dateuse); // Tính toán wearRate
      setSelectedRowData({ ...selectedRow, wearRate });
      setIsConfirmModalOpen(true);
    } else {
      console.log("Please select one row to liquidate.");
    }
  };

  const handleConfirmLiquidate = async (liquidateQuantity) => {
    try {
      if (selectedRowData) {
        const { _id, name, quantity, price } = selectedRowData;
        const currentDate = new Date().toISOString();

        await liquidateAsset({
          id: _id,
          name,
          quantity: liquidateQuantity,
          price,
          dateliquidate: currentDate,
        });

        const remainingQuantity = quantity - liquidateQuantity;
        if (remainingQuantity > 0) {
          await updateAsset({
            id: _id,
            updateAsset: {
              ...selectedRowData,
              quantity: remainingQuantity,
            },
          }).unwrap();
        } else {
          await deleteAsset(selectedRowData._id);
        }

        refetch();
        setIsConfirmModalOpen(false);
        setSelectedRowData(null);
        console.log("Liquidate successful");
      }
    } catch (error) {
      console.error("Failed to liquidate asset", error);
    }
  };

  const handleTransfer = () => {
    if (selectedRows.length === 1) {
      const selectedRowId = selectedRows[0];
      const selectedRow = assetsData.find((row) => row._id === selectedRowId);
      setSelectedRowData(selectedRow);
      setIsTransferModalOpen(true);
    } else {
      console.log("Please select one row to transfer.");
    }
  };

  const handleConfirmTransfer = async (formData) => {
    try {
      if (selectedRowData) {
        const { _id, name, price, dateuse, assettype, devicecode, specification, description, quantity } = selectedRowData;

        const newDepartmentId = formData.newDepartment;
        const transferQuantity = formData.quantity;
        const currentDate = new Date().toISOString();

        // Cập nhật tài sản mới trong phòng mới
        await addAsset({
          name,
          price,
          quantity: transferQuantity,
          dateuse,
          assettype,
          devicecode,
          specification,
          description,
          department: newDepartmentId,
        });

        // Cập nhật số lượng còn lại trong phòng cũ
        const remainingQuantity = quantity - transferQuantity;
        if (remainingQuantity > 0) {
          await updateAsset({
            id: _id,
            updateAsset: {
              ...selectedRowData,
              quantity: remainingQuantity,
            },
          }).unwrap();
        } else {
          await deleteAsset(_id);
        }

        refetch();
        setIsTransferModalOpen(false);
        setSelectedRowData(null);
        console.log("Transfer successful");
      }
    } catch (error) {
      console.error("Failed to transfer asset", error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Tài sản" subtitle="Danh sách tài sản cố định" />
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
          loading={isAssetsLoading || !assetsData}
          getRowId={(row) => row._id}
          rows={(assetsData && assetsData) || []}
          columns={columns}
          rowCount={(assetsData && assetsData.total) || 0}
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
          components={{ Toolbar: DataGridAssetToolbar }}
          componentsProps={{
            toolbar: {
              searchInput,
              setSearchInput,
              setSearch,
              selectedRows,
              onAdd: handleAdd,
              onEdit: handleEdit,
              onDelete: handleDelete,
              onLiquidate: handleLiquidate,
              onTransfer: handleTransfer,
            },
          }}
        />
      </Box>
      <AssetFormModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRowData(null);
        }}
        onSubmit={handleFormSubmit}
        initialFormData={selectedRowData}
      />
      <ConfirmLiquidateModal
        open={isConfirmModalOpen}
        onClose={() => {
          setIsConfirmModalOpen(false);
          setSelectedRowData(null);
        }}
        onConfirm={handleConfirmLiquidate}
        data={selectedRowData}
      />
      <TransferFormModal
        open={isTransferModalOpen}
        onClose={() => {
          setIsTransferModalOpen(false);
          setSelectedRowData(null);
        }}
        onSubmit={handleConfirmTransfer}
        initialFormData={selectedRowData}
      />
    </Box>
  );
};

export default Product;
