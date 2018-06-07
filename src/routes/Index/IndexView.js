import React, {Component} from 'react'
import { connect } from 'dva'
import IndexCmp from '../../components/Index/IndexCmp'

// function IndexView({index}){
//     const indexProps = {
//         indexValue:index.indexValue
//     }
//     return (
//         <IndexCmp {...indexProps}/>
//     )
// } 

class IndexView extends Component{

    // constructor(props){
    //     super(props);
    // }

    // componentWillMount() {
    //     console.log('Component WILL MOUNT!')
    // }
    // getInitialState(){
    //     console.log('Component getInitialState !!')
    //     return this.props;
    // }
    componentDidMount() {
         console.log('Component DID MOUNT!')
    } 
    // componentWillReceiveProps(newProps) {
    //       console.log('Component WILL RECEIVE PROPS!')
    // }
    shouldComponentUpdate(newProps, newState) {
          return true;
    }
    // componentWillUpdate(nextProps, nextState) {
    //       console.log('Component WILL UPDATE!');
    // }
    componentDidUpdate(prevProps, prevState) {
          console.log('Component DID UPDATE!')
    }
    componentWillUnmount() {
           console.log('Component WILL UNMOUNT!')
    }
    
    render(){
        const that = this;
        const onAddIndexValue = function(e){ 
            that.props.dispatch({type:'index/add'})
        };

     const indexProps = {
        indexValue: this.props.index.indexValue,
        onAddIndexValue
        }
        return (
            <IndexCmp {...indexProps}/>
        )
    }
}

function mapStateToProps(state) {   
    const indexModel = state.index;
    console.log(indexModel);
    return {index:indexModel};  
  }
  
export default connect(mapStateToProps)(IndexView);
