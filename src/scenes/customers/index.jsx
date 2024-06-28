// import React, { useState } from "react";
// import { Box, useTheme } from "@mui/material";
// import { useGetStaffsQuery, useAddAccountMutation, useAddStaffMutation, useDeleteStaffMutation } from "state/api";
// import Header from "components/Header";
// import { useNavigate, useParams } from "react-router-dom";
// import { DataGrid } from "@mui/x-data-grid";
// import DataGridCustomer from "components/DataGridCustomer";
// import CustomerFormModal from "components/CustomerFormModal";
// import AddStaffModal from "components/AddStaffModal";

// const Customers = () => {
//   const theme = useTheme();
//   const { data, isLoading } = useGetStaffsQuery();
//   console.log("data", data);
//   const navigate = useNavigate();
//   const { facultyId } = useParams();

//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(20);
//   const [sort, setSort] = useState({});
//   const [search, setSearch] = useState("");
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [searchInput, setSearchInput] = useState("");
//   const [isCustomerFormModalOpen, setIsCustomerFormModalOpen] = useState(false);
//   const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
//   const [selectedRowData, setSelectedRowData] = useState(null);
//   const queryArgs = {
//     page,
//     pageSize,
//     sort: JSON.stringify(sort),
//     search,
//   };
//   const [addaccount] = useAddAccountMutation();
//   const [addstaff] = useAddStaffMutation();
//   const [deletestaff] = useDeleteStaffMutation();
//   const columns = [
//     {
//       field: "_id",
//       headerName: "ID",
//       flex: 1,
//     },
//     {
//       field: "name",
//       headerName: "Name",
//       flex: 1,
//     },
//     {
//       field: "faculty",
//       headerName: "Faculty",
//       flex: 1,
//       valueGetter: (params) => params.row.faculty ? params.row.faculty.name : ''
//     },
    
    
//     {
//       field: "gender",
//       headerName: "Gender",
//       flex: 1,
//       valueFormatter: (params) => params.value === null ? "null" : params.value
//     },
//     {
//       field: "phone",
//       headerName: "Phone",
//       flex: 1,
//       valueFormatter: (params) => params.value === null ? "null" : params.value
//     },
//     {
//       field: "address",
//       headerName: "Adress",
//       flex: 1,
//       valueFormatter: (params) => params.value === null ? "null" : params.value
//     },
//     {
//       field: "birthday",
//       headerName: "Birthday",
//       flex: 1,
//       valueFormatter: (params) => params.value === null ? "null" : params.value
//     },
    
//   ];
//   const handleAdd = () => {
//     setIsCustomerFormModalOpen(true);

//   };

//   const handleAddStaff = () => {
    
//     setIsAddStaffModalOpen(true);
    
//   };

//   const handleDelete = async () => {
    
//   };

//   return (
//     <Box m="1.5rem 2.5rem">
//       <Header title="Nhân viên" subtitle="Danh sách nhân viên" />
//       <Box
//         mt="40px"
//         height="75vh"
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
//           // loading={isLoading || !data}
//           // getRowId={(row) => row._id}
//           // rows={data || []}
//           // columns={columns}
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
//           components={{ Toolbar: DataGridCustomer }}
//           componentsProps={{
//             toolbar: {
//               searchInput,
//               setSearchInput,
//               setSearch,
//               selectedRows,
//               onCreateAccount: handleAdd,
//               onCreateStaff: handleAddStaff,
//               onDelete: handleDelete,
              
//             },
//           }}
//         />
//       </Box>
//       <CustomerFormModal
//         open={isCustomerFormModalOpen}
//         onClose={() => {
//           setIsCustomerFormModalOpen(false);
//           setSelectedRowData(null);
//         }}
//         //onSubmit={handleFormSubmit}
//         //initialFormData={selectedRowData}
//       />
//       <AddStaffModal open={isAddStaffModalOpen} 
//        onClose={() => {
//         setIsAddStaffModalOpen(false);
//         setSelectedRowData(null);
//       }}
//       //onSubmit={handleSubmitStaff} 
//       />
//     </Box>
//   );
// };

// export default Customers;
import React, { useState } from "react";
import { Box, useTheme } from "@mui/material";
import {
  useGetStaffsQuery,
  useAddAccountMutation,
  useAddStaffMutation,
  useDeleteStaffMutation,
} from "state/api";
import Header from "components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import DataGridCustomer from "components/DataGridCustomer";
import CustomerFormModal from "components/CustomerFormModal";
import AddStaffModal from "components/AddStaffModal";

const Customers = () => {
  const theme = useTheme();
  const { data, isLoading, refetch } = useGetStaffsQuery();
  const navigate = useNavigate();
  const { facultyId } = useParams();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isCustomerFormModalOpen, setIsCustomerFormModalOpen] = useState(false);
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const queryArgs = {
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  };
  const [addAccount] = useAddAccountMutation();
  const [addStaff] = useAddStaffMutation();
  const [deleteStaff] = useDeleteStaffMutation();

  const columns = [
        // {
        //   field: "_id",
        //   headerName: "ID",
        //   flex: 1,
        // },
        {
          field: "name",
          headerName: "Name",
          flex: 1,
        },
        {
          field: "faculty",
          headerName: "Faculty",
          flex: 1,
          valueGetter: (params) => params.row.faculty ? params.row.faculty.name : ''
        },
        
        
        {
          field: "gender",
          headerName: "Gender",
          flex: 1,
          valueFormatter: (params) => params.value === null ? "null" : params.value
        },
        {
          field: "phone",
          headerName: "Phone",
          flex: 1,
          valueFormatter: (params) => params.value === null ? "null" : params.value
        },
        {
          field: "address",
          headerName: "Adress",
          flex: 1,
          valueFormatter: (params) => params.value === null ? "null" : params.value
        },
        {
          field: "birthday",
          headerName: "Birthday",
          flex: 1,
          valueFormatter: (params) => params.value === null ? "null" : params.value
        },
        
      ];

  const handleAdd = () => {
    setIsCustomerFormModalOpen(true);
  };

  const handleAddStaff = () => {
    setIsAddStaffModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await Promise.all(selectedRows.map((id) => deleteStaff(id)));
      refetch();
      setSelectedRows([]);
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  const handleCreateAccountSubmit = async (formData) => {
    try {
      await addAccount(formData);
      refetch(); // Refresh DataGrid data
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };
  const handleAddStaffSubmit = async (formData) => {
    try {
      await addStaff(formData);
      refetch(); // Refresh DataGrid data
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Nhân viên" subtitle="Danh sách nhân viên" />
      <Box
        mt="40px"
        height="75vh"
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
          onSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
          components={{ Toolbar: DataGridCustomer }}
          componentsProps={{
            toolbar: {
              searchInput,
              setSearchInput,
              setSearch,
              selectedRows,
              onCreateAccount: handleAdd,
              onCreateStaff: handleAddStaff,
              onDelete: handleDelete,
            },
          }}
        />
      </Box>
      <CustomerFormModal
        open={isCustomerFormModalOpen}
        onClose={() => {
          setIsCustomerFormModalOpen(false);
          setSelectedRowData(null);
        }}
        onSubmit={handleCreateAccountSubmit}
      />
      <AddStaffModal
        open={isAddStaffModalOpen}
        onClose={() => {
          setIsAddStaffModalOpen(false);
          setSelectedRowData(null);
        }}
         onSubmit={handleAddStaffSubmit}
      />
    </Box>
  );
};

export default Customers;
