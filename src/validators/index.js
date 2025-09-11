import {body} from "express-validator"

const userRegistrationValidator= () =>{
    // It returns an array because each rule is middleware, and Express needs them grouped to run one after another
    return [
        body("email")
            .trim()
            .notEmpty().withMessage("email is required")
            .isEmail().withMessage("invallid email"),
        
        body("username")
            .trim()
            .notEmpty().withMessage("username is required")
            .isLength({min: 3}).withMessage("username should be at least 3 char")
            .isLength({max: 15}).withMessage("username cannot exceed 15 char")
    ]
}                                                           

const userLoginValidator= () =>{
    return [
        body("email")
            .isEmail().withMessage("invalid email"),

        body("password")
            .notEmpty().withMessage("password is required")
    ]
}

export {userLoginValidator, userRegistrationValidator}