import Orgnaization from '../services/orgnaization-service';
import Authentication from '../middleware/authentication';
import JoiMiddleware from '../middleware/joi-middleware';
const orgRoute = (app:any) => {
    app.post('/org/add',Authentication.tokenMiddleware,JoiMiddleware.joiMiddleware,Orgnaization.addOrgnaization)
    app.get('/org/list',Authentication.tokenMiddleware,Orgnaization.orgList)
    app.put('/org/list/update/:id',Authentication.tokenMiddleware,JoiMiddleware.joiMiddleware,Orgnaization.updateOrg)
}
export default orgRoute