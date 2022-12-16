import Irequest from "./request";
interface IupdateUser extends Irequest{
    body:{
        _id:string,
        userName:string,
        firstName:string,
        lastName:string,
        password:string,
        email:string ,
        createdAt:NativeDate,
        updatedAt:NativeDate,
        changePassword:boolean
    },
    user:{
        _id:string
    }

}
export default IupdateUser