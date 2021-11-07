import React from 'react';
import { render } from '@testing-library/react';
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
});
