import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'dva'
import ProjectCmp from '../../components/Project/ProjectCmp'
import ProjectEditorCmp from '../../components/Project/ProjectEditorCmp'
import {EMPTY_UID} from './../../utils/constants'
//import { Route} from 'dva/router';
//import ProjectEditView from './ProjectEditView'
//import _ from 'lodash' ;
import moment from 'moment';

function ProjectView({dispatch, projects, index, match }){
    //console.log(this.stats);
    //console.log(match);
    const { list, currentItem, editorVisible, MailList, pagination,loading} = projects;

    const showEditor = (currentItem)=>{
        if(currentItem === null){
            currentItem = {
                UID: EMPTY_UID,
                ProjectName:'',
                ProjectContext:'',
                BeginDate: moment().format("YYYY-MM-DD"),
                EndDate:moment().format("YYYY-MM-DD"),
                FinishDate:null,
                Comment:'',
                ProjectMailList:[],
                Status:1
            }
        } 
        dispatch({type:'projects/initEditor',payload:{currentItem}});
    };
    const hideEditor = ()=>{
        dispatch({type:'projects/hideEditor'});
    }; 
    const onSearchHandler = (values) =>{ 

        let searchParams = {
            name:values.name,
            status:1,
            beginDate:values.searchdate[0].format("YYYY-MM-DD"),
            endDate:values.searchdate[1].format("YYYY-MM-DD"),
            page:1,
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
        onAddIndexValue:function(){
            dispatch({type:'index/add'})
        },
        editURL:`${match.url}/edit/:projectuid`
    }

    const confirmHandler =(projectValue,employeeMailList) => { 
        //let  copyValues = {};
        // if(editorType === 'create'){
        //     // copyValues = {
        //     //     ...projectValue, 
    
        //     //     BeginDate:projectValue.BeginDate.format("YYYY-MM-DD"), 
        //     //     EndDate:projectValue.EndDate.format("YYYY-MM-DD")
        //     // };
        // }
        
        // let employeeMailList = [];
        // _.forEach(projectValue.Employees,function(emp, key){
        //     const id = parseInt(emp,0);
        //     let q = _.find(MailList,{ID: id});
        //     if(q){
        //         employeeMailList.push({
        //             ID:0,
        //             MailID:q.ID,
        //             EmployeeUID:q.EmployeeUID,
        //             EmployeeName:q.EmployeeName,
        //             MailAddress:q.MailAddress,
        //             IsMainEmp:key===0?true:false
        //         })
        //     }
        // })  

        const values = {
            projectJson:JSON.stringify(projectValue) ,
            json:JSON.stringify(employeeMailList)
        } 
        if(projectValue.UID === EMPTY_UID){
            dispatch({type:'projects/create',payload:{values,searchParams:pagination.queryparams}});    
        }
        else{
            dispatch({type:'projects/update',payload:{values,searchParams:pagination.queryparams}});
        }
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

ProjectView.propTypes = {
    projects: PropTypes.object,
};

function mapStateToProps(state) { 
    const projects = state.projects;
    projects.loading = state.loading.models.projects;

    const index = state.index;

    return {projects,index};  
  }
  
export default connect(mapStateToProps)(ProjectView);
