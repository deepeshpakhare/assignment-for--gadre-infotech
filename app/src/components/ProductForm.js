import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Card, Form, Image, Input, Upload, message } from "antd";
import { AiFillCloseSquare } from "react-icons/ai";


const formParentStyle = {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

const closeButtonStyle = {
    color: "red"
}

function ProductForm({ name, id, removeSelf, index }, ref) {
    const [formData, setFormData] = useState({});
    const [imageUrl, setImageUrl] = useState("");
    const [showImage, setShowImage] = useState(true);

    const onFinish = (values) => {
        //console.log(productNameRef.current.value);
        return values;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value.trim(), id }));
        //console.log(formData);
    }

    useImperativeHandle(ref, () => ({
        getValues: () => formData,
        emptyFormData: () => setFormData({})
    }));

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };




    const handleImageChange = (info) => {
        setShowImage(true);
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        console.log(URL.createObjectURL(info.file.originFileObj));
        setImageUrl(URL.createObjectURL(info.file.originFileObj));
    };

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('You can only upload image files!');
        }
        return isImage;
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };
    return (
        <div style={formParentStyle}>
            <Card
                title="Product Information"
                extra={
                    index !== 0 ? <AiFillCloseSquare style={closeButtonStyle} onClick={() => removeSelf(id)} size={30} /> : null}
                style={{
                    width: 300,
                }}>
                <Form
                    name={name}
                    labelCol={{
                        span: 10,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    style={{
                        maxWidth: 600,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Name: "
                        name="productName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input product name!',
                            },
                        ]}
                    >
                        <Input name="username" onChange={(e) => handleChange(e)} />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password name="password" onChange={(e) => handleChange(e)} />
                    </Form.Item>
                    <Form.Item name="upload" label="Upload">
                        <Upload
                            //action="/upload" // Your upload endpoint here
                            listType="picture-card"
                            onChange={handleImageChange}
                            onPreview={onPreview}
                        >
                            +
                        </Upload>

                        {showImage && <Image
                            width={100}
                            src={imageUrl}
                            style={{ marginTop: 16 }}
                        />}
                        <AiFillCloseSquare onClick={() => setShowImage(false)}/>

                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit" onClick={onFinish}>
                            Submit
                        </Button>

                    </Form.Item>
                </Form>

            </Card>

        </div >
    )
}

export default forwardRef(ProductForm);