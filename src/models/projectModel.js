import * as projectSvc from '../services/projectService';
import moment from 'moment';
//import {PAGE_SIZE} from '../utils/constants';
//import { stat } from 'fs'; 
const page_size = 2;
//const page_size = PAGE_SIZE;


export default {
  namespace: 'projects',
  state: {
    list: [],

    pagination:{
      currentItem:{},
      total:0,
      page:1,
      queryparams:{},
      page_size:page_size,
      current:1
    }, 
    editorVisible: false,
    editorType: 'create',

    MailList:[]
  },

  reducers: {
    save(state, {payload: {data: list, total, searchParams}}) { 
      const pagination = {...state.pagination,total,current:searchParams.page,queryparams:searchParams};
      return { ...state, list, pagination};
    },

    showEditor(state,action){
      const editorVisible = true;   
      const MailList = action.payload.data;
      return {...state, ...action.payload, editorVisible, MailList};
    }, 
    hideEditor(state, action){ 
      const editorVisible = false;  
      return {...state, ...action.payload, editorVisible};
    }
  },

  effects: { 
    * create({payload:values}, {call,put}){  
        const {success} = yield call(projectSvc.create,values);
        if(success === true){ 
          yield put({type:'hideEditor'});
          const {data} =  yield call(projectSvc.fetch, {page:1});
          yield put({type:'save', payload:{data}}); 
        }
    },
    *search({ payload: searchParams }, { call, put }) {
        const { data,total } = yield call(projectSvc.search, searchParams); 
        yield put({type: 'save', payload: {data,total,searchParams}});
    },

    * initEditor({payload},{call,put}){
        const {data} = yield call(projectSvc.GetMailList)
        yield put({type:'showEditor',payload:{data}});
    }
  },

  subscriptions: {
    setup({
      dispatch,
      history,state
    }) { return history.listen(({pathname}) => { 
        if (pathname === '/projects') {
          dispatch({
            type: 'search',
            payload: {
              page:1,
              page_size,
              status:1,
              beginDate: moment().add(-3,'M').format("YYYY-MM-DD"),
              endDate: moment().format("YYYY-MM-DD"),
            }
          });
        }
      });
    },
  },
}
