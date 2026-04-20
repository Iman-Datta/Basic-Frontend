require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
require('./config/passport');
const authRoutes = require('./routes/auth');
const app = express();
app.use(express.json());
app.use(cors({
origin:'http://localhost:5173',
credentials: true
}));
app.use(passport.initialize());
app.use('/auth', authRoutes);
app.get('/', (req, res) =>{
res.send('Server is running...');
});
mongoose.connect('mongodb://127.0.0.1:27017/googleAuthDB')
.then(() =>console.log('MongoDB Connected'))
.catch(err => console.log(err));
app.listen(5000, ()=>{
console.log('Server running on http://localhost:5000');
});