const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const Blog = mongoose.model('Blog', {
  title: String,
  author: String,
  url: String,
  likes: Number
})

module.exports = Blog

app.use(cors())
app.use(bodyParser.json())

const mongoUrl = process.env.MONGO_URL
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

const formatBlog = (blog) => {
    return{
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes
    }
  }

app.get('/',(request, response) => {
    Blog
    .find({})
    .then(blogs => {
        response.json(blogs.map(formatBlog))
    })
})
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})