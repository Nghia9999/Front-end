
import React, { useState, useEffect } from "react";
import { Modal, Button, Typography, Box, TextField } from "@mui/material";

const ConfirmLiquidateModal = ({ open, onClose, onConfirm, data }) => {
  const [liquidateQuantity, setLiquidateQuantity] = useState(1);
  const [newPrice, setNewPrice] = useState(0);

  const calculateNewPrice = (price, wearRate, quantity) => {
    return (price * (1 - wearRate / 100)) * quantity;
  };
  useEffect(() => {
    if (open && data) {
      setLiquidateQuantity(1); // Reset lại số lượng thanh lý khi mở modal
      setNewPrice(calculateNewPrice(data.price, data.wearRate, 1)); // Reset lại giá mới
      console.log(data.wearRate);
    }
  }, [open, data]);
  useEffect(() => {
    if (data) {
      setNewPrice(calculateNewPrice(data.price, data.wearRate, liquidateQuantity));
    }
  }, [data, liquidateQuantity]);

  const handleConfirm = () => {
    onConfirm(liquidateQuantity);
  };

  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value);
    if (quantity > 0 && quantity <= data.quantity) {
      setLiquidateQuantity(quantity);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        // sx={{
        //   position: "absolute",
        //   top: "50%",
        //   left: "50%",
        //   transform: "translate(-50%, -50%)",
        //   bgcolor: "white",
        //   boxShadow: 24,
        //   p: 4,
        // }}
        sx={{
          width: "50%", // Chiều rộng của modal
          maxWidth: 300, // Giới hạn chiều rộng tối đa
          bgcolor: "white",
          borderRadius: 8, // Bo góc
          boxShadow: 24, // Đổ bóng
          p: 4, // Padding
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Bạn có muốn thanh lý ?
        </Typography>
        <Typography variant="body1" gutterBottom>
          {data && (
            <>
              <div>Tên: {data.name}</div>
              <div>
                Giá : {newPrice.toFixed(2)}
              </div>
              <div>Số lượng: {data.quantity}</div>
              <TextField
                type="number"
                value={liquidateQuantity}
                onChange={handleQuantityChange}
                inputProps={{ min: 1, max: data.quantity }}
              />
            </>
          )}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={onClose} variant="outlined">
            Huỷ bỏ
          </Button>
          <Button onClick={handleConfirm} variant="contained" color="error">
            Xác nhận
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmLiquidateModal;
