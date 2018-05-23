import React from 'react';
//import {connect} from 'dva';

function IndexCmp({indexValue}){
    return(
        <div>
            <h1>Index Page</h1>
            <h2>{indexValue}</h2>
        </div>
    )
}

export default IndexCmp;