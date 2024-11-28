# Project Folder Structure

This document explains the structure of the `frontend` directory in the PeerPro project. Understanding the organization of the files will help contributors navigate and modify the codebase effectively.

---

## Folder Structure Overview

The `frontend` folder is organized to maintain modularity, reusability, and scalability in the project. Below is a detailed structure:

```plaintext
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/           # Main application pages
│   ├── context/         # State management logic
│   ├── services/        # API calls and business logic
│   ├── assets/          # Static files (images, fonts, etc.)
│   └── App.tsx          # Main application entry point
├── public/              # Public assets served by React
├── .env                 # Environment variables
├── package.json         # Project dependencies and scripts
├── README.md            # Documentation file
└── tsconfig.json        # TypeScript configuration file
```

<br>

# `src/`

The `src` folder contains all the source code for the frontend application. It is divided into subfolders to ensure the project remains modular and easy to maintain.

### 1. `components/`

The `components` folder contains reusable UI elements and shared logic that can be used across multiple parts of the application. Each component resides in its own folder, containing:

- Component Logic: (`ComponentName.tsx`)

- Styling: (`ComponentName.module.css` or `.scss`)

- Tests: (`ComponentName.test.tsx`), if applicable.

```plaintext
components/
├── Button/
│   ├── Button.tsx         # Button component logic
│   ├── Button.module.css  # Styling for the Button
│   └── Button.test.tsx    # Tests for the Button component
├── Navbar/
│   ├── Navbar.tsx
│   ├── Navbar.module.scss
│   └── Navbar.test.tsx
```

### 2. `pages/`

The `pages` folder contains the main pages of the application. These are typically mapped to specific routes in the app.

```plaintext
pages/
├── Login.tsx        # Login page
├── Dashboard.tsx    # Dashboard page
└── Assessment.tsx   # Peer assessment page
```

Each file in `pages` represents a significant section of the app and integrates components from the `components/` folder.

### 3. `context/`

The `context` folder manages the application's state using the React Context API or another state management library like Redux.

```plaintext
context/
├── AuthContext.tsx    # Handles user authentication state
├── ThemeContext.tsx   # Manages theme (dark/light mode)
└── AppContext.tsx     # Global state for app-level logic
```

### 4. `services/`

The `services` folder contains utility files and service classes for handling API requests, data transformations, and other business logic.

```plaintext
services/
├── apiClient.ts        # Axios instance setup for API requests
├── authService.ts      # Authentication-related API calls
└── assessmentService.ts # Peer assessment API logic
```

### 5. `assets/`

The `assets` folder stores static files, including images, fonts, and icons, used throughout the application.

```plaintext
assets/
├── images/
│   ├── logo.png       # Application logo
│   └── background.jpg # Background image for login
├── fonts/
│   ├── Roboto.ttf     # Font files
└── icons/
    ├── checkmark.svg  # SVG icons
    └── arrow.svg
```

### 6. `App.tsx`

The `App.tsx` file serves as the entry point for the React application. It includes:

- Application layout.

- Routing configuration.

- Global providers (e.g., Context Providers).

<br>

# `public`

The `public` folder contains static assets that do not get processed by Webpack. These files are served as-is.

**_Key Files:_**

- `index.html`: The root HTML template where the React app is mounted.
- `favicon.ico`: The favicon for the website.

<br>

```plaintext
public/
├── index.html
├── favicon.ico
└── manifest.json  # Metadata for the Progressive Web App (PWA)
```

<br>

# Root Files and Configurations

### 1. `.env`

The `.env` file contains environment variables used in the application. These variables can include:

```plaintext
REACT_APP_API_URL=https://api.example.com
```

### 2. `package.json`

This file manages the project's dependencies, scripts, and metadata.

**Key Sections:**

- Scripts: Commands for running and building the app.
- Dependencies: Lists libraries like React, Axios, etc.

### 3. `tsconfig.json`

This file configures TypeScript settings for the project. For example:

```json
{
  "compilerOptions": {
    "target": "ES6",
    "module": "commonjs",
    "jsx": "react",
    "strict": true
  }
}
```

<br>

# Contribution Guidelines for Folder Structure

To maintain consistency:

1. Place all reusable components in the `components/` folder.

2. Keep page-specific logic confined to the `pages/` folder.

3. Use **PascalCase** for component and folder names.
   Avoid duplicating static files—store them in `assets/`.
