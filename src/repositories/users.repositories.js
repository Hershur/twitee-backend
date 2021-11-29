import userDB from "../models/users.models.js";
import bcrypt from "bcrypt";

// crypto.randomBytes(48).toString('hex')

export const createAccountRepo = async (userBody)=> {
    const getNameFromEmail = userBody.email.split('@')[0];

    const checkUserExists = await userDB.findOne({ email: userBody.email});


    if(checkUserExists) {
        return {userExists: true, message: 'User already exists'}
    }

    //Hash Password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(userBody.password, salt);
    // const result = bcrypt.compareSync(userBody.password, hash);
    

    const user = new userDB({
        name: getNameFromEmail,
        email: userBody.email,
        password: hashedPassword,
        createdOn: new Date().toLocaleString()
    });

    
    const createUser = await user.save(user);
  
    return createUser;
};


export const getAllUsersRepo = async ()=> {
    
    const allUsers = await userDB.find();
    let retrievedUsers = [];

    allUsers.forEach(user => {
        let retrievedUser = {
                _id: user._id,
                email: user.email,
                name: user.name,
                created: user.createdOn
        };

        retrievedUsers.push(retrievedUser);
    });

    return retrievedUsers;
};

export const getUserByIdRepo = async (id)=> {
    
    const user = await userDB.findById(id);

    return user;
};


export const updateUserByIdRepo = async (id, userBody)=> {
    
    const updateUser = await userDB.findOneAndUpdate(id, userBody);

    return updateUser;
};

export const deleteUserByIdRepo = async (id)=> {
    
    const deleteUser = await userDB.findByIdAndDelete(id);

    return deleteUser;
};


export const loginUserRepo = async (loginBody)=> {
    
    const checkUserExists = await userDB.findOne({ email: loginBody.email});
    const checkPassword =  bcrypt.compareSync(loginBody.password, checkUserExists.password)

    return checkUserExists && checkPassword ? checkUserExists : null;

};
