import React from 'react'; 
import { Route, Link, HashRouter} from 'dva/router';
import {connect} from 'dva';  
import { Layout, Menu, Breadcrumb, LocaleProvider } from 'antd'; 
import ProjectView from './../Project/ProjectView';
//import ProjectEditView from './../Project/ProjectEditView';
import IndexView from './../Index/IndexView'

import style from './HomeView.css'
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

const { Header, Content, Footer } = Layout;

function HomeView({match, children, home}){
    const  logo =  {
        width: '120px',
        height: '31px',
        background: 'rgba(255,255,255,.2)',
        margin: '16px 24px 16px 0',
        float: 'left'
      }
    const APP = () => (
      <Layout> 
        <Header className={style.header_cls} style={{ position: 'fixed', width: '100%' }}>
          <div className={logo} />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1"><Link to="/">Index</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/index2">index2</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/projects">projects</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px', marginTop: 64 }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
           
          <div style={{ background: '#fff', padding: '10px 5px 50px 5px', height: '100%' }}>
            
              <Route  path="/"  exact component={IndexView} />  
              <Route path="/index" exact component={IndexView} /> 
              <Route path="/projects" exact component={ProjectView} />
              {/* <Route path='/projects/edit/:projectuid' component={ProjectEditView} /> */}
              {/* <Route path="/projects/:projectuid" exact component={ProjectEditView} /> */}
           
          </div> 
        </Content>
        <Footer className={style.footer_cls} style={{ textAlign: 'center' }}>
          Ant Design ©2016 Created by Ant UED
        </Footer>
      </Layout> 
    );
    return ( 
      <LocaleProvider locale={zh_CN}>
      <HashRouter>
        <APP />
        </HashRouter>
      </LocaleProvider>
    )
}

function mapStateToProps(home){
    return home;
}

export default connect(mapStateToProps)(HomeView);