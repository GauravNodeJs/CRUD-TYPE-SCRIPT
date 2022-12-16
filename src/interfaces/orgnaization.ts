import {Document} from 'mongoose'
interface Iorg extends Document{
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
export default Iorg