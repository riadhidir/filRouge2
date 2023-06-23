import React from "react";
import { Bar, Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip } from "chart.js/auto";
const _Doughnut = ({ chartData, cutout = "60%", className = "" , tooltip=true}) => {
    const options = {
        cutout: cutout,

        // maintainAspectRatio: false,

        plugins: {
            tooltip: {
              enabled: tooltip,
                callbacks: {
                    label: function (context) {
                        // Return the label for the hovered slice
                        // return context.context.title;
                        // return ""
                    },
                    title: function (context) {
                        // Return an empty string to remove the title
                        // console.log(context[0].raw)
                        return context.label;
                        // return "";
                    },
                },
            },
            legend: {
                display: false, // Hide the legend
            },
        },
    };
    return (
        <div className={`h-full w-full  ${className}`}>
            <Doughnut
                data={chartData}
                options={options}
                style={{ marginInline: "auto" }}
            />
        </div>
    );
};

export default _Doughnut;
