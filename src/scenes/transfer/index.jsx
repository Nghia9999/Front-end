import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useGetHistoryTransferQuery } from "state/api";

const Transfer = () => {
  

  const theme = useTheme();
  const { data, isLoading, refetch } = useGetHistoryTransferQuery();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    refetch(); 
  }, []);
  const columns = [
    // {
    //   field: "_id",
    //   headerName: "ID",
    //   flex: 1,
    // },
    {
      field: "name",
      headerName: "Tên",
      flex: 1,
    },
    {
      field: "quantity",
      headerName: "Số lượng",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Phòng cũ",
      flex: 1,
    },
    {
      field: "newDepartment",
      headerName: "Phòng hiện tại",
      flex: 1,
    },
    {
      field: "transferDate",
      headerName: "Ngày chuyển giao",
      flex: 1,
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "",
    },
  ];
  console.log(data)
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="LỊCH SỬ CHUYỂN GIAO" subtitle="Danh sách chuyển giao" />
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
         // components={{ Toolbar: DataGridCustomer }}
          componentsProps={{
            toolbar: {
              searchInput,
              setSearchInput,
              setSearch,
              selectedRows,
            },
          }}
        />
      </Box>
      </Box>
  );
};
export default Transfer;
// import React, { useState, useEffect } from "react";
// import { Box, useTheme } from "@mui/material";
// import Header from "components/Header";
// import { DataGrid } from "@mui/x-data-grid";
// import { useGetHistoryTransferQuery, useGetDepartmentByIdQuery } from "state/api";

// const Transfer = () => {
//   const theme = useTheme();
//   const { data: historyData, isLoading: isHistoryLoading, refetch: refetchHistory } = useGetHistoryTransferQuery();
//   const { data: departmentData, isLoading: isDepartmentLoading } = useGetDepartmentByIdQuery();

//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(20);
//   const [sort, setSort] = useState({});
//   const [search, setSearch] = useState("");
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [searchInput, setSearchInput] = useState("");

//   useEffect(() => {
//     refetchHistory();
//   }, []);

//   const fetchDepartmentName = async (departmentId) => {
//     try {
//       // Fetch department details using useGetDepartmentByIdQuery
//       const department = await departmentData(departmentId); // Assuming useGetDepartmentByIdQuery returns department details
//       return department.name; // Assuming department has a 'name' field
//     } catch (error) {
//       console.error("Error fetching department name:", error);
//       return "Unknown"; // Return a default value or handle error as needed
//     }
//   };

//   const columns = [
//     {
//       field: "name",
//       headerName: "Tên",
//       flex: 1,
//     },
//     {
//       field: "quantity",
//       headerName: "Số lượng",
//       flex: 1,
//     },
//     {
//       field: "department",
//       headerName: "Phòng cũ",
//       flex: 1,
//     },
//     {
//       field: "newDepartment",
//       headerName: "Phòng hiện tại",
//       flex: 1,
//       valueGetter: async (params) => {
//         const departmentId = params.row.newDepartment; // Assuming newDepartment holds the ObjectId
//         return await fetchDepartmentName(departmentId);
//       },
//     },
//     {
//       field: "transferDate",
//       headerName: "Ngày chuyển giao",
//       flex: 1,
//       valueFormatter: (params) =>
//         params.value ? new Date(params.value).toLocaleDateString() : "",
//     },
//   ];

//   return (
//     <Box m="1.5rem 2.5rem">
//       <Header title="LỊCH SỬ CHUYỂN GIAO" subtitle="Danh sách chuyển giao" />
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
//           loading={isHistoryLoading || isDepartmentLoading || !historyData}
//           getRowId={(row) => row._id}
//           rows={(historyData && historyData) || []}
//           columns={columns}
//           rowCount={(historyData && historyData.total) || 0}
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
//           onSelectionModelChange={(newSelection) =>
//             setSelectedRows(newSelection)
//           }
//           componentsProps={{
//             toolbar: {
//               searchInput,
//               setSearchInput,
//               setSearch,
//               selectedRows,
//             },
//           }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default Transfer;


