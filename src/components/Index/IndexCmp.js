import React from 'react';
import { Button, Icon } from 'antd';
//import {connect} from 'dva';

function IndexCmp({onAddIndexValue, indexValue}){


    return(
        <div>
            <h1>Index Page</h1>
            <h2>{indexValue}</h2>
              <Button type="success" onClick = {onAddIndexValue}><Icon type="plus" />onAddIndexValue</Button>
        </div>
    )
}

export default IndexCmp;