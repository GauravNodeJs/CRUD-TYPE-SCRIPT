import Helper from '../helpers/index'
import jwt from 'jsonwebtoken'
import Iauth from 'src/interfaces/authentication-request/authentication'
class Authentication {
    tokenMiddleware(req:Iauth, res, next) {

        let authorization = req.headers.authorization
        
        const token = authorization.replace("Bearer ", "")
        
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY)
            
            req.user = decoded
            console.log(req.user)
        }
        catch (err) {
            let resPayload = {
                message: err.message,
                payload: {}
            };
            return Helper.error(res, resPayload, 401)
        }

        next();
    }
}


export default new Authentication;