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
      trim: true
   }
})

const User = mongoose.model('User', userSchema);

export default User;