import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Menu, Icon } from 'antd';
import { Avatar } from 'antd';
import { Layout, Breadcrumb } from 'antd';
import {AntTreeNodeProps as e} from "antd/lib/tree/Tree";


//主页面布局
const { SubMenu } = Menu;
const { Header, Content, Footer } = Layout;
class Mainmenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {current: 'null'};///current暂为NULL
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key
        });
        ///current没有用？
        if (e.key === 'submit'){
            window.location.replace("https://ant.design/components/menu-cn/");
        }
        else if (e.key === 'search'){
            window.location.href='https://www.baidu.com';
        }
    };


    render() {
        return (
            <Layout className="layout">
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} theme="dark" mode="horizontal" style={{ lineHeight: '64px'}}>
                        <Menu.Item key="submit">
                            <Icon type="desktop" />
                            提交一次维修
                        </Menu.Item>

                        <SubMenu
                            title={
                                <span className="submenu-title-wrapper">
              <Icon type="appstore" />
              我的
            </span>
                            }
                        >
                            <Menu.ItemGroup title="维修">
                                <Menu.Item key="search">查询我的维修</Menu.Item>
                            </Menu.ItemGroup>
                            <Menu.ItemGroup title="用户">
                                <Menu.Item key="userinfo">我的用户信息</Menu.Item>
                                <Menu.Item key="loginout">注销</Menu.Item>
                            </Menu.ItemGroup>
                        </SubMenu>

                        <Menu.Item key="infopage">
                            <a href="https://www.baidu.com" target="_blank" rel="noopener noreferrer">
                                关于先锋维修
                            </a>
                        </Menu.Item>

                        <Menu.Item key="app">
                            <Icon type="setting" />
                            作为管理员登录
                        </Menu.Item>
                        <Avatar size="small" icon="user" />
                        <h> 您好，
                            <a href="https://www.baidu.com" target="_blank" rel="noopener noreferrer">
                                请登录</a>
                        </h>
                    </Menu>
                </Header>

                <Content style={{ padding: '0 50px' }}>
                    <div id="announcement"
                         style={{ background: '#fff', padding: 24, minHeight: 880 ,marginTop: 50}}>公告区域</div>
                </Content>

                <Footer style={{ textAlign: 'center' }}>技术支持:先锋网络中心</Footer>
            </Layout>
        );
    }
}

export default Mainmenu;