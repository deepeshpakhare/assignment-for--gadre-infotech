import React, { useEffect, useState } from 'react';
import { getImages, getProducts } from '../utils/fetchFunctions';
import { Table } from 'antd';
import { render } from '@testing-library/react';

export default function ProductsDisplay() {
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);
    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        setDataSource(createDataObject({ productsResponse: products, imagesResponse: images }));
    }, [products, images])

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
    }, [])

    const createDataObject = ({ productsResponse, imagesResponse }) => {
        console.log(productsResponse, imagesResponse)
        let result = [];
        for (let obj of productsResponse) {
            result.push({ key: obj.id, prodName: obj.productName, category: obj.category, quantity: obj.quantity });
        }
        for (let res of result) {
            for (let img of imagesResponse) {
                //console.log(res.id, img.id)
                if (res.key == img.id) {
                    //alert("yes");
                    res["imageUrl"] = img.imageUrl;
                }
            }
        }
        console.log(result);
        return result;
    }
    const columns = [
        {
            title: "Image",
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (text) => <img src={text} style={{ width: '50px', height: '50px' }}></img>
        },
        {
            title: 'Product Name',
            dataIndex: 'prodName',
            key: 'prodName',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },

    ];

    return (
        <div>
            <h1>Display</h1>
            <center><Table dataSource={dataSource} columns={columns} style={{ width: 700 }}/></center>

        </div>
    )
}
