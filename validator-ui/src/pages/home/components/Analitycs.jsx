import {
    PointElement,
    CategoryScale,
    LinearScale,
    LineController,
    LineElement,
    Title,
    Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Chart } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { PresentationChartLineIcon } from '@heroicons/react/24/outline';

import { getDataset } from '../../../services/landing/landing.service';

import Loading from '../../../components/Loading';

Chart.register(
    PointElement,
    CategoryScale,
    LinearScale,
    LineController,
    LineElement,
    Title,
    Tooltip,
);

export function Analitycs(company) {
    const [dataset, setDataset] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const response = await getDataset(company.company);
            setLoading(false);
            setDataset(response);
        }
        fetchData();
    }, [company]);

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
        <div className="flex justify-center w-full lg:w-3/4 h-[400px] m-auto bg-white p-4 rounded-md shadow-md">
            {loading ? (
                <Loading className="w-28 m-auto" />
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
