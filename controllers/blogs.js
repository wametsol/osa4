const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const bodyParser = require('body-parser')
blogsRouter.use(bodyParser.json())
  
  const formatBlog = (blog) => {
      return{
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
      }
    }
  
  blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(formatBlog))
    
})
  blogsRouter.get('/api/blogs', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
  })
  
  blogsRouter.post('/api/blogs', async (req, res) => {
    
    
    try{
    const body = req.body
   
    
    if (body.title === undefined){
      return res.status(400).json({error: 'title missing'})
    }
    if (body.likes === undefined){
      body.likes = 0
    }
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    })
   
    
    const savedBlog = await blog.save()
    res.json(formatBlog(savedBlog))
  }catch (exception) {
    console.log(exception)
    res.status(500).json({error: 'something went wrong'})
    
  }
    
  })
  
  module.exports = blogsRouter
  
  