import { Form, Input, DatePicker, Modal, Select } from 'antd';
import _ from 'lodash'; 
import moment from 'moment'; 

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

function ProjectEditorCmp({  
    MailList,
    currentItem, 
    form:{getFieldDecorator,validateFields}, 
    editorVisible,
    confirmHandler, 
    cancelHandler
}){
    //const {}
    const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
    };

    const OKClick = (e)=>{
        validateFields((err, values)=>{ 
            confirmHandler(values);
        });
    } 
 
    const{ProjectName, ProjectContext,BeginDate,EndDate,FinishDate,Comment, ProjectMailList} = currentItem;
    let mailIDs = [];
    _.forEach(ProjectMailList,function(item){
        mailIDs.push(item.MailID.toString());
    })
    // ProjectMailList.map((item)=>{

    // });
    return (
        <Modal visible={editorVisible} onCancel= {cancelHandler} onOk={OKClick} title='编辑项目信息'>
            <Form>
                <FormItem label="项目名称" {...formItemLayout}>
                {
                    getFieldDecorator('ProjectName', {
                        initialValue:ProjectName,
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
                        initialValue:ProjectContext,
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
                        initialValue: moment(BeginDate),
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
                        initialValue: moment(EndDate),
                        rules: [
                            //{required: true, message: '客户名称不能为空'}
                        ]
                    })(
                        <DatePicker />
                    )
                }
                </FormItem>                
                <FormItem label="完成时间" {...formItemLayout}>
                {
                    getFieldDecorator('FinishDate', {
                        initialValue: moment(FinishDate),
                        rules: [
                            //{required: true, message: '客户名称不能为空'}
                        ]
                    })(
                        <DatePicker />
                    )
                }
                </FormItem>
                <FormItem label="备注" {...formItemLayout}>
                {
                    getFieldDecorator('Comment', {
                        initialValue: Comment,
                        rules: [
                            //{required: true, message: '客户名称不能为空'}
                        ]
                    })(
                        <TextArea rows={2} />
                    )
                }
                </FormItem>
                <FormItem label="项目人员" {...formItemLayout}>
                {
                    getFieldDecorator('Employees', {
                        initialValue: mailIDs,
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