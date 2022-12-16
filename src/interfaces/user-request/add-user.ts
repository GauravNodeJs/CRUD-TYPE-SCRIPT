import Irequest from "./request";

interface IaddUser extends Irequest{
    body:{
        _id:string,
        userName:string,
        firstName:string,
        lastName:string,
        password:string,
        email:string ,
        createdAt:NativeDate,
        updatedAt:NativeDate,
        changePassword:boolean,
        orgnaization:{
            userId:string,
            orgName:string,
            address:{
                addressLine1:string,
                addressLine2:string,
                city:string,
                state:string,
                country:string,
                zipCode:number
            }
        }
    }
}
export default IaddUser