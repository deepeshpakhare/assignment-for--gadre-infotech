import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Card, Form, Input } from "antd";
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

    const onFinish = (values) => {
        //console.log(productNameRef.current.value);
        return values;
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value, id }));
        //console.log(formData);
    }

    useImperativeHandle(ref, () => ({
        getValues: () => formData,
        emptyFormData: () => setFormData({})
    }));



    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div style={formParentStyle}>
            <Card
                title="Product Information"
                extra={
                    index !== 0?<AiFillCloseSquare style={closeButtonStyle} onClick={() => removeSelf(id)} size={30} />:null}
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