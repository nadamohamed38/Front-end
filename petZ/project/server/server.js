import express from "express"
import mongoose from "mongoose"
import { MONGO_URI, PORT } from './config.js';
import petRoutes from './routes/pet.js';
import userRoutes from './routes/user.js';
import bookRoutes from './routes/book.js';
import vetRoutes from './routes/vet.js';
import medRoutes from './routes/medicine.js';
import storeRoutes from './routes/store.js';
import timelineRoutes from "./routes/timeline.js";
import cors from 'cors';
import path from "path";

const app = express();
app.use(cors());
app.use(express.json())

app.use('/pet', petRoutes);
app.use('/user', userRoutes);
app.use('/book', bookRoutes);
app.use('/vet', vetRoutes);
app.use('/medicine', medRoutes);
app.use('/store', storeRoutes);
app.use('/timeline', timelineRoutes);

const __dirname = path.resolve(); 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/',(request,response)=>{
  console.log(request)
  return response.status(234).send("hi nada")
})


mongoose.connect(MONGO_URI)
  .then(() =>{ console.log("MongoDB connected")
    app.listen(PORT,()=>{
      console.log(`app listen to port ${PORT}`)
    })
  })
  .catch(console.error);
