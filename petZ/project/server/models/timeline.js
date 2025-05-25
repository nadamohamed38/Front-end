import mongoose from "mongoose";
const timelineSchema = mongoose.Schema({
    caption: String,
    img:String,
    t:String,
name:String})

export const Timeline = mongoose.model('Timeline', timelineSchema, 'timeline')