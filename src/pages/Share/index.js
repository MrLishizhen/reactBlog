import React, {Component} from "react";
import {Form, Row, Col, Input, Button, Select, DatePicker} from 'antd';
import {getTable} from '../../api/home'

import './index.css';
import QyTable from '../../components/Table'

const {RangePicker} = DatePicker;

const columns = [
    {
        title: '序号',
        render: (text, record, index) => `${index + 1}`,
        width: 80,
        key:'index',
        align: 'center',

    },
    {
        title: '文章标题',
        dataIndex: 'article_title',
        key: 'article_title',
    },
    {
        title: '文章副标题',
        dataIndex: 'article_subtitle',
        key: 'article_subtitle',
    },
    {
        title: '标签',
        dataIndex: 'article_label',
        key: 'article_label',
    },
    {
        title: '作者',
        key: 'article_user',
        dataIndex: 'article_user',
    },
    {
        title: '编辑时间',
        key: 'article_date',
        dataIndex: 'article_date',

    },
    {
        title: '点赞数',
        key: 'article_hot',
        width: 130,
        dataIndex: 'article_hot',
        sorter:(a,b)=>a['article_hot'] - b['article_hot']
    },
    {
        title: '文章浏览量',
        key: 'article_count',
        dataIndex: 'article_count',
        width: 130,
        sorter:(a,b)=>a['article_count'] - b['article_count']
    },
    {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 130,
        render: () => {
            return (
                <span>你好</span>
            )
        }
    },
];

export default class Share extends Component {
    state = {
        // tableHeight: 0,
        total: 0,
        current:1,
        tableData: [],
        scrollY: 0,
        searchForm: {
            article_label: "",
            article_subtitle: "",
            article_title: "",
            article_user: "",
            currentPage: 0,
            date: "#",
            page_size: 50,
        },
        selectArr: [{
            name: '全部',
            varlue: ''
        }, {
            name: '前端',
            value: 'web'
        }, {
            name: '设计',
            value: 'ui'
        }
        ]
    }

    componentDidMount() {
        //初始化表格高度
        this.initTableHeight();

        this.getData(this.state.searchForm);

    }

    //初始化表格高度
    initTableHeight = () => {
        let {tableBox} = this.refs;

        this.setState({
            scrollY: tableBox.offsetHeight - 120,
        }, () => {
            console.log(this.state.scrollY)
        })
    }
    //搜索
    onSearch = (values, size = 1, pageSize = 50) => {
        values['date'] !== '#' && values['date'] ? values['date'] = values['date'][0].format('YYYY-MM-DD') + '#' + values['date'][1].format('YYYY-MM-DD') : values['date'] = '#';
        for (let key in values) {
            if (values[key] === undefined) {
                values[key] = '';
            }
        }
        values.currentPage = (size - 1) * pageSize;
        values.page_size = pageSize;
        this.setState({current:size,searchForm: values}, () => {
            this.getData(values);
        })

    }
    //请求数据
    getData = (values) => {
        getTable(values).then(res => {
            if (res.status === 200) {
                const data = res.data.result;
                data.forEach((item,i)=>{
                    item.key=i
                })

                this.setState({tableData: data, total: res.data.count});
            }
        });
    }
    onChange = (current, size, pageSize) => {
        this.setState({
            current:current,
            searchForm: {
                ...this.state.searchForm,
                currentPage: (current - 1) * size,
                page_size: size
            }
        }, () => {
            this.getData(this.state.searchForm);
        })


    }

    render() {

        return (
            <div className={'share-box'}>
                <Form
                    autoComplete="off"
                    onFinish={this.onSearch}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                >
                    <Row gutter={24}>
                        <Col span={5}>
                            <Form.Item name={'article_title'} label="文章名称">
                                <Input placeholder="文章名称"/>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name={'article_subtitle'} label="文章副标题">
                                <Input placeholder="文章副标题"/>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name={'article_label'} label="标签">
                                <Select placeholder="文章标签分类">
                                    {
                                        this.state.selectArr.map((item, i) => {
                                            return <Select.Option key={i} value={item.value||''}>{item.name}</Select.Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={5}>
                            <Form.Item name={'article_user'} label="文章作者">
                                <Input placeholder="文章作者"/>
                            </Form.Item>
                        </Col>

                        <Col span={5}>
                            <Form.Item name={'date'} label="上传时间">
                                <RangePicker size={'default'}/>
                            </Form.Item>


                        </Col>
                        <Col span={5}>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">搜索</Button>
                            </Form.Item>

                        </Col>
                    </Row>


                </Form>
                <div ref={'tableBox'} className={'table-box'}>
                    {/*使用table自己的跳转条*/}
                    {/*<QyTable columns={columns} data={data} scrollY={this.state.scrollY}*/}
                    {/*         onChange={this.onChange} pagination={{defaultPageSize:50}}></QyTable>*/}

                    <QyTable columns={columns} current={this.state.current} data={this.state.tableData} total={this.state.total}
                             scrollY={this.state.scrollY} onChange={this.onChange}></QyTable>
                </div>
            </div>
        );
    }
}