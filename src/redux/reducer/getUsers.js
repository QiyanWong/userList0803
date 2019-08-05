const initState = {
  isLoading: false,
  users:[],
  err: null,
  isSearching: false,
  searchUsers: [],
  //page: [],
  curPage: 1,
  count: 0,
  pageSize: 5,
  startIndex: 0,
  pageOfUsers: [],
  pageNumber: [],
};

const getUsers = (state = initState, action) => {
  switch(action.type) {
    // Get UserList 
    case 'GET_USERS_START':
      return {
        ...state,
        isLoading: true,
        err: null
      };
    case 'GET_USERS_FAIL':
      return {
        ...state,
        isLoading: false,
        err: action.error
      };
    case 'GET_USERS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        err: null,
        users: action.data
      };
    
    // Delete User
    case 'DELETE_USER_START':
      return {
        ...state,
        isLoading: true
      };
    case 'DELETE_USER_ERROR':
      return {
        ...state,
        isLoading: false,
        err: action.error
      };
    case 'DELETE_USER_SUCCESS':
      let index = state.pageOfUsers.findIndex((item) => item._id === action.id);
      let newCurPage = state.curPage;
      if(state.pageOfUsers.length === 1) {
        newCurPage -= 1;
      }
      return {
        ...state,
        curPage: newCurPage,
        pageOfUsers: [
          ...state.pageOfUsers.slice(0, index),
          ...state.pageOfUsers.slice(index + 1)
        ],
      //  users: state.users.filter(user => user._id !== action.id),
        isLoading:false,
        count: state.count - 1,
        err: null,
      };
    
    // Create New User 
    case 'CREATE_USER_START':
      return {
        ...state,
        isLoading: true
      };
    case 'CREATE_USER_FAIL':
      return {
        ...state,
        isLoading: false,
        err: action.error
      };
    case 'CREATE_USER_SUCCESS':
      // const newUsers = state.users;
      // newUsers.push(action.user);
      const totalPages = Math.ceil(state.count / state.pageSize);
      let newPage = totalPages;
      if(state.pageOfUsers.length === state.pageSize) {
        newPage += 1;
      }
        return {
          ...state,
          isLoading: false,
          pageOfUsers:[
            ...state.pageOfUsers,
            action.user,
          ],
          curPage : newPage,
        };
    
    // Edit User 
    case 'EDIT_USER_START':
      return {
        ...state,
        isLoading: true
      };
    case 'EDIT_USER_ERROR':
      return {
        ...state,
        isLoading: false,
        err: action.error
      };
    case 'EDIT_USER_SUCCESS':
      let newUser = state.pageOfUsers.map(user => {
        if (user._id === action.id) {
          return action.user;
        } else {
          return user;
        }
      });
      return {
        ...state,
        isLoading: false,
        // err: null,
        pageOfUsers: newUser
      };
    
    // Sort Users
    case 'SORT_USERS': {
      const sortedUsers = [...state.pageOfUsers]; 
      const key = action.key;
      sortedUsers.sort((user1, user2) => {
        if (typeof(user1[key]) === 'number') {
          if (user1[key] === user2[key]) {
            return 0;
          }
          return user1[key] < user2[key] ? -1 : 1;
        }
        return user1[key].toLowerCase().localeCompare(user2[key].toLowerCase());
      });
      //做完search之后需要加的
      // const newSearch = [...state.searchUsers]; 
      // sortedUsers.sort((user1, user2) => {
      //   if (user1[key] === user2[key]) {
      //     return 0;
      //   }
      //   return user1[key] < user2[key] ? -1 : 1;
      // });
      return {
        ...state,
        pageOfUsers: sortedUsers,
        //searchUsers : newSearch
      };
    }

    // Search User
    case 'SEARCH_START' : {
      return {
        ...state,
        isLoading: true,
      }
    }
    case 'SEARCH_SUCCESS' : {
      return {
          ...state,
          searchUsers : action.users,
          isSearching : true,
          isLoading: false,
      }
    }
    case 'SEARCH_FAIL' : {
      return {
        ...state,
        isLoading: false,
        isSearching: false,
        err: action.error
      }
    }
    case 'BACK_TO_HOME' : {
      return{
        ...state,
        searchUsers : [],
        isSearching : false,
      }
    }
    
    // Fetch Page
    case 'FETCH_PAGE_START':
      return {
        ...state,
        isLoading: true
      };
    case 'FETCH_PAGE_SUCCESS': {
      const size = state.pageSize;
      // const curPage = action.page;
      const startIndex = (action.page - 1) * size;
      // console.log('reduce testing size', size);
      // console.log('reduce testing curPage', curPage);
      // console.log('reduce testing startIndex', startIndex);
      // console.log('reduce testing action.pagesize', action.pageSize);
      //getCount();
      // const count = state.count;
      // console.log('!!!!!getCount',getCount());
      // const pageNumber = [];
    
      // const totalPages = Math.ceil(count / size);
      // let startPage = 1, endPage = totalPages;
      // console.log('reducers count is', count);
      // for (let i = startPage; i <= endPage; i++) {
      //   pageNumber.push(i);
      //   console.log('reducers already pushed', pageNumber);
      
      return {
        ...state,
        pageOfUsers: action.pageOfUsers,
        isLoading: false,
        err: null,
        curPage: action.page,
        startIndex,
        pageSize: action.pageSize,
      };
    }
    case 'FETCH_PAGE_FAIL':
      return {
        ...state,
        isLoading: false,
        err: action.error
      };
    
    // Count Page
    case 'GET_COUNT_START':
        return {
          ...state,
          isLoading: true
        };
    case 'GET_COUNT_SUCCESS':
      return {
        ...state,
        count: action.count,
        isLoading: false,
        err: null
      };
    case 'GET_COUNT_FAIL':
      return {
        ...state,
        isLoading: false,
        err: action.error
      }

    default:
      return state;
  }
}

export default getUsers;


  // case 'GET_USER_START':
    //   return {
    //     ...state,
    //     isLoading: true
    //   };
    // case 'GET_USER_ERROR':
    //   return {
    //     ...state,
    //     isLoading: false,
    //     err: action.error
    //   };
    // case 'GET_USER_SUCCESS':
    //   return {
    //     ...state,
    //     users: state.users.filter(user => user._id === action.id),
    //     isLoading:false,
    //     err: null,
    //   };