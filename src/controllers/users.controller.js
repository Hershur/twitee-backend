import { 
    createAccountRepo, 
    deleteUserByIdRepo, 
    getAllUsersRepo,
    getUserByIdRepo,
    updateUserByIdRepo,
    loginUserRepo 
} from "../repositories/users.repositories.js";
import joi from 'joi';
import _ from 'lodash';
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

dotenv.config();





//Create new user account
export const createAccount = async (req, res)=> {

    //Validate req body
    const userValidation = joi.object().keys({
        email: joi.string()
            .email()
            .trim()
            .required()
            .example("user@example.com")
            .messages({
                "string.email": "Not a valid email address.",
                "string.empty": "Email is required.",
            }),
        password: joi.string()
            .trim()
            .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/))
            .required()
            .example("passW@rd1")
            .messages({
                "string.pattern.base": "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
                "string.empty": "password is required.",
            }),
        confirmPassword: joi.string()
            .valid(joi.ref('password'))
            .required()
            .example("passW@rd1")
            .messages({
                "any.only": "Password does not match",
                "string.empty": "confirm password is required.",
            }),
    });

    try {
        
    
        const validation = userValidation.validate(req.body);
    
        if(_.isEmpty(req.body)){
            return res.status(400).json({
                message: 'error',
                error:  "Request body cannot be empty"
            });
        } else if(validation.error){
            return res.status(400).json({
                message: 'Validation error.',
                error:  validation.error.details[0]["message"],
            });
        }

        
        //Create user
        const userCreated = await createAccountRepo(req.body);


        // Create token
        const token = jwt.sign(
            { user_id: userCreated._id, email: userCreated.email },
            process.env.TOKEN_KEY,
            {
            expiresIn: "2m",
            }
        );


        // save user token
        // userCreated.token = token;

        
        //Check if user exists
        if(userCreated.userExists){
            return res.status(409).json({
                message: 'error',
                error: "User already exists"
            });

        }
    
        return res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {userCreated, token}
        });

    } catch (error) {
        return res.status(500).json({
            message: 'error',
            error: error.message || "An error occurred creating account"
        });
    }
};


export const getAllUsers = async (req, res)=> {
    try {
        const allUsers = await getAllUsersRepo();

        return res.status(200).json({
            success: true,
            message: 'Users fetched successfully',
            data: allUsers
        });

    } catch (error) {
        return res.status(500).json({
            message: 'error',
            error: error.message || "An error occurred creating account"
        });
    }
};


export const getUserById = async (req, res)=> {
    try {
        const id = req.params.id;
        const user = await getUserByIdRepo(id);

        if(_.isEmpty(user)){
            return res.status(400).json({
                message: 'error',
                error: `Could not find user with id: ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User fetched successfully',
            data: user
        });

    } catch (error) {
        return res.status(500).json({
            message: 'error',
            error: error.message || "An error occurred creating account"
        });
    }
};


export const updateUserById = async (req, res)=> {

    const userValidation = joi.object().keys({
        password: joi.string()
            .trim()
            .pattern(new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/))
            .required()
            .example("passW@rd1")
            .messages({
                "string.pattern.base": "Password must be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
                "string.empty": "password is required.",
            }),
        confirmPassword: joi.string()
            .valid(joi.ref('password'))
            .required()
            .example("passW@rd1")
            .messages({
                "any.only": "Password does not match",
                "string.empty": "confirm password is required.",
            }),
    });

    try {
        const validation = userValidation.validate(req.body);
        
        if (!_.isEmpty(req.body.email)){
            return res.status(400).json({
                message: 'error',
                error:  "Cannot update email address"
            });
        } else if(_.isEmpty(req.body)){
            return res.status(400).json({
                message: 'error',
                error:  "Request body cannot be empty"
            });
        } else if(validation.error){
            return res.status(400).json({
                message: 'Validation error.',
                error:  validation.error.details[0]["message"],
            });
        }
    
        const id = req.params.id;
        const updateUser = await updateUserByIdRepo(id, req.body);

        if(_.isEmpty(updateUser)){
            return res.status(400).json({
                message: 'error',
                error: `Could not find user with id: ${id}`
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updateUser
        });
        
    } catch (error) {
        return res.status(500).json({
            message: 'error',
            error: error.message || "An error occurred creating account"
        });
    }
};


export const deleteUserById = async (req, res)=> {
    try {
        const id = req.params.id;
    
        const deleteUser = await deleteUserByIdRepo(id);

        if(_.isEmpty(deleteUser)){
            return res.status(400).json({
                message: 'error',
                error: `Could not find user with id: ${id}`
            });
        }

        return res.status(204).json({
            success: true,
            message: 'User deleted successfully'
        });
        
    } catch (error) {
        return res.status(500).json({
            message: 'error',
            error: error.message || "An error occurred creating account"
        });
    }
};


export const loginUser = async (req, res)=> {
    const loginValidation = joi.object().keys({
        email: joi.string()
            .trim()
            .required(),
        password: joi.string()
            .trim()
            .required()
    });

    try {
        const validation = loginValidation.validate(req.body);
    
        if(_.isEmpty(req.body)){
            return res.status(400).json({
                message: 'error',
                error:  "Request body cannot be empty"
            });
        } else if(validation.error){
            return res.status(400).json({
                message: 'Validation error.',
                error:  validation.error.details[0]["message"],
            });
        }

        const userLogin = await loginUserRepo(req.body);

        if(userLogin){
            const token = jwt.sign(
                { user_id: userLogin._id, email: userLogin.email},
                process.env.TOKEN_KEY,
                {
                  expiresIn: 60*2,
                }
            );
        
            let retrievedLogin = {
                _id: userLogin._id,
                email: userLogin.email,
                name: userLogin.name,
                created: userLogin.createdOn,
                token: token
            };


            return res.status(200).json({
                success: true,
                message: 'Logged in successfully',
                data: retrievedLogin
            });

        } else {
            return res.status(403).json({
                message: 'error',
                error: 'Invalid credentials'
            });
        }

    } catch (error) {
        return res.status(500).json({
            message: 'error',
            error: error.message || "An error occurred creating account"
        });
    }

}
