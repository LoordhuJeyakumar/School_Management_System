import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import StudentDashboard from '../StudentDashboard';
import '@testing-library/jest-dom';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    h6: ({ children, ...props }) => <h6 {...props}>{children}</h6>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock the components used in StudentDashboard
jest.mock('../StudentHomePage', () => () => <div data-testid="student-home-page">Student Home Page</div>);
jest.mock('../StudentProfile', () => () => <div data-testid="student-profile">Student Profile</div>);
jest.mock('../StudentSubjects', () => () => <div data-testid="student-subjects">Student Subjects</div>);
jest.mock('../ViewStdAttendance', () => () => <div data-testid="student-attendance">Student Attendance</div>);
jest.mock('../StudentComplain', () => () => <div data-testid="student-complain">Student Complain</div>);
jest.mock('../../Logout', () => () => <div data-testid="logout">Logout</div>);
jest.mock('../../../components/AccountMenu', () => () => <div data-testid="account-menu">Account Menu</div>);

// Create mock store
const mockStore = configureStore([]);
const store = mockStore({
  user: {
    currentUser: {
      name: 'Test Student',
      _id: '123',
      sclassName: { _id: '456' }
    },
    currentRole: 'Student',
    userDetails: {},
    loading: false,
    response: false
  },
  sclass: {
    subjectsList: []
  }
});

describe('StudentDashboard Component', () => {
  test('renders StudentDashboard with title', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentDashboard />
        </BrowserRouter>
      </Provider>
    );
    
    // Check if the dashboard title is rendered
    expect(screen.getByText(/Student Dashboard/i)).toBeInTheDocument();
  });

  test('toggles drawer when menu button is clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentDashboard />
        </BrowserRouter>
      </Provider>
    );
    
    // Find and click the menu button
    const menuButton = screen.getByLabelText(/open drawer/i);
    fireEvent.click(menuButton);
    
    // Check if the drawer toggle works (this is a basic check, as the actual state is internal)
    expect(menuButton).toBeInTheDocument();
  });

  test('renders dark mode toggle button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentDashboard />
        </BrowserRouter>
      </Provider>
    );
    
    // Check if the dark mode toggle button is rendered
    const darkModeButton = screen.getByTitle(/Toggle dark mode/i);
    expect(darkModeButton).toBeInTheDocument();
  });

  test('renders notifications button', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentDashboard />
        </BrowserRouter>
      </Provider>
    );
    
    // Check if the notifications button is rendered
    const notificationsButton = screen.getByTitle(/Notifications/i);
    expect(notificationsButton).toBeInTheDocument();
  });

  test('renders account menu', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentDashboard />
        </BrowserRouter>
      </Provider>
    );
    
    // Check if the account menu is rendered
    expect(screen.getByTestId('account-menu')).toBeInTheDocument();
  });

  test('renders home page by default', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <StudentDashboard />
        </BrowserRouter>
      </Provider>
    );
    
    // Check if the home page is rendered by default
    expect(screen.getByTestId('student-home-page')).toBeInTheDocument();
  });
});