# Frontend Testing Documentation

This document provides detailed information about the testing strategy, tools, and structure for the **GoVite Inc - PeerPro** project. All frontend tests are located in the `test/` folder within the `frontend` directory.

---

## **Table of Contents**

1. [Introduction](#1-introduction)
2. [Test Folder Structure](#2-test-folder-structure)
3. [Test Details](#3-test-details)
4. [Testing Tools](#4-testing-tools)
5. [Running Tests](#5-running-tests)
6. [Contribution Guidelines for Test](#6-contribution-guidelines-for-tests)
7. [Future Enhancements](#7-future-enhancements)
8. [Conclusion](#8-conclusion)

---

## **1. Introduction**

Testing is an integral part of ensuring the reliability and maintainability of the application. The frontend testing process focuses on:

- Validating component functionality.
- Ensuring user interactions behave as expected.
- Maintaining code quality through automated tests.

All test files are located in the `test/` folder within the frontend directory.

Repository link: [Frontend Test Folder](https://github.com/JayC-SF/GoVite.Inc-SOEN341_Project_F24/tree/main/frontend/test)

---

## **2. Test Folder Structure**

The `test/` folder contains unit tests for various components and features of the frontend. Each test file corresponds to a specific component or functionality.

### **Folder Structure**

```plaintext
frontend/
└── test/
    ├── accounttoggle.test.tsx       # Unit test for account toggle component
    ├── login.test.tsx               # Unit test for login functionality
    ├── logout.test.tsx              # Unit test for logout functionality
    ├── RatingCriteria.test.tsx      # Unit test for rating criteria
    ├── RatingQuestion.test.tsx      # Unit test for rating question component
    ├── RatingSelection.test.tsx     # Unit test for rating selection
    ├── ratingViews.test.tsx         # Unit test for rating views
    ├── sidebarlogo.test.tsx         # Unit test for sidebar logo component
    ├── sidebaroptions.test.tsx      # Unit test for sidebar options
    └── signup.test.tsx              # Unit test for signup functionality
```

---

## **3. Test Details**

Here is an overview of the key tests:

**1. accounttoggle.test.tsx**

- Purpose: Validates the account toggle functionality in the UI.

- Focus: Ensures toggling between different account views works as expected.

**2. login.test.tsx**

- Purpose: Tests the login process, including form validation and API calls.

- Focus:
  - Successful login with valid credentials.
  - Error handling for incorrect input.

**3. logout.test.tsx**

- Purpose: Ensures that the logout functionality properly clears user session data.

- Focus:
  - Session cleanup after logout.
  - Redirection to the login page.

**4. RatingCriteria.test.tsx**

- Purpose: Tests the rating criteria component for displaying and updating criteria.

- Focus: UI rendering and user interactions.

**5. RatingQuestion.test.tsx**

- Purpose: Validates the rating question component, including dynamic question rendering.

- Focus: Proper question rendering based on data.

**6. RatingSelection.test.tsx**

- Purpose: Tests the selection of ratings by the user.

- Focus:
  - State updates based on user input.
  - Validation of selected ratings.

**7. ratingViews.test.tsx**

- Purpose: Tests the rendering and navigation between different rating views.

- Focus: Smooth transitions between views.

**8. sidebarlogo.test.tsx**

- Purpose: Ensures the sidebar logo is displayed correctly.

- Focus:
  - Responsive design.
  - Correct image rendering.

**9. sidebaroptions.test.tsx**

- Purpose: Validates the functionality of sidebar options.

- Focus:
  - Correct option highlights.
  - Navigation to respective pages.

**10. signup.test.tsx**

- Purpose: Tests the signup form and API integration for user registration.

- Focus:
  - Form validations.
  - Error handling for invalid inputs.

---

## 4. Testing Tools

### Frameworks and Libraries Used

- **Jest**: For unit testing and mocking functions.
- **React Testing Library**: For simulating user interactions and testing component behavior.

---

## 5. Running Tests

Follow these steps to execute the tests:

1. **Install Dependencies**

   Ensure all required dependencies are installed by running:

```bash
npm install
```

2. **Run Tests**

   Execute all tests with the following command:

```bash
npm test
```

3. **Check Test Coverage**

   View a detailed test coverage report by running:

```bash
npm test -- --coverage
```

---

## 6. Contribution Guidelines for Tests

- Place all test files in the `test/` folder.
- Name test files after the component or functionality they cover (e.g., `ComponentName.test.tsx`).
- Use descriptive test names to indicate their purpose clearly.
- Write tests for edge cases and unexpected user inputs.
- Ensure all tests pass before submitting changes to the repository.

---

## 7. Future Enhancements

- Expand test coverage to include integration and end-to-end tests.
- Automate tests in the CI/CD pipeline for faster deployment.
- Use tools like Cypress or Playwright for end-to-end testing.

---

## 8. Conclusion

The tests in the `test/` folder ensure the reliability and stability of the frontend application. Proper testing practices help maintain code quality, reduce bugs, and enhance the overall user experience.
