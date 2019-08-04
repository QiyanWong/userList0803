const initState = {
  curPage: 1,
  //order: null
};

const status = (state = initState, action) => {
  switch(action.type) {
    case 'SET_STATUS_CUR_PAGE': 
      return {
        ...state,
        curPage: action.curPage
      };
    // case 'SET_STATUS_ORDER':
    //   return {
    //     ...state,
    //     order: action.order
    //   };
    default:
      return state;
  }
};

export default status;