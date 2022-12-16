import Helper from '../helpers/index'
import schemaValidator from "../helpers/schema-validator"
import MESSAGES from '../helpers/messages'
class JoiMiddleware {
    joiMiddleware(req, res, next) {
        let myRoute = req.route.path
        let myMethod = req.method.toLowerCase()
        let schema = schemaValidator(myRoute, myMethod)
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            let myValue = error.details.map((value) => {
                let myOk = value.message.replace(/[\,"]/g, '');
                let o = {};
                Object.assign(o, { message: myOk, path: value.path[0] });
                return o
            })
            let resPayload = {
                message: MESSAGES.VALIDATION_ERROR,
                payload: myValue
            };
            return Helper.error(res, resPayload,400)
        }
        next();
    }
}


export default new JoiMiddleware;