
import orgRoute from './org-route';
import userRoute from './user-route';
const route = (app:any) => {
    userRoute(app)
    orgRoute(app)
}
export default route