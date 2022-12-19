import orgRoute from './org-route';
import userRoute from './user-route';
const route = (app) => {
    
    userRoute(app)
    orgRoute(app)
}
export default route