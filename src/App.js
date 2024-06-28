import React from 'react';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Products from "scenes/products";
import Customers from "scenes/customers";
import Transactions from "scenes/transactions";
import Geography from "scenes/department";
import Liquidate from "scenes/liquidate";
import Transfer from "scenes/transfer";
import Login from "scenes/login"; 
import Profile from 'scenes/profile';
import DeparmentDetails from 'scenes/departmentDetails';
import ProductDetails from 'scenes/productDetails';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const user = useSelector((state) => state.global.user);

  const renderLogin = () => <Login />;

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/login" element={renderLogin} />
            {user ? (
              <Route element={<Layout />}>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/assets" element={<Products />} />
                <Route path="/staffs" element={<Customers />} />
                <Route path="/faculty" element={<Transactions />} />
                <Route path="/department" element={<Geography />} />
                <Route path="/department/:id" element={<DeparmentDetails />} />
                <Route path="/assets/:id" element={<ProductDetails />} />
                <Route path="/historyLiquidate" element={<Liquidate />} />
                <Route path="/historyTransfer" element={<Transfer />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
            ) : (
              <Route path="/" element={<Login />} />
            )}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
