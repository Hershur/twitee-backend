import express from 'express';
import { 
    createAccount, 
    deleteUserById, 
    getAllUsers, 
    getUserById, 
    updateUserById,
    loginUser
} from '../controllers/users.controller.js';
import verifyToken from '../middleware/auth.js';

const usersRouter = express.Router();


/**
 * @description Login user
 * @method POST/
 */

usersRouter.post('/login', loginUser);


//JWT Authentication middleware
usersRouter.use(verifyToken);


/**
 * @description GET All Users
 * @method GET/
 */

usersRouter.get('/', getAllUsers);

/**
 * @description GET a single user
 * @method GET/
 */

usersRouter.get('/:id', getUserById);

/**
 * @description Create account
 * @method POST/
 */
usersRouter.post('/create-account', createAccount);

/**
 * @description  Update a single user
 * @method PUT/
 */
usersRouter.put('/:id/update', updateUserById);

/**
 * @description  Delete a single user
 * @method PUT/
 */
usersRouter.delete('/:id/delete', deleteUserById);





export default usersRouter;
