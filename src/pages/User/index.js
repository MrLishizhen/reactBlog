import React,{Component} from "react";
import {Button, Col, Form, Input, Row, Select} from "antd";
import './index.css'
export default class Share extends Component{
    state = {
        selectArr: [{
            name: '全部',
            varlue: ''
        }, {
            name: '超级管理员',
            value: 'web'
        }, {
            name: '管理员',
            value: 'ui'
        }
        ]
    }
    onFinish = (values) => {
        console.log('Success:', values);
    };
    onFinishFailed = (values, errorFields, outOfDate) => {
        console.log(values, errorFields, outOfDate)
    }
    render() {
        return (
            <div className={'user-box'}>

                    <Form
                        initialValues={{
                            remember: true,
                        }}
                        autoComplete="off"
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        name="advanced_search"
                        className="ant-advanced-search-form"
                    >
                        <Row gutter={24}>
                            <Col span={5}>
                                <Form.Item name={'name'} label="管理员名称">
                                    <Input placeholder="名称"/>
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item name={'value'} label="管理员级别">
                                    <Select placeholder="管理员级别">
                                        {
                                            this.state.selectArr.map((item, i) => {
                                                return <Select.Option key={i}
                                                                      value={item.value || ''}>{item.name}</Select.Option>
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={2}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">搜索</Button>
                                </Form.Item>

                            </Col>
                        </Row>
                    </Form>
                <div className={'user'}></div>
            </div>
        );
    }
}