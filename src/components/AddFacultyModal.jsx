import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const AddFacultyModal = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    onSubmit({ name });
    setName("");
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm Khoa</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Tên Khoa"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Hủy
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Thêm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddFacultyModal;
