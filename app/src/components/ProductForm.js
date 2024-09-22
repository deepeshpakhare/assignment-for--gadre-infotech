import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Card, Form, Image, Input, Upload, message } from "antd";
import { AiFillCloseSquare } from "react-icons/ai";
import { sendData } from '../utils/fetchFunctions';
import { v4 as uuidv4 } from 'uuid';


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

function ProductForm({ name, id, removeSelf, index, setForms, forms }, ref) {
    const [formData, setFormData] = useState([]);
    const [imageUrl, setImageUrl] = useState("");
    const [showUpload, setShowUpload] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [reset, setReset] = useState(false);

    const onFinish = (values) => {
        console.log("FORM DATA",formData);
        sendData(formData);
        setTimeout(()=> setForms(forms.map((form, formIndex) => index== formIndex ? { id: uuidv4(), name: `form${uuidv4()}`}: form)), 1000);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => [...prevData,{[name]: value.trim(), id }]);
        //console.log(formData);
    }

    useImperativeHandle(ref, () => ({
        getValues: () => formData,
        emptyFormData: () => setFormData({}),
        reset: () => reset
    }));

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const customRequest = ({ file, onSuccess, onError }) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('imageUrl', imageUrl);
        formData.append("id", id);

        fetch('/api/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                if (response.ok) {
                    onSuccess(null, file);
                } else {
                    onError(new Error('Upload failed.'));
                }
            })
            .catch(err => {
                onError(err);
            });
    };

    const handleImageChange = (info) => {
        const { file, fileList } = info;
        if (file.status === 'done') {
            message.success(`${file.name} file uploaded successfully`);
            setShowUpload(true);
        } else if (file.status === 'error') {
            message.error(`${file.name} file upload failed.`);
        }
        console.log(URL.createObjectURL(file.originFileObj));
        setImageUrl(URL.createObjectURL(file.originFileObj));
    };

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
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
                            customRequest={customRequest}
                            listType="picture-card"
                            onChange={handleImageChange}
                            handlePreview={handlePreview}
                            disabled={showUpload}

                        > +
                        </Upload>
                        {previewImage && (
                            <Image
                                wrapperStyle={{
                                    display: 'none',
                                }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible && setPreviewImage(''),
                                }}
                                src={previewImage}
                            />
                        )}
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