import Irequest from './request'
interface Ilogin extends Irequest{
    body:{
        userName:string,
        password:string
    },
    headers:{
        authorization:string
    }
    user:{
        
    }

}
export default Ilogin