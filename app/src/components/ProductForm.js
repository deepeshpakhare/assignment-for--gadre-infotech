import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Checkbox, Form, Input } from "antd";


const formParentStyle = {
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}

function ProductForm({ name, id, removeSelf}, ref) {
    const [formData, setFormData] = useState({});
    const [inputData, setInputData] = useState("");

    const onFinish = (values) => {
        //console.log(productNameRef.current.value);
        return values;
    };
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value}));
        console.log(formData);
    }

    useImperativeHandle(ref, () => ({
        getValues: ()=> formData,
    }));

    
   
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div style={formParentStyle}>
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
                id='form'
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Product name: "
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                    ]}
                >
                    <Input name="username" onChange={(e)=>handleChange(e)}/>
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
                    <Input.Password name="password" onChange={(e)=>handleChange(e)}/>
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
                    <Button type="primary" onClick={()=>removeSelf(id)}>
                        Remove
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default  forwardRef(ProductForm);