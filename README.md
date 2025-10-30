# Friendly Eco 🌱

**Environmental Education Application**

A React-based interactive platform promoting eco-friendly behavior through gamification, educational content, and community engagement.

---

## 🌟 Features

### Core Functionality
- **Dashboard** - Personalized eco-journey tracking with interactive avatar
- **Task System** - Photo upload verification for eco-friendly challenges
- **Learning Hub** - Educational content on environmental sustainability
- **Leaderboard** - Gamified ranking system to encourage participation
- **Profile Management** - User progress and achievement tracking

### Design
- macOS-inspired claymorphism UI
- Responsive design for all devices
- Smooth animations and transitions
- Glassmorphism effects with backdrop blur

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Dileepreddy974/eco.git
cd eco
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
npm install
cd ..
```

### Running the Application

#### Start Backend Server
```bash
cd backend
node server.js
```
The backend will run on `http://localhost:5000`

#### Start Frontend (in a new terminal)
```bash
npm start
```
The frontend will run on `http://localhost:3003`

---

## 📁 Project Structure

```
eco/
├── backend/                    # Express.js backend
│   ├── server.js              # Main server file
│   ├── uploads/               # User uploaded images
│   └── package.json           # Backend dependencies
│
├── public/                    # Static assets
│   └── index.html            # HTML template
│
├── src/                       # React source code
│   ├── components/           # Reusable components
│   │   ├── avatar/          # Interactive avatar components
│   │   ├── dashboard/       # Dashboard-specific components
│   │   ├── tasks/           # Task management components
│   │   ├── loading/         # Loading animations
│   │   └── ui/              # UI primitives (buttons, cards, etc.)
│   │
│   ├── pages/               # Route pages
│   │   ├── Dashboard.jsx    # Main dashboard
│   │   ├── Tasks.jsx        # Task management
│   │   ├── Leaderboard.jsx  # Rankings
│   │   ├── Learn.jsx        # Educational content
│   │   └── Profile.jsx      # User profile
│   │
│   ├── api/                 # API client
│   ├── utils/               # Utility functions
│   ├── Entities/            # Data schemas
│   ├── Layout.js            # Main layout wrapper
│   ├── App.js               # App component
│   ├── index.js             # Entry point
│   └── index.css            # Global styles
│
└── package.json             # Frontend dependencies
```

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **Lucide React** - Icon library
- **date-fns** - Date formatting utilities
- **React Scripts** - Build tooling (Create React App)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

---

## 🎨 Design System

### Colors
- Primary Green: `#4ade80`
- Secondary Green: `#22c55e`
- Background: `#f5f5f7`
- Text: `#1f2937`

### Typography
- Font Family: SF Pro Display, -apple-system, BlinkMacSystemFont
- Heading Weight: 600
- Body Weight: 400

---

## 📝 Available Scripts

### Frontend
```bash
npm start          # Run development server (port 3003)
npm run build      # Create production build
npm test           # Run tests
npm run eject      # Eject from Create React App
```

### Backend
```bash
node server.js     # Start Express server (port 5000)
```

---

## 🌐 API Endpoints

### Backend API
- `GET /api/health` - Health check endpoint
- `POST /api/tasks/upload` - Upload task verification photo
- Additional endpoints for task management and user data

---

## 🔧 Configuration

### Port Configuration
- **Frontend**: Port 3003 (configured in package.json)
- **Backend**: Port 5000 (configured in backend/server.js)

### Environment Variables
Create `.env` file in root for custom configuration:
```env
PORT=3003
REACT_APP_API_URL=http://localhost:5000
```

---

## 📦 Dependencies

### Main Dependencies
- react: ^18.x
- react-dom: ^18.x
- react-router-dom: ^6.x
- lucide-react: Latest
- date-fns: Latest

### Dev Dependencies
- react-scripts: ^5.0.1
- @testing-library/react
- @testing-library/jest-dom

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👤 Author

**Dileep Reddy**
- GitHub: [@Dileepreddy974](https://github.com/Dileepreddy974)
- Email: dileepreddy974@gmail.com

---

## 🙏 Acknowledgments

- Icons by [Lucide](https://lucide.dev/)
- UI inspiration from macOS design system
- Environmental education content sourced from various sustainability organizations

---

## 📞 Support

For support, email dileepreddy974@gmail.com or open an issue in the GitHub repository.

---

**Made with 💚 for a greener planet**
