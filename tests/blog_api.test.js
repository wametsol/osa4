const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
  ]
  beforeAll(async () => {
      await Blog.remove({})
      const blogObjects = initialBlogs.map(blog => new Blog(blog))
      const promiseArray = blogObjects.map(blog => blog.save())
      await Promise.all(promiseArray)
    
  })
test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are 5 blogs', async () => {
    const response = await api
    .get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length)
})
test('blogs contains title: type wars', async () => {
    const res = await api
    .get('/api/blogs')
    const contents = res.body.map(r => r.title)

    expect(contents).toContain('Type wars')
})
test('a valid blog can be addded', async () => {
  const newBlog = {
    _id: "5a422bc61b54a62323541523",
      title: "Tester blog",
      author: "B. Blogger",
      url: "blog.blogger.com",
      likes: 55,
      __v: 0
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const res = await api
  .get('/api/blogs')

  const contents = res.body.map(r => r.title)

  expect(res.body.length).toBe(initialBlogs.length+1)
  expect(contents).toContain('Tester blog')
})

test('if likes is undefined, it is set to 0', async () => {
  const newBlog = {
    _id: "5a422bc61b54a62322421asda1523",
      title: "Tester blog2",
      author: "B. Blogger",
      url: "blog.blogger.com",
      __v: 0
  }
  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(200)
  .expect('Content-Type', /application\/json/)

  const res = await api
  .get('/api/blogs')


  const content = res.body.find(r => 
  r.title === 'Tester blog2')
  expect(content.likes).toBe(0)
  
})

test('if title & url is undefined, return 400 Bad request', async () => {
  const newBlog = {
    _id: "5a422bc61b54a62354321asda1523",
      author: "B. Blogger",
      likes: "100",
      __v: 0
  }
  const blogit = await api
  .get('/api/blogs')

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(400)
  .expect('Content-Type', /application\/json/)

  const res = await api
  .get('/api/blogs')


  expect(res.body.length).toBe(blogit.body.length)
  
})


afterAll(() => {
    server.close()
})