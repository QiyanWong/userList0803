import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
//import { connect } from 'react-redux';
//import { getUsers, createUser, editUser } from '../../redux/action-creators';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      sex: '',
      age: '',
      password: '',
      passwordRepeat: '',
      passwordsSame: true
    };
  }
  componentDidMount() {
    const { id, getUser } = this.props;
    console.log('id is ', id);
    const currentUser = getUser(id);
    console.log('current edit user is: ', currentUser);
    if (currentUser) {
      const { firstname, lastname, sex, age, passoword, passwordRepeat } = currentUser;
      this.setState({ firstname, lastname, sex, age, passoword, passwordRepeat });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    let { id, editUser } = this.props;
    let { firstname, lastname, sex, age, password } = this.state;
    if (this.state.password === this.state.passwordRepeat) {
      const curUser = { id, firstname, lastname, sex, age, password };
      editUser(id, curUser);
      // // console.log('!!!test edit id is ', id);
      // console.log('!!!test: curUser is ', curUser);
      this.setState({
        firstname: '',
        lastname: '',
        sex: '',
        age: '',
        passoword: '',
        passwordRepeat: '',
        passwordsSame: true
      });
      this.props.redirectToUserlist();
    } else {
      this.setState({
        passoword: '',
        passwordRepeat: '',
        passwordsSame: false
      });
    }
  }
 
  handleChange = (e, key) => {
    const editUser = {};
    editUser[key] = e.target.value;
    this.setState(editUser);
  }

  handleRepeatChange = e => {
    this.setState({passwordRepeat: e.target.value});
  }
 
  render() {
    const passwordStyle = {color: 'red'};
    const { redirect } = this.props;
    if (redirect && !this.props.isLoading) {
      return <Redirect to = {{ pathname: '/' }}/>
    } else {
      return (
        <div>
          <h2>Edit User</h2>
          <form onSubmit = {this.handleSubmit}>
            First Name: 
            <input type = 'text' id = 'firstname' value = {this.state.firstname} onChange = {e => this.handleChange(e, 'firstname')} required = {true} />
            Last Name: 
            <input type = 'text' id = 'lastname' value = {this.state.lastname} onChange = {e => this.handleChange(e, 'lastname')} required = {true} />
            Sex: 
            <input type = 'text' id = 'sex' value = {this.state.sex} onChange = {e => this.handleChange(e, 'sex')} required = {true}/>
            Age: 
            <input type = 'number' id = 'age' value = {this.state.age} onChange = {e => this.handleChange(e, 'age')} required = {true}/>
            Password: 
            <input type = 'password' id = 'password' value = {this.state.password} onChange = {e => this.handleChange(e, 'password')} required = {true} />
            <div> 
               <label htmlFor='passwordRepeat' style={this.state.passwordsSame === true? null : passwordStyle}>
                Password Repeat: 
               </label> 
              <input type = 'password' id = 'passwordRepeat' value = {this.state.passwordRepeat} onChange = {this.handleRepeatChange} required = {true} />
            </div> 
            <button type = "submit">Save Change</button> 
          </form>
          {this.state.passwordsSame===true? null : <p style={passwordStyle}>Password doesn't match</p>}
        </div>
      );
    } 
  }
}

export default EditUser;
