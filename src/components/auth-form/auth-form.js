import React from 'react';
import { PropTypes } from 'prop-types';
import validator from 'validator';
import { renderIf, devLogger } from '../../lib/utils';

import './auth-form.scss';

// TODO: add new things to state and add validator above
const emptyState = {
  username: '',
  usernameDirty: false,
  usernameError: 'Username is required',
  
  email: '',
  emailDirty: false,
  emailError: 'Email is required',

  password: '',
  passwordDirty: false,
  passwordError: 'Passowrd is required',

  conflictError: false,
  conflictErrorMsg: 'Username or email alraedy exists in the database',
};

const MIN_NAME_LENGTH = 6;
const MIN_PASSWORD_LENGTH = 6;

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = emptyState;
  }

  // TODO: add this handler
  handleValidation = (name, value) => {
    if (this.props.type === 'login') {
      return null;
    }

    // name can either be "username", "email", or "password"
    switch (name) {
      case 'username':
        // define your own logic here
        if (value.length < MIN_NAME_LENGTH) {
          return `Your name must be at least ${MIN_NAME_LENGTH} characters long.`
        }
        return null;
      case 'email':
        if (!validator.isEmail(value)) {
          return 'You must provide a valid email';
        }
        return null;
      case 'password':
        if (value.length < MIN_PASSWORD_LENGTH) {
          return `Your password ust be at least ${MIN_PASSWORD_LENGTH} characters long`;
        }
        return null; 
      default: 
        return null;
    }
  }

  // TODO: add new things to here
  handleChange = (event) => {
    const { name, value } = event.target;
    // this.setState({ [name]: value });
    // TODO: change state here
    this.setState({
      conflictError: false,
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.handleValidation(name, value),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Change this here

    const { usernameError, emailError, passwordError } = this.state;
    if (this.props.type === 'login' || (!usernameError && !passwordError && !emailError)) {
      console.log(this.props, 'props in auth form');
      this.props.onComplete(this.state)
        .then(() => {
          this.setState(emptyState); // here we reset everything back to default, including dirty statuses
        })
        .catch((error) => {
          if (error.status === 409) {
            
            this.setState({ conflictError: true });
          }
        });
    } 
    // else {
    //   this.setState({
    //     usernameDirty: true,
    //     emailDirty: true,
    //     passwordDirty: true,
    //   });
    // }
  }

  // TODO: refactor email input
  renderEmailInput = (type) => {
    if (type === 'signup') {
      return (
        <div>
        { renderIf(this.state.emailDirty, <h4 className="error">{ this.state.emailError }</h4>)}
        <input 
          name="email"
          placeholder="email"
          type="email"
          value={this.state.email}
          onChange={this.handleChange}
        />
        </div>
      );
    }
    return undefined;
  }

  render() {
    devLogger(this.state, 'hello');
    let { type } = this.props;
    // if the "type" prop is already equal to login, keep it as "login", otherwise, if not, set it "signup"
    type = type === 'login' ? type : 'signup'; 
    return (
      <form className="auth-form" onSubmit={ this.handleSubmit }>

        { renderIf(this.state.usernameDirty, <h4 className="error">{ this.state.usernameError }</h4>)}

        <input 
          name="username"
          placeholder="username"
          type="text"
          value={ this.state.username }
          onChange={ this.handleChange }
        />

        { this.renderEmailInput(type) }

        { renderIf(this.state.passwordDirty, <h4 className="error">{ this.state.passwordError }</h4>)}

        <input 
          name="password"
          placeholder="password"
          type="password"
          value={ this.state.password }
          onChange={ this.handleChange }
        />
        { renderIf(this.state.conflictError, <h4 className="error">{ this.state.conflictErrorMsg }</h4>) }
        <button type="submit">{ type }</button>
      </form>
    );
  }
}

AuthForm.propTypes = {
  onComplete: PropTypes.func,
  type: PropTypes.string,
};
