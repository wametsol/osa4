const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

app.use('/api/blogs', blogsRouter)
app.use(cors())
app.use(bodyParser.json())

const mongoUrl = process.env.MONGO_URL
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})