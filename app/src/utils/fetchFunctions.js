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

export const uploadImage = (imageUrl, id) => {
    const formData = new FormData();
    formData.append("imageUrl", imageUrl);
    formData.append("id", id);
    fetch("api/upload",
        {
            body: formData,
            method: "post"
        }).then((response) => {
            console.log(response);
            if(response.status === 201) {
                message.success("Image Uploaded Successfully")
            }else{
                message.error("Failed to upload image");
            }
        })

}

export const getProductById = async (id) => {
    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "GET",
    });
    const result = await response.json();
    return result;
}

export const deleteRecord = async (id) => {
    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
    });
    const result = await response.json();
    return result;
}