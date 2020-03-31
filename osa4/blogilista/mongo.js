const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]


const url =
    `mongodb+srv://arttu:${password}@cluster0-o4ddg.mongodb.net/blogilista-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const blogSchema = new mongoose.Schema({
  title: {
    type : String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
})

const Blog = mongoose.model('Blog', blogSchema)

// const blog = new Blog({
//   title: 'Hello Blog',
//   author: 'aantikainen',
//   url: '@GitHub',
//   likes: 99
// })

Blog.find({}).then(result => {
  result.forEach(blog => {
    console.log(blog)
  })
  mongoose.connection.close()
})