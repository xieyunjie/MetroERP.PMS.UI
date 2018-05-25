import * as projectSvc from '../services/projectService';
import moment from 'moment';
//import {PAGE_SIZE} from '../utils/constants';
//import { stat } from 'fs'; 
const page_size = 2;
//const editUrlRegex = /^\/projects\/[0-9]*$/;
//const page_size = PAGE_SIZE;


export default {
  namespace: 'projects',
  state: {
    list: [], 

    currentItem:{},
    pagination:{
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
      const MailList = action.payload.MailList,
            currentItem = action.payload.currentItem;
      return {...state, ...action.payload, editorVisible, MailList, currentItem};
    }, 
    hideEditor(state, action){ 
      const editorVisible = false;  
      return {...state, ...action.payload, editorVisible};
    },
    setCurrentItem(state, action){
      return {...state, currentItem:action.payload};
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
        yield put({type:'showEditor',payload:{MailList:data, currentItem:payload.currentItem}});
    },
    * getCurrentItem({payload:id},{call,put}){ 
        let data = {};
        if(id===0){
          data = yield call(projectSvc.getOneProject,id).data;  
        } 
        yield put ({type: 'setCurrentItem', payload: {data}});
    }
  },

  subscriptions: {
    setup(obj) { 
      const history = obj.history,
            dispatch = obj.dispatch;
       console.log(obj);
       
      return history.listen((location) => {
        const pathname = location.pathname;
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
        }// 这里无法获取得到url参数
        // else if(editUrlRegex.test(pathname)){
        //   dispatch({
        //     type: 'getcurrentitem',
        //     payload: {
        //       id:0
        //     }
        //   });
        // }
      });
    },
  },
}
