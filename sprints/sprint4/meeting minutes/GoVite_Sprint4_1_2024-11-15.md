# Peer Assessment Application Meeting \- Minutes 4.1

Date: 2024/11/15

**Members presented**

* Anh Thien Nguyen (40122030)  
* Daniel Lam (40248073)  
* Juan-Carlos Sreng-Flores (40101813)  
* Ming-Yang Calvin Lee (40264581)  
* Mouhamed Coundoul (40248237)  
* Samuditha Wijenarayana (40224895) 

**Executive summary**

In this meeting, we reviewed Sprint 3’s achievements and challenges while discussing the development and progress of several key initiatives. New features, such as the User Profile page and the React table export to CSV functionality, were reviewed. We also covered ongoing refactoring efforts, introduced a new automatic bug detection tool, and emphasized the importance of adding new descriptive content. Areas for improvement, including test coverage, documentation, and Git workflows, were highlighted. For Sprint 4, tasks were assigned based on team members' expertise, with a focus on refining the UI/UX design, improving responsiveness, and enhancing unit testing standards and organization. We also discussed the status of acceptance tests and explored ways to improve their implementation.

1. ### **New Features: User Profile & CSV Report Export**

   We have decided to implement two new features for Sprint 4: the User Profile page and the CSV report export functionality. The User Profile page will provide users with a personalized view of their data, enhancing user engagement and offering easy access to account details. The CSV report export feature will allow users to download their data summary in a CSV format, streamlining data analysis and sharing.

2. ### **Unit Test: Backend and Frontend**

   We have identified key areas for unit testing, which will be expanded for both the backend and frontend components:  
- User Profile Testing: Backend unit tests will ensure that user data is correctly retrieved and displayed. Frontend tests will verify the profile page renders properly and handles edge cases, such as missing user details.  
- CSV Export Testing: Backend tests will ensure that the CSV export correctly formats and exports user data. Frontend tests will confirm that the export functionality is intuitive and error-free.

  ### Scope:

- Backend Testing: Focus will be on the accuracy of user data retrieval, session management, and export functionality for the new features. Tests will ensure the system handles various edge cases, like incomplete data or failed exports.  
- Frontend Testing: The Vitest testing suite will be used to validate the user profile page and the CSV export functionality. Tests will ensure UI components display as expected, with appropriate handling of user input and errors.

3. ### **Progress and Tasks for Sprint 4**

- UI/UX Design for User Profile Page: The design for the User Profile page will focus on user-friendliness and accessibility. The layout will be optimized for different devices and screen sizes, ensuring a responsive experience.  
- CSV Report Export: The CSV export feature will be integrated with the user profile and dashboard to allow easy data download. It will be tested for data accuracy and formatting.  
- Documentation of Frontend Folder: Documentation for the frontend folder will be updated to provide clear guidelines for future developers working with the front-end components.

4. ### **Bugs Fixed and New Bugs**

   Several bugs were addressed in Sprint 3:  
- Fixed: Issues with POST requests for rating creation were resolved.  
- New Bugs Identified: A bug was found with the new criteria not being properly stored in the database, which will be fixed in Sprint 4\.

5. ### **Refactoring**

   We discussed the need for **refactoring** in several parts of the codebase to improve code readability and performance. Refactoring will focus on:  
- Simplifying complex functions and reducing duplication.  
- Improving the modularity of components to make them easier to maintain and extend. This will be an ongoing effort during Sprint 4 to ensure the codebase remains clean and efficient.

6. ### **Automatic Bug Detection Tool**

   We discussed integrating an automatic bug detection tool into the workflow. This tool will scan the codebase for common issues, such as memory leaks, performance bottlenecks, and code that does not adhere to best practices. Implementing this tool will help reduce manual testing time and increase the overall stability of the platform.

7. ### **New Descriptive Contents**

   As part of the user experience improvements, we started creating **new descriptive content** to provide better guidance for users. This will include:  
- Clearer tooltips and instructions across the platform.  
- Enhanced descriptions of features, especially for complex areas like the rating system. These updates will help users better understand the platform and reduce confusion.

