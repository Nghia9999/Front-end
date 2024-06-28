import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    LineController,
    PointElement,
    LineElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    LineController,
    PointElement,
    LineElement
);

const LineChart = ({ data }) => {
    // Xác định labels và data từ props
    const labels = data?.map(item => item?.type);
    const amounts = data?.map(item => item?.amount);

    // Dữ liệu cho biểu đồ
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: 'Tổng số tài sản theo phòng',
                data: amounts,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
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
                text: 'Thống kế tài sản theo các phòng',
            },
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Số tiền',
                },
            },
        },
    };

    return (
        <Line data={chartData} options={chartOptions} />
    );
};

export default LineChart;
