import React from 'react';
import Input from '../components/Input';

export class UserSignupPage extends React.Component {
  state = {
    displayName: '',
    username: '',
    password: '',
    passwordRepeat: '',
    email: '',
    pendingApiCall: false,
    errors: {},
    passwordRepeatConfimed: true,
  };
  onChangeDisplayName = (event) => {
    const value = event.target.value;
    const errors = { ...this.state.errors };
    delete errors.displayName;
    this.setState({ displayName: value, errors });
  };
  onChangeUsername = (event) => {
    const value = event.target.value;
    const errors = { ...this.state.errors };
    delete errors.username;
    this.setState({ username: value, errors });
  };
  onChangePassword = (event) => {
    const value = event.target.value;
    const passwordRepeatConfimed = this.state.passwordRepeat === value;
    const errors = { ...this.state.errors };
    delete errors.password;
    errors.passwordRepeat = passwordRepeatConfimed
      ? ''
      : 'Does not match to password';
    this.setState({ password: value, passwordRepeatConfimed, errors });
  };
  onChangePasswordRepeat = (event) => {
    const value = event.target.value;
    const passwordRepeatConfimed = this.state.password === value;
    const errors = { ...this.state.errors };
    errors.passwordRepeat = passwordRepeatConfimed
      ? ''
      : 'Does not match to password';
    this.setState({ passwordRepeat: value, passwordRepeatConfimed, errors });
  };
  onChangeEmail = (event) => {
    const value = event.target.value;
    this.setState({ email: value });
  };
  onClickSignup = () => {
    const user = {
      displayName: this.state.displayName,
      username: this.state.username,
      password: this.state.password,
    };
    //test user
    // const user = {
    //   displayName: 'user1',
    //   username: 'user1',
    //   email: 'user2@mail.com',
    //   password: 'P4ssword',
    // };
    this.setState({ pendingApiCall: true });
    this.props.actions
      .postSignup(user)
      .then((response) => {
        this.setState({ pendingApiCall: false });
      })
      .catch((apiError) => {
        let errors = { ...this.state.errors };

        if (apiError.response.data && apiError.response.data.validationErrors) {
          errors = { ...apiError.response.data.validationErrors };
        }
        this.setState({ pendingApiCall: false, errors });
      });
  };
  render() {
    return (
      <div className='container'>
        <h1 className='text-center'>Sign Up</h1>
        <div className='col-12 mb-3'>
          <Input
            label='Display Name'
            placeholder='Your display name'
            value={this.state.displayName}
            onChange={this.onChangeDisplayName}
            hasError={this.state.errors.displayName && true}
            error={this.state.errors.displayName}
          />
        </div>
        <div className='col-12 mb-3'>
          <Input
            label='Email'
            placeholder='Your email'
            value={this.state.email}
            onChange={this.onChangeEmail}
            hasError={this.state.errors.email && true}
            error={this.state.errors.email}
          />
        </div>
        <div className='col-12 mb-3'>
          <Input
            label='User name'
            placeholder='Your username'
            value={this.state.username}
            onChange={this.onChangeUsername}
            hasError={this.state.errors.username && true}
            error={this.state.errors.username}
          />
        </div>
        <div className='col-12 mb-3'>
          <Input
            label='Password'
            placeholder='Your password'
            type='password'
            value={this.state.password}
            onChange={this.onChangePassword}
            hasError={this.state.errors.password && true}
            error={this.state.errors.password}
          />
        </div>
        <div className='col-12 mb-3'>
          <Input
            label='Password repeat'
            placeholder='Repeat your password'
            type='password'
            value={this.state.passwordRepeat}
            onChange={this.onChangePasswordRepeat}
            hasError={this.state.errors.passwordRepeat && true}
            error={this.state.errors.passwordRepeat}
          />
        </div>
        <div className='text-center'>
          <button
            className='btn btn-primary'
            onClick={this.onClickSignup}
            disabled={
              this.state.pendingApiCall || !this.state.passwordRepeatConfimed
            }
          >
            {this.state.pendingApiCall && (
              <div className='spinner-border text-light spinner-border-sm mr-1'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            )}
            Sign Up
          </button>
        </div>
      </div>
    );
  }
}

UserSignupPage.defaultProps = {
  actions: {
    postSignup: () => {
      return new Promise((resolve, reject) => {
        resolve({});
      });
    },
  },
};

export default UserSignupPage;
