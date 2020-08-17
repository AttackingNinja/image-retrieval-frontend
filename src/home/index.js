import React from 'react';
import {Layout, Menu, Breadcrumb} from 'antd';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import ImageRetrieval from "../image-retrieval";
import RetrievalResult from "../retrieval-result";
import SystemInfo from "../system-info";
import "./index.css"

const {Header, Content, Sider} = Layout;
const {SubMenu} = Menu;

class Home extends React.Component {
    state = {
        collapsed: false,
    };

    onCollapse = collapsed => {
        console.log(collapsed);
        this.setState({collapsed});
    };

    render() {
        return (
            <Router>
                <Layout style={{minHeight: '100vh'}}>
                    <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <div className="logo"/>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1"><Link to="/image-retrieval">图片检索</Link></Menu.Item>
                            <Menu.Item key="2">分类浏览 </Menu.Item>
                            <SubMenu key="sub1" title="图片管理">
                                <Menu.Item key="3">上传图片</Menu.Item>
                                <Menu.Item key="4">删除图片</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title="分类管理">
                                <Menu.Item key="6">新增分类</Menu.Item>
                                <Menu.Item key="8">删除分类</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9"><Link to="/system-info">系统讯息</Link></Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Content style={{margin: '0 16px'}}>
                            <Route exact path="/" component={ImageRetrieval}/>
                            <Route exact path="/image-retrieval" component={ImageRetrieval}/>
                            <Route exact path="/retrieval-result" component={RetrievalResult}/>
                            <Route exact path="/system-info" component={SystemInfo}/>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default Home;