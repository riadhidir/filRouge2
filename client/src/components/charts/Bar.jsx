import React from "react";
import { Bar } from "react-chartjs-2";
// import {Chart as ChartJS, Tooltip} from 'chart.js/auto'
const _Bar = ({ chartData }) => {
    const options = {
        label: {
            display: false, // Hide the legend
        },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
        barPercentage: 0.5,
        barThickness: 50,
        borderRadius: 5,
        grouped: false,
        maxBarThickness: 50,

        minBarLength: 2,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    display: false, // Set this to false to remove the background grids for the y-axis
                },
            },
            x: {
                grid: {
                    display: false, // Set this to false to remove the background grids for the x-axis
                },
            },
        },
        layout: {
            padding: {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
        <div className="w-full h-full ">
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default _Bar;
