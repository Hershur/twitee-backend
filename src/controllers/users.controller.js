import { createAccountRepo } from "../repositories/users.repositories.js";
import joi from 'joi';
import _ from 'lodash';


//Create new user account
export const createAccount = (req, res)=> {
    //Validate req body

    try {
        
        const userValidation = joi.object().keys({
            email: joi.string().email(),
            password: joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        });
    
        const validation = userValidation.validate(req.body);
    
        if(_.isEmpty(req.body)){
            res.status(400).json({
                message: 'error',
                error:  "Request body cannot be empty"
            });
        }else if(validation.error){
            res.status(400).json({
                message: 'Validation error.',
                error:  validation.error,
            });
        }
    
        //Create user
        createAccountRepo();
    
    
        //
    
        res.send("Account created");
    } catch (error) {
        return res.status(500).json({
            message: 'error',
            error: error.message || "An error occurred creating account"
        });
    }
};


export const getUserById = (req, res)=> {
    
};


export const getAllUsers = (req, res)=> {

};


export const updateUserById = (req, res)=> {

};


export const deleteUserById = (req, res)=> {
    res.send("Delete user")
};
