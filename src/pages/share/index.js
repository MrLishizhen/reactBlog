import React, {Component} from "react";
import {Form, Row, Col, Input, Button, Select, DatePicker, Space, message,Modal,Tooltip} from 'antd';
import {getTable,deleteTable,setTableHot} from '../../api/home'
import {rTime} from '../../api'
import './index.css';
import QyTable from '../../components/Table'
import {
    ExclamationCircleOutlined,
    CheckCircleTwoTone,
    CloseCircleFilled,
    EditTwoTone,
    DeleteTwoTone
} from '@ant-design/icons';

const {RangePicker} = DatePicker;



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
            value: '前端'
        }, {
            name: '设计',
            value: '设计'
        }
        ],
        columns :[
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
                sorter: (a,b)=>{
                    //处理时间排序问题
                    return Date.parse(a.article_date) - Date.parse(b.article_date)
                },
                render:(text)=>{
                    return rTime(text);
                }
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
                render: (text, record) => {

                    let showOrHideClick=(is,id)=>{
                        setTableHot({hot:is,id}).then(res=>{
                            if(res.status===200){
                                this.state.tableData.find(item=>item.article_id===id).article_is=is;
                                this.setState({
                                    tableData:[...this.state.tableData]
                                })
                                message.success('操作成功');
                            }else{
                                message.error('操作失败');
                            }
                        })
                    }

                    //验证是当前是展示还是隐藏
                    let showI = (is,item)=>{
                        if(is===1){
                            return <Tooltip title={'隐藏文章'}><CheckCircleTwoTone onClick={()=>showOrHideClick(0,item.article_id)}/></Tooltip>
                        }else{
                            return <Tooltip title={'显示文章'}><CloseCircleFilled  onClick={()=>showOrHideClick(1,item.article_id)}/></Tooltip>
                        }
                    }

                    let hideModal = (close)=>{
                        Modal.destroyAll();
                    }
                    let okModel = (id)=>{
                        deleteTable({id}).then(res=>{
                            if(res.status===200){
                                //表示删除成功
                                message.success(res.message);
                                const index = this.state.tableData.findIndex(item=>item['article_id']===id);
                                this.state.tableData.splice(index,1);
                                this.setState({
                                    tableData:[...this.state.tableData],
                                    total:this.state.total-1
                                })
                            }else{
                                message.error('操作失败');
                            }
                        })
                    }
                    let editClick = (id)=>{
                        this.props.history.push({pathname:'/home/addArticle',state:{id}})
                        // console.log('修改');
                    }
                    let deleteClick = (id,text)=>{
                        Modal.confirm({
                            title: '警告',
                            icon: <ExclamationCircleOutlined />,
                            content: (<p>确认删除文章 《<span style={{color:'#faad14'}}>{text.article_title}</span>  》 吗？删除后不可以恢复的哟！</p>),
                            okText: '确认',
                            cancelText: '取消',
                            onCancel:hideModal,
                            onOk:function(){
                                okModel(id);
                            }
                        });

                    }
                    return (
                        <Space size="middle" align={'center'}>
                            {showI(text.article_is,text)}
                            <Tooltip title={'修改文章'}> <EditTwoTone onClick={()=>editClick(text.article_id)} /></Tooltip>
                            <Tooltip title={'删除文章'}><DeleteTwoTone onClick={()=>deleteClick(text.article_id,text)}/></Tooltip>
                        </Space>
                    )
                }
            },
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

                    <QyTable columns={this.state.columns} scrollX={1800} current={this.state.current} data={this.state.tableData} total={this.state.total}
                             scrollY={this.state.scrollY} onChange={this.onChange}></QyTable>
                </div>
            </div>
        );
    }
}