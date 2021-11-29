import React, {Component} from "react";
import {Button, Col, Form, Input, message, Modal, Row, Select, Space, Tooltip} from "antd";
import './index.css'
import {rTime} from "../../api";
import {getUserTabe, removeuser, setuser,updateUser} from "../../api/home";
import QyTable from '../../components/Table';
import {
    DeleteTwoTone,
    ExclamationCircleOutlined,
    EditTwoTone
} from "@ant-design/icons";
import {unLogin} from "../../util/func";

export default class Share extends Component {
    state = {
        isModalVisible: false,
        total: 0,
        title:'添加账户',
        current: 1,
        tableData: [],
        scrollY: 0,
        searchForm: {
            name: '',
            value: ''
        },
        selectArr: [{
            name: '全部',
            varlue: ''
        }, {
            name: '超级管理员',
            value: '1'
        }, {
            name: '管理员',
            value: '2'
        }
        ],
        columns: [
            {
                title: '序号',
                render: (text, record, index) => `${index + 1}`,
                width: 80,
                key: 'index',
                align: 'center',

            },
            {
                title: '管理员名称',
                key: 'name',
                width: 400,
                dataIndex: 'name',
            },
            {
                title: '管理员级别',
                key: 'userjb',
                width: 400,
                dataIndex: 'userjb',
                render: (text) => {
                    if (text === 1) {
                        return '超级管理员';
                    } else if (text === 2) {
                        return '管理员';
                    }
                }
            },
            {
                title: '编辑时间',
                key: 'adminDate',
                dataIndex: 'adminDate',
                sorter: (a, b) => {
                    //处理时间排序问题
                    return Date.parse(a.adminDate) - Date.parse(b.adminDate)
                },
                render: (text) => {
                    return rTime(text);
                }
            }
        ]
    }

    hideModal = (close) => {
        this.addUser()
    }
    okModel = (id) => {
        removeuser({id}).then(res => {
            if (res.status === 200) {
                //表示删除成功
                message.success(res.message);
                const index = this.state.tableData.findIndex(item => item['id'] === id);
                this.state.tableData.splice(index, 1);
                this.setState({
                    tableData: [...this.state.tableData],
                    total: this.state.total - 1
                })
            } else {
                message.error('操作失败');
            }
        })
    }

    deleteClick = (id, text) => {
        Modal.confirm({
            title: '警告',
            icon: <ExclamationCircleOutlined/>,
            content: (<p>确认删除管理员 《<span style={{color: '#faad14'}}>{text.name}</span> 》 吗？删除后不可以恢复的哟！</p>),
            okText: '确认',
            cancelText: '取消',
            // onCancel: this.hideModalDelect,
            onOk: () => {
                this.okModel(id);
            }
        });

    }
    //修改管理员账号
    updateAdmin = (id,obj) => {
        this.setState({
            title:'修改账户',
            isModalVisible: !this.state.isModalVisible,
            searchForm:{
                ...obj
            }
        },()=>{
            this.refs.form.setFieldsValue({
                name:obj.name
            })
        })
        console.log(id,obj);
    }
    buttonShow = (text) => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        //管理员自身和超级管理员不能被删除
        if (text.userjb === 1&&user.id === text.id) {
            return <Tooltip title={'修改管理员'}><EditTwoTone onClick={()=>this.updateAdmin(text.id, text)}/></Tooltip>;
        //管理员自身只能修改自身  不能删除
        }else if(user.id === text.id){
            return <Tooltip title={'修改管理员'}><EditTwoTone onClick={()=>this.updateAdmin(text.id, text)}/></Tooltip>
        //超级管理员可以修改删除下级管理员
        } else if (text.userjb === 2&&user.id === 1) {
            return (
                <>
                    <Tooltip title={'删除管理员'}><DeleteTwoTone onClick={() => this.deleteClick(text.id, text)}/></Tooltip>
                    <Tooltip title={'修改管理员'}><EditTwoTone onClick={()=>this.updateAdmin(text.id, text)}/></Tooltip>
                </>)
        }
    }


    onFinish = (values) => {
        this.onSearch(values);
    };

    onSearch = (values) => {
        for (let key in values) {
            if (values[key] === undefined) {
                values[key] = '';
            }
        }

        this.setState({searchForm: values}, () => {
            this.getData(values);
        })

    }
    onFinishFailed = (values, errorFields, outOfDate) => {
        console.log(values, errorFields, outOfDate)
    }

    componentDidMount() {


        //初始化表格高度
        this.initTableHeight();

        // const user = JSON.parse(sessionStorage.getItem('user'));

        this.setState({
            columns: [...this.state.columns, {
                title: '操作',
                key: 'action',
                width: 130,
                render: (text, record) => {

                    return (
                        <Space size="middle">
                            {/*{showI(text.article_is,text)}*/}
                            {/*<Tooltip title={'修改文章'}> <EditTwoTone onClick={()=>editClick(text.article_id)} /></Tooltip>*/}
                            {this.buttonShow(text)}
                        </Space>
                    )
                }
            }
            ]
        })

        this.getData(this.state.searchForm);

    }


    addUser = () => {
        this.setState({
            title:'添加账户',
            isModalVisible: !this.state.isModalVisible
        })
    }

    getForm = (values) => {
        console.log(this.state.title);
        if(this.state.title==='添加账户'){

            setuser(values).then(res => {
                if (res.status === 200) {
                    message.success('添加成功');
                    this.getData(this.state.searchForm);
                    this.addUser();
                } else {
                    message.error(res.message);
                }
            })
        }else{
            updateUser({...values,id:this.state.searchForm.id}).then(res => {
                if (res.status === 200) {
                    message.success('修改成功,请重新登录');
                    unLogin();
                    this.props.history.replace('/servere/login');
                } else {
                    message.error(res.message);
                }
            })
        }

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
    //请求数据
    getData = (values) => {
        getUserTabe(values).then(res => {
            if (res.status === 200) {
                const data = res.data;
                data.forEach((item, i) => {
                    item.key = i
                })
                this.setState({tableData: data, total: res.data.length});
            }
        });
    }

    onChange = (current, size, pageSize) => {
        this.setState({
            current: current,
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
                        <Col span={6}>

                            <Button type="primary" htmlType="submit">搜索</Button>
                            <Button type="primary" onClick={this.addUser}>添加</Button>


                        </Col>

                    </Row>
                </Form>
                <div className={'user'} ref={'tableBox'}>
                    <QyTable columns={this.state.columns} current={this.state.current} data={this.state.tableData}
                             total={this.state.total}
                             scrollY={this.state.scrollY} onChange={this.onChange}></QyTable>
                </div>

                <Modal title={this.state.title} footer={null} visible={this.state.isModalVisible} onCancel={this.hideModal}>
                    <Form
                        autoComplete="off"
                        ref={'form'}
                        onFinish={this.getForm}
                        name="advanced_search"
                        className=""
                    >
                        <Row gutter={24}>
                            <Col span={24}>
                                <Form.Item name={'name'} label="管理员名称">
                                    <Input placeholder="管理员名称"/>
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name={'value'} label="管理员密码">
                                    <Input placeholder="管理员密码"/>
                                </Form.Item>
                            </Col>

                        </Row>

                        <Row gutter={24} style={{justifyContent: 'end'}}>
                            <Col span={5}>
                                <Form.Item>
                                    <Button onClick={this.addUser}>取消</Button>
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">{this.state.title}</Button>
                                </Form.Item>
                            </Col>

                        </Row>


                    </Form>
                </Modal>
            </div>
        );
    }
}