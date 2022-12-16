import Irequest from '../user-request/request'
interface Iauth extends Irequest{
    headers:{
        authorization:string
    }
    user:any

}
export default Iauth