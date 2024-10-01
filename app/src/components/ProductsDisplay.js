import React, { useEffect, useRef, useState } from 'react';
import { getImages, getProducts } from '../utils/fetchFunctions';
import { Table, Button } from 'antd';
import { AiFillFilePdf } from "react-icons/ai";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import PieChart from './PieChart';
import { useNavigate } from "react-router-dom";

const displayStyle = {
    marginLeft: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: "150px"
}

const tableStyle = {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: "5px"
}


export default function ProductsDisplay() {
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);
    const [dataSource, setDataSource] = useState([]);
    const tableRef = useRef(null);
    const navigate = useNavigate();


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
                if (res.key == img.id) {
                    res["imageUrl"] = img.imageUrl;
                }
            }
        }
        console.log(result);
        return result;
    }

    const redirectToUpdate = (id) => {
        console.log(dataSource);
        console.log(id);
        navigate("/", {state:id});
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
        {
            title: 'Update',
            dataIndex: "key",
            key: "key",
            render:(key)=> <Button onClick={(e) =>redirectToUpdate(key)}>Update</Button>
        }

    ];
    const generatePDF = async () => {
        const input = tableRef.current;
        const canvas = await html2canvas(input);
        const imgData = canvas.toDataURL('image/png');
        const doc = new jsPDF();
        doc.addImage(imgData, 'PNG', 10, 10);
        doc.save('table.pdf');
    }

    return (
        <div style={displayStyle}>
            <div style={tableStyle}>
                <Button onClick={generatePDF} type="primary" style={{ width: 90, height: 40, marginLeft: 10, marginBottom: 5 }}><AiFillFilePdf size={30} /></Button>
                <div ref={tableRef}>
                    <h2>List of products</h2>
                    <Table dataSource={dataSource} columns={columns} style={{ width: 400 }} />
                </div>
            </div>
            <div>
                <PieChart />
            </div>
        </div>
    )
}
