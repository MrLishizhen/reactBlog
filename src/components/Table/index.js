import React, {Component} from 'react';
import {Table, Pagination} from 'antd';
import './index.css'

/*
* columns 表头
* scrollY 滚动区域//需要从父级来获取，一般只需要获取表格父集的高度就可以
* pagination 是否展示自定义的分页 默认值false 表示需要后端分页
* dataSource 表格数据
* onChange 绑定的回调函数，在父集中返回三个参数当前页，获取数据的数量，表示是否切换了每页显示数量。
* */
export default class QyTable extends Component {
    // pageSize 变化的回调
    state = {
        defaultPageSize: 50,//默认每页展示的数据量
        current: 1,//默认展示的数据内容
    }
    onChange = (page, pageSize) => {
        const {onChange} = this.props;
        //表示是正常的切换表格页数
        if (pageSize === this.state.defaultPageSize) {
            this.setState({current: page}, () => {
                onChange(page, pageSize, false);
            })

        } else {
            //表示切换了每页显示的数量
            this.setState({defaultPageSize: pageSize, current: 1}, () => {
                onChange(1, pageSize, true);
            })

        }
    }

    render() {
        const {columns, data, pagination, scrollY} = this.props;

        let TabDom;
        if (pagination) {
            TabDom = (<div className={'table-top'}>
                <Table bordered columns={columns || []} scroll={{x: true, y: scrollY }}
                       pagination={pagination || false} dataSource={data || []}/>
            </div>)

        } else {
            TabDom = (
                <>
                    <div className={'table-top'}>
                        <Table bordered columns={columns || []} scroll={{x: true, y: scrollY}}
                               pagination={pagination || false} dataSource={data || []}/>
                    </div>
                    <div className={'table-pagination'}>
                        <Pagination total={data.length}
                                    current={this.state.current}
                                    showSizeChanger
                                    onChange={this.onChange}
                                    showQuickJumper
                                    pageSizeOptions={[50,100,200,400,500]}
                                    defaultPageSize={this.state.defaultPageSize}
                                    showTotal={total => `${total}条`}/>
                    </div>
                </>)
        }
        return (
            <div className={'table'}>
                {TabDom}
            </div>
        )
    }
}