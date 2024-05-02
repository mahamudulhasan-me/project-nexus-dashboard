# Project Nexus Dashboard

**Live Preview:** [Live Preview](https://project-nexus-dashboard.vercel.app/)

### Credential

- **Email:** admin@nexusProject.com
- **Password:** 123

## Overview

The Project Management Dashboard is a web application designed to assist users in managing projects, tasks, and team members efficiently. It provides a user-friendly interface for accessing project information, managing tasks, and tracking project progress.

## Features

### Authentication Page

- **Login Form:** Users can log in using a login form with validation. Ant Design components are used for form elements, and validation feedback is provided.
- **Mock Authentication:** Backend authentication is not implemented. Instead, mock responses are used for successful and unsuccessful logins.

### Projects Overview Page

- **Projects List:** Displays a list of projects with options to view, edit, or delete.
- **Data Fetching:** Utilizes React Query for fetching project data from a mock API.

### Project Details Page

- **Project Information:** Provides detailed information about selected projects, including tasks, team members, and recent activities.
- **Task Management:** Users can add new tasks, edit existing tasks, and assign team members to tasks.

### Task Management

- **Task CRUD Operations:** Users can perform CRUD operations on tasks, including adding, editing, and marking tasks as completed.
- **Drag-and-Drop:** Implements drag-and-drop functionality to change the status of tasks using Zustand for state management.

### Task Filters and Search Functionality

- **Filters:** Allows users to filter tasks by status, due date, or assignee.
- **Search:** Provides a search bar for quickly finding tasks.

### Interactive Dashboard

- **UI Components:** Utilizes Ant Design for creating interactive components such as modals, dropdowns, and tooltips.
- **Responsive Design:** Ensures responsiveness using Tailwind CSS for custom styling and layout.

## Technical Details

### Framework

- **Next.js:** Used for routing and server-side rendering.

### Data Fetching

- **React Query:** Handles asynchronous data fetching, state management, and cache management.

### UI Components

- **Ant Design:** Incorporates pre-built UI components to enhance user experience.

### Styling

- **Tailwind CSS:** Implements responsive design and custom styling requirements.
