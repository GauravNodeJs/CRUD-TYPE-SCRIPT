import {Document} from 'mongoose'
interface Iuser extends Document{
    _id:string,
    userName:string,
    firstName:string,
    lastName:string,
    password:string,
    email:string ,
    createdAt:NativeDate,
    updatedAt:NativeDate,
    changePassword:boolean
}
export default Iuser