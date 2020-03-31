const Blog = require('../models/blog')

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
  }
]

const initialUsers = [
  {
    //shortUser&Pass
    username:'0',
    name:'shortUserNameAndPass',
    password:'012412411421'
  },
  {
    username: 'userLogin',
    password:'usersPassword'
  }
]

const nonExistingId = async () => {
  const blog = new Blog()
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, initialUsers
}