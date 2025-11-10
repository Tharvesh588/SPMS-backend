require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

// Connect DB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Route imports
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const studentRoutes = require('./routes/studentRoutes');
const teamRoutes = require('./routes/teamRoutes');
const psRoutes = require('./routes/psRoutes');

// ✅ Use Routes
app.use('/api/spms/v1/auth', authRoutes);
app.use('/api/spms/v1/admin', adminRoutes);
app.use('/api/spms/v1/faculty', facultyRoutes);
app.use('/api/spms/v1/students', studentRoutes);
app.use('/api/spms/v1/teams', teamRoutes);
app.use('/api/spms/v1/ps', psRoutes);


// ✅ Swagger Docs
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Root route
app.get('/', (req, res) => res.send('SPMS API running 🚀'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
