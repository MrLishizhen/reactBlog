import { Breadcrumb } from 'antd';
import './index.css';
export default function BreadcrumbLi(props){
        const {data} = props;
        return(
            <div className={'breadcrumb-li-box'}>
                <Breadcrumb>
                    {
                        data.map((item,key)=>{
                            return <Breadcrumb.Item style={{'fontSize':16 - key*2+'px'}} className={'breadcrumb-li-item'} key={key}>{item}</Breadcrumb.Item>
                        })
                    }
                </Breadcrumb>
            </div>
        )

}