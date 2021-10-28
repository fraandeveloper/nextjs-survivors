import mongoose from 'mongoose';

const PeopleSchema = new mongoose.Schema({
  name: String,
  skills: String,
  createdAt: {
    type: Date,
    default: new Date()
  }
})

const People = mongoose.models.People || mongoose.model('People', PeopleSchema)

export default People;