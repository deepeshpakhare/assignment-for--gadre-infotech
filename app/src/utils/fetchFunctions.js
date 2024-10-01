import { message } from "antd";


export const sendData = (data) => {
    fetch("http://localhost:3000/api/products", {
        method: "POST",
        body: JSON.stringify(data)
    });
}

export const getProducts = async () => {
    const response = await fetch("http://localhost:3000/api/products", {
        method: "GET",
    });
    const products = await response.json();
    return products;
}

export const getImages = async () => {
    const response = await fetch("http://localhost:3000/api/image", {
        method: "GET",
    });
    const images = await response.json();
    return images;
}