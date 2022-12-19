import UserService from '../services/user-service'
import Authentication from '../middleware/authentication';
import JoiMiddleware from '../middleware/joi-middleware';
import userService from '../services/user-service';
const userRoute = (app) => {
    console.log("user route")
    app.post('/user/add',JoiMiddleware.joiMiddleware,UserService.addUser)
    app.post('/user/login',JoiMiddleware.joiMiddleware,UserService.loginUser)
    app.put('/user/update',Authentication.tokenMiddleware,UserService.updateUser)
    app.post('/mail',userService.sendMail)
}
export default userRoute