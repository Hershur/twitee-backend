import mongoose from "mongoose";
import { userSchema } from "./schemas/users.schemas.js";


const userDB = mongoose.model('users', userSchema);

export default userDB;