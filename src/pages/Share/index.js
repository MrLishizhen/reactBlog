import React, {Component} from "react";
import {Form, Row, Col, Input, Button, Select, DatePicker, Space, Tag} from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import './index.css';
import QyTable from '../../components/Table'

const {RangePicker} = DatePicker;
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <>
                {tags.map(tag => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        ),
    },
    {
        title: 'Action',
        key: 'action',
        render: () => {
            return (
                <span>你好</span>
            )
        }
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '4',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '5',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '6',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '7',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '8',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '9',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '10',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '11',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '12',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '13',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '14',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '16',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '17',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '18',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '19',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '20',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '21',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '22',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
    {
        key: '23',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
    },
];

export default class Share extends Component {
    state = {
        // tableHeight: 0,
        scrollY: 0,
    }

    componentDidMount() {
        let {tableBox} = this.refs;

        this.setState({
            scrollY: tableBox.offsetHeight-120,
        },()=>{
            console.log(this.state.scrollY)
        })


    }

    onChange = (current, size,pageSize) => {
        console.log(current, size,'这是我打印的',pageSize);
    }

    render() {

        return (
            <div className={'share-box'}>
                <Form

                    name="advanced_search"
                    className="ant-advanced-search-form"
                >
                    <Row gutter={24}>
                        <Col span={5}>
                            <Form.Item label="文章名称">
                                <Input name={'article_title'} placeholder="文章名称"/>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="文章副标题">
                                <Input name={'article_subtitle'} placeholder="文章副标题"/>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item label="标签">
                                <Select placeholder="文章标签分类">
                                    <Select.Option value="demo">Demo</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={5}>
                            <Form.Item label="文章作者">
                                <Input name={'article_user'} placeholder="文章作者"/>
                            </Form.Item>
                        </Col>

                        <Col span={5}>
                            <Form.Item label="上传时间">
                                <Space direction="vertical" size={12}>
                                    <RangePicker locale={locale} size={'default'}/>
                                </Space>
                            </Form.Item>


                        </Col>
                        <Col span={5}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">搜索</Button>
                            </Form.Item>

                        </Col>
                    </Row>


                    {/*<Form.Item>*/}
                    {/*    <Button type="primary">搜索</Button>*/}
                    {/*</Form.Item>*/}

                </Form>
                <div ref={'tableBox'} className={'table-box'}>
                    {/*<QyTable columns={columns} data={data} scrollY={this.state.scrollY}*/}
                    {/*         onChange={this.onChange} pagination={{defaultPageSize:50}}></QyTable>*/}

                    <QyTable columns={columns} data={data} scrollY={this.state.scrollY} onChange={this.onChange} ></QyTable>
                </div>
            </div>
        );
    }
}