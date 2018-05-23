import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'dva'
import ProjectCmp from '../../components/Project/ProjectCmp'
import ProjectEditorCmp from '../../components/Project/ProjectEditorCmp'
import _ from 'lodash'
//import {PAGE_SIZE} from '../../utils/constants';
//import Item from 'antd/lib/list/Item';

function ProjectView({dispatch, projects}){
    //console.log(projects);
  
    const { list, currentItem, editorVisible, editorType, MailList, pagination,loading} = projects;
    const showEditor = ()=>{
        dispatch({type:'projects/initEditor'});
    };
    const hideEditor = ()=>{
        dispatch({type:'projects/hideEditor'});
    }; 
    const onSearchHandler = (values) =>{
        //console.log(values);

        let searchParams = {
            name:values.name,
            status:1,
            beginDate:values.searchdate[0].format("YYYY-MM-DD"),
            endDate:values.searchdate[1].format("YYYY-MM-DD"),
            page:0,
            page_size:2
        }
        dispatch({type:'projects/search', payload:searchParams});
    }
    const projectProps = {
        list,
        pagination, 
        deleteHandler:function(id){
            console.warn(`delete ${id}`);
        },
        showEditor,
        onSearchHandler,
        onPageChange:function(page, pageSize){
            var pm = pagination.queryparams;
            pm.page= page;
            pm.page_size = pageSize;
            dispatch({type:'projects/search', payload:pagination.queryparams});
        },
        loading,
    }

    const confirmHandler =(projectValue) => { 
        let  copyValues = {};
        if(editorType === 'create'){
            copyValues = {
                ...projectValue, 
    
                BeginDate:projectValue.BeginDate.format("YYYY-MM-DD"), 
                EndDate:projectValue.EndDate.format("YYYY-MM-DD")
            };
        }
        
        let employeeMailList = [];
        _.forEach(copyValues.Employees,function(emp, key){
            const id = parseInt(emp,0);
            let q = _.find(MailList,{ID: id});
            if(q){
                employeeMailList.push({
                    ID:0,
                    MailID:q.ID,
                    EmployeeUID:q.EmployeeUID,
                    EmployeeName:q.EmployeeName,
                    MailAddress:q.MailAddress,
                    IsMainEmp:key===0?true:false
                })
            }
        })  

        const values = {
            projectJson:JSON.stringify(copyValues) ,
            json:JSON.stringify(employeeMailList)
        }
        dispatch({type:'projects/create',payload:values});
    }
    const editorProps = {
        currentItem,
        editorVisible,
        confirmHandler,
        cancelHandler:hideEditor,
        MailList
    }


    return (
        <div> 
            <ProjectCmp {...projectProps}></ProjectCmp> 
            <ProjectEditorCmp {...editorProps} ></ProjectEditorCmp>
        </div>
    )
}

// class Projects extends Component{
//     constructor(props) {
//         super(props)
//     }

// 	// componentWillMount(){
// 	// 	// let {isLogin} = this.props.systemUser;
// 	// 	// return !isLogin && redirect();
// 	// }

//     render() {
// 		 return genProject(this.props);
//     }
// }


ProjectView.propTypes = {
    projects: PropTypes.object,
};

function mapStateToProps(state) {
    //console.log(state);
    const projects = state.projects;
    projects.loading = state.loading.models.projects;
    return {projects};  
  }
  
export default connect(mapStateToProps)(ProjectView);
