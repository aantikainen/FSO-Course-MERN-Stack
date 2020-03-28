
const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')

describe('dummy tests', () => {

  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })

})

describe('testing lists', () => {

  const blog1 = new Blog({
    title: 'A',
    author: 'A',
    url: 'URL',
    likes: 4
  })

  const blog2 = new Blog({
    title: 'B',
    author: 'B',
    url: 'URL',
    likes: 6
  })

  const blog3 = new Blog({
    title: 'B',
    author: 'B',
    url: 'URL',
    likes: 64
  })

  const blog4 = new Blog({
    title: 'A',
    author: 'A',
    url: 'URL',
    likes: 645
  })

  const blog5 = new Blog({
    title: 'B',
    author: 'B',
    url: 'URL',
    likes: 43
  })

  const blogs = [blog1,blog2,blog3,blog4,blog5]

  test('blog4 has more likes than others', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(blog4)
  })

  test('Author B has most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual({ author:'B',blogs:3 })
  })

  test('Author A has most likes', () => {
    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ author:'A',likes:649 })
  })

})

describe('total likes', () => {

  const blog1 = new Blog({
    title: 'A',
    author: 'A',
    url: 'URL',
    likes: 4
  })

  const blog2 = new Blog({
    title: 'B',
    author: 'B',
    url: 'URL',
    likes: 6
  })

  const blogs = [blog1,blog2]

  test('totalLikes returns 10', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(10)
  })
})
