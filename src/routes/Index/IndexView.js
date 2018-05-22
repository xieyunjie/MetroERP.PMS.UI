import React from 'react'
import { connect } from 'dva'
import IndexCmp from '../../components/Index/IndexCmp'

function IndexView(){

    return (
        <IndexCmp/>
    )
}

IndexView.propTypes = {};

export default connect()(IndexView);