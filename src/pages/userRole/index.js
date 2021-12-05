import React, {useEffect, useState} from 'react';
import {Tooltip, Space,Button,Modal} from 'antd';
import QyTable from '../../components/Table/index'
import {deepClones, menuArr} from '../../util/func'
import {getAllRole} from "../../api/home";
import './index.css'
import {DeleteTwoTone, EditTwoTone,PlusCircleTwoTone} from "@ant-design/icons";


export default function UserRole() {
    // 声明一个新的叫做 “count” 的 state 变量
    // const [count, setCount] = useState(0);
    const user = JSON.parse(sessionStorage.getItem('user'));

    let title = '权限管理';
    const [visible,setVisible] = useState(true)
    const [columns] = useState([
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
            width: '12%',
        },
        {
            title: 'RouterName',
            dataIndex: 'routerName',
            width: '30%',
            key: 'routerName',
        },
        {
            title: 'RouterUrl',
            dataIndex: 'routerUrl',
            width: '30%',
            key: 'index'
        },
        {
            title: '操作',
            key: 'action',
            width: 130,
            render: (text, record) => {
                return (
                    <Space size="middle" style={{'paddingLeft': (text.index)*10+'px'}}>
                        <Tooltip title={'删除'}><DeleteTwoTone onClick={()=>deleteMenu(text)}/></Tooltip>
                        <Tooltip title={'修改'}><EditTwoTone onClick={()=>updateMenu(text)}/></Tooltip>
                        <Tooltip title={'添加'}><PlusCircleTwoTone onClick={()=>addMenu()}/></Tooltip>
                    </Space>
                )
            }
        }
    ]);
    const [data, setData] = useState([]);
    const [defaultData,setDefaultData] = useState([]);
    useEffect(() => {

        let getRole = async () => {
            const result = await getAllRole({id: user.id});

            if (result.status === 200) {
                result.data.map((item, i) => {
                    return item.key = i.toString();
                })
                //深拷贝数组
                const data = deepClones(result.data);

                //用于前端验证是否存在子级，有子级不让删
                setDefaultData([...result.data]);
                setData(menuArr(data));
            }
        }
        getRole();
    }, [])
    //删除
    const deleteMenu=(text)=>{
        console.log(text);
    }
    //修改
    const updateMenu = (text)=>{
        console.log('修改');
    }

    //添加
    const addMenu = ()=>{

    }

    //点击确认
    const handleOk = ()=>{
        setVisible(false);
    }
    //取消
    const handleCancel =()=>{
        setVisible(false);
    }
    //触发弹窗
    const clickMenu = (index)=>{
        if(index===0){
            //表示一级添加
            setVisible(true);
        }
    }
    return (
        <div className={'userRole'}>
            <div className={'userRole-top'}>
                <Button type="primary" onClick={()=>clickMenu(0)}>添加一级菜单</Button>
            </div>
            <div className={'userRole-bom'}>
                <QyTable
                    columns={columns}
                    data={data}
                />
            </div>
            <Modal title={title} visible={visible} onOk={handleOk} onCancel={handleCancel}></Modal>



        </div>
    );
}

