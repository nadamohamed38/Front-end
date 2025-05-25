import mongoose from "mongoose";
const bookSchema = mongoose.Schema({
    vet_id: String,
    appointment: String,
    user_id: String})

export const Book = mongoose.model('Book', bookSchema, 'book')