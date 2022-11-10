import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './src/config/db.js'
import userRoute from './src/routes/userRoutes.js'

import downloadableRoutes from './src/routes/downloadableRoutes.js'
import fileUploadController from './src/controllers/fileUploadController.js'

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(bodyParser.json())

//set upload folder
app.use(express.static('/uploads/'));
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
  res.send('Api is working')
});


//directing api calls to relavent routes
app.use('/api/users', userRoute)
app.use('/api/materials', downloadableRoutes)
app.use('/api/files/', fileUploadController)

const PORT = process.env.PORT || 8080

app.listen(
  PORT,
  console.log(
    `Server running in "${process.env.NODE_ENV} mode" on port:${PORT}`
  )
)
