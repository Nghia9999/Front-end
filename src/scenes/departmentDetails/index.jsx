// import React from 'react';
// import { useParams } from 'react-router-dom';
// import { useGetDepartmentsByFacultyQuery } from 'state/api';
// import {
//   Container,
//   Typography,
//   CircularProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from '@mui/material';

// function DeparmentDetails() {
//     const { id } = useParams();
//     const { data, isError, isSuccess, isLoading } = useGetDepartmentsByFacultyQuery(id);

//     if (isLoading) {
//         return (
//             <Container>
//                 <CircularProgress />
//             </Container>
//         );
//     }

//     if (isError) {
//         return (
//             <Container>
//                 <Typography variant="h6" color="error">Error loading department details</Typography>
//             </Container>
//         );
//     }

//     if (isSuccess && data) {

//         return (
//             <Container>
//                 {/* <Typography variant="h4" gutterBottom>Faculty: {data?.faculty?.name}</Typography> */}
//                 <TableContainer component={Paper}>
//                     <Table>
//                         <TableHead>
//                             <TableRow>
//                                 <TableCell>ID</TableCell>
//                                 <TableCell>Department Name</TableCell>
//                                 <TableCell>Faculty Name</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {data?.map((department) => (
//                                 <TableRow key={department._id}>
//                                     <TableCell>{department?._id}</TableCell>
//                                     <TableCell>{department?.name}</TableCell>
//                                     <TableCell>{department?.faculty?.name}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//             </Container>
//         );
//     }

//     return null;
// }

// export default DeparmentDetails;
import React, { useState } from "react";
import { Box, CircularProgress, useTheme, Container,Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { useGetDepartmentsByFacultyQuery } from "state/api";
import Header from "components/Header";
import DataDepartmentToolbar from "components/DataDepartmentToolbar";

const DepartmentDetails = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [sort, setSort] = useState({});
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const queryArgs = {
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  };

  const { data, isLoading, isError, refetch } = useGetDepartmentsByFacultyQuery({ facultyId: id, ...queryArgs });

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "faculty",
      headerName: "Faculty",
      flex: 1,
      valueGetter: (params) => (params.row.faculty ? params.row.faculty.name : ""),
    },
  ];

  if (isLoading) {
    return (
      <Container>
        <CircularProgress />
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <Typography variant="h6" color="error">Error loading department details</Typography>
      </Container>
    );
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Faculty Details" subtitle="Departments under this faculty" />
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
          loading={isLoading}
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
              onAdd: () => {}, // Add functionality can be customized as needed
              onEdit: () => {}, // Edit functionality can be customized as needed
              onDelete: () => {}, // Delete functionality can be customized as needed
              onView: () => {}, // View functionality can be customized as needed
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default DepartmentDetails;

