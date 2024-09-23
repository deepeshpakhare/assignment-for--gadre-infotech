import React, { useEffect, useState } from 'react'
import { getProducts } from '../utils/fetchFunctions';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

export default function PieChart() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data.products);
            } catch (err) {
                console.log('Failed to fetch products');
            }
        };
        fetchProducts();
    }, [])


    const dataForPieChart = () => {
        //console.log(products);
        let result = [];
        let category1 = 0;
        let category2 = 0;
        let category3 = 0;
        for (let prod of products) {
            console.log(prod);
            if (prod.category === "category1") {
                category1++;
            }
            if (prod.category === "category2") {
                category2++;
            }
            if (prod.category === "category3") {
                category3++;
            }
        }
        result.push(category1);
        result.push(category2);
        result.push(category3);
        console.log(result);
        return result;
    }

    const data = {
        labels: ['Category 1', 'Category 2', 'Category 3'],
        datasets: [
            {
                data: dataForPieChart(), 
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'], 
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
    };
    return (
        <div>
            <Pie data={data} options={options} />
        </div>
    )
}
