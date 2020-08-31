import React from 'react';
import {Layout, Menu} from 'antd';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import ImageRetrieval from "../image-retrieval";
import CategoryView from "../category-view";
import "./index.css"
import ImageManageUpload from "../image-manage/upload";
import ImageManageDelete from "../image-manage/delete";
import ImageManageRecover from "../image-manage/recover";
import CategoryManage from "../category-manage";

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
                                <Menu.Item key="3"><Link to="/image-manage/upload">上传图片</Link></Menu.Item>
                                <Menu.Item key="4"><Link to="/image-manage/delete">删除图片</Link></Menu.Item>
                                <Menu.Item key="5"><Link to="/image-manage/recover">恢复图片</Link></Menu.Item>
                            </SubMenu>
                            <Menu.Item key="6"><Link to="/category-manage">分类管理</Link></Menu.Item>
                            <SubMenu key="sub3" title="系统管理">
                                <Menu.Item key="7">权限管理</Menu.Item>
                                <Menu.Item key="8">容器文件管理</Menu.Item>
                                <Menu.Item key="9">模型管理</Menu.Item>
                                <Menu.Item key="10">系统信息</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout className="site-layout">
                        <Content style={{margin: '0 16px', overflow: 'hidden'}}>
                            <Route exact path="/" component={ImageRetrieval}/>
                            <Route exact path="/image-retrieval" component={ImageRetrieval}/>
                            <Route exact path="/category-view" component={CategoryView}/>
                            <Route exact path="/image-manage/upload" component={ImageManageUpload}/>
                            <Route exact path="/image-manage/delete" component={ImageManageDelete}/>
                            <Route exact path="/image-manage/recover" component={ImageManageRecover}/>
                            <Route exact path="/category-manage" component={CategoryManage}/>
                        </Content>
                    </Layout>
                </Layout>
            </Router>
        );
    }
}

export default Home;