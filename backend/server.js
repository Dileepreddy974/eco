const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists with absolute path
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
console.log('Upload directory path:', uploadDir); // Debug log

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  console.log('Creating uploads directory...');
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadDir));

// Multer configuration for file uploads with better error handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure directory exists before setting it as destination
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname);
    console.log('Generated filename:', filename); // Debug log
    cb(null, filename);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// In-memory data storage (in a real app, you would use a database)
let users = [
  {
    id: 1,
    full_name: "Alex Johnson",
    profile_photo: "",
    class_name: "Grade 3",
    school_name: "Green Valley Elementary",
    total_stars: 25,
    current_medals: {
      bronze: 1,
      silver: 1,
      gold: 0,
      diamond: 0
    }
  },
  {
    id: 2,
    full_name: "Taylor Smith",
    profile_photo: "",
    class_name: "Grade 4",
    school_name: "Green Valley Elementary",
    total_stars: 42,
    current_medals: {
      bronze: 1,
      silver: 1,
      gold: 1,
      diamond: 0
    }
  },
  {
    id: 3,
    full_name: "Jordan Williams",
    profile_photo: "",
    class_name: "Grade 5",
    school_name: "Green Valley Elementary",
    total_stars: 18,
    current_medals: {
      bronze: 1,
      silver: 1,
      gold: 0,
      diamond: 0
    }
  }
];

let tasks = [
  {
    id: 1,
    user_id: 1,
    task_type: "cleanup",
    task_title: "Clean Up Litter",
    description: "Picked up trash in the neighborhood park",
    photo_url: "",
    verification_status: "verified",
    stars_earned: 5,
    verification_details: "Great job keeping our park clean!",
    created_date: new Date().toISOString()
  },
  {
    id: 2,
    user_id: 2,
    task_type: "planting",
    task_title: "Plant a Tree",
    description: "Planted a young oak tree in the backyard",
    photo_url: "",
    verification_status: "verified",
    stars_earned: 10,
    verification_details: "Wonderful contribution to our environment!",
    created_date: new Date().toISOString()
  }
];

// Helper function to get current user (in a real app, this would come from authentication)
const getCurrentUser = () => {
  return users[0]; // For demo purposes, always return the first user
};

// Routes

// Auth routes
app.get('/api/auth/me', (req, res) => {
  const user = getCurrentUser();
  res.json(user);
});

app.put('/api/auth/update', (req, res) => {
  const user = getCurrentUser();
  const updatedData = req.body;
  
  // Update user data
  Object.keys(updatedData).forEach(key => {
    if (key !== 'id' && key in user) {
      user[key] = updatedData[key];
    }
  });
  
  res.json(user);
});

// User routes
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Task routes
app.get('/api/tasks', (req, res) => {
  const { user_id, limit } = req.query;
  let filteredTasks = tasks;
  
  if (user_id) {
    filteredTasks = tasks.filter(task => task.user_id == user_id);
  }
  
  if (limit) {
    filteredTasks = filteredTasks.slice(0, parseInt(limit));
  }
  
  // Sort by created_date descending (newest first)
  filteredTasks.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
  
  res.json(filteredTasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    ...req.body,
    created_date: new Date().toISOString()
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// File upload route with improved error handling
app.post('/api/upload', upload.single('file'), (req, res) => {
  console.log('File upload request received'); // Debug log
  
  if (!req.file) {
    console.log('No file received in request'); // Debug log
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  console.log('File received:', req.file); // Debug log
  
  // Ensure the uploads directory exists
  if (!fs.existsSync(uploadDir)) {
    console.log('Creating uploads directory...'); // Debug log
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  console.log('File URL generated:', fileUrl); // Debug log
  
  res.json({
    file_url: fileUrl,
    filename: req.file.filename
  });
});

// AI verification simulation route with improved accuracy and realism
app.post('/api/verify', (req, res) => {
  const { prompt, file_urls } = req.body;
  
  // Extract task category from prompt with better parsing
  let category = 'general';
  if (prompt.includes('cleanup')) category = 'cleanup';
  else if (prompt.includes('planting')) category = 'planting';
  else if (prompt.includes('recycling')) category = 'recycling';
  else if (prompt.includes('water_saving')) category = 'water_saving';
  else if (prompt.includes('energy_saving')) category = 'energy_saving';
  
  // Simulate more realistic and accurate AI verification with enhanced logic
  setTimeout(() => {
    // In a real implementation, this would call an actual AI service
    // Enhanced responses with more realistic confidence levels and detailed feedback
    const responses = {
      cleanup: {
        verified: true,
        confidence: 0.95,
        feedback: "Excellent work! We can clearly see you actively picking up trash. The gloves, trash bag, and visible litter show you're making a real difference in keeping our environment clean. Your effort to protect our planet is fantastic!",
        detected_elements: ["trash bag", "protective gloves", "litter collection", "outdoor environment", "environmental action"]
      },
      planting: {
        verified: true,
        confidence: 0.92,
        feedback: "Wonderful job! We can see you planting seeds and working with soil. Planting helps clean our air, provide homes for animals, and makes our world more beautiful. Your green thumb is growing!",
        detected_elements: ["seedlings", "soil preparation", "planting tools", "garden activity", "environmental growth"]
      },
      recycling: {
        verified: true,
        confidence: 0.97,
        feedback: "Fantastic recycling effort! We can clearly see different materials sorted into separate containers. Proper recycling helps reduce waste in landfills and conserves natural resources. You're being a responsible environmental citizen!",
        detected_elements: ["material sorting", "recycling bins", "paper items", "plastic containers", "environmental responsibility"]
      },
      water_saving: {
        verified: true,
        confidence: 0.89,
        feedback: "Great water conservation! We can see you're using a bucket instead of a hose and have turned off the tap. Small actions like these make a big difference in conserving our precious water resources. Every drop counts!",
        detected_elements: ["water collection", "tap conservation", "bucket usage", "resource management", "environmental awareness"]
      },
      energy_saving: {
        verified: true,
        confidence: 0.93,
        feedback: "Super energy saving! We can see lights turned off and electronic devices unplugged. Reducing energy use helps fight climate change and saves money too. Your actions are helping create a sustainable future!",
        detected_elements: ["light switches", "unplugged devices", "energy conservation", "sustainability practices", "climate action"]
      },
      general: {
        verified: true,
        confidence: 0.85,
        feedback: "Great effort on your eco-friendly activity! We can see you're doing something positive for the environment. Keep up the good work protecting our planet!",
        detected_elements: ["environmental action", "positive behavior", "outdoor activity", "sustainability effort", "green practices"]
      }
    };
    
    // More sophisticated verification logic with lower rejection rate (5% instead of 10%)
    const shouldFail = Math.random() < 0.05;
    
    if (shouldFail) {
      res.json({
        verified: false,
        confidence: 0.25,
        feedback: "We couldn't clearly identify evidence of the specific eco-friendly activity. Please try again with a clearer photo that shows the activity more directly, or make sure the activity is visible in the image.",
        detected_elements: ["unclear visualization", "insufficient detail", "needs clearer evidence"]
      });
    } else {
      // Add some variability to confidence scores for more realism
      const baseResponse = responses[category];
      const confidenceVariation = (Math.random() * 0.1) - 0.05; // +/- 5% variation
      const adjustedConfidence = Math.max(0.7, Math.min(0.99, baseResponse.confidence + confidenceVariation));
      
      res.json({
        ...baseResponse,
        confidence: adjustedConfidence
      });
    }
  }, 1500); // Simulate processing time
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Friendly Eco Backend is running!' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: 'Something went wrong on our end. Please try again later.'
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    message: 'The requested resource was not found.'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Friendly Eco Backend server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});