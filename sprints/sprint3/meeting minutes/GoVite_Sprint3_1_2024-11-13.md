# Peer Assessment Application Meeting \- Minutes 3.3

**Date**: 2024/11/13

**Members Present**:

* Anh Thien Nguyen (40122030)  
* Daniel Lam (40248073)  
* Juan-Carlos Sreng-Flores (40101813)  
* Ming-Yang Calvin Lee (40264581)  
* Mouhamed Coundoul (40248237)

### **Executive Summary**

In this meeting, we reviewed Sprint 3’s achievements and areas for improvement, particularly focusing on enhancing test coverage and refining API responses. We assigned tasks for Sprint 4 based on member expertise and discussed strategies to improve documentation, streamline sprint planning, and handle branching more efficiently in Git. We also set goals for integrating user feedback on the interface and began planning for a load testing phase. Regular collaboration was encouraged to resolve any issues as they arise and ensure alignment across tasks.

### **Reflections on Sprint 3: Achievements and Challenges**

The team recognized several successes from the previous sprint, including:

* Completing core functionality for the Instructor Dashboard.  
* Implementing the Dimension-Based Assessment feature, though refinements are still needed.

Challenges identified included:

* Lower-than-expected test coverage for backend services.  
* Difficulty maintaining consistent API response formats, which led to a minor miscommunication with the front-end team.

**Improvements:** For this sprint, we plan to increase test coverage by dedicating more time to automated testing, improve documentation for our API, and streamline communication to address potential misalignments early.

### 

### 

### 

### 

### **Task Allocation**

Tasks for Sprint 4 were assigned with a focus on each team member's skills and interests:

* **Front-End Tasks**:  
  * **Mouhamed** will focus on refining the Dimension-Based Assessment UI, ensuring it aligns with user expectations.  
  * **Calvin** will lead the implementation of the new feedback modal, integrating peer review ratings into a visually appealing and accessible design.  
* **Back-End Tasks**:  
  * **Juan-Carlos** will be responsible for enhancing API response consistency and documenting each endpoint.  
  * **Daniel** will add load testing scripts to the Go application and document the test setup for future sprints.  
* **Shared Tasks**:  
  * All team members will work together on documentation to clarify workflows and task dependencies for future contributors.

### **Branching and Merging Protocols**

To address challenges with Git branching:

* We agreed to establish dedicated feature branches and regularly merge smaller changes to avoid large, complex merges at the end of the sprint.  
* **New Guidelines**: Team members should pull the latest updates from `main` before starting their work each day and clearly document any changes that might impact other branches.

### **API Response Consistency**

Standardizing API responses is crucial for seamless front-end and back-end integration. To achieve this:

* Each response will follow a defined structure, including standard error messages, and consistent data formats.  
* The team agreed to implement this change incrementally, with Anh Thien overseeing the standardization process and documenting the guidelines for future development.

### **User Interface Feedback Integration**

Based on initial feedback from users, the team prioritized several UI improvements:

* Enhancing the readability of the peer assessment summary.  
* Making the navigation intuitive by adding tooltips and hints where necessary.

Daniel and Juan-Carlos will collaborate on this, with a mid-sprint check-in to review progress and gather any additional user feedback before finalizing updates.

### **Documentation and Sprint Planning**

To support future sprints:

* A shared document was created to outline sprint objectives and task dependencies, allowing all team members to access up-to-date information.  
* We established a “Task Planning” session at the start of each sprint to clarify objectives and task interdependencies, ensuring alignment on expectations.

### **Sprint 4 Requirements**

For Sprint 4, the following tasks were identified as priorities:

1. **UI Refinements**: Finalize the Dimension-Based Assessment UI, addressing any remaining feedback from user testing.  
2. **API Documentation and Response Standardization**: Ensure all API endpoints follow a consistent response format and are fully documented.  
3. **Load Testing Setup**: Create scripts for load testing, focusing on core functionalities like user login and rating submissions.  
4. **Feedback Modal**: Implement and test the feedback modal to improve the peer review experience.

### **Acceptance Testing for Sprint 4**

Acceptance criteria were set for Sprint 4 to ensure functionality meets expectations. Each feature will be tested based on defined success metrics, with any necessary refinements completed before the end of the sprint. These tests will cover:

* The new feedback modal’s usability.  
* Consistency in API responses.  
* Load test results, ensuring the application can handle anticipated user volumes.  
  