# AI-Based Employee Performance Analytics & Recommendation System

A complete MERN stack application with AI integration for employee performance management, analytics, and intelligent recommendations.

## 🚀 Features

- **Employee Management**: Add, edit, delete, and view employee records
- **Performance Tracking**: Track employee performance scores and metrics
- **AI-Powered Recommendations**: Get intelligent insights for promotions, training, and skill development
- **Advanced Analytics**: Visual charts and statistics for employee performance
- **Search & Filter**: Search employees by name, email, department, and performance score
- **Authentication**: Secure JWT-based authentication with password hashing
- **Responsive Design**: Modern UI with dark mode support
- **Real-time Rankings**: Dynamic employee ranking based on performance

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios
- Recharts (for analytics charts)
- Lucide React (icons)

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- bcrypt (password hashing)
- OpenRouter API (AI integration)

## 📁 Project Structure

```
AIFSD-ESE/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Authentication logic
│   │   ├── employeeController.js # Employee CRUD operations
│   │   └── aiController.js       # AI recommendations
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification
│   │   ├── errorMiddleware.js    # Error handling
│   │   └── validationMiddleware.js # Input validation
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Employee.js           # Employee schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   ├── employeeRoutes.js     # Employee endpoints
│   │   └── aiRoutes.js           # AI endpoints
│   ├── utils/
│   │   └── generateToken.js      # JWT token generation
│   ├── .env.example              # Environment variables template
│   ├── package.json              # Backend dependencies
│   └── server.js                 # Express server
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx        # Main layout with sidebar
│   │   │   └── EmployeeCard.jsx  # Employee card component
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Authentication context
│   │   ├── pages/
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Signup.jsx        # Signup page
│   │   │   ├── Dashboard.jsx     # Dashboard page
│   │   │   ├── EmployeeList.jsx  # Employee list with search/filter
│   │   │   ├── EmployeeForm.jsx  # Employee registration/edit form
│   │   │   ├── AIRecommendations.jsx # AI recommendations page
│   │   │   └── Analytics.jsx     # Analytics page with charts
│   │   ├── utils/
│   │   │   └── axios.js          # Axios configuration
│   │   ├── App.jsx               # Main App component
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── index.html                # HTML template
│   ├── package.json              # Frontend dependencies
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.js        # Tailwind configuration
│   └── postcss.config.js         # PostCSS configuration
├── render.yaml                   # Render deployment configuration
└── README.md                     # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- OpenRouter API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AIFSD-ESE
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   ```

3. **Configure Environment Variables**
   
   Edit `backend/.env` and add your credentials:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/employee_performance_db
   JWT_SECRET=your_jwt_secret_key_here
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   ```

4. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   ```

5. **Run the Application**

   **Backend** (in `backend/` directory):
   ```bash
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

   **Frontend** (in `frontend/` directory):
   ```bash
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### Employees
- `POST /api/employees` - Create employee (protected)
- `GET /api/employees` - Get all employees (protected)
- `GET /api/employees/search` - Search employees (protected)
- `GET /api/employees/:id` - Get single employee (protected)
- `PUT /api/employees/:id` - Update employee (protected)
- `DELETE /api/employees/:id` - Delete employee (protected)
- `GET /api/employees/analytics` - Get analytics data (protected)

### AI Recommendations
- `POST /api/ai/recommend` - Get AI recommendations (protected)

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User signs up or logs in
2. Server generates a JWT token
3. Token is stored in localStorage
4. Token is sent with every API request in the Authorization header
5. Protected routes verify the token before granting access

## 🤖 AI Integration

The application uses OpenRouter API (OpenAI compatible) for generating intelligent recommendations:

- **Promotion Recommendations**: Based on performance score and experience
- **Training Suggestions**: For employees needing improvement
- **Skill Enhancement**: Identifies missing skills based on department
- **Performance Feedback**: Detailed AI-generated feedback
- **Career Path**: Recommended career progression

If the AI API fails, the system falls back to rule-based recommendations.

## 📊 Pages Overview

### 1. Login Page (`/login`)
- User authentication
- Email and password login
- Error handling

### 2. Signup Page (`/signup`)
- New user registration
- Username, email, password fields
- Validation

### 3. Dashboard (`/dashboard`)
- Overview statistics
- Department distribution
- Recent employees
- Performance overview
- Quick navigation

### 4. Employee List (`/employees`)
- View all employees
- Search by name/email
- Filter by department
- Filter by performance score range
- Edit and delete employees
- Employee cards with performance indicators

### 5. Employee Form (`/employees/add` or `/employees/:id/edit`)
- Add new employee
- Edit existing employee
- Fields: Name, Email, Department, Skills, Performance Score, Experience
- Validation

### 6. AI Recommendations (`/ai-recommendations`)
- Select employee
- Generate AI-powered recommendations
- View promotion suggestions
- Training recommendations
- Skill enhancement suggestions
- Career path recommendations

### 7. Analytics (`/analytics`)
- Department distribution pie chart
- Performance distribution bar chart
- Top 10 performers table
- Average performance by department
- Summary statistics

## 🎨 Features

### Dark Mode
- Toggle dark/light mode
- Persists preference in localStorage

### Responsive Design
- Mobile-friendly layout
- Collapsible sidebar
- Responsive charts

### Loading States
- Loading spinners
- Skeleton screens
- Smooth transitions

### Error Handling
- User-friendly error messages
- API error handling
- Form validation

## 🚀 Deployment

### Render Deployment

1. **Backend Deployment**
   - Create a new Web Service on Render
   - Connect your GitHub repository
   - Set build command: `cd backend && npm install`
   - Set start command: `cd backend && npm start`
   - Add environment variables from `.env.example`

2. **Frontend Deployment**
   - Create a new Static Site on Render
   - Connect your GitHub repository
   - Set build command: `cd frontend && npm install && npm run build`
   - Set publish directory: `frontend/dist`
   - Add environment variable: `VITE_API_URL` (your backend URL)

### Using render.yaml
The project includes a `render.yaml` file for automated deployment. Simply connect your repository to Render and it will deploy both services automatically.

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your_secret_key
OPENROUTER_API_KEY=your_openrouter_key
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000
```

## 📝 MongoDB Schema

### User Schema
```javascript
{
  username: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  timestamps: true
}
```

### Employee Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  department: String (required, enum),
  skills: [String],
  performanceScore: Number (required, 0-100),
  experience: Number (required, >= 0),
  timestamps: true
}
```

## 🧪 Testing

To test the application:

1. Create a user account via `/signup`
2. Login via `/login`
3. Add employees via `/employees/add`
4. View employee list at `/employees`
5. Generate AI recommendations at `/ai-recommendations`
6. View analytics at `/analytics`

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure your MongoDB Atlas IP whitelist includes your IP
- Check connection string format
- Verify database user credentials

### API Errors
- Check that backend is running on port 5000
- Verify environment variables are set correctly
- Check browser console for CORS errors

### Frontend Build Issues
- Delete `node_modules` and reinstall
- Clear Vite cache: `rm -rf .vite`
- Ensure Node.js version is compatible

## 📄 License

This project is created for educational purposes.

## 👨‍💻 Author

Created as a university ESE project demonstrating MERN stack integration with AI capabilities.

## 🙏 Acknowledgments

- OpenRouter API for AI integration
- Recharts for analytics visualization
- Tailwind CSS for styling
- Lucide React for icons
