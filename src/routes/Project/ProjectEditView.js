import React, {Component} from 'react'
//import PropTypes from 'prop-types';
import {connect} from 'dva' 
import ProjectEditCmp from '../../components/Project/ProjectEditCmp'
//import _ from 'lodash' 

// function ProjectEditView({dispatch, projects, match}) { 
  
//   //dispatch({type:'projects/getCurrentItem', payload:match.params.projectuid});
//   const {currentItem, MailList} = projects; 
//   const editorProps = {
//     currentItem,
//     MailList
//   } 
//     return ( 
//       <div> 
//         <ProjectEditCmp {...editorProps}></ProjectEditCmp>
//       </div >
//     ) 
// }

class ProjectEditView extends Component{
    componentDidMount() {  
      //this.props.dispatch({type:'projects/getCurrentItem', payload:this.props.match.params.projectuid});
      //console.log(this.props.match.params);
  }
  render(){

   const {currentItem, MailList} = this.props.projects; 
    const editorProps = {
      currentItem,
      MailList
    };

    return ( 
      <div> 
        <ProjectEditCmp {...editorProps}></ProjectEditCmp>
      </div >
    ) 
   }
}
function mapStateToProps(state) { 
  const projects = state.projects;
  projects.loading = state.loading.models.projects;
 
  return {projects};  
}
export default connect(mapStateToProps)(ProjectEditView);
