# Peer Assessment Application Meeting \- Minutes 3.2

Date: 2024/11/08

**Members presented**

- Anh Thien Nguyen (40122030)  
- Daniel Lam (40248073)  
- Juan-Carlos Sreng-Flores (40101813)  
- Ming-Yang Calvin Lee (40264581)  
- Mouhamed Coundoul (40248237)  
- Samuditha Wijenarayana (40224895) 

**Executive summary**  
In this meeting, we reviewed updates and improvements to project elements, starting with a new table design to enhance data clarity and accessibility. A workflow diagram was introduced to illustrate how variables and flows are interconnected, providing a comprehensive view of system interactions. On the backend, we discussed the addition of new criteria for the three key assessment dimensions to refine evaluation metrics. We also addressed ongoing efforts to strengthen project stability through unit tests for both backend and frontend components, aimed at catching issues early and ensuring smoother functionality. Furthermore, we reviewed recent bug fixes and identified new bugs to be addressed in the upcoming sprint. Finally, we assessed the project’s overall progress, confirming we are on track and outlining next steps to maintain our current pace.

1. New Design for the Tables  
   We finalized the new design for the tables, focusing on improving user experience and data visualization. The updated structure aims to make ratings and criteria more accessible, enhancing the overall usability and flow of information on the platform. This change is expected to streamline how users interact with and interpret data.  
     
2. Workflow Diagram for Variables and Flows  
   A detailed workflow diagram was created to map out how variables and flows are interconnected within the system. This diagram will serve as a guide for the team, providing clarity on the relationships between components and helping to identify areas for improvement in system integration.  
     
3. Unit Test: Backend and Frontend  
   We defined the scope of the unit tests as following points:  
- [ ] Unit Test for User Authentication  
      Backend unit tests were created to verify the functionality of the user authentication system, including login, registration, and session management. These tests ensure that the system correctly handles user credentials, prevents unauthorized access, and maintains session integrity. Frontend tests verify that user input is properly validated, and error messages are displayed when authentication fails.  
- [ ] Unit Test for Dashboard  
      Backend tests focus on the correct retrieval and processing of user data for the dashboard, ensuring that information such as user ratings and progress is correctly fetched from the database. Frontend tests ensure that the dashboard renders the user data appropriately and handles any edge cases, such as empty or incomplete data, to provide a seamless user experience.  
- [ ] Unit Test for Rating Feature  
      The backend unit tests for the rating feature verify that the API correctly handles creating, retrieving, and updating ratings. These tests ensure that ratings are stored properly and can be accessed as needed. Frontend tests validate that the ratings are accurately displayed on the user interface, with appropriate error handling and feedback for users.  
- [ ] Unit Test for Rating Views  
      Backend tests for the rating views ensure that the necessary data for both the summary and detailed views of ratings is correctly processed and made available to the frontend. Frontend unit tests validate that the data is displayed accurately in both views, ensuring that the ratings table is populated and formatted correctly, and that the views handle edge cases such as missing or incomplete data.

      

4. Unit Test: Backend and Frontend  
   Unit testing for both backend and frontend components was a focal point. The Vitest testing suite for the frontend was updated, while backend unit tests were expanded to include newly implemented criteria. Additionally, tests will cover the MongoDB integration and various bug fixes, such as the POST request issue related to rating creation.  
     
5. Bugs Fixed and New Bugs  
   Several bugs were resolved, including issues with the POST request for creating ratings. However, new bugs were identified during testing, such as problems with the new criteria not being properly stored in the database. These bugs will be tracked and addressed in the next sprint to maintain the stability of the platform.  
     
6. Progress  
   The team made significant progress on key components, including the MongoDB database updates and the creation of pages for the course summary and detailed ratings view. UI/UX enhancements were also prioritized, and the team is on track to implement acceptance tests for Sprint 3\. All team members are focused on meeting the upcoming sprint goals, ensuring that tasks are completed efficiently and on time.