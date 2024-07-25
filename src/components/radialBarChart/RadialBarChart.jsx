import React, { useEffect, useState } from "react";
import ApexCharts from "react-apexcharts";

const RadialBarChart = ({ value }) => {
    const [series, setSeries] = useState([value]);
    useEffect(() => {
        setSeries([value]);
    }, [value]);

    const [chartOptions, setChartOptions] = useState({
        chart: {
            type: "radialBar",
            offsetY: -28,
            sparkline: {
                enabled: true,
                border: 6,
            },
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: "#e7e7e7",
                    strokeWidth: "97%",
                    margin: 20, // margin is in pixels
                    //   padding: 20,
                    dropShadow: {
                        enabled: false,
                        top: 2,
                        left: 0,
                        color: "#999",
                        opacity: 1,
                        blur: 2,
                    },
                    borderWidth: 8,
                    borderStyle: "solid",
                    borderRadius: "5px",
                    borderColor: "#BCBCBC",
                },
                borderRadius: "80px",
                hollow: {
                    margin: 5, // Margin between the fill and the track
                    size: "60%", // Adjust the size of the hollow part to change the fill size
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        show: false,
                        offsetY: -2,
                        fontSize: "22px",
                    },
                },
            },
        },
        grid: {
            padding: {
                top: -10,
            },
        },
        fill: {
            type: "solid",
            colors: ["#78D956"],
        },
        labels: ["Average Results"],
    });

    return (
        <div id="chart">
            <ApexCharts
                options={chartOptions}
                series={series}
                type="radialBar"
                height={260}
            />
        </div>
    );
};

export default RadialBarChart;
