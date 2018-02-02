import React from 'react';
import {renderIf} from '../../../lib/utils';
import {connect} from 'react-redux';

import AuthForm from './Auth-form';
import Uniforms from '../Uniform/Uniforms';
import * as authActions from './actions';


class Landing extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      loggedIn: false,
      authError: false,
      message: 'authentication credentials failed!'
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }


  componentWillMount() {
    if(this.props.auth)
      this.props.history.push('/uniforms')
  }


  handleLogin(user) {
    this.props.login(user)
      .then(() => this.props.history.push('/uniforms'))
      .catch(e => {
        let authError = true;
        this.setState({authError});
        console.error('authentication Error: ', e.message)
      });
  }

  handleSignup(user) {
    this.props.signup(user)
    .then(() => { this.props.history.push('/uniforms')})
    .catch(e => {
      let authError = true;
      let message = 'error: user already exists!';
      this.setState({authError, message});
      console.error('authentication error: ', e.message)
    });
  }


  handleLogout(user) {
    this.props.logout(user)
    .then(() => this.props.history.push('/Dashboard'))
    .catch(console.error);
  }

  render() {

    let {location} = this.props;

    return (
      <div className="landing">
       {renderIf(location.pathname === '/login',
        <div>
          <h3>Login</h3>
          <AuthForm action='login'
           authError={this.state.authError}
           message={this.state.message}
           handler={this.handleLogin}/>
        </div>
       )}
        {renderIf(location.pathname === '/signup',
        <div>
          <h3>Signup</h3>
          <AuthForm action='signup'
           authError={this.state.authError}
           message={this.state.message}
           handler={this.handleSignup}/>
        </div>
       )}
       {renderIf(location.pathname === '/logout',
        <div>
          {this.handleLogout}
        </div>
       )}
      </div>
    )
  }
}


const mapStateToProps = (state) => ({
  auth:state.auth
});


const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(authActions.signup(user)),
  login: (user) => dispatch(authActions.login(user)),
  logout: (user) => dispatch(authActions.logout(user))
});



export default connect(mapStateToProps,mapDispatchToProps)(Landing);
