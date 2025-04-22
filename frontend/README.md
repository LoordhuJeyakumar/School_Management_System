# School Management System Frontend

A modern, responsive React-based frontend for a comprehensive school management system. Built with Material-UI, Redux Toolkit, and modern React practices, this application provides a rich user interface for managing multiple schools, students, teachers, classes, and more.

## 🎯 Features

### Multi-Role User Interface
- Role-specific dashboards (Admin, Teacher, Student)
- Secure authentication and session management
- Role-based access control and navigation
- Personalized user experiences

### Admin Dashboard
- School profile management
- Class and subject administration
- Teacher assignment and management
- Student enrollment and tracking
- Notice board management
- Complaint monitoring
- Performance analytics

### Teacher Dashboard
- Class management interface
- Student attendance tracking
- Exam results management
- Subject-wise student lists
- Performance monitoring tools
- Notice board access
- Complaint management

### Student Dashboard
- Attendance tracking
- Subject-wise performance view
- Exam results display
- Course materials access
- Notice board view
- Complaint submission
- Profile management

## 🏗️ Project Structure

```ascii
frontend/
├── public/                 # Static files
├── src/                    # Source code
│   ├── assets/            # Images and SVGs
│   ├── components/        # Reusable components
│   ├── pages/             # Page components
│   │   ├── admin/        # Admin module
│   │   ├── student/      # Student module
│   │   └── teacher/      # Teacher module
│   ├── redux/            # State management
│   └── App.js            # Root component
```

### 📁 Detailed Directory Structure

#### Components Directory
```ascii
components/
├── AccountMenu.js         # User account dropdown
├── CustomBarChart.js      # Performance charts
├── CustomPieChart.js      # Statistical charts
├── ErrorPage.js          # Error handling
├── Popup.js              # Notifications
├── SeeNotice.js         # Notice display
├── SpeedDialTemplate.js  # Quick actions
├── TableTemplate.js      # Data tables
├── styles.js            # Shared styles
└── utils/               # Utility functions
```

#### Pages Directory
```ascii
pages/
├── admin/
│   ├── classRelated/    # Class management
│   ├── noticeRelated/   # Notice management
│   ├── studentRelated/  # Student management
│   ├── subjectRelated/  # Subject management
│   └── teacherRelated/  # Teacher management
├── student/             # Student views
└── teacher/             # Teacher views
```

#### Redux Store Structure
```ascii
redux/
├── store.js
├── complainRelated/     # Complaint state
├── noticeRelated/      # Notice state
├── sclassRelated/      # Class state
├── studentRelated/     # Student state
├── teacherRelated/     # Teacher state
└── userRelated/        # User state
```

## 🔄 Data Flow

### Redux State Management
1. **Action Dispatch**
   ```javascript
   dispatch(loginUser(credentials))
   ```

2. **Async Operations**
   ```javascript
   export const loginUser = (fields, role) => async (dispatch) => {
     dispatch(authRequest())
     try {
       const result = await axios.post(`${API_URL}/${role}Login`, fields)
       dispatch(authSuccess(result.data))
     } catch (error) {
       dispatch(authError(error))
     }
   }
   ```

3. **State Updates**
   ```javascript
   case 'auth/success':
     state.currentUser = action.payload
     state.status = 'success'
   ```

### Component Hierarchy
```ascii
App
├── AdminDashboard
│   ├── SideBar
│   ├── AdminHomePage
│   └── Various Admin Components
├── TeacherDashboard
│   ├── TeacherSideBar
│   ├── TeacherHomePage
│   └── Various Teacher Components
└── StudentDashboard
    ├── StudentSideBar
    ├── StudentHomePage
    └── Various Student Components
```

## 🛠️ Technical Stack

### Core Technologies
- React 18
- Redux Toolkit
- Material-UI v5
- React Router v6
- Axios
- Recharts

### Development Tools
- Create React App
- ESLint
- Prettier
- React Developer Tools
- Redux DevTools

## 📦 Major Dependencies

```json
{
  "@emotion/react": "^11.x",
  "@emotion/styled": "^11.x",
  "@mui/icons-material": "^5.x",
  "@mui/material": "^5.x",
  "@reduxjs/toolkit": "^1.x",
  "axios": "^1.x",
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-redux": "^8.x",
  "react-router-dom": "^6.x",
  "recharts": "^2.x",
  "styled-components": "^5.x"
}
```

## 🎨 Component Design

### Reusable Components
1. **TableTemplate**
   - Standardized data table
   - Sorting & filtering
   - Pagination support
   - Action buttons

2. **CustomCharts**
   - Performance visualization
   - Attendance tracking
   - Statistical analysis
   - Responsive design

3. **SpeedDial**
   - Quick action access
   - Role-based options
   - Floating action button
   - Customizable actions

## 🔒 Authentication Flow

1. **User Selection**
   ```ascii
   Homepage → ChooseUser → LoginPage → Role-specific Dashboard
   ```

2. **Session Management**
   - Local storage token
   - Redux state persistence
   - Auto-logout on expiry
   - Secure route protection

## 📱 Responsive Design

### Breakpoints
```javascript
const breakpoints = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920
}
```

### Mobile Optimization
- Responsive layouts
- Touch-friendly interfaces
- Conditional rendering
- Optimized images

## 🚀 Getting Started

### Prerequisites
- Node.js >= 14.0.0
- npm >= 6.14.0

### Installation
1. **Clone Repository**
   ```bash
   git clone <repository-url>
   cd frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create .env file:
   ```env
   REACT_APP_BASE_URL=http://localhost:5000/api
   ```

4. **Start Development Server**
   ```bash
   npm start
   ```

## 🔧 Configuration

### Environment Variables
- REACT_APP_BASE_URL: Backend API URL
- REACT_APP_ENV: Development/Production
- REACT_APP_VERSION: Application version

### Build Configuration
```javascript
module.exports = {
  // Netlify configuration
  build: {
    publish: "build",
    command: "npm run build"
  }
}
```

## 📈 Performance Optimization

1. **Code Splitting**
   - Route-based splitting
   - Component lazy loading
   - Dynamic imports

2. **State Management**
   - Normalized Redux store
   - Memoized selectors
   - Optimized re-renders

3. **Asset Optimization**
   - Image compression
   - SVG optimization
   - Bundle size analysis

## 🧪 Testing

### Unit Testing
```bash
npm test
```

### Component Testing
```bash
npm run test:components
```

### End-to-End Testing
```bash
npm run test:e2e
```

## 📝 Code Style Guide

### File Naming
- PascalCase for components
- camelCase for utilities
- kebab-case for assets

### Component Structure
```javascript
import React from 'react'
import PropTypes from 'prop-types'

const ComponentName = ({ prop1, prop2 }) => {
  // Component logic
  return (
    // JSX
  )
}

ComponentName.propTypes = {
  prop1: PropTypes.string.required,
  prop2: PropTypes.number
}

export default ComponentName
```

## 🔍 Debugging

### Redux DevTools
1. Install browser extension
2. Access state tree
3. Time-travel debugging
4. Action replays

### React DevTools
1. Component inspection
2. Performance profiling
3. Hook debugging
4. Props tracking

## 🚀 Deployment

### Build Process
```bash
npm run build
```

### Netlify Deployment
1. Connect repository
2. Configure build settings
3. Set environment variables
4. Deploy application

## 🐛 Known Issues

1. Material-UI SSR hydration
2. Redux persistence conflicts
3. Chart responsiveness
4. Safari date input
5. Mobile navigation edge cases

## 🔜 Future Improvements

1. Implement PWA support
2. Add offline capabilities
3. Enhance accessibility
4. Add I18n support
5. Improve test coverage
6. Add real-time updates
7. Implement dark mode
8. Add export functionality
9. Enhance mobile UX
10. Add data visualization

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📄 License

This project is licensed under the MIT License.

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/)
- [Redux Toolkit Guide](https://redux-toolkit.js.org/)
- [Material-UI Documentation](https://mui.com/)
- [React Router Guide](https://reactrouter.com/)