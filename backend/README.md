# School Management System Backend

A robust and scalable REST API built with Node.js, Express, and MongoDB that powers a comprehensive school management system. This backend system supports multiple schools with role-based access control, student/teacher management, class organization, subject handling, attendance tracking, exam results, notices, and complaints management.

## 🚀 Features

### Authentication & Authorization
- Multi-role authentication (Admin, Teachers, Students)
- Secure password hashing using bcrypt
- Role-based access control for different API endpoints

### School Administration
- School registration and management
- Multiple schools support with isolated data
- Comprehensive school profile management

### Class Management
- Create and manage multiple classes
- Assign teachers to classes
- Track class-wise students and subjects
- Automatic cleanup of related data on class deletion

### Student Management
- Student registration and profile management
- Roll number validation within class scope
- Attendance tracking for each subject
- Exam result recording and management
- Session-wise attendance limits

### Teacher Management
- Teacher registration and profile management
- Subject assignment system
- Class assignment capabilities
- Attendance tracking
- Relationship management with subjects and classes

### Subject Management
- Subject creation with unique subject codes
- Session tracking for each subject
- Teacher assignment system
- Class-wise subject organization

### Attendance System
- Student attendance tracking per subject
- Session-wise attendance limitations
- Teacher attendance management
- Bulk attendance operations
- Attendance reports and statistics

### Examination System
- Record and manage exam results
- Subject-wise marks tracking
- Result updates and modifications
- Student performance tracking

### Notice Board
- School-wide notice creation
- Notice updating and management
- Selective notice visibility
- Notice archival system

### Complaint Management
- Student complaint submission
- School-wise complaint tracking
- Complaint status management

## 📝 API Endpoints

### Admin Routes
```javascript
POST /api/AdminReg         // Register new admin/school
POST /api/AdminLogin       // Admin authentication
GET  /api/Admin/:id        // Get admin details
```

### Student Routes
```javascript
POST   /api/StudentReg              // Register new student
POST   /api/StudentLogin           // Student authentication
GET    /api/Students/:id           // List all students
GET    /api/Student/:id            // Get student details
PUT    /api/Student/:id            // Update student info
DELETE /api/Student/:id            // Delete student
PUT    /api/UpdateExamResult/:id   // Update exam results
PUT    /api/StudentAttendance/:id  // Mark/update attendance
```

### Teacher Routes
```javascript
POST   /api/TeacherReg           // Register new teacher
POST   /api/TeacherLogin         // Teacher authentication
GET    /api/Teachers/:id         // List all teachers
GET    /api/Teacher/:id          // Get teacher details
PUT    /api/TeacherSubject      // Update teacher's subject
DELETE /api/Teacher/:id         // Delete teacher
POST   /api/TeacherAttendance/:id // Mark teacher attendance
```

### Class Routes
```javascript
POST   /api/SclassCreate        // Create new class
GET    /api/SclassList/:id     // List all classes
GET    /api/Sclass/:id         // Get class details
GET    /api/Sclass/Students/:id // Get class students
DELETE /api/Sclass/:id         // Delete class
```

### Subject Routes
```javascript
POST   /api/SubjectCreate      // Create new subject
GET    /api/AllSubjects/:id    // List all subjects
GET    /api/ClassSubjects/:id  // Get class subjects
GET    /api/Subject/:id        // Get subject details
DELETE /api/Subject/:id        // Delete subject
```

### Notice Routes
```javascript
POST   /api/NoticeCreate      // Create new notice
GET    /api/NoticeList/:id    // List all notices
PUT    /api/Notice/:id        // Update notice
DELETE /api/Notice/:id        // Delete notice
```

### Complaint Routes
```javascript
POST /api/ComplainCreate     // Submit new complaint
GET  /api/ComplainList/:id   // List all complaints
```

## 🛠️ Technical Architecture

### Database Schema
- **Admin Schema**: School administration data
- **Student Schema**: Student profiles with attendance and results
- **Teacher Schema**: Teacher profiles with subject assignments
- **Class Schema**: Class organization
- **Subject Schema**: Subject details with teacher assignments
- **Notice Schema**: School notices and announcements
- **Complaint Schema**: Student complaints and tracking

### Data Relationships
```
Admin (School)
  ├── Classes
  │     ├── Students
  │     └── Subjects
  │           └── Teachers
  ├── Notices
  └── Complaints
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js >= 12.0.0
- MongoDB >= 4.4.0
- npm or yarn package manager

### Setup Steps

1. **Clone the Repository**
```bash
git clone <repository-url>
cd backend
```

2. **Install Dependencies**
```bash
npm install
```

3. **Environment Configuration**
Create a .env file:
```env
MONGODB_URI=<your-mongodb-connection-string>
PORT=5000
```

4. **Start the Server**
```bash
# Development mode
npm start

# Production mode
node index.js
```

## 🔐 Security Measures

1. **Password Security**
   - Password hashing using bcrypt
   - Salt rounds configuration
   - Secure password validation

2. **Data Validation**
   - Input validation for all requests
   - Data type checking
   - Required field validation

3. **Error Handling**
   - Comprehensive error catching
   - Proper error responses
   - Status code implementation

## 🔍 Testing

Run tests using:
```bash
npm test
```

## 📦 Dependencies

- `express`: Web framework
- `mongoose`: MongoDB ODM
- `bcrypt`: Password hashing
- `cors`: Cross-origin resource sharing
- `dotenv`: Environment configuration
- `body-parser`: Request body parsing
- `nodemon`: Development server

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## 📄 License

This project is licensed under the ISC License.

## 🐛 Known Issues & Limitations

1. No rate limiting implemented
2. Needs pagination for large data sets
3. Could benefit from caching layer
4. API documentation could be more detailed

## 🔜 Future Improvements

1. Implement JWT authentication
2. Add API rate limiting
3. Implement caching
4. Add more comprehensive logging
5. Enhance error handling
6. Add API documentation using Swagger
7. Implement real-time notifications
8. Add file upload capabilities
9. Implement data export features
10. Add report generation

## 📚 Documentation Resources

For more detailed information about the APIs and implementation:
- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Node.js Documentation](https://nodejs.org/)

## 📞 Support

For support and queries, please create an issue in the repository.