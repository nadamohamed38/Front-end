import mongoose from "mongoose";
const medSchema = mongoose.Schema({name: String,
    img:{
        data: Buffer,
        contentType: String
      },
    describtion: String,
    pet_type: String,
    price: Number})

export const Medicine = mongoose.model('Medicine', medSchema, 'medicine')
