import React from 'react'
//import { connect } from 'dva';
//import {Link} from 'dva/router'
import { Table, Popconfirm, Form, Input, Button, DatePicker,Pagination, Icon, Divider } from 'antd';
//import {EMPTY_UID} from '../../utils/constants';
import styles from './Project.css';  
import moment from 'moment'; 
import { createHashHistory } from 'history'

const FormItem = Form.Item;
const { RangePicker } = DatePicker;

function ProjectCmp({ 
    list: dataSource, 
    pagination,
    deleteHandler, 
    showEditor, 
    form:{getFieldDecorator,validateFields,getFieldsValue},
    onSearchHandler,
    onPageChange,
    loading,
    onAddIndexValue,
    editURL,
}){ 
    const onSearch = function(e){
      e.preventDefault();
      validateFields((err,values)=>{
        onSearchHandler(values);
      }) 
    } 
    // const addProject = function(e){
    //       showEditor(null)
    // } 
    // const editPoject = function(e){
    //   console.log("dddd");
    // }
    const pushProjectEditView = function(uid){ 
      // console.log(uid);
      const history = createHashHistory()  
      history.push({pathname:'/projects/edit?uid=' + uid});
    }
    const columns=[
        {
            title: '项目名称',
            dataIndex: 'ProjectName',
            //key: 'ProjectName',
            //render: text => <a href="">{text}</a>,
          },
          {
            title: 'ProjectContext',
            dataIndex: 'ProjectContext',
            //key: 'ProjectContext',
          },
          {
            title: 'BeginDate',
            dataIndex: 'BeginDate',
            width:120,
            render:(text)=>{ 
              return  moment(text).format("YYYY-MM-DD")
            }
            //key: 'BeginDate',
          },
          {
            title: '结束时间',
            dataIndex: 'EndDate',
            width:120,
            render:(text)=>{ 
              return  moment(text).format("YYYY-MM-DD")
            }
            //key: 'EndDate',
          },
          {
            title: '项目人员',  
            dataIndex: 'UID', 
            render:(text, {ProjectMailList}, index)=>{
              let res = [];
              res.push(ProjectMailList.map((item)=>{ 
                return <span key={item.ID}>{item.EmployeeName}<Divider type="vertical" /></span>
              }))  
              //console.log(res);
              return (res)
            }

          },
          {
            title: '操作',
            dataIndex: 'operation',
            width:300,
           // key: 'operation',
            render: (text, projectObj, index) => {
              //const url =`/projects/edit/${UID}`;
              return (
                <span className={styles.operation}> 
                 <Button type="primary" ghost onClick={showEditor.bind(null,projectObj)}>编辑</Button>
                 <Button type="primary" ghost onClick={pushProjectEditView.bind(null,projectObj.UID)}>编辑 View</Button>
                  {/* <Link to={url}>编辑</Link> */}
                  <Popconfirm title="是否确认删除?" onConfirm={deleteHandler.bind(null, projectObj.UID)}>
                    <a href="">删除</a>
                  </Popconfirm>
                </span>
              )
            },
          },
    ];
    //const PAGE_SIZE= 50 

 
    return (
        <div className={styles.normal}>  
          <Form layout="inline">
            <FormItem label="名称">
              {
                getFieldDecorator("name",{initialValue: pagination.queryparams.name, rules:[]})(<Input />)
              } 
            </FormItem>
            <FormItem label="创建时间">
              {
                getFieldDecorator("searchdate",{
                  initialValue:[moment(pagination.queryparams.beginDate),moment(pagination.queryparams.endDate)],
                  rules:[]
                })(<RangePicker  />)
              }  
            </FormItem>
            <FormItem>
              <Button type="primary" onClick = {onSearch}><Icon type="search" />查找</Button>
              <Divider type="vertical" />
              <Button type="success" onClick = {showEditor.bind(null,null)}><Icon type="plus" />Add</Button>
              <Divider type="vertical" />
              <Button type="success" onClick = {pushProjectEditView.bind(null,"00000000-0000-0000-0000-000000000000")}><Icon type="plus" />Add View</Button>
              <Divider type="vertical" />
              <Button type="success" onClick = {onAddIndexValue}><Icon type="plus" />onAddIndexValue</Button>
            </FormItem> 
          </Form>
        <div>
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey={record => record.UID}
            loading={loading}
            pagination={false}
          />
          <Pagination className="ant-table-pagination"  total={pagination.total} 
            current={pagination.current} defaultCurrent={1} pageSize={pagination.page_size}
            onChange={onPageChange} /> 
        </div>
      </div>
    )
}

//export default ProjectCmp;
export default Form.create()(ProjectCmp);

// function mapStateToProps(state) {
//     const { list, total, page } = state.projects;
//     return {
//       list,
//       total,
//       page,
//     };
//   }
  
//   export default connect(mapStateToProps)(Projects);