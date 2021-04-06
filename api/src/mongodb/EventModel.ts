import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
    id: Number,
    name: String,
    description: String,
    date: Date
});

const EventModel = mongoose.model('EventModel', eventSchema);

export default EventModel;