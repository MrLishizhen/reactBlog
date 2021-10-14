import React, {Component} from "react";
import { Editor } from '@tinymce/tinymce-react';
// import tinymce from "tinymce";
import 'tinymce/themes/silver'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/save'
import 'tinymce/plugins/codesample'//代码块
import 'tinymce/plugins/hr'//下划线
import 'tinymce/plugins/image'
import 'tinymce/icons/default/icons'

import 'tinymce/plugins/emoticons'

//
// import 'tinymce/skins/ui/oxide/skin.min.css'
// import 'tinymce/skins/ui/oxide/content.inline.min.css'


// console.log(process.env.REACT_APP_BASE_URL)

//onChange(type,value);type:1||2 value,数据处理
import {message} from "antd";
import {uploadImge} from '../../api/home'

export default class editor extends Component {

    state={

        apiKey: "z9tnpf5q5ryv0zqk1f8zr61xrw7r50d1wdobrv0gnmq63u5d",
        editorInit: {
            placeholder: '在这里输入文字...',
            // language_url: zhCN,
            language: 'zh_CN',
            language_url: process.env.REACT_APP_BASE_URL+'/tinymce/langs/zh_CN.js',
            skin_url: process.env.REACT_APP_BASE_URL+'/tinymce/skins/ui/oxide',
            // images_upload_url:"/admin_article/addArticle",
            // images_upload_base_path: '/tmp',
            // // image_title: false,
            // automatic_uploads: false,
            height: 700,
            images_upload_handler: async (blobInfo, success, failure)=>{//函数必须要写在这里  不写这里就出不来自定义上传组件 不知道为什么
                const data = new FormData();

                data.append('file', blobInfo.blob(), blobInfo.filename());

                await uploadImge(data).then((res) => {
                    if (res.status) {
                        message.success( '上传成功');

                        let url = res.data;
                        this.imgString = process.env.REACT_APP_IMAGE_URL+ "/tmp/" + url;
                        // this.imgString = "/tmp/" + url;
                        success(this.imgString)
                    } else {
                        message.error('上传失败',);
                        failure('')
                    }
                }).catch((err) => {
                    message.success('上传失败');
                    failure('')
                })
            },
            content_css: process.env.REACT_APP_BASE_URL+"/tinymce/skins/content/default/content.css",
            browser_spellcheck: true, // 拼写检查
            branding: false, // 去水印
            elementpath: false, // 禁用编辑器底部的状态栏
            statusbar: false, // 隐藏编辑器底部的状态栏
            paste_data_images: true, // 允许粘贴图像
            fontsize_formats: "8px 9px 10px 11px 12px 13px 14px 15px 16px 18px 24px 36px",//设置单位
            menubar:true, //
            plugins: 'save advlist table lists paste preview fullscreen image codesample hr',
            toolbar: 'fontsizeselect forecolor backcolor bold italic underline strikethrough save hr image| alignleft aligncenter alignright alignjustify | quicklink h2 h3 blockquote table numlist bullist preview fullscreen codesample'
        }
    }

    // 富文本修改
    onEditorChange=(a,b)=>{
        if(a!==''){
            this.props.onChange(1,a);
        }
    }
    imgUpload=async (blobInfo, success, failure)=>{
        const data = new FormData();

        data.append('file', blobInfo.blob(), blobInfo.filename());

        await uploadImge(data).then((res) => {
            if (res.status) {
                message.success( '上传成功');

                let url = res.data;
                this.imgString = "../tmp/" + url;
                success(this.imgString)
            } else {
                message.error('上传失败',);
                failure('')
            }
        }).catch((err) => {
            message.success('上传失败');
            failure('')
        })
    }


    //富文本失去焦点
    onBlur=(a,b)=>{

        // console.log(a,b)
    }
    componentDidUpdate(nextProps) {

    }
    render() {
        return (
            <Editor id={'tinymce'} initialValue={this.props.content} onEditorChange={this.onEditorChange} onBlur={this.onBlur} init={this.state.editorInit} apiKey={this.state.apiKey}></Editor>
        )
    }
}