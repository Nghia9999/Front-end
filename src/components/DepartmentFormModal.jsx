import React, { useState, useEffect } from "react";
import {  Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useGetFacultysQuery } from "state/api";

const DepartmentFormModal = ({ open, onClose, onSubmit, initialFormData }) => {
  const { data: facultiesData } = useGetFacultysQuery();
  const [formData, setFormData] = useState({
    name: "",
    faculty: "",
  });

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    } else {
      setFormData({
        name: "",
        faculty: "",
      });
    }
  }, [initialFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{initialFormData ? "Edit Department" : "Add Department"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Department Name"
          type="text"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="dense">
          <InputLabel>Faculty</InputLabel>
          <Select
            name="faculty"
            value={formData.faculty}
            onChange={handleChange}
          >
            {facultiesData?.map((faculty) => (
              <MenuItem key={faculty._id} value={faculty._id}>
                {faculty.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DepartmentFormModal;
