# School Management System Frontend

A modern, responsive React-based dashboard application for managing educational institutions. This frontend application provides role-specific interfaces for administrators, teachers, and students with real-time data visualization and intuitive navigation.

## 🌟 Features

### Role-Based Access Control
- Separate dashboards for administrators, teachers, and students
- Secure authentication with role-specific redirects
- Guest mode for demo purposes
- Protected routes and authenticated API access

### Admin Dashboard
- School profile management
- Student and teacher registration/management
- Class and subject organization
- Notice board administration
- Complaint management system
- Real-time statistics and data visualization

### Teacher Dashboard
- Class management and student tracking
- Attendance recording and management
- Student performance tracking
- Subject-specific grade management
- Complaint submission system
- Profile management

### Student Dashboard
- Attendance tracking with visual statistics
- Subject-wise performance monitoring
- Real-time grade access
- Notice board viewing
- Complaint submission
- Profile management

## 🛠️ Technical Stack

### Core Technologies
- **React** (v18.2.0) - UI framework
- **Redux Toolkit** (v1.9.5) - State management
- **React Router** (v6.10.0) - Navigation
- **Material UI** (v5.12.1) - Component library
- **Styled Components** (v5.3.10) - Styling
- **Axios** (v1.3.6) - API communication
- **Recharts** (v2.6.2) - Data visualization

### Key Dependencies
- @mui/icons-material - UI icons
- @mui/lab - Advanced Material UI components
- react-countup - Animated statistics
- dotenv - Environment configuration

## 📁 Project Structure

```ascii
frontend/
├── public/                 # Static files and entry HTML
├── src/                    # Source code directory
│   ├── components/        # Reusable UI components
│   │   ├── charts/       # Data visualization components
│   │   └── templates/    # Layout templates
│   ├── pages/            # Role-specific pages
│   │   ├── admin/       # Admin dashboard
│   │   ├── teacher/     # Teacher dashboard
│   │   └── student/     # Student dashboard
│   ├── redux/           # State management
│   │   ├── userRelated/    # User authentication
│   │   ├── studentRelated/ # Student data
│   │   ├── teacherRelated/ # Teacher data
│   │   ├── sclassRelated/  # Class management
│   │   ├── noticeRelated/  # Notice board
│   │   └── complainRelated/# Complaints
│   ├── assets/          # Images and static resources
│   ├── App.js           # Root component
│   └── index.js         # Application entry
└── package.json         # Project configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Active internet connection for CDN resources

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create .env file:
```env
REACT_APP_BASE_URL=http://localhost:5000
```

4. Start development server:
```bash
npm start
```

## 🔄 State Management

### Redux Store Structure
- user: Authentication and user profile
- student: Student-related data
- teacher: Teacher-related data
- notice: Notice board management
- complain: Complaint system
- sclass: Class management

### Data Flow
```ascii
User Action → Redux Action → API Call → Redux Reducer → State Update → UI Update
```

## 📱 Responsive Design

- Mobile-first approach
- Responsive navigation with collapsible sidebar
- Adaptive data visualization components
- Flexible grid layouts
- Touch-friendly interface elements

## 🔒 Security Features

- JWT-based authentication
- Protected route guards
- Role-based access control
- Secure credential handling
- HTTP-only cookies
- XSS protection

## 🎨 UI/UX Features

### Components
- Custom Material-UI theme
- Responsive data tables
- Interactive charts and graphs
- Dynamic forms with validation
- Toast notifications
- Loading indicators
- Modal dialogs

### Navigation
- Role-specific sidebars
- Breadcrumb navigation
- Quick action menus
- Profile dropdown
- Nested routes

## 📊 Data Visualization

### Charts and Graphs
- Attendance pie charts
- Performance bar charts
- Statistical counters
- Progress indicators
- Timeline views

## 🔧 Development Tools

### Available Scripts
- `npm start`: Development server
- `npm build`: Production build
- `npm test`: Run tests
- `npm eject`: Eject from Create React App

### Environment Configuration
- Development: .env.development
- Production: .env.production
- Testing: .env.test

## 🌐 API Integration

### Endpoints
- Authentication: /api/auth/*
- Students: /api/students/*
- Teachers: /api/teachers/*
- Classes: /api/classes/*
- Subjects: /api/subjects/*
- Notices: /api/notices/*
- Complaints: /api/complaints/*

## 🐛 Troubleshooting

### Common Issues
1. Authentication Errors
   - Verify token expiration
   - Check credentials
   - Clear local storage

2. Loading Issues
   - Check API connectivity
   - Verify Redux state
   - Console for errors

3. Display Problems
   - Clear browser cache
   - Check responsive breakpoints
   - Verify data format

## 📚 Additional Resources

- [Material-UI Documentation](https://mui.com/)
- [Redux Toolkit Guide](https://redux-toolkit.js.org/)
- [React Router Documentation](https://reactrouter.com/)
- [Recharts Examples](https://recharts.org/)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📝 License

This project is licensed under the ISC License.