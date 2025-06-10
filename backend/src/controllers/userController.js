import { User } from "../models/index.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({ order: [["created_at", "ASC"]] });
        
        if(!users) throw new Error('Users not found.')
        res.json(users);
    } catch (error) {
        next(error)
    }
}

export const getUserById = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const user = await User.findByPk(id);
        
        if(!user) throw new Error('User not found.')
        res.json(user);
    } catch (error) {
        next(error)
    }
}

export const createUser = async (req, res, next) => {
    const { name, email, password, role } = req.body; 
    try {
        console.log('entre', name, email, password)
        if(!name || !email || !password ) throw new Error('Data Invalid.')
        
        const newUser = await User.create({ name, email, password_hash: password, role });

        if(!newUser) throw new Error('Error to create user.')

        res.status(201).json(newUser);
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        if(!req.body) throw new Error('Data Invalid.')
        
        const user = User.findByPk(id);
        
        if(!user) throw new Error('User not found.')

        await user.update(req.body)

        res.json(user);
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    const id = parseInt(req.params.id);
    try {
        const rowsDeleted = await User.destroy({ where: { id } });

        if(rowsDeleted === 0) throw new Error('User not found.');

        res.json({message: "User deleted."});
    } catch (error) {
        next(error)
    }
}