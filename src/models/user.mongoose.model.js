import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true,
      trim: true
   },
   password: {
      type: String,
      required: true,
      trim: true
   },
   role: {
      type: String,
      required: true,
      enum: [1, 2],
      default: 2,
      trim: true
   },
   firstName: {
      type: String,

      trim: true
   },
   lastName: {
      type: String,

      trim: true
   }
})

const User = mongoose.model('User', userSchema);

export default User;