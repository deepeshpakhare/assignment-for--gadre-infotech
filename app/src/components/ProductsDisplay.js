import React, { useEffect, useState } from 'react';
import { getProducts } from '../utils/fetchFunctions';


export default function ProductsDisplay() {
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

    return (
        <div>
            <h1>Display</h1>
            <ul>
                {products.map((prod, index) =>
                    <li key={index}>
                        {prod.productName}
                    </li>
                )}
            </ul>

        </div>
    )
}
