const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

const newUser = {
  username: 'userNameForTests',
  name: 'nameOfUser',
  password: 'passWordForTests'
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  try {
    const deleteUser = await User.findOneAndDelete({
      username: newUser.username
    })
    await api.post('/api/users').send(newUser)
    await Promise.all(deleteUser.toString())
  } catch (error) {
    console.log(error)
  }
})

const UsernamePassword = {
  username: newUser.username,
  password: newUser.password
}

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

    const login = await api
      .post('/api/login')
      .send(UsernamePassword)

    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + login.body.token)
      .send(helper.initialBlogs[0])
      .expect(200)
      .expect('Content-Type', /application\/json/)

    delete response.body.id
    delete response.body.user
    expect(response.body).toEqual(helper.initialBlogs[0])

    const response2 = await api.get('/api/blogs/')
    expect(response2.body.length).toBe(helper.initialBlogs.length + 1)
  })

  test('likes no value, step4', async () => {

    const login = await api
      .post('/api/login')
      .send(UsernamePassword)

    const blog = {
      title: 'Hello Blog',
      author: 'aantikainen',
      url: '@GitHub'
    }

    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + login.body.token)
      .send(blog)

    expect(response.body.likes).toBe(0)
  })

  test('adding a blog, step5. dont include title and url', async () => {

    const login = await api
      .post('/api/login')
      .send(UsernamePassword)

    const response = await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + login.body.token)
      .send({ author: 'test', likes: 1 })
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('`title` is required')
    expect(response.body.error).toContain('`url` is required')

  })

  test('blogs are returned as json ', async () => {

    const login = await api
      .post('/api/login')
      .send(UsernamePassword)

    const newBlog = {
      title: 'Hello Blog',
      author: 'aantikainen',
      url: '@GitHub',
      likes: 99
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer ' + login.body.token)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const author = response.body.map(r => r.author)

    expect(response.body.length).toBe(helper.initialBlogs.length + 1)
    expect(author).toContain(
      'aantikainen'
    )
  })

  test('Cant create user with a short username n pass ', async () => {

    await api
      .post('/api/users')
      .send(helper.initialUsers[0])
      .expect(400)
  })

})

describe('last test', () => {

  test('post gets 401 when unauthorized', async () => {

    const login = await api
    await api
      .post('/api/blogs')
      .expect(401)
  })

})

afterAll(() => {
  mongoose.connection.close()
})