import mongoose from "mongoose";
const vetSchema =  mongoose.Schema({
    name: String,
    email: String,
    password: String,
    price: String})

export const Vet = mongoose.model('Vet', vetSchema, 'vet')