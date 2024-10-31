# Peer Assessment Application Meeting \- Minutes 2.2

Date: 2024/10/04

**Members presented**

- Anh Thien Nguyen (40122030)  
- Daniel Lam (40248073)  
- Juan-Carlos Sreng-Flores (40101813)  
- Ming-Yang Calvin Lee (40264581)  
- Mouhamed Coundoul (40248237)  
- Samuditha Wijenarayana (40224895) 

**Executive summary**  
This meeting focused on refining the UX design and requirements for Sprint 2, specifically for the teacher’s and student’s views within the project. Key discussions included the layout and functionality of the dashboard, class, and group pages to ensure each user role has distinct permissions and interactions. Teachers will have options for class and group management, such as creating and deleting classes and groups, while students will have a restricted view focused on participation and peer assessments. Additional considerations were raised regarding the rating interface and its anonymity, with plans to further define these elements in upcoming sprints.

1. UX  
- Focused on refining user interface elements and interactions to create clear, user-friendly experiences tailored for both teachers and students in Sprint 2\.  
- Emphasized a user-centered design by ensuring each role has well-defined permissions and interactions that align with their responsibilities within the platform.  
- Identified potential usability issues in the rating system and group management features, planning to address these for improved navigation and clarity.  
2. Requirement Specification for Sprint 2  
- Outlined critical features for Sprint 2, including user-specific dashboard functionality, class and group management tools, and peer assessment capabilities.  
- Clarified feature requirements, prioritizing essential elements like user authentication and team management while setting foundations for the student rating system.  
- Defined clear acceptance criteria for each feature to streamline development and testing, ensuring alignment with project goals.


  


3. Design Questions  
- Addressed key design challenges, particularly regarding the student rating system and its implementation.  
- Discussed potential methods for structuring the rating page, including considerations of anonymity and comprehensive rating options to support fair peer evaluations.  
- Scheduled additional iterations on the rating page design for future sprints to finalize its structure and improve usability.  
- Design webpages using Figma.  
    
4. Teacher’s View  
- **Dashboard**: Centralized dashboard for teachers, allowing them to view all classes with options to create and delete classes, while students have a restricted dashboard listing only their assigned classes.  
- **Class Page**: Teachers can view and manage groups within each class, including creating and deleting groups and viewing unassigned students, while students have limited access to view groups without modification capabilities.  
- **Group Page**: Teachers can add or remove students within groups for class organization, while students can view group members and rate peers but cannot modify group membership.


5. Student’s View  
- Limited dashboard and class views for students, focusing on participation, allowing access to classes and groups without management capabilities for a simplified user experience.  
- Reviewed peer rating functionality, ensuring students rate all group members at once for fairness, with plans to allow rating edits and to encourage honest feedback through rating anonymity.

6. Rating Page Design  
- Explored multiple approaches for structuring the rating page to provide a user-friendly interface for students to rate all group members in one session.  
- Emphasized clear instructions and a cohesive layout on the rating page to simplify the rating process.  
- Planned for further refinement of the rating page design based on user feedback and requirements identified in future sprints.  
    
7. User Role Permissions Table

| Page | User Role | Permissions |
| :---- | :---- | :---- |
| Dashboard Page | Teacher | \- View a list of all classes (clickable to view and redirect to a class page) \- Button to create a new class \- Delete class button |
|   | Student | \- View only assigned classes \- Cannot see the create class button \- Cannot see the delete class button |
| Class Page | Teacher | \- View a list of groups \- Button to create a new group (assigns students to a group) \- Delete group button \- View list of unassigned students |
|   | Student | \- View a list of groups (cannot click to view other groups) \- Cannot delete or create groups \- Cannot see unassigned students |
| Group Page | Teacher | \- View list of students in the group \- Button to add a student to the group \- Button to remove a student from the group \- Cannot rate a student |
|   | Student | \- View list of group members \- Button to rate specific students (all at once; cannot rate only some students) \- Cannot rate self; rating is anonymous |
| Rating | Student | \- Button to edit ratings on group members |

