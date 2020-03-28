
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let likestotal = 0
  blogs.forEach(function (blog) {
    likestotal += blog.likes
  })
  return likestotal
}

const favoriteBlog = (blogs) => {
  let resblog = blogs[0]
  blogs.forEach(function (blog) {
    if (blog.likes > resblog.likes) {
      resblog = blog
    }
  })
  return resblog
}

const mostBlogs = (blogs) => {
  let blogsresult = 0
  let authorresult = null
  let AB = {}

  blogs.forEach(blog => {
    if (blog.author in AB) {
      AB[blog.author] += 1
    } else {
      AB[blog.author] = 1
    }
  })

  for (let author in AB) {
    if (AB[author] > blogsresult) {
      authorresult = author
      blogsresult = AB[author]
    }
  }

  return { author: authorresult, blogs: blogsresult }
}

const mostLikes = (blogs) => {
  let likesresult = 0
  let authorresult = null
  let AL = {}

  blogs.forEach(blog => {
    if (blog.author in AL) {
      AL[blog.author] += blog.likes
    } else {
      AL[blog.author] = blog.likes
    }
  })

  for (let author in AL) {
    if (AL[author] > likesresult) {
      authorresult = author
      likesresult = AL[author]
    }
  }

  return { author: authorresult, likes: likesresult }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}