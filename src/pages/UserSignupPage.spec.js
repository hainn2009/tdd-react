import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { UserSignupPage } from './UserSignupPage';

describe('UserSignupPage', () => {
  describe('Layout', () => {
    it('has header of Sign up', () => {
      const { container } = render(<UserSignupPage />);
      const header = container.querySelector('h1');
      expect(header).toHaveTextContent('Sign Up');
    });
    it('has input for display name', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const displayNameInput = queryByPlaceholderText('Your display name');
      expect(displayNameInput).toBeInTheDocument();
    });
    it('has input for username', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const userNameInput = queryByPlaceholderText('Your username');
      expect(userNameInput).toBeInTheDocument();
    });
    it('has input for password', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText('Your password');
      expect(passwordInput).toBeInTheDocument();
    });
    it('has password type for password input', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText('Your password');
      expect(passwordInput.type).toBe('password');
    });
    it('has input for password repeat', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const repeatPasswordInput = queryByPlaceholderText(
        'Repeat your password'
      );
      expect(repeatPasswordInput).toBeInTheDocument();
    });
    it('has password type for repeat password input', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const repeatPasswordInput = queryByPlaceholderText(
        'Repeat your password'
      );
      expect(repeatPasswordInput.type).toBe('password');
    });
    it('has submit button', () => {
      const { container } = render(<UserSignupPage />);
      const submitButton = container.querySelector('button');
      expect(submitButton).toBeInTheDocument();
    });
  });
  describe('Interactions', () => {
    const changeEvent = (content) => {
      return {
        target: {
          value: content,
        },
      };
    };
    let button,
      displayNameInput,
      usernameInput,
      passwordInput,
      passwordRepeatInput;
    const setupForSubmit = (props) => {
      const rendered = render(<UserSignupPage {...props} />);

      const { container, queryByPlaceholderText } = rendered;
      displayNameInput = queryByPlaceholderText('Your display name');
      usernameInput = queryByPlaceholderText('Your username');
      passwordInput = queryByPlaceholderText('Your password');
      passwordRepeatInput = queryByPlaceholderText('Repeat your password');

      fireEvent.change(displayNameInput, changeEvent('my-display-name'));
      fireEvent.change(usernameInput, changeEvent('my-user-name'));
      fireEvent.change(passwordInput, changeEvent('P4ssword'));
      fireEvent.change(passwordRepeatInput, changeEvent('P4ssword'));

      button = container.querySelector('button');
      return rendered;
    };
    it('set the displayName value into the state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const displayNameInput = queryByPlaceholderText('Your display name');

      fireEvent.change(displayNameInput, changeEvent('my-display-name'));
      expect(displayNameInput).toHaveValue('my-display-name');
    });
    // Not correct way, need to check on the state of the component
    it('set the username value into the state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const userNameInput = queryByPlaceholderText('Your username');

      fireEvent.change(userNameInput, changeEvent('my-user-name'));
      expect(userNameInput).toHaveValue('my-user-name');
    });
    it('set the password value into the state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordInput = queryByPlaceholderText('Your password');

      fireEvent.change(passwordInput, changeEvent('P4ssword'));
      expect(passwordInput).toHaveValue('P4ssword');
    });
    it('set the passwordRepeat value into the state', () => {
      const { queryByPlaceholderText } = render(<UserSignupPage />);
      const passwordRepeatInput = queryByPlaceholderText(
        'Repeat your password'
      );

      fireEvent.change(passwordRepeatInput, changeEvent('P4ssword'));
      expect(passwordRepeatInput).toHaveValue('P4ssword');
    });
    it('call postSignup when all inputs field are valid', () => {
      const actions = {
        // mock return empty object
        postSignup: jest.fn().mockResolvedValue({}),
      };
      setupForSubmit({ actions });
      fireEvent.click(button);
      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });
    it('does not throw an exception when clicking the signup button and actions was not provided in props', () => {
      setupForSubmit();
      expect(() => fireEvent.click(button)).not.toThrow();
    });
    it('call post with user body when all inputs field are valid', () => {
      const actions = {
        // mock return empty object
        postSignup: jest.fn().mockResolvedValue({}),
      };
      setupForSubmit({ actions });
      fireEvent.click(button);
      const expectedUserObject = {
        displayName: 'my-display-name',
        username: 'my-user-name',
        password: 'P4ssword',
      };
      expect(actions.postSignup).toHaveBeenCalledWith(expectedUserObject);
    });
  });
});
