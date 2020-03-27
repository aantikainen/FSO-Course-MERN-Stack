const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const personName = process.argv[3]
const personNumber = process.argv[4]

const url = `mongodb+srv://arttu:${password}@cluster0-o4ddg.mongodb.net/persons-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })


const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, minlength: 3 },
  number: { type: String, required: true, unique: true, minlength: 8 },
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: personName,
  number: personNumber
})


if (process.argv.length===3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name +' '+ person.number)
    })
    mongoose.connection.close()
  })
} else {
  person.save().then(response => {
    console.log('added ' + personName + ' number ' + personNumber + ' to phonebook')
    mongoose.connection.close()
  })
}

module.exports = mongoose.model('Person', personSchema)







