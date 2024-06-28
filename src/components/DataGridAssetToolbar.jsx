// import React from "react";
// import { Search, Edit, Delete, Add } from "@mui/icons-material";
// import { IconButton, TextField, InputAdornment, Button, Box } from "@mui/material";
// import {
//   GridToolbarDensitySelector,
//   GridToolbarContainer,
//   GridToolbarExport,
//   GridToolbarColumnsButton,
// } from "@mui/x-data-grid";
// import FlexBetween from "./FlexBetween";

// const DataGridCustomToolbar = ({
//   searchInput,
//   setSearchInput,
//   setSearch,
//   selectedRows,
//   onAdd,
//   onEdit,
//   onDelete,
// }) => {
//   return (
//     <GridToolbarContainer>
//       <FlexBetween width="100%">
//         <FlexBetween>
//           <GridToolbarColumnsButton />
//           <GridToolbarDensitySelector />
//           <GridToolbarExport />
//         </FlexBetween>
//         <FlexBetween>
//           <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', ml: 2 }}>
//             <Button
//               onClick={onAdd}
//               style={{ backgroundColor: "green", color: "white" }}
//               startIcon={<Add />}
//               variant="contained"
//             >
//               Add
//             </Button>
//             {selectedRows.length > 0 && (
//               <>
//                 <Button
//                   onClick={onEdit}
//                   style={{ borderColor: "blue", color: "blue" }}
//                   startIcon={<Edit />}
//                   variant="outlined"
//                 >
//                   Edit
//                 </Button>
//                 <Button
//                   onClick={onDelete}
//                   style={{ borderColor: "red", color: "red" }}
//                   startIcon={<Delete />}
//                   variant="outlined"
//                 >
//                   Delete
//                 </Button>
                
//               </>
//             )}
//           </Box>
//           <TextField
//             label="Search..."
//             sx={{ mb: "0.5rem", width: "15rem" }}
//             onChange={(e) => setSearchInput(e.target.value)}
//             value={searchInput}
//             variant="standard"
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     onClick={() => {
//                       setSearch(searchInput);
//                       setSearchInput("");
//                     }}
//                   >
//                     <Search />
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />
//         </FlexBetween>
//       </FlexBetween>
//     </GridToolbarContainer>
//   );
// };

// export default DataGridCustomToolbar;
import React from "react";
import { Search, Edit, Delete, Add, TransferWithinAStation, LocalShipping } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment, Button, Box } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";

const DataGridCustomToolbar = ({
  searchInput,
  setSearchInput,
  setSearch,
  selectedRows,
  onAdd,
  onEdit,
  onDelete,
  onLiquidate,
  onTransfer
}) => {
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
              onClick={onAdd}
              style={{ backgroundColor: "green", color: "white" }}
              startIcon={<Add />}
              variant="contained"
            >
              Thêm
            </Button>
            {selectedRows.length > 0 && (
              <>
                <Button
                  onClick={onEdit}
                  style={{ borderColor: "blue", color: "blue" }}
                  startIcon={<Edit />}
                  variant="outlined"
                >
                  Sửa
                </Button>
                <Button
                  onClick={onDelete}
                  style={{ borderColor: "red", color: "red" }}
                  startIcon={<Delete />}
                  variant="outlined"
                >
                  Xóa
                </Button>
                <Button
                  onClick={onLiquidate}
                  style={{ borderColor: "orange", color: "orange" }}
                  startIcon={<LocalShipping />}
                  variant="outlined"
                >
                  Thanh lí
                </Button>
                

                <Button
                  onClick={onTransfer}
                  style={{ borderColor: "purple", color: "purple" }}
                  startIcon={<TransferWithinAStation />}
                  variant="outlined"
                >
                  Chuyển giao
                </Button>
              </>
            )}
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

export default DataGridCustomToolbar;
