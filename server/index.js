//importing
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

//creating app object with express constructor
const app = express();

dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());
const mongodb = 'mongodb+srv://ckmobile:ckmobile123@cluster0.niuuw.mongodb.net/item-database?retryWrites=true&w=majority';
app.get('/', (req, res) => {
res.send('Welcome to server')
})
const PORT = process.env.PORT || 5000;
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server running on ${PORT} `)))
.catch((error) => console.log(error));