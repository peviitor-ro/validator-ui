import { useEffect, useState } from 'react';
import { Chart } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { PresentationChartLineIcon } from '@heroicons/react/24/outline';
import { getDataset } from '../../../services/landing/landing.service';
import Loading from '../../../components/Loading';
import {
    PointElement,
    CategoryScale,
    LinearScale,
    LineController,
    LineElement,
    Title,
    Tooltip,
} from 'chart.js';

// Register the chart elements
Chart.register(
    PointElement,
    CategoryScale,
    LinearScale,
    LineController,
    LineElement,
    Title,
    Tooltip,
);

/**
 * Analitycs component fetches and displays analytics data for a given company.
 *
 * @component
 * @param {Object} company - The company object containing company details.
 * @param {string} company.company - The name of the company.
 * @returns {JSX.Element} The rendered component.
 *
 * @example
 * <Analitycs company={{ company: 'ExampleCompany' }} />
 *
 * @description
 * This component fetches dataset for the provided company and displays it in a line chart.
 * It shows a loading state while fetching data and handles cases where no data is available.
 *
 * @requires useState
 * @requires useEffect
 * @requires getDataset
 * @requires Loading
 * @requires PresentationChartLineIcon
 * @requires Line
 */
export function Analitycs(company) {
    // State to manage the dataset
    const [dataset, setDataset] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch the dataset for the company
    useEffect(() => {
        async function fetchData() {
            const response = await getDataset(company.company);
            setLoading(false);
            setDataset(response);
        }
        fetchData();
    }, []);

    // Chart data and options
    const chartData = {
        labels: dataset.map((item) => item.formated_date),
        datasets: [
            {
                label: 'Joburi',
                data: dataset.map((item) => item.data),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(219,121,0,1)',
            },
        ],
    };

    // Chart options
    const chartOptions = {
        plugins: {
            title: {
                display: true,
                text: 'Analytics',
                font: {
                    size: 18,
                    weight: 'bold',
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Zi',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Joburi',
                },
            },
        },
    };

    return (
        <div className="flex justify-center w-full lg:w-3/4 h-[400px] m-auto bg-card p-4 lg:rounded-md shadow-md border">
            {loading ? (
                <div className="flex flex-col items-center justify-center w-full h-full text-center text-gray-500">
                    <Loading
                        lst={[
                            { name: 'user' },
                            { name: 'validator' },
                            { name: 'validator-database' },
                        ]}
                    />
                </div>
            ) : dataset.length === 0 ? (
                <div className="flex flex-col justify-center w-full h-full text-center text-gray-500">
                    <span className="text-2xl">Analitycs</span>
                    <PresentationChartLineIcon className="w-28 m-auto" />
                    <span>Nu exista date pentru aceasta companie in baza de date</span>
                </div>
            ) : (
                <Line data={chartData} options={chartOptions} />
            )}
        </div>
    );
}
