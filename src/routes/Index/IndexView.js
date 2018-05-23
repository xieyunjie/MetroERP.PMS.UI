import React from 'react'
import { connect } from 'dva'
import IndexCmp from '../../components/Index/IndexCmp'

function IndexView({index}){
    const indexProps = {
        indexValue:index.indexValue
    }
    return (
        <IndexCmp {...indexProps}/>
    )
} 

function mapStateToProps(state) {   
    const indexModel = state.index;
    console.log(indexModel);
    return {index:indexModel};  
  }
  
export default connect(mapStateToProps)(IndexView);
