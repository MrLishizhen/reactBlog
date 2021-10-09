import React, {Component} from "react";

import {Button, Col, Form, Input, Row, Select, message} from "antd";

import '../AddArticle/index.css'
import {addarticle,getDefault,setarticle} from '../../api/home'
//引入tinymce
import tinymce from "tinymce";
import Editor from '../../components/editor'
import ModelLi from '../../components/Model_li'

// const {RangePicker} = DatePicker;
export default class Share extends Component {
    state = {
        modelData: {
            visible: false,
            closable: false
        },
        isEdit:false,//标识当前是编辑状态还是新添加状态
        isInIt: false,
        formData: {
            article_subtitle: "",//副标题
            article_title: "",//主标题
            article_user: '',//作者名
            article_user_id: '',//作者id
            briefIntroduction: "",//主题
            content: "",//内容
            article_label: "",//所属分类
            url: "",//封面url
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
        ]
    }

    componentDidMount() {
        this.init();
        console.log(1)
    }

    init = () => {
        const id = this.props.location.state?.id;

        if(id===undefined){
            //新增操作
            this.setState({
                isEdit:false
            })
            console.log('新增');
        }else{
            //修改操作
            this.setState({
                isEdit:true
            },()=>{
                this.getDefaultInit(id)
            })

        }
    }

    getDefaultInit=(id)=>{
        getDefault({id}).then(res=>{
            if(res.status===200){
                this.refs.form.setFieldsValue({...res.data[0],briefIntroduction:res.data[0].article_briefIntroduction})
                this.setState({
                    formData:{...res.data[0]}
                },function(){

                    tinymce.activeEditor.setContent(res.data[0].article_content)
                })
            }
        })
    }
    //点击打开上传model
    modelClick = () => {
        this.setState({
            modelData: {
                ...this.state.modelData,
                visible: !this.state.modelData.visible,
            }
        })
    }
    //确定
    handleOk = () => {
        this.modelClick();
        console.log('确认');
    }
    //取消
    handleCancel = () => {
        this.modelClick();
        console.log('取消');
    }
    onChange = (type, value) => {
        switch (type) {
            case 1 :
                this.setState({
                    formData: {
                        ...this.state.formData,
                        content: value
                    }
                })
                break;

            case 2 :
                this.setState({
                    isInIt: false
                })
                break;

            default:

        }
    }
    onFinish = (values) => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        let formData = {};
        if(this.state.isEdit){
            formData={
                ...this.state.formData,
                ...values,
            }
            this.setState({
                formData: formData
            }, () => {
                if (this.state.formData.content === '') {
                    message.error('文章内容不允许为空');
                    return;
                }
                const data = {
                    article_subtitle: this.state.formData.article_subtitle,
                    article_title: this.state.formData.article_title,
                    briefIntroduction: this.state.formData.article_briefIntroduction,
                    content: this.state.formData.article_content,
                    id: this.state.formData.article_id,
                    article_label:this.state.formData.article_label,
                }
                setarticle(data).then(res => {
                    if (res.status === 200) {//表示成功
                        message.success('修改成功');
                        this.refs.form.resetFields();
                        tinymce.activeEditor.setContent('');

                        this.setState({
                            formData: {
                                formData: {
                                    article_subtitle: "",//副标题
                                    article_title: "",//主标题
                                    briefIntroduction: "",//主题
                                    content: "",//内容
                                    article_label: "",//所属分类
                                    url: "",//封面url
                                }
                            }
                        })
                    }else{
                        message.error('修改失败');
                    }
                });

            })
        }else{
            formData={
                ...this.state.formData,
                ...values,
                article_user: user.name,//作者名
                article_user_id: user.id,//作者id
            }
            this.setState({
                formData: formData
            }, () => {
                if (this.state.formData.content === '') {
                    message.error('文章内容不允许为空');
                    return;
                }
                addarticle(this.state.formData).then(res => {
                    if (res.status === 200) {//表示成功
                        message.success('文章发布成功');
                        this.refs.form.resetFields();
                        tinymce.activeEditor.setContent('');

                        this.setState({
                            formData: {
                                formData: {
                                    article_subtitle: "",//副标题
                                    article_title: "",//主标题
                                    briefIntroduction: "",//主题
                                    content: "",//内容
                                    article_label: "",//所属分类
                                    url: "",//封面url
                                }
                            }
                        })
                    }
                });

            })
        }


    };
    onFinishFailed = (values, errorFields, outOfDate) => {
        console.log(values, errorFields, outOfDate)
    }

    render() {
        return (
            <div className={'addArticle-box'}>
                <Form

                    initialValues={{
                        remember: true,
                    }}

                    ref={'form'}
                    autoComplete="off"
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    name="advanced_search"
                    className="ant-advanced-search-form"
                >
                    <Row gutter={24}>
                        <Col span={5}>
                            <Form.Item name={'article_title'} label="主标题"
                                       rules={[{required: true, message: '此项必填'}]}>
                                <Input placeholder="主标题"/>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name={'article_subtitle'} label="副标题"
                                       rules={[{required: true, message: '此项必填'}]}>
                                <Input placeholder="副标题"/>
                            </Form.Item>
                        </Col>
                        <Col span={5}>
                            <Form.Item name={'article_label'} label="文章分类"
                                       rules={[{required: true, message: '此项必填'}]}>
                                <Select placeholder="文章分类">
                                    {
                                        this.state.selectArr.map((item, i) => {
                                            return <Select.Option key={i}
                                                                  value={item.value || ''}>{item.name}</Select.Option>
                                        })
                                    }
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={24}>
                        <Col span={5}>
                            <Form.Item name={'briefIntroduction'} label="文章主题"
                                       rules={[{required: true, message: '此项必填'}]}>
                                <Input placeholder="文章主题"
                                />
                            </Form.Item>
                        </Col>

                        {/*<Col span={2}>*/}
                        {/*    <Form.Item>*/}
                        {/*        /!*<Button type="primary" onClick={this.modelClick}>上传封面</Button>*!/*/}
                        {/*    </Form.Item>*/}
                        {/*</Col>*/}
                        <Col span={2}>
                            <Form.Item>
                                <Button type="dashed" htmlType="submit">上传</Button>
                            </Form.Item>

                        </Col>
                    </Row>
                </Form>
                <div className={'editor-box'}>
                    <Editor content={this.state.formData.article_content} isInIt={this.state.isInIt}
                            onChange={this.onChange}></Editor>
                </div>
                <ModelLi modelData={this.state.modelData}>
                </ModelLi>
            </div>
        );
    }
}