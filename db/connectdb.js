import mongoose from "mongoose";

const connect =  async () => {
    if(mongoose.connection.readyState >= 1){
        return; 
    }
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected to the db")
}

export default connect