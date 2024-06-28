import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Header from "components/Header";
import LineChart from "components/LineChart";
import PieChart from "components/PieChart";
import DoughnutChart from "components/DoughnutChart";
import { useSelector } from "react-redux";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const user = useSelector((state) => state.global.user);
  const [totalAssets, setTotalAssets] = useState(0);
  const [totalDepartments, setTotalDepartments] = useState(0);
  const [totalStaffs, setTotalStaffs] = useState(0);
  const [totalFaculties, setTotalFaculties] = useState(0);
  const [figures, setFigures] = useState()
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetsResponse = await fetch(`${process.env.REACT_APP_API_KEY}asset`);
        const assetsData = await assetsResponse.json();
        setTotalAssets(assetsData.length);

        const departmentsResponse = await fetch(`${process.env.REACT_APP_API_KEY}departments`);
        const departmentsData = await departmentsResponse.json();
        setTotalDepartments(departmentsData.length);

        const staffsResponse = await fetch(`${process.env.REACT_APP_API_KEY}staffs`);
        const staffsData = await staffsResponse.json();
        setTotalStaffs(staffsData.length);

        const facultiesResponse = await fetch(`${process.env.REACT_APP_API_KEY}faculty`);
        const facultiesData = await facultiesResponse.json();
        setTotalFaculties(facultiesData.length);

        const figuresResponse = await fetch(`${process.env.REACT_APP_API_KEY}figures`);
        const figuresData = await figuresResponse.json();
        setFigures(figuresData)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log(figures)
  const chartData = {
    labels: ['Tài sản', 'Phòng ban', 'Nhân viên', 'Khoa'],
    datasets: [
      {
        label: 'Tổng số',
        data: [totalAssets, totalDepartments, totalStaffs, totalFaculties],
        backgroundColor: [
          theme.palette.primary.main,
          theme.palette.success.main,
          theme.palette.warning.main,
          theme.palette.error.main
        ],
        borderColor: [
          theme.palette.primary.dark,
          theme.palette.success.dark,
          theme.palette.warning.dark,
          theme.palette.error.dark
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Thống kê tổng số tài sản, phòng ban, nhân viên và khoa',
      },
    },
  };

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Tổng quan" />
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="200px">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap="20px">
            <Box bgcolor="primary.light" p={2} borderRadius={5}>
              <Link to="/assets" style={{ textDecoration: "none" }}>
                <Typography variant="h6" color="primary.contrastText">Số tài sản</Typography>
                <Typography variant="h4" color="primary.contrastText">{totalAssets}</Typography>
              </Link>
            </Box>
            <Box bgcolor="success.light" p={2} borderRadius={5}>
              <Link to="/department" style={{ textDecoration: "none" }}>
                <Typography variant="h6" color="success.contrastText">Số phòng ban</Typography>
                <Typography variant="h4" color="success.contrastText">{totalDepartments}</Typography>
              </Link>
            </Box>
          {user?.account?.role === 'admin' &&  <Box bgcolor="warning.light" p={2} borderRadius={5}>
              <Link to="/staffs" style={{ textDecoration: "none" }}>
                <Typography variant="h6" color="warning.contrastText">Số nhân viên</Typography>
                <Typography variant="h4" color="warning.contrastText">{totalStaffs}</Typography>
              </Link>
            </Box>}
            <Box bgcolor="error.light" p={2} borderRadius={5}>
              <Link to="/faculty" style={{ textDecoration: "none" }}>
                <Typography variant="h6" color="error.contrastText">Số khoa</Typography>
                <Typography variant="h4" color="error.contrastText">{totalFaculties}</Typography>
              </Link>
            </Box>
         {user?.account?.role === 'admin' &&   <Box bgcolor="info.light" p={2} borderRadius={5}>
              <Typography variant="h6" color="info.contrastText">Tổng giá trị tài sản</Typography>
              <Typography variant="h4" color="info.contrastText">{figures?.amountOfSchool.toLocaleString()} VND</Typography>
            </Box>}
          </Box>
          <Box mt={4}>
            <Bar data={chartData} options={chartOptions} />
          </Box>
          <Box width='100%' mt={4} display='flex' justifyContent='center' alignItems='center'>
            {figures?.amountOfTypeGroups && <PieChart data={figures?.amountOfTypeGroups} />}
          </Box>
           <Box mt={4}>
            {figures?.amountOfDeparmentGroups
              && <LineChart data={figures?.amountOfDeparmentGroups
              } />}
          </Box>
        {user?.account?.role === 'admin' &&  <Box width='100%' mt={4} display='flex' justifyContent='center' alignItems='center'>
            {figures?.amountOfFaculatyGroups
              && <DoughnutChart data={figures?.amountOfFaculatyGroups
              } />}
          </Box>}
        </>
      )}
    </Box>
  );
};

export default Dashboard;
