import React from "react";
import { Search, Edit, Delete, Add } from "@mui/icons-material";
import {
  IconButton,
  TextField,
  InputAdornment,
  Button,
  Box,
} from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";

const DataGridCustomer = ({
  searchInput,
  setSearchInput,
  setSearch,
  onCreateAccount,
  onCreateStaff,
  onDelete,
}) => {
  const handleCreateAccount = () => {
    onCreateAccount(); // Gọi hàm để hiển thị modal tạo tài khoản
  };

  const handleCreateStaff = () => {
    onCreateStaff(); // Gọi hàm để hiển thị modal tạo nhân viên
  };

  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <FlexBetween>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', ml: 2 }}>
            <Button
              onClick={handleCreateAccount}
              style={{ backgroundColor: "green", color: "white" }}
              startIcon={<Add />}
              variant="contained"
            >
              Tạo tài khoản
            </Button>

            <Button
              onClick={handleCreateStaff}
              style={{ borderColor: "blue", color: "blue" }}
              startIcon={<Edit />}
              variant="outlined"
            >
              Tạo nhân viên
            </Button>

            <Button
              onClick={onDelete}
              style={{ borderColor: "red", color: "red" }}
              startIcon={<Delete />}
              variant="outlined"
            >
              Xóa
            </Button>

          </Box>
          <TextField
            label="Search..."
            sx={{ mb: "0.5rem", width: "15rem" }}
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setSearch(searchInput);
                      setSearchInput("");
                    }}
                  >
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </FlexBetween>
      </FlexBetween>
    </GridToolbarContainer>
  );
};

export default DataGridCustomer;
