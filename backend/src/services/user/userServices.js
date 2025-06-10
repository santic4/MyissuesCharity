import { User } from "../../models/index.js";

export const getUserByEmail = async (email) => {
    if (!email) {
      throw new Error('Email not provided');
    }

    const user = await User.findOne({ where: { email } });

    return user;
};


export const createUser = async (name, email, password, role ) => {
    console.log('entre', name, email, password)
    if(!name || !email || !password ) throw new Error('Data Invalid.')
    
    const newUser = await User.create({ name, email, password_hash: password, role });

    if(!newUser) throw new Error('Error to create user.')

    return (newUser);
}