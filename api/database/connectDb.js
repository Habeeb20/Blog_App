import mongoose from "mongoose"

const connectDb = async() => {
    try {
        const connect=await mongoose.connect(process.env.MONGO)
        if (connect) {
            console.log("you have successfully connected to the DB")
        } else {
            console.log("there is an error")
            
        }
    } catch (error) {
        console.log(error)
        
    }
}



export default connectDb