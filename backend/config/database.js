import mongoose from "mongoose";

const DBConnect =  async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database is connected successfully.")
    } catch (error) {
        console.log(`Database error: ${error}`)
    }
}

export default DBConnect