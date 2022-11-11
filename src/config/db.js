import mongoose from 'mongoose' 

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      })
      console.log(`\x1b[33mMongoDB Connected: ${conn.connection.host}\x1b[0m`)
    } catch (error) {
      console.log(`Error: ${error.message}`.red.bold)
      process.exit(1)
    }
  }
  
  export default connectDB