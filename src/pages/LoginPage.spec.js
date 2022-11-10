import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LoginPage } from './LoginPage'

describe('Login Page', () => {
  describe('Layout', () => {
    it('has header of Login', () => {
      const { container } = render(<LoginPage />);
      const header = container.querySelector('h1');
      expect(header).toHaveTextContent('Login');
    });

    it('has input for username', () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const input = queryByPlaceholderText('Your username');
      expect(input).toBeInTheDocument();
    });

    it('has input for password', () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const input = queryByPlaceholderText('Your password');
      expect(input).toBeInTheDocument();
    });

    it('has password type for password input', () => {
      const { queryByPlaceholderText } = render(<LoginPage />);
      const input = queryByPlaceholderText('Your password');
      expect(input.type).toBe('password');
    });

    it('has button for login', () => {
      const { container } = render(<LoginPage />);
      const loginButton = container.querySelector('button');
      expect(loginButton).toBeInTheDocument();
    });

    describe('Interactions', () => {
      const changeEvent = (content) => {
        return {
          target: {
            value: content,
          },
        };
      };
      it('set the value of input username to the state', () => {
        const { queryByPlaceholderText } = render(<LoginPage />);
        const inputUsername = queryByPlaceholderText('Your username');
        fireEvent.change(inputUsername, changeEvent('my-user-name'));
        expect(inputUsername).toHaveValue('my-user-name');
      });
    });
  });
});
