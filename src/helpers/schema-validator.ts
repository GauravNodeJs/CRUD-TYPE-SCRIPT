import joi from "joi";

const validation = joi.object({
    userName: joi.string().min(3).max(10).trim(true).required(),
    firstName: joi.string().min(3).max(25).trim(true).required(),
    lastName: joi.string().trim(true).required(),
    password: joi.string().min(8).required(),
    email: joi.string().email().required(),
    changePassword:joi.boolean().optional(),
    orgnaization:joi.object({
        orgName:joi.string().required(),
        address:joi.object({
            addressLine1:joi.string().required(),
            addressLine2:joi.string().required(),
            city:joi.string().required(),
            state:joi.string().required(),
            country:joi.string().required(),
            zipCode:joi.number().required(),
        }).optional()
    }).optional()
    
});
const loginValidation=joi.object({
    userName: joi.string().min(3).max(20).trim(true).required(),
    password: joi.string().min(8).required()
})

const updateValidation = joi.object({
    orgName:joi.string().required(),
    address:joi.object({
        addressLine1:joi.string().required(),
        addressLine2:joi.string().required(),
        city:joi.string().required(),
        state:joi.string().required(),
        country:joi.string().required(),
        zipCode:joi.number().required(),
    }).optional()
});
const orgValidation=joi.object({
    orgName:joi.string().required(),
    address:joi.object({
        addressLine1:joi.string().required(),
        addressLine2:joi.string().required(),
        city:joi.string().required(),
        state:joi.string().required(),
        country:joi.string().required(),
        zipCode:joi.number().required(),
    }).optional()
})


const schemaValidator = (route, method) => {
    let obj = {}
    switch (method) {
        case 'post':
            obj = {
                '/user/add': validation,
                '/org/add':orgValidation,
                '/user/login':loginValidation
            }
            return obj[route]
        case 'put':
            obj={
                '/org/list/update/:id':updateValidation
            }
            return obj[route]
    }

}
export default schemaValidator;




