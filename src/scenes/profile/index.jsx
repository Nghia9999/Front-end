import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  useTheme,
} from "@mui/material";
import Header from "components/Header";

const Profile = () => {
  const theme = useTheme();
  const user = useSelector((state) => state.global.user); // Lấy thông tin người dùng từ Redux store

  // State để quản lý trạng thái chỉnh sửa và dialog
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.user.name);
  const [editedGender, setEditedGender] = useState(user.user.gender || "");
  const [editedPhone, setEditedPhone] = useState(user.user.phone || "");
  const [editedAddress, setEditedAddress] = useState(user.user.address || "");
  const [editedBirthday, setEditedBirthday] = useState(
    user.user.birthday ? new Date(user.user.birthday) : null
  );

  // Xử lý mở dialog chỉnh sửa
  const handleEditProfile = () => {
    setIsEditing(true);
  };

  // Xử lý đóng dialog chỉnh sửa
  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  // Hàm helper để lấy thông tin người dùng tương ứng
  const getUserInfo = () => {
    if (user.user.role === "admin") {
      return user.admin;
    } else if (user.user.role === "staff") {
      return user.staff;
    } else {
      return user.user;
    }
  };

  const userInfo = getUserInfo(); // Lấy thông tin người dùng dựa vào vai trò

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Thông tin cá nhân" />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main }}>
            Tên:
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {userInfo.name}
          </Typography>

          <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main }}>
            Giới tính:
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {userInfo.gender || "Chưa cập nhật"}
          </Typography>

          <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main }}>
            Số điện thoại:
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {userInfo.phone || "Chưa cập nhật"}
          </Typography>

          <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main }}>
            Địa chỉ:
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {userInfo.address || "Chưa cập nhật"}
          </Typography>

          <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.main }}>
            Ngày sinh:
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {userInfo.birthday
              ? new Date(userInfo.birthday).toLocaleDateString("en-US")
              : "Chưa cập nhật"}
          </Typography>

          <Button
            variant="outlined"
            onClick={handleEditProfile}
            sx={{
              color: theme.palette.secondary.main, // Màu chủ đạo
              borderColor: theme.palette.secondary.main, // Viền màu chủ đạo
              "&:hover": {
                backgroundColor: theme.palette.secondary.main, // Màu nền khi hover
                color: "#fff", // Màu chữ khi hover
                borderColor: theme.palette.secondary.main, // Viền khi hover
              },
            }}
          >
            Chỉnh sửa thông tin
          </Button>
        </Grid>
      </Grid>

      {/* Dialog chỉnh sửa thông tin cá nhân */}
      <Dialog open={isEditing} onClose={handleCloseEdit}>
        <DialogTitle>Chỉnh sửa thông tin cá nhân</DialogTitle>
        <DialogContent>
          <TextField
            label="Tên"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            select
            label="Giới tính"
            value={editedGender}
            onChange={(e) => setEditedGender(e.target.value)}
            fullWidth
            margin="normal"
            SelectProps={{
              native: true,
            }}
          >
            <option value="">Chọn giới tính</option>
            <option value="true">Nam</option>
            <option value="false">Nữ</option>
          </TextField>
          <TextField
            label="Số điện thoại"
            value={editedPhone}
            onChange={(e) => setEditedPhone(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Địa chỉ"
            value={editedAddress}
            onChange={(e) => setEditedAddress(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Ngày sinh"
            type="date"
            value={editedBirthday ? editedBirthday.toISOString().split("T")[0] : ""}
            onChange={(e) => setEditedBirthday(new Date(e.target.value))}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Hủy</Button>
          {/* <Button onClick={handleSaveProfile}>Đồng ý</Button> */}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;
