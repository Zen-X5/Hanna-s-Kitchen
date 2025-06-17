require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");


const  menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = process.env.PORT || 5000;
// Catch-all route for React Router

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

const corsOptions = {
  origin: 'https://hanna-s-kitchen.onrender.com',  // your frontend URL
  credentials: true,                              // allow cookies/auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.use(cors(corsOptions));
app.use('/api/items',menuRoutes);
app.use('/api/orders', orderRoutes);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});


mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => console.error('MongoDB error:', err));

// Fallback to index.html for React Router

app.listen(port,()=>{
    console.log(`Server is live at port ${port}`);
});
