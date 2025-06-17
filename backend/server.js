require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require("path");


const  menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.use('/uploads', express.static('uploads'));
app.use(cors({
  origin: "https://hanna-kitchen-frontend.onrender.com",
  credentials: true,
}));
app.use('/api/items',menuRoutes);
app.use('/api/orders', orderRoutes);


mongoose.connect(process.env.MONGO_URL)
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => console.error('MongoDB error:', err));

// Fallback to index.html for React Router
// Catch-all route for React Router
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(port,()=>{
    console.log(`Server is live at port ${port}`);
});
