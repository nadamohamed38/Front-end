import mongoose from "mongoose";
const storeSchema = mongoose.Schema({name: String,
    img:String,
    amount: Number,
    cost: Number})

export const Store = mongoose.model('Store', storeSchema, 'store')