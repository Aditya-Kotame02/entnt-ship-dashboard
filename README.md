
# ENTNT Ship Maintenance Dashboard

This is a frontend-only React application that simulates a ship maintenance management system. It supports role-based access, management of ships and components, job assignments, calendar scheduling, and KPI dashboards. All data is persisted using localStorage as per the assignment requirements.

This project was submitted as part of the ENTNT Frontend Developer (React) technical assessment.

## Live Demo and Source Code

- **Deployed Application:** [https://entnt-ship-dashboard-egew.vercel.app](https://entnt-ship-dashboard-egew.vercel.app)
- **GitHub Repository:** [https://github.com/Aditya-Kotame02/entnt-ship-dashboard](https://github.com/Aditya-Kotame02/entnt-ship-dashboard)

## Features

### User Authentication (Simulated)

- Hardcoded users with role-based access:
  - `admin@entnt.in` / `admin123`
  - `inspector@entnt.in` / `inspect123`
  - `engineer@entnt.in` / `engine123`
- Authentication state persists via localStorage
- Conditional route access based on user roles

### Ships Management

- Create, edit, delete ships
- View ship details, including general info, installed components, and maintenance history

### Components Management

- Add, update, or remove components under specific ships
- View component details: name, serial number, install date, last maintenance date

### Maintenance Jobs

- Create jobs for components
- Assign engineer, priority, type, and scheduled date
- Track job progress: Open → In Progress → Completed
- Filter jobs by ship, status, and priority

### Maintenance Calendar

- Displays all scheduled jobs in a monthly calendar view
- Selecting a date shows the list of jobs scheduled for that day

### Notification Center

- In-app notifications for job creation, updates, and completion
- Notifications can be dismissed

### KPI Dashboard

- Displays:
  - Total number of ships
  - Components with overdue maintenance
  - Jobs in progress
  - Jobs completed

### Responsive Design

- Fully responsive across desktop, tablet, and mobile
- Built with TailwindCSS for modern UI styling

## Application Navigation

After logging in, the user is redirected to the dashboard. Navigation is handled using React Router v6.

| Route            |                  Description                      |
|------------------|---------------------------------------------------|
| `/`              | Login page                                        |
| `/dashboard`     | KPI dashboard                                     |
| `/ships`         | List and manage ships                             |
| `/ships/:id`     | Detailed view of a ship, its components, and jobs |
| `/jobs`          | Manage maintenance jobs                           |
| `/calendar`      | View scheduled jobs by date                       |

**Role-based access:**

| Role       |                    Access                         |
|------------|---------------------------------------------------|
| Admin      | Full access to all features                       |
| Inspector  | Can view ships, create and update jobs            |
| Engineer   | Can view assigned jobs and mark them as completed |

## Technology Stack

- React
- React Router v6
- Context API
- TailwindCSS
- react-calendar
- localStorage (for data persistence)

## Project Structure

    src/
    ├── components/
    │   ├── Calendar/
    │   ├── Notifications/
    │   └── Ships/
    ├── context/
    ├── pages/
    ├── routes/
    ├── utils/
    ├── App.jsx
    └── index.js

## Installation and Running Locally

1. Clone the repository:

       git clone https://github.com/Aditya-Kotame02/entnt-ship-dashboard.git
       cd entnt-ship-dashboard

2. Install dependencies:

       npm install

3. Start the development server:

       npm start

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## User Roles and Credentials

| Role      | Email               | Password    |
|-----------|---------------------|-------------|
| Admin     | admin@entnt.in      | admin123    |
| Inspector | inspector@entnt.in  | inspect123  |
| Engineer  | engineer@entnt.in   | engineer123 |

## Known Issues or Limitations

- Data is stored only in localStorage (no backend/API)
- Hardcoded users and simulated authentication
- No drag-and-drop or calendar rescheduling features
- Cannot reassign components between ships

## Technical Considerations

- Used Context API for state sharing across components
- TailwindCSS for responsive and maintainable styling
- Data models are stored and retrieved from localStorage
- Role-based access handled in routes using ProtectedRoute

## Submission Details

- GitHub Repository: [https://github.com/Aditya-Kotame02/entnt-ship-dashboard](https://github.com/Aditya-Kotame02/entnt-ship-dashboard)
- Deployed Link: [https://entnt-ship-dashboard-egew.vercel.app](https://entnt-ship-dashboard-egew.vercel.app)
- Submitted to: hr@entnt.in

## Author

**Aditya Kotame**  
Email: adityakotame17@gmail.com  
LinkedIn: [https://www.linkedin.com/in/aditya-kotame](https://www.linkedin.com/in/aditya-kotame)
