# Peer Assessment Application Meeting \- Minutes 3.1

Date: 2024/11/01

**Members presented**

- Anh Thien Nguyen (40122030)  
- Daniel Lam (40248073)  
- Juan-Carlos Sreng-Flores (40101813)  
- Ming-Yang Calvin Lee (40264581)  
- Mouhamed Coundoul (40248237)

**Executive summary**  
In this meeting, we reviewed last sprint’s outcomes, identifying effective practices to continue, such as our integration approach, while addressing areas for improvement, including merge conflict resolution, task adherence, and accountability. For Sprint 3, we agreed to assign tasks based on team members' strengths, with a focus on implementing unit tests for existing features. We also discussed the requirements for completing Dimension-Based Assessment and Instructor Dashboard features, breaking them into clear tasks with acceptance criteria. Additionally, we standardized GitHub issue creation and labeled tasks for streamlined tracking. We scheduled a mid-sprint check-in to monitor progress and make necessary adjustments

1. Reflections of Last Sprint: What Went Well and What Didn't  
   We reviewed the progress from the previous sprint and acknowledged areas where we performed well, such as completing the initial tasks for user authentication and the basic peer assessment interface. We also identified challenges with merge conflicts, which slowed down development, and some difficulties with testing. To improve, we agreed to better communicate code updates and establish clearer guidelines to minimize conflicts. Additionally, the integration between front-end and back-end required more coordination than initially anticipated, but we found success in addressing the majority of the functionality.  
     
2. Task assignation  
   Tasks for Sprint 3 were assigned with the alignment of each team member's strengths and experience. Front-end tasks, such as developing unit tests for the Vitest testing suite, UI/UX enhancements, and creating new pages for the course summary and detailed ratings view, were delegated to the front-end developers. Backend developers were tasked with Go testing, adding new variables to the MongoDB database, implementing backend unit tests, and resolving bugs such as the POST request issue for creating a rating. All team members are encouraged to collaborate on tasks outside their primary roles to foster skill development.  
     
3. Merge Conflicts  
   To address ongoing merge conflicts, we agreed on a strategy of frequent commits, clear communication on changes, and smaller, more frequent merges. We also set up a protocol for resolving conflicts early in the process to avoid delays. All team members are encouraged to pull from the main branch regularly and communicate any conflicting changes immediately.  
     
4. Respect Assignments  
   We emphasized the importance of respecting individual assignments and the deadlines associated with them. Each team member must ensure that tasks are completed as outlined, and if any challenges arise, they should seek support early to avoid project delays.  
     
5. Unit Tests for Features  
   Unit testing remains a priority, with each developer assigned to create and implement tests for their respective features. For the front-end, Vitest testing suite will be used, while for the backend, Go testing will be implemented. We also discussed incorporating unit tests for the new MongoDB variables and the bug fix for the POST request related to rating creation. Unit tests will be integrated into the continuous integration pipeline to automate testing in future sprints.  
     
6. Web Workflow  
   The workflow for the web development was reviewed, and adjustments were made to ensure smoother integration between the front-end and back-end teams. The front-end developers will focus on UI/UX enhancements, while the back-end developers will continue working on database schema changes and resolving issues related to the API and POST requests. We also agreed to streamline communication between both teams, with regular check-ins to ensure alignment.  
     
7. Sprint 3 Requirements  
   For Sprint 3, the following tasks were prioritized based on the instructions:  
- [ ] Completing the implementation of the remaining assessment dimensions (Conceptual Contribution, Practical Contribution, and Work Ethic) and adding comment boxes for each dimension.  
- [ ] Designing and implementing the summary and detailed views for the ratings table on the course page, including both front-end and back-end components.  
- [ ] Fixing the bug related to the POST request for creating ratings and ensuring its functionality across all components.  
- [ ] Creating unit tests for features implemented in previous sprints, focusing on both front-end and back-end testing suites (Vitest for the front-end and Go for the back-end).  
- [ ] Adding new variables to the MongoDB database and ensuring they are correctly integrated into the system.  
        
8. Acceptance Test for Sprint 3  
   Acceptance tests were created for Sprint 3 to verify the completion and functionality of key features, including the Dimension-Based Assessment, Instructor Dashboard, and ratings submission process. Each feature will be tested against defined acceptance criteria, and successful completion will be tracked through GitHub issues. The test will ensure that each component functions as expected before moving into future sprints.