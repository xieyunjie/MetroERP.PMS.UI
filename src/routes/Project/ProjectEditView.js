import React from 'react'
//import PropTypes from 'prop-types';
import {connect} from 'dva'
//import _ from 'lodash' 

function ProjectEditView({dispatch, projects, match}) { 
  
  //dispatch({type:'projects/getCurrentItem', payload:match.params.projectuid});
  const {currentItem} = projects;
  console.log('aaaa');
  


    return ( 
      <div>
        <h1> EditView {currentItem.UID}</h1> 
        <h2>{match.params.projectuid}</h2>
      </div >
    ) 
}
function mapStateToProps(state) { 
  const projects = state.projects;
  projects.loading = state.loading.models.projects;
 
  return {projects};  
}
export default connect(mapStateToProps)(ProjectEditView);
