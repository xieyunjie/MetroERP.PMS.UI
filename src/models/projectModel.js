import * as projectSvc from '../services/projectService';
import moment from 'moment';
import qs from 'querystring';
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
      
      console.log("save");
      return { ...state, list, pagination};
    },

    showEditor(state, action){
      const editorVisible = true;   
      const MailList = action.payload.MailList,
            currentItem = action.payload.currentItem; 
            
      return {...state, ...action.payload, editorVisible, MailList, currentItem};
    }, 
    hideEditor(state, action){ 
      const editorVisible = false;  

      console.log("hideEditor");
      
      return {...state, ...action.payload, editorVisible};
    },
    setCurrentItem(state, action){
      return {...state, currentItem: action.payload};
    }
  },

  effects: { 
    * create({payload:obj}, {call,put}){  
        const {success} = yield call(projectSvc.create,obj.values);
        if(success === true){ 
          yield put({type:'hideEditor'});  
          yield put({type:'search', payload:obj.searchParams}); 
        }
    },
    * update({payload:obj}, {call,put}){  
        const {success} = yield call(projectSvc.update,obj.values);
        //const  success = true;
        if(success === true){ yield put({type:'hideEditor'}); 
          yield put({type:'search', payload:obj.searchParams});          
        }
    },

    *search({ payload: searchParams }, { call, put }) {
        const { data,total } = yield call(projectSvc.search, searchParams); 
        yield put({type: 'save', payload: {data,total,searchParams}});
    },

    * initEditor({ payload },{ call, put }){
    
        const {data} = yield call(projectSvc.GetMailList)
        yield put({ type:'showEditor', payload:{ MailList:data, currentItem: payload.currentItem}});
    },
    * getCurrentItem({payload:id},{call,put}){   
      
        let currentItem = {}; 
        if(id === '00000000-0000-0000-0000-000000000000'){
          
          currentItem = {
            UID:'00000000-0000-0000-0000-000000000000',
            ProjectName:'',
            ProjectContext:'',
            BeginDate: moment().format('YYYY-MM-DD'),
            EndDate: moment().format('YYYY-MM-DD'), 
            Status: 1,
            FinishDate: null,
            Comment:'',
            CreatorUID:'00000000-0000-0000-0000-000000000000',
            CreateTime:'',
            CreatorName:''
          } 
        } 
        else {
         const q = yield call(projectSvc.getOneProject, id);  
         currentItem = q.data;
        }
        
        const {data} = yield call(projectSvc.GetMailList)
        // console.log('====================================');
        // console.log(currentItem); 
        // console.log('====================================');

        yield put({ type:'showEditor', payload:{ MailList:data, currentItem: currentItem}});
        //yield put ({type: 'setCurrentItem', payload: {data}});
    }
  },

  subscriptions: {
    setup(obj) { 
      const history = obj.history,
            dispatch = obj.dispatch;
       //console.log(obj);
       
      return history.listen((location) => {
        //console.log(location);
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
        }
        else if(pathname === "/projects/edit"){ 

          const p = qs.parse( location.search.substring(1, location.search.length));
          dispatch({
            type: 'getCurrentItem',
            payload:p.uid 
          });
        }
        // 这里无法获取得到url参数
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
