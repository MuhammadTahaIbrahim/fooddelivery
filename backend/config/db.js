import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect("mongodb+srv://muhammadtaha3713:00112233@cluster0.jbgigvp.mongodb.net/food-del").then(() => console.log("db connected"));
}

//mongodb+srv://muhammadtaha3713:00112233@cluster0.jbgigvp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
