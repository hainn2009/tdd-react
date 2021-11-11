## Technology

- Spring boot, Spring data, Srping security
- Spring tool suite
- Lombok

## User Signup

- 07/11/2021
  - Finish clip 7 add sign up page
  - Finish clip 8 handling input change
  - Using google develop tool, tab components to see the state of our component
  - Create mock function with jest.fn
  - Finish clip 9 click handling
  - Finish clip 10 Styling using Bootstrap
  - Finish clip 11 Send request to backend (dont understand mock???), set proxy to localhost in package.json to call to backend
  - The backend was built in Nodejs course is different than this frontend, so it is not working
- 08/11/2021
  - Finish clip 12 Add progress indicator folder 3
  - Using bootstrap [spinner component](https://getbootstrap.com/docs/5.1/components/spinners/) to display loading... information
  - Also in apiCall.js axios.post('/api/1.0/users', user); it does not specific the back end address, it is the problem that we can not test call to backend => can make it call backend. OK
  - Stop at 7:43 clip 12
- 09/11/2021
  - Change it() to xit() to skip unneed test
  - There are 2 test cases were not tested because waitfordomchange is deprecated
  - Finish clip 12 folder 3
  - https://testing-library.com/docs/guide-disappearance/
  - Finish clip 6 Display validation errors: only test case, not get errors from backend
  - Finish at 6:42 clip 7 Create a customs form input component because we have many same fields: displayName, username, email, password,...
  - In setupTests.js file: config code for all tests will run
- 10/11/2021
  - Fínish clip 7: none, stop at 18:07 all test case haven't pass, haven't seen the errors when test with backend
- 11/11/2021
  - The backend will send the response object like that
  ```js
  response: {
    data: {
      path: '',
      timestamp: '',
      message: '',
      validataionErrors: {
        username: '',
        email: '',
        password: '',
      },
    },
  }
  ```
  THe problem why we cannot see the errors is frontend have díplayName, repeatPassword, not have email and backend have email, not have displayName, repeatPassword
  - 5:30 clip 8 folder 4
