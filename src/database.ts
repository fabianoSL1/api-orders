import mongoose from "mongoose";

export async function connectDatabase() {
    await mongoose.connect(process.env.MONGO_URL!);
}