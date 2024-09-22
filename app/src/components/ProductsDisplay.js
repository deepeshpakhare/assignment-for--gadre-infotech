import React, { useEffect, useState } from 'react';
import { getImages, getProducts } from '../utils/fetchFunctions';


export default function ProductsDisplay() {
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                setProducts(data.products);
            } catch (err) {
                console.log('Failed to fetch products');
            }
        };
        const fetchImages = async () => {
            try {
                const data = await getImages();
                setImages(data.images);
            } catch (err) {
                console.log('Failed to fetch products');
            }
        };
        fetchProducts();
        fetchImages();
        createDataObject({productsResponse: products, imagesResponse: images});
    }, [])

    const createDataObject = ({productsResponse, imagesResponse}) => {
        console.log(productsResponse, imagesResponse)
        let result = [];
        for (let obj of productsResponse) {
            result.push({id: obj.id, prodName: obj.productName, category:obj.category, quantity: obj.quantity});
        }
        
    }

    return (
        <div>
            <h1>Display</h1>
            <ul>
                {products.map((prod, index) =>
                    <li key={index}>
                       {prod.quantity}
                    </li>
                )}
            </ul>

        </div>
    )
}
