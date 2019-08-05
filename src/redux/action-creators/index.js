import axios from 'axios';
// Create User
const createUserStart = () => {
  return {
    type: 'CREATE_USER_START'
  };  
};
const createUserFail = (error) => {
  return {
    type:'CREATE_USER_FAIL',
    error
  };
};

const createUserSuccess = (user) => {
  return {
    type:'CREATE_USER_SUCCESS',
    user
  }
};

 
export const createUser = (user) => {
  return (dispatch) => {
    dispatch(createUserStart());
    axios({
      method: 'POST',
      url: 'http://localhost:8080/api/users',
      data: user
    })
      .then(response => {
        console.log(response.data);
        dispatch(createUserSuccess(response.data.newUser));
      })
      .catch(error => {
        dispatch(createUserFail(error));
      });
  };
};

// Edit User
const editUserStart = () => {
  return {
    type: 'EDIT_USER_START'
  };
};

const editUserFail = (error) => {
  return {
    type: 'EDIT_USER_ERROR',
    error
  };
};

const editUserSuccess = (id, user) => {
  return {
    type: 'EDIT_USER_SUCCESS',
    id,
    user
  };
};

export const editUser = (id, user) => {
  return (dispatch) => {
    dispatch(editUserStart());
    axios
      .put(`http://localhost:8080/api/users/${id}`, user)
      .then(response => {
        dispatch(editUserSuccess(id, user));
        // console.log('this is in the edit user');
        // console.log('test: edit user success!!!');
        // console.log('test edit user id is', id);
        // console.log('test edit user is', user);
        //dispatch(getUsers());
        //console.log(getUsers());
      })
      .catch(error => {
        dispatch(editUserFail(error));
      });
   };
};

// Delete User
const deleteUserStart = () => {
  return {
    type: 'DELETE_USER_START'
  };
};

const deleteUserFail = (error) => {
  return {
    type: 'DELETE_USER_ERROR',
    error
  };
};

const deleteUserSuccess = (id) => {
  return {
    type: 'DELETE_USER_SUCCESS',
    id
  };
};

export const deleteUser = (id, deleteUser) => {
  return (dispatch) => {
    dispatch(deleteUserStart());
    axios
      .delete(`http://localhost:8080/api/users/${id}`, deleteUser)
      .then(response => {
        dispatch(deleteUserSuccess(id));
        dispatch(fetchPage(this.props.curPage, 5));
        console.log('delete user success');
      })
      .catch(error => {
        dispatch(deleteUserFail(error));
      });
  };
};

// // Get User
// const getUserStart = () => {
//   return {
//     type: 'GET_USER_START'
//   };
// };

// const getUserFail = (error) => {
//   return {
//     type: 'GET_USER_ERROR',
//     error
//   };
// };

// const getUserSuccess = (id) => {
//   return {
//     type: 'GET_USER_SUCCESS',
//     id
//   };
// }

// export const getUser = (id, getUser) => {
//   return (dispatch) => {
//     dispatch(getUserStart());
//     axios
//       .get(`http://localhost:8080/api/users/${id}`, getUser)
//       .then(response => {
//         dispatch(getUserSuccess(id));
//         console.log('get user success');
//       })
//       .catch(error => {
//         dispatch(getUserFail(error));
//       });
//   };
// };


const getUsersStart = () => {
  return {
    type: 'GET_USERS_START'
  };
};

const getUsersFail = (error) => {
  return {
    type: 'GET_USERS_ERROR',
    error
  };
};

const getUsersSuccess = (response) => {
  return {
    type: 'GET_USERS_SUCCESS',
    data: response
  };
};

export const getUsers = () => {
  return (dispatch) => {
    dispatch(getUsersStart());
    axios
      .get('http://localhost:8080/api/', getUsers)
      .then(response => {
        dispatch(getUsersSuccess(response.data.users));
      })
      .catch(error => {
        dispatch(getUsersFail(error));
      });
  };
};

// Redirect
export const redirect = () => {
  return {
    type: 'REDIRECT'
  };
};

export const resetRedirect = () => {
  return {
    type: 'RESET_REDIRECT'
  };
};


// Sort
export const sortUsers = key => {
  return {
    type: 'SORT_USERS',
    key
  };
};


// Search
const searchStart = () => {
  return {
    type: 'SEARCH_START'
  };
};

const searchSuccess = (users) => {
  return {
    type: 'SEARCH_SUCCESS',
    users,
  };
};

const searchFail = error => {
  return {
    type: 'SEARCH_FAIL',
    error
  };
};

export const backToHome = () => {
  return {
    type: 'BACK_TO_HOME'
  }
}
export const search = (keyword) => {
  return (dispatch) => {
    dispatch(searchStart());
    axios
      .get(`http://localhost:8080/api/search/${keyword}`)
      .then(response => {
        console.log(`keyword is ${keyword}`);
        dispatch(searchSuccess(response.data));
        //dispatch(getUsers());
      })
      .catch(error => {
        dispatch(searchFail(error));
      });
  }
}

export const changeSearchInput = (input) => {
  return {
    type: 'CHANGE_SEARCH_INPUT',
    input
  };
};

// export const emptySearchInput = () => {
//   return {
//     type: 'EMPTY_SEARCH_INPUT',
//   }
// }

// Fetch Page
const fetchPageStart = () => {
  return {
    type: 'FETCH_PAGE_START'
  };
};

const fetchPageSuccess = (page, pageSize, pageOfUsers) => {
  return {
    type: 'FETCH_PAGE_SUCCESS',
    page,
    pageSize,
    pageOfUsers
  };
};

const fetchPageFail = err => {
  return {
    type: 'FETCH_PAGE_FAIL',
    err
  };
};

export const fetchPage = (page, size) => {
  const startIndex = (page - 1) * size;
  return (dispatch) => {
    dispatch(fetchPageStart());
    axios
      .get(`http://localhost:8080/api/range/${startIndex}/${size}`)
      .then(response => {
        dispatch(fetchPageSuccess(page, size, response.data));
      })
      .catch(err => {
        dispatch(fetchPageFail(err));
      });
  }
}

// Count Page
const getCountStart = () => {
  return {
    type: 'GET_COUNT_START'
  };
};

const getCountSuccess = count => {
  return {
    type: 'GET_COUNT_SUCCESS',
    count
  };
};

const getCountFail = err => {
  return {
    type: 'GET_COUNT_FAIL',
    err
  };
};

export const getCount = () => {
  return (dispatch) => {
    dispatch(getCountStart());
    axios
      .get('http://localhost:8080/api/count')
      .then(response => {
        const count = parseInt(response.data.count);
        dispatch(getCountSuccess(count));
      })
      .catch(err => {
        dispatch(getCountFail(err));
      });
  };
};

// export const nextPage = () => {
//   return{
//     type: 'NEXT_PAGE',
//   }
// }

// export const jumpToPage = page => {
//   return{
//     type: 'JUMP_TO_PAGE',
//     page,
//   }
// }

// Set Status
export const setStatusCurPage = curPage => {
  return {
    type: 'SET_STATUS_CUR_PAGE',
    curPage
  };
};

// export const setStatusOrder = order => {
//   return {
//     type: 'SET_STATUS_ORDER',
//     order
//   };
// };