import userDB from "../models/users.models.js";


export const createAccountRepo = async (userBody)=> {
    const getNameFromEmail = userBody.email.split('@')[0];

    const user = new userDB({
        name: getNameFromEmail,
        email: userBody.email,
        password: userBody.password,
        createdOn: new Date().toLocaleString()
    });

    const createUser = await user.save(user);

    console.log(createUser);
};
