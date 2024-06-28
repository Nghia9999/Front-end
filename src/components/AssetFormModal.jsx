import React, { useState, useEffect } from "react";
import { Modal, Box, TextField, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, MenuItem, Select } from "@mui/material";

const assetTypes = [
  { id: '663db797b7408f57e3f72780', name: 'Nội thất' },
  { id: '663db7c7b7408f57e3f72782', name: 'Thiết bị' }
];

const departments = [
  { id: '664708578bb447d1a699fd1d', name: 'Văn phòng khoa(C228)' },
  { id: '664708848bb447d1a699fd1f', name: 'Phòng công nghệ phần mềm(C126)' },
  { id: '6647089a8bb447d1a699fd23', name: 'Phòng hệ thống nhúng(C127)' },
  { id: '664708cf8bb447d1a699fd25', name: 'Phòng mạng máy tính(C125)' },
  { id: '664708e28bb447d1a699fd27', name: 'Phòng giáo vụ(C230)' },
  { id: '664709058bb447d1a699fd29', name: 'Phòng trưởng khoa(C229)' },
  { id: '6647091f8bb447d1a699fd2b', name: 'Phòng trung tâm tin học(C106)' },
  { id: '6647092d8bb447d1a699fd2d', name: 'Phòng C201' },
  { id: '664709398bb447d1a699fd2f', name: 'Phòng C206' },
  { id: '664709528bb447d1a699fd31', name: 'Phòng C108' },
  { id: '664709628bb447d1a699fd33', name: 'Phòng mạng không dây' },
  { id: '664709718bb447d1a699fd35', name: 'Phòng đa phương tiện' },
  { id: '664709818bb447d1a699fd37', name: 'Phòng CISCO' },
  { id: '664709938bb447d1a699fd39', name: 'Phòng hệ thống nhúng' },
  { id: '664709a08bb447d1a699fd3b', name: 'Phòng Datic' },
  { id: '664709af8bb447d1a699fd3d', name: 'Phòng Chuyên đề 2' },
  { id: '664709bf8bb447d1a699fd3f', name: 'Phòng thí nghiệm mạng' },
  { id: '664709d28bb447d1a699fd41', name: 'Phòng TTNT và KHDL' }
];

const AssetFormModal = ({ open, onClose, onSubmit, initialFormData }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    assettype: "",
    department: "",
    description: "",
    dateuse: "",
    wearrate: "",
    devicecode: "",
    specification: "",
  });

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === 'assettype') {
      const selectedAssetType = assetTypes.find(type => type.id === value);
      newValue = selectedAssetType ? selectedAssetType.id : value;
    }

    if (name === 'department') {
      const selectedDepartment = departments.find(dept => dept.id === value);
      newValue = selectedDepartment ? selectedDepartment.id : value;
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.quantity || !formData.assettype || !formData.department) {
      alert("Please fill all the required fields.");
      return;
    }

    onSubmit(formData);
    setFormData({
      name: "",
      price: "",
      quantity: "",
      assettype: "",
      department: "",
      description: "",
      dateuse: "",
      wearrate: "",
      devicecode: "",
      specification: "",
    });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          maxHeight: '90vh',
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflowY: 'auto',
        }}
      >
        <Typography variant="h5" gutterBottom>
          {initialFormData ? "Edit Asset" : "Add New Asset"}
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          name="name"
          label="Tên"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          name="price"
          label="Giá"
          value={formData.price}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="quantity"
          label="Số lượng"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <FormControl component="fieldset" margin="normal" required>
          <FormLabel component="legend">Loại tài sản</FormLabel>
          <RadioGroup
            name="assettype"
            value={formData.assettype}
            onChange={handleChange}
          >
            {assetTypes.map((type) => (
              <FormControlLabel key={type.id} value={type.id} control={<Radio />} label={type.name} />
            ))}
          </RadioGroup>
        </FormControl>
        <FormControl fullWidth margin="normal" required>
          <FormLabel component="legend">Phòng</FormLabel>
          <Select
            name="department"
            value={formData.department}
            onChange={handleChange}
          >
            {departments.map((dept) => (
              <MenuItem key={dept.id} value={dept.id}>{dept.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          name="description"
          label="Mô tả"
          value={formData.description}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="dateuse"
          label="Năm sử dụng"
          value={formData.dateuse}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="wearrate"
          label="Hao mòn"
          value={formData.wearrate}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="devicecode"
          label="Mã thiết bị"
          value={formData.devicecode}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="specification"
          label="Đặc điểm"
          value={formData.specification}
          onChange={handleChange}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Thêm
        </Button>
      </Box>
    </Modal>
  );
};

export default AssetFormModal;
