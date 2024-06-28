// import React, { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
// } from "@mui/material";
// import { useGetFacultysQuery, useGetAccountsQuery } from "state/api";

// const AddStaffModal = ({ open, onClose, onSubmit }) => {
//   const [name, setName] = useState("");
//   const [faculty, setFaculty] = useState("");
//   const [gender, setGender] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [selectedAccount, setSelectedAccount] = useState("");
//   const { data: facultiesData } = useGetFacultysQuery();
//   const { data: accountsData } = useGetAccountsQuery();

//   const handleSubmit = () => {
//     onSubmit({ name, faculty, gender, phone, address, account: selectedAccount });
//     // Clear the form fields
//     setName("");
//     setFaculty("");
//     setGender("");
//     setPhone("");
//     setAddress("");
//     setSelectedAccount("");
//     // Close the modal
//     onClose();
//   };
  

//   return (
//     <Dialog open={open} onClose={onClose}>
//       <DialogTitle>Add New Staff</DialogTitle>
//       <DialogContent>
//         <TextField
//           autoFocus
//           margin="dense"
//           label="Name"
//           type="text"
//           fullWidth
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <FormControl fullWidth margin="dense">
//           <InputLabel>Faculty</InputLabel>
//           <Select
//             value={faculty}
//             onChange={(e) => setFaculty(e.target.value)}
//           >
//             {facultiesData?.map((faculty) => (
//               <MenuItem key={faculty._id} value={faculty._id}>
//                 {faculty.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//         <RadioGroup
//           aria-label="gender"
//           name="gender"
//           value={gender}
//           onChange={(e) => setGender(e.target.value)}
//         >
//           <FormControlLabel value="male" control={<Radio />} label="Male" />
//           <FormControlLabel value="female" control={<Radio />} label="Female" />
//         </RadioGroup>
//         <TextField
//           margin="dense"
//           label="Phone"
//           type="text"
//           fullWidth
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//         />
//         <TextField
//           margin="dense"
//           label="Address"
//           type="text"
//           fullWidth
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//         />
//         <FormControl fullWidth margin="dense">
//           <InputLabel>Account</InputLabel>
//           <Select
//             value={selectedAccount}
//             onChange={(e) => setSelectedAccount(e.target.value)}
//           >
//             {accountsData?.map((account) => (
//               <MenuItem key={account._id} value={account._id}>
//                 {account.username}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={handleSubmit} color="primary">
//           Add
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default AddStaffModal;
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useGetFacultysQuery, useGetAccountsQuery } from "state/api";

const AddStaffModal = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [faculties, setFaculties] = useState([]);
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [selectedAccount, setSelectedAccount] = useState("");
  const { data: facultiesData } = useGetFacultysQuery();
  const { data: accountsData } = useGetAccountsQuery();

  const handleSubmit = () => {
    onSubmit({ name, faculties, gender, phone, address, account: selectedAccount });
    // Clear the form fields
    setName("");
    setFaculties([]);
    setGender("");
    setPhone("");
    setAddress("");
    setSelectedAccount("");
    // Close the modal
    onClose();
  };

  const handleChangeFaculties = (event) => {
    setFaculties(event.target.value);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Staff</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Faculties</InputLabel>
          <Select
            multiple
            value={faculties}
            onChange={handleChangeFaculties}
            fullWidth
          >
            {facultiesData?.map((faculty) => (
              <MenuItem key={faculty._id} value={faculty._id}>
                {faculty.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
        </RadioGroup>
        <TextField
          margin="dense"
          label="Phone"
          type="text"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Address"
          type="text"
          fullWidth
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Account</InputLabel>
          <Select
            value={selectedAccount}
            onChange={(e) => setSelectedAccount(e.target.value)}
          >
            {accountsData?.map((account) => (
              <MenuItem key={account._id} value={account._id}>
                {account.username}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddStaffModal;
