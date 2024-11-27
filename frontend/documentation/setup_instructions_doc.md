# Setup Instructions for Frontend

This guide provides step-by-step instructions to set up the **PeerPro - Collaborative Assessment System** frontend application on your local machine.

---

## Table of Contents

1. [Clone the Repository](#1-clone-the-repository)
2. [Install Dependencies](#2-install-dependencies)
3. [Environment Setup](#3-environment-setup)
4. [Run the Application](#4-run-the-application)

---

## **1. Clone the Repository**

To begin, clone the project repository from GitHub.

### Steps:

1. Open your terminal or command prompt.
2. Navigate to the folder where you want to store the project.
3. Run the following command:

```bash
git clone https://github.com/JayC-SF/GoVite.Inc-SOEN341_Project_F24.git

cd frontend
```

## **2. Install Dependencies**

Once the repository is cloned, install the required dependencies.

### Steps:

1. Ensure you are in the `frontend` folder:

```bash
cd frontend
```

2. Run the following command:

```bash
npm install
```

This will install all the packages listed in `package.json`.

## **3. Environment Setup**

The application uses environment variables for configuration.

### Steps:

1. Create a `.env` file:

   - Copy the `.env.example` file provided in the project:

```bash
cp .env.example .env
```

2. Open the `.env` file and configure the necessary variables.

```env
REACT_APP_API_URL=https://api.example.com
```

## **4. Run the Application**

Once the setup is complete, start the development server.

### Steps:

1. Ensure you are in the frontend directory.

2. Run the following command to start the development server:

```bash
npm start
```

3. Open your browser and navigate to:

```arduino
 http://localhost:5173/
```

<br>

## Notes

- **Hot Reloading**: Changes made to the source files will automatically reflect in the browser.

- **Common Issues**: If you encounter issues, ensure that all prerequisites are installed (see [Prerequisites Documentation](./prerequisites_doc.md)).

You're now ready to use the application! For more details, refer to the [Project Overview Documentation](./project_overview_doc.md).
