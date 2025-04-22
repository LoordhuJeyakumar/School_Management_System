# School Management System Backend

A robust and scalable REST API built with Node.js, Express, and MongoDB that powers a comprehensive school management system. This backend system supports multiple schools with role-based access control, student/teacher management, class organization, subject handling, attendance tracking, exam results, notices, and complaints management.

## 🚀 Features

### Authentication & Authorization
- Multi-role authentication (Admin, Teachers, Students)
- Password security with bcrypt hashing
- Role-based access control for different API endpoints
- Session management and validation

### School Administration
- School registration with unique identifiers
- Multiple schools support with isolated data
- Comprehensive school profile management
- Administrative dashboard capabilities

### Class Management
- Create and manage multiple classes per school
- Assign teachers to specific classes
- Track class-wise students and subjects
- Automatic cascade deletion for related data

### Student Management
- Student registration with unique roll numbers per class
- Profile management with secure authentication
- Attendance tracking per subject
- Exam result recording and management
- Session-wise attendance limits
- Comprehensive student performance tracking

### Teacher Management
- Teacher registration and profile management
- Subject assignment system with validation
- Class assignment capabilities
- Teacher attendance tracking
- Subject-class relationship management
- Performance monitoring tools

### Subject Management
- Subject creation with unique codes
- Session tracking for each subject
- Teacher assignment and reassignment
- Class-wise subject organization
- Subject deletion with data cleanup

### Attendance System
- Student attendance tracking by subject
- Session-wise attendance limitations
- Teacher attendance management
- Bulk attendance operations
- Attendance reports and statistics
- Attendance modification controls

### Examination System
- Record and manage exam results
- Subject-wise marks tracking
- Result updates and modifications
- Student performance tracking
- Grade calculation and reporting

### Notice Board
- School-wide notice creation
- Notice updating and management
- Date-based notice organization
- Notice archival system
- School-specific notice filtering

### Complaint Management
- Student complaint submission system
- School-wise complaint tracking
- Date-based complaint organization
- Complaint status tracking
- Admin complaint review system

## 📝 API Documentation

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
PUT    /api/RemoveStudentSubAtten/:id  // Remove subject attendance
PUT    /api/RemoveStudentAtten/:id     // Remove all attendance
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
DELETE /api/Sclasses/:id       // Delete all classes
```

### Subject Routes
```javascript
POST   /api/SubjectCreate      // Create new subject
GET    /api/AllSubjects/:id    // List all subjects
GET    /api/ClassSubjects/:id  // Get class subjects
GET    /api/Subject/:id        // Get subject details
DELETE /api/Subject/:id        // Delete subject
GET    /api/FreeSubjectList/:id // Get unassigned subjects
```

### Notice Routes
```javascript
POST   /api/NoticeCreate      // Create new notice
GET    /api/NoticeList/:id    // List all notices
PUT    /api/Notice/:id        // Update notice
DELETE /api/Notice/:id        // Delete notice
DELETE /api/Notices/:id       // Delete all notices
```

### Complaint Routes
```javascript
POST /api/ComplainCreate     // Submit new complaint
GET  /api/ComplainList/:id   // List all complaints
```

## 🛠️ Technical Architecture

### Database Schema
- **Admin Schema**: School/admin data with password encryption
  - Fields: name, email, password, role, schoolName
  - Validations: Unique email and school name

- **Student Schema**: Student profiles with exam and attendance
  - Fields: name, rollNum, password, class, school, examResult, attendance
  - Relations: References to class, school, and subjects
  - Nested schemas for exam results and attendance

- **Teacher Schema**: Teacher profiles with assignments
  - Fields: name, email, password, role, school, subject, class
  - Relations: References to school, subject, and class
  - Attendance tracking with dates

- **Class Schema**: Class organization
  - Fields: className, school
  - Relations: Reference to school
  - Cascade delete triggers

- **Subject Schema**: Subject details
  - Fields: subName, subCode, sessions, class, school, teacher
  - Relations: References to class, school, and teacher
  - Unique subject code validation

- **Notice Schema**: School notices
  - Fields: title, details, date, school
  - Relations: Reference to school
  - Date-based organization

- **Complaint Schema**: Student complaints
  - Fields: user, date, complaint, school
  - Relations: References to student and school
  - Date tracking

### Data Relationships
```
Admin (School)
  ├── Classes
  │     ├── Students
  │     │     ├── Attendance Records
  │     │     └── Exam Results
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

### Environment Variables
Create a .env file with these configurations:
```env
MONGODB_URI=<your-mongodb-connection-string>
PORT=5000
```

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

3. **Start the Server**
```bash
# Development mode with nodemon
npm start

# Production mode
node index.js
```

## 📦 Dependencies

- `express`: Web application framework
- `mongoose`: MongoDB object modeling
- `bcrypt`: Password hashing
- `cors`: Cross-origin resource sharing
- `dotenv`: Environment configuration
- `body-parser`: Request parsing middleware
- `nodemon`: Development server

## 🔐 Security Measures

1. **Password Security**
   - Bcrypt hashing implementation
   - Salt rounds configuration
   - Secure password validation
   - Password field exclusion in responses

2. **Data Validation**
   - Mongoose schema validation
   - Request body validation
   - Unique field constraints
   - Required field validation

3. **Error Handling**
   - Try-catch blocks
   - Proper error responses
   - Status code implementation
   - Error message standardization

## 🚀 API Response Format

### Success Response
```json
{
  "data": {},           // Response data
  "message": "Success"  // Optional success message
}
```

### Error Response
```json
{
  "message": "Error message", // Error description
  "error": {}                // Optional error details
}
```

## 🐛 Known Issues & Limitations

1. No rate limiting implemented
2. Needs pagination for large data sets
3. Could benefit from caching layer
4. Limited validation messages
5. Basic error responses
6. No file upload capability

## 🔜 Future Improvements

1. Implement JWT authentication
2. Add API rate limiting
3. Implement response caching
4. Add comprehensive logging
5. Enhance error handling
6. Add Swagger documentation
7. Implement real-time notifications
8. Add file upload support
9. Add data export features
10. Implement report generation

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create pull request

## 📄 License

This project is licensed under the ISC License.

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Node.js Documentation](https://nodejs.org/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)