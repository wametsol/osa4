const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
  
  const formatBlog = (blog) => {
      return{
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
      }
    }
  
  blogsRouter.get('/',(request, response) => {
      Blog
      .find({})
      .then(blogs => {
          response.json(blogs.map(formatBlog))
      })
  })
  blogsRouter.get('/api/blogs', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  blogsRouter.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })
  
  module.exports = blogsRouter
  
  