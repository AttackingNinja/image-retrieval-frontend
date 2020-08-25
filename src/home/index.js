import React from 'react';
import {Layout, Menu} from 'antd';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import ImageRetrieval from "../image-retrieval";
import CategoryView from "../category-view";
import "./index.css"

const {Content, Sider} = Layout;
const {SubMenu} = Menu;

class Home extends React.Component {
    render() {
        return (
            <Router>
                <Layout style={{minHeight: '100vh'}}>
                    <Sider collapsible={false}>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <div className="logo"></div>
                        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                            <Menu.Item key="1"><Link to="/image-retrieval">图片检索</Link></Menu.Item>
                            <Menu.Item key="2"><Link to="/category-view">分类浏览</Link></Menu.Item>
                            <SubMenu key="sub1" title="图片管理">
                                <Menu.Item key="3">上传图片</Menu.Item>
                                <Menu.Item key="4">删除图片</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title="分类管理">
                                <Menu.Item key="6">新增分类</Menu.Item>
                                <Menu.Item key="8">删除分类</Menu.Item>
                            </SubMenu>
                            <Menu.Item key="9"><Link to="/system-info">系统管理</Link></Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Content style={{margin: '0 16px', overflow: 'hidden'}}>
                            <Route exact path="/" component={ImageRetrieval}/>
                            <Route exact path="/image-retrieval" component={ImageRetrieval}/>
                            <Route exact path="/category-view" component={CategoryView}/>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default Home;