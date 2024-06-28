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

// const DataDepartmentToolbar = ({
//   searchInput,
//   setSearchInput,
//   setSearch,
//   selectedRows,
//   onAdd,
//   onEdit,
//   onDelete,
//   onView,
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
//                   onClick={onView}
//                   style={{ borderColor: "green", color: "blue" }}
//                   startIcon={<Search />}
//                   variant="outlined"
//                 >
//                   Xem
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

// export default DataDepartmentToolbar;
import React from "react";
import { useSelector } from "react-redux";
import { Search, Edit, Delete, Add } from "@mui/icons-material";
import { IconButton, TextField, InputAdornment, Button, Box } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";
import FlexBetween from "./FlexBetween";

const DataDepartmentToolbar = ({
  searchInput,
  setSearchInput,
  setSearch,
  selectedRows,
  onAdd,
  onEdit,
  onDelete,
  onView,
}) => {
  const userRole = useSelector((state) => state.global.user.user.role);

  const isAdminOrStaff = userRole === "admin" || userRole === "staff";

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
            {isAdminOrStaff && (
              <Button
                onClick={onAdd}
                style={{ backgroundColor: "green", color: "white" }}
                startIcon={<Add />}
                variant="contained"
              >
                Add
              </Button>
            )}
            {selectedRows.length > 0 && (
              <>
                {userRole && (
                  <>
                    <Button
                      onClick={onEdit}
                      style={{ borderColor: "blue", color: "blue" }}
                      startIcon={<Edit />}
                      variant="outlined"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={onDelete}
                      style={{ borderColor: "red", color: "red" }}
                      startIcon={<Delete />}
                      variant="outlined"
                    >
                      Delete
                    </Button>
                  </>
                )}
                <Button
                  onClick={onView}
                  style={{ borderColor: "green", color: "blue" }}
                  startIcon={<Search />}
                  variant="outlined"
                >
                  Xem
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

export default DataDepartmentToolbar;
