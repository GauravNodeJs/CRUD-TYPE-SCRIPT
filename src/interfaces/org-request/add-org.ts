import Irequest from "../user-request/request";
interface IaddOrg extends Irequest{
    body:{
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
    },
    user:{
        _id:string
    }

}
export default IaddOrg