
export default {

    namespace: 'index',
  
    state: {
        indexValue:10
    },
  
    subscriptions: {
      setup({ dispatch, history }) {  // eslint-disable-line
      },
    },
  
    effects: {
    //   *fetch({ payload }, { call, put }) {  // eslint-disable-line
    //     yield put({ type: 'save' });
    //   },
    },
  
    reducers: {
        add(state, action){
            state.indexValue++;
            //console.log(state.indexValue);
            return {...state};
        }
    //   save(state, action) {
    //     return { ...state, ...action.payload };
    //   },
    },
  
  };
  