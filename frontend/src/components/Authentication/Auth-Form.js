import React from 'react';
import {Route, Redirect} from 'react-router-dom';


let initialState = {
  username: '',
  password: '',
  email: '',
}


class AuthForm extends React.Component {
  constructor(props){
    super(props)

    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(e){
    let {name, value} = e.target;
    this.setState({[name]: value})
  }


  handleSubmit(e){
    e.preventDefault();
    this.props.handler(this.state);
    this.setState(initialState);
  }

  render() {

    let action = this.props.action;
    let didError = this.props.authError === true ? 'authError' : 'success'
    let message = this.props.message;

    return [
      <span className={didError}>{message}</span>,
      <form className='authForm' onSubmit={this.handleSubmit}>
      <input
        name='username'
        value={this.state.username}
        required='true'
        type='text'
        placeholder='username'
        onChange={this.handleChange}
      />

      <input
        name='password'
        value={this.state.password}
        required='true'
        type='password'
        placeholder='password'
        onChange={this.handleChange}
      />

      <input
        name='email'
        value={this.state.email}
        required='true'
        type='email'
        placeholder='email'
        onChange={this.handleChange}
      />

      <button type='submit'>{action}</button>
      </form>
    ]
  }
}



export default AuthForm;
