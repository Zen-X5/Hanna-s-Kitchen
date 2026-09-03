'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Row, Col, Divider, message } from 'antd';
import {
    UserOutlined,
    MailOutlined,
    PhoneOutlined,
    LockOutlined,
    HomeOutlined,
    EnvironmentOutlined,
    GlobalOutlined,
    PushpinOutlined
} from '@ant-design/icons';
import Link from 'next/link';

const { Title, Text } = Typography;

export interface RegisterFormValues {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword?: string;
    address: {
        area: string;
        district: string;
        state: string;
        pin: string;
    };
}

const RegisterPage: React.FC = () => {
    const [form] = Form.useForm<RegisterFormValues>();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values: RegisterFormValues) => {
        setLoading(true);
        try {
            // Remove confirmPassword before sending payload to backend
            const { confirmPassword, ...payload } = values;
            console.log('Registration Payload:', payload);

            // TODO: Replace with your actual backend API call e.g.
            // const res = await fetch('http://localhost:5000/auth/register', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(payload)
            // });

            message.success('Registration successful! Please login.');
        } catch (error: any) {
            message.error(error?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#f0f2f5',
            padding: '24px 16px'
        }}>
            <Card
                style={{
                    width: '100%',
                    maxWidth: 680,
                    borderRadius: 12,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.08)'
                }}
            >
                <div style={{ textAlign: 'center', marginBottom: 24 }}>
                    <Title level={2} style={{ marginBottom: 4 }}>Create an Account</Title>
                    <Text type="secondary">Sign up to get started with Hanna's Kitchen</Text>
                </div>

                <Form
                    form={form}
                    name="register"
                    layout="vertical"
                    onFinish={onFinish}
                    scrollToFirstError
                    autoComplete="off"
                >
                    {/* --- Basic Information --- */}
                    <Divider titlePlacement="left">Personal Information</Divider>

                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="name"
                                label="Full Name"
                                rules={[
                                    { required: true, message: 'Please enter your full name!' },
                                    { min: 2, message: 'Name must be at least 2 characters long!' }
                                ]}
                            >
                                <Input prefix={<UserOutlined />} placeholder="e.g. Hanna Doe" size="large" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="phone"
                                label="Phone Number"
                                rules={[
                                    { required: true, message: 'Please enter your phone number!' },
                                    { pattern: /^[0-9]{10,12}$/, message: 'Please enter a valid 10-12 digit phone number!' }
                                ]}
                            >
                                <Input prefix={<PhoneOutlined />} placeholder="e.g. 9876543210" size="large" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        name="email"
                        label="Email Address"
                        rules={[
                            { required: true, message: 'Please enter your email!' },
                            { type: 'email', message: 'Please enter a valid email address!' }
                        ]}
                    >
                        <Input prefix={<MailOutlined />} placeholder="e.g. hanna@example.com" size="large" />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    { required: true, message: 'Please enter your password!' },
                                    { min: 6, message: 'Password must be at least 6 characters!' }
                                ]}
                                hasFeedback
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={12}>
                            <Form.Item
                                name="confirmPassword"
                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Please confirm your password!' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                                return Promise.resolve();
                                            }
                                            return Promise.reject(new Error('The two passwords do not match!'));
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" size="large" />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* --- Address Information --- */}
                    <Divider titlePlacement="left">Delivery Address</Divider>

                    <Form.Item
                        name={['address', 'area']}
                        label="Area / Street / Building"
                        rules={[{ required: true, message: 'Please enter area details!' }]}
                    >
                        <Input prefix={<HomeOutlined />} placeholder="e.g. Flat 402, Sunshine Residency, Main Road" size="large" />
                    </Form.Item>

                    <Row gutter={16}>
                        <Col xs={24} sm={8}>
                            <Form.Item
                                name={['address', 'district']}
                                label="District / City"
                                rules={[{ required: true, message: 'Please enter district!' }]}
                            >
                                <Input prefix={<EnvironmentOutlined />} placeholder="e.g. Ernakulam" size="large" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={8}>
                            <Form.Item
                                name={['address', 'state']}
                                label="State"
                                rules={[{ required: true, message: 'Please enter state!' }]}
                            >
                                <Input prefix={<GlobalOutlined />} placeholder="e.g. Kerala" size="large" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={8}>
                            <Form.Item
                                name={['address', 'pin']}
                                label="PIN Code"
                                rules={[
                                    { required: true, message: 'Please enter PIN code!' },
                                    { pattern: /^[0-9]{6}$/, message: 'Must be a 6-digit PIN code!' }
                                ]}
                            >
                                <Input prefix={<PushpinOutlined />} placeholder="e.g. 682001" size="large" maxLength={6} />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* --- Submit Button --- */}
                    <Form.Item style={{ marginTop: 16 }}>
                        <Button type="primary" htmlType="submit" size="large" block loading={loading}>
                            Register
                        </Button>
                    </Form.Item>

                    <div style={{ textAlign: 'center' }}>
                        <Text type="secondary">Already have an account? </Text>
                        <Link href="/auth/login" style={{ fontWeight: 500 }}>
                            Log in here
                        </Link>
                    </div>
                </Form>
            </Card>
        </div>
    );
};

export default RegisterPage;