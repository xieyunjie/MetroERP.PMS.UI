import React from 'react'
//import { connect } from 'dva';
import { Table, Popconfirm, Form, Input, Button, DatePicker,Pagination, Icon, Divider } from 'antd';
//import {PAGE_SIZE} from '../../utils/constants';
import styles from './Project.css';  
import moment from 'moment';

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
}){ 

    const columns=[
        {
            title: '项目名称',
            dataIndex: 'ProjectName',
            key: 'ProjectName',
            //render: text => <a href="">{text}</a>,
          },
          {
            title: 'ProjectContext',
            dataIndex: 'ProjectContext',
            key: 'ProjectContext',
          },
          {
            title: 'BeginDate',
            dataIndex: 'BeginDate',
            key: 'BeginDate',
          },
          {
            title: '结束时间',
            dataIndex: 'EndDate',
            key: 'EndDate',
          },
          {
            title: '操作',
            key: 'operation',
            render: (text, { id }) => (
              <span className={styles.operation}>
                <a href="">编辑</a>
                <Popconfirm title="是否确认删除?" onConfirm={deleteHandler.bind(null, id)}>
                  <a href="">删除</a>
                </Popconfirm>
              </span>
            ),
          },
    ];
    //const PAGE_SIZE= 50 
    const onSearch = function(e){
      e.preventDefault();
      validateFields((err,values)=>{
        onSearchHandler(values);
      })
      //onSearchHandler
    }
    // const paginationCmp = {
    //     className:"ant-table-pagination",
    //     total:pagination.total, 
    //     defaultCurrent:1,
    //     pageSize:pagination.page_size
    // }
 
    return (
        <div className={styles.normal}>
        {/* <span>{pagination.total}</span><span>{pagination.page_size}</span> */}
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
              <Button type="success" onClick = {showEditor}><Icon type="plus" />Add</Button>
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