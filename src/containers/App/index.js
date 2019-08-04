import React, { Component } from 'react';
import { connect } from "react-redux";
import { deleteUser, createUser, resetRedirect, redirect, editUser, sortUsers, backToHome, search, changeSearchInput } from '../../redux/action-creators';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import UserList from '../../components/UserList';
import CreateUser from '../../components/CreateUser';
import EditUser from '../../components/EditUser';

class App extends Component { 
  getUser = (_id) => {
    console.log('get edit user is called');
    const users = this.props.pageOfUsers;
    for (let user of users) {
      if (user._id === _id) {
        return user;
      }
    }
  };

  //一会加上
//   componentDidUpdate(prevProps, prevState) {
//     if (!this.equals(this.props.pageOfUsers, prevProps.pageOfUsers)) {
//       this.props.resetRedirect();
//     }
//   }

//   equals = (one, two) => {
//     if(one.length !== two.length)
//         return false;
//     for(var i = one.length; i--;) {
//         if(one[i] !== two[i])
//             return false;
//     }
//     return true;
// }
  
  render() {
    console.log('tesing in App isSearching', this.props.isSearching);
    console.log('******test in app pageofusers', this.props.pageOfUsers);
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact = {true} 
            path = '/' 
            render = {() => 
              <UserList 
                pageOfUsers = {this.props.pageOfUsers}
                //getUsers = {this.props.getUsers}
                deleteUser = {this.props.deleteUser}
                sortUsers = {this.props.sortUsers}
                isLoading = {this.props.isLoading}
                resetRedirect = {this.props.resetRedirect}
                search = {this.props.search}
                isSearching = {this.props.isSearching}
                searchUsers = {this.props.searchUsers}
                searchChange = {this.props.changeSearchInput}
                searchInput = {this.props.searchInput}
                backToHome = {this.props.backToHome}
                //onChangePage = {this.onChangePage}
                //nextPage = {this.props.nextPage}
                //jumTo = {this.props.jumpToPage}
                //fetch = {this.props.fetchAll}
              /> 
            } 
          />
          <Route 
            exact = {true}
            path = '/users' 
            render = {() => 
              <CreateUser 
                createUser = {this.props.createUser} 
                redirect = {this.props.redirect}
                redirectToUserlist = {this.props.redirectToUserlist}
                isLoading = {this.props.isLoading}
              />
            }
          />
           <Route 
            path = '/users/:user_id' 
            render = {({ match }) => {
              return (
                <EditUser
                  users = {this.props.users}
                  id = {match.params.user_id}
                  editUser = {this.props.editUser}
                  getUsers = {this.props.getUsers}
                  getUser = {this.getUser}
                  redirect = {this.props.redirect}
                  redirectToUserlist = {this.props.redirectToUserlist}
                  isLoading = {this.props.isLoading}
                /> 
              );
            }}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //users: state.getUsers.users,
    redirect: state.redirect,
    isLoading: state.getUsers.isLoading,
    isSearching: state.getUsers.isSearching,
    searchUsers: state.getUsers.searchUsers,
    searchInput: state.searchInput,
    pageOfUsers: state.getUsers.pageOfUsers,
    status : state.status,
    matrix: state.getUsers.matrix,
    totalItems: state.getUsers.totalItems,
    pageNumber: state.getUsers.pageNumber,
    //pageOfUsers: state.getUsers.pageOfUsers
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getUsers: () => {
    //   dispatch(getUsers());
    // },
    deleteUser: (_id) => {
      dispatch(deleteUser(_id));
    },
    createUser: (user) => {
      dispatch(createUser(user));
    },
    redirectToUserlist: () => {
      dispatch(redirect());
    },
    resetRedirect: () => {
      dispatch(resetRedirect());
    },
    editUser: (id, user) => {
      dispatch(editUser(id, user));
    },
    sortUsers: (key) => {
      dispatch(sortUsers(key));
    },
    backToHome: () => {
      dispatch(backToHome());
    },
    search: (keyword) => {
      dispatch(search(keyword));
    },
    changeSearchInput: (input) => {
      dispatch(changeSearchInput(input));
    },
    // nextPage: () => {
    //   dispatch(nextPage());
    // },
    // jumpToPage: (page) => {
    //   dispatch(jumpToPage(page));
    // },
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(App);

