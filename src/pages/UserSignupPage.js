import React from 'react';

export class UserSignupPage extends React.Component {
  state = {
    displayName: '',
    username: '',
    password: '',
    passwordRepeat: '',
    pendingApiCall: false,
  };
  onChangeDisplayName = (event) => {
    const value = event.target.value;
    this.setState({ displayName: value });
  };
  onChangeUsername = (event) => {
    const value = event.target.value;
    this.setState({ username: value });
  };
  onChangePassword = (event) => {
    const value = event.target.value;
    this.setState({ password: value });
  };
  onChangePasswordRepeat = (event) => {
    const value = event.target.value;
    this.setState({ passwordRepeat: value });
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
      .catch((err) => {
        this.setState({ pendingApiCall: false });
      });
  };
  render() {
    return (
      <div className='container'>
        <h1 className='text-center'>Sign Up</h1>
        <div className='col-12 mb-3'>
          <label>Display name:</label>
          <input
            className='form-control'
            placeholder='Your display name'
            value={this.state.displayName}
            onChange={this.onChangeDisplayName}
          />
        </div>
        <div className='col-12 mb-3'>
          <label>Username:</label>
          <input
            className='form-control'
            placeholder='Your username'
            value={this.state.username}
            onChange={this.onChangeUsername}
          />
        </div>
        <div className='col-12 mb-3'>
          <label>Password:</label>
          <input
            className='form-control'
            placeholder='Your password'
            type='password'
            value={this.state.password}
            onChange={this.onChangePassword}
          />
        </div>
        <div className='col-12 mb-3'>
          <label>Password repeat:</label>
          <input
            className='form-control'
            placeholder='Repeat your password'
            type='password'
            value={this.state.passwordRepeat}
            onChange={this.onChangePasswordRepeat}
          />
        </div>
        <div className='text-center'>
          <button
            className='btn btn-primary'
            onClick={this.onClickSignup}
            disabled={this.state.pendingApiCall}
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