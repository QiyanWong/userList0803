import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sortUsers, fetchPage, getCount, backToHome, emptySearchInput} from '../../redux/action-creators';
import { Link } from 'react-router-dom';
import Pagination from '../../containers/Pagination';

class UserList extends Component {
  componentDidMount() {
    console.log("this is in the didmmout: " + this.props.curPage);
    this.props.getUsers();
    this.props.dispatch(fetchPage(this.props.curPage, 5));
    this.props.dispatch(getCount());
    this.props.resetRedirect();
  }
  //一会加上
  componentDidUpdate(prevProps, prevState) {
    console.log(this.props.curPage);
    if (this.props.pageOfUsers.length !== prevProps.pageOfUsers.length) {
            this.props.dispatch(fetchPage(this.props.curPage, 5));
    }
  }

  handleSort = (e, key) => {
    e.preventDefault();
    this.props.dispatch(sortUsers(key));
  }

  handleBackToHome = () => {
    console.log( 'searchINPUT IS', this.props.searchInput);
    this.props.dispatch(backToHome());
  }

  handleSearch = e => {
    this.props.searchChange(e.target.value);
  }
  render() {
    let showUsers = [];
    var keyword = this.props.searchInput.searchInput;
    showUsers = this.props.isSearching === true ? 
    this.props.users.filter(user => {
      for(let key of Object.keys(user)) {
        console.log(key)
        if(key !== "firstname" && key !== "lastname" && key !== "sex") continue;
        if(user[key].includes(keyword)) return true;
      }
      return false;
    }) : this.props.pageOfUsers;
    const searchInput = this.props.searchInput;
    if (this.props.isLoading) {
      return <div>Loading...</div>
    } else {
      return (
        <div className = 'container'>
          <h2>Users List</h2>
          {/*  Search Part  */}
          <div> 
              <input type = 'search' className = 'search'
              placeholder = 'Search' onChange = {this.handleSearch} />
              <div className = 'search'>
                <button className = 'btn btn-primary' onClick = {e => this.props.search(searchInput)}> Search </button>
              </div>
              <div className = 'back'>
                <button className = 'btn btn-primary' onClick = {e => this.handleBackToHome()}> Back </button>
              </div>
          </div>
          {/*  Table Part  */}
          <table>
            <thead> 
              <tr>
                <th>Edit</th>
                <th>Delete</th>
                <th>
                  <button type = 'button' className = "btn btn-light" onClick = {e => this.handleSort(e, "firstname")}>
                    First Name
                  </button>
                </th>
                <th>
                  <button className = "btn btn-light" onClick = {e => this.handleSort(e, 'lastname')}>
                    Last Name
                  </button>
                </th>
                <th>
                  <button className = "btn btn-light" onClick = {e => this.handleSort(e, 'sex')}>
                    Sex
                  </button>
                </th>
                <th>
                  <button className = "btn btn-light" onClick = {e => this.handleSort(e, 'age')}>
                    Age
                  </button>
                </th>
              </tr>    
            </thead>
            
            <tbody>
              {showUsers.map(user => {
                return (
                  <tr key = {user._id}>
                    <td><Link to={`/users/${user._id}`} className="btn btn-primary">Edit</Link></td>
                    <td><button type = 'button' onClick={() => this.props.deleteUser(user._id)}>Delete</button></td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td>{user.sex}</td>
                    <td>{user.age}</td>
                  </tr>
                );
              })} 
            </tbody> 
          </table>
          {/*  Pagination Part  */}
          <Pagination/>
          
          {/*  Button to Create User  */}
          <Link to="/users" className="btn btn-primary" > 
            Create New User
          </Link>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    pageOfUsers: state.getUsers.pageOfUsers,
    searchInput: state.searchInput
    //pageNumber: state.getUsers.pageNumber
  };
}

export default connect(mapStateToProps)(UserList);

