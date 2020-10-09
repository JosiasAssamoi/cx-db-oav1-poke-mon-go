import mongoose, { Schema } from 'mongoose'


export interface Pokemon extends mongoose.Document {
  id: Number,
    typeList: Array<String>,
    name: String
}

export default mongoose.model<Pokemon>(
  'Pokemon',
  new Schema({
    id: Number,
    typeList: Array,
    name: String
    

  })
)
