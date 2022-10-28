import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import todosRoutes from './routes/todos.js';
 
const app = express();
dotenv.config();
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.get('/', (req, res) => {
    res.send('Welcome to server')
})
app.use('/todos', todosRoutes);
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.mongodb , { useUnifiedTopology: true }).then(() => {
    app.listen(PORT);
    console.log(`server is running on port ${PORT}`)
}).catch(err => console.log(err))


