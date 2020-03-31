const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')


const initialBlogs = [
  {
    title: 'Hello Blog',
    author: 'aantikainen',
    url: '@GitHub',
    likes: 99
  },
  {
    title: 'Hello Blog2',
    author: 'aantikainen2',
    url: '@GitHub2',
    likes: 992
  },
]

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('testing super', () => {

  test('is of type id step2', async () => {

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined()
    })
  })

  test('post a blog, step3', async () => {

    const response = await api
      .post('/api/blogs')
      .send(initialBlogs[0])
      .expect(200)
      .expect('Content-Type', /application\/json/)

    delete response.body.id
    expect(response.body).toEqual(initialBlogs[0])

    const response2 = await api.get('/api/blogs/')
    expect(response2.body.length).toBe(initialBlogs.length + 1)
  })

  test('likes no value, step4', async () => {

    const blog = {
      title: 'Hello Blog',
      author: 'aantikainen',
      url: '@GitHub'
    }

    const response = await api
      .post('/api/blogs')
      .send(blog)

    expect(response.body.likes).toBe(0)
  })

  test('adding a blog, step5', async () => {

    const response = await api
      .post('/api/blogs')
      .send({ author: 'test', likes: 1 })
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('`title` is required')
    expect(response.body.error).toContain('`url` is required')


  })


  test('blogs are returned as json ', async () => {

    const newBlog = {
      title: 'Hello Blog',
      author: 'aantikainen',
      url: '@GitHub',
      likes: 99
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const author = response.body.map(r => r.author)

    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(author).toContain(
      'aantikainen'
    )
  })
})

afterAll(() => {
  mongoose.connection.close()
})