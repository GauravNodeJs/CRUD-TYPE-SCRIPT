import mongoose from "mongoose";
import { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import {nanoid} from 'nanoid'
import Iuser from "src/interfaces/user";
const userSchema = new Schema({
    _id:{
        type:String,
        default: ()=>nanoid()
    },
    userName:{
        type:String,
        unique: true,
        required:true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    changePassword:{
        type:Boolean,
        required:false
    }
},
    { timestamps: true }
)
userSchema.pre('save', async function (next) {
    try {
        const savedPassword = await bcrypt.hash(this.password, 5)
        this.password = savedPassword
        next()
    }
    catch (error) {
        next(error)
    }
})
// userSchema.pre('findOneAndUpdate', async function (next) {
//     try {
//         if (this._update.password) {
//             const hashed = await bcrypt.hash(this._update.password, 10)
//             this._update.password = hashed;
//         }
//         next();
//     } catch (err) {
//         return next(err);
//     }
// });
const user = mongoose.model<Iuser>("User", userSchema);
export default user
