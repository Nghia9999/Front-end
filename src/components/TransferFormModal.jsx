// // import React, { useState, useEffect } from 'react';
// // import { Modal, Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
// // import { useGetDepartmentsQuery } from 'state/api';

// // const TransferFormModal = ({ open, onClose, onSubmit, initialFormData }) => {
// //   const [formData, setFormData] = useState(initialFormData || {});
// //   const [departments, setDepartments] = useState([]);

// //   const { data: departmentsData } = useGetDepartmentsQuery();

// //   useEffect(() => {
// //     if (departmentsData) {
// //       setDepartments(departmentsData);
// //     }
// //   }, [departmentsData]);

// //   useEffect(() => {
// //     console.log('Initial Form Data:', initialFormData);
// //     if (initialFormData) {
// //       setFormData(initialFormData);
// //     }
// //   }, [initialFormData]);

// //   const handleChange = (e) => {
// //     setFormData({
// //       ...formData,
// //       [e.target.name]: e.target.value,
// //     });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     console.log('Form Data on Submit:', formData);
// //     onSubmit(formData);
// //   };

// //   return (
// //     <Modal open={open} onClose={onClose}>
// //       <Box sx={{ p: 3, bgcolor: 'background.paper', margin: 'auto', mt: 5, width: '50%' }}>
// //         <form onSubmit={handleSubmit}>
// //           <TextField
// //             label="Product Name"
// //             name="name"
// //             value={formData.name || ''}
// //             fullWidth
// //             margin="normal"
// //             InputProps={{
// //               readOnly: true,
// //             }}
// //           />
// //           <TextField
// //             label="Current Department"
// //             name="currentDepartment"
// //             value={formData.department?.name || ''}
// //             fullWidth
// //             margin="normal"
// //             InputProps={{
// //               readOnly: true,
// //             }}
// //           />
// //           <FormControl fullWidth margin="normal">
// //             <InputLabel>New Department</InputLabel>
// //             <Select
// //               label="New Department"
// //               name="newDepartment"
// //               value={formData.newDepartment || ''}
// //               onChange={handleChange}
// //             >
// //               {departments.map((department) => (
// //                 <MenuItem key={department._id} value={department._id}>
// //                   {department.name}
// //                 </MenuItem>
// //               ))}
// //             </Select>
// //           </FormControl>
// //           <Button type="submit" variant="contained" color="primary" fullWidth>
// //             Transfer
// //           </Button>
// //         </form>
// //       </Box>
// //     </Modal>
// //   );
// // };

// // export default TransferFormModal;
// import React, { useState, useEffect } from 'react';
// import { Modal, Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
// import { useGetDepartmentsQuery } from 'state/api';

// const TransferFormModal = ({ open, onClose, onSubmit, initialFormData }) => {
//   const [formData, setFormData] = useState(initialFormData || {});
//   const [departments, setDepartments] = useState([]);
//   const [transferQuantity, setTransferQuantity] = useState(1); // State để lưu số lượng chuyển giao

//   const { data: departmentsData } = useGetDepartmentsQuery();

//   useEffect(() => {
//     if (departmentsData) {
//       setDepartments(departmentsData);
//     }
//   }, [departmentsData]);

//   useEffect(() => {
//     console.log('Initial Form Data:', initialFormData);
//     if (initialFormData) {
//       setFormData(initialFormData);
//     }
//   }, [initialFormData]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleQuantityChange = (e) => {
//     setTransferQuantity(parseInt(e.target.value) || 1); // Chuyển đổi thành số nguyên và giới hạn ít nhất là 1
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (transferQuantity > formData.quantity) {
//       console.log(`Chosen quantity (${transferQuantity}) cannot exceed available quantity (${formData.quantity}).`);
//       return;
//     }

//     const dataWithQuantity = {
//       ...formData,
//       quantity: transferQuantity,
//     };
//     console.log('Form Data on Submit:', dataWithQuantity);
//     onSubmit(dataWithQuantity);
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box sx={{ p: 3, bgcolor: 'background.paper', margin: 'auto', mt: 5, width: '50%' }}>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Product Name"
//             name="name"
//             value={formData.name || ''}
//             fullWidth
//             margin="normal"
//             InputProps={{
//               readOnly: true,
//             }}
//           />
//           <TextField
//             label="Current Department"
//             name="currentDepartment"
//             value={formData.department?.name || ''}
//             fullWidth
//             margin="normal"
//             InputProps={{
//               readOnly: true,
//             }}
//           />
//           <TextField
//             label="Quantity"
//             type="number"
//             name="quantity"
//             value={transferQuantity}
//             onChange={handleQuantityChange}
//             fullWidth
//             margin="normal"
//             inputProps={{ min: 1, max: formData.quantity }} // Giới hạn số lượng nhập vào từ 1 đến số lượng hiện có
//           />
//           <FormControl fullWidth margin="normal">
//             <InputLabel>New Department</InputLabel>
//             <Select
//               label="New Department"
//               name="newDepartment"
//               value={formData.newDepartment || ''}
//               onChange={handleChange}
//             >
//               {departments.map((department) => (
//                 <MenuItem key={department._id} value={department._id}>
//                   {department.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Transfer
//           </Button>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

// export default TransferFormModal;

// import React, { useState, useEffect } from 'react';
// import { Modal, Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
// import { useGetDepartmentsQuery } from 'state/api';

// const TransferFormModal = ({ open, onClose, onSubmit, initialFormData }) => {
//   const [formData, setFormData] = useState(initialFormData || {});
//   const [departments, setDepartments] = useState([]);
//   const { data: departmentsData } = useGetDepartmentsQuery();

//   useEffect(() => {
//     if (departmentsData) {
//       setDepartments(departmentsData);
//     }
//   }, [departmentsData]);

//   useEffect(() => {
//     if (initialFormData) {
//       setFormData(initialFormData);
//     }
//   }, [initialFormData]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box sx={{ p: 3, bgcolor: 'background.paper', margin: 'auto', mt: 5, width: '50%' }}>
//         <form onSubmit={handleSubmit}>
//           <TextField
//             label="Product Name"
//             name="name"
//             value={formData.name || ''}
//             fullWidth
//             margin="normal"
//             InputProps={{
//               readOnly: true,
//             }}
//           />
//           <TextField
//             label="Current Department"
//             name="currentDepartment"
//             value={formData.department?.name || ''}
//             fullWidth
//             margin="normal"
//             InputProps={{
//               readOnly: true,
//             }}
//           />
//           <FormControl fullWidth margin="normal">
//             <InputLabel>New Department</InputLabel>
//             <Select
//               label="New Department"
//               name="newDepartment"
//               value={formData.newDepartment || ''}
//               onChange={handleChange}
//             >
//               {departments.map((department) => (
//                 <MenuItem key={department._id} value={department._id}>
//                   {department.name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <TextField
//             label="Quantity to Transfer"
//             type="number"
//             name="quantity"
//             value={formData.quantity || ''}
//             onChange={handleChange}
//             fullWidth
//             margin="normal"
//           />
//           <Button type="submit" variant="contained" color="primary" fullWidth>
//             Transfer
//           </Button>
//         </form>
//       </Box>
//     </Modal>
//   );
// };

// export default TransferFormModal;
import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useGetDepartmentsQuery } from 'state/api';

const TransferFormModal = ({ open, onClose, onSubmit, initialFormData }) => {
  const [formData, setFormData] = useState(initialFormData || {});
  const [departments, setDepartments] = useState([]);

  const { data: departmentsData } = useGetDepartmentsQuery();

  useEffect(() => {
    if (departmentsData) {
      setDepartments(departmentsData);
    }
  }, [departmentsData]);

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ p: 3, bgcolor: 'background.paper', margin: 'auto', mt: 5, width: '50%' }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Product Name"
            name="name"
            value={formData.name || ''}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            label="Current Department"
            name="currentDepartment"
            value={formData.department?.name || ''}
            fullWidth
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>New Department</InputLabel>
            <Select
              label="New Department"
              name="newDepartment"
              value={formData.newDepartment || ''}
              onChange={handleChange}
            >
              {departments.map((department) => (
                <MenuItem key={department._id} value={department._id}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Transfer Quantity"
            name="quantity"
            type="number"
            value={formData.quantity || ''}
            fullWidth
            margin="normal"
            onChange={handleChange}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Transfer
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default TransferFormModal;
