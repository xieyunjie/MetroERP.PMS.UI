import { Form, Input, DatePicker, Select, Col, Row, Button } from 'antd';
import _ from 'lodash'; 
import moment from 'moment'; 

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;


function ProjectEditCmp({  
    MailList,
    currentItem, 
    form:{getFieldDecorator,validateFields}
}){
    const formItemLayout = {
        labelCol: { span: 10 },
        wrapperCol: { span: 6 },
    };

    const {ProjectName, ProjectContext, BeginDate, EndDate, FinishDate, Comment, ProjectMailList} = currentItem;
    let mailIDs = [];
    _.forEach(ProjectMailList,function(item){
        mailIDs.push(item.MailID.toString());
    }) 

    return (
        <div>
            <Row>
                <Col offset={9}><h1>编辑项目信息</h1></Col> 
            </Row>
            <Form>
                <FormItem label="项目名称" {...formItemLayout}>
                {
                    getFieldDecorator('ProjectName', {
                        initialValue:ProjectName,
                        rules: [
                            {required: true, message: '项目名称不能为空'}
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
                            {required: true, message: '项目内容不能为空'}
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
                            {required: true, message: '开始时间不能为空'}
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
                            {required: true, message: '结束时间不能为空'}
                        ]
                    })(
                        <DatePicker />
                    )
                }
                </FormItem>                
                <FormItem label="完成时间" {...formItemLayout}>
                {
                    getFieldDecorator('FinishDate', {
                        initialValue: FinishDate === null?null:moment(FinishDate),
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
                            {required: true, message: '项目人员不能为空'}
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
                
                 <FormItem>
                     <Col offset={9}>
                        <Button type="primary" >保存</Button>
                        <Button type="primary" >取消</Button>
                        <Button type="primary" >返回</Button>
                    </Col>
                </FormItem> 
            </Form>
        </div>
    )
}


export default Form.create()(ProjectEditCmp);