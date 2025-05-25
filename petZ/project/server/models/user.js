import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone_number: String})

export const User = mongoose.model('User', userSchema, 'user')