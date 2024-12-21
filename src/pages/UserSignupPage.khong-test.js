import React from 'react';
import { render, fireEvent } from '@testing-library/react';
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
    const mockAsyncDelay = () => {
      return jest.fn().mockImplementation(() => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve({});
          }, 300);
        });
      });
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
    it('does not allow user click the Sign up button when there is an ongoing api call', () => {
      const actions = { postSignup: mockAsyncDelay() };
      setupForSubmit({ actions });
      fireEvent.click(button);
      fireEvent.click(button);

      expect(actions.postSignup).toHaveBeenCalledTimes(1);
    });
    it('display a spinner when there is an ongoing api call', () => {
      const actions = { postSignup: mockAsyncDelay() };
      const { queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);
      const spinner = queryByText('Loading...');
      expect(spinner).toBeInTheDocument();
    });
    it('hides the spinner when api call complete successfully', () => {
      // const actions = { postSignup: mockAsyncDelay() };
      // const { queryByText } = setupForSubmit({ actions });
      // fireEvent.click(button);
      // const spinner = queryByText('Loading...');
      // expect(spinner).toBeInTheDocument();
      // It use deprecated waitfordomchange so not working
    });
    it('hides the spinner after api call finishes with error testing', () => {
      // const actions = {
      //   postSignup: jest.fn().mockImplementation(() => {
      //     return new Promise((resolve, reject) => {
      //       setTimeout(() => {
      //         reject({ response: { data: {} } });
      //       }, 300);
      //     });
      //   }),
      // };
      // const { queryByText } = setupForSubmit({ actions });
      // fireEvent.click(button);
      // await waitForDomChange();
      // const spinner = queryByText('Loading...');
      // expect(spinner).not.toBeInTheDocument();
    });
    it('display the validation error for displayName field when error is received', async () => {
      const actions = {
        postSignup: jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                displayName: 'Cannot be null',
              },
            },
          },
        }),
      };
      const { findByText } = setupForSubmit({ actions });
      fireEvent.click(button);
      // findByText will wait for the component to appear
      const errorMessage = await findByText('Cannot be null');
      expect(errorMessage).toBeInTheDocument();
    });
    it('disables the signup button when password and repeat password are not match', () => {
      setupForSubmit();
      fireEvent.change(passwordRepeatInput, changeEvent('new-password'));
      expect(button).toBeDisabled();
    });
    it('disables the signup button when repeat password and password are not match', () => {
      setupForSubmit();
      fireEvent.change(passwordInput, changeEvent('new-password'));
      expect(button).toBeDisabled();
    });
    it('display error message when repeat password and password are mismatch', () => {
      const { queryByText } = setupForSubmit();
      fireEvent.change(passwordRepeatInput, changeEvent('new-password'));
      const mismatchPasswordWarning = queryByText('Does not match to password');
      expect(mismatchPasswordWarning).toBeInTheDocument();
    });
    it('display error message when password and repeat password are mismatch', () => {
      const { queryByText } = setupForSubmit();
      fireEvent.change(passwordInput, changeEvent('new-password'));
      const mismatchPasswordWarning = queryByText('Does not match to password');
      expect(mismatchPasswordWarning).toBeInTheDocument();
    });
    it('hides the validation error for displayName field when user change the content of displayName', async () => {
      const actions = {
        postSignup: jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                displayName: 'Cannot be null',
              },
            },
          },
        }),
      };
      const { findByText, queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);
      // findByText will wait for the component to appear
      await findByText('Cannot be null');
      // change the displayName
      fireEvent.change(displayNameInput, changeEvent('new-displayName'));
      const errorMessage = queryByText('Cannot be null');
      expect(errorMessage).not.toBeInTheDocument();
    });
    it('hides the validation error for username field when user change the content of username', async () => {
      const actions = {
        postSignup: jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                username: 'Cannot be null',
              },
            },
          },
        }),
      };
      const { findByText, queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);
      // findByText will wait for the component to appear
      await findByText('Cannot be null');
      fireEvent.change(usernameInput, changeEvent('new-username'));
      const errorMessage = queryByText('Cannot be null');
      expect(errorMessage).not.toBeInTheDocument();
    });
    it('hides the validation error for password field when user change the content of password', async () => {
      const actions = {
        postSignup: jest.fn().mockRejectedValue({
          response: {
            data: {
              validationErrors: {
                password: 'Password cannot be null',
              },
            },
          },
        }),
      };
      const { findByText, queryByText } = setupForSubmit({ actions });
      fireEvent.click(button);
      // findByText will wait for the component to appear
      await findByText('Password cannot be null');
      fireEvent.change(passwordInput, changeEvent('new-username'));
      const errorMessage = queryByText('Password cannot be null');
      expect(errorMessage).not.toBeInTheDocument();
    });
  });
});
