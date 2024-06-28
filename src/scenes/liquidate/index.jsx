import React, { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { useGetHistoryLiquidateQuery } from "state/api";

const Liquidate = () => {
  const theme = useTheme();
  const { data, isLoading, refetch } = useGetHistoryLiquidateQuery();
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
      field: "price",
      headerName: "Giá",
      flex: 1,
    },
    {
      field: "dateliquidate",
      headerName: "Ngày thanh lí",
      flex: 1,
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleDateString() : "",
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="LỊCH SỬ THANH LÍ" subtitle="Danh sách thanh lí" />
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
          onSelectionModelChange={(newSelection) =>
            setSelectedRows(newSelection)
          }
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

export default Liquidate;
