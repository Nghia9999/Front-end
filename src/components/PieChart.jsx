import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    PieController,
    ArcElement
} from 'chart.js';

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    PieController,
    ArcElement
);

const PieChart = ({ data }) => {
    // Xác định labels và data từ props
    const labels = data?.map(item => item?.type);
    const amounts = data?.map(item => item?.amount);

    // Dữ liệu cho biểu đồ Pie Chart
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Tổng số tài sản theo phòng',
                data: amounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Các tùy chọn của biểu đồ
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Thống kê tổng số tài sản theo phòng',
            },
        },
    };

    return (
        <div style={{ height: '400px', width: '600px', margin: 'auto' }}>
            <Pie data={chartData} options={chartOptions} />
        </div>

    );
};

export default PieChart;
