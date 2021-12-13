import React, {Component} from "react";
import '../Home/index.css'
import Headers from '../../components/LayoutHeader'
import Menu from '../../components/menu/menu'
import {GetUser} from '../../context/global';

export default class Home extends Component {

    state = {
        breadcrumb: []
    }

    componentDidMount() {

    }

    //顶部导航栏
    onChangeBreadcrumb = (data) => {

        this.setState({
            breadcrumb: [...data.reverse()]
        })

    }

    render() {
        const {history} = this.props;
        // console.log(this.context);
        return (

            <GetUser>
                <div className='home-box'>
                    {/*顶部导航栏*/}
                    <Headers data={this.state.breadcrumb} ></Headers>
                    <main>
                        <Menu history={history}  onChange={(val) => this.onChangeBreadcrumb(val)}></Menu>
                    </main>
                </div>
            </GetUser>
        )
    }
}
