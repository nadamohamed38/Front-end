import mongoose from "mongoose";
const petSchema = mongoose.Schema({name: String,
    img:String,
    age: String,
    type: String,
    user_id: String})

export const Pet = mongoose.model('Pet', petSchema, 'pet')