// import React from "react";
// import {
//   Box,
//   Divider,
//   Drawer,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemIcon,
//   ListItemText,
//   Typography,
//   useTheme,
// } from "@mui/material";
// import {
//   SettingsOutlined,
//   ChevronLeft,
//   ChevronRightOutlined,
//   HomeOutlined,
//   ShoppingCartOutlined,
//   Groups2Outlined,
//   ReceiptLongOutlined,
//   PublicOutlined,
//   PointOfSaleOutlined,
//   TodayOutlined,
  
  
  
  
// } from "@mui/icons-material";
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import FlexBetween from "./FlexBetween";
// import profileImage from "assets/profile.jpeg";


// const navItems = [
//   {
//     text: "Dashboard",
//     icon: <HomeOutlined />,
//     link:"/dashboard"
//   },
//   {
//     text: "Quản lý",
//     icon: null,

//   },
//   {
//     text: "Tài sản ",
//     icon: <ShoppingCartOutlined />,
//     link: "/assets",
//   },
//   {
//     text: "Nhân viên",
//     icon: <Groups2Outlined />,
    
//     link: "/staffs",
//   },
//   {
//     text: "Khoa",
//     icon: <ReceiptLongOutlined />,
//     link: "/faculty",
//   },
//   {
//     text: "Phòng",
//     icon: <PublicOutlined />,
//     link: "/department"
//   },
//   {
//     text: "Lịch sử",
//     icon: null,
//   },
//   {
//     text: "Thanh lý",
//     icon: <PointOfSaleOutlined />,
//     link: "/historyLiquidate"
//   },
//   {
//     text: "Chuyển giao",
//     icon: <TodayOutlined />,
//     link: "/historyTransfer"
//   },
  
//   {
//     text: "Cá nhân",
//     icon: null,
//   },
//   {
//     text: "Hồ sơ",
//     icon: <AccountCircleIcon />,
//     link: "/profile"
//   },
 
// ];

// const Sidebar = ({
//   user,
//   drawerWidth,
//   isSidebarOpen,
//   setIsSidebarOpen,
//   isNonMobile,
// }) => {
//   const { pathname } = useLocation();
//   const [active, setActive] = useState("");
//   const navigate = useNavigate();
//   const theme = useTheme();

//   useEffect(() => {
//     setActive(pathname.substring(1));
//   }, [pathname]);

//   return (
//     <Box component="nav">
//       {isSidebarOpen && (
//         <Drawer
//           open={isSidebarOpen}
//           onClose={() => setIsSidebarOpen(false)}
//           variant="persistent"
//           anchor="left"
//           sx={{
//             width: drawerWidth,
//             "& .MuiDrawer-paper": {
//               color: theme.palette.secondary[200],
//               backgroundColor: theme.palette.background.alt,
//               boxSixing: "border-box",
//               borderWidth: isNonMobile ? 0 : "2px",
//               width: drawerWidth,
//             },
//           }}
//         >
//           <Box width="100%">
//             <Box m="1.5rem 2rem 2rem 1rem">
//               <FlexBetween color={theme.palette.secondary.main}>
//                 <Box display="flex" alignItems="center" gap="0.5rem">
//                   <img src="../logo.png" alt="Logo" height="37px" />
//                 </Box>
//                 {!isNonMobile && (
//                   <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
//                     <ChevronLeft />
//                   </IconButton>
//                 )}
//               </FlexBetween>
//             </Box>
//             <List>
//               {navItems.map(({ text, icon, link }) => {
//                 if (!icon) {
//                   return (
//                     <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
//                       {text}
//                     </Typography>
//                   );
//                 }
//                 const lcText = text.toLowerCase();

//                 return (
//                   <ListItem key={text} disablePadding>
//                     <ListItemButton
//                       onClick={() => {
//                         // Nếu có link, điều hướng đến đó
//                         if (link) {
//                           navigate(link);
//                           setActive(lcText);
//                         }
//                       }}
//                       sx={{
//                         backgroundColor:
//                           active === lcText
//                             ? theme.palette.secondary[300]
//                             : "transparent",
//                         color:
//                           active === lcText
//                             ? theme.palette.primary[600]
//                             : theme.palette.secondary[100],
//                       }}
//                     >
//                       <ListItemIcon
//                         sx={{
//                           ml: "2rem",
//                           color:
//                             active === lcText
//                               ? theme.palette.primary[600]
//                               : theme.palette.secondary[200],
//                         }}
//                       >
//                         {icon}
//                       </ListItemIcon>
//                       <ListItemText primary={text} />
//                       {active === lcText && (
//                         <ChevronRightOutlined sx={{ ml: "auto" }} />
//                       )}
//                     </ListItemButton>
//                   </ListItem>
//                 );
//               })}
//             </List>
//           </Box>

//           <Box position="absolute" bottom="2rem">
//             <Divider />
//             <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
//               <Box
//                 component="img"
//                 alt="profile"
//                 src={profileImage}
//                 height="40px"
//                 width="40px"
//                 borderRadius="50%"
//                 sx={{ objectFit: "cover" }}
//               />
//               <Box textAlign="left">
//                 <Typography
//                   fontWeight="bold"
//                   fontSize="0.9rem"
//                   sx={{ color: theme.palette.secondary[100] }}
//                 >
//                   {user.name}
//                 </Typography>
//                 <Typography
//                   fontSize="0.8rem"
//                   sx={{ color: theme.palette.secondary[200] }}
//                 >
//                   {user.occupation}
//                 </Typography>
//               </Box>
//               <SettingsOutlined
//                 sx={{
//                   color: theme.palette.secondary[300],
//                   fontSize: "25px ",
//                 }}
//               />
//             </FlexBetween>
//           </Box>
//         </Drawer>
//       )}
//     </Box>
//   );
// };

// export default Sidebar;
import React, { useState, useEffect } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
} from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import profileImage from "assets/profile.jpeg";
import { useGetUserQuery } from "state/api";
import { useSelector } from 'react-redux';

const adminNavItems = [
  {
    text: "Tổng quan",
    icon: <HomeOutlined />,
    link: "/dashboard",
  },
  {
    text: "Quản lý",
    icon: null,
  },
  {
    text: "Tài sản ",
    icon: <ShoppingCartOutlined />,
    link: "/assets",
  },
  {
    text: "Nhân viên",
    icon: <Groups2Outlined />,
    link: "/staffs",
  },
  {
    text: "Khoa",
    icon: <ReceiptLongOutlined />,
    link: "/faculty",
  },
  {
    text: "Phòng",
    icon: <PublicOutlined />,
    link: "/department",
  },
  {
    text: "Lịch sử",
    icon: null,
  },
  {
    text: "Thanh lý",
    icon: <PointOfSaleOutlined />,
    link: "/historyLiquidate",
  },
  {
    text: "Chuyển giao",
    icon: <TodayOutlined />,
    link: "/historyTransfer",
  },
  {
    text: "Cá nhân",
    icon: null,
  },
  {
    text: "Hồ sơ",
    icon: <AccountCircleIcon />,
    link: "/profile",
  },
];

const userNavItems = [
  {
    text: "Tổng quan",
    icon: <HomeOutlined />,
    link: "/dashboard",
  },
  {
    text: "Quản lý",
    icon: null,
  },
  {
    text: "Tài sản ",
    icon: <ShoppingCartOutlined />,
    link: "/assets",
  },
  
  {
    text: "Phòng",
    icon: <PublicOutlined />,
    link: "/department",
  },
  {
    text: "Lịch sử",
    icon: null,
  },
  {
    text: "Thanh lý",
    icon: <PointOfSaleOutlined />,
    link: "/historyLiquidate",
  },
  {
    text: "Chuyển giao",
    icon: <TodayOutlined />,
    link: "/historyTransfer",
  },
  {
    text: "Cá nhân",
    icon: null,
  },
  {
    text: "Hồ sơ",
    icon: <AccountCircleIcon />,
    link: "/profile",
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const user = useSelector((state) => state.global?.user);
  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  // Determine which set of navItems to use based on user role
  const navItems = (user?.user?.role === "admin" || user?.user?.role === "staff") ? adminNavItems : userNavItems;
  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 1rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <img src="../logo.png" alt="Logo" height="37px" />
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {navItems.map(({ text, icon, link }) => {
                if (!icon) {
                  return (
                    <Typography
                      key={text}
                      sx={{ m: "2.25rem 0 1rem 3rem", color: theme.palette.secondary[100] }}
                    >
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        // Nếu có link, điều hướng đến đó
                        if (link) {
                          navigate(link);
                          setActive(lcText);
                        }
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem">
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
