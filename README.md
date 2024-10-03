# SOEN341 Project (Fall 2024)

## Objective

The mission of this project is to create a robust, user-friendly Peer Assessment Application that empowers students to provide constructive and anonymous feedback on their teammates' performance. By evaluating contributions across critical dimensions cooperation, conceptual and practical contribution, and work ethic the system fosters accountability and enhances team dynamics. Instructors gain actionable insights through an intuitive dashboard, enabling efficient team management and data-driven analysis to support academic growth and collaboration.

## Project

This Peer Assessment Application is designed to streamline the process of evaluating teamwork in university group projects. The application allows students to anonymously assess their peers across four key performance dimensions: cooperation, conceptual contribution, practical contribution, and work ethic. By providing structured feedback, the system encourages accountability and helps improve team collaboration.

Instructors can easily manage teams and track student progress through a comprehensive dashboard that displays aggregated scores and detailed assessments. The system also supports CSV export of the evaluation results, making it easier for instructors to analyze performance and provide guidance. The application is built with scalability in mind, ensuring it can be adapted for different academic environments and expanded with new features in future iterations.

## Installation Process

## Pre-requisites

Ensure you have the following software installed on your machine:

- Git: For version control and collaboration.
- NVM (Node Version Manager): To manage Node.js versions.
- Go: For backend development.

## Steps

#### 1. Clone the Repository

First, clone the project repository from GitHub to your local machine :

```bash
git clone https://github.com/<team_name>/<repo_name>.git
cd <repo_name>
```

#### 2. Frontend Setup

- Navigate to the frontend directory :

```bash
cd frontend/
```

- Install all required frontend libraries and dependencies :

```bash
npm install
```

- To build the production ready version of the frontend, run the code which will generate the dist/ folder containing the optimized frontend assets :

```bash
npm run build
```

- To host the frontend locally by running which will start a local development server, and the application will be accessible :

```bash
npm run dev

http://localhost:8080
```

#### 3. Backend Setup

- Navigate to the backend directory :

```bash
cd backend/
```

- To host the backend server :

```bash
go run main.go
```

## Collaborators

| Name                     | Concordia ID | Roles                     |
| ------------------------ | ------------ | ------------------------- |
| Anh Thien Nguyen         | 40122030     | Full-stack dev            |
| Daniel Lam               | 40248073     | Scrum master & Full-stack |
| Juan-Carlos Sreng-Flores | 40101813     | Team Lead & Full-stack    |
| Ming-Yang Calvin Lee     | 40264581     | Front-end dev & UX        |
| Mouhamed Coundoul        | 40248237     | Front-end dev & UX        |
| Samuditha Wijenarayana   | 40224895     | Back-end dev              |

**<u><mark>NOTE: Although some people have more roles than others, the work will be distributed fairly among all members of the project in terms of effort.</mark></u>**

Roles are not strictly upheld. The nature of the project's framework makes it so every member touches on multiple aspects of the project during development.

## Technologies

⚫ Frontend: HTML, CSS, TypeScript, Vite + React

⚫ Backend: Gin, Golang

⚫ Database: MongoDB

⚫ Version Control: Git, GitHub

⚫ Other Libraries: Tailwind CSS

## CopyRight

© 2024 GoVite.Inc. All rights reserved.

## References

```md
- [Agile Manifesto](https://agilemanifesto.org/) - The foundational document outlining the core values and principles of Agile development.
- [Scrum Guide](https://www.scrumguides.org/scrum-guide.html) - Comprehensive guide to the Scrum framework, including roles and practices.
- [Peer Assessment: A Review of Literature](https://www.sciencedirect.com/science/article/pii/S0360131517301135) - An academic review discussing the effectiveness and challenges of peer assessment in educational settings.
```
