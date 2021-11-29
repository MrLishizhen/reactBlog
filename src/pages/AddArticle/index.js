import React, {Component} from "react";

import {Button, Col, Form, Upload, Input, Row, Select, message, Modal} from "antd";
import {UploadOutlined} from '@ant-design/icons';

import '../AddArticle/index.css'
import {addarticle, getDefault, setarticle, uploadImge} from '../../api/home'
//引入tinymce
import tinymce from "tinymce";
import Editor from '../../components/editor'
// import ModelLi from '../../components/Model_li'


// react-cropper
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
//必选封面，点击上传封面后展示上传封面内容

// const {RangePicker} = DatePicker;
export default class Share extends Component {
    state = {
        modelData: {
            visible: false,
            closable: false
        },
        isEdit: false,//标识当前是编辑状态还是新添加状态
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
            name: '前端',
            value: '前端'
        }, {
            name: '设计',
            value: '设计'
        }
        ],
        cropper: null,
        imgs: {
            filesImg: '',
            url: '',
            canvasUrl: '',
        },
        isModalVisible: false,
        isModalVisibleY:false,
        uploads: {
            name: 'file',
            // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            // headers: {
            //     authorization: 'authorization-text',
            // },
            maxCount: 1,
            showUploadList: false,
            onChange(info) {
                console.log(info)
            },
            beforeUpload: file => {
                const bs = this.beforeAvatarUpload(file);

                if (bs) {
                    //声明图片对象
                    const img = new Image();
                    //赋值
                    //获取图片对象赋值
                    img.src = URL.createObjectURL(file);
                    //图片加载完成
                    img.onload = function () {
                        console.log('图片成功了')
                    }

                    console.log(img);
                    this.setState({
                        isModalVisible: true,
                        imgs: {
                            filesImg: file,
                            url: img.src
                        }
                    })
                }
                return false;
            },
        }
    }

    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
            message.error('上传头像图片只能.jpg或者是.png');
            return false;
        }
        if (!isLt2M) {
            message.error('上传头像图片大小不能超过 2MB!');
            return false;
        }
        return isJPG && isLt2M;
    }

    handleOk = (i) => {
        if(i===-1){
            this.setState({
                isModalVisibleY: false,
            })
        }else{
            this.setState({
                isModalVisible: false,
            })
        }
    }
    handleCancel = (i) => {
        if(i===-1){
            this.setState({
                isModalVisibleY: false,
            })
        }else{
            this.setState({
                isModalVisible: false,
            })
        }

    }

    componentDidMount() {
        this.init();
        console.log(1)
    }

    init = () => {
        const id = this.props.location.state?.id;

        if (id === undefined) {
            //新增操作
            this.setState({
                isEdit: false
            })
            console.log('新增');
        } else {
            //修改操作
            this.setState({
                isEdit: true
            }, () => {
                this.getDefaultInit(id)
            })

        }
    }

    getDefaultInit = (id) => {
        getDefault({id}).then(res => {
            if (res.status === 200) {
                this.refs.form.setFieldsValue({
                    ...res.data[0],
                    briefIntroduction: res.data[0].article_briefIntroduction
                })
                this.setState({
                    formData: {...res.data[0]},
                    imgs:{
                        filesImg:{
                            name:res.data[0].artive_cover
                        },
                        url:'/api/tmp/'+res.data[0].artive_cover,

                    }
                }, function () {

                    tinymce.activeEditor.setContent(res.data[0].article_content)
                })
            }
        })
    }
    //点击打开上传model
    modelClick = () => {
        this.setState({
            isModalVisibleY: true,
        })
    }
    // //确定
    // handleOk = () => {
    //     this.modelClick();
    //     console.log('确认');
    // }
    // //取消
    // handleCancel = () => {
    //     this.modelClick();
    //     console.log('取消');
    // }
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
        if (this.state.isEdit) {
            formData = {
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
                if (!this.state.imgs.filesImg.name) {
                    message.error('必须上传文章封面');
                    return;
                }
                const data = {
                    article_subtitle: this.state.formData.article_subtitle,
                    article_title: this.state.formData.article_title,
                    briefIntroduction: this.state.formData.article_briefIntroduction,
                    content: this.state.formData.article_content,
                    id: this.state.formData.article_id,
                    article_label: this.state.formData.article_label,
                    url:this.state.formData.url
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
                    } else {
                        message.error('修改失败');
                    }
                });

            })
        } else {
            formData = {
                ...this.state.formData,
                ...values,
                article_user: user.name,//作者名
                article_user_id: user.id,//作者id
                url:this.state.imgs.filesImg.name
            }
            this.setState({
                formData: formData
            }, () => {
                if (this.state.formData.content === '') {
                    message.error('文章内容不允许为空');
                    return;
                }
                if (!this.state.imgs.filesImg.name) {
                    message.error('必须上传文章封面');
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
                            },
                            imgs: {
                                filesImg: '',
                                url: '',
                                canvasUrl: '',
                            },
                        })
                    }
                });

            })
        }


    };
    onFinishFailed = (values, errorFields, outOfDate) => {
        console.log(values, errorFields, outOfDate)
    }
    operationFunc = (i) => {

        if (i === -1) {
            this.cropper.rotate(-90);
        } else {
            this.cropper.rotate(90);
        }

    };
    realTime = (data) => {
    }
    clickImgUpDate=()=>{
        this.setState({
            isModalVisible: true,
        })
    }
    clickImg = () => {
        const _this = this;

        this.cropper.getCroppedCanvas().toBlob((blob) => {
            const datas = new FormData();
            datas.append('file', blob, this.state.imgs.filesImg.name);
            uploadImge(datas).then((res) => {
                if (res.status) {
                    message.success('上传成功');
                    _this.setState({
                        isModalVisible:false,
                        imgs: {
                            ...this.state.imgs,
                            url: process.env.REACT_APP_IMAGE_URL+'/tmp/' + res.data,
                            filesImg:{
                                name:res.data,
                            }
                        }
                    })
                    _this.cropper.reset()
                    // _this.state.imgs.url = '../tmp/' + res.data;

                } else {
                    message.error('上传失败');

                }
            }).catch((err) => {

                message.error('上传失败');

            })
        })
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
                        <Col span={15}>
                            <Form.Item name={'briefIntroduction'} label="文章主题"
                                       rules={[{required: true, message: '此项必填'}]}>
                                <Input placeholder="文章主题"
                                />
                            </Form.Item>
                        </Col>

                    </Row>
                    <Row gutter={24}>
                        <Col span={2}>
                            <Form.Item>
                                <Upload {...this.state.uploads}>
                                    <Button type="primary" icon={<UploadOutlined/>}
                                            >上传封面</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Form.Item>
                                <Button type="primary"
                                        disabled={this.state.imgs.filesImg === '' ? true : false} onClick={this.modelClick}>预览封面</Button>
                            </Form.Item>
                        </Col>
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


                <Modal visible={this.state.isModalVisible} footer={null}  zIndex={1000} width={1000} onOk={()=>this.handleOk(1)}
                       onCancel={()=>this.handleCancel(1)}>
                    <div className={'cropper-box'}>
                        <div className={'cropper-left'}>
                            <Cropper
                                style={{width: "500px", height: "400px"}}
                                aspectRatio={218 / 144}
                                preview=".cropper-zs"
                                guides={false}
                                dragMode={'move'}
                                movable={true}
                                centerBox={false}
                                src={this.state.imgs.url}
                                onInitialized={cropper => {
                                    this.cropper = cropper
                                }}
                                crop={this.realTime}
                            />
                        </div>
                        <div className={'cropper-right'}>
                            <div className={'cropper-zs'}></div>
                            <div className={'btns'}>
                                <Button type="primary" onClick={() => {
                                    this.operationFunc(-1)
                                }}>左旋转</Button>
                                <Button type="primary" onClick={() => {
                                    this.operationFunc(1)
                                }}>右旋转</Button>
                                <Button type="primary" onClick={this.clickImg}>保存</Button>
                            </div>
                        </div>
                    </div>
                </Modal>

                <Modal visible={this.state.isModalVisibleY} footer={null} zIndex={999} width={600} onOk={()=>this.handleOk(-1)}
                       onCancel={()=>this.handleCancel(-1)}>

                    <div className={'preview-com'}>
                        <div className={'preview-img'}
                             style={{'background': `#e0e0e0 url(${this.state.imgs?.url}) no-repeat center center/100%`}}>

                        </div>
                        <div className={'btns'}>
                            <Button type="primary" onClick={this.clickImgUpDate}>修改</Button>
                        </div>
                    </div>

                </Modal>
                {/*<ModelLi modelData={this.state.modelData}>*/}
                {/*</ModelLi>*/}
            </div>
        );
    }
}