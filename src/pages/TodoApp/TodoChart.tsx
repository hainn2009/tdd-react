import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
// import faker from "faker";
import { faker } from "@faker-js/faker";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// export const options = {
//     indexAxis: "y",
//     maintainAspectRatio: false,
//     elements: {
//         bar: {
//             borderWidth: 2,
//         },
//     },
//     responsive: true,
//     plugins: {
//         legend: {
//             position: "right",
//         },
//         title: {
//             display: true,
//             text: "Chart.js Horizontal Bar Chart",
//         },
//     },
// };

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
            text: "Monthly Sales Data",
        },
    },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
    labels,
    datasets: [
        {
            label: "Dataset 1",
            // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        // {
        //     label: "Dataset 2",
        //     // data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        //     data: labels.map(() => faker.number.int({ min: -1000, max: 1000 })),
        //     borderColor: "rgb(53, 162, 235)",
        //     backgroundColor: "rgba(53, 162, 235, 0.5)",
        // },
    ],
};

// const data = {
//     labels: ["January", "February", "March", "April", "May", "June", "July"],
//     datasets: [
//         {
//             label: "Sales",
//             data: [65, 59, 80, 81, 56, 55, 40],
//             backgroundColor: "rgba(75, 192, 192, 0.2)",
//             borderColor: "rgba(75, 192, 192, 1)",
//             borderWidth: 1,
//         },
//     ],
// };

export default function TodoChart() {
    return (
        <div style={{ width: "200px", height: "200px", overflowX: "auto", overflowY: "hidden" }}>
            <div style={{ width: "300px", height: "300px" }}>
                <Bar options={options} data={data} />
            </div>
        </div>
    );
}
