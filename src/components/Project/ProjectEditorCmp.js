//import React, {Component, PropTypes} from 'react';
//import { connect } from 'dva';
import { Form, Input, DatePicker, Modal, Select } from 'antd';
//import _ from 'lodash'
//import styles from './Project.css';

const FormItem = Form.Item;
const Option = Select.Option;

function ProjectEditorCmp({ 
    MailList,
    currentItem, 
    form:{getFieldDecorator,validateFields}, 
    editorVisible,
    confirmHandler, 
    cancelHandler
}){
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    const OKClick = (e)=>{
        validateFields((err, values)=>{
            //let copyValues = _.cloneDeep(values);
            //const copyValues = {...values, BeginDate:values.BeginDate.format("YYYY-MM-DD"), EndDate:values.EndDate.format("YYYY-MM-DD")}
            //console.log(copyValues);
            confirmHandler(values);
        });
    }
    //console.log(MailList);
    //const children = [];
    // for (let i = 0; i < MailList.length; i++) {
    //     children.push(<Option key={MailList[i].EmployeeUID}>{MailList[i].EmployeeName}</Option>);
    //   }
    return (
        <Modal visible={editorVisible} onCancel= {cancelHandler} onOk={OKClick}>
            <Form>
                <FormItem label="项目名称" {...formItemLayout}>
                {
                    getFieldDecorator('ProjectName', {
                        //initialValue: customerName,
                        rules: [
                            //{required: true, message: '客户名称不能为空'}
                        ]
                    })(
                        <Input type='text'/>
                    )
                }
                </FormItem>
                <FormItem label="项目内容" {...formItemLayout}>
                {
                    getFieldDecorator('ProjectContext', {
                        //initialValue: customerName,
                        rules: [
                            //{required: true, message: '客户名称不能为空'}
                        ]
                    })(
                        <Input type='text'/>
                    )
                }
                </FormItem>
                <FormItem label="开始时间" format {...formItemLayout}>
                {
                    getFieldDecorator('BeginDate', {
                        //initialValue: customerName,
                        rules: [
                            //{required: true, message: '客户名称不能为空'}
                        ]
                    })(
                        <DatePicker />
                    )
                }
                </FormItem>
                <FormItem label="结束时间" {...formItemLayout}>
                {
                    getFieldDecorator('EndDate', {
                        //initialValue: customerName,
                        rules: [
                            //{required: true, message: '客户名称不能为空'}
                        ]
                    })(
                        <DatePicker />
                    )
                }
                </FormItem>
                <FormItem label="项目人员" {...formItemLayout}>
                {
                    getFieldDecorator('Employees', {
                        //initialValue: customerName,
                        rules: [
                            //{required: true, message: '客户名称不能为空'}
                        ]
                    })(
                        <Select mode="multiple" style={{ width: '100%' }}>
                        { 
                            // children
                            MailList.map((item)=>{
                                return <Option key={item.ID}>{item.EmployeeName}</Option>
                            })
                        }
                        </Select>
                    )
                }
                </FormItem>
                {/* <FormItem>
                    <Button type="primary" onClick={confirmHandler}> Save </Button>
                </FormItem> */}
            </Form>
        </Modal>
    );
}


export default Form.create()(ProjectEditorCmp);